import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { EndpointName } from 'src/utils/endpoint.enum';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@Controller()
@ApiTags('Product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post(EndpointName.PRODUCT_CREATE)
  @ApiCreatedResponse({ description: 'Created Succesfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get(EndpointName.PRODUCT_GET_ALL)
  @ApiOkResponse({ description: 'Data returned successfully' })
  @ApiNotFoundResponse({ description: 'Data not found' })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(EndpointName.PRODUCT_GET_BY_CATEGORY)
  @ApiOkResponse({ description: 'Data returned successfully' })
  @ApiNotFoundResponse({ description: 'Data not found' })
  findByCategoryId(@Param('categoryId') categoryId: number) {
    return this.productsService.findByCategoryId(categoryId);
  }

  @Get(EndpointName.PRODUCT_GET_BY_SEARCH)
  @ApiOkResponse({ description: 'Data returned successfully' })
  @ApiNotFoundResponse({ description: 'Data not found' })
  findProductBySearch(@Query('search') search: string) {
    return this.productsService.findProductBySearch(search);
  }

  @Get(EndpointName.PRODUCT_GET_BY_ID)
  @ApiOkResponse({ description: 'Data returned successfully' })
  @ApiNotFoundResponse({ description: 'Data not found' })
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(+id);
  }

  @Patch(EndpointName.PRODUCT_UPDATE)
  @ApiOkResponse({ description: 'Data was updated successfully' })
  @ApiNotFoundResponse({ description: 'Data not found' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(EndpointName.PRODUCT_DELETE)
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  remove(@Param('id') id: number) {
    return this.productsService.remove(+id);
  }
}
