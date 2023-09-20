import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import reducer from "./reducer";

const composeEnhacer= window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_||compose; //esta linea es para conectar con la extension del navegador redux devtools

const store = createStore(
    reducer,
    composeEnhacer (applyMiddleware(thunkMiddleware))
);

export default store;