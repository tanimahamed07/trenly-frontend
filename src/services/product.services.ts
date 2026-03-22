// services/productService.ts


export const getTrendingProducts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/items?isTrending=true&limit=8`,
     { cache: "no-store" }, // ← এটা দাও আপাতত
  );

  if (!res.ok) {
    // এরর হ্যান্ডেল করা ভালো
    return [];
  }

  const data = await res.json();

  return data.success ? data.data : [];
};

export const getNewArrivalProducts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/items?sort=-createdAt&limit=8`,
    {
      next: {
        revalidate: 3600,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data.success ? data.data : [];
};

export const getTopRatedProducts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/items?rating=4&limit=8`,
    {
      next: {
        revalidate: 3600,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data.success ? data.data : [];
};
