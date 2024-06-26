import { Menu } from "lucide-react";
import { Chapter, Course, UserProgress } from "@prisma/client";

import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";

import { CourseSidebar } from "./course-sidebar";

interface CourseMobileSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
};

export const CourseMobileSidebar = ({ 
  course,
  progressCount,
}: CourseMobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white w-72 md:w-96 overflow-y-auto">
        <div style={{ maxHeight: "calc(100vh - 64px)" }}> {/* 64px для учета верхнего меню */}
          <CourseSidebar
            course={course}
            progressCount={progressCount}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
