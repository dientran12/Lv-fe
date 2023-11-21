import React from 'react';
import Slider from 'react-slick';
import CardCateHome from '~/components/CardComponent/CardCateHome';

function ListCate({ dataCate }) {

    const settings = {
        infinite: false,
        speed: 100,
        slidesToShow: 8,
        slidesToScroll: 8
    };

    return (
        <div className="w-100" style={{ backgroundColor: "#ccc" }}>
            <Slider {...settings}>
                {dataCate.map((item, index) => (
                    <div key={index}>
                        <CardCateHome item={item} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default ListCate;
