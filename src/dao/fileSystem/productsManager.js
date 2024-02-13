const { readJsonFile, writeJsonFile } = require("../../utils/dataHandler");

class ProductsManager {
  constructor() {
    this.filePath = "products.json";
  }

  async getAllProducts() {
    return await readJsonFile(this.filePath);
  }

  async getProductById(id) {
    const productos = await this.getAllProducts();
    return productos.find((product) => product.id === id);
  }

  async addProduct(productData) {
    const productos = await this.getAllProducts();
    productos.push(productData);
    await writeJsonFile(this.filePath, productos);
    return productData;
  }

  async updateProduct(id, productData) {
    const productos = await this.getAllProducts();
    const index = productos.findIndex((product) => product.id === id);
    if (index !== -1) {
      productos[index] = { ...productos[index], ...productData };
      await writeJsonFile(this.filePath, productos);
      return productos[index];
    }
    return null;
  }

  async deleteProduct(id) {
    let productos = await this.getAllProducts();
    productos = productos.filter((product) => product.id !== id);
    await writeJsonFile(this.filePath, productos);
  }
}

module.exports = new ProductsManager();
