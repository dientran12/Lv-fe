import { MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import React, { useState } from 'react';
function InputQuantityGroup({ onValueChange }) {
    const [value, setValue] = useState(1);

    const handleValueChange = (newValue) => {
        setValue(newValue);
        onValueChange(newValue); // gọi hàm gọi lại với giá trị mới
    };

    const increment = () => {
        handleValueChange(value + 1);
    };

    const decrement = () => {
        handleValueChange(value > 1 ? value - 1 : 1);
    };

    const handleInputChange = (event) => {
        const newValue = parseInt(event.target.value, 10);
        if (!isNaN(newValue)) {
            handleValueChange(newValue);
        }
    };


    return (
        <div className="input-group mb-3">
            <MDBBtn
                color="black"
                outline
                className="border border-secondary px-3"
                type="button"
                onClick={decrement}
                ripple="dark"
            >
                <i className="fas fa-minus"></i>
            </MDBBtn>

            <MDBInput
                type="text"
                color="black"
                value={value}
                onChange={handleInputChange}
                className="form-control text-center border border-secondary"
            />

            <MDBBtn
                color="black"
                outline
                className="border border-secondary px-3"
                type="button"
                onClick={increment}
                ripple="dark"
            >
                <i className="fas fa-plus"></i>
            </MDBBtn>
        </div>
    );
}

export default InputQuantityGroup;
