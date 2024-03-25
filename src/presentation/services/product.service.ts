import { CategoryModel, ProductModel } from '../../data/mongo';
import { CreateProductDto, CustomError, PaginationDto, UserEntity } from '../../domain';





export class ProductService {

  // DI
  constructor() { }


  async createProduct( createCategoryDto: CreateProductDto ) {

    const productExists = await ProductModel.findOne( { name: CreateProductDto.name } );
    if ( productExists ) throw CustomError.badRequest( 'Category already exists' );

    try {

      const product = new ProductModel( createCategoryDto );

      await product.save();


     return product

    } catch ( error ) {
      throw CustomError.internalServerError( `${ error }` );
    }

  }



  async getCategories( paginationDto: PaginationDto ) {

    const { page, limit } = paginationDto;


    try {

      const [ total, products ] = await Promise.all( [
        ProductModel.countDocuments(),
        ProductModel.find()
          .skip( ( page - 1 ) * limit )
          .limit( limit )
          .populate( 'category' )
          .populate( 'user' )
      ] );


      return {
        page: page,
        limit: limit,
        total: total,
        next: ` /api/products?page=${ ( page + 1 ) }&limit=${ limit }`,
        prev: page > 1  ? `  /api/products?page=${ ( page - 1 ) }&limit=${ limit }`: null,

        products: products,
      };


    } catch ( error ) {
      throw CustomError.internalServerError( 'Internal Server Error' );
    }




  }




}

