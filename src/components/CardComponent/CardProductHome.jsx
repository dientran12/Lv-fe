import React from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn,
    MDBCardLink,
    MDBListGroupItem,
    MDBListGroup,
    MDBTypography,
    MDBIcon
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

export default function CardProductHome({ source }) {
    return (
        <MDBCard style={{ width: '100%', minHeight: '350px' }}>
            <div className="cardHover ">
                <MDBCardImage src='https://cdn2.yame.vn/pimg/ao-thun-co-tron-toi-gian-m20-0021275/96b9c802-a685-0100-92af-0019afaf3031.jpg?w=540&h=756' position='top' alt='...' />
                <MDBCardBody className='d-flex flex-column justify-content-between'>
                    <div>
                        <MDBTypography tag='h6'>Áo polo nam ngắn tay Aristino APS170S3</MDBTypography>
                        <MDBTypography className='me-2' tag='strong' style={{ color: '#F44336' }}  >
                            490000đ
                        </MDBTypography>
                        <MDBTypography tag='s'>
                            600000đ
                        </MDBTypography>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <MDBBtn className='p-2' size='sm' color='warning'><MDBIcon fas icon="cart-plus" size='lg' /></MDBBtn>
                        <Link to="/detail-product"><MDBBtn className='p-2' color='info' size="sm">Details</MDBBtn></Link>
                    </div>
                </MDBCardBody>
            </div>
        </MDBCard>
    );
}
