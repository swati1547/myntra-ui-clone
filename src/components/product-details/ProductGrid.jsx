import React from "react";
import ProductCard from "./ProductCard";
import { useGetProductsBySubCategorySlugQuery } from "../../store/slices/products";

export default function ProductGrid({ subCategorySlug }) {
  const { data: products = [] } =
    useGetProductsBySubCategorySlugQuery(subCategorySlug);

  if (!products.length) return <p>No products found</p>;

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
