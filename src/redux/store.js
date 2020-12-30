import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import taskReduser from "./reduser";

const middleWares = applyMiddleware(thunk);

const store = createStore(taskReduser, middleWares);

export default store;
