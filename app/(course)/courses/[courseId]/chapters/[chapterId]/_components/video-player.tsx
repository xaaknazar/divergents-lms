import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { useState, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
@@ -30,20 +32,9 @@ export const VideoPlayer = ({
  autoPlay,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const [loadingTime, setLoadingTime] = useState<number | null>(null);
  const router = useRouter();
  const confetti = useConfettiStore();

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
@@ -84,19 +75,17 @@ export const VideoPlayer = ({
      )}
      {!isLocked && (
        <MuxPlayer 
          title={title}
          className={cn(
            !isReady && "hidden"
          )}
          onCanPlay={() => setIsReady(true)}
          onEnded={onEnd}
          autoPlay={autoPlay}
          playbackId={playbackId}
          playsInline={true}
        />
      )}
      {loadingTime !== null && (
        <p>Video loading time: {loadingTime} ms</p>
        title={title}
        className={cn(
          !isReady && "hidden"
        )}
        onCanPlay={() => setIsReady(true)}
        onEnded={onEnd}
        autoPlay={autoPlay}
        playbackId={playbackId}
        playsInline={true}
      />

      )}
    </div>
  )
