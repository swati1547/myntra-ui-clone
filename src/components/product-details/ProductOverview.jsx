import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Box } from "@mui/material";

import { useGetProductsByIdQuery } from "../../store/slices/products";
import { useBreadcrumbContext } from "../../context/BreadcrumbContext";
import ProductDetailsPage from "../../pages/ProductDetailsPage";

export default function ProductOverview() {
  const { productId } = useParams();
  const [searchParams] = useSearchParams();
  const colorFromUrl = searchParams.get("color");

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductsByIdQuery(productId);

  const { setItems } = useBreadcrumbContext();

  //  Selected Color State (Lifted Up)
  const [selectedColor, setSelectedColor] = useState(null);

  //  Set default color when product loads
  useEffect(() => {
    if (!product?.colorVariants?.length) return;

    // If URL has color and it exists in product
    if (
      colorFromUrl &&
      product.colorVariants.some((v) => v.color === colorFromUrl)
    ) {
      setSelectedColor(colorFromUrl);
    } else {
      // Normal open from product list
      setSelectedColor(product.colorVariants[0].color);
    }
  }, [product, colorFromUrl]);

  //  Breadcrumb setup
  useEffect(() => {
    if (!product) return;

    setItems([
      { label: "Home", to: "/" },
      { label: product.categoryName, to: `/${product.categorySlug}` },
      {
        label: product.subCategoryName,
        to: `/${product.categorySlug}/${product.subCategorySlug}`,
      },
      {
        label: product.brandName,
        to: `/brand/${product.brandSlug}`,
      },
      { label: product.name },
    ]);
  }, [product, setItems]);

  if (isLoading) return <p>Loading product...</p>;
  if (isError) return <p>Failed to load product</p>;
  if (!product) return null;

  //  Get images based on selected color
  const selectedColorImages = product?.colorVariants?.find(
    (colorVar) => colorVar.color === selectedColor,
  )?.images;

  return (
    <Box className="product-overview">
      <Box className="product-overview__gallery">
        {selectedColorImages?.map((img) => (
          <Box
            key={`${selectedColor}-${img.url}`}
            component="img"
            src={img.url}
            alt={img.altText}
            className="product-overview__image"
          />
        ))}
      </Box>

      <Box className="product-overview__details">
        <ProductDetailsPage
          product={product}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      </Box>
    </Box>
  );
}
