document.addEventListener("DOMContentLoaded", () => {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const orderItems = document.getElementById("orderItems");
    const subtotalEl = document.getElementById("subtotal");
    const totalEl = document.getElementById("total");

    if (cart.length === 0) {
        alert("Giỏ hàng trống!");
        window.location.href = "../cart/cart.html";
        return;
    }

    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;

        const div = document.createElement("div");
        div.className = "order-item";
        div.innerHTML = `
            <img src="${item.img}">
            <div>
                <p><b>${item.name}</b></p>
                <p>${item.quantity} × ${item.price.toLocaleString("vi-VN")} đ</p>
            </div>
        `;
        orderItems.appendChild(div);
    });

    subtotalEl.innerText = subtotal.toLocaleString("vi-VN") + " đ";
    totalEl.innerText = subtotal.toLocaleString("vi-VN") + " đ";

    document.getElementById("checkoutForm").addEventListener("submit", e => {
        e.preventDefault();

        const fields = [
            "firstName", "lastName",
            "address", "city", "phone"
        ];

        for (let id of fields) {
            if (!document.getElementById(id).value.trim()) {
                alert("Vui lòng nhập đầy đủ thông tin!");
                return;
            }
        }

        alert("Đặt hàng thành công!");

        localStorage.removeItem("cart");
        window.location.href = "../index.html";
    });

});
