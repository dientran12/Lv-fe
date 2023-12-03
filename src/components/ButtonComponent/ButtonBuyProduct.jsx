import { MDBBtn, MDBModalBody, MDBRow } from 'mdb-react-ui-kit'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ModalComponent from '../ModalComponent/ModalComponent';

const ButtonBuyProduct = ({ disabled = false, onBuyClick }) => {
    const navigate = useNavigate();

    const handleOnClickBuy = async () => {
        // Gọi hàm xử lý khi người dùng nhấn mua
        // onBuyClick();
        const dataWhenClickedBuy = await onBuyClick();
        const shopMap = new Map();
        dataWhenClickedBuy.forEach((item) => {
            const { shopId, shopName, shopImage, ...otherProps } = item;
            if (shopMap.has(shopId)) {
                shopMap.get(shopId).items.push(otherProps);
            } else {
                shopMap.set(shopId, { shopName, shopImage, items: [otherProps] });
            }
        });
        const dataBuy = Array.from(shopMap.entries()).map(([shopId, { shopName, shopImage, items }]) => {
            // Tính tổng giá trị cho mỗi shop
            const totalPrice = items.reduce((sum, item) => {
                return sum + (item.sellingPrice * item.quantity);
            }, 0);

            return { shopId, shopName, shopImage, Versions: items, totalPrice };
        });

        navigate('/payment', { state: { dataBuy } });
    };

    return (
        <>
            <MDBBtn className="bg-error" color="danger" onClick={handleOnClickBuy} disabled={disabled}>
                Buy Now
            </MDBBtn>
        </>
    )
}

export default ButtonBuyProduct
