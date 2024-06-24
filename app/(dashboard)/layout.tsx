import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { CourseFooter } from "./_components/course-footer";

const DashboardLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="h-full flex flex-col">
            <div className="h-[92px] md:pl-72 fixed inset-y-0 w-full z-50">
                <Navbar />
            </div>
            <div className="hidden md:flex h-full w-72 flex-col fixed inset-y-0 z-50">
                <Sidebar />
            </div>
            <main className="flex-1 md:pl-72 pt-[85px] max-w-[124rem] mx-auto w-full">
                {children}
            </main>
            <div className="md:pl-72">
                <CourseFooter />
            </div>
        </div>
    );
}

export default DashboardLayout;

