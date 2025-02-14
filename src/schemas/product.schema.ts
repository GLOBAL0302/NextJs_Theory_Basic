import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Category } from './category.schema';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({
    required: true,
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category',
  })
  category: Category;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: null })
  description: string;

  @Prop({ default: null })
  image: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
