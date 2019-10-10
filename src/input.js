import React from 'react';
import store from './store';


class Input extends React.Component{
  constructor(){
    super();
    this.state = {
      firstName: 'First name is here',
      lastName: '',
      school: '',
      gpa: '',
      email: ''
      }
      this.postNew = this.postNew.bind(this);
    }

    async postNew(){
      console.log('Posting New Student activated');
      await axios.post('/api/post', {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          school: this.state.school,
          gpa: this.state.school,
          email: this.state.school
        }).then(res => console.log(res.data))

        store.dispatch({
          type:'ADD',
           student: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                school: this.state.school,
                gpa: this.state.school,
                email: this.state.school
              }
      });

    }

    render(){

      return (
        <div>
          <p>First Name
          <input  value = {this.state.firstName} onChange ={(ev) => this.setState({ firstName: ev.target.value} )} />
          </p>
          <p>Last Name
          <input  value = {this.state.lastName} onChange ={(ev) => this.setState({ lastName: ev.target.value} )} />
          </p>
          <p>School
          <input  value = {this.state.school} onChange ={(ev) => this.setState({ school: ev.target.value} )} />
          </p>
          <p>GPA
          <input  value = {this.state.gpa} onChange ={(ev) => this.setState({ gpa: ev.target.value} )} />
          </p>
          <p>E-mail
          <input  value = {this.state.email} onChange ={(ev) => this.setState({ email: ev.target.value} )} />
          </p>

          <p>
            First Name: {this.state.firstName} <br/>
            Last Name: {this.state.lastName} <br/>
            School: {this.state.school} <br/>
            GPA: {this.state.gpa} <br/>
            e-mail: {this.state.email} <br/>
          </p>
          <button onClick = {this.postNew}>Add student</button>
        </div>
      );
    }
  }

export default Input;
