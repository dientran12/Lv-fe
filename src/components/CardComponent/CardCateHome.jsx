import { MDBCard, MDBCardBody, MDBCardFooter, MDBRipple } from 'mdb-react-ui-kit'
import React from 'react'

const CardCateHome = ({ item }) => {
    return (
        <div>
            <div className='p-2'>
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
            <div className="text-center">{item?.name}</div>
        </div>
    )
}

export default CardCateHome
