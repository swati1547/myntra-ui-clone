import { useSelector } from "react-redux";
import { useGetProductsQuery } from "../store/slices/products";
import WishlistCard from "../components/WishlistCard";

export default function Wishlist() {
  const wishlistItems = useSelector((state) => state.wishlist);
  const { data: products } = useGetProductsQuery();

  return (
    <div className="wishlist">
      <h3 className="wishlist__heading">
        My Wishlist{" "}
        <span className="wishlist__heading-subhead">
          {wishlistItems.length} items
        </span>
      </h3>
      <div className="wishlist__layout">
        {wishlistItems.map((item) => {
          const product = products?.find((p) => p.id === item.productId);

          if (!product) return null;

          return (
            <WishlistCard
              key={item.productId + item.selectedColor}
              product={product}
              selectedColor={item.selectedColor}
            />
          );
        })}
      </div>
    </div>
  );
}
