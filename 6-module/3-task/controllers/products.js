const ProductsModel = require('../models/Product.js');
const productMapper = require('../mappers/productMapper.js');

module.exports.productsByQuery = async function productsByQuery(ctx, next) {
  const dbParam = ctx.request.query.query;
  const query = await ProductsModel.find({$text: {$search: dbParam}});
  const result = query.map(productMapper);
  ctx.body = {products: result};
};
