import { MDBBtn, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBTypography } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import * as ShopService from '~/services/ShopService'

const InfoStatusShopComponet = ({ shopId }) => {
    const [stateShopDetails, setStateShopDetails] = useState({})
    const [isLoadingDetailShop, setIsLoadingDetailShop] = useState(false)


    const fetchGetDetailsShop = async (idShop) => {
        setIsLoadingDetailShop(true)
        const res = await ShopService.getDetailsShop({ id: idShop })
        if (res) {
            setStateShopDetails({
                id: res?.id,
                name: res?.name,
                description: res?.description,
                status: res?.status,
                avatar: res?.avatar,
                address: res?.address
            })
        }
        setIsLoadingDetailShop(false)
    }

    useEffect(() => {
        fetchGetDetailsShop(shopId || 2)
    }, [shopId]);

    return (
        <MDBContainer>
            <div className="bg-white " >
                <MDBRow className='p-3'>
                    <MDBCol lg='4' className="d-flex" style={{ borderRight: '1px solid #ccc' }}>
                        <div>
                            <MDBCardImage
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                alt="avatar"
                                className="rounded-circle"
                                style={{ width: '100px', height: '100px' }}
                                fluid />
                        </div>
                        <div className="ms-2 d-flex flex-column flex-grow-1">
                            <MDBTypography tag='h5' className='mb-0'>Name Shop</MDBTypography>
                            <p><em>active</em></p>
                            <div className='d-flex justify-content-between'>
                                <MDBBtn color='warning' className='px-1' style={{ width: '100%' }} >
                                    <MDBIcon fas icon="comments" className='me-1' />
                                    Chat Now
                                </MDBBtn>
                            </div>
                        </div>
                    </MDBCol>
                    <MDBCol lg='8'></MDBCol>
                </MDBRow>
            </div>
        </MDBContainer>
    )
}

export default InfoStatusShopComponet
