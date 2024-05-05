import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Исправлен импорт
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
    let startTime: number | null = null; // Инициализируем startTime
    if (!loadingTime) {
      startTime = performance.now(); // Установка startTime только если loadingTime равен null
    }
    return () => {
      if (startTime && loadingTime === null) {
        const endTime = performance.now();
        setLoadingTime(endTime - startTime); // Устанавливаем loadingTime только если оно не установлено ранее
      }
    };
  }, [loadingTime]); // Добавляем loadingTime в зависимости, чтобы useEffect срабатывал при его изменении

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        // Ваша логика для завершения
        console.log("Воспроизведение завершено");
      }
    } catch (error) {
      console.error("Ошибка при завершении воспроизведения:", error);
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
            <p>Время загрузки видео: {loadingTime} мс</p> // Исправлен текст
          )}
        </>
      )}
    </div>
  );
};
