import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class Category {
  @ApiProperty()
  @IsNotEmpty()
  categoryId: number;
}

export class Attribute {
  @ApiProperty()
  @IsNotEmpty()
  attributeId: number;
}

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  stock: number;

  @ApiProperty()
  @IsNotEmpty()
  categories: Array<Category>;

  @ApiProperty()
  @IsNotEmpty()
  attributes: Array<Attribute>;
}
