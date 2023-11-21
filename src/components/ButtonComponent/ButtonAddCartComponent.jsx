import React from 'react';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

export default function ButtonAddCartComponent({ children, size = '' }) {
    const navigate = useNavigate()

    return (
        <MDBBtn size={size} color='warning' >{children}</MDBBtn>
    );
}
