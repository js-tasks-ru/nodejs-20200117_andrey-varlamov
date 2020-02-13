module.exports = function categoryMapper(categorie) {
  const result = {
    id: categorie['_id'],
    title: categorie.title,
  };
  if (categorie.subcategories) {
    const subcategorie = categorie.subcategories;
    result.subcategories = [categoryMapper(...subcategorie)];
  }
  // if (categorie.subcategories) {
  //   const subcategorie = categorie.subcategories;
  //   result.subcategories = [];
  //   if (Array.isArray(subcategorie)) {
  //     result.subcategories.push(categoryMapper(...subcategorie));
  //     return result;
  //   }
  //   result.subcategories.push(subcategorie);
  // }
  return result;
};
