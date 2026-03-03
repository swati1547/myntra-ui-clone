import React, { useState } from "react";
import OfferPlans from "../components/product-details/OfferPlans";
import DeliveryOptions from "../components/product-details/DeliveryOptions";
import ProductSpecs from "../components/product-details/ProductSpecs";
import ProductIntro from "../components/product-details/ProductIntro";
import VarientSelector from "../components/product-details/VariantSelector";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import HotelClassOutlinedIcon from "@mui/icons-material/HotelClassOutlined";

export default function ProductDetailsPage({
  product,
  selectedColor,
  setSelectedColor,
}) {
  const [selectedVariant, setSelectedVariant] = useState(null);

  return (
    <div className="pdp" style={{ marginBottom: "50rem" }}>
      <ProductIntro product={product} />

      <hr className="hr" />

      <VarientSelector
        product={product}
        selectedVariant={selectedVariant}
        onSelect={setSelectedVariant}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />

      <hr className="hr" />

      <div className="delivery-options">
        <h3 className="pdp__title">
          Delivery Options
          <LocalShippingOutlinedIcon />
        </h3>
        <DeliveryOptions />
      </div>

      <div>
        <p className="original-products">100% Original Products</p>
        <h3 className="pdp__title">
          BEST OFFERS
          <SellOutlinedIcon />
        </h3>
        <OfferPlans />
      </div>

      <hr className="hr" />

      <div className="specs">
        <h3 className="pdp__title">
          Product Details
          <ArticleOutlinedIcon />
        </h3>
        <ProductSpecs product={product} />
      </div>

      <hr className="hr" />
    </div>
  );
}
