const { readJsonFile, writeJsonFile } = require("../../utils/dataHandler");

class CartsManager {
  constructor() {
    this.filePath = "carts.json";
  }

  async getAllCarts() {
    return await readJsonFile(this.filePath);
  }

  async getCartById(id) {
    const carritos = await this.getAllCarts();
    return carritos.find((cart) => cart.id === id);
  }

  async createCart() {
    const carritos = await this.getAllCarts();
    const newCart = { id: `c${carritos.length + 1}`, products: [] };
    carritos.push(newCart);
    await writeJsonFile(this.filePath, carritos);
    return newCart;
  }

  async addProductToCart(cartId, productId) {
    const carritos = await this.getAllCarts();
    const carritoIndex = carritos.findIndex((c) => c.id === cartId);
    const productos = await readJsonFile("products.json");
    const producto = productos.find((p) => p.id === productId);

    if (carritoIndex !== -1 && producto) {
      const carrito = carritos[carritoIndex];
      const productIndex = carrito.products.findIndex(
        (p) => p.productId === productId
      );

      if (productIndex !== -1) {
        carrito.products[productIndex].quantity += 1;
      } else {
        carrito.products.push({ productId, quantity: 1 });
      }

      await writeJsonFile(this.filePath, carritos);
      return carrito;
    } else {
      throw new Error("Carrito o producto no encontrado");
    }
  }

  async updateProductInCart(cartId, productId, quantity) {
    const carritos = await this.getAllCarts();
    const carritoIndex = carritos.findIndex((c) => c.id === cartId);

    if (carritoIndex !== -1) {
      const productIndex = carritos[carritoIndex].products.findIndex(
        (p) => p.productId === productId
      );

      if (productIndex !== -1 && quantity > 0) {
        carritos[carritoIndex].products[productIndex].quantity = quantity;
        await writeJsonFile(this.filePath, carritos);
        return carritos[carritoIndex];
      } else {
        throw new Error(
          "Producto no encontrado en el carrito o cantidad no válida"
        );
      }
    } else {
      throw new Error("Carrito no encontrado");
    }
  }

  async removeProductFromCart(cartId, productId) {
    const carritos = await this.getAllCarts();
    const carritoIndex = carritos.findIndex((c) => c.id === cartId);

    if (carritoIndex !== -1) {
      const productos = carritos[carritoIndex].products;
      carritos[carritoIndex].products = productos.filter(
        (p) => p.productId !== productId
      );
      await writeJsonFile(this.filePath, carritos);
      return {
        message: `Producto ${productId} eliminado del carrito ${cartId}`,
      };
    } else {
      throw new Error("Carrito no encontrado");
    }
  }
}

module.exports = new CartsManager();
