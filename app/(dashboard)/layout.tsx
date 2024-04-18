import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const DashboardLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="h-full">
            <div className="h-[92px] md:pl-72 fixed inset-y-0 w-full z-50">
                <Navbar />
            </div>
            <div className="hidden md:flex h-full w-72 flex-col fixed inset-y-0 z-50">
                <Sidebar />
            </div>
            {/* Использование произвольного значения для максимальной ширины, чтобы сделать основное содержимое чуть меньше, чем 8xl */}
            <main className="md:pl-72 pt-[85px] max-w-[124rem]">
                {children}
            </main>
        </div>
    );
}

export default DashboardLayout;
