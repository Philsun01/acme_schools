import thunk from 'redux-thunk';
import {applyMiddleware } from 'redux';
import { createStore } from 'redux';
import { Provider, connect  } from 'react-redux';



const initialState = [];

    function students(state = [], action) {
        if (typeof state === 'undefined') {
          return 0
        }
        switch (action.type) {
          case 'ADD':
            return [...state, action.student]
        //case 'REMOVE':
           // return state.filter(name=>name !== action.name)
          default:
            return state
        }
      }

      const store = createStore(students, applyMiddleware(thunk))

      store.dispatch({
            type:'ADD',
             student: {
                  firstName:'John',
                  lastName:'Smith',
                  school: 'UCSD',
                  gpa: '8.9',
                  email: 'some@yahoo.com'
                }
        });
      store.dispatch({
            type:'ADD',
             student: {
              firstName:'Mason',
              lastName:'Mark',
              school: 'Cal State Fullerton',
              gpa: '10',
              email: 'yikes@yahoo.com'
            }
        });

      const getAllStudents = async() => {
        console.log('Getting All Students');
        const studentData = (await axios.get('/api/allstudents')).data;
        studentData.map(newStudent => store.dispatch({type: 'ADD', student: newStudent}))
        console.log(store.getState());
      }


      getAllStudents();

      export default store;

