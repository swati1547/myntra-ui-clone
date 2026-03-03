import React, { useState } from "react";
import ProductPrice from "./ProductPrice";
import ActionButtons from "./ActionButtons";

export default function VarientSelector({
  product,
  selectedVariant,
  onSelect,
  selectedColor,
  setSelectedColor,
}) {
  const calculateDiscountedPrice = (price) => {
    if (!product.discountPercentage) return price;
    const discounted = price - (price * product.discountPercentage) / 100;
    return Math.round(discounted);
  };

  // FILTER VARIANTS BY COLOR
  const filteredVariants =
    product?.variants?.filter((v) => v.color === selectedColor) || [];

  const prices = filteredVariants.map((v) => v.price);
  const isSamePrice = prices.length > 0 && prices.every((p) => p === prices[0]);

  const finalPrice = selectedVariant
    ? calculateDiscountedPrice(selectedVariant.price)
    : calculateDiscountedPrice(product.basePrice);

  return (
    <div className="variant">
      <ProductPrice product={product} finalPrice={finalPrice} />

      {/* ================= COLORS ================= */}
      <p className="variant__heading">More Colors</p>

      <div className="variant__list">
        {product?.colorVariants?.map((colorVar) => {
          const primaryImage = colorVar.images.find((img) => img.isPrimary);

          const isSelected = selectedColor === colorVar.color;

          return (
            <div
              key={colorVar.color}
              onClick={() => {
                setSelectedColor(colorVar.color);
                onSelect(null); // reset size when color changes
              }}
            >
              <img
                src={primaryImage?.url}
                alt={primaryImage?.altText}
                className="variant__color-img"
              />
            </div>
          );
        })}
      </div>

      {/* ================= SIZES ================= */}
      <p className="variant__heading">Select Size</p>

      <div className="variant__list">
        {filteredVariants.map((variant) => {
          const price = calculateDiscountedPrice(variant.price);
          const isAvailable = variant.stock > 0;

          return (
            <div
              key={variant.variantId}
              onClick={() => isAvailable && onSelect(variant)}
              className={`
                variant__circle
                ${
                  selectedVariant?.variantId === variant.variantId
                    ? "variant__selected"
                    : "variant__unselected"
                }
                ${!isAvailable ? "variant__disabled" : ""}
                ${!isSamePrice ? "variant__diff-price" : ""}
              `}
            >
              <div className="variant__size">{variant.size}</div>

              {!isSamePrice && <div className="variant__price">₹{price}</div>}
            </div>
          );
        })}
      </div>

      <ActionButtons productId={product.id} selectedColor={selectedColor} />
    </div>
  );
}
