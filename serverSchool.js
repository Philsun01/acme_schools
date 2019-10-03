const { syncAndSeed, models: {School, Student} } = require( './dbSchools');

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
  try{
  res.send( await School.findAll() );
  } catch (err){
    console.log(err)
  }
})
app.get('/api/student', async(req, res, next) => {
  try{
  res.send( await Student.findAll() );
  } catch (err){
    console.log(err)
  }
})


syncAndSeed().then(
  ()=> {
    app.listen(port, () => console.log('listening on port 3000'));
  }
)
