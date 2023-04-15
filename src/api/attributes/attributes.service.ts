import { Injectable } from '@nestjs/common';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { PrismaService } from 'src/prisma-service/prisma.service';
import { Attribute } from '@prisma/client';

@Injectable()
export class AttributesService {
  constructor(private prismaService: PrismaService) {}

  create = async (
    createAttributeDto: CreateAttributeDto,
  ): Promise<Attribute> => {
    return this.prismaService.attribute.create({ data: createAttributeDto });
  };

  findAll = async (): Promise<Attribute[]> => {
    return await this.prismaService.attribute.findMany({
      where: { isActive: true },
    });
  };

  findOne = async (id: number): Promise<Attribute> => {
    return await this.prismaService.attribute.findFirst({
      where: { id, isActive: true },
    });
  };

  update = async (
    id: number,
    updateAttributeDto: UpdateAttributeDto,
  ): Promise<Attribute> => {
    return await this.prismaService.attribute.update({
      where: { id },
      data: updateAttributeDto,
    });
  };

  remove = async (id: number): Promise<Attribute> => {
    return await this.prismaService.attribute.delete({ where: { id } });
  };
}
