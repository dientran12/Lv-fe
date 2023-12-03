import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import CardProductHome from '~/components/CardComponent/CardProductHome';
import SliderComponent from '~/components/SliderComponent/SliderComponent';
import ListCate from '~/components/ListCateComponent/ListCate';
import { useSelector } from 'react-redux';
import * as ProductService from '~/services/ProductService'

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [dataProductNewCate, setDataProductNewCate] = useState([]);

    const listCate = useSelector((state) => {
        return state?.category?.listCate
    })
    console.log('listCate', listCate)
    useEffect(() => {
        fetchDataProductOnCate('New Products')
    }, [listCate]);

    const fetchDataProductOnCate = async (name) => {
        setIsLoading(true)
        try {
            const products = await ProductService.getAllProductOnCateByNameForCus(name);
            setIsLoading(false)
            console.log('products cate', products)
            if (products) {

                setDataProductNewCate(products);
            }
        } catch (error) {
            console.error("Error fetching products by category:", error);
        }
        setIsLoading(false)
    };

    const dataProduct = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

    return (
        <>
            <MDBContainer>
                <SliderComponent />
                {listCate.length > 0 && <>
                    <div className="bg-white " style={{ marginTop: '20px' }}>
                        <div className=" mb-0 pt-3 pt-1 ps-3 titleMyCartContent">Categories</div>
                        <hr style={{ color: 'orange' }} />
                        <div className="my-5 "><ListCate dataCate={listCate} /></div>
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
                    <div className="bg-white " style={{ marginTop: '20px' }}>
                        <div className=" mb-0 pt-3 pt-1 ps-3 titleMyCartContent">New Products</div>
                        <hr style={{ color: 'orange' }} />
                        <MDBRow>
                            {dataProductNewCate?.map((item, index) => (
                                <MDBCol className='mt-3' key={index} xl="2" lg="3" sm="4">
                                    <CardProductHome product={item} />
                                </MDBCol>
                            ))}
                        </MDBRow>
                    </div>
                    <div className="d-flex justify-content-center mt-4 mb-5">
                        <MDBBtn style={{ width: '200px' }} color="info">
                            See more
                        </MDBBtn>
                    </div>
                </>}
            </MDBContainer>
        </>
    );
};

export default HomePage;
