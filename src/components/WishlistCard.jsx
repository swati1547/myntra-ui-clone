import { calculateDiscountedPrice, getPrimaryImage } from "../utils";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeFromWishlist } from "../store/slices/wishlist";

export default function WishlistCard({ product, selectedColor }) {
  const primaryImage = getPrimaryImage(product, selectedColor);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const discountedPrice = calculateDiscountedPrice(
    product?.basePrice,
    product?.discountPercentage,
  );

  const openProduct = () => {
    navigate(
      `/product/${product.productSlug}/${product.id}?color=${selectedColor}`,
    );
  };

  const handleRemove = (e) => {
    e.stopPropagation(); // prevent card click

    dispatch(
      removeFromWishlist({
        productId: product.id,
        selectedColor,
      }),
    );
  };

  return (
    <div className="wishlist-card" onClick={openProduct}>
      <div className="wishlist-card__imageWrapper">
        <img
          className="wishlist-card__image"
          src={primaryImage?.url}
          alt={primaryImage?.altText}
        />

        <button className="wishlist-card__remove" onClick={handleRemove}>
          <CloseIcon
            sx={{
              fontSize: 16,
              color: "#545764",
            }}
          />
        </button>
      </div>

      <p className="wishlist-card__title">
        <span>{product?.brandName}</span>
        <span>{product?.name}</span>
      </p>

      <>
        {product?.discountPercentage ? (
          <div className="wishlist-card__priseSet">
            <span className="wishlist-card__price">Rs.{discountedPrice}</span>
            <del className="wishlist-card__mrp">Rs.{product?.basePrice}</del>
            <span className="wishlist-card__discount">
              {product?.discountPercentage}% OFF
            </span>
          </div>
        ) : (
          <p className="wishlist-card__price">Rs.{product?.basePrice}</p>
        )}
      </>
      <div className="wishlist-card__bag">
        <p className="wishlist-card__text">Move To Bag</p>
      </div>
    </div>
  );
}
