let productService; // = new ProductService(data);
const cartService = new CartService();
const htmlServise = new HTMLService();

const productsContainer = document.getElementById("products");
const filterInput = document.getElementById("filter");
const cartContainer = document.getElementById("cart");

filterInput.addEventListener("input", (event) => {
  const value = event.target.value;
  console.log(value);
  const filteredProducts = productService.filterBy(value);

  renderProducts(filteredProducts);
});

productsContainer.addEventListener("click", (event) => {
  const id = event.target.dataset.id
    ? event.target.dataset.id
    : event.target.closest("li")?.dataset.id;
  if (id) {
    cartService.add(productService.getById(+id));

    renderCart();
  }
});

cartContainer.addEventListener("click", (event) => {
  const type = event.target?.dataset.type;
  const id = event.target?.dataset.id;

  switch (type) {
    case "clear":
      cartService.Clear();
      renderCart();
      break;
    case "remove":
      cartService.remove(id);
      renderCart();
    default:
      break;
  }
});

function renderProducts(products) {
  productsContainer.innerHTML = htmlServise.paintProducts(products);
}

function renderCart() {
  cartContainer.innerHTML = htmlServise.painCart(cartService.getInfo());
}

async function startApplication() {
  renderCart();

  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();

    productService = new ProductService(data);

    renderProducts(productService.products);
  } catch (e) {
    productsContainer.innerHTML = htmlServise.paintError(e);
  }
}
renderCart();
startApplication();
