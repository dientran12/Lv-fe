import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';

export default function App() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const images = [
        "https://swiperjs.com/demos/images/nature-1.jpg",
        "https://swiperjs.com/demos/images/nature-2.jpg",
        "https://swiperjs.com/demos/images/nature-2.jpg",
        "https://swiperjs.com/demos/images/nature-2.jpg",
        "https://swiperjs.com/demos/images/nature-2.jpg",
        // ... (các URLs khác)
    ];

    return (
        <MDBContainer className="py-5">
            <MDBRow className="gx-5">
                <MDBCol lg="6">
                    <Swiper
                        style={{
                            '--swiper-navigation-color': '#fff',
                            '--swiper-pagination-color': '#fff',
                        }}
                        loop={true}
                        spaceBetween={10}
                        navigation={true}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper2"
                    >
                        {images.map((src, index) => (
                            <SwiperSlide key={index}>
                                <img src={src} alt={`Slide ${index}`} style={{ width: '100%', height: 'auto' }} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <Swiper
                        onSwiper={setThumbsSwiper}
                        loop={true}
                        spaceBetween={50}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper "
                    >
                        {images.map((src, index) => (
                            <SwiperSlide key={index}>
                                <img src={src} alt={`Thumbnail ${index}`} style={{ width: '100%', height: 'auto' }} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </MDBCol>
                <MDBCol lg="6">
                    {/* Nội dung hoặc thành phần khác */}
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}
