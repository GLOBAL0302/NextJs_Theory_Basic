import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Category, CategorySchema} from "./schemas/category.schema";
import {Product, ProductSchema} from "./schemas/product.schema";
import { CategoriesController } from './categories/categories.controller';

@Module({
  imports: [
      MongooseModule.forRoot("mongodb://localhost/shop2"),
      MongooseModule.forFeature([
        {name:Category.name, schema: CategorySchema},
        {name:Product.name, schema: ProductSchema},
      ])
  ],
  controllers: [AppController, ProductsController, CategoriesController],
  providers: [AppService],
})
export class AppModule {}
