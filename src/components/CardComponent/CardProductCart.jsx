import React, { useState } from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCheckbox,
    MDBIcon,
    MDBInput,
    MDBTypography,
} from "mdb-react-ui-kit";
import { useCustomMutation } from '~/hooks/useMutationHook';
import * as CartService from '~/services/CartService'
import { useSelector } from 'react-redux';
import { formatCurrency, formatCurrencyUSD } from '~/utils';


const CardProductCart = ({ item, index, isChecked, onCheckboxChange, onQuantityChange, queryCartItems }) => {
    const user = useSelector((state) => {
        return state?.user
    })
    const displayName = item?.productName.length > 15 ? `${item?.productName.substring(0, 15)}...` : item?.productName;

    // const [checkedItem, setCheckedItem] = useState(isChecked);
    const [quantityValue, setQuantityValue] = useState(item?.quantity);

    const mutationDeleted = useCustomMutation(
        (data) => CartService.deleteProductOnCart(data)
    )

    const handleOnChangeQuantity = (e) => {
        console.log("e", e.target.value)
        setQuantityValue(e.target.value)
        onQuantityChange(index, e.target.value)
    }

    const handleCheckboxChange = (value) => {
        console.log("checked ", value)
        // setCheckedItem(value)
        onCheckboxChange(index, value)
    }

    const handleOnDelete = () => {
        mutationDeleted.mutate({
            userId: user?.id,
            token: user.accessToken,
            sizeItemId: item?.sizeItemId
        }, {
            onSettled: () => {
                queryCartItems.refetch()
            }
        })
    }

    return (
        <MDBCard className="mb-3 box-shadowColor hover-item">
            <MDBCardBody className='p-2'>
                <div className="d-flex align-items-center">
                    <div className="d-flex flex-row flex-shrink-0 align-items-center">
                        <MDBCheckbox
                            name='flexCheck'
                            id='flexCheckDefault'
                            className='mx-3'
                            checked={isChecked}
                            onChange={(e) => handleCheckboxChange(e.target.checked)}
                        />
                        <div>
                            <MDBCardImage
                                src={item?.image}
                                className="rounded-3 "
                                style={{ maxWidth: "80px", height: "auto", objectFit: 'cover', aspectRatio: "1/1" }}
                                alt="Shopping item"
                                fluid
                            />
                        </div>
                        <div className="mx-3 d-flex flex-column" style={{ maxWidth: "200px" }}>
                            <MDBTypography tag="dt" className="mb-2">{displayName}</MDBTypography>
                            <div className="d-flex flex-row " style={{ fontStyle: "italic" }}>
                                <MDBTypography tag="h6" className="me-1 ">
                                    Size: <span className="textColorRed">{item?.sizeName}</span>
                                </MDBTypography>
                                <MDBTypography tag="h6" className="mb-0 ">
                                    Color: <span className="textColorRed">{item?.color}</span>
                                </MDBTypography>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-row flex-grow-1  align-items-center">
                        <div className="d-flex flex-column align-items-center">
                            {item?.discountPrice !== item?.price &&
                                <MDBTypography tag='s' className="mb-0">
                                    {formatCurrencyUSD(item?.price)}
                                </MDBTypography>
                            }
                            <MDBTypography tag="h6" className="mb-0" style={{ color: '#F44336' }}>
                                {formatCurrencyUSD(item?.discountPrice || item?.price)}
                            </MDBTypography>
                        </div>
                        <div className="mx-1">x</div>
                        <div className="d-flex align-items-center mx-2" style={{ minWidth: "20px", maxWidth: "50px" }}>
                            <MDBInput
                                type="number"
                                min="1"
                                value={quantityValue}
                                onChange={(e) => handleOnChangeQuantity(e)}
                                size="sm"
                            />
                        </div>
                    </div>
                    <MDBTypography tag="h6" className="mb-0 text-danger">
                        {formatCurrencyUSD(item?.discountPrice ? item?.discountPrice * quantityValue : item?.price * quantityValue)}
                    </MDBTypography>
                    <MDBIcon className="color-hover-green px-4 py-2" size='xl' fas icon="trash" onClick={handleOnDelete} style={{ color: 'red', cursor: 'pointer' }} />
                </div>
            </MDBCardBody>
        </MDBCard>
    );
};

export default CardProductCart;
