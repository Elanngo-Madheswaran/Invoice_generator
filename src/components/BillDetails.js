// components/BillDetails.js
import React, { useState } from 'react';

const BillDetails = ({ onAddItem }) => {
    const [item, setItem] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddItem = () => {
        if (!item.trim()) {
            setErrorMessage('Please input data in the Item section.');
            return;
        }

        // Check if the item contains only alphabetical characters
        if (!/^[a-zA-Z]+$/.test(item)) {
            setErrorMessage('Item should only contain alphabetical characters.');
            return;
        }

        const newItem = { item, quantity, price };
        onAddItem(newItem);
        setItem('');
        setQuantity(1);
        setPrice(0);
        setErrorMessage('');
    };

    return (
        <div className='d-flex align-items-center justify-content-center flex-column flex-md-row'>
            <div className='m-2'> 
                <label>Item:</label>
                <input className='form-control' type="text" value={item} onChange={(e) => setItem(e.target.value)}/>
            </div>
            <div className='m-2'>
            <label>Quantity:</label>
            <input className='form-control'
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min={1}
            />
            </div>
            <div className='m-2'>
            <label>Price:</label>
            <input className='form-control'
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min={0}
            />
            </div>
            <div>
            <button className='btn btn-primary rounded mt-4 mx-2' onClick={handleAddItem}>Add item</button>

            </div>
            <p style={{ color: 'red' }}>{errorMessage}</p>
        </div>
    );
};

export default BillDetails;
