import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

import { v4 as uuidv4 } from 'uuid';
import AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

@Injectable()
export class TaskService {
  async create(createTaskDto: CreateTaskDto) {
    const newTask = {
    id: uuidv4(), 
    title: 'Tarea de prueba',
    description: 'Esta es una tarea de prueba simple',
    createdAt: new Date().toISOString()
    };   

  await dynamodb.put({
    TableName: 'TaskTable',
    Item: newTask
    }).promise();

  return { message: 'Tarea creada correctamente', task: newTask };
  }

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
