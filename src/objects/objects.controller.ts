import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from "@nestjs/common";
import { ObjectsService } from './objects.service';
import { CreateObjectDto } from './dto/create-object.dto';
import { UpdateObjectDto } from './dto/update-object.dto';
import { PaginationParamsDto } from "./dto/pagination-params.dto";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";


@ApiTags('Objects')
@Controller('objects')
export class ObjectsController {
  constructor(private readonly objectsService: ObjectsService) {}

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: 'Create a new object (Requires ADMIN role)' })
  @ApiResponse({ status: 201, description: 'Object created' })
  @ApiBody({ type: CreateObjectDto })
  create(@Body() createObjectDto: CreateObjectDto) {
    return this.objectsService.create(createObjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all objects' })
  @ApiResponse({ status: 200, description: 'List of objects' })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  findAll(@Query() query) {
    const page = parseInt(query.page);
    const limit = parseInt(query.limit);
    const params: PaginationParamsDto = {page, limit}
    return this.objectsService.findAll(params);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific object' })
  @ApiResponse({ status: 200, description: 'Object details' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id') id: number) {
    return this.objectsService.findOne(+id);
  }

  @Get('orders/:id')
  @ApiOperation({ summary: 'Get a specific object with its orders' })
  @ApiResponse({ status: 200, description: 'Object with orders details' })
  @ApiParam({ name: 'id', type: Number })
  findOneWithOrders(@Param('id') id: number) {
    return this.objectsService.findOneWithOrders(+id);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Patch(':id')
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: 'Update an object (Requires ADMIN role)' })
  @ApiResponse({ status: 200, description: 'Object updated' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateObjectDto })
  update(@Param('id') id: number, @Body() updateObjectDto: UpdateObjectDto) {
    return this.objectsService.update(+id, updateObjectDto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: 'Delete an object (Requires ADMIN role)' })
  @ApiResponse({ status: 200, description: 'Object deleted' })
  @ApiParam({ name: 'id', type: Number })
  remove(@Param('id') id: number) {
    return this.objectsService.remove(+id);
  }
}