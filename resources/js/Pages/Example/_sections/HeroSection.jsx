import React from 'react';

export default function HeroSection() {
    return (
        <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-950 text-white rounded-3xl shadow-2xl p-8 lg:p-12 mb-8 border border-purple-700/30">
            {/* Subtle background glow effect */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-800/60 border border-violet-500/30 text-purple-200 text-xs font-bold uppercase tracking-widest shadow-inner">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Peer Tutoring & Lab Support
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                    Get Instant Code Assistance in the Lab
                </h1>

                {/* Description */}
                <p className="text-purple-100 text-base sm:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
                    Stuck on an algorithm, styling bug, or database query? Submit a ticket with your workstation details, and a peer tutor will jump in to help.
                </p>

                {/* Call to Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                    <a
                        href="#submit"
                        className="px-6 py-3.5 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-xl shadow-lg hover:shadow-violet-500/30 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                        Submit a Ticket
                    </a>
                    <a
                        href="#table-queue"
                        className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 backdrop-blur-sm transition-all duration-200"
                    >
                        View Active Queue
                    </a>
                </div>
            </div>
        </section>
    );
}