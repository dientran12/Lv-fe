import React from 'react';
import {
    MDBCarousel,
    MDBCarouselItem,
} from 'mdb-react-ui-kit';

export default function SliderComponent() {
    return (
        <MDBCarousel showControls showIndicators>
            <MDBCarouselItem
                className='w-100 d-block'
                itemId={1}
                src='https://aristino.com/Data/upload/images/BANNER/N%C4%83m%202023/Banner-Aristino-Mobile-KV_1920x900.jpg'
                alt='...'
            >
            </MDBCarouselItem>
            <MDBCarouselItem
                className='w-100 d-block'
                itemId={2}
                src='https://aristino.com/Data/upload/images/BANNER/N%C4%83m%202023/Banner-Aristino-golf-1920x900-Zip.jpg'
                alt='...'
            >
            </MDBCarouselItem>
            <MDBCarouselItem
                className='w-100 d-block'
                itemId={3}
                src='https://aristino.com/Data/upload/images/BANNER/T03-2023/Banner-Aristino-Online-2023-Desktop.jpg'
                alt='...'
            >
            </MDBCarouselItem>
        </MDBCarousel>
    );
}
