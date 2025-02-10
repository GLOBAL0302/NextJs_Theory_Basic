import {Body, Controller, Get, Param, Post, Req} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Category, CategoryDocument} from "../schemas/category.schema";
import {Model} from "mongoose";
import {CreateCategoryDto} from "./create-category.dto";

@Controller('categories')
export class CategoriesController {
    constructor(
        @InjectModel(Category.name)
        private categoryModel:Model<CategoryDocument>
    ) {}

    @Get()
    getAll(){
        return this.categoryModel.find()
    }

    @Get(':id')
    getOne(@Param('id') id:string){
        return this.categoryModel.findById({_id:id})
    }


    //DTO - Data Transfer Object
    @Post()
    async create(@Body() categoryDto:CreateCategoryDto){
        const category = new this.categoryModel({
            title:categoryDto.title,
            description: categoryDto.description
        });

       console.log(categoryDto)
        return await category.save();
    }
}
