import { getAllProducts } from "@/services/product.services";
import ExploreClient from "./ExploreClient";

interface TExplorePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ExplorePage({ searchParams }: TExplorePageProps) {
  const params = await searchParams;
  
  const query = new URLSearchParams();
  if (params.category) query.append("category", params.category as string);
  if (params.search) query.append("search", params.search as string);
  if (params.sort) query.append("sort", params.sort as string);
  if (params.page) query.append("page", params.page as string);
  if (params.priceMax) query.append("priceMax", params.priceMax as string);
  
  query.append("limit", "9");

  const initialData = await getAllProducts(query.toString());

  return (
    <ExploreClient 
      initialProducts={initialData?.data || []} 
      initialMeta={initialData?.meta || { total: 0, limit: 9 }} 
    />
  );
}