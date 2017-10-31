// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import {
  APP_UPDATE
} from 'src/actions/all';
const initialState = {
  title: 'default title',
  metas: [
	{name: "description", content: "網站描述"},
	{property: "og:type", content: "article"}  
  ],
  path: '',
  params: {}
};
const handlers = {
  [APP_UPDATE]: (_, action) => {
    return {
      ...action
    };
  }
};
export default function appReducer(state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler)
    return state;
  return {
    ...state,
    ...handler(state, action)
  };
}
