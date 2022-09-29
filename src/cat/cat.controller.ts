import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CatService } from './cat.service';

@Controller('cats')
export class CatController {
  constructor(private catService: CatService) {}

  // @Get()
  // findAll(@Query() query: any): any {
  //   console.log('query');
  //   console.log(query);
  //   console.log(query.id);
  //   return this.catService.findById(query.id);
  // }

  @Post()
  create(@Body() catDto: any) {
    return this.catService.create(catDto);
  }

  @Post('update')
  update(@Body() catDto: any) {
    return this.catService.update(catDto);
  }

  @Get(':id')
  async findUsersById(@Param('id') id) {
    console.log('query');
    console.log(id);
    return await this.catService.findById(id);
  }

  @Get()
  public async getAll() {
    return await this.catService.getAll();
  }

  @Post('query')
  public async getQuery(@Body() query: any) {
    return await this.catService.getQuery(query);
  }
}
