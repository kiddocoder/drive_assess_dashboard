import { Bell, Car, Menu, Search } from "lucide-react";
import type React from "react";
import { useState } from "react";
import SearchPopup from "../components/forms/SearchPopup";

const Header: React.FC<{
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}> = ({ sidebarOpen, setSidebarOpen }) => {
    const [isSearchPopup, setIsSearchPopup] = useState(false)
    const handleSearchPopup = () => {
        setIsSearchPopup(true);
    }

    return (
        <>
            <header className="bg-white shadow-sm z-10">
                <div className="flex items-center justify-between px-4 py-3 md:px-6">
                    {/* Left side - Mobile menu button and title */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-canadianRed rounded-lg flex items-center justify-center mr-2">
                                <Car className="w-5 h-5 text-white" />
                            </div>
                            <h1 className="text-xl font-bold text-charcoal hidden sm:block">
                                DriveReady
                            </h1>
                        </div>
                    </div>

                    {/* Right side - Search and user controls */}
                    <div className="flex items-center space-x-4">
                        <div className="relative hidden md:block">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search..."
                                onFocus={handleSearchPopup}
                                className="block cursor-pointer w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-coolBlue focus:border-coolBlue sm:text-sm"
                            />
                        </div>

                        <button className="p-2 lg:hidden rounded-full hover:bg-gray-100 relative">
                            <Search onClick={handleSearchPopup} className=" cursor-pointerw-5 h-5 text-gray-600" />
                        </button>

                        <button className="p-2 rounded-full hover:bg-gray-100 relative">
                            <Bell className="w-5 h-5 text-gray-600" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-canadianRed rounded-full"></span>
                        </button>

                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-coolBlue rounded-full flex items-center justify-center text-white font-medium">
                                AD
                            </div>
                            <span className="hidden md:inline text-sm font-medium text-charcoal">
                                Admin User
                            </span>
                        </div>
                    </div>
                </div>
            </header>
            <SearchPopup isOpened={isSearchPopup} onClose={() => setIsSearchPopup(false)} />
        </>
    );
};

export default Header;