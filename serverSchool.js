const { syncAndSeed, models: {School, Student} } = require( './dbSchools');
const Sequelize = require('sequelize');
const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 3000;

app.get('/',(req, res, next) => {
  try{
  res.send( "Home Page" );
  } catch (err){
    console.log(err)
  }
})
app.get('/api/school', async(req, res, next) => {

  School.findAll()
    .then( school => res.send(school))
    .catch(next);
})
app.get('/api/student', async(req, res, next) => {

  const temp = await Student.findOne({where:{name:'Joe'}});

  try{
  res.send(temp.id );
  } catch (err){
    console.log(err)
  }
})
app.get(`/api/student/:name`, async(req, res, next) => {
  const newName = req.params.name;
  Student.create({ name: newName });
  const newStudent = await Student.findOne({where:{name: newName}});
  const text = `${newName} has been enrolled with student ID: ${newStudent.id}`;

  try{
  res.send(text);
  } catch (err){
    console.log(err)
  }
})

syncAndSeed().then(
  ()=> {
    app.listen(port, () => console.log('listening on port 3000'));
  }
)
