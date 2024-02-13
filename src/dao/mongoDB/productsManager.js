const Product = require("./models/product");

class ProductsManager {
  async getAllProducts() {
    return await Product.find();
  }

  async getProductById(id) {
    return await Product.findById(id);
  }

  async addProduct(productData) {
    const product = new Product(productData);
    return await product.save();
  }

  async updateProduct(id, productData) {
    return await Product.findByIdAndUpdate(id, productData, { new: true });
  }

  async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }
}

module.exports = new ProductsManager();
