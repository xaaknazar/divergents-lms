"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex w-full text-sm items-center py-3.5 px-3 my-1 hover:bg-muted rounded-lg transition-background group", // добавлено my-2 для увеличения расстояния
        isActive ? "bg-muted text-primary font-medium" : "text-muted-foreground"
      )}
    >
      <Icon
        size={26}
        className={cn(
          "mr-2",
          isActive ? "text-primary animate-spin-once" : "text-muted-foreground"
        )}
      />
      {label}
      {label === "Reports" && (
        <div className="inline-flex items-center border rounded-md px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-sky-500/10 text-sky-800 ml-auto">
          Скоро
        </div>
      )}
    </button>
  );
};
