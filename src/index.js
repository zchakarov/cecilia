import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from './App';
import SimpleReactLightbox from 'simple-react-lightbox'
const history = createBrowserHistory();

ReactDOM.render((

<BrowserRouter history={history}>
    <SimpleReactLightbox>
        <App />
    </SimpleReactLightbox>
    </BrowserRouter>
),document.getElementById('root'));
