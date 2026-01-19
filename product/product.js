document.addEventListener("DOMContentLoaded", () => {

    const product = JSON.parse(localStorage.getItem("selectedProduct"));
    if (!product) {
        window.location.href = "../shop/shop.html";
        return;
    }

    document.querySelector("#product-img").src = product.img;
    document.querySelector(".product__title").innerText = product.name;
    document.querySelector(".subtitle").innerText = product.desc;
    document.querySelector(".price").innerText =
        product.price.toLocaleString("vi-VN") + "đ";

    function getWishlist() {
        return JSON.parse(localStorage.getItem("wishlist")) || [];
    }
    function saveWishlist(list) {
        localStorage.setItem("wishlist", JSON.stringify(list));
    }

    const wishlistBtn = document.querySelector(".add-wishlist");
    const heartIcon = wishlistBtn.querySelector("i");

    let wishlist = getWishlist();
    if (wishlist.find(i => i.id === product.id)) {
        wishlistBtn.classList.add("active");
        heartIcon.className = "fa-solid fa-heart";
    }

    wishlistBtn.addEventListener("click", () => {
        let wishlist = getWishlist();
        const index = wishlist.findIndex(i => i.id === product.id);

        if (index === -1) {
            wishlist.push(product);
            heartIcon.className = "fa-solid fa-heart";
            wishlistBtn.classList.add("active");
        } else {
            wishlist.splice(index, 1);
            heartIcon.className = "fa-regular fa-heart";
            wishlistBtn.classList.remove("active");
        }

        saveWishlist(wishlist);
    });

    let selectedSize = null;
    document.querySelectorAll(".size").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".size").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            selectedSize = btn.innerText;
        });
    });

    let selectedColor = "Trắng";
    const colorText = document.getElementById("selected-color-text");

    document.querySelectorAll(".color-item").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".color-item").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            selectedColor = btn.dataset.color;
            colorText.innerText = selectedColor.toUpperCase();
        });
    });

    document.querySelector(".add-cart").addEventListener("click", () => {
        if (!selectedSize) {
            alert("Vui lòng chọn size");
            return;
        }

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const exist = cart.find(i =>
            i.id === product.id &&
            i.size === selectedSize &&
            i.color === selectedColor
        );

        if (exist) {
            exist.quantity += 1;
        } else {
            cart.push({
                ...product,
                size: selectedSize,
                color: selectedColor,
                quantity: 1
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Đã thêm vào giỏ hàng");
    });

});
