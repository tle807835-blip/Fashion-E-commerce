const menuBtn = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const closeBtn = document.querySelector(".close-menu");

menuBtn.onclick = () => {
    mobileMenu.classList.add("active");
};

closeBtn.onclick = () => {
    mobileMenu.classList.remove("active");
};

mobileMenu.onclick = (e) => {
    if (e.target === mobileMenu) {
        mobileMenu.classList.remove("active");
    }
};