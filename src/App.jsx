import React from 'react';
import Header from "./components/Header";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import './index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function App() {
    return (
        <div className="bg-black text-white font-sans">
            <Header />
            <About />
            <Projects />
            <Contact />
        </div>
    );
}