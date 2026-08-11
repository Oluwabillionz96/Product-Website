const productSection = document.querySelector(".section2");

function getProductData(product) {
  return {
    name: product.title,
    price: product.price,
    tags: product.tags,
    description: product.description,
    image: product.images[0],
  };
}

function getProducts() {
  const loading = document.createElement("p");
  loading.textContent = "Loading...";
  loading.classList.add("loading");
  productSection.appendChild(loading);

  fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => {
      const allProducts = data.products;

      const products = allProducts.map(getProductData);
      productSection.removeChild(loading);
      products.forEach((product) => {
        const card = createCard(product);
        productSection.innerHTML = productSection.innerHTML + card;
        // console.log(card);
      });
    })
    .catch((err) => console.log("error", err));
}

function createTag(tag) {
  return `<p class="p1">${tag}</p>`;
}

function createCard(product) {
  const tags = product.tags.map((tag) => createTag(tag));
  console.log(tags);
  return `<div class="card">
    <img src=${product.image} class="img" />
    <div class="text2">
    ${tags.join(" ")}
    </div>
    <div class="title">
      <h2>
      ${product.name}
      </h2>
      <h2>$${product.price}</h2>
    </div>
    <p class="p2">
    ${product.description}
    </p>
    <button class="btn">Add To Cart</button>
    </div>
    `;
}

getProducts();
