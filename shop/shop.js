document.addEventListener("DOMContentLoaded", () => {

    const PRODUCTS_PER_PAGE = 6;
    let currentPage = 1;

    const products = [
        {
            id: 1,
            name: "Áo Khoác Dù",
            category: "quanao",
            price: 105000,
            color: "black",
            img: "../img/aokhoacden.webp",
            desc: "Áo Khoác Bomber Nam Dù Hai Lớp Tráng Bạc, Chống Nước, Cản Gió, Chống Tia UV"
        },
        {
            id: 2,
            name: "Túi Đeo Chéo",
            category: "phukien",
            price: 650000,
            color: "black",
            img: "../img/tui.webp",
            desc: "Túi Đeo Chéo, Túi Xách Nữ Cầm Tay Jac Da Lì Ảnh Thật Đủ Màu Bền Đẹp Túi Vừa Điện Thoại Thời Trang Dễ Dùng"
        },
        {
            id: 3,
            name: "Thắt Lưng Nam",
            category: "phukien",
            price: 180000,
            color: "black",
            img: "../img/thatlung.webp",
            desc: "Thắt lưng mặt xoay nam cao cấp thời trang, dây lưng da khóa tự động X003, Dây nịt Akedo"
        },
        {
            id: 4,
            name: "Quần JOGGER",
            category: "quanao",
            price: 520000,
            color: "white",
            img: "../img/quan.webp",
            desc: "Quần JOGGER 3 LINE color unisex nam nữ"
        },
        {
            id: 5,
            name: "Áo khoác Nam JULIDO",
            category: "quanao",
            price: 890000,
            color: "brown",
            img: "../img/julido.webp",
            desc: "Áo khoác Nam JULIDO Nam chất liệu gió hai lớp trượt nước cản gió cản bụi"
        },
        {
            id: 6,
            name: "Kẹp Tóc",
            category: "phukien",
            price: 50000,
            color: "black",
            img: "../img/keptoc.webp",
            desc: "Kẹp Tóc Càng Cua 13cm Chất Lượng Cao Nhám Đơn Giản Thời Trang Cho Nữ"
        },
        {
            id: 7,
            name: "Kẹp Tóc Mori",
            category: "phukien",
            price: 122000,
            color: "white",
            img: "../img/kep.webp",
            desc: "Mori Phong Cách Thanh Lịch Lily Của Thung Lũng Ngọc Trai Hoa Tính Khí Thời Trang Tua Rua Tóc"
        },
        {
            id: 8,
            name: "Quần Ống Rộng",
            category: "quanao",
            price: 650000,
            color: "wihte",
            img: "../img/quann.webp",
            desc: "Quần ống rộng nam, nữ ống suông chất cotton dày dặn, quần dài ống rộng phong cách Hàn Quốc Ulzzang"
        },
        {
            id: 9,
            name: "Áo Thun Nam",
            category: "quanao",
            price: 133000,
            color: "white",
            img: "../img/aotr.webp",
            desc: "Áo thun nam cổ chữ V ngắn tay form dáng dễ phối chất vải thun gân cao cấp ZUTEE"
        },
        {
            id: 10,
            name: "Áo Thun Nũ",
            category: "quanao",
            price: 120000,
            color: "brown",
            img: "../img/aon.webp",
            desc: "FOCUS local brand Áo thun nữ bigsize Nâu vintage thời trang nữ tee 100%cotton"
        },
        {
            id: 11,
            name: "Mũ Mùa Đông",
            category: "phukien",
            price: 230000,
            color: "brown",
            img: "../img/mu.webp",
            desc: "Mũ mùa đông tone nâu nhiều kiểu phong cách Hàn"
        },
        {
            id: 12,
            name: "Vòng Cổ",
            category: "phukien",
            price: 192000,
            color: "brown",
            img: "../img/vongco.webp",
            desc: "Vòng cổ máy ảnh phim màu nâu cổ điển Ahellogirl Phong cách thu đông mới"
        }
    ];


    const productGrid = document.querySelector(".product-grid");
    const pagination = document.querySelector(".page");

    const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
    const priceRadios = document.querySelectorAll('input[name="price"]');
    const colorCheckboxes = document.querySelectorAll('input[name="color"]');

    function createProductCard(p) {
        return `
            <div class="product-card" data-id="${p.id}">
                <div class="product-img">
                    <img src="${p.img}" alt="${p.name}">
                </div>

                <a href="#" class="quick-view">Xem Ngay</a>

                <h3>${p.name}</h3>
                <p class="category">${p.category === "quanao" ? "Quần áo" : "Phụ kiện"}</p>
                <p class="price">${p.price.toLocaleString()} ₫</p>
            </div>
        `;
    }

    function getFilteredProducts() {
        const selectedCategories = Array.from(categoryCheckboxes)
            .filter(cb => cb.checked && cb.value !== "tatca")
            .map(cb => cb.value);

        const selectedPrice = Array.from(priceRadios)
            .find(rb => rb.checked)?.value;

        const selectedColors = Array.from(colorCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        return products.filter(p => {
            let cateMatch =
                selectedCategories.length === 0 ||
                selectedCategories.includes(p.category);

            let priceMatch = true;
            if (selectedPrice === "duoi200") priceMatch = p.price < 200000;
            if (selectedPrice === "200-500") priceMatch = p.price >= 200000 && p.price <= 500000;
            if (selectedPrice === "tren500") priceMatch = p.price > 500000;

            let colorMatch =
                selectedColors.length === 0 ||
                selectedColors.includes(p.color);

            return cateMatch && priceMatch && colorMatch;

        });
    }

    function renderProducts(page = 1) {
        const filtered = getFilteredProducts();
        const start = (page - 1) * PRODUCTS_PER_PAGE;
        const end = start + PRODUCTS_PER_PAGE;

        productGrid.innerHTML = filtered
            .slice(start, end)
            .map(createProductCard)
            .join("");

        const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
        renderPagination(totalPages);
        attachProductEvents();
    }

    function renderPagination(totalPages) {
        pagination.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement("a");
            btn.href = "#";
            btn.innerText = i;
            btn.className = i === currentPage ? "active" : "";

            btn.onclick = e => {
                e.preventDefault();
                currentPage = i;
                renderProducts(i);
            };

            pagination.appendChild(btn);
        }
    }

    function attachProductEvents() {
        document.querySelectorAll(".product-card, .quick-view").forEach(el => {
            el.addEventListener("click", e => {
                e.preventDefault();

                const card = e.target.closest(".product-card");
                if (!card) return;

                const id = card.dataset.id;
                const product = products.find(p => p.id == id);

                localStorage.setItem("selectedProduct", JSON.stringify(product));
                window.location.href = "../product/product.html";
            });
        });
    }

    categoryCheckboxes.forEach(cb => cb.onchange = () => {
        currentPage = 1;
        renderProducts();
    });

    priceRadios.forEach(rb => rb.onchange = () => {
        currentPage = 1;
        renderProducts();
    });

    colorCheckboxes.forEach(cb => cb.onchange = () => {
        currentPage = 1;
        renderProducts();
    });


    renderProducts();

});
