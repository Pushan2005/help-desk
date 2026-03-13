export default function NavBar() {
    return (
        <>
            <nav className="w-full h-16 bg-gray-800 text-white flex items-center justify-between px-4">
                <div className="text-lg font-bold">MyApp</div>
                <div className="space-x-4">
                    <a href="#" className="hover:underline">
                        Home
                    </a>
                    <a href="#" className="hover:underline">
                        About
                    </a>
                    <a href="#" className="hover:underline">
                        Contact
                    </a>
                </div>
            </nav>
        </>
    );
}
