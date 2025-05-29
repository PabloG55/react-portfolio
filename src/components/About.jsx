import React from 'react';

export default function About() {
    return (
        <section id="about" className="scroll-mt-16 py-20 text-gray-300">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-start gap-12">
                    <div className="md:w-1/3">
                        <img src="/src/images/user.png" alt="Profile" className="rounded-xl w-full" />
                    </div>
                    <div className="md:w-2/3">
                        <h1 className="text-4xl font-bold text-white mb-6">About Me</h1>
                        <p className="mb-8">
                            I’m pursuing a B.Sc. in Computer Science with a focus on Software Engineering.
                            I’ve got a solid foundation in Java and real-world leadership/development experience.
                            I love collaborating on sustainability & social-impact software.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Skills */}
                            <div>
                                <h2 className="text-2xl font-bold text-blue mb-4">Skills</h2>
                                <ul className="space-y-2">
                                    <li>
                                        <span className="font-bold">Proficient:</span> Java, Git, SQL, JavaScript, CSS, HTML, Python
                                    </li>
                                    <li>
                                        <span className="font-bold">Competent:</span> C, C++, Assembly, Android Studio, Flask, Spring Boot, React, Dart, Flutter, Linux, Swing, JavaFX
                                    </li>
                                    <li>
                                        <span className="font-bold">Basic:</span> Node, MongoDB
                                    </li>
                                </ul>
                            </div>

                            {/* Education */}
                            <div>
                                <h2 className="text-2xl font-bold text-blue mb-4">Education</h2>
                                <ul className="space-y-2">
                                    <li>
                                        <span className="font-bold">B.Sc. Computer Science with a Concentration in Software Engineering - Expected Dec 2025</span><br/>
                                        Early Entry Student<br/>University Of North Carolina at Charlotte<br/>4.0 GPA
                                    </li>
                                    <li>
                                        <span className="font-bold">Associate in Arts - Computer Science<br/>Graduated 2023</span><br/>
                                        Central Piedmont Community College<br/>4.0 GPA
                                    </li>
                                    {/* add more degrees here */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
