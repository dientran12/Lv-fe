import React from 'react';
import { MDBIcon } from 'mdb-react-ui-kit';

const ImageChoosedComponent = ({ imageItem, index, onRemove }) => {
    const handleClose = () => {
        onRemove(index); // Gọi hàm onRemove với index của item để xóa nó
    };

    return (
        <div className="mb-1">
            <img
                src={imageItem}
                alt="imageProduct"
                className='img-fluid'
                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
            />
            <MDBIcon
                fas
                icon="times"
                size="lg"
                onClick={handleClose}
                className="ms-1"
                style={{ cursor: "pointer" }}
            />
        </div>
    );
};

export default ImageChoosedComponent;
