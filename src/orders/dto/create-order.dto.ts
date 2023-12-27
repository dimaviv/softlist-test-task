import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'The ID of the object being booked',
    example: 123,
    type: Number
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  bookingObjectId: number;

  @ApiProperty({
    description: 'The quantity of the objects being ordered',
    example: 2,
    type: Number
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({
    description: 'The start date of the booking',
    example: '2023-01-15',
    type: Date
  })
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({
    description: 'The end date of the booking',
    example: '2023-01-20',
    type: Date
  })
  @IsNotEmpty()
  endDate: Date;
}
