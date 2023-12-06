const {
   getAllProducts,
   getProductsByPrice,
   getProductById,
   addNewProduct,
   addNewProductReview
} = require("./products.model");

module.exports = {
   Query: {
      products: () => {
         return getAllProducts();
      },
      productsByPrice: (_, { min, max }) => {
         return getProductsByPrice(min, max);
      },
      product: (_, { id }) => {
         return getProductById(id);
      }
   },
   Mutation: {
      addNewProduct: (_, { id, description, price }) => {
         return addNewProduct(id, description, price);
      },
      addNewProductReview: (_, { id, rating, comment }) => {
         return addNewProductReview(id, rating, comment);
      }
   }
};
