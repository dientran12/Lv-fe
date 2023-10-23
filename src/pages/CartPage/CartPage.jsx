import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCheckbox,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import ButtonBuyProduct from "~/components/ButtonComponent/ButtonBuyProduct";
import CardProductCart from "~/components/CardComponent/CardProductCart";
export default function CartPage() {
    const dataProduct = [
        { name: "IPhone 13", price: "6000" },
        { name: "IPhone 13", price: "6000" },
        { name: "IPhone 13", price: "6000" },
        { name: "IPhone 13", price: "6000" },
        { name: "IPhone 13", price: "6000" },
        { name: "IPhone 13", price: "6000" },
        { name: "IPhone 13", price: "6000" },
        { name: "IPhone 13", price: "6000" }
    ]
    const [checkedItems, setCheckedItems] = useState(dataProduct.map(() => false));
    const checkedItemsCount = checkedItems.filter(item => item).length;
    const [isAllProductsChecked, setIsAllProductsChecked] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0); // Tổng giá trị của các sản phẩm được chọn
    const [quantity, setQuantity] = useState(dataProduct.map(() => 1)); // Mảng lưu số lượng sản phẩm

    useEffect(() => {
        // Tính tổng giá trị dựa trên danh sách sản phẩm, danh sách các checkbox và số lượng sản phẩm
        let newTotalPrice = 0;
        for (let i = 0; i < dataProduct.length; i++) {
            if (checkedItems[i]) {
                newTotalPrice += parseFloat(dataProduct[i].price) * quantity[i];
            }
        }
        setTotalPrice(newTotalPrice);
    }, [checkedItems, quantity]);

    // Xử lý khi checkbox "Choose all products" thay đổi
    const handleAllCheckboxClick = () => {
        setIsAllProductsChecked(!isAllProductsChecked);
        setCheckedItems(dataProduct.map(() => !isAllProductsChecked));
    };

    // Xử lý khi checkbox của sản phẩm thay đổi
    const handleCheckboxChange = (index, isChecked) => {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[index] = isChecked;
        setCheckedItems(newCheckedItems);
    };

    // Xử lý khi số lượng sản phẩm thay đổi
    const handleQuantityChange = (index, newQuantity) => {
        const newQuantityArr = [...quantity];
        newQuantityArr[index] = newQuantity;
        setQuantity(newQuantityArr);
    };
    return (
        <div className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol>
                        <MDBCard >
                            <MDBCardBody className="p-4">
                                <MDBRow>
                                    <div className=" pt-3 pt-1 ps-3 titleMyCartContent">Cart</div>
                                    <hr className="my-3" />
                                    {dataProduct.map((item, index) => (
                                        <CardProductCart
                                            key={index}
                                            item={item}
                                            isChecked={checkedItems[index]}
                                            onCheckboxChange={(isChecked) => handleCheckboxChange(index, isChecked)}
                                            quantity={quantity[index]}
                                            onQuantityChange={(newQuantity) => handleQuantityChange(index, newQuantity)}
                                        />
                                    ))}
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <div className={`fixed-bottom bg-white h-25 ${checkedItemsCount > 0 ? 'show' : ''}`}>
                <MDBContainer>
                    <MDBRow className="my-5">
                        <MDBCol className="d-flex flex-row align-items-center" lg="6">
                            {/* <MDBCheckbox id='flexCheckDefault' className='me-3' /> */}
                            <MDBCheckbox
                                id='flexCheckDefault'
                                className='me-3'
                                checked={isAllProductsChecked}
                                onChange={handleAllCheckboxClick}
                            />
                            <div style={{ fontSize: '18px', opacity: '0.8' }}>Choose all products({dataProduct.length}) items</div>
                        </MDBCol>
                        <MDBCol className="d-flex flex-row-reverse align-items-center" lg="6"  >
                            <ButtonBuyProduct />
                            <div className="me-3" style={{ fontSize: '18px', opacity: '0.9' }}>
                                Total cost of goods({checkedItemsCount}):
                                <div style={{ color: 'red' }}>{totalPrice} đ</div>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        </div>
    );
}
