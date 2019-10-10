const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_school');

const School = conn.define('school',{
  id: {
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    type: Sequelize.UUID
  },
  name: {
  type: Sequelize.STRING

  }
});

const Student = conn.define('student',{
  id: {
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    type: Sequelize.UUID
  },
  firstName: {
  type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  school: {
    type: Sequelize.STRING,
  },
  gpa: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },

});

const syncAndSeed = async()=>{
  await conn.sync({ force: true });

  School.create({name: 'UCLA'});
  School.create({name: 'USC'});
  Student.create({
                firstName: 'Billy',
                lastName: 'Bob',
                school: 'UCLA',
                gpa: '4.0',
                email: 'Something@gmail.com'
                });
  Student.create({
                firstName: 'Joe',
                lastName: 'Schmoe',
                school: 'USC',
                GPA: '3.5',
                email: 'Another@gmail.com'
                });

}

//syncAndSeed();

module.exports = {
  syncAndSeed,
  School,
  Student
};
