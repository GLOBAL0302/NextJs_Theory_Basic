import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from '../schemas/category.schema';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,

    @InjectModel(Category.name)
    private categoryModel: Model<CategoryDocument>,
  ) {}

  async seed() {
    console.log('Start making seeder');

    await this.productModel.deleteMany({});
    await this.categoryModel.deleteMany({});
    console.log('collection MD was cleared');

    const [cpuCategory, SSDCategory] = await this.categoryModel.create(
      {
        title: 'CPU',
        description: 'Test Desc for Cpu',
      },
      {
        title: 'SSD2',
        description: 'Test Desc for SSD',
      },
    );
    await this.productModel.create(
      {
        category: cpuCategory._id,
        title: 'Intel',
        price: 320,
        image: 'fixtures/cpu.jpg',
      },
      {
        title: 'Apple',
        category: cpuCategory._id,
        price: 700,
      },
      {
        title: 'Lenova',
        price: 500,
        category: SSDCategory._id,
        image: 'fixtures/cpu.jpg',
      },
    );
  }
}
