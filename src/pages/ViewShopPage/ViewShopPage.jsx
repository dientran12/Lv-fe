import { MDBBtn, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBTypography } from 'mdb-react-ui-kit'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import CardProductHome from '~/components/CardComponent/CardProductHome';
import SidebarComponent from '~/components/SidebarComponent/SidebarComponent';

const ViewShopPage = () => {

    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label,
        };
    }

    const items = [
        getItem('Home', '1', <MDBIcon fas icon="home" />),
        getItem('All Products', '2'),
        getItem('Team', 'sub1', null, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
        getItem('Files', '9'),
    ];

    const dataProduct = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

    return (
        <>
            <div className="bg-white " >
                <MDBContainer>
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
                                    <MDBBtn className="ms-1 px-1" color='warning' style={{ width: '100%' }}>
                                        <MDBIcon fas icon="plus" className='me-1' />
                                        Follow
                                    </MDBBtn>
                                </div>
                            </div>
                        </MDBCol>

                        <MDBCol lg='8'></MDBCol>
                    </MDBRow>
                </MDBContainer>
                <hr></hr>
            </div>
            <MDBContainer className='mt-4 d-flex'>
                <SidebarComponent items={items} />
                <div className="ms-2 flex-grow-1">
                    <MDBRow>
                        {dataProduct.map((item, index) => (
                            <MDBCol className='mb-3' key={index} xl="3" lg="4" md="6">
                                <CardProductHome />
                            </MDBCol>
                        ))}
                    </MDBRow>
                </div>
            </MDBContainer >
        </>
    )
}

export default ViewShopPage
