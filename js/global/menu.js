const menuBtn = document.querySelector(".menu-toggle");
const mobileMenu = document.getElementById("mobileMenu");
const closeBtn = document.querySelector(".close-menu");

menuBtn.onclick = () => {
    mobileMenu.classList.add("active");
};

closeBtn.onclick = () => {
    mobileMenu.classList.remove("active");
};

// click ra ngoài cũng đóng
mobileMenu.onclick = (e) => {
    if (e.target === mobileMenu) {
        mobileMenu.classList.remove("active");
    }
};