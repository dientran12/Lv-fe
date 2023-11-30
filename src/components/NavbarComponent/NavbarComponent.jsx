import React, { useState } from 'react'
import {
    MDBContainer,
    MDBNavbar,
    MDBBtn,
    MDBInputGroup,
    MDBBtnGroup,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBIcon,
} from 'mdb-react-ui-kit';
import { Link, useLocation, useNavigate } from 'react-router-dom';
const NavbarHeader = () => {
    const menuList = [{ name: "Category", path: "category" }, { name: "Shirts", path: "#" }, { name: "Hats", path: "#" }, { name: "Shoes", path: "#" }, { name: "Promotion", path: "#" }, { name: "News", path: "#" }]
    const navigation = useNavigate();
    const location = useLocation(); // Sử dụng hook này
    const handleNavigateToHome = () => {
        navigation('/')
    }
    return (
        <>
            <MDBNavbar dark bgColor='dark'>
                <MDBContainer fluid className='d-flex justify-content-between'>
                    <div>
                        <MDBBtn className={`name-tab-nav ${location.pathname === '/' ? 'active-tab' : ''}`} color='dark' onClick={handleNavigateToHome}>
                            <MDBIcon fas icon="home" className='me-1' />
                            Home
                        </MDBBtn>
                        {menuList.map((menuItem, index) => (
                            <MDBBtn className={`name-tab-nav me-2 ${location.pathname.includes(menuItem.name.toLowerCase()) ? 'active-tab' : ''}`} onClick={() => navigation(`/${menuItem.path}`)} key={index} color='dark'>{menuItem.name}</MDBBtn>
                        ))}
                    </div>
                </MDBContainer>
            </MDBNavbar>
        </>
    )
}

export default NavbarHeader
