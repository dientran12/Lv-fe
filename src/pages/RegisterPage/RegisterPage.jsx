import React, { useEffect, useState } from 'react'
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput,
    MDBCheckbox,
    MDBValidation,
    MDBValidationItem,
    MDBCardImage,
    MDBInputGroup,
    MDBRipple,
    MDBCardHeader,
    MDBCardFooter,
} from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';
import LoadingHasChil from '~/components/LoadingComponent/LoadingHasChil';
import ImageUploader from '~/components/InputComponent/ImageUploader';
import { useNavigate } from 'react-router-dom';
import imageNull from '~/assets/images/no-image.jpg'
import { useCustomMutation } from '~/hooks/useMutationHook';
import * as ShopService from '~/services/ShopService'
import EditorComponent from '~/components/EditorComponent/EditorComponent';
import { toast } from 'react-toastify';


const RegisterPage = () => {
    const user = useSelector((state) => state.user)
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    // const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleOnchangeName = (e) => {
        setName(e.target.value)
    }
    const handleOnchangeAddress = (e) => {
        setAddress(e.target.value)
    }
    const handleOnchangeImage = (valueImage) => {
        setImage(valueImage)
    }
    const handleOnChangeDescription = (valueDescription) => {
        setDescription(valueDescription)
    }

    const mutation = useCustomMutation(
        (data) => ShopService.registerShop(data)
    );
    const { data, isLoading, isSuccess, isError } = mutation;

    const handleRegister = () => {
        console.log('sign in', name, address, description)
        if (name) {
            mutation.mutate({ accessToken: user?.accessToken, avatar: image, address, description: description, name: name });
        }
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success('Rename successfully', {
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
            });
        } else if (isError) {
            toast.error('Rename failed', {
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
            });
            mutation.reset();
        }
    }, [isSuccess, isError])


    return (
        <LoadingHasChil isLoading={isLoading}>
            <MDBContainer className="my-5 pb-3">
                <MDBRow className="justify-content-center align-items-center" style={{ height: '80vh' }}>
                    <MDBCol lg="8">
                        <MDBValidation>
                            <MDBCard alignment='center'>
                                <MDBCardBody className="text-start">
                                    <h1 className="fw-bold mb-0">
                                        <MDBIcon
                                            fas
                                            icon="hand-peace"
                                            className="fa-sm me-1"
                                            style={{ color: '#ff6219' }}
                                        />Hello {user?.name}</h1>
                                    <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>
                                        Please fill in the required information below to become our collaborator.
                                    </h5>
                                    <MDBRow>
                                        <MDBCol lg="4 mb-3" >
                                            <div className="d-flex align-items-center flex-column">
                                                {image ? (
                                                    <img
                                                        src={image}
                                                        className="img-fluid rounded"
                                                        style={{ width: 100, height: 100, objectFit: 'cover' }}
                                                        alt="example"
                                                    />
                                                ) : (
                                                    <img
                                                        src={imageNull}
                                                        className="img-fluid rounded"
                                                        style={{ width: 100, height: 100 }}
                                                        alt="empty-example"
                                                    />
                                                )}
                                                <div className="mt-3" style={{ width: 120 }}>
                                                    <ImageUploader
                                                        value={image}
                                                        onImageChange={(newImage) => handleOnchangeImage(newImage)}
                                                    />
                                                </div>
                                            </div>
                                        </MDBCol>
                                        <MDBCol lg="8">
                                            <MDBValidationItem feedback="Please enter a shop name." invalid={true}>
                                                <MDBInput
                                                    wrapperClass="mb-4"
                                                    value={name}
                                                    onChange={handleOnchangeName}
                                                    required
                                                    label="Shop name"
                                                    id="inputNameShop"
                                                    type="text"
                                                    size="lg"
                                                />
                                            </MDBValidationItem>
                                            <MDBValidationItem feedback="Please enter a shop address." invalid={true}>
                                                <MDBInput
                                                    wrapperClass="mb-4"
                                                    value={address}
                                                    onChange={handleOnchangeAddress}
                                                    required
                                                    label="Shop address"
                                                    id="inputAddresShop"
                                                    type="text"
                                                    size="lg"
                                                />
                                            </MDBValidationItem>
                                            <EditorComponent onChange={handleOnChangeDescription} />
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                                <MDBCardFooter>

                                    <MDBBtn
                                        className="mb-4 "
                                        size=""
                                        onClick={() => navigate('/')}
                                        color="light"
                                        style={{ float: 'right', }}

                                    >
                                        Back to Home
                                    </MDBBtn>
                                    <MDBBtn
                                        type="submit"
                                        className="mb-4 me-3"
                                        style={{ backgroundColor: '#ff8c00', float: 'right', minWidth: "150px" }}
                                        onClick={handleRegister}
                                    >
                                        Request
                                    </MDBBtn>
                                </MDBCardFooter>
                            </MDBCard>
                        </MDBValidation>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </LoadingHasChil>
    )
}

export default RegisterPage
