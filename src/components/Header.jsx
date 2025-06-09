import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 600);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [menuOpen]);


    const handleLinkClick = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setMenuOpen(false);
    };

    const backgroundImageUrl = isMobile
        ? "url('/images/phone-background.webp')"
        : "url('/images/background.webp')";

    return (
        <header
            id="header"
            className="h-screen bg-fixed bg-cover overflow-hidden"
            style={{ backgroundImage: backgroundImageUrl, backgroundPosition: 'center' }}
        >
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setMenuOpen(false)}
                ></div>
            )}

            <div className="container mx-auto h-full flex flex-col justify-center items-center md:items-start px-6 md:px-0">
                <nav className="flex justify-between items-center fixed top-0 left-0 right-0 bg-black/50 px-6 md:px-10 py-4 z-50 shadow-lg">
                    <a href="#header" onClick={() => handleLinkClick('header')}>
                        <img src="/images/logo.png" alt="Logo" className="w-32 md:w-36" />
                    </a>

                    <div className="md:hidden">
                        <button onClick={() => setMenuOpen(true)} className="text-white text-3xl focus:outline-none">
                            <FaBars />
                        </button>
                    </div>

                    <ul className={`
                        fixed top-0 right-0 h-full w-[250px] bg-black z-50
                        flex flex-col items-center justify-center gap-y-8
                        transform transition-transform duration-300 ease-in-out
                        ${menuOpen ? 'translate-x-0' : 'translate-x-full'}
                        md:relative md:flex-row md:w-auto md:h-auto
                        md:bg-transparent md:translate-x-0 md:gap-x-8
                    `}>
                        <li className="absolute top-5 right-5 md:hidden">
                            <button onClick={() => setMenuOpen(false)} className="text-white text-3xl">
                                <FaTimes />
                            </button>
                        </li>

                        <li><a href="#header" onClick={() => handleLinkClick('header')} className="block text-xl text-white hover:text-blue-700 transition duration-200">Home</a></li>
                        <li><a href="#about" onClick={() => handleLinkClick('about')} className="block text-xl text-white hover:text-blue-700 transition duration-200">About</a></li>
                        <li><a href="#projects" onClick={() => handleLinkClick('projects')} className="block text-xl text-white hover:text-blue-700 transition duration-200">Projects</a></li>
                        <li><a href="#contact" onClick={() => handleLinkClick('contact')} className="block text-xl text-white hover:text-blue-700 transition duration-200">Contact</a></li>
                    </ul>
                </nav>

                <div className="text-center md:text-left">
                    <p className={`text-xl md:text-3xl text-white mb-4 transition-all duration-700 ease-out ${isMounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}>
                        Computer Science Student
                    </p>
                    <h1 className={`text-5xl md:text-7xl font-bold text-white leading-tight transition-all duration-700 ease-out delay-200 ${isMounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}>
                        Hey! I am <span className="text-blue">Pablo</span><br/>Garces
                    </h1>
                </div>
            </div>
        </header>
    );
}