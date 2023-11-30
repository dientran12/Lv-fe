import React, { useRef, useState } from 'react';
import { MDBBtn, MDBCol, MDBIcon, MDBRow } from 'mdb-react-ui-kit';
import ImageChoosedComponent from '../CardComponent/ImageChoosedComponent';
import { getBase64 } from '~/utils';

const ChooseManyImage = () => {
    const [images, setImages] = useState([]);
    const fileInputRef = useRef(null);

    const handleFileChange = async (event) => {
        const files = Array.from(event.target.files);
        const newImages = await Promise.all(files.map(async (file) => {
            return await getBase64(file);
        }));
        setImages([...images, ...newImages]);
    };

    const handleChooseFile = () => {
        fileInputRef.current.click();
    };

    const handleRemoveImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    console.log("images", images)

    return (
        <div>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                multiple
            />
            <MDBRow className="row-cols-1  row-cols-sm-3 g-4">
                {images?.map((imageItem, index) => (
                    <MDBCol key={index}>
                        <div>
                            <ImageChoosedComponent
                                imageItem={imageItem}
                                index={index}
                                onRemove={handleRemoveImage}
                            />
                        </div>
                    </MDBCol>
                ))}
            </MDBRow>
            <div className="text-start">
                <MDBIcon fas icon="upload" onClick={handleChooseFile} className="px-5 py-2 mt-2 bg-hover-green" style={{ backgroundColor: '#ffd021', borderRadius: '5px', fontSize: '14px', cursor: 'pointer' }} />
            </div>
        </div>
    );
};

export default ChooseManyImage;
