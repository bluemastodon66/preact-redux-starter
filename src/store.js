import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import app from './reducers/app';

export default compose(applyMiddleware(thunk))(createStore)(combineReducers({
    app
}));