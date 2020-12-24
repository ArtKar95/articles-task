import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import taskReduser from "./reduser";

const middleWares = applyMiddleware(thunk);

const store = createStore(
  taskReduser,
  compose(
    middleWares,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
