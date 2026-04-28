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
        name: "Quần JOGGER",
        category: "quan",
        price: 520000,
        color: "white",
        img: "../img/quan.webp",
        desc: "Quần JOGGER 3 LINE color unisex nam nữ"
    },
    {
        id: 3,
        name: "Áo khoác Nam JULIDO",
        category: "ao",
        price: 890000,
        color: "brown",
        img: "../img/julido.webp",
        desc: "Áo khoác Nam JULIDO Nam chất liệu gió hai lớp trượt nước cản gió cản bụi"
    },
    {
        id: 4,
        name: "Quần Ống Rộng",
        category: "quan",
        price: 650000,
        color: "wihte",
        img: "../img/quann.webp",
        desc: "Quần ống rộng nam, nữ ống suông chất cotton dày dặn, quần dài ống rộng phong cách Hàn Quốc Ulzzang"
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
        name: "Áo Thun Nũ",
        category: "ao",
        price: 120000,
        color: "brown",
        img: "../img/aon.webp",
        desc: "FOCUS local brand Áo thun nữ bigsize Nâu vintage thời trang nữ tee 100%cotton"
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
        img: "../img/qa1.webp",
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
    }

];

const grid = document.getElementById("productGrid");

products.slice(0, 3).forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.dataset.id = product.id;

    card.innerHTML = `
                <div class="product-img">
                    <img src="${product.img}" alt="${product.name}">
                </div>
                <a class="quick-view">Xem Ngay</a>
                <h3>${product.name}</h3>
                <p class="price">${product.price.toLocaleString("vi-VN")} ₫</p>
            `;

    card.addEventListener("click", () => {
        localStorage.setItem("selectedProduct", JSON.stringify({
            ...product,
            img: "../" + product.img
        }));
        window.location.href = "html/product.html";
    });

    grid.appendChild(card);
});