import React from 'react';
import ReactDOM from 'react-dom';
import './popup.css';

const Test = () => {
    return <img src='icon.png' alt='' />;
};

const root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(<Test />, root);
