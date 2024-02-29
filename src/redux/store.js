import { createStore, applyMiddleware, compose } from "redux";
import ThunkMiddleware from "redux-thunk";
import rootReducer from "./reducer";

const composeEnhancers =
    (typeof window !== "undefined" &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

let store;

if (typeof window !== "undefined") {
    store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(ThunkMiddleware))
    );
} else {
    store = createStore(rootReducer, applyMiddleware(ThunkMiddleware));
}

export default store;