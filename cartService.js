// ==================
/**
 * 1. add product
 * 2. remove product
 * 3. clear cart
 * 4. get all information
 */

class CartService {
  constructor() {
    this.cart = {};
  }

  add(product) {
    const key = product.id;

    if (this.cart[key]) {
      this.cart[key].amount++;
      return;
    }
    this.cart[key] = {
      title: product.title,
      price: product.price,
      amount: 1,
    };
  }
  remove(productId) {
    const amount = this.cart[productId].amount;
    if (amount === 1) {
      delete this.cart[productId];
    } else {
      this.cart[productId].amount--;
    }
  }

  Clear() {
    this.cart = {};
  }

  getInfo() {
    // items in cart as array
    // total price

    const items = Object.keys(this.cart).map((id) => {
      return {
        id,
        ...this.cart[id],
      };
    });

    const totalPrise = items.reduce((sum, item) => {
      return (sum += item.amount * item.price);
    }, 0);

    return {
      items,
      totalPrise,
    };
  }
}
