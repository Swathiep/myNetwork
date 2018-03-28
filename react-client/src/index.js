import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Signin from './Signin';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Signin />, document.getElementById('root'));
registerServiceWorker();
