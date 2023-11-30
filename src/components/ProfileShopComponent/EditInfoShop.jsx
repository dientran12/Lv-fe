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
import InputAndSubmit from '~/components/InputComponent/InputAndSubmit';
import ChooseImageAndSubmit from '~/components/InputComponent/ChooseImageAndSubmit';
import { useSelector } from 'react-redux';
import Loading from '~/components/LoadingComponent/Loading';

export default function EditInfoShop() {
    const user = useSelector((state) => state.user)
    const [avatar, setAvatar] = useState(user?.avatar);
    const [name, setName] = useState(user?.username);
    const [email, setEmail] = useState(user?.email);
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
        setAvatar(user?.avatar)
        setLoading(false)
    }, [user?.avatar])

    useEffect(() => {
        setLoading(true)
        setName(user?.username)
        setEmail(user?.email)
        setLoading(false)
    }, [user?.username, user?.email])

    console.log('name', name)

    return (
        <section>
            <MDBContainer className="py-5">
                <MDBRow>
                    <MDBCol lg="4">
                        <MDBCard className="mb-4" >
                            <MDBCardBody className="text-center" style={{ height: "300px" }}>
                                <Loading isLoading={loading}>
                                    {avatar ?
                                        <MDBCardImage
                                            src={avatar}
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
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>User name</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText>{name}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Email</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText>{email}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Full Name</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <InputAndSubmit nameDataFile='name' />
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Phone</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <InputAndSubmit nameDataFile='phone' type='number' />
                                    </MDBCol>
                                </MDBRow>
                                {/* <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Address</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <InputAndSubmit nameDataFile='address' />
                                    </MDBCol>
                                </MDBRow> */}

                            </MDBCardBody>
                        </MDBCard>

                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}
