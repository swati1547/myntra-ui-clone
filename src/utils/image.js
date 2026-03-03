export function getPrimaryImage(product, selectedColor) {
  // If color is provided → find that variant
  if (selectedColor) {
    const variant = product?.colorVariants?.find(
      (v) => v.color === selectedColor,
    );

    return variant?.images?.find((img) => img.isPrimary);
  }

  // Default(ProductCard)
  return product?.colorVariants?.[0]?.images?.find((img) => img.isPrimary);
}
