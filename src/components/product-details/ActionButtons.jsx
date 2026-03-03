import { useDispatch } from "react-redux";
import { addToWishlist } from "../../store/slices/wishlist";

export default function ActionButtons({ productId, selectedColor }) {
  const dispatch = useDispatch();

  const handleWishlist = () => {
    dispatch(
      addToWishlist({
        productId,
        selectedColor,
      }),
    );
  };

  return (
    <div className="button">
      <button type="button" className="button__style button__bag">
        Add to bag
      </button>

      <button
        type="button"
        className="button__style button__wishlist"
        onClick={handleWishlist}
      >
        Wishlist
      </button>
    </div>
  );
}
