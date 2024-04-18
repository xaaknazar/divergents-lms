import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CourseProgressProps {
  value: number;
  variant?: "default" | "success";
  size?: "default" | "sm";
  className?: string; // Добавляем свойство className для передачи дополнительных классов
};

const colorByVariant = {
  default: "text-sky-700", 
  success: "text-green-700", // Исправлено с text- на bg-
};

const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
};

export const CourseProgress = ({
  value,
  variant = "default", // Устанавливаем значения по умолчанию непосредственно в деструктуризации
  size = "default",
  className = "", // Устанавливаем значение по умолчанию для className
}: CourseProgressProps) => {
  return (
    <div className={cn(className)}> {/* Применяем дополнительные классы к контейнеру */}
      <Progress
        className={cn("h-2", colorByVariant[variant])} // Применяем цвет в зависимости от варианта
        value={value}
        variant={variant}
      />
      <p className={cn(
        "font-medium mt-2",
        colorByVariant[variant], // Убран класс text-sky-700, т.к. цвет теперь определяется вариантом
        sizeByVariant[size],
      )}>
        {Math.round(value)}% Пройдено
      </p>
    </div>
  );
};
