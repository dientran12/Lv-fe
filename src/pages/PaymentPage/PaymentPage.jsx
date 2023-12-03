import { Select } from 'antd';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardFooter, MDBCardHeader, MDBCardImage, MDBCol, MDBContainer, MDBRow, MDBTypography } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Noimage from '~/assets/images/no-image.jpg';
import { useCustomMutation } from '~/hooks/useMutationHook';
import * as OrderService from '~/services/OrderService'
import { formatCurrencyUSD } from '~/utils';
import NoimageShop from '~/assets/images/imageDefaultShop.png';


const PaymentPage = () => {
    const location = useLocation();
    const { state } = location;
    const { dataBuy } = state || [];
    const [selectedValue, setSelectedValue] = useState("PayPal");
    const [totalPrice, setTotalPrice] = useState(0);
    const [dataOrder, setDataOrder] = useState(0);
    const user = useSelector((state) => {
        return state?.user
    })

    console.log('dataBuy', dataBuy)

    const mutation = useCustomMutation(
        data => OrderService.createOrder(data)
    )

    const { data, isLoading, isSuccess, isError } = mutation;

    useEffect(() => {
        if (isSuccess) {
            toast.success('Create success ', {
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
            });
        } else if (isError) {
            toast.error(<div>Create success</div>, {
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
            });
        }
        mutation.reset();
    }, [isSuccess, isError])

    const handleOnclickOrder = () => {
        console.log("dataOrder", dataOrder);
        // const dataResult = dataOrder?.map((dataItem) => ({
        //     price: dataItem?.price,
        //     discountedPrice: dataItem?.sellingPrice,
        //     versionId: dataItem?.versionId,
        //     total: dataItem?.total,
        //     sizes: dataItem?.sizes,
        //     shopId: dataItem?.shopId
        // }))

        // const dataResult = dataOrder?.map((dataItem) => ({
        //     Versions: dataItem?.Versions,
        //     shopId: dataItem?.shopId
        // }))
        // console.log("data order", { cartItems: dataResult, accessToken: user?.accessToken });
        // mutation.mutate({ cartItems: dataResult, accessToken: user?.accessToken })
    }

    const handleChange = (value) => {
        setSelectedValue(value);
    };

    return (
        <MDBContainer className=" ">
            <div className=" pt-3 px-5 titleMyCartContent bg-white mb-4">
                Payment
                <hr className="my-3 pb-4" />
            </div>

            <MDBRow className="">
                {dataBuy && <MDBCol lg="6" >
                    <MDBCard alignment='center' >
                        <MDBCardHeader>
                            <MDBTypography tag="dt" className="fs-4 ">
                                Products
                            </MDBTypography>
                        </MDBCardHeader>
                        {dataBuy && dataBuy?.map((shops, index) => (
                            <MDBCardBody className='text-start py-1' key={index}>
                                <MDBRow >
                                    <div className="d-flex flex-row align-items-center mb-2" style={{ backgroundColor: "#f9f09c" }}>
                                        <MDBCardImage
                                            src={shops?.shopImage || NoimageShop}
                                            className="rounded-2 me-2"
                                            style={{ width: "40px" }}
                                            alt="Shopping item"
                                        />
                                        <MDBTypography tag="dt">
                                            {shops?.shopName}
                                        </MDBTypography>
                                    </div>
                                    {shops?.Versions?.map((version, index) => (
                                        <>
                                            <MDBCol size="3" className='mb-2'>
                                                <MDBCardImage
                                                    src={version?.image || Noimage}
                                                    className="rounded-3"
                                                    style={{ maxWidth: "100px", objectFit: "cover", aspectRatio: "1/1" }}
                                                    alt="Shopping item"
                                                />
                                            </MDBCol>
                                            <MDBCol size="9" className="d-flex flex-row" >
                                                <MDBCol size="3" className="d-flex flex-column">
                                                    <div className="d-inline flex-grow-1 me-2" >
                                                        {version?.sizeName} x {version?.quantity}
                                                    </div>
                                                </MDBCol>
                                                <MDBCol size="9" className='d-flex justity-content-center'>
                                                    <div className="flex-shrink-0 d-flex align-items-center">
                                                        <div className=" d-flex flex-column">
                                                            {version?.sellingPrice !== version?.price &&
                                                                <MDBTypography tag='s' className="mb-0">
                                                                    {formatCurrencyUSD(version?.price)}
                                                                </MDBTypography>
                                                            }
                                                            <span className="textColorRed me-2">{formatCurrencyUSD(version?.sellingPrice)} </span>
                                                        </div>
                                                        x {version?.total} =
                                                        <span className="textColorRed ms-1 fs-5">{formatCurrencyUSD(version?.sellingPrice * version?.total)}</span>
                                                    </div>
                                                </MDBCol>
                                            </MDBCol>
                                        </>
                                    ))
                                    }
                                    <MDBRow><hr /></MDBRow>
                                    <div className="mb-3 fs-4 text-end">Total: <span className="text-danger">{formatCurrencyUSD(shops?.totalPrice)}</span></div>
                                </MDBRow>
                            </MDBCardBody>
                        ))
                        }
                    </MDBCard>
                </MDBCol>}
                <MDBCol lg="6" >
                    <MDBCard alignment='center' style={{ minHeight: 500 }}>
                        <MDBCardHeader>
                            <MDBTypography tag="dt" className="fs-4 ">
                                Order Information
                            </MDBTypography>
                        </MDBCardHeader>

                        <MDBCardBody className='text-start '>
                            <MDBRow className="">
                                <MDBCol size="4">
                                    <MDBTypography tag="dt">
                                        Full Name:
                                    </MDBTypography>
                                </MDBCol>
                                <MDBCol size="8" className="mb-1">
                                    <MDBTypography tag="dd" >
                                        {user?.name?.trim()}
                                    </MDBTypography>
                                </MDBCol>
                                <MDBCol size="4">
                                    <MDBTypography tag="dt">
                                        Phone:
                                    </MDBTypography>
                                </MDBCol>
                                <MDBCol size="8" className="mb-1">
                                    <MDBTypography tag="dd" >
                                        {user?.phone || "You do not have a delivery address yet"}
                                    </MDBTypography>
                                </MDBCol>
                                <MDBCol size="4">
                                    <MDBTypography tag="dt">
                                        Email:
                                    </MDBTypography>
                                </MDBCol>
                                <MDBCol size="8" className="mb-1">
                                    <MDBTypography tag="dd" >
                                        {user?.email?.trim() || "You do not have a delivery address yet"}
                                    </MDBTypography>
                                </MDBCol>
                                <MDBCol size="4">
                                    <MDBTypography tag="dt">
                                        Shipping Address:
                                    </MDBTypography>
                                </MDBCol>
                                <MDBCol size="8" className="mb-1">
                                    <MDBTypography tag="dd" >
                                        {user?.address?.trim() || "You do not have a delivery address yet"}
                                    </MDBTypography>
                                </MDBCol>
                                <MDBCol size="4">
                                    <MDBTypography tag="dt">
                                        Payment Method:
                                    </MDBTypography>
                                </MDBCol>
                                <MDBCol size="8" className="mb-1">
                                    <Select placeholder="Select your payment method" size="large" style={{ width: "100%" }} value={selectedValue} onChange={handleChange}>
                                        <Select.Option value="PayPal">PayPal</Select.Option>
                                        <Select.Option value="Credit Card">Credit Card</Select.Option>
                                    </Select>
                                </MDBCol>
                                <MDBCol size="4">
                                    <MDBTypography tag="dt">
                                        Total Amount:
                                    </MDBTypography>
                                </MDBCol>
                                <MDBCol size="8" className="mb-1">
                                    <MDBTypography tag="dd" >
                                        <span className="textColorRed ms-1 fs-4 ms-2">{formatCurrencyUSD(totalPrice)}</span>
                                    </MDBTypography>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                        <MDBCardFooter>
                            <MDBBtn color="warning" onClick={handleOnclickOrder}>Order Now</MDBBtn>
                        </MDBCardFooter>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer >

    )
}

export default PaymentPage
