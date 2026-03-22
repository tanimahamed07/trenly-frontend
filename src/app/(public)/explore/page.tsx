import { getAllProducts } from "@/services/product.services";
import ExploreClient from "./ExploreClient";

export default async function ExplorePage() {
  // Initial fetch for first render
  const initialData = await getAllProducts("page=1&limit=9");

  return (
    <ExploreClient 
      initialProducts={initialData?.data || []} 
      initialMeta={initialData?.meta || { total: 0, limit: 9 }} 
    />
  );
}