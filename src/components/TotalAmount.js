// components/TotalAmount.js
import React from 'react';

const TotalAmount = ({ items, tax, total }) => {
    if (!items || items.length === 0) {
        return (
            <div>
                <p>No items</p>
            </div>
        );
    }

    return (
        <div className="text-start">
            <p>
                Total Amount: ${total.toFixed(2)}
            </p>
            <p>Tax: {tax}% = ${(total * (tax / 100)).toFixed(2)}</p>
            <h3>Bill amount: ${(total + (total * (tax / 100))).toFixed(2)}</h3>
        </div>
    );
};

export default TotalAmount;
