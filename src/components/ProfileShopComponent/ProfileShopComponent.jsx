import { MDBCard, MDBCardBody, MDBCardHeader, MDBCardImage, MDBCardText, MDBCol, MDBRow } from 'mdb-react-ui-kit'
import * as ShopService from '~/services/ShopService'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Noimage from '~/assets/images/no-image.jpg';
import { useQuery } from '@tanstack/react-query';


const ProfileShopComponent = () => {
    const user = useSelector((state) => {
        return state?.user
    })

    const getDetailsShop = async (idShop) => {
        const res = await ShopService.getDetailsShop({ id: idShop, acessToken: user?.accessToken })
        return res
    }

    const queryShop = useQuery({
        queryKey: ['myshop'],
        queryFn: () => getDetailsShop(user?.shop_id),
        enabled: !!user?.shop_id,
    })

    const { isLoading: isLoadingProduct, data: stateShopDetails } = queryShop

    console.log('stateShopDetails', stateShopDetails)

    return (
        <div><MDBCard className="mt-3">
            <MDBRow >
                <MDBCol lg="4">
                    <div className="mb-4" style={{ height: '100%' }}>
                        <MDBCardBody className="text-center" >
                            {stateShopDetails?.avatar ?
                                <MDBCardImage
                                    src={stateShopDetails?.avatar}
                                    alt="avatar"
                                    className="rounded-circle"
                                    style={{ width: '150px', height: '150px' }}
                                    fluid />
                                :
                                <MDBCardImage
                                    src={Noimage}
                                    alt="avatar"
                                    className="rounded-circle"
                                    style={{ width: '150px', height: '150px' }}
                                    fluid />
                            }
                            <div className="d-flex justify-content-center mb-2 mt-3">
                                <MDBCardText className=" fw-bold fs-3">{stateShopDetails?.name}</MDBCardText>
                            </div>
                        </MDBCardBody>
                    </div>

                </MDBCol>
                <MDBCol lg="8">
                    <div className="mb-4" style={{ height: '100%' }}>
                        <MDBCardBody>
                            <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText>Shop Name</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText>{stateShopDetails?.name}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText>Status</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-danger">{stateShopDetails?.status}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText>Address</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText>{stateShopDetails?.address}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText>Descriptions</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    {stateShopDetails?.description}
                                </MDBCol>
                            </MDBRow>
                            <hr />
                        </MDBCardBody>
                    </div>

                </MDBCol>
            </MDBRow>
        </MDBCard></div>
    )
}

export default ProfileShopComponent
