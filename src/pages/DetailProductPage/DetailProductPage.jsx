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
import * as ShopService from '~/services/ShopService'


function DetailProductPage() {
    const key = useParams();
    const [quantity, setQuantity] = useState(1)
    const [detailProduct, setDetailProduct] = useState({})
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true)
    const [selectedSizeSelect, setSelectedSizeSelect] = useState(0);
    const [stateShopDetails, setStateShopDetails] = useState({})
    const [isLoadingDetailShop, setIsLoadingDetailShop] = useState(false)


    const handleSizeChange = (sizeId) => {
        setSelectedSizeSelect(sizeId);
    };

    const getMaxQuantity = (sizeId) => {
        let selectedSizeItem = listVersion && listVersion[activeIndex]?.sizes[sizeId];
        return selectedSizeItem ? selectedSizeItem.quantity : 1;
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
            shopId: res?.shop_id,
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
        const index = swiper.activeIndex === 0 ? 0 : swiper.activeIndex - 1;
        setActiveIndex(index);
    };

    console.log('item active', activeIndex)
    console.log('listVersion', listVersion)

    const handleBuyClick = () => {
        // Xử lý khi người dùng nhấn mua
        console.log('Size đã chọn:', listVersion[activeIndex]?.sizes[selectedSizeSelect].sizeName);
        console.log('Số lượng đã chọn:', quantity);
        return [{
            shopId: detailProduct?.shopId,
            shopImage: stateShopDetails?.avatar,
            shopName: stateShopDetails?.name,
            versionId: listVersion[activeIndex]?.id,
            total: quantity,
            sellingPrice: detailProduct?.discountedPrice,
            price: detailProduct?.price,
            image: listVersion[activeIndex]?.image,
            sizeName: listVersion[activeIndex]?.sizes[selectedSizeSelect]?.sizeName,
            sizeId: listVersion[activeIndex]?.sizes[selectedSizeSelect]?.id,
            quantity: quantity
            // sizes: [{
            // },]
        }]
    };


    const fetchGetDetailsShop = async (idShop) => {
        setIsLoadingDetailShop(true)
        const res = await ShopService.getDetailsShop({ id: idShop })
        if (res) {
            setStateShopDetails({
                id: res?.id,
                name: res?.name,
                description: res?.description,
                status: res?.status,
                avatar: res?.avatar,
                address: res?.address
            })
        }
        setIsLoadingDetailShop(false)
    }

    useEffect(() => {
        if (detailProduct?.shopId) { fetchGetDetailsShop(detailProduct?.shopId) }
    }, [detailProduct?.shopId]);

    const handleAddToCartClick = () => {
        // Thực hiện các xử lý khác nếu cần
        const dataAddToCart = { sizeItem: listVersion[activeIndex]?.sizes[selectedSizeSelect], quantity: quantity }
        return dataAddToCart
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
                                    <MDBCol size="3">
                                        <MDBTypography tag="dt" className="col-3">
                                            Color:
                                        </MDBTypography>
                                    </MDBCol>
                                    <MDBCol size="9">
                                        <MDBTypography tag="dd" className="col-9">
                                            {activeIndex !== 0 ?
                                                listVersion[activeIndex]?.color
                                                :
                                                listVersion[activeIndex]?.color
                                            }
                                        </MDBTypography>
                                    </MDBCol>
                                    <MDBCol size="3">
                                        <MDBTypography tag="dt" className="col-3">
                                            Stock:
                                        </MDBTypography>
                                    </MDBCol>
                                    <MDBCol size="9">
                                        <MDBTypography tag="dd" className="col-9">
                                            {listVersion[activeIndex]?.sizes[selectedSizeSelect]?.quantity || <div className="textColorRed">Out of Stock</div>}
                                        </MDBTypography>
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
                                                <option key={sizeItem?.sizeName} value={index}>
                                                    {sizeItem?.sizeName}
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
                                            {formatCurrencyUSD(detailProduct?.discountedPrice)}
                                        </span>
                                        <span className="mx-2 ">x</span>
                                        <span className="text-muted">{quantity}</span>
                                        <span className="mx-2 ">=</span>
                                        <span className="h5 text-danger">
                                            {formatCurrencyUSD(detailProduct?.discountedPrice * quantity)}
                                        </span>
                                    </div>
                                </MDBRow>

                                <div className="me-2 d-inline-block">
                                    <ButtonBuyProduct
                                        className="shadow-0"
                                        disabled={listVersion[activeIndex]?.sizes[selectedSizeSelect]?.quantity ? false : true}
                                        onBuyClick={handleBuyClick}
                                    />
                                </div>
                                <ButtonAddCartComponent
                                    color="warning"
                                    className="shadow-0 ms-3"
                                    disabled={listVersion[activeIndex]?.sizes[selectedSizeSelect]?.quantity ? false : true}
                                    onAddToCartClick={handleAddToCartClick}
                                >
                                    <MDBIcon fas icon="cart-plus" className="me-1" />
                                    Add to cart
                                </ButtonAddCartComponent>

                            </div>
                        </MDBCol>
                    </MDBRow>}
            </MDBContainer>
            <InfoStatusShopComponet shopId={detailProduct?.shop_id} />
        </LoadingHasChil>
    );
}

export default DetailProductPage;

