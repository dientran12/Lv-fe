import React, { useEffect, useState } from 'react'
import {
    MDBContainer,
    MDBBtn,
    MDBIcon,
    MDBPopover,
    MDBPopoverBody,
    MDBListGroup,
    MDBListGroupItem,
    MDBRipple,
    MDBModalBody,
    MDBTypography,
    MDBCol,
    MDBRow,
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InputSearch from '../InputComponent/InputSearch';
import ItemNavMenu from '../ItemNavMenuComponent/ItemNavMenu';
import NavbarHeader from '../NavbarComponent/NavbarComponent';
import * as UserService from '~/services/UserService'
import { resetUser } from '~/redux/slides/userSlide';
// import ModalComponent from '../ModalComponent/ModalComponent';
import LoadingHasChil from '../LoadingComponent/LoadingHasChil';
import { Button, Modal } from 'rsuite';


const HeaderComponent = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [userName, setUserName] = useState(false)
    const [isModalStateShop, setIsModalStateShop] = useState(false)
    const [modalContent, setModalContent] = useState(null);
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }
    useEffect(() => {
        setLoading(true)
        setUserName(user?.name)
        setLoading(false)
    }, [user?.name])

    console.log('user', user)
    const contentChildren = (
        <div style={{ display: 'inline-block' }}>
            <LoadingHasChil isLoading={loading} color='#54b4d3'>
                {userName}
            </LoadingHasChil>
        </div>
    )

    const contentCustomerViewModal = (
        <div>
            <MDBIcon fas icon="exclamation-triangle" />
            <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                You currently have not registered a shop. Would you like to create your own shop and become our collaborator?
            </div>
            <Modal.Footer>
                <Button color="orange" appearance="primary">
                    Oke
                </Button>
                <Button appearance="subtle">
                    Cancel
                </Button>
            </Modal.Footer>
        </div>
    )

    const handleViewYourShop = async () => {
        if (user?.role === 'seller') {
            navigate('/my-shop')
            return
        }
        setIsModalStateShop(true)
        if (user?.role === "customer") {
            setModalContent(contentCustomerViewModal)
        }
        if (user?.role === 'spending') {

        }
    }
    const handleLogout = async () => {
        setLoading(true)
        console.log('Logout')
        await UserService.logoutUser()
        dispatch(resetUser())
        setLoading(false)
    }
    const handleRegister = async () => {
        navigate('/sign-in')
    }

    return (
        <>
            <div className="p-2 text-dark my-header" >
                <MDBContainer className='d-flex' style={{ height: '100%' }}>
                    <div className='flex-shrink-0' style={{ fontSize: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white', width: "200px" }}>
                        <div><MDBIcon fas icon="trash-alt" /> DaDi</div>
                    </div>
                    <div className="flex-grow-1 d-flex flex-column">
                        <div className='d-flex mb-2'>
                            <div className="flex-grow-1">
                                <ItemNavMenu nameItem="Notification" icon={<MDBIcon far icon="bell" />} color="#fff" />
                                <ItemNavMenu nameItem="Support" icon={<MDBIcon far icon="question-circle" />} color="#fff" />
                                <ItemNavMenu nameItem="Language" icon={<MDBIcon fas icon="globe-americas" />} color="#fff" />
                            </div>
                            <div className='flex-shrink-0'>
                                {user?.name ? (
                                    <>
                                        <MDBPopover className='mt-2' btnChildren={contentChildren} placement='bottom' color='light' outline rippleColor='dark' dismiss >
                                            <MDBPopoverBody className='p-2'>
                                                <MDBListGroup style={{ minWidth: '150px' }} light>
                                                    <MDBRipple>
                                                        <MDBListGroupItem aria-current='true' onClick={() => navigate('/profile-user')} noBorders className='nameListTitle mb-1 rounded-1'>
                                                            <MDBIcon fas icon="user-alt" className='pe-1' />  Views Profile
                                                        </MDBListGroupItem>
                                                    </MDBRipple>
                                                    {user?.role === "customer" &&
                                                        <MDBRipple>
                                                            <MDBListGroupItem aria-current='true' onClick={() => navigate('/history')} noBorders className='nameListTitle mb-1 rounded-1'>
                                                                <MDBIcon fas icon="history" className='pe-1' /> Order History
                                                            </MDBListGroupItem>
                                                        </MDBRipple>
                                                    }
                                                    <MDBRipple>
                                                        <MDBListGroupItem aria-current='true' onClick={handleViewYourShop} noBorders className='nameListTitle mb-1 rounded-1'>
                                                            <MDBIcon fas icon="store" className='pe-1' /> Your Shop
                                                        </MDBListGroupItem>
                                                    </MDBRipple>
                                                    <MDBRipple>
                                                        <MDBListGroupItem aria-current='true' onClick={handleLogout} noBorders className='nameListTitle text-center logout textColorRed rounded-1'>
                                                            Log out
                                                        </MDBListGroupItem>
                                                    </MDBRipple>
                                                </MDBListGroup>
                                            </MDBPopoverBody>
                                        </MDBPopover>
                                    </>
                                )
                                    : (<MDBBtn className='non-bg' onClick={handleNavigateLogin} color='light' rippleColor='dark'>
                                        <MDBIcon className='me-1 ' icon="smile-wink" size='lg' />
                                        Account
                                    </MDBBtn>)
                                }
                            </div>
                        </div>
                        <div className="flex-grow-1 d-flex">
                            <div className="flex-grow-1" >
                                <div className='mt-2' >
                                    <InputSearch />
                                </div>
                            </div>
                            <div className='d-flex justify-content-center align-items-center' style={{ width: '150px' }}>
                                <div onClick={() => navigate('/cart')}><ItemNavMenu icon={<MDBIcon fas icon="shopping-cart" size='2x' />} color="white" padding="8px 10px" /></div>
                            </div>
                        </div>
                    </div>
                </MDBContainer>
            </div>
            <Modal backdrop="static" open={isModalStateShop} onClose={() => setIsModalStateShop(false)} >
                <div>
                    <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                        <MDBIcon fas icon="exclamation-triangle" size="xl" className='me-2' style={{ color: "#ebd104" }} />
                        You currently have not registered a shop. Would you like to create your own shop and become our collaborator?
                    </div>
                    <Modal.Footer>
                        <Button color="orange" appearance="primary">
                            Register now
                        </Button>
                        <Button appearance="subtle" onClick={() => setIsModalStateShop(false)}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>
            <MDBContainer>
                <NavbarHeader />
            </MDBContainer>
        </>
    )
}

export default HeaderComponent
