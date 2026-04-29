document.addEventListener("DOMContentLoaded", () => {

    const PRODUCTS_PER_PAGE = 6;
    let currentPage = 1;

    const products = [
        {
            id: 1,
            name: "Áo Khoác Dù",
            category: "ao",
            price: 105000,
            color: "black",
            img: "../img/aokhoacden.webp",
            desc: "Áo Khoác Bomber Nam Dù Hai Lớp Tráng Bạc, Chống Nước, Cản Gió, Chống Tia UV"
        },
        {
            id: 2,
            name: "Áo Sơ Mi Nam",
            category: "ao",
            price: 520000,
            color: "white",
            img: "../img/quan.webp",
            desc: "Áo Sơ Mi Nam Ngắn Tay Phong Cách retro Nhật Bản Thời Trang Mới"
        },
        {
            id: 3,
            name: "Áo Thun Cổ Tròn",
            category: "ao",
            price: 890000,
            color: "brown",
            img: "../img/julido.webp",
            desc: "Áo Thun Cổ Tròn Lệch Vai Xoắn Eo Tôn Dáng Nhiều Màu Ulzzang"
        },
        {
            id: 4,
            name: "Quần Short Kaki Nữ",
            category: "quan",
            price: 650000,
            color: "wihte",
            img: "../img/quann.webp",
            desc: "Quần Short Kaki Nữ, Quần Đùi Kaki Loại Đẹp Cạp Chun Co Giãn"
        },
        {
            id: 5,
            name: "Áo Thun Nam",
            category: "ao",
            price: 133000,
            color: "white",
            img: "../img/aotr.webp",
            desc: "Áo thun nam cổ chữ V ngắn tay form dáng dễ phối chất vải thun gân cao cấp ZUTEE"
        },
        {
            id: 6,
            name: "Áo sơ mi ngắn tay",
            category: "ao",
            price: 120000,
            color: "brown",
            img: "../img/aon.webp",
            desc: "Áo sơ mi tay ngắn nam dệt lưới đi biển cổ bẻ kiểu trẻ trung co giãn tốt, phong cách Hàn Quốc"
        },
        {
            id: 7,
            name: "Vest Gile",
            category: "ao",
            price: 199000,
            color: "brown",
            img: "../img/qa3.webp",
            desc: "Sét Vest Gile Áo Kèm Quần Phong Cách Hiện Đại Trẻ Trung"
        },
        {
            id: 8,
            name: "Áo Jacket",
            category: "ao",
            price: 129000,
            color: "black",
            img: "../img/qa1.webp",
            desc: "Áo Jacket MM PHỐI TAY DA màu"
        },
        {
            id: 9,
            name: "Áo Thun Unisex",
            category: "ao",
            price: 100000,
            color: "black",
            img: "../img/qa2.webp",
            desc: "Áo thun phông nữ nam 3158 unisex nam nữ form rộng oversize"
        }, {
            id: 10,
            name: "Quần Ống Loe",
            category: "quan",
            price: 143000,
            color: "brown",
            img: "../img/qa4.webp",
            desc: "Quần Ống Loe Gân Mông Mấu Mới Hót Thu Đông 2026 Vải Nỉ Da Cá Dày Dặn"
        },
        {
            id: 11,
            name: "Chân váy Kaki Nhật",
            category: "quan",
            price: 129000,
            color: "black",
            img: "../img/qa5.webp",
            desc: "Chân váy Kaki Nhật L1 chữ A Công sở cạp"
        },
        {
            id: 12,
            name: "Áo Polo",
            category: "ao",
            price: 179000,
            color: "white",
            img: "../img/qa6.webp",
            desc: "Áo Polo Nam Nữ Thêu ESSEFAUST Unisex - Áo Cổ Bẻ Tay Lỡ"
        },
        {
            id: 13,
            name: "Áo Sơ Mi",
            category: "ao",
            price: 150000,
            color: "black",
            img: "../img/qa7.webp",
            desc: "Áo sơ mi dài tay Giấu Nút HAU FASHION"
        },
        {
            id: 14,
            name: "Váy Bí Dáng Phồng",
            category: "ao",
            price: 320000,
            color: "black",
            img: "../img/v1.webp",
            desc: "Váy Bí Dáng Phồng Họa Tiết Hoa Nhí Bi Xinh Xắn Không Kèm Áo Trong Vintage Floral Bubble Dress"
        },
        {
            id: 15,
            name: "Quần Ống Rộng",
            category: "quan",
            price: 134000,
            color: "brown",
            img: "../img/qa8.webp",
            desc: "Quần Ống Rộng Chiết Ly Đỉa To Dài 103cm Siêu Hack Dáng Quần Tây Ống Rộng"
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
                <p class="category">${p.category === "ao" ? "Áo, Váy" : "Quần, Chân Váy"}</p>
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
                window.location.href = "../html/product.html";
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
