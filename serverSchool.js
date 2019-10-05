const { syncAndSeed, School, Student } = require( './dbSchools');

const express = require('express');
const app = express();
const path = require('path');
const url = path.join(__dirname, 'indexSchool.html');
const port = process.env.PORT || 3000;

app.get('/',(req, res, next) => {
  try{
  res.sendFile(url);
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
  res.send('Student Page');
})

app.post(`/api/post/:name`, async(req, res, next) => {
  const studentName = req.params.name;
  const newStudent = await Student.create(studentName);
  res.send(`Posting ${studentName}`);
})

app.get(`/api/student/:name`, async(req, res, next) => {
  const studentName = req.params.name;
  const getStudent = await Student.findOne({where:{name: studentName}});
  res.send(getStudent);
})

syncAndSeed().then(
  ()=> {
    app.listen(port, () => console.log('listening on port 3000'));
  }
)
