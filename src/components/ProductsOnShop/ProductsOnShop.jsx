import React from 'react'
import NavbarProductShop from '../NavbarComponent/NavbarProductShop'

const ProductsOnShop = () => {
    const menuList = [
        { name: "All Products", path: "all-product-shop" },
        { name: "Create Product", path: "create-product" },
        { name: "Categories", path: "product-categories" },
        { name: "Promotion", path: "#" }
    ];
    return (
        <>
            <NavbarProductShop menuList={menuList} baseUrl="/my-shop/products" />
            <div>content</div>
        </>
    )
}

export default ProductsOnShop
