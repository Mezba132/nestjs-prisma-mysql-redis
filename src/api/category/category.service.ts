import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma-service/prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  create = async (createCategoryDto: CreateCategoryDto): Promise<Category> => {
    return this.prismaService.category
      .create({ data: createCategoryDto })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
  };

  findAll = async (): Promise<Category[]> => {
    return await this.prismaService.category
      .findMany({
        where: { isActive: true },
        include: {
          parent: true,
        },
      })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
  };

  findOne = async (id: number): Promise<Category> => {
    return await this.prismaService.category
      .findFirst({
        where: { id, isActive: true },
        include: {
          parent: true,
        },
      })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
  };

  update = async (
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> => {
    return await this.prismaService.category
      .update({
        where: { id },
        data: updateCategoryDto,
      })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
  };

  remove = async (id: number): Promise<Category> => {
    return await this.prismaService.category
      .delete({ where: { id } })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
  };

  async deactivateCategoryRecursive(id: number): Promise<void> {
    const childCategories = await this.prismaService.category
      .findMany({
        where: { parentId: id },
      })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
    if (childCategories.length > 0) {
      for (const childCategory of childCategories) {
        await this.deactivateCategoryRecursive(childCategory.id);
      }
    }
    await this.prismaService.product
      .updateMany({
        where: {
          categories: {
            some: {
              id,
            },
          },
        },
        data: {
          isActive: false,
        },
      })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
    await this.prismaService.productCategory
      .updateMany({
        where: { categoryId: id },
        data: {
          isActive: false,
        },
      })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
    await this.prismaService.category
      .update({
        where: { id },
        data: { isActive: false },
      })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
  }
}
