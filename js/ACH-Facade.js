const cart = () => {
    let listCartHTML = document.querySelector('.listCart');
    let iconCart = document.querySelector('.icon-cart');
    let iconCartSpan = iconCart.querySelector('span');
    let cart = [];

    const setProductInCart = (idProduct, value) => {
        let positionThisProductInCart = cart.findIndex((value) => value.product_id == idProduct);
        if(value <= 0){
            cart.splice(positionThisProductInCart, 1);
        }else if(positionThisProductInCart < 0){
            cart.push({
                product_id: idProduct,
                quantity: 1
            });
        }else{
            cart[positionThisProductInCart].quantity = value;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        addCartToHTML();
    }

    const addCartToHTML = () => {
        listCartHTML.innerHTML = '';
        let subTotal= 0;
        let totalQuantity = 0;
        if(cart.length > 0){
            cart.forEach(item => {
                totalQuantity = totalQuantity +  item.quantity;
                let newItem = document.createElement('div');
                newItem.classList.add('item');
                newItem.dataset.id = item.product_id;

                let positionProduct = products.findIndex((value) => value.id == item.product_id);
                let info = products[positionProduct];
                subTotal = subTotal + parseFloat(info.price * item.quantity);
                listCartHTML.appendChild(newItem);
                newItem.innerHTML = `
                    <div class="row">
                        <div class="image col-md-auto">
                            <img src="${info.image}">
                        </div>
                        <div class="name col">
                            ${info.name}
                        </div>
                        <div class="totalPrice col-md-auto">
                            $ ${(info.price * item.quantity).toFixed(2)}
                        </div>
                        <div class="quantity col-md-auto">
                            <span class="minus" data-id="${info.id}"><</span>
                            <span>${item.quantity}</span>
                            <span class="plus" data-id="${info.id}">></span>
                    </div>
                    </div>
                    
                `;
            })
        }
        document.querySelector('.subtotal h5:last-child').innerHTML = `$ ${subTotal.toFixed(2)}`;
        iconCartSpan.innerText = totalQuantity;
    }

    document.addEventListener('click', (event) => {
        let buttonClick = event.target;
        let idProduct = buttonClick.dataset.id;
        let quantity = null;
        let positionProductInCart = cart.findIndex((value) => value.product_id == idProduct);
        switch (true) {
            case (buttonClick.classList.contains('addCart')):
                quantity = (positionProductInCart < 0) ? 1 : cart[positionProductInCart].quantity+1;
                setProductInCart(idProduct, quantity);
                break;
            case (buttonClick.classList.contains('minus')):
                quantity = cart[positionProductInCart].quantity-1;
                setProductInCart(idProduct, quantity);
                break;
            case (buttonClick.classList.contains('plus')):
                quantity = cart[positionProductInCart].quantity+1;
                setProductInCart(idProduct, quantity);
                break;
            default:
                break;
        }
    })

    const initApp = () => {

        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    }
    initApp();
}