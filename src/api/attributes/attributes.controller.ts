import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { EndpointName } from 'src/utils/endpoint.enum';
import { Attribute } from '@prisma/client';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@Controller()
@ApiTags('Attribute')
export class AttributesController {
  constructor(private readonly attributesService: AttributesService) {}

  @Post(EndpointName.ATTRIBUTE_CREATE)
  @ApiCreatedResponse({ description: 'Created Succesfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  create(@Body() createAttributeDto: CreateAttributeDto): Promise<Attribute> {
    return this.attributesService.create(createAttributeDto);
  }

  @Get(EndpointName.ATTRIBUTE_GET_ALL)
  @ApiOkResponse({ description: 'Data returned successfully' })
  @ApiNotFoundResponse({ description: 'Data not found' })
  findAll(): Promise<Attribute[]> {
    return this.attributesService.findAll();
  }

  @Get(EndpointName.ATTRIBUTE_GET_BY_ID)
  @ApiOkResponse({ description: 'Data returned successfully' })
  @ApiNotFoundResponse({ description: 'Data not found' })
  findOne(@Param('id') id: string): Promise<Attribute> {
    return this.attributesService.findOne(+id);
  }

  @Patch(EndpointName.ATTRIBUTE_UPDATE)
  @ApiOkResponse({ description: 'Data was updated successfully' })
  @ApiNotFoundResponse({ description: 'Data not found' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  update(
    @Param('id') id: number,
    @Body() updateAttributeDto: UpdateAttributeDto,
  ): Promise<Attribute> {
    return this.attributesService.update(+id, updateAttributeDto);
  }

  @Delete(EndpointName.ATTRIBUTE_DELETE)
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  remove(@Param('id') id: number): Promise<Attribute> {
    return this.attributesService.remove(+id);
  }
}
