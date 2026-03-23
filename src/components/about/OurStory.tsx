import React from 'react';
import { Heart, ShieldCheck, Zap, Globe } from 'lucide-react';

const OurStory = () => {
    const values = [
        {
            icon: <Heart className="text-primary" size={24} />,
            title: "Customer First",
            description: "Your satisfaction is our ultimate priority. We meticulously verify every product's quality before it reaches your doorstep."
        },
        {
            icon: <ShieldCheck className="text-primary" size={24} />,
            title: "Authentic Quality",
            description: "At TRENDly, we guarantee only 100% authentic brands and premium materials for a long-lasting experience."
        },
        {
            icon: <Zap className="text-primary" size={24} />,
            title: "Fast Delivery",
            description: "We value your time. Our logistics network is optimized to ensure your favorite products reach you as fast as possible."
        },
        {
            icon: <Globe className="text-primary" size={24} />,
            title: "Modern Lifestyle",
            description: "Stay ahead of the curve with the latest fashion trends and cutting-edge electronics curated for the digital age."
        }
    ];

    return (
        <section className="py-20 bg-base-100">
            <div className="container mx-auto px-6">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-4">
                            Our Philosophy
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-secondary leading-tight tracking-tighter mb-4">
                            Beyond Just <span className="text-primary italic">Selling</span>,<br /> 
                            We Build Trust.
                        </h2>
                        <p className="text-neutral/70 leading-relaxed text-lg">
                            Founded in 2026, TRENDly has quickly become a symbol of trust and innovation. Our mission is to transform everyday shopping into an extraordinary experience, believing that premium quality and style should be accessible to everyone.
                        </p>
                    </div>
                    <div className="hidden lg:block bg-primary/5 p-8 rounded-[2.5rem] border border-primary/10 shadow-sm">
                        <p className="text-primary font-black text-6xl italic tracking-tighter leading-none">10K+</p>
                        <p className="text-secondary font-bold text-xs uppercase tracking-[0.2em] mt-2">Happy Customers</p>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((item, index) => (
                        <div 
                            key={index} 
                            className="group p-8 rounded-[2rem] bg-base-200 border border-base-300 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-2xl hover:shadow-primary/5"
                        >
                            <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-base-100 shadow-inner group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 mb-6">
                                {React.cloneElement(item.icon as React.ReactElement, { 
                                    className: "group-hover:text-white transition-colors duration-500" 
                                })}
                            </div>
                            <h4 className="text-xl font-black text-secondary mb-3 italic tracking-tight">
                                {item.title}
                            </h4>
                            <p className="text-sm text-neutral/60 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Bottom Visual Section */}
                <div className="mt-20 relative rounded-[3rem] overflow-hidden bg-secondary p-12 lg:p-20 text-center border border-white/10 shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 to-transparent" />
                        <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-[120px]" />
                        <div className="absolute bottom-10 right-10 w-64 h-64 bg-accent rounded-full blur-[120px]" />
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter mb-6 relative z-10">
                        Ready to Elevate Your Lifestyle?
                    </h3>
                    <p className="text-white/70 max-w-xl mx-auto mb-10 relative z-10 text-lg font-medium">
                        Join our global community and explore the latest collections. We are committed to bringing you nothing but the best.
                    </p>
                    <button className="btn btn-primary btn-lg rounded-2xl px-12 text-white shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all relative z-10 border-none">
                        Explore Collection
                    </button>
                </div>

            </div>
        </section>
    );
};

export default OurStory;