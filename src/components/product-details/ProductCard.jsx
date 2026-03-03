import { useCallback } from "react";
import { calculateDiscountedPrice, getPrimaryImage } from "../../utils";

export default function ProductCard({ product }) {
  const handleClick = useCallback(() => {
    window.open(`/product/${product.productSlug}/${product.id}`, "_blank");
  }, [product]);

  const primaryImage = getPrimaryImage(product);

  const discountedPrice = calculateDiscountedPrice(
    product?.basePrice,
    product?.discountPercentage,
  );

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="product-card__imageWrapper">
        <img
          className="product-card__image"
          src={primaryImage?.url}
          alt={primaryImage?.altText}
        />
        {product?.ratingAverage && (
          <div className="product-card__rating">
            <span className="product-card__rating-value">
              {product.ratingAverage}
            </span>
            <span className="product-card__rating-star">★</span>
            <span className="product-card__rating-count">
              | {product.reviewCount}
            </span>
          </div>
        )}
      </div>

      <p className="product-card__brand">{product?.brandName}</p>
      <p className="product-card__name">{product?.name}</p>

      {product?.discountPercentage ? (
        <div className="product-card__priseSet">
          <span className="product-card__price">Rs.{discountedPrice}</span>
          <del className="product-card__mrp">Rs.{product?.basePrice}</del>
          <span className="product-card__discount">
            {product?.discountPercentage}% OFF
          </span>
        </div>
      ) : (
        <p className="product-card__price">Rs.{product?.basePrice}</p>
      )}
    </div>
  );
}
