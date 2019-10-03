const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_school');

const School = conn.define('school',{
  id: {
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    type: Sequelize.UUID
  },
  name: {
  type: Sequelize.STRING,
  unique: true,
  allowNull: false
  }
});

const Student = conn.define('student',{
  id: {
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    type: Sequelize.UUID
  },
  name: {
  type: Sequelize.STRING,
  unique: true,
  allowNull: false
  }
});

const syncAndSeed = async()=>{
  await conn.sync({ force: true });

  School.create({name: 'UCLA'});
  School.create({name: 'USC'});
  Student.create({name: 'Billy'});
  Student.create({name: 'Billy'});

}

syncAndSeed();
