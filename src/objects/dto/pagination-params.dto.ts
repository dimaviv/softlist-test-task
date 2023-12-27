import { IsOptional, IsInt, Min } from 'class-validator';

export class PaginationParamsDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit: number = 10;
}
