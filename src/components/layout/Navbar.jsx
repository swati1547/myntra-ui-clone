import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Box, InputBase } from "@mui/material";
import { NavigationMenu } from "@base-ui/react/navigation-menu";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import departments from "../../data/departments";
import { useGetAllCategoriesbyDeptQuery } from "../../store/api/categoryApi";
import logo from "../../assets/images/logo.png";

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState("");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);

  const {
    data: categories = [],
    isLoading,
    error,
  } = useGetAllCategoriesbyDeptQuery(selectedDepartmentId, {
    skip: !selectedDepartmentId,
  });

  const closeMenu = useCallback(() => {
    setActiveMenu("");
    setSelectedDepartmentId(null);
  }, []);

  return (
    <header className="header">
      {activeMenu && <div className="nav-overlay" onMouseEnter={closeMenu} />}

      <nav className="navbar">
        <Box className="navbar__left">
          <img className="navbar__logo" src={logo} alt="logo" />
        </Box>

        <NavigationMenu.Root
          className="nav-menu"
          value={activeMenu}
          onValueChange={setActiveMenu}
          onMouseLeave={closeMenu}
        >
          <NavigationMenu.List className="nav-menu__list">
            {departments.map((department) => (
              <NavigationMenu.Item
                key={department._id}
                value={department._id}
                className="nav-menu__item"
                onMouseEnter={() => {
                  setSelectedDepartmentId(department._id);
                }}
              >
                <NavigationMenu.Trigger className="nav-menu__trigger">
                  {department.department_name}
                </NavigationMenu.Trigger>

                <NavigationMenu.Content className="nav-menu__content">
                  <ul className="nav-menu__dropdown">
                    {categories.map((category) => {
                      return (
                        <li
                          key={category.categoryId}
                          className="dropdown-category"
                        >
                          <p className="dropdown-title">
                            {category.categoryName}
                          </p>

                          <ul className="dropdown-sublist">
                            {category.subCategories?.map((subCategory) => (
                              <li key={subCategory.id}>
                                <Link
                                  to={`/${category.categorySlug}/${subCategory.slug}`}
                                  className="nav-menu__dropdown-link"
                                  onClick={closeMenu}
                                >
                                  {subCategory.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      );
                    })}
                  </ul>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            ))}

            <NavigationMenu.Item value="studio" className="nav-menu__item">
              <NavigationMenu.Trigger className="nav-menu__trigger">
                STUDIO
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="nav-menu__content">
                <p>Studio</p>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          </NavigationMenu.List>

          <NavigationMenu.Viewport className="nav-menu__viewport" />
        </NavigationMenu.Root>

        <Box className="navbar__right">
          <div className="navbar__search">
            <SearchOutlinedIcon
              sx={{ color: "#696e79", fontSize: "1.25rem" }}
            />
            <InputBase
              placeholder="Search for products, brands and more"
              sx={{ fontSize: "0.875rem", width: "100%" }}
            />
          </div>
        </Box>

        <Box className="navbar__actions">
          <Link className="navbar__actions__action">
            <PermIdentityIcon />
            <p>Profile</p>
          </Link>
          <Link to="wishlist" className="navbar__actions__action">
            <FavoriteBorderIcon />
            <p>Wishlist</p>
          </Link>
          <Link className="navbar__actions__action">
            <ShoppingBagOutlinedIcon />
            <p>Bag</p>
          </Link>
        </Box>
      </nav>
    </header>
  );
}
