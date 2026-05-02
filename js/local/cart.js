function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
    const cart = getCart();
    const cartItemsEl = document.getElementById("cartItems");
    const subtotalEl = document.getElementById("subtotal");
    const totalEl = document.getElementById("total");
    const summaryBox = document.getElementById("summaryBox");

    if (!cartItemsEl || !subtotalEl || !totalEl || !summaryBox) return;

    if (cart.length === 0) {
        cartItemsEl.innerHTML = `
        <div class="empty-cart" style="margin-bottom:120px">
            <p>Giỏ hàng của bạn đang trống</p>
            <a href="../html/shop.html" class="btn-shop">Mua ngay</a>
        </div>
        
        `;
        summaryBox.style.display = "none";
        subtotalEl.innerText = "0 đ";
        totalEl.innerText = "0 đ";
        return;
    }
    else{
    summaryBox.style.display = "block";

    let subtotal = 0;
    cartItemsEl.innerHTML = "";

    cart.forEach((item, index) => {
        subtotal += item.price * item.quantity;

        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}">

            <div class="cart-info">
                <h3>${item.name}</h3>
                <p>Quần áo</p>
                <p>
                    Size: ${item.size || "S"} &nbsp; 
                    Màu: <b>${item.color || "—"}</b>
                </p>

                <div class="qty">
                    <button data-index="${index}" data-change="-1">−</button>
                    <span>${item.quantity}</span>
                    <button data-index="${index}" data-change="1">+</button>
                </div>
            </div>

            <div class="price">
                ${(item.price * item.quantity).toLocaleString("vi-VN")} đ
            </div>

            <div class="delete" data-index="${index}">
                <i class="fa-solid fa-trash"></i>
            </div>
        `;

        cartItemsEl.appendChild(div);
    });

    subtotalEl.innerText = subtotal.toLocaleString("vi-VN") + " đ";
    totalEl.innerText = subtotal.toLocaleString("vi-VN") + " đ";
}}
document.addEventListener("click", (e) => {
    // tăng / giảm số lượng
    if (e.target.matches(".qty button")) {
        const index = e.target.dataset.index;
        const change = Number(e.target.dataset.change);
        changeQty(index, change);
    }

    // xóa sản phẩm
    if (e.target.closest(".delete")) {
        const index = e.target.closest(".delete").dataset.index;
        removeItem(index);
    }
});
function changeQty(index, change) {
    const cart = getCart();

    if (cart[index].quantity + change > 0) {
        cart[index].quantity += change;
        saveCart(cart);
        renderCart(); 
    }
}
function removeItem(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart(); 
}
document.addEventListener("DOMContentLoaded", () => {
    renderCart();
});