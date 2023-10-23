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
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../LoadingComponent/Loading';
import InputSearch from '../InputGroupComponent/InputSearch';
import ItemNavMenu from '../ItemNavMenuComponent/ItemNavMenu';
import NavbarCompoent from '../NavbarComponent/NavbarComponent';
import * as UserService from '~/services/UserService'
import { resetUser } from '~/redux/slides/userSlide';


const HeaderComponent = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [userName, setUserName] = useState(false)
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

    console.log('user?.name', userName)
    const contentChildren = (
        <div style={{ display: 'inline-block' }}>
            <Loading isLoading={loading} color='#54b4d3'>
                {userName}
            </Loading>
        </div>
    )
    const handleLogout = async () => {
        setLoading(true)
        console.log('Logout')
        await UserService.logoutUser()
        dispatch(resetUser())
        setLoading(false)
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
                                                            Details Profile
                                                        </MDBListGroupItem>
                                                    </MDBRipple>
                                                    <MDBRipple>
                                                        <MDBListGroupItem aria-current='true' onClick={() => navigate('/my-shop')} noBorders className='nameListTitle mb-1 rounded-1'>
                                                            View Your Shop
                                                        </MDBListGroupItem>
                                                    </MDBRipple>
                                                    <MDBRipple>
                                                        <MDBListGroupItem aria-current='true' onClick={handleLogout} noBorders className='nameListTitle logout textColorRed rounded-1'>
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
            <MDBContainer>
                <NavbarCompoent />
            </MDBContainer>

        </>
    )
}

export default HeaderComponent
