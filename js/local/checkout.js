document.addEventListener("DOMContentLoaded", () => {

    const nameRegex = /^[A-Za-zÀ-ỹ\s]{2,20}$/; 
    const phoneRegex = /^0[0-9]{9}$/;   
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const orderItems = document.getElementById("orderItems");
    const subtotalEl = document.getElementById("subtotal");
    const totalEl = document.getElementById("total");

    if (cart.length === 0) {
        showToast("Giỏ hàng trống!");
        window.location.href = "../html/cart.html";
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

        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const address = document.getElementById("address").value.trim();
        const city = document.getElementById("city").value.trim();
        const phone = document.getElementById("phone").value.trim();

        if (!firstName || !lastName || !address || !city || !phone) {
            showToast("Vui lòng nhập đầy đủ thông tin!", "Hãy kiểm tra lại!");
            return;
        }

        if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
            showToast("Tên không hợp lệ!", "Chỉ chứa chữ, 2-30 ký tự");
            return;
        }

        if (!phoneRegex.test(phone)) {
            showToast("Số điện thoại không hợp lệ!", "VD: 0912345678");
            return;
        }

        showToast("Đặt hàng thành công!", "Cảm ơn và mong bạn quay trở lại!");

        localStorage.removeItem("cart");
        setTimeout(() => {
            localStorage.removeItem("cart");
            window.location.href = "../index.html";
        }, 2000);
    });
});
