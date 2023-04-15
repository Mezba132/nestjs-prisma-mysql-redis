import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { EndpointName } from 'src/utils/endpoint.enum';
import { Category } from '@prisma/client';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@Controller()
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post(EndpointName.CATEGORY_CREATE)
  @ApiCreatedResponse({ description: 'Created Succesfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.create(createCategoryDto);
  }

  @Get(EndpointName.CATEGORY_GET_ALL)
  @ApiOkResponse({ description: 'Data returned successfully' })
  @ApiNotFoundResponse({ description: 'Data not found' })
  async findAll(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  @Get(EndpointName.CATEGORY_GET_BY_ID)
  @ApiOkResponse({ description: 'Data returned successfully' })
  @ApiNotFoundResponse({ description: 'Data not found' })
  async findOne(@Param('id') id: number): Promise<Category> {
    return await this.categoryService.findOne(+id);
  }

  @Patch(EndpointName.CATEGORY_UPDATE)
  @ApiOkResponse({ description: 'Data was updated successfully' })
  @ApiNotFoundResponse({ description: 'Data not found' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  async update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(EndpointName.CATEGORY_DELETE)
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  async remove(@Param('id') id: string): Promise<Category> {
    return await this.categoryService.remove(+id);
  }

  @Patch(EndpointName.CATEGORY_DEACTIVATE)
  @ApiOkResponse({ description: 'Data was updated successfully' })
  @ApiNotFoundResponse({ description: 'Data not found' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  async deactivate(@Param('id') id: number): Promise<void> {
    return await this.categoryService.deactivateCategoryRecursive(+id);
  }
}
