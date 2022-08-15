class ProductService {
  constructor(products = []) {
    this.products = products;
  }

  // toHTML() {
  //   // let template = "";
  //   // data.forEach((product) => {
  //   //   template += `<div>${product.title}</div>`;
  //   // });
  //   const toHTMLCard = (product) => `<div>${product.title}</div>`;

  // }

  get(index) {
    return this.products[index];
  }

  getById(id) {
    return this.products.find((product) => {
      return product.id === id;
    });
  }

  filterBy(search = "") {
    if (!search.trim()) return this.products;

    return this.products.filter((product) => {
      return product.title
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase());
    });
  }
}
