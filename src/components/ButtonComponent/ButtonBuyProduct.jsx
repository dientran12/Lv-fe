import { MDBBtn, MDBModalBody, MDBRow } from 'mdb-react-ui-kit'
import React, { useState } from 'react'
import ModalComponent from '../ModalComponent/ModalComponent';

const ButtonBuyProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModalBuynow = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleSubmitEdit = () => {
    };

    return (
        <>
            <MDBBtn className="bg-error" color='success' onClick={showModalBuynow} >
                Buy Now
            </MDBBtn>
            <ModalComponent
                size="md" title="Buy Nows"
                nameBtnSub='Buys'
                isOpen={isModalOpen}
                onOke={handleSubmitEdit}
                onClose={handleCancel}
            >
                <MDBModalBody className='d-flex justify-content-center'>
                    <div className='w-75'>
                        <MDBRow>
                            quan que
                        </MDBRow>
                    </div>
                </MDBModalBody>
            </ModalComponent>
        </>
    )
}

export default ButtonBuyProduct
