import React, { useEffect } from 'react';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { useCustomMutation } from '~/hooks/useMutationHook';
import * as CartService from '~/services/CartService'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


export default function ButtonAddCartComponent({ children, size = '', disabled, onAddToCartClick }) {
    const navigate = useNavigate();
    const user = useSelector((state) => {
        return state?.user
    })

    const mutation = useCustomMutation(
        (data) => {
            CartService.addProductToCart(data)
        }
    )

    const { data, isLoading, isSuccess, isError } = mutation;

    useEffect(() => {
        if (isSuccess) {
            toast.success('Added success ', {
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
            });
        } else if (isError) {
            toast.error(<div>Added fails</div>, {
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
            });
        }
        // mutation.reset();
    }, [isSuccess, isError])


    const handleOnClick = () => {
        // Gọi hàm xử lý khi người dùng nhấn thêm vào giỏ hàng

        const dataAdd = onAddToCartClick();
        console.log('dataAdd', dataAdd);
        if (dataAdd) {
            mutation.mutate({
                sizeId: dataAdd?.sizeItem?.id,
                // sizeName: dataAdd?.sizeItem?.sizeName,
                versionId: dataAdd?.sizeItem?.version_id,
                accessToken: user?.accessToken,
                quantity: dataAdd?.quantity
            })
        }
    };
    return (
        <MDBBtn disabled={disabled} onClick={handleOnClick} size={size} color='warning' >{children}</MDBBtn>
    );
}
