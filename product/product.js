document.addEventListener("DOMContentLoaded", () => {

    const product = JSON.parse(localStorage.getItem("selectedProduct"));
    
    if (!product) {
        window.location.href = "../shop/shop.html";
        return;
    }

    const mainImg = document.querySelector("#product-img");
    if (mainImg) mainImg.src = product.img;
    
    document.querySelector(".product__title").innerText = product.name;
    document.querySelector(".subtitle").innerText = product.desc;
    document.querySelector(".price").innerText = (product.price || 0).toLocaleString("vi-VN") + "đ";

    // --- LOGIC WISHLIST (YÊU THÍCH) ---
    const getWishlist = () => JSON.parse(localStorage.getItem("wishlist")) || [];
    const saveWishlist = (list) => localStorage.setItem("wishlist", JSON.stringify(list));
    const wishlistBtn = document.querySelector(".add-wishlist");
    
    if (wishlistBtn) {
        const heartIcon = wishlistBtn.querySelector("i");
        // Kiểm tra xem sản phẩm đã có trong danh sách yêu thích chưa
        if (getWishlist().find(i => i.name === product.name)) {
            wishlistBtn.classList.add("active");
            heartIcon.className = "fa-solid fa-heart";
        }

        wishlistBtn.addEventListener("click", () => {
            let wishlist = getWishlist();
            const index = wishlist.findIndex(i => i.name === product.name);
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
    }

    let selectedSize = null;
    document.querySelectorAll(".size").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".size").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            selectedSize = btn.innerText;
        });
    });

    let selectedColor = "Trắng";
    document.querySelectorAll(".color-item").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".color-item").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            selectedColor = btn.dataset.color || "Trắng";
            const colorDisplay = document.getElementById("selected-color-text");
            if (colorDisplay) colorDisplay.innerText = selectedColor.toUpperCase();
        });
    });

    const addCartBtn = document.querySelector(".add-cart");
    if (addCartBtn) {
        addCartBtn.addEventListener("click", () => {
            if (!selectedSize) {
                alert("Vui lòng chọn size bạn nhé!");
                return;
            }
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            const exist = cart.find(i => i.name === product.name && i.size === selectedSize && i.color === selectedColor);
            
            if (exist) {
                exist.quantity += 1;
            } else {
                cart.push({ ...product, size: selectedSize, color: selectedColor, quantity: 1 });
            }
            
            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Đã thêm vào giỏ hàng thành công!");
        });
    }
});