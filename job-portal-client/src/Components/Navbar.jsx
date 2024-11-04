import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBarsStaggered } from "react-icons/fa6";
import { HiXMark } from "react-icons/hi2";
import { auth, provider } from './firebaseConfig';
import { signInWithPopup, signOut } from "firebase/auth";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);

    const handleMenuToggler = () => setIsMenuOpen(!isMenuOpen);

    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
        } catch (error) {
            console.error("Error signing in:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const navItems = [
        { path: "/", title: "Start a search" },
        { path: "/my-job", title: "My Jobs" },
        { path: "/salary", title: "Salary Estimate" },
        { path: "/post-job", title: "Post A Job" },
        { path: "/resumes", title: "Resumes" }
    ];

    return (
        <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
            <nav className="flex justify-between items-center py-6">
                <a href="/" className="flex items-center gap-2 text-2xl text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="30" viewBox="0 0 29 30" fill="none">
                        <circle cx="12.0143" cy="12.5143" r="12.0143" fill="#3575E2" fillOpacity="0.4" />
                        <circle cx="16.9857" cy="17.4857" r="12.0143" fill="#3575E2" />
                    </svg>{" "}
                    <span>Job Portal</span>
                </a>

                <ul className="hidden md:flex gap-12">
                    {navItems.map(({ path, title }) => (
                        <li key={path} className="text-base text-primary">
                            <NavLink to={path} className={({ isActive }) => (isActive ? "active" : "")}>
                                {title}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <div className="text-base text-primary font-medium space-x-5">
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <span>Hello, {user.displayName}</span>
                            <button onClick={handleLogout} className="py-2 px-5 border rounded bg-blue text-white">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button onClick={handleLogin} className="py-2 px-5 border rounded bg-blue text-white">
                            Login with Google
                        </button>
                    )}
                </div>

                <div className="md:hidden block">
                    <button onClick={handleMenuToggler}>
                        {isMenuOpen ? <HiXMark className="w-5 h-5 text-primary" /> : <FaBarsStaggered className="w-5 h-5 text-primary" />}
                    </button>
                </div>
            </nav>

            <div className={`px-4 bg-black py-5 rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
                <ul>
                    {navItems.map(({ path, title }) => (
                        <li key={path} className="text-base text-white py-1">
                            <NavLink to={path} className={({ isActive }) => (isActive ? "active" : "")}>
                                {title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
};

export default Navbar;
