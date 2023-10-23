import React from 'react'
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";

const CardCateHome = ({ item }) => {
    return (
        <MDBCard className="card-cate-home hover-zoom" style={{ width: '120px', height: '150px' }}>
            <MDBCardBody className="p-1">
                <div className="d-flex flex-column justify-content-center align-items-center" style={{ width: '100%', height: '100%' }}>
                    <div className='flex-shrink-0 p-2'>
                        <MDBCardImage
                            src="https://cdn2.yame.vn/pimg/quan-short-ngan-ha-space-ver7-0021095/15793943-2618-6201-18c8-001957bbc450.jpg?w=540&h=756"
                            fluid className="rounded-3  " style={{ width: "84px", height: "84px" }}
                            alt="Shopping item" />
                    </div>
                    <div className="flex-grow-1" style={{ fontSize: '14px', textAlign: 'center' }}>
                        {item.name}
                    </div>
                </div>
            </MDBCardBody>

        </MDBCard >

    )
}

export default CardCateHome

