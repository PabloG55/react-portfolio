import React, { useState } from 'react';
import Slider from 'react-slick';
import { FaShip, FaRobot, FaForward } from 'react-icons/fa6';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { IoSyncCircleSharp } from 'react-icons/io5';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const projects = [
    {
        id: 1,
        name: 'Stability Calculation',
        icon: <FaShip className="text-4xl mx-auto" />,
        images: ['/images/1.webp', '/images/3.webp', '/images/11.webp', '/images/10.webp'],
        description: `Java application that automates ship stability calculations from database-driven vessel data, ensures input validation, and exports detailed Excel reports via Apache POI for fast, accurate assessments.`,
        repo: 'https://github.com/PabloG55/StabilityCalculation',
    },
    {
        id: 2,
        name: 'Expense Tracker',
        icon: <FaMoneyBillAlt className="text-4xl mx-auto" />,
        images: ['/images/2.webp', '/images/7.webp', '/images/4.webp', '/images/5.webp'],
        description: `JavaFX app that imports bank transactions from text files, categorizes personal/general or split expenses, supports undo/redo and frequency analysis, and exports summarized reports for budgeting insights.`,
        repo: 'https://github.com/PabloG55/expense-tracker-maven',
    },
    {
        id: 3,
        name: 'Skipper',
        icon: <FaForward className="text-4xl mx-auto" />,
        images: ['/images/img.webp', '/images/img_1.webp'],
        description: `Android Accessibility Service that automates YouTube ad skipping by detecting and tapping “Skip Ad” buttons with smart text-matching logic, running lightweight in the background without root, for seamless hands-free playback (testing phase).`,
        repo: 'https://github.com/PabloG55/skipper',
    },
    {
        id: 4,
        name: 'Botifier',
        icon: <FaRobot className="text-4xl mx-auto" />,
        images: ['/images/phone1.webp', '/images/phone2.webp', '/images/phone3.webp', '/images/phone4.webp'],
        description: `Telegram-based productivity assistant with natural language processing (NLP) that lets users schedule, manage, and complete reminders via chat or voice. Includes smart follow-ups, a real-time dashboard, and multi-user timezone support. Built for accountability and intuitive task interaction.`,
        repo: 'https://github.com/PabloG55/telegram-reminder-bot',
    },
    {
        id: 5,
        name: 'Immich Sync Assistant',
        icon: <IoSyncCircleSharp className="text-4xl mx-auto" />,
        images: [
            '/images/screenshot_config.webp',
            '/images/screenshot_folders.webp',
            '/images/screenshot_process.webp',
            '/images/screenshot_verify.webp',
        ],
        description: `Desktop GUI tool to reliably sync photos and videos from an Android device to a self-hosted Immich server. It uses a robust ADB connection to bypass unstable MTP transfers, leveraging a PC as a secure staging area. Features include duplicate detection, automatic local .zip archiving, full metadata preservation, and granular cleanup control.`,
        repo: 'https://github.com/PabloG55/immich_sync_assistant',
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
        setTimeout(() => setSelected(null), 300);
    };

    return (
        <section id="projects" className="scroll-mt-16 py-20 bg-black text-white">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl font-bold mb-16 text-center">My Projects</h1>
                <Slider {...sliderSettings}>
                    {projects.map((proj) => (
                        <div key={proj.id} className="h-full p-2">
                            <div
                                className="bg-gray-800 p-8 rounded-xl w-full h-72 flex flex-col justify-center items-center shadow-lg hover:shadow-blue-700/50 hover:bg-gray-700 cursor-pointer transition-all duration-300 ease-in-out transform hover:-translate-y-2 text-center"
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
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 transition-opacity duration-300"
                    onClick={handleCloseModal}
                >
                    <div
                        className={`
                            bg-gray-800 rounded-lg overflow-y-auto max-h-[90vh] max-w-3xl w-full p-6 relative
                            transition-all duration-300 transform
                            ${animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                        `}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-3 right-4 text-gray-400 hover:text-white text-3xl font-light z-10"
                            onClick={handleCloseModal}
                        >
                            &times;
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-white">{selected.name}</h2>
                        <p className="mb-6 text-gray-300">{selected.description}</p>
                        <div className="flex flex-wrap justify-center gap-4 mb-6">
                            {selected.images.map((src, i) => (
                                <div key={i} className="flex-shrink-0">
                                    <img
                                        src={src}
                                        alt={`${selected.name} screenshot ${i + 1}`}
                                        className="rounded-md w-full max-w-[280px] h-auto object-contain bg-black/20"
                                    />
                                </div>
                            ))}
                        </div>
                        <a
                            href={selected.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                        >
                            View on GitHub
                        </a>
                    </div>
                </div>
            )}
        </section>
    );
}
