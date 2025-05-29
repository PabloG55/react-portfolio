import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLinkClick = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setMenuOpen(false);
    };

    return (

        <header id="header" className="h-screen pt-16 bg-fixed bg-cover" style={{backgroundImage: "url('/images/background.png')", backgroundPosition: 'center 10%',}}>
        <div className="container mx-auto h-full flex flex-col justify-center items-center md:items-start px-6 md:px-0">
                 <nav className="flex justify-between items-center fixed top-0 left-0 right-0 bg-black/50 backdrop-blur-sm px-6 md:px-10 py-4 z-50 shadow-lg">
                     <img src="/images/logo.png" alt="Logo" className="w-32 md:w-36" />
                     {/* Hamburger Menu Icon */}
                     <div className="md:hidden">
                         <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-3xl focus:outline-none">
                             {menuOpen ? <FaTimes /> : <FaBars />}
                         </button>
                     </div>
                     {/* Navigation Links */}
                     <ul className={`
                        md:flex md:items-center md:gap-8
                        ${menuOpen ? 'block' : 'hidden'}
                        absolute md:static right-0 top-16 md:top-0
                        bg-black md:bg-transparent w-full md:w-auto
                        text-center md:text-left transition-all duration-300 ease-in-out
                        p-5 md:p-0 z-40
                    `}>
                         <li><a href="#header" onClick={() => handleLinkClick('header')} className="block py-2 md:py-0 hover:text-blue-1 transition duration-200">Home</a></li>
                         <li><a href="#about" onClick={() => handleLinkClick('about')} className="block py-2 md:py-0 hover:text-blue-1 transition duration-200">About</a></li>
                         <li><a href="#projects" onClick={() => handleLinkClick('projects')} className="block py-2 md:py-0 hover:text-blue-1 transition duration-200">Projects</a></li>
                         <li><a href="#contact" onClick={() => handleLinkClick('contact')} className="block py-2 md:py-0 hover:text-blue-1 transition duration-200">Contact</a></li>
                     </ul>
                 </nav>

                 {/* On mobile everything is centered; on md+ it shifts left */}
                 <div>
                     <p className="text-3xl text-white mb-4 text-center md:text-left">
                         Computer Science Student
                     </p>
                     <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight text-center md:text-left">
                         Hey! I am <span className="text-blue">Pablo</span><br/>Garces
                     </h1>
                 </div>
             </div>
        </header>
    );
}