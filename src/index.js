import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store.js';
import Input from './input.js';



class App extends React.Component{
  constructor(){
    super();
    this.state = {
      students: [],
      studentName: 'Jack',
      joe: {
          name: 'blank',
          id: '0000'
          }
    };
    this.getJoe = this.getJoe.bind(this);

    this.deleteMoe = this.deleteMoe.bind(this);
    this.updateMoe = this.updateMoe.bind(this);
  }

  async componentDidMount(){
    //const temp = await axios.get('/api/student')
    //const temp = 'John'
    //console.log(temp)

    this.setState( {studentName: (await axios.get('/api/student')).data} )
  }

  async getJoe(){
    console.log('get joe activated');
    this.setState( { joe: (await axios.get('/api/student/Joe')).data})
  }

  async updateMoe(){
    console.log('Updating Moe now');
    await axios.put('/api/update/Moe', { name: 'Toad'}).then(
      res => console.log(res.data)
    )
  }

  async deleteMoe(){
    console.log('Deleting moe activated');
    await axios.delete('/api/delete/Moe')
    .then(res=>console.log(res));

  }

  render(){
    const {studentName, joe} = this.state;
    const {getJoe, postMoe, deleteMoe, updateMoe} = this;
    return(
      <div>
        <h2> Hello Button </h2>
        <button onClick = {deleteMoe}> Delete Moe's Name </button>
        <hr/>
        <button onClick = {updateMoe}> Update Moe to Toad </button>
        <hr/>
        <button> Get Student Name </button>
        <p> Student name is {studentName}</p>
        <hr></hr>
        <button onClick = {getJoe}> Get Student Joe's Name </button>
        <p> {joe.name} new ID number is {joe.id}</p>
      </div>

    )
  }
}
ReactDOM.render(<App></App>, document.querySelector('#root'));

class Students extends React.Component{
  constructor(){
    super();
    this.state = {
      students: store.getState()
    }
    this.addTim = this.addTim.bind(this);
  }

  addTim(){
    store.dispatch({type:'ADD',name:'Timmy'});
    console.log('adding Tim');
    console.log(store.getState());
    this.setState({
                    students: store.getState()
                  })
  }
  render(){

    const {students} =  this.state;
    const {addTim} = this;

    return(
      <div>
        <h1> This is redux Provider List Test </h1>
        <button onClick= {addTim}>Add Student to Redux</button>
        <ul>
        {students.map((student, idx) => <li key={idx}>{student.firstName}</li>)}
        </ul>
      </div>
    )
  }

}

ReactDOM.render(<Input /> , document.querySelector('#input'));
ReactDOM.render(<Provider store = {store}><Students /> </Provider>, document.querySelector('#studentList'));


