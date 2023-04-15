import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma-service/prisma.service';
import { Product, ProductCategory } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  create = async (createProductDto: CreateProductDto): Promise<Product> => {
    return this.prismaService.product
      .create({
        data: {
          name: createProductDto.name,
          description: createProductDto.description,
          price: createProductDto.price,
          stock: createProductDto.stock,
          categories: {
            create: createProductDto.categories,
          },
          attributes: {
            create: createProductDto.attributes,
          },
        },
      })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
  };

  findAll = async (): Promise<Product[]> => {
    return await this.prismaService.product
      .findMany({
        where: { isActive: true },
        include: {
          categories: true,
          attributes: true,
        },
      })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
  };

  findProductBySearch = async (search: string): Promise<Product[]> => {
    return await this.prismaService.product
      .findMany({
        where: { name: search, isActive: true },
        take: 3,
        orderBy: {
          id: 'asc',
        },
      })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
  };

  findByCategoryId = async (categoryId: number): Promise<any> => {
    return await this.prismaService.productCategory
      .findMany({
        select: {
          product: {
            select: {
              name: true,
              price: true,
              categories: {
                where: { categoryId, isActive: true },
                select: {
                  category: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
              attributes: {
                select: {
                  attribute: {
                    select: {
                      id: true,
                      size: true,
                      color: true,
                    },
                  },
                },
              },
            },
          },
        },
      })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
  };

  findOne = async (id: number): Promise<Product> => {
    return await this.prismaService.product
      .findFirst({
        where: { id, isActive: true },
        include: { categories: true, attributes: true },
      })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
  };

  update = async (
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> => {
    return await this.prismaService.product
      .update({
        where: { id },
        data: {
          name: updateProductDto.name,
          description: updateProductDto.description,
          price: updateProductDto.price,
          stock: updateProductDto.stock,
        },
      })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
  };

  remove = async (id: number): Promise<Product> => {
    return await this.prismaService.product
      .delete({ where: { id } })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
  };
}
