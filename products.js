function loadProducts() {
  for (let id in products) {
    showProductCard(id);
  }
}

function getNicePrice(p) {
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return formatter.format(p);
}

function getProductsInCart(productId) {
  let pid = parseInt(productId);
  if (cart.some(val => val.dfid === pid)) {
    var cartItem = getCartItem(productId);
  }
  else {
    return "";
  }

  return ` x ${cartItem.dfcount}`;
}

function refreshCard(productId) {
  console.log($("#p" + productId).children("#addedToCart"));
  $("#p" + productId).children("#addedToCart").text(getProductsInCart(productId));
}

function showProductCard(productId) {
  let product = products[productId];
  let wrapper = $(`
    <div class="card col col-xs-12 col-md-3 col-lg-2 col-xl-5" id="p${product.dfid}">
    <img src="${product.dfimg}${parseInt(productId) + 1}">
    <div>${product.dfname}</div>
    <div>${getNicePrice(product.dfprice)}</div>
    <button class="btn btn-primary">Add to cart</button><span id = "addedToCart">${getProductsInCart(productId)}</span>
    </div>`);
  $("#products").append(wrapper);
  //console.log(product);

  //$("#products").
}

function addToCartProduct(e) {
  if (e.target.classList.contains("btn")) {
    if (e.target.parentElement.id.substring(0, 1) === "p") {
      let pid = e.target.parentElement.id.substring(1);
      addToCart(pid);
      refreshCard(pid);
    }
  }
  
}

$("#products").click(addToCartProduct);

loadProducts();