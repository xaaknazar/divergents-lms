"use client";

import { BarChart, Compass, Layout, List, Sidebar } from "lucide-react"
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
    {
        icon: Compass,
        label: "Обзор",
        href: "/search",
    },
    {
    icon: Layout,
    label: "Мои курсы",
    href: "/",
    },
];

const teacherRoutes = [
    {
        icon: List,
        label: "Курсы",
        href: "/teacher/courses",
        },
        {
            icon: BarChart,
            label: "Аналитика",
            href: "/teacher/analytics",
        },

]

export const SidebarRoutes = () => {
    const pathname = usePathname();
    const isTeacherPage = pathname?.includes("/teacher");
    const routes = isTeacherPage ? teacherRoutes : guestRoutes;

    return (
        <div className="flex flex-col w-full">
            {routes.map((route) =>(
                <SidebarItem
                key={route.href}
                icon={route.icon}
                label={route.label}
                href={route.href}/>

            ))}
        </div>
    )
}