import React, { useState } from 'react';
import Slider from 'react-slick';
import { FaShip, FaMoneyBillTrendUp, FaForward } from 'react-icons/fa6';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const projects = [
    {
        id: 1,
        name: 'Stability Calculation',
        icon: <FaShip className="text-4xl mx-auto" />,
        images: ['/images/1.jpg', '/images/3.jpg', '/images/11.jpg', '/images/10.jpg'],
        description: `Java application that automates ship stability calculations from database-driven vessel data, ensures input validation, and exports detailed Excel reports via Apache POI for fast, accurate assessments.`,
        repo: 'https://github.com/PabloG55/StabilityCalculation',
    },
    {
        id: 2,
        name: 'Expense Tracker',
        icon: <FaMoneyBillTrendUp className="text-4xl mx-auto" />,
        images: ['/images/2.jpg', '/images/7.jpg', '/images/4.jpg', '/images/5.jpg'],
        description: `JavaFX app that imports bank transactions from text files, categorizes personal/general or split expenses, supports undo/redo and frequency analysis, and exports summarized reports for budgeting insights.`,
        repo: 'https://github.com/PabloG55/expense-tracker-maven',
    },
    {
        id: 3,
        name: 'Skipper',
        icon: <FaForward className="text-4xl mx-auto" />,
        images: ['/images/img.png', '/images/img_1.png'],
        description: `Android Accessibility Service that automates YouTube ad skipping by detecting and tapping “Skip Ad” buttons with smart text-matching logic, running lightweight in the background without root, for seamless hands-free playback (testing phase).`,
        repo: 'https://github.com/PabloG55/skipper',
    },
];

export default function Projects() {
    const [selected, setSelected] = useState(null);
    const [animateIn, setAnimateIn] = useState(false);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    centerMode: false,
                },
            },
        ],
    };

    const handleCardClick = (proj) => {
        setSelected(proj);
        setTimeout(() => setAnimateIn(true), 10);
    };

    const handleCloseModal = () => {
        setAnimateIn(false);
        setTimeout(() => setSelected(null), 200); // Match transition duration
    };

    return (
        <section id="projects" className="scroll-mt-16 py-20 bg-black text-white">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-bold mb-16 text-center">My Projects</h1>
                <Slider {...sliderSettings}>
                    {projects.map((proj) => (
                        <div key={proj.id} className="px-4 mb-2">
                            <div
                                className="bg-gray-800 p-8 rounded-xl overflow-hidden w-full h-72 flex flex-col justify-center items-center shadow-lg hover:shadow-xl hover:bg-blue-900 cursor-pointer transition-transform duration-300 ease-in-out transform hover:-translate-y-1 text-center"
                                onClick={() => handleCardClick(proj)}
                            >
                                {proj.icon}
                                <h2 className="text-2xl font-semibold mt-4">{proj.name}</h2>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            {/* Modal */}
            {selected && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 transition-opacity duration-300"
                    onClick={handleCloseModal}
                >
                    <div
                        className={`
              bg-gray-800 rounded-lg overflow-auto max-w-3xl w-full p-6 relative
              transition-all duration-300 transform
              ${animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
            `}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 text-2xl"
                            onClick={handleCloseModal}
                        >
                            &times;
                        </button>
                        <h2 className="text-3xl font-bold mb-4">{selected.name}</h2>
                        <p className="mb-6">{selected.description}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 justify-items-center">
                            {selected.images.map((src, i) => (
                                <img
                                    key={i}
                                    src={src}
                                    alt={`${selected.name} screenshot ${i + 1}`}
                                    className="rounded w-full max-w-[280px] h-auto object-contain"
                                />
                            ))}
                        </div>
                        <a
                            href={selected.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-blue-700 px-5 py-2 rounded hover:bg-blue-800"
                        >
                            View on GitHub
                        </a>
                    </div>
                </div>
            )}
        </section>
    );
}