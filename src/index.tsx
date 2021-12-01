import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { AppWithRedux } from './AppWithRedux';

ReactDOM.render ( <AppWithRedux/>, document.getElementById ( 'root' ) );

serviceWorker.unregister ();
