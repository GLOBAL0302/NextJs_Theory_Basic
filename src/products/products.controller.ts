import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UploadedFile, UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from '../schemas/category.schema';
import { CreateProductDto } from './create-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { TokenAuthGuard } from '../token-auth/token-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,

    @InjectModel(Category.name)
    private categoryModel: Model<CategoryDocument>,
  ) {}

  @UseGuards(TokenAuthGuard)
  @Get()
  getAll() {
    return this.productModel.find();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const product = await this.productModel.findOne({ _id: id });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', { dest: './public/uploads/products' }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() productDto: CreateProductDto,
  ) {
    const category = await this.categoryModel.findById(productDto.category);
    if (!category) throw new NotFoundException('Category not found');

    const newProduct = new this.productModel({
      category: productDto.category,
      title: productDto.title,
      price: productDto.price,
      description: productDto.description,
      image:
        file && file.filename ? '/uploads/products/' + file.filename : null,
    });

    const product = await newProduct.save();
    return product;
  }
}
