cart = [];

function getProduct(productId) {
    let pid = parseInt(productId);
    let res = products.filter((val) => {return val.dfid === pid});
    return res[0];
}

function getCartItem(productId) {
    let pid = parseInt(productId);
    let res = cart.filter((val) => {return val.dfid === pid});
    return res[0];
}

function getTax() {
    return 0.1;
}

function renderCart() {
    $(".cart").empty()
    if (cart.length == 0) {
        ;
        return;
    };

    let total = 0;
    for (let item of cart) {
        let product = getProduct(item.dfid);
        total += item.dfcount * product.dfprice;        
        $(".cart").append($( `
        <div>${product.dfname} x ${item.dfcount}</div>
        <div>${getNicePrice(product.dfprice * item.dfcount)}</div>

        ` ));
    }

    $(".cart").append($( `<hr>
    <div>Subtotal: ${getNicePrice(total)}</div>
    <div>Tax: ${getNicePrice(total * getTax())} (${getTax() * 100}%)</div>
    <div>Total: ${getNicePrice(total*(1 + getTax()))}</div>
    `));

}

function addToCart(productId, count=1) {
    let pid = parseInt(productId);
    if (cart.some(value => value.dfid === pid)) {
        cart.map((value, _idx) => {if (value.dfid === pid) value.dfcount+= count})
    }
    else {
        cart.push({"dfid": pid, "dfcount": count});
    }

    renderCart();
}