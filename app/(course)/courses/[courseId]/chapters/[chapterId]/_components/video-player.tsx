import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import MuxPlayer from "@mux/mux-player-react";

export const VideoPlayer = ({
  title,
  autoPlay,
  playbackId,
  completeOnEnd,
  isLocked,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const [loadingTime, setLoadingTime] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const startTime = performance.now();
    return () => {
      if (loadingTime === null) {
        const endTime = performance.now();
        setLoadingTime(endTime - startTime);
      }
    };
  }, []);

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        // Your logic for completion
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      {isLocked && <Lock />}
      {!isLocked && (
        <>
          <MuxPlayer
            title={title}
            onCanPlay={() => setIsReady(true)}
            onEnded={onEnd}
            autoPlay={autoPlay}
            playbackId={playbackId}
            playsInline={true}
            className={!isReady ? "hidden" : ""}
          />
          {loadingTime !== null && (
            <p>Video loading time: {loadingTime} ms</p>
          )}
        </>
      )}
    </div>
  );
};
