import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, Min } from "class-validator";

export class UpdateOrderDto {

  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({ description: 'The quantity of the objects being ordered', example: 2 })
  quantity?: number;


  @IsOptional()
  @ApiPropertyOptional({ description: 'The start date of the booking', example: '2023-01-15' })
  startDate?: Date;

  @IsOptional()
  @ApiPropertyOptional({ description: 'The end date of the booking', example: '2023-01-20' })
  endDate?: Date;
}
