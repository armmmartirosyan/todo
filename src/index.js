import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {legacy_createStore as createStore} from "redux";
import reducer from './store/reducers/index';
import Modal from 'react-modal';
import {PersistGate} from 'redux-persist/integration/react'
import './assets/styles/style.scss';
import {persistReducer, persistStore} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

Modal.setAppElement(document.body);

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer);
let persistor = persistStore(store)
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
            <DndProvider backend={HTML5Backend}>
                <App/>
            </DndProvider>
        </PersistGate>
    </Provider>
);

reportWebVitals();
