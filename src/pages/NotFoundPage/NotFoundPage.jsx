import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CardProductHome from '~/components/CardComponent/CardProductHome';

function YourComponent() {

    const dataCate = [
        {
            image: "https://cdn2.yame.vn/pimg/quan-short-ngan-ha-space-ver7-0021095/15793943-2618-6201-18c8-001957bbc450.jpg?w=540&h=756",
            name: "Iphone"
        },
        {
            image: "https://cdn2.yame.vn/pimg/quan-short-ngan-ha-space-ver7-0021095/15793943-2618-6201-18c8-001957bbc450.jpg?w=540&h=756",
            name: "Iphone"
        },
        {
            image: "https://cdn2.yame.vn/pimg/quan-short-ngan-ha-space-ver7-0021095/15793943-2618-6201-18c8-001957bbc450.jpg?w=540&h=756",
            name: "Iphone"
        }, {
            image: "https://cdn2.yame.vn/pimg/quan-short-ngan-ha-space-ver7-0021095/15793943-2618-6201-18c8-001957bbc450.jpg?w=540&h=756",
            name: "Iphone"
        }, {
            image: "https://cdn2.yame.vn/pimg/quan-short-ngan-ha-space-ver7-0021095/15793943-2618-6201-18c8-001957bbc450.jpg?w=540&h=756",
            name: "Iphone"
        },
        // Thêm dữ liệu cho các slide khác ở đây
    ];

    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3
    };

    return (
        <div className="d-flex justify-content-center">
            <div className="w-75" style={{ backgroundColor: "#ccc" }}>
                <Slider {...settings}>
                    {dataCate.map((item, index) => (
                        <div key={index}>
                            <CardProductHome />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default YourComponent;
