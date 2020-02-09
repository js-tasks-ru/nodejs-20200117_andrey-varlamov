const ProductModel = require('../models/Product.js');
const productMapper = require('../mappers/productMapper.js');
module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  /**
   * /api/products
   * /api/products?subcategory=5e3fd170015dda73df4afcbe
   * /api/products?subcategory=5e3fd170015dda73df4afcbc
   */
  const ID = ctx.request.query.subcategory;

  const queryParams = ID ?
    {subcategory: ID} :
    null;

  if (!queryParams) {
    return next();
  }

  const queryDb = await ProductModel.find(queryParams);

  ctx.body = {
    products: queryDb.map(productMapper),
  };
};

module.exports.productList = async function productList(ctx, next) {
  const queryDb = await ProductModel.find({});

  ctx.body = {
    products: queryDb.map(productMapper),
  };
};

module.exports.productById = async function productById(ctx, next) {
  const ID = ctx.request.params;
  const queryDb = await ProductModel.findById(ID);
  if (!queryDb) {
    ctx.throw(404, 'Product Not Found');
  }
  ctx.body = {
    product: productMapper(queryDb),
  };
};

