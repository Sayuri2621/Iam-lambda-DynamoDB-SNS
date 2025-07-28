const { v4 } = require('uuid');
const AWS = require('aws-sdk');

const addTask = async () => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const sns = new AWS.SNS();

  const newTask = {
    id: v4(), //44A4DS5A4DA5SD4SA5D4AS
    title: 'Tarea de prueba',
    description: 'Esta es una tarea de prueba simple',
    createdAt: new Date().toISOString()
  };

  await dynamodb.put({
    TableName: 'TaskTable',
    Item: newTask
  }).promise();
  
  const snsResponse = await sns.publish({
    TopicArn: process.env.TASK_TOPIC_ARN,
    Message: 'Se creó una nueva tarea: ${task.title}',
    Subject: 'Nueva tarea creada',
  }).promise();

  console.log('caca');
   return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Insertado correctamente', task: newTask })
  };
};

module.exports = {
  addTask,
};


