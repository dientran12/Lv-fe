import { MDBBtn, MDBIcon, MDBInputGroup } from 'mdb-react-ui-kit'
import React from 'react'

const InputSearch = () => {
    return (
        <div>
            <MDBInputGroup tag="form" className='d-flex w-auto'>
                <input className='form-control' placeholder="Type query" aria-label="Search" type='Search' />
                <MDBBtn color='info'><MDBIcon fas icon="search" /></MDBBtn>
            </MDBInputGroup>
        </div>
    )
}

export default InputSearch
