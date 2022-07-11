import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Employee extends Document {
  @Prop()
  title: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  salary: number;

  @Prop()
  location: string;

  @Prop()
  description: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
