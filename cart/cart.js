let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
    const cartItemsEl = document.getElementById("cartItems");
    const subtotalEl = document.getElementById("subtotal");
    const totalEl = document.getElementById("total");

    cartItemsEl.innerHTML = "";

    if (cart.length === 0) {
        cartItemsEl.innerHTML = "<h3 style=\"text-decoration: underline;\">Giỏ hàng trống</h3>";
        subtotalEl.innerText = "0 đ";
        totalEl.innerText = "0 đ";
        return;
    }

    let subtotal = 0;

    cart.forEach((item, index) => {
        subtotal += item.price * item.quantity;

        const div = document.getElementById("cartItems")

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

            <div class="delete" data-delete="${index}">
                <i class="fa-solid fa-trash"></i>
            </div>
        `;

        cartItemsEl.appendChild(div);
    });

    subtotalEl.innerText = subtotal.toLocaleString("vi-VN") + " đ";
    totalEl.innerText = subtotal.toLocaleString("vi-VN") + " đ";
}


function setupEvents() {
    const cartItemsEl = document.getElementById("cartItems");

    cartItemsEl.addEventListener("click", function (e) {
        
        if (e.target.dataset.change) {
            const index = e.target.dataset.index;
            const change = parseInt(e.target.dataset.change);

            if (cart[index].quantity + change > 0) {
                cart[index].quantity += change;
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
            }
        }

        
        if (e.target.closest("[data-delete]")) {
            const index = e.target.closest("[data-delete]").dataset.delete;
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        }
    });
}


document.addEventListener("DOMContentLoaded", () => {
    renderCart();
    setupEvents();
});