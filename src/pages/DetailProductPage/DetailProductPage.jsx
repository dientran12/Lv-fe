import React, { useState } from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInputGroup,
    MDBTypography,
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBCardImage,
} from 'mdb-react-ui-kit';
import InputQuantityGroup from '~/components/InputGroupComponent/InputQuantityGroup';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';


function DetailProductPage() {
    const [quantity, setQuantity] = useState(1)
    const handleQuantityChange = (newValue) => {
        console.log("Giá trị mới:", newValue);
        setQuantity(newValue);
    };

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const navigation = useNavigate();

    const dataProduct = [
        { color: 'Yellow', size: 'S', imageUrl: 'https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big1.webp', quantity: 8 },
        { color: 'Green', size: 'L', imageUrl: 'https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big2.webp', quantity: 7 },
        { color: 'White', size: 'XL', imageUrl: 'https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big3.webp', quantity: 12 },
        { color: 'Black', size: '2XL', imageUrl: 'https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big4.webp', quantity: 22 },
        { color: 'Blue', size: '3XL', imageUrl: 'https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big.webp', quantity: 99 },
        { color: 'Blue', size: '3XL', imageUrl: 'https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big.webp', quantity: 99 },
        { color: 'Blue', size: '3XL', imageUrl: 'https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big.webp', quantity: 99 },
        { color: 'Blue', size: '3XL', imageUrl: 'https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/detail1/big.webp', quantity: 99 },
    ]

    return (
        <MDBContainer className="my-5">
            <MDBRow className="gx-5">
                <MDBCol lg="6" >
                    <div className="bg-white">
                        <Swiper
                            style={{
                                '--swiper-navigation-color': '#ccc',
                                '--swiper-pagination-color': '#fff',
                            }}
                            loop={true}
                            spaceBetween={10}
                            navigation={true}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper2 "
                        >
                            {dataProduct.map((product, index) => (
                                <SwiperSlide key={index}>
                                    <img src={product.imageUrl} alt={`Slide ${index}`} style={{ width: '100%', height: 'auto' }} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <hr></hr>
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            loop={true}
                            spaceBetween={50}
                            slidesPerView={5}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper mt-1 mx-3"
                        >
                            {dataProduct.map((product, index) => (
                                <SwiperSlide key={index}>
                                    <img className="p-2" src={product.imageUrl} alt={`Thumbnail ${index}`} style={{ width: '100%', height: 'auto' }} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </MDBCol>
                <MDBCol lg="6" >
                    <div className="ps-lg-3 p-4" style={{ backgroundColor: 'white' }}>
                        <h4 className="title text-dark">
                            Quality Men's Hoodie for Winter, Men's Fashion <br />
                            Casual Hoodie
                        </h4>
                        <div className="d-flex flex-row my-3">
                            <div className="text-warning mb-1 me-2">
                                <i className="fa fa-star"></i>
                                <span className="ms-1">{4.5}</span>
                            </div>
                            <span className="text-muted">
                                <MDBIcon fas icon="cart-plus" />
                                154
                                orders
                            </span>
                            <span className="text-success ms-2">In stock</span>
                        </div>

                        <p>
                            Modern look and quality demo item is a streetwear-inspired
                            collection that continues to break away from the conventions of
                            mainstream fashion. Made in Italy, these black and brown
                            clothing low-top shirts for men.
                        </p>
                        <MDBRow>
                            <MDBCol size="3">
                                <MDBTypography tag="dt" className="col-3">
                                    Type:
                                </MDBTypography>
                            </MDBCol>
                            <MDBCol size="9">
                                <MDBTypography tag="dd" className="col-9">
                                    Regular
                                </MDBTypography>
                            </MDBCol>

                            <MDBCol size="3">
                                <MDBTypography tag="dt" className="col-3">
                                    Color:
                                </MDBTypography>
                            </MDBCol>
                            <MDBCol size="9">
                                <MDBTypography tag="dd" className="col-9">
                                    Brown
                                </MDBTypography>
                            </MDBCol>

                            <MDBCol size="3">
                                <MDBTypography tag="dt" className="col-3">
                                    Material:
                                </MDBTypography>
                            </MDBCol>
                            <MDBCol size="9">
                                <MDBTypography tag="dd" className="col-9">
                                    Cotton, Jeans
                                </MDBTypography>
                            </MDBCol>

                            <MDBCol size="3">
                                <MDBTypography tag="dt" className="col-3">
                                    Brand:
                                </MDBTypography>
                            </MDBCol>
                            <MDBCol size="9">
                                <MDBTypography tag="dd" className="col-9">
                                    Reebook
                                </MDBTypography>
                            </MDBCol>
                        </MDBRow>

                        <hr />
                        <MDBRow className="mb-4">
                            <MDBCol md="4" xs="6">
                                <label className="mb-2">Size</label>
                                <select className="form-select border border-secondary">
                                    <option>Small</option>
                                    <option>Medium</option>
                                    <option>Large</option>
                                </select>
                            </MDBCol>
                            <MDBCol md="4" xs="6" className="mb-3">
                                <label className="mb-2 d-block">Quantity</label>
                                <InputQuantityGroup onValueChange={handleQuantityChange} />
                            </MDBCol>
                            <div className="mb-3">
                                <span className="h5 text-danger">75000 đ</span>
                                <span className="mx-2 ">x</span>
                                <span className="text-muted">{quantity}</span>
                            </div>
                        </MDBRow>
                        <MDBBtn color="danger" className="shadow-0 me-2">
                            Buy now
                        </MDBBtn>
                        <MDBBtn color="warning" className="shadow-0">
                            <MDBIcon fas icon="cart-plus" className="me-1" />
                            Add to cart
                        </MDBBtn>
                    </div>
                </MDBCol>
            </MDBRow>
            <div className="bg-white " style={{ marginTop: '20px' }}>
                <MDBRow className='p-3'>
                    <MDBCol lg='4' className="d-flex" style={{ borderRight: '1px solid #ccc' }}>
                        <div>
                            <MDBCardImage
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                alt="avatar"
                                className="rounded-circle"
                                style={{ width: '100px', height: '100px' }}
                                fluid />
                        </div>
                        <div className="ms-2 d-flex flex-column flex-grow-1">
                            <MDBTypography tag='h5' className='mb-0'>Name Shop</MDBTypography>
                            <p><em>active</em></p>
                            <div className='d-flex justify-content-between'>
                                <MDBBtn color='primary' className='px-1' style={{ width: '100%' }} >
                                    <MDBIcon fas icon="comments" className='me-1' />
                                    Chat Now
                                </MDBBtn>
                                <MDBBtn className="ms-1 px-1" onClick={() => navigation('/view-shop')} color='warning' style={{ width: '100%' }}>
                                    <MDBIcon fas icon="store-alt" className='me-1' />
                                    View SHop
                                </MDBBtn>
                            </div>
                        </div>
                    </MDBCol>

                    <MDBCol lg='8'></MDBCol>
                </MDBRow>
            </div>
        </MDBContainer>
    );
}

export default DetailProductPage;

