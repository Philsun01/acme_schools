import  React from 'react';
import { createStore } from 'redux';
import { Provider, connect  } from 'react-redux';


const initialState = [];

    function students(state = initialState, action) {
        if (typeof state === 'undefined') {
          return 0
        }
        switch (action.type) {
          case 'ADD':
            return [...state, action.name]
          case 'REMOVE':
            return state.filter(name=>name !== action.name)
          default:
            return state
        }
      }

      const store = createStore(students)
      console.log(store.getState());
      store.dispatch({type:'ADD',name:'Jack'});
      console.log(store.getState());
      store.dispatch({type:'ADD',name:'Motley'});
      console.log(store.getState());
      store.dispatch({type:'ADD',name:'Crazy'});
      console.log(store.getState());
      store.dispatch({type:'ADD',name:'Bobby'});
      console.log(store.getState());
      store.dispatch({type:'ADD',name:'Simon'});
      console.log(store.getState());
      store.dispatch({type:'REMOVE',name:'Jack'});
      console.log(store.getState());



      export default store;

