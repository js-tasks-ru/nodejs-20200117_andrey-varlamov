const mongoose = require('mongoose');

module.exports = function validationObjectId(ctx, next) {
  const params = ctx.request.path.replace('/api/products/', '');
  const valid = mongoose.isValidObjectId(params);
  if (valid) {
    ctx.request.params = params;
    return next();
  }
  ctx.throw(400, 'Invalid ObjectId');
};
