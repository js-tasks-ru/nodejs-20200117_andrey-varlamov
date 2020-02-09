const categoryModel = require('../models/Category.js');
const categorieMapper = require('../mappers/categoryMapper.js');

module.exports.categoryList = async function categoryList(ctx, next) {
  const cat = await categoryModel.find();
  const res = cat.map(categorieMapper);
  ctx.body = {categories: res};
};
