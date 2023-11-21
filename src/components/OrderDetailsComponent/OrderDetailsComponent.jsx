import React from 'react'
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInputGroup,
    MDBTypography,
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBCardImage,
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardFooter,
    MDBModalBody,
} from 'mdb-react-ui-kit';

const OrderDetailsComponent = () => {
    return (
        <MDBContainer className="mb-4">
            <div className=" pt-3 px-5 titleMyCartContent bg-white mb-4">
                Order Details
                <hr className="my-3 pb-4" />
            </div>

            <MDBRow className="">
                <MDBCol lg="6" >
                    <MDBCard alignment='center' >
                        <MDBCardHeader>
                            <MDBTypography tag="dt" className="fs-4 ">
                                Product Details
                            </MDBTypography>
                        </MDBCardHeader>
                        <MDBCardBody className='text-start'>
                            <MDBRow >
                                <MDBCol size="3">
                                    <MDBCardImage
                                        className="rounded-3"
                                        style={{ maxWidth: "100px" }}
                                        alt="Shopping item"
                                    />
                                </MDBCol>
                                <MDBCol size="9" className="d-flex flex-row" >
                                    <MDBCol size="3" className="d-flex flex-column">
                                        {
                                            <div className="d-inline flex-grow-1 me-2" >
                                                d
                                                fdsf
                                            </div>
                                        }
                                    </MDBCol>
                                    <MDBCol size="9">
                                        <div className=" d-flex flex-column">
                                            <MDBTypography tag='s' className="mb-0">
                                                sdsf
                                            </MDBTypography>
                                        </div>
                                    </MDBCol>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol lg="6" >
                    <MDBCard alignment='center' style={{ minHeight: 500 }}>
                        <MDBCardHeader>
                            <MDBTypography tag="dt" className="fs-4 ">
                                Customer Information
                            </MDBTypography>
                        </MDBCardHeader>

                        <MDBCardBody className='text-start '>
                            <MDBRow className="">
                            </MDBRow>
                        </MDBCardBody>
                        <MDBCardFooter>
                            sfsdf
                        </MDBCardFooter>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer >
    )
}

export default OrderDetailsComponent
