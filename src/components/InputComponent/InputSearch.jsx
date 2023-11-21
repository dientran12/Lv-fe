import { MDBBtn, MDBIcon, MDBInputGroup } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';

const InputSearch = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 780);
    const [inputValue, setInputValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleWindowSizeChange = () => {
        setIsMobile(window.innerWidth <= 780);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        // Perform any additional logic for suggestions based on the input value
        // and set showSuggestions to true when you want to display suggestions.
        setShowSuggestions(true);
    };

    const handleInputFocus = () => {
        // Set showSuggestions to true when the input is focused.
        setShowSuggestions(true);
    };

    const handleInputBlur = () => {
        // Set showSuggestions to false when the input loses focus.
        setShowSuggestions(false);
    };

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);

        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);

    return (
        <>
            <MDBInputGroup tag="form">
                <input
                    className='form-control'
                    placeholder="Type query"
                    aria-label="Search"
                    type='Search'
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                />
                <MDBBtn>{isMobile ? <MDBIcon fas icon="search" /> : "Search"}</MDBBtn>
            </MDBInputGroup>

            {/* Suggestions */}
            {showSuggestions && (
                <div className="suggestions-container " style={{ backgroundColor: "white", minHeight: 200 }}>
                    Render your suggestions and search history here
                    {/* For example, you can map through an array of suggestions and display them */}
                    {/* <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul> */}
                </div>
            )}
        </>
    );
};

export default InputSearch;
