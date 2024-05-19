"use client";

import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface VideoPlayerProps {
    playbackId?: string | null;
    courseId: string;
    chapterId: string;
    nextChapterId?: string;
    isLocked: boolean;
    completeOnEnd: boolean;
    title: string;
    playsInline: boolean;
}

export const VideoPlayer = ({
    playbackId,
    courseId,
    chapterId,
    nextChapterId,
    isLocked,
    completeOnEnd,
    title,
    playsInline,
}: VideoPlayerProps) => {
    const [isReady, setIsReady] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const router = useRouter();
    const confetti = useConfettiStore();

    useEffect(() => {
        const savedTime = localStorage.getItem(`video-time-${chapterId}`);
        if (savedTime) {
            setCurrentTime(Number(savedTime));
        }
    }, [chapterId]);

    useEffect(() => {
        document.title = title;
        const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
        const originalFavicon = favicon ? favicon.href : '/favicon.ico';
        if (favicon) {
            favicon.href = './favicon.ico'; // Относительный путь к вашему favicon
        }
        return () => {
            if (favicon) {
                favicon.href = originalFavicon;
            }
        };
    }, [title]);

    const onEnd = async () => {
        try {
            if (completeOnEnd) {
                await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
                    isCompleted: true,
                });

                if (!nextChapterId) {
                    confetti.onOpen();
                }

                toast.success("Progress updated");
                router.refresh();

                if (nextChapterId) {
                    router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
                }
            }
        } catch {
            toast.error("Something went wrong");
        }
    }

    const handleTimeUpdate = (e: any) => {
        const currentTime = e.target.currentTime;
        localStorage.setItem(`video-time-${chapterId}`, currentTime.toString());
    };

    return (
        <div className="relative aspect-video">
            {!isReady && !isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800  dark:bg-slate-200">
                    <Loader2 className="h-8 w-8 animate-spin text-secondary" />
                </div>
            )}
            {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800  dark:bg-slate-200 flex-col gap-y-2 text-secondary">
                    <Lock className="h-8 w-8" />
                    <p className="text-sm">
                        This chapter is locked
                    </p>
                </div>
            )}
            {!isLocked && playbackId && (
                <MuxPlayer
                    title={title}
                    className={cn(
                        !isReady && "hidden"
                    )}
                    onCanPlay={() => setIsReady(true)}
                    autoPlay={true}
                    loop={true}
                    onEnded={onEnd}
                    playbackId={playbackId}
                    playsInline={true}
                    onTimeUpdate={handleTimeUpdate}
                    currentTime={currentTime}
                />
            )}
        </div>
    )
}
