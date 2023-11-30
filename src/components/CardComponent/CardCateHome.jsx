import { MDBCard, MDBCardBody, MDBCardFooter, MDBRipple } from 'mdb-react-ui-kit'
import React from 'react'
import Noimage from '~/assets/images/no-image.jpg';

const CardCateHome = ({ item }) => {
    return (
        <div className="me-1">
            <MDBCard alignment='center'>
                <MDBRipple rippleTag='a' className='bg-image hover-zoom' style={{ borderRadius: '0' }}>
                    <img
                        src={item?.image || Noimage}
                        className=''
                        style={{ width: '100%', height: 'auto', objectFit: 'cover', aspectRatio: '1/1', opacity: '0.9' }}
                        alt='example'
                    />
                </MDBRipple>
                <MDBCardFooter className="d-flex justify-content-center  px-1 py-2">
                    <div className="text-center">{item?.name}</div>
                </MDBCardFooter>
            </MDBCard>
            {/* <div className='p-2'>
                <MDBRipple rippleTag='a' className='bg-image hover-zoom'>
                    <img
                        src={item?.image || 'https://cdn2.yame.vn/pimg/ao-thun-co-tron-toi-gian-m20-0021275/96b9c802-a685-0100-92af-0019afaf3031.jpg?w=540&h=756'}
                        className='img-fluid rounded'
                        position='top'
                        style={{ width: '100%', height: 'auto', objectFit: 'cover', aspectRatio: '1/1', }}
                        alt='thumbnail'
                    />
                </MDBRipple>
            </div>
            <div className="text-center">{item?.name}</div> */}
        </div>
    )
}

export default CardCateHome
