"use client";

import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface MuxPlayerElement extends HTMLVideoElement {
  currentTime: number;
  play: () => Promise<void>;
}

interface VideoPlayerProps {
  playbackId?: string | null;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
  playsInline: boolean;
  description: string;
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
  description,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const videoRef = useRef<MuxPlayerElement | null>(null);
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
    return () => {
      document.title = "Divergents LMS";
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
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
        }
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleTimeUpdate = (e: any) => {
    const currentTime = e.target.currentTime;
    localStorage.setItem(`video-time-${chapterId}`, currentTime.toString());
  };

  const handleTimestampClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const time = target.dataset.time;
    if (time && videoRef.current) {
      const [minutes, seconds] = time.split(':').map(Number);
      const seekTime = minutes * 60 + seconds;
      videoRef.current.currentTime = seekTime;
      videoRef.current.play();
    }
  };

  const renderDescription = () => {
    const timestampRegex = /(\d{1,2}:\d{2})/g;
    const parts = description.split(timestampRegex);
    const transformedDescription = parts.map((part, index) => {
      if (timestampRegex.test(part)) {
        return `<span data-time="${part}" style="color: blue; cursor: pointer;">${part}</span>`;
      }
      return part;
    }).join('');

    return { __html: transformedDescription };
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  useEffect(() => {
    const descriptionContainer = document.getElementById('description-container');
    if (descriptionContainer) {
      descriptionContainer.addEventListener('click', handleTimestampClick);
    }
    return () => {
      if (descriptionContainer) {
        descriptionContainer.removeEventListener('click', handleTimestampClick);
      }
    };
  }, [showFullDescription]);

  return (
    <div className="relative aspect-video max-w-full">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-200">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 dark:bg-slate-200 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This chapter is locked</p>
        </div>
      )}
      {!isLocked && playbackId && (
        <>
          <MuxPlayer
            ref={videoRef as any}
            title={title}
            className={cn(!isReady && "hidden")}
            onCanPlay={() => setIsReady(true)}
            autoPlay={true}
            loop={true}
            onEnded={onEnd}
            playbackId={playbackId}
            playsInline={true}
            onTimeUpdate={handleTimeUpdate}
            currentTime={currentTime}
          />
          <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow max-w-full">
            <h2 className="text-lg font-bold mb-2">{title}</h2>
            <div
              id="description-container"
              className="text-sm md:text-base leading-relaxed"
              dangerouslySetInnerHTML={showFullDescription ? renderDescription() : { __html: description.substring(0, 100) + '...' }}
            />
            <p
              onClick={toggleDescription}
              className="mt-2 text-blue-500 cursor-pointer hover:underline"
            >
              {showFullDescription ? 'Свернуть' : 'Показать больше'}
            </p>
          </div>
        </>
      )}
    </div>
  );
};
