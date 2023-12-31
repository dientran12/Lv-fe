import React, { useEffect, useState } from 'react';
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
} from 'mdb-react-ui-kit';
import * as UserService from '~/services/UserService'
import { useCustomMutation } from '~/hooks/useMutationHook';
import Loading from '~/components/LoadingComponent/Loading';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { updateUser } from '~/redux/slides/userSlide';


function SignInPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const mutation = useCustomMutation(
        data => UserService.loginUser(data)
    )
    const { data, isLoading, isSuccess, isError } = mutation;

    const handleCheckboxChange = () => {
        setShowPassword(!showPassword);
    };

    const handleOnchangeUsername = (e) => {
        setUsername(e.target.value)
    }
    const handleOnchangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSignIn = (e) => {
        console.log('sign in', username, password)
        mutation.mutate({
            username,
            password
        })
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success('Log in is successful', {
                // position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
            localStorage.setItem('accessToken', JSON.stringify(data?.accessToken))
            if (isSuccess) {
                const decoded = jwt_decode(data?.accessToken)
                console.log("decode", decoded);
                if (decoded?.username) {
                    handleGetDetailsUser(data?.accessToken)
                }
            }
            navigate('/');
        }

        if (isError) {
            toast.error(<div>Login failed!<br /><div style={{ color: 'red', fontWeight: 'bold' }}>{data?.message}</div></div>, {
                // position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, isSuccess])

    const handleGetDetailsUser = async (token) => {
        const response = await UserService.getDetailsUser(token)
        dispatch(updateUser({ ...response, accessToken: token }))
    }

    return (
        <MDBContainer >
            <MDBRow className="my-5 d-flex justify-content-center align-content-center" style={{ height: '80vh' }}>
                <MDBCard className="my-5 pt-5 pb-3" style={{ maxWidth: '800px' }}>
                    <div className=" d-flex justify-content-center ">
                        <MDBCardBody className='d-flex flex-column' style={{ maxWidth: '500px' }}>
                            <div className='d-flex flex-row mt-2 mb-5d'>
                                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                                <span className="h1 fw-bold mb-0">Sign In</span>
                            </div>

                            <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>
                            <MDBValidation>
                                <MDBValidationItem feedback='Please enter an email address.' invalid={true}>
                                    <MDBInput wrapperClass='mb-4' value={username} onChange={handleOnchangeUsername} required label='User name' id='inputEmailSignIn' type='text' size="lg" />
                                </MDBValidationItem>
                                <MDBValidationItem feedback='Please enter an password.' invalid>
                                    <MDBInput label='Password' id='inputPassSignIn' type={showPassword ? 'text' : 'password'} required value={password} onChange={handleOnchangePassword} size='lg' />
                                </MDBValidationItem>

                                <div className='mb-4'>
                                    <input
                                        type='checkbox'
                                        name='flexCheck'
                                        id='flexCheckDefault'
                                        checked={showPassword}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label htmlFor='flexCheckDefault' className='ms-2' style={{ fontSize: '14px' }}>
                                        Show
                                    </label>
                                </div>

                                <MDBRow className='mb-3'>
                                    <MDBCol sm="6"><a className="small text-muted" href="/">Forgot password?</a></MDBCol>
                                    <MDBCol sm="6" className=" pb-lg-2 d-flex justify-content-end">
                                        <a href="/sign-up" style={{ color: '#393f81', textDecoration: "underline" }}>Register here</a>
                                    </MDBCol>
                                </MDBRow>
                                <MDBBtn type='submit' style={{ float: 'right' }} onClick={handleSignIn} className="mb-4 px-5" color='dark' size='lg'>
                                    <Loading isLoading={isLoading} color='#b9cdc9'>
                                        Login
                                    </Loading>
                                </MDBBtn>
                            </MDBValidation>
                        </MDBCardBody>
                    </div>
                </MDBCard>
            </MDBRow>

        </MDBContainer>
    );
}

export default SignInPage;
