import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Headset, ArrowRight } from 'lucide-react';

const Features = () => {
    const featureData = [
        {
            icon: <Truck size={24} />,
            title: "Free Delivery",
            desc: "Orders over $99",
            bg: "bg-primary/5",
            iconColor: "text-primary"
        },
        {
            icon: <ShieldCheck size={24} />,
            title: "Secure Payment",
            desc: "100% protected",
            bg: "bg-success/5",
            iconColor: "text-success"
        },
        {
            icon: <RotateCcw size={24} />,
            title: "Easy Return",
            desc: "30 days policy",
            bg: "bg-warning/5",
            iconColor: "text-warning"
        },
        {
            icon: <Headset size={24} />,
            title: "24/7 Support",
            desc: "Customer care",
            bg: "bg-info/5",
            iconColor: "text-info"
        }
    ];

    return (
        <section className="py-16 bg-base-100 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] rounded-full" />
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featureData.map((item, index) => (
                        <div 
                            key={index}
                            className="group relative p-8 rounded-[2.5rem] bg-base-200/30 border border-base-300/50 hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
                        >
                            {/* Icon Box */}
                            <div className={`w-14 h-14 rounded-2xl ${item.bg} ${item.iconColor} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm`}>
                                {item.icon}
                            </div>

                            {/* Text Content */}
                            <div className="space-y-2">
                                <h4 className="text-xl font-black text-secondary tracking-tight">
                                    {item.title}
                                </h4>
                                <p className="text-sm font-medium text-neutral/50 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>

                            {/* Decorative Arrow (Visible on Hover) */}
                            <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500 text-primary">
                                <ArrowRight size={20} />
                            </div>

                            {/* Subtle Gradient Overlay on Hover */}
                            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;