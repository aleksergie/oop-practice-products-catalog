const productList = {
  products: [
    {
      title: "A Pillow",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_Qh0658Pr8D4bKZnG-Sv5RyZfOnDDfMEIjQ&usqp=CAU",
      price: 19.99,
      description: "Soft and nice pillow",
    },
    {
      title: "A Carpet",
      imageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/81W6An71HSL._SL1500_.jpg",
      price: 99.99,
      description: "A carpet which you might like:)",
    },
  ],
  render() {
    const renderHook = document.getElementById("app");
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (let product of this.products) {
      const prodEl = document.createElement("li");
      prodEl.className = "product-item";
      prodEl.innerHTML = `
        <div>
            <img src="${product.imageUrl}" alt="${product.title}">   
            <div class="product-item__content">
                <h2>${product.title}</h2>
                <h3>\$${product.price}</h3>
                <p>${product.description}</p>
                <button>Add to Cart!</button>
            </div>
        </div>
      `;
      prodList.append(prodEl);
    }
    renderHook.append(prodList);
  },
};

productList.render();
