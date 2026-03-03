import HomePage from "./Pages/HomePage";
import MainLayout from "./components/layout/MainLayout";
import ProductOverview from "./components/product-details/ProductOverview";
import ProductListingPage from "./Pages/ProductListingPage";
import CategoryLandingPage from "./pages/CategoryPage";
import WishlistPage from "./pages/WishlistPage";

const routes = [
  {
    element: <MainLayout />, // LAYOUT WRAPPER
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: ":categorySlug/:subCategorySlug",
        element: <ProductListingPage />,
      },
      {
        path: "product/:productSlug/:productId",
        element: <ProductOverview />,
      },
      {
        path: "wishlist",
        element: <WishlistPage />,
      },
      //////////////////
      {
        path: ":categorySlug",
        element: <CategoryLandingPage />, // or ProductListingPage reuse
      },
      {
        path: "*",
        element: <p>Not Found</p>,
      },
    ],
  },
];

export default routes;
