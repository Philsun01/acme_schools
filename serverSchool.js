const { syncAndSeed, School, Student } = require( './dbSchools');

const express = require('express');
const app = express();
const path = require('path');
const url = path.join(__dirname, 'indexSchool.html');
const port = process.env.PORT || 3000;

/*
app.use((req,res,next)=> {
  console.log(` ${req.url} called as ${req.method}`);
  next('next Line asfter console.log');
})
*/
app.use(express.json());

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
  res.send('Connected to API Student Page');
})

app.get(`/api/student/:name`, async(req, res, next) => {
  const studentName = req.params.name;
  const getStudent = await Student.findOne({where:{name: studentName}});
  res.send(getStudent);
})

app.post(`/api/post`, async(req, res, next) => {
  console.log(req.body);
  try{
    const newStudent = await Student.create(req.body);
    res.send(newStudent);
  } catch(ex) {
    next(ex)
  }
})

app.delete(`/api/delete/:name`, async(req, res, next) => {
  console.log(req.body);
  try{
    const studentName = req.params.name;
    const delStudent = await Student.destroy( {where:{name: studentName}} );
    res.send(delStudent);
  } catch(ex) {
    next(ex)
  }
})


syncAndSeed().then(
  ()=> {
    app.listen(port, () => console.log('listening on port 3000'));
  }
)
