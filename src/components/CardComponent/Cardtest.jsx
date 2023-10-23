import React from 'react';

export default function CardProduct({ product, isChecked, onCheckboxChange }) {
    return (
        <li>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => onCheckboxChange(e.target.checked)}
            />
            {product.name} - ${product.price}
        </li>
    );
}
