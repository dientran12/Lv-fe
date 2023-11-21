import React, { useState } from 'react';
import {
    MDBContainer,
    MDBNavbar,
    MDBBtn,
    MDBIcon,
} from 'mdb-react-ui-kit';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import InputSearch from '../InputComponent/InputSearch';

const NavbarProductShop = ({ menuList, baseUrl }) => {
    const navigation = useNavigate();
    const location = useLocation(); // Sử dụng hook này

    return (
        <>
            <MDBNavbar dark bgColor='secondary' className='py-1'>
                <MDBContainer fluid className='d-flex justify-content-between '>
                    <div className='d-flex justify-content-start align-items-center'>
                        {menuList.map((menuItem, index) => (
                            <div className={`name-tab-nav  px-3 py-1  ${location.pathname.includes(menuItem.path.toLowerCase()) ? 'active-tab' : ''} me-3`} onClick={() => navigation(`${baseUrl}/${menuItem.path}`)} key={index}  >{menuItem.name}</div>
                        ))}
                    </div>
                    <InputSearch />
                </MDBContainer>
            </MDBNavbar>
        </>
    )
}

export default NavbarProductShop;
