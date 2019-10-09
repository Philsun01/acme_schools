import React from 'react';
import ReactDOM from 'react-dom';


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
    this.postMoe = this.postMoe.bind(this);
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

  async postMoe(){
    console.log('Posting moe activated');
    await axios.post('/api/post', { name: 'Moe'}).then(
      res => console.log(res.data)
    )
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
        <button onClick = {postMoe}> Post Moe's Name </button>
        <hr/>
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

