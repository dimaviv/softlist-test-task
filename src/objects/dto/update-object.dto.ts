import { PartialType } from '@nestjs/mapped-types';
import { CreateObjectDto } from './create-object.dto';
import { ApiPropertyOptional } from "@nestjs/swagger";


export class UpdateObjectDto extends PartialType(CreateObjectDto) {
  @ApiPropertyOptional({ description: 'Name of the object', example: 'Soccer ball' })
  name?: string;

  @ApiPropertyOptional({ description: 'Description of the object', example: 'Adidas soccer ball. Size: 5' })
  description?: string;

  @ApiPropertyOptional({ description: 'Number of available units for the object', example: 50 })
  availableUnits?: number;

  @ApiPropertyOptional({ description: 'Price per unit of the object', example: 100 })
  pricePerUnit?: number;
}
