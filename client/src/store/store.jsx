//conectamos el store con los reducer y el middleware(si trabajamos con info asyncronica)
//al hacer esta coneccion en el store va a encontrarse el estado. 

//createStore recibe por parametro UN reducer
//en el caso de tener muchos reducers, antes de pasarselo al createStore
//debo hacer un combinedReducer(reducer1,reducer2,...)-en el archivo de reducers-
//y luego pasarselo al reducer combinado

 import rootReducer from "../reducer/reducer";
 import { createStore, applyMiddleware } from 'redux';
 import { composeWithDevTools } from 'redux-devtools-extension';
 import thunk from 'redux-thunk';
// const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

 export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
//  export default store;