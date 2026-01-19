document.addEventListener("DOMContentLoaded", () => {

    const cartItemsEl = document.getElementById("cartItems");
    const subtotalEl = document.getElementById("subtotal");
    const totalEl = document.getElementById("total");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartItemsEl.innerHTML = "<p>Giỏ hàng trống</p>";
        subtotalEl.innerText = "0 đ";
        totalEl.innerText = "0 đ";
        return;
    }

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
                    <button onclick="changeQty(${index}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQty(${index}, 1)">+</button>
                </div>
            </div>

            <div class="price">
                ${(item.price * item.quantity).toLocaleString("vi-VN")} đ
            </div>

            <div class="delete" onclick="removeItem(${index})">
                <i class="fa-solid fa-trash"></i>
            </div>
        `;

        cartItemsEl.appendChild(div);
    });

    subtotalEl.innerText = subtotal.toLocaleString("vi-VN") + " đ";
    totalEl.innerText = subtotal.toLocaleString("vi-VN") + " đ";
});


function changeQty(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart[index].quantity + change > 0) {
        cart[index].quantity += change;
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
    }
}


function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}
