// components/ItemList.js
import React from 'react';

const ItemList = ({ items, onDeleteItem, onUpdateItem }) => {
    return (
        <div className="item-list">
            <h2>Item List ({items.length})</h2>
            {items.map((item, index) => (
                <div className="d-flex flex-md-row flex-column" key={index}>
                    <div className='m-4'>
                        Item:
                        <input
                            className='form-control'
                            value={item.item}
                            onChange={(e) => onUpdateItem(index, 'item', e.target.value)}
                        />
                    </div>
                    <div className='m-4'>
                        Quantity:
                        <input
                            className='form-control'
                            type='number'
                            value={item.quantity}
                            onChange={(e) => onUpdateItem(index, 'quantity', e.target.value)}
                            min={1}
                        />
                    </div>
                    <div className='m-4'>
                        Price:
                        <input
                            className='form-control'
                            type='number'
                            value={item.price}
                            onChange={(e) => onUpdateItem(index, 'price', e.target.value)}
                            min={0}
                        />
                    </div>
                    <div className='m-4'>
                        Amount:
                        <input
                            className='form-control'
                            type='number'
                            value={item.price * item.quantity}
                            readOnly
                        />
                    </div>
                    <button
                        className='btn btn-danger rounded m-5'
                        onClick={() => onDeleteItem(index)}
                    >
                        Delete
                    </button>
                </div>
            ))}
            <hr />
        </div>
    );
};

export default ItemList;
