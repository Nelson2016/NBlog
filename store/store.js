import React from 'react';
import {createStore} from 'redux';
import reducer from './reducer.client';
import action from './action.client';

const store = createStore(reducer);

export default store;
