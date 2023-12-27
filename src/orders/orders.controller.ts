import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";


@ApiTags('Orders')
@ApiBearerAuth('Authorization')
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order created' })
  @ApiBody({ type: CreateOrderDto })
  create(@Req() req, @Body() createOrderDto: CreateOrderDto) {
    const userId = req.user.id;
    return this.ordersService.create(userId, createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders for a user' })
  @ApiResponse({ status: 200, description: 'List of orders' })
  findAll(@Req() req) {
    const userId = req.user.id;
    return this.ordersService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific order' })
  @ApiResponse({ status: 200, description: 'Order details' })
  @ApiParam({ name: 'id', type: 'number', description: 'Order ID' })
  findOne(@Req() req, @Param('id') orderId: number) {
    const userId = req.user.id;
    return this.ordersService.findOne(userId, orderId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an order' })
  @ApiResponse({ status: 200, description: 'Order updated' })
  @ApiParam({ name: 'id', type: 'number', description: 'Order ID' })
  @ApiBody({ type: UpdateOrderDto })
  update(@Req() req, @Param('id') orderId: number, @Body() updateOrderDto: UpdateOrderDto) {
    const userId = req.user.id;
    return this.ordersService.update(userId, orderId, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order' })
  @ApiResponse({ status: 200, description: 'Order deleted' })
  @ApiParam({ name: 'id', type: 'number', description: 'Order ID' })
  remove(@Req() req, @Param('id') orderId: number) {
    const userId = req.user.id;
    return this.ordersService.remove(userId, orderId);
  }
}