import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
    MDBCardImage,
    MDBCheckbox,
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ButtonBuyProduct from "~/components/ButtonComponent/ButtonBuyProduct";
import CardProductCart from "~/components/CardComponent/CardProductCart";
import * as CartService from '~/services/CartService'
import NoimageShop from '~/assets/images/imageDefaultShop.png';
import { formatCurrency, formatCurrencyUSD } from "~/utils";

export default function CartPage() {
    const user = useSelector((state) => {
        return state?.user
    })

    const [checkedItems, setCheckedItems] = useState({});
    const checkedItemsCount = Object.values(checkedItems).filter(isChecked => isChecked).length;
    const [isAllProductsChecked, setIsAllProductsChecked] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [quantities, setQuantities] = useState({});

    const getAllProductOnCart = async (id) => {
        if (!id) {
            return null
        }
        const res = await CartService.getAllProductOnCart(user?.accessToken)
        return res
    }

    const queryCartItems = useQuery({
        queryKey: ['cartItems'],
        queryFn: () => getAllProductOnCart(user?.accessToken),
        enabled: !!user?.accessToken,
    });
    const { isLoading: isLoadingProduct, data: cartItems } = queryCartItems;

    useEffect(() => {
        if (cartItems) {
            const newCheckedItems = {};
            const newQuantities = {};
            cartItems.forEach((shop) => {
                shop.ShopItems.forEach((item) => {
                    newCheckedItems[item.id] = false; // Khởi tạo trạng thái checked là false
                    newQuantities[item.id] = item.quantity; // Khởi tạo số lượng
                });
            });
            setCheckedItems(newCheckedItems);
            setQuantities(newQuantities);
        }
    }, [cartItems]);


    useEffect(() => {
        if (cartItems) {
            let newTotalPrice = 0;
            cartItems.forEach((shop) => {
                shop.ShopItems.forEach((item) => {
                    if (checkedItems[item.id]) { // Kiểm tra trạng thái checked dựa trên ID sản phẩm
                        newTotalPrice += parseFloat(item.discountPrice) * quantities[item.id]; // Giả sử quantities sử dụng ID sản phẩm
                    }
                });
            });
            console.log("newTotalPrice", newTotalPrice)
            setTotalPrice(newTotalPrice);
        }
    }, [checkedItems, quantities, cartItems]);


    // console.log('cartItems:', cartItems);
    console.log('quantities:', quantities);
    console.log('checkedItems:', checkedItems);

    const handleCheckboxChange = (itemId, isChecked) => {
        setCheckedItems(prevItems => ({ ...prevItems, [itemId]: isChecked }));
    };


    const handleQuantityChange = (itemId, newQuantity) => {
        setQuantities(prevQuantities => ({ ...prevQuantities, [itemId]: parseInt(newQuantity, 10) }));
    };

    console.log('cartItems:', cartItems && cartItems);

    const handleBuyClick = () => {
        // Xử lý khi người dùng nhấn mua
        console.log('totalPrice', totalPrice)
        // console.log('cartItems', cartItems)
        const selectedProducts = [];

        cartItems.forEach((shop) => {
            shop.ShopItems.forEach((item) => {
                if (checkedItems[item.id]) {
                    selectedProducts.push({
                        ...item,
                        shopImage: shop?.shopImage,
                        shopName: shop?.shopName,
                        quantity: quantities[item.id]
                    });
                }
            });
        });
        console.log('Selected Products for Purchase:', selectedProducts);

        return selectedProducts.map(item => ({
            shopImage: item?.shopImage,
            shopName: item?.shopName,
            shopId: item.shop_id, // Thay thế bằng thông tin thực tế từ item
            versionId: item.version_id, // Thay thế bằng thông tin thực tế từ item
            total: item.quantity, // Đã có từ `quantities`
            sellingPrice: item.discountPrice, // Giả sử có trong thông tin sản phẩm
            price: item.price, // Giả sử có trong thông tin sản phẩm
            image: item.image, // Giả sử có trong thông tin sản phẩm
            sizeName: item.sizeName, // Thay thế bằng thông tin thực tế từ item
            sizeId: item.sizeId, // Thay thế bằng thông tin thực tế từ item
            quantity: item.quantity // Đã có từ `quantities`
            // sizes: [{
            // }]
        }));

    };

    const handleAllCheckboxClick = () => {
        const newCheckedState = !isAllProductsChecked;
        setIsAllProductsChecked(newCheckedState);
        const newCheckedItems = {};
        cartItems.forEach((shop) => {
            shop.ShopItems.forEach((item) => {
                newCheckedItems[item.id] = newCheckedState;
            });
        });
        setCheckedItems(newCheckedItems);
    };


    return (
        <div className="" style={{ backgroundColor: "#eee" }}>
            <MDBContainer className=" ">
                <div className=" pt-3 px-5 titleMyCartContent bg-white mb-3">
                    Cart
                    <hr className="my-3 pb-4" />
                </div>
                {cartItems && cartItems?.map((Shop, index) => (
                    <div className="  mb-3" key={index}>
                        <div className="d-flex flex-row align-items-center" style={{ backgroundColor: "#f9f09c" }}>
                            <MDBCardImage
                                src={Shop?.shopImage || NoimageShop}
                                className="rounded-2 me-2"
                                style={{ width: "40px" }}
                                alt="Shopping item"
                            />
                            <MDBTypography tag="dt">
                                {Shop?.shopName}
                            </MDBTypography>
                        </div>
                        <div>
                            {Shop?.ShopItems?.map((cartItem, index) => (
                                <CardProductCart
                                    key={cartItem.id}
                                    index={cartItem.id}
                                    item={cartItem}
                                    isChecked={checkedItems[cartItem.id]}
                                    onCheckboxChange={handleCheckboxChange}
                                    onQuantityChange={handleQuantityChange}
                                    queryCartItems={queryCartItems}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </MDBContainer>
            <div className={`fixed-bottom bg-white h-25 ${checkedItemsCount > 0 ? 'show' : ''}`}>
                <MDBContainer>
                    <MDBRow className="my-5">
                        <MDBCol className="d-flex flex-row align-items-center" lg="6">
                            <MDBCheckbox
                                id='flexCheckDefault'
                                className='me-3'
                                checked={isAllProductsChecked}
                                onChange={handleAllCheckboxClick} // Thêm hàm onChange tại đây
                            />
                            <div style={{ fontSize: '18px', opacity: '0.8' }}>Choose all products</div>
                        </MDBCol>
                        <MDBCol className="d-flex flex-row-reverse align-items-center" lg="6"  >
                            <ButtonBuyProduct
                                color="danger"
                                className="shadow-0"
                                onBuyClick={handleBuyClick} />
                            <div className="me-3" style={{ fontSize: '18px', opacity: '0.9' }}>
                                Total cost of goods({checkedItemsCount}):
                                <div style={{ color: 'red' }}>{formatCurrencyUSD(totalPrice)}</div>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        </div>
    );
}
