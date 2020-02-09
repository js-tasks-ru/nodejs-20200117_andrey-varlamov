module.exports = function categoryMapper(categorie) {
  const result = {
    id: categorie['_id'],
    title: categorie.title,
  };
  if (categorie.subcategories) {
    const subcategorie = categorie.subcategories;
    result.subcategories = [categoryMapper(...subcategorie)];
  }
  return result;
};
