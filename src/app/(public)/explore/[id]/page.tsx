import { Metadata } from "next";
// ইমপোর্ট পাথগুলো চেক করুন (আপনার ফোল্ডার স্ট্রাকচার অনুযায়ী)

import { ProductNotFound } from "@/components/products/ProductNotFound";
import { getSingleProduct } from "@/services/product.services";

import RelatedProducts from "../../../../components/products/detail/Relatedproducts";
import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
import ReviewSection from "@/components/products/detail/reviews/ReviewSection";

/**
 * SEO - Dynamic Metadata
 * আপনার ইন্টারফেসে 'title' প্রপার্টি আছে, তাই product.title ব্যবহার করতে হবে।
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getSingleProduct(id);

  if (!product) {
    return {
      title: "Product Not Found | MyStore",
    };
  }

  return {
    title: `${product.title} | MyStore`,
    description: product.shortDescription || product.description.slice(0, 160),
    openGraph: {
      title: product.title,
      description: product.shortDescription,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getSingleProduct(id);

  // যদি প্রোডাক্ট না পাওয়া যায়
  if (!product) return <ProductNotFound />;

  // ডিসকাউন্ট ক্যালকুলেশন লজিক (compareAtPrice থাকলে)
  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(
          ((product.compareAtPrice - product.price) / product.compareAtPrice) *
            100,
        )
      : null;

  return (
    <main className="min-h-screen">
      {/* ① Product Detail (Client Component) */}
      <ProductDetailClient product={product} discount={discount} />

      <div className="container mx-auto px-4">
        <div className="h-px bg-base-300/60 my-12" />
      </div>

      {/* ② Reviews & Ratings Section */}
      <ReviewSection
        productId={product._id}
        productRating={product.rating}
        ratingCount={product.ratingCount ?? 0}
      />

      <div className="container mx-auto px-4">
        <div className="h-px bg-base-300/60 mb-12" />
      </div>

      {/* ③ Related Products Section */}
      <RelatedProducts category={product.category} currentId={product._id} />
    </main>
  );
}
