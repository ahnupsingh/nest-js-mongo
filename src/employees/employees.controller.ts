import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { AtGuard } from 'src/common/guards';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @UseGuards(AtGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED) //201
  create(@Body() body: CreateEmployeeDto) {
    return this.employeesService.create(body);
  }

  // @UseGuards(AtGuard)
  @Public()
  @Get()
  async findAll(@Res() response) {
    const employeesRes = await this.employeesService.findAll();
    return response.status(200).send(employeesRes);
  }

  @Public()
  @Get('search')
  async search(@Query() query: { name: string; location: string }) {
    return await this.employeesService.search(query);
  }

  @UseGuards(AtGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.employeesService.findOne(id);
  }

  @UseGuards(AtGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK) //200
  update(@Param('id') id: string, @Body() body: UpdateEmployeeDto) {
    return this.employeesService.update(id, body);
  }

  @UseGuards(AtGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK) //200
  remove(@Param('id') id: string) {
    return this.employeesService.remove(id);
  }
}
