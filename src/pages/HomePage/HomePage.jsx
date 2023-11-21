import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import React from 'react';
import CardProductHome from '~/components/CardComponent/CardProductHome';
import SliderComponent from '~/components/SliderComponent/SliderComponent';
import ListCate from '~/components/ListCateComponent/ListCate';

const HomePage = () => {
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
        }, {
            image: "https://cdn2.yame.vn/pimg/quan-short-ngan-ha-space-ver7-0021095/15793943-2618-6201-18c8-001957bbc450.jpg?w=540&h=756",
            name: "Iphone"
        }, {
            image: "https://cdn2.yame.vn/pimg/quan-short-ngan-ha-space-ver7-0021095/15793943-2618-6201-18c8-001957bbc450.jpg?w=540&h=756",
            name: "Iphone"
        }, {
            image: "https://cdn2.yame.vn/pimg/quan-short-ngan-ha-space-ver7-0021095/15793943-2618-6201-18c8-001957bbc450.jpg?w=540&h=756",
            name: "Iphone"
        }, {
            image: "https://cdn2.yame.vn/pimg/quan-short-ngan-ha-space-ver7-0021095/15793943-2618-6201-18c8-001957bbc450.jpg?w=540&h=756",
            name: "Iphone"
        }
    ]

    const dataProduct = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    return (
        <>
            <MDBContainer>
                <SliderComponent />
                <div className="bg-white " style={{ marginTop: '20px' }}>
                    <div className=" mb-0 pt-3 pt-1 ps-3 titleMyCartContent">Categories</div>
                    <hr style={{ color: 'orange' }} />
                    <div className="my-5 "><ListCate dataCate={dataCate} /></div>
                </div>
                <div className="bg-white " style={{ marginTop: '20px' }}>
                    <div className=" mb-0 pt-3 pt-1 ps-3 titleMyCartContent">Top Products</div>
                    <hr style={{ color: 'orange' }} />
                    <MDBRow>
                        {dataProduct.map((item, index) => (
                            <MDBCol className='mt-3' key={index} xl="2" lg="3" sm="4">
                                <CardProductHome />
                            </MDBCol>
                        ))}
                    </MDBRow>
                </div>
                <div className="d-flex justify-content-center mt-4 mb-5">
                    <MDBBtn style={{ width: '200px' }} color="info">
                        See more
                    </MDBBtn>
                </div>
            </MDBContainer>
        </>
    );
};

export default HomePage;
