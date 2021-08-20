import React from 'react';
import ReactDOM from 'react-dom';
import './options.css';

const Test = () => {
    return <div>Hello World</div>;
};

const root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(<Test />, root);
