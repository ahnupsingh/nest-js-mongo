import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({ description: 'Job title' })
  @IsString()
  readonly title: string;

  @ApiProperty({ description: 'First Name' })
  @IsString()
  readonly firstName: string;

  @ApiProperty({ description: 'Last Name' })
  @IsString()
  readonly lastName: string;

  @ApiProperty({ description: 'salary' })
  @IsNumber()
  readonly salary: number;

  @ApiProperty({ description: 'Location' })
  @IsString()
  readonly location: string;

  @ApiProperty({ description: 'Job Descriptionn' })
  @IsString()
  readonly description: string;
}
