const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize(
  'postgres://postgres:rn6yBZ1QG7x1asvBRzaX@localhost:5432/demo'
);

const Task = sequelize.define('tasks', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isDone: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/todo', async (req, res) => {
  console.log('Get all todos');
  const todos = await Task.findAll({
    order: [['createdAt', 'DESC']],
  });
  res.send(todos);
});

app.get('/todo/completed', async (req, res) => {
  const todos = await Task.findAll({
    where: {isDone: true},
    order: [['createdAt', 'DESC']],
  });

  res.send(todos);
});

app.post('/todo', async (req, res) => {
  const todo = await Task.create(req.body);
  res.status(201).send(todo);
});

app.put('/todo/:id', async (req, res) => {
  await Task.update(
    {...req.body, updatedAt: new Date()},
    {
      where: {
        id: req.params.id,
      },
    }
  );
  res.status(200).send();
});

app.delete('/todo/:id', (req, res) => {
  Task.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).send();
});

app.get('*', (req, res) => {
  res.send('Hello World');
});

sequelize
  .authenticate()
  .catch((error) => {
    console.error('There was an error connecting to db');
    throw error;
  })
  .then(() =>
    app.listen(4000, () => {
      console.log('Ready to get todos!');
    })
  );
