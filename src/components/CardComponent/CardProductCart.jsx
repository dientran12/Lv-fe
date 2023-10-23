import React from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCheckbox,
    MDBIcon,
    MDBInput,
    MDBTypography,
} from "mdb-react-ui-kit";

const CardProductCart = ({ item, isChecked, onCheckboxChange, quantity = 1, onQuantityChange }) => {

    return (
        <MDBCard className="mb-3 box-shadowColor hover-item">
            <MDBCardBody>
                <div className="d-flex">
                    <div className="d-flex flex-row flex-shrink-0 align-items-center">
                        <MDBCheckbox
                            name='flexCheck'
                            id='flexCheckDefault'
                            className='me-3'
                            checked={isChecked}
                            onChange={(e) => onCheckboxChange(e.target.checked)}
                        />
                        <div>
                            <MDBCardImage
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                                fluid
                                className="rounded-3"
                                style={{ width: "65px" }}
                                alt="Shopping item"
                            />
                        </div>
                        <div className="mx-3" style={{ maxWidth: "200px" }}>
                            <MDBTypography tag="h5">{item.name}</MDBTypography>
                        </div>
                    </div>
                    <div className="d-flex flex-row flex-grow-1 justify-content-between align-items-center">
                        <div className="d-flex align-items-center" style={{ fontStyle: "italic", opacity: "0.8" }}>
                            size, mau
                        </div>
                        <div >
                            <MDBTypography tag="h6" className="mb-0">
                                {item.price}đ x {quantity}
                            </MDBTypography>
                        </div>
                        <div className="d-flex align-items-center me-2" style={{ minWidth: "20px", maxWidth: "100px" }}>
                            <MDBInput
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => onQuantityChange(e.target.value)}
                                size="sm"
                            />
                        </div>
                        <div style={{ width: "80px" }}>
                            <MDBTypography tag="h5" className="mb-0 text-danger">
                                {item.price * quantity}đ
                            </MDBTypography>
                        </div>
                        <MDBBtn className='m-1 bg-error' color='danger' href='#'>
                            <MDBIcon fas icon="trash-alt" size='xl' />
                        </MDBBtn>
                    </div>
                </div>
            </MDBCardBody>
        </MDBCard>
    );
};

export default CardProductCart;
