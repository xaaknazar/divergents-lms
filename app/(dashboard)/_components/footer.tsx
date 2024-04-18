import Link from 'next/link'; // Импорт Link из Next.js
import { SidebarRoutes } from "./sidebar-routes";
import { MobileSidebar } from "./mobile-sidebar"; // Импорт MobileSidebar

export const Footer = () => {
    return (
        <footer style={{
            backgroundColor: '#ffffff',
            boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            fontSize: '14px',
            marginTop: 'auto' // Добавляем marginTop: 'auto', чтобы футер был прижат к нижнему краю контента
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <span style={{ margin: 0 }}>© 2024 Divergents. All rights reserved.</span>
            </div>
        </footer>
    );
}

