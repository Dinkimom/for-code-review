import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import createRootReducer from "./store";

const enhancers: [] = [];

if(process.env.NODE_ENV) {
    const devToolsExtension = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
    if (typeof devToolsExtension === "function") {
        // @ts-ignore
        enhancers.push(devToolsExtension())
    }
}

function configureStore(preloadedState = {}) {
    const store = createStore(
        createRootReducer(),
        preloadedState,
        compose(
            applyMiddleware(thunk),
            ...enhancers
        )
    );
    return store;
}

export default configureStore;