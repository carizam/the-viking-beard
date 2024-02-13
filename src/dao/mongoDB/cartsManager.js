const Cart = require("./models/cart");

class CartsManager {
  async getCartById(id) {
    return await Cart.findById(id).populate("products.product");
  }

  async createCart() {
    const cart = new Cart();
    return await cart.save();
  }

  async addProductToCart(cartId, productId, quantity) {
    const cart = await this.getCartById(cartId);
    if (!cart) throw new Error("Carrito no encontrado");

    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );
    if (productIndex !== -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    return await cart.save();
  }

  async updateProductQuantity(cartId, productId, quantity) {
    const cart = await this.getCartById(cartId);
    if (!cart) throw new Error("carrito no encontrado");

    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );
    if (productIndex === -1)
      throw new Error("Producto no encontrado en el carrito");

    cart.products[productIndex].quantity = quantity;
    return await cart.save();
  }

  async removeProductFromCart(cartId, productId) {
    const cart = await this.getCartById(cartId);
    if (!cart) throw new Error("Carrito no encontrado");

    cart.products = cart.products.filter(
      (item) => item.product.toString() !== productId
    );
    return await cart.save();
  }
}

module.exports = new CartsManager();
