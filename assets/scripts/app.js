class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }
}

class ShoppingCart {
  items = [];

  addProduct(product) {
    this.items.push(product);
    this.totalOutput.innerHTML = `<h2>Total: \$${this.items.length}</h2>`;
  }

  render() {
    const cartElement = document.createElement("section");
    cartElement.innerHTML = `
      <h2>Total: \$${this.items.length}</h2>
      <button>Order Now!</button>
    `;
    this.totalOutput = cartElement.querySelector("h2");
    cartElement.className = "cart";
    return cartElement;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = document.createElement("li");
    prodEl.className = "product-item";
    prodEl.innerHTML = `
      <div>
          <img src="${this.product.imageUrl}" alt="${this.product.title}">   
          <div class="product-item__content">
              <h2>${this.product.title}</h2>
              <h3>\$${this.product.price}</h3>
              <p>${this.product.description}</p>
              <button>Add to Cart!</button>
          </div>
      </div>
    `;
    const addToCartButton = prodEl.querySelector("button");
    addToCartButton.addEventListener("click", this.addToCart.bind(this));
    return prodEl;
  }
}

class ProductList {
  products = [
    new Product(
      "A Pillow",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_Qh0658Pr8D4bKZnG-Sv5RyZfOnDDfMEIjQ&usqp=CAU",
      19.99,
      "Soft and nice pillow"
    ),
    new Product(
      "A Carpet",
      "https://images-na.ssl-images-amazon.com/images/I/81W6An71HSL._SL1500_.jpg",
      99.99,
      "A carpet which you might like:)"
    ),
  ];

  constructor() {}

  render() {
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (let product of this.products) {
      const productItem = new ProductItem(product);
      const prodElement = productItem.render();
      prodList.append(prodElement);
    }
    return prodList;
  }
}

class Shop {
  render() {
    const renderHook = document.getElementById("app");
    this.cart = new ShoppingCart();
    const cartElement = this.cart.render();
    const productList = new ProductList();
    const prodList = productList.render();
    renderHook.append(cartElement);
    renderHook.append(prodList);
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
