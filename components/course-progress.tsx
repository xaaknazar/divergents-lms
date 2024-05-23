import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CourseProgressProps {
  value: number;
  variant?: "default" | "success";
  size?: "default" | "sm";
  className?: string; // Добавляем свойство className для передачи дополнительных классов
};

const colorByVariant = {
  default: "bg-sky-600", 
  success: "bg-green-700",
};

const textColorByVariant = {
  default: "text-sky-700", 
  success: "text-green-700",
};

const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
};

const uncompletedColor = "bg-sky-100"; // Цвет для невыполненного прогресса

export const CourseProgress = ({
  value,
  variant = "default", // Устанавливаем значения по умолчанию непосредственно в деструктуризации
  size = "default",
  className = "", // Устанавливаем значение по умолчанию для className
}: CourseProgressProps) => {
  return (
    <div className={cn(className)}> {/* Применяем дополнительные классы к контейнеру */}
      <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={cn(
            "absolute h-full rounded-full transition-width duration-300 ease-in-out",
            colorByVariant[variant]
          )}
          style={{ width: `${value}%` }}
        />
        <div
          className={cn(
            "absolute h-full right-0 rounded-full transition-width duration-300 ease-in-out",
            uncompletedColor
          )}
          style={{ width: `${100 - value}%` }}
        />
      </div>
      <p className={cn(
        "font-medium mt-2",
        textColorByVariant[variant],
        sizeByVariant[size],
      )}>
        {Math.round(value)}% Пройдено
      </p>
    </div>
  );
};
