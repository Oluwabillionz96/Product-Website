const productSection = document.querySelector(".section2");
const serverURL = "https://dummyjson.com";
const searchInput = document.getElementById("search-input");
const searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click", searchProducts);

function getProductData(product) {
  return {
    name: product.title,
    price: product.price,
    tags: product.tags,
    description: product.description,
    image: product.images[0],
  };
}

const displayData = (data, loading) => {
  const allProducts = data.products;

  const products = allProducts.map(getProductData);
  productSection.removeChild(loading);
  products.forEach((product) => {
    const card = createCard(product);
    productSection.innerHTML = productSection.innerHTML + card;
  });
};

function handleLoading() {
  const loading = document.createElement("p");
  loading.textContent = "Loading...";
  loading.classList.add("loading");
  productSection.appendChild(loading);
  return loading;
}

function searchProducts() {
  productSection.innerHTML = "";
  const loading = handleLoading();

  fetch(`${serverURL}/products/search?q=${searchInput.value}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.total < 1) {
        productSection.innerHTML =
          "<p class='loading'>Product was not found</p>";
        return;
      }
      displayData(data, loading);
    });
}

function getProducts() {
  const loading = handleLoading();

  fetch(`${serverURL}/products`)
    .then((res) => res.json())
    .then((data) => {
      displayData(data, loading);
    })
    .catch((err) => console.log("error", err));
}

function createTag(tag) {
  return `<p class="p1">${tag}</p>`;
}

function createCard(product) {
  const tags = product.tags.map((tag) => createTag(tag));
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
