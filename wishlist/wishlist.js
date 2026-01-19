const grid = document.querySelector(".wishlist-grid");
const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

if (wishlist.length === 0) {
    grid.innerHTML = "<p>Chưa có sản phẩm yêu thích</p>";
} else {
    grid.innerHTML = wishlist.map(p => `
        <div class="wishlist-card" data-id="${p.id}">
            <div class="wishlist-img">
                <img src="${p.img}" alt="${p.name}">
            </div>

            <div class="wishlist-info">
                <h3 class="wishlist-name">${p.name}</h3>
                <p class="wishlist-price">
                    ${p.price.toLocaleString("vi-VN")} đ
                </p>
            </div>
        </div>
    `).join("");
}

grid.addEventListener("click", e => {
    const card = e.target.closest(".wishlist-card");
    if (!card) return;

    const id = card.dataset.id;
    const product = wishlist.find(p => p.id == id);

    localStorage.setItem("selectedProduct", JSON.stringify(product));
    window.location.href = "../product/product.html";
});
