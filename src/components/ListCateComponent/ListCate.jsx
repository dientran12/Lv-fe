import React from 'react';
import { MDBCarousel, MDBCarouselItem, MDBBtn, MDBCardImage, MDBCol } from 'mdb-react-ui-kit';
import CardCateHome from '~/components/CardComponent/CardCateHome';

function ListCate({ data }) {
    return (
        <div className="bg-white ">
            <div className=" mb-0 pt-3 pt-1 ps-3 titleMyCartContent">Categories</div>
            <hr style={{ color: 'orange' }} />
            <div className="d-flex flex-wrap justify-content-between mx-2 py-3" >
                {data.map((item, index) => (
                    <CardCateHome key={index} item={item} />
                ))}
            </div>
        </div>
    );
}

export default ListCate;
