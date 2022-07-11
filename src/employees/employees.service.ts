import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name)
    private employeeModel: Model<Employee>,
  ) {}

  findAll() {
    return this.employeeModel.find().exec();
  }

  search({ name = '', location = '' }: { name: string; location: string }) {
    const query = [];
    if (name !== '') query.push({ name: { $regex: new RegExp(name, 'i') } });
    if (location !== '')
      query.push({ location: { $regex: new RegExp(location, 'i') } });

    return this.employeeModel
      .find({
        $or: query,
      })
      .exec();
  }

  async findOne(id: string) {
    const employee = await this.employeeModel.findOne({ _id: id }).exec();
    if (!employee) {
      throw new NotFoundException(`Employee #${id} not found`);
    }
    return employee;
  }

  create(createEmployeeDto: CreateEmployeeDto) {
    const employees = new this.employeeModel({
      ...createEmployeeDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return employees.save();
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const existingEmployee = await this.employeeModel
      .findOneAndUpdate(
        { _id: id },
        { $set: { ...updateEmployeeDto, updatedAt: new Date() } },
        { new: true },
      )
      .exec();

    if (!existingEmployee) {
      throw new NotFoundException(`Employee #${id} not found`);
    }
    return existingEmployee;
  }

  async remove(id: string) {
    const employee = await this.findOne(id);
    return employee.remove();
  }
}
