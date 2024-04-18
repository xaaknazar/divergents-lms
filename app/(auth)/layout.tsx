const AuthLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return ( 
        <div className="min-h-screen bg-gray-50 flex justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto p-6 md:p-12 shadow-xl rounded-lg bg-white">
                {/* Auth children (форма входа) */}
                <div className="flex flex-col justify-center p-6">
                    {children}
                </div>
                {/* Сайдбар с лого и информацией */}
                <div className="hidden md:flex flex-col items-center justify-center mb-36">
                    <div className="transform transition duration-300 hover:scale-105">
                        <a href="/" className="block p-4">
                            <img src="/logo.svg" alt="Logo" className="h-36 w-auto" />
                        </a>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                        Learning Management System
                    </h1>
                    <p className="text-lg text-gray-500">
                        разработано командой 
                        <a href="https://www.instagram.com/divergents.kz/" className="text-blue-700 ml-2">
                            Divergents.kz
                        </a>
                    </p>
                </div>
            </div>
        </div>
     );
}

export default AuthLayout;
