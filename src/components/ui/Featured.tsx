import React from 'react';
import Link from 'next/link';
import { Smartphone, Shirt, Home, Trophy, ArrowRight } from 'lucide-react';

const categories = [
    {
        name: "Electronics",
        slug: "electronics",
        icon: <Smartphone size={32} />,
        count: "150+ Products",
        color: "bg-blue-500/10 text-blue-600"
    },
    {
        name: "Fashion",
        slug: "fashion",
        icon: <Shirt size={32} />,
        count: "280+ Products",
        color: "bg-purple-500/10 text-purple-600"
    },
    {
        name: "Home",
        slug: "home",
        icon: <Home size={32} />,
        count: "120+ Products",
        color: "bg-orange-500/10 text-orange-600"
    },
    {
        name: "Sports",
        slug: "sports",
        icon: <Trophy size={32} />,
        count: "90+ Products",
        color: "bg-green-500/10 text-green-600"
    }
];

const Featured = () => {
    return (
        <section className="py-20 bg-base-100">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="flex justify-between items-end mb-12">
                    <div className="space-y-2">
                        <h2 className="text-3xl md:text-4xl font-black text-secondary tracking-tight">
                            Shop by <span className="text-primary italic">Category</span>
                        </h2>
                        <p className="text-neutral/50 font-medium">Explore our curated collections</p>
                    </div>
                    <Link href="/explore" className="btn btn-ghost btn-sm text-primary gap-2 group">
                        View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, index) => (
                        <Link 
                            key={index}
                            href={`/explore?category=${cat.slug}`}
                            className="group relative overflow-hidden p-8 rounded-[2.5rem] bg-base-200/50 border border-base-300/50 hover:border-primary/30 transition-all duration-500"
                        >
                            {/* Icon Box */}
                            <div className={`w-16 h-16 rounded-3xl ${cat.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500`}>
                                {cat.icon}
                            </div>

                            {/* Info */}
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-secondary mb-1">{cat.name}</h3>
                                <p className="text-xs font-bold opacity-40 uppercase tracking-widest">{cat.count}</p>
                            </div>

                            {/* Background Hover Effect */}
                            <div className="absolute -bottom-4 -right-4 text-primary/5 group-hover:text-primary/10 transition-colors duration-500">
                                {React.cloneElement(cat.icon as React.ReactElement, { size: 120 })}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Featured;