import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";

// Импортируемые компоненты оставлены без изменений.
import { IconBadge } from "@/components/icon.badge";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "@/components/course-progress";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
};

export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category
}: CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`} legacyBehavior>
      <a className="group hover:bg-muted border transition overflow-hidden rounded-lg shadow-lg flex flex-col">
        <div className="relative w-full aspect-video rounded-t-lg overflow-hidden">
          <Image
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="duration-700 ease-in-out blur-0 grayscale-0 object-cover"
            alt={title}
            src={imageUrl}
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              inset: 0,
              color: 'transparent'
            }}
          />
        </div>
        <div className="flex flex-col p-4">
          <div className="text-base lg:text-lg font-semibold group-hover:text-sky-700 transition line-clamp-1">
            {title}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {category}
          </p>
          {/* Условно отображаем IconBadge только если нет прогресса */}
          {progress === null && (
            <div className="mt-2 flex items-center gap-x-2 text-sm">
              <div className="inline-flex items-center border rounded-md px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-sky-500/10 text-sky-800">
                <IconBadge size="sm" icon={BookOpen} />
                <span className="ml-1">
                  {chaptersLength} {chaptersLength === 1 ? "урок" : "урок"}
                </span>
              </div>
            </div>
          )}
          {progress !== null && (
            <CourseProgress
              className="mt-2"
              variant={progress === 100 ? "success" : "default"}
              size="default"
              value={progress}
            />
          )}
        </div>
      </a>
    </Link>
  );
};
