import React, { useEffect, useState } from 'react';
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
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate, useParams } from 'react-router-dom';
import ButtonBuyProduct from '~/components/ButtonComponent/ButtonBuyProduct';
import ButtonAddCartComponent from '~/components/ButtonComponent/ButtonAddCartComponent';
import * as ProductService from '~/services/ProductService'
import LoadingHasChil from '~/components/LoadingComponent/LoadingHasChil';
import InputQuantityDetailProduct from '~/components/InputComponent/InputQuantityDetailProduct';
import InfoStatusShopComponet from '~/components/InfoStatusShopComponent/InfoStatusShopComponet';
import Noimage from '~/assets/images/no-image.jpg';
import ErrorImage from '~/assets/images/image-error.jpg';
import { formatCurrencyUSD } from '~/utils';


function DetailProductPage() {
    const key = useParams();
    const [quantity, setQuantity] = useState(1)
    const [detailProduct, setDetailProduct] = useState({})
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true)
    const [selectedSizeSelect, setSelectedSizeSelect] = useState(0);

    const handleSizeChange = (sizeId) => {
        setSelectedSizeSelect(sizeId);
    };

    const getMaxQuantity = (sizeId) => {
        // let selectedSizeItem = dataProduct && dataProduct[activeIndex]?.SizeItems[sizeId];
        // return selectedSizeItem ? selectedSizeItem.quantity : 1;
    };

    const handleQuantityChange = (newValue) => {
        setQuantity(newValue);
    };

    const fetchGetDetailsProduct = async (id) => {
        const res = await ProductService.getDetailProduct(id)

        setDetailProduct({
            id: id,
            name: res?.name,
            image: res?.image,
            price: res?.price,
            brand: res?.brand,
            gender: res?.gender,
            origin: res?.origin,
            discountId: res?.discount_id,
            discountedPrice: res?.discountedPrice || res?.price,
            versions: res?.versions,
            type: res?.type,
            description: res?.description
        })
        setIsLoading(false)
    }
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    useEffect(() => {
        fetchGetDetailsProduct(key.key);
    }, [key]);
    const listVersion = detailProduct?.versions


    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.activeIndex);
    };

    console.log('item active', activeIndex)
    console.log('listVersion', listVersion)

    const handleBuyClick = () => {
    };

    const handleAddToCartClick = () => {
        // Thực hiện các xử lý khác nếu cần
    };

    return (
        <LoadingHasChil isLoading={isLoading}>
            <MDBContainer className="mb-4">
                <div className=" pt-3 px-5 titleMyCartContent bg-white mb-4">
                    Details Product
                    <hr className="my-3 pb-4" />
                </div>
                {listVersion &&
                    <MDBRow className="">
                        <MDBCol lg="6" >
                            <div className="bg-white">
                                <Swiper
                                    style={{
                                        '--swiper-navigation-color': '#ccc',
                                        '--swiper-pagination-color': '#fff',
                                    }}
                                    spaceBetween={10}
                                    navigation={true}
                                    thumbs={{ swiper: thumbsSwiper }}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    onSlideChange={handleSlideChange}
                                    className="mySwiper2"
                                >
                                    <SwiperSlide>
                                        <img src={detailProduct?.image || ErrorImage} alt={`Slide ${detailProduct?.id}`} style={{ width: '100%', height: 'auto', aspectRatio: '1/1', objectFit: 'contain' }} />
                                    </SwiperSlide>
                                    {listVersion?.map((version) => (
                                        <SwiperSlide key={version.id}>
                                            <img src={version.image || ErrorImage} alt={`Slide ${version.id}`} style={{ width: '100%', height: 'auto', aspectRatio: '1/1', objectFit: 'contain' }} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <hr></hr>
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    loop={true}
                                    spaceBetween={10}
                                    slidesPerView={listVersion.length > 4 ? listVersion.length : 4}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper"
                                >
                                    <SwiperSlide>
                                        <img className="p-2" src={detailProduct?.image || ErrorImage} alt={`Thumbnail ${detailProduct?.id}`} style={{ width: '100%', height: 'auto', aspectRatio: '1/1' }} />
                                    </SwiperSlide>
                                    {listVersion?.map((version) => (
                                        <SwiperSlide key={version.id}>
                                            <img className="p-2" src={version.image || ErrorImage} alt={`Thumbnail ${version.id}`} style={{ width: '100%', height: 'auto', aspectRatio: '1/1' }} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </MDBCol>
                        <MDBCol lg="6" >
                            <div className="ps-lg-3 p-4" style={{ backgroundColor: 'white' }}>
                                <h4 className="title text-dark">
                                    {detailProduct?.name}
                                </h4>
                                <p>
                                    {detailProduct?.description}
                                </p>
                                <MDBRow>
                                    <MDBCol size="3">
                                        <MDBTypography tag="dt" className="col-3">
                                            Type:
                                        </MDBTypography>
                                    </MDBCol>
                                    <MDBCol size="9">
                                        <MDBTypography tag="dd" className="col-9">
                                            {detailProduct?.type}
                                        </MDBTypography>
                                    </MDBCol>
                                    <MDBCol size="3">
                                        <MDBTypography tag="dt" className="col-3">
                                            Brand:
                                        </MDBTypography>
                                    </MDBCol>
                                    <MDBCol size="9">
                                        <MDBTypography tag="dd" className="col-9">
                                            {detailProduct?.brand}
                                        </MDBTypography>
                                    </MDBCol>
                                    <MDBCol size="3">
                                        <MDBTypography tag="dt" className="col-3">
                                            Origin:
                                        </MDBTypography>
                                    </MDBCol>
                                    <MDBCol size="9">
                                        <MDBTypography tag="dd" className="col-9">
                                            {detailProduct?.origin}
                                        </MDBTypography>
                                    </MDBCol>
                                    <MDBCol size="3">
                                        <MDBTypography tag="dt" className="col-3">
                                            Color:
                                        </MDBTypography>
                                    </MDBCol>
                                    <MDBCol size="9">
                                        <MDBTypography tag="dd" className="col-9">
                                            {activeIndex !== 0 ?
                                                listVersion[activeIndex - 1]?.color
                                                :
                                                listVersion[activeIndex]?.color
                                            }
                                        </MDBTypography>
                                    </MDBCol>
                                    <MDBCol size="3">
                                        <MDBTypography tag="dt" className="col-3">
                                            Price:
                                        </MDBTypography>
                                    </MDBCol>
                                    <MDBCol size="9">
                                        <span className="h5 text-danger ">
                                            {formatCurrencyUSD(detailProduct?.discountedPrice)}
                                        </span>
                                        {detailProduct?.discountId && <MDBTypography className=" ms-3 fs-5 text fw-light" tag='s'>
                                            {formatCurrencyUSD(detailProduct?.price)}
                                        </MDBTypography>}
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow className="mb-4">
                                    <MDBCol md="4" xs="6">
                                        <label className="mb-2">Size</label>
                                        <select
                                            className="form-select border border-secondary"
                                            value={selectedSizeSelect}  // Giá trị đã chọn từ state hoặc props
                                            onChange={(e) => handleSizeChange(e.target.value)}
                                        >
                                            {listVersion && listVersion[activeIndex]?.sizes.map((sizeItem, index) => (
                                                <option key={sizeItem.Size.sizeName} value={index}>
                                                    {sizeItem.Size.sizeName}
                                                </option>
                                            ))}
                                        </select>
                                    </MDBCol>
                                    <MDBCol md="4" xs="6" className="mb-3">
                                        <label className="mb-2 d-block">Quantity</label>
                                        <InputQuantityDetailProduct
                                            onValueChange={handleQuantityChange}
                                            minValue={1}
                                            selectedSize={selectedSizeSelect}
                                            activeIndex={activeIndex}
                                            maxValue={getMaxQuantity(selectedSizeSelect)} // Sử dụng hàm getMaxQuantity để lấy giá trị maxValue
                                        />
                                    </MDBCol>
                                    <div className="mb-3">
                                        <span className="h6 text-danger">
                                            {detailProduct?.discountedPrice?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                        </span>
                                        <span className="mx-2 ">x</span>
                                        <span className="text-muted">{quantity}</span>
                                        <span className="mx-2 ">=</span>
                                        <span className="h5 text-danger">
                                            {((detailProduct?.discountedPrice || 0) * quantity).toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND'
                                            })}
                                        </span>
                                    </div>
                                </MDBRow>

                            </div>
                        </MDBCol>
                    </MDBRow>}
            </MDBContainer>
            <InfoStatusShopComponet shopId={detailProduct?.shop_id} />
        </LoadingHasChil>
    );
}

export default DetailProductPage;

