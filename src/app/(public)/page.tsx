import React from "react";

const page = () => {
  return (
    <main>
      {/* Hero — screen height এর 60-70% */}
      <section className="min-h-[65vh] flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Shop Smarter with Trendly</h1>
          <p className="text-xl mb-8">
            Discover thousands of products at the best prices
          </p>
          <a
            href="/explore"
            className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:scale-105 transition"
          >
            Explore Products
          </a>
        </div>
      </section>

      {/* বাকি sections যোগ করো */}
    </main>
  );
};

export default page;
