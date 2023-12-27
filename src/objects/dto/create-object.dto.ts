import { IsString, IsInt, IsNotEmpty, Min, MaxLength } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateObjectDto {
  @ApiProperty({
    description: 'Name of the object',
    example: 'Soccer ball',
    maxLength: 100
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Description of the object',
    example: 'Adidas soccer ball. Size: 5',
    maxLength: 500
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  description: string;

  @ApiProperty({
    description: 'Number of available units for the object',
    example: 50,
    minimum: 0
  })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  availableUnits: number;

  @ApiProperty({
    description: 'Price per unit of the object',
    example: 100,
    minimum: 0
  })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  pricePerUnit: number;
}
