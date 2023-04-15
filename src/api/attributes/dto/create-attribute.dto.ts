import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateAttributeDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  size: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  color: string;
}
