import React, { useEffect, useState } from 'react';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBValidation,
    MDBValidationItem,
    MDBInput,
    MDBInputGroup
} from 'mdb-react-ui-kit';
// import ChooseImageAndSubmit from '~/components/InputComponent/ChooseImageAndSubmit';
import { useSelector } from 'react-redux';
import Loading from '~/components/LoadingComponent/Loading';
import InputFormValiSubmit from '~/components/InputGroupComponent/InputFormValiSubmit';
import ChooseImageAndSubmit from '~/components/InputGroupComponent/ChooseImageAndSubmit';

export default function ProfilePage() {
    const user = useSelector((state) => state.user)
    const [image, setImage] = useState(user?.image);

    const [loading, setLoading] = useState(false)

    const emailRules = [
        {
            type: 'email',
            message: 'The input is not valid E-mail!',
        },
        {
            required: true,
            message: 'Please input your E-mail!',
        }
    ];
    const nameRules = [
        {
            required: true,
            message: 'Please input your name!',
        }
    ];
    const phoneRules = [
        {
            required: true,
            message: 'Please input your phone number!',
        },
        {
            pattern: /^[0-9]{10,12}$/,  // giả sử số điện thoại có từ 10 đến 12 chữ số
            message: 'Not a valid phone number!'
        }
    ];
    const addressRules = [
        {
            required: true,
            message: 'Please input your password!',
        }
    ];


    useEffect(() => {
        setLoading(true)
        setImage(user?.image)
        setLoading(false)
    }, [user?.image])

    return (
        <section>
            <MDBContainer className="py-5">
                <MDBRow>
                    <MDBCol lg="4">
                        <MDBCard className="mb-4" >
                            <MDBCardBody className="text-center" style={{ height: "300px" }}>
                                <Loading isLoading={loading}>
                                    {image ?
                                        <MDBCardImage
                                            src={image}
                                            alt="avatar"
                                            className="rounded-circle"
                                            style={{ width: '150px', height: '150px' }}
                                            fluid />
                                        :
                                        <MDBCardImage
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                            alt="avatar"
                                            className="rounded-circle"
                                            style={{ width: '150px', height: '150px' }}
                                            fluid />
                                    }
                                </Loading>
                                <div className="d-flex justify-content-center mb-2 mt-5">
                                    <ChooseImageAndSubmit />
                                </div>
                            </MDBCardBody>
                        </MDBCard>

                    </MDBCol>
                    <MDBCol lg="8">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBRow className="mt-4">
                                    <MDBCol sm="2">
                                        <p style={{ fontSize: '16px' }}>Name</p>
                                    </MDBCol>
                                    <MDBCol sm="10">
                                        <InputFormValiSubmit
                                            nameDataFile="name"
                                            placeholder="Name"
                                            rules={nameRules}
                                        />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol sm="2">
                                        <p style={{ fontSize: '16px' }}>Email</p>
                                    </MDBCol>
                                    <MDBCol sm="10">
                                        <InputFormValiSubmit
                                            type="email"
                                            nameDataFile="email"
                                            placeholder="Email"
                                            rules={emailRules}
                                        />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol sm="2">
                                        <p style={{ fontSize: '16px' }}>Phone</p>
                                    </MDBCol>
                                    <MDBCol sm="10">
                                        <InputFormValiSubmit
                                            type="phone"
                                            nameDataFile="phone"
                                            placeholder="Phone Number"
                                            rules={phoneRules}
                                        />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol sm="2">
                                        <p style={{ fontSize: '16px' }}>Address</p>
                                    </MDBCol>
                                    <MDBCol sm="10">
                                        <InputFormValiSubmit
                                            type="address"
                                            nameDataFile="address"
                                            placeholder="Address"
                                            rules={addressRules}
                                        />
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>

                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol lg="4">
                        <MDBCard className="mb-4" >
                            <MDBCardBody className="text-center" style={{ height: "300px" }}>
                                <Loading isLoading={loading}>
                                    {image ?
                                        <MDBCardImage
                                            src={image}
                                            alt="avatar"
                                            className="rounded-circle"
                                            style={{ width: '150px', height: '150px' }}
                                            fluid />
                                        :
                                        <MDBCardImage
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                            alt="avatar"
                                            className="rounded-circle"
                                            style={{ width: '150px', height: '150px' }}
                                            fluid />
                                    }
                                </Loading>
                                <div className="d-flex justify-content-center mb-2 mt-5">
                                    <ChooseImageAndSubmit />
                                </div>
                            </MDBCardBody>
                        </MDBCard>

                    </MDBCol>
                    <MDBCol lg="8">
                        {/* <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBRow className="mt-4">
                                    <MDBCol sm="2">
                                        <p style={{ fontSize: '16px' }}>Name</p>
                                    </MDBCol>
                                    <MDBCol sm="10">
                                        <InputFormValiSubmit
                                            nameDataFile="name"
                                            placeholder="Name"
                                            rules={nameRules}
                                        />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol sm="2">
                                        <p style={{ fontSize: '16px' }}>Email</p>
                                    </MDBCol>
                                    <MDBCol sm="10">
                                        <InputFormValiSubmit
                                            type="email"
                                            nameDataFile="email"
                                            placeholder="Email"
                                            rules={emailRules}
                                        />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol sm="2">
                                        <p style={{ fontSize: '16px' }}>Phone</p>
                                    </MDBCol>
                                    <MDBCol sm="10">
                                        <InputFormValiSubmit
                                            type="phone"
                                            nameDataFile="phone"
                                            placeholder="Phone Number"
                                            rules={phoneRules}
                                        />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol sm="2">
                                        <p style={{ fontSize: '16px' }}>Address</p>
                                    </MDBCol>
                                    <MDBCol sm="10">
                                        <InputFormValiSubmit
                                            type="address"
                                            nameDataFile="address"
                                            placeholder="Address"
                                            rules={addressRules}
                                        />
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard> */}

                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}
