class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }
}

class ElementAttr {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHookId) {
    this.hookId = renderHookId;
  }

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (let attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ShoppingCart extends Component {
  items = [];

  get getTotalPrice() {
    const sum = this.items.reduce((prev, curr) => prev + curr.price, 0);
    return sum;
  }

  constructor(renderHookId) {
    super(renderHookId);
  }

  addProduct(product) {
    this.items.push(product);
    this.totalOutput.innerHTML = `<h2>Total: \$${this.getTotalPrice.toFixed(
      2
    )}</h2>`;
  }

  render() {
    const cartElement = this.createRootElement("section", "cart");
    cartElement.innerHTML = `
      <h2>Total: \$${this.items.length}</h2>
      <button>Order Now!</button>
    `;
    this.totalOutput = cartElement.querySelector("h2");
  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId);
    this.product = product;
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = this.createRootElement("li", "product-item");
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
  }
}

class ProductList extends Component {
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

  constructor(renderHookId) {
    super(renderHookId);
  }

  render() {
    this.createRootElement("ul", "product-list", [
      new ElementAttr("id", "prod-list"),
    ]);
    for (let product of this.products) {
      const productItem = new ProductItem(product, "prod-list");
      productItem.render();
    }
  }
}

class Shop {
  render() {
    this.cart = new ShoppingCart("app");
    this.cart.render();
    const productList = new ProductList("app");
    productList.render();
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
