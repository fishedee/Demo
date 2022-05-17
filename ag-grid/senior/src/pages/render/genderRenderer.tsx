import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';
export default (props: ICellRendererParams) => {
    const image = props.value === 'Male' ? 'male.png' : 'female.png';
    const imageSource = `https://www.ag-grid.com/example-assets/genders/${image}`;
    return (
        <span>
            <img src={imageSource} />
            {props.value}
        </span>
    );
};