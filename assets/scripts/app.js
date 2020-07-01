class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
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
    const renderHook = document.getElementById("app");
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (let product of this.products) {
      const productItem = new ProductItem(product);
      const prodElement = productItem.render();
      prodList.append(prodElement);
    }
    renderHook.append(prodList);
  }
}

const productList = new ProductList();
productList.render();
