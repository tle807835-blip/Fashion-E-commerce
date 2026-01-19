document.addEventListener("DOMContentLoaded", () => {
    const searchBox = document.querySelector(".header__search");
    if (!searchBox) return;

    const input = searchBox.querySelector("input");
    const resultBox = searchBox.querySelector(".product__list");

    resultBox.style.position = "absolute";
    resultBox.style.top = "48px";
    resultBox.style.left = "0";
    resultBox.style.right = "0";
    resultBox.style.background = "#fff";
    resultBox.style.borderRadius = "8px";
    resultBox.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
    resultBox.style.maxHeight = "280px";
    resultBox.style.overflowY = "auto";
    resultBox.style.display = "none";
    resultBox.style.zIndex = "1000";

    input.addEventListener("input", () => {
        const keyword = input.value.trim().toLowerCase();

        if (!keyword) {
            resultBox.innerHTML = "";
            resultBox.style.display = "none";
            return;
        }

        const match = products.filter(p =>
            p.name.toLowerCase().includes(keyword) ||
            p.desc.toLowerCase().includes(keyword)
        );

        if (match.length === 0) {
            resultBox.innerHTML = `
                <p style="padding:12px; text-align:center; color:#888;">
                    Không tìm thấy sản phẩm
                </p>
            `;
            resultBox.style.display = "block";
            return;
        }

        resultBox.innerHTML = match.map(p => `
            <div class="search-item" data-id="${p.id}"
                 style="display:flex; gap:10px; padding:10px; cursor:pointer;">
                <img src="${p.img}" 
                     style="width:45px; height:45px; border-radius:6px; object-fit:cover;">
                <div>
                    <strong style="font-size:14px;">${p.name}</strong><br>
                    <span style="font-size:13px; color:#777;">
                        ${p.price.toLocaleString("vi-VN")} ₫
                    </span>
                </div>
            </div>
        `).join("");

        resultBox.style.display = "block";

        resultBox.querySelectorAll(".search-item").forEach(item => {
            item.addEventListener("click", () => {
                const id = item.dataset.id;
                const product = products.find(p => p.id == id);

                localStorage.setItem(
                    "selectedProduct",
                    JSON.stringify({
                        ...product,
                        img: "../" + product.img
                    })
                );

                window.location.href = "product/product.html";
            });
        });
    });

    document.addEventListener("click", (e) => {
        if (!searchBox.contains(e.target)) {
            resultBox.style.display = "none";
        }
    });
});
