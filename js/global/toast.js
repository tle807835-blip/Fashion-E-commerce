function showToast(title, desc) {
  const old = document.querySelector(".cart-noti");
  if (old) old.remove(); 

  const noti = document.createElement("div");
  noti.className = "cart-noti";

  noti.innerHTML = `
    <div class="cart-noti-content">
      <strong>${title}</strong>
      <span>${desc}</span>
    </div>
  `;

  document.body.appendChild(noti);

  setTimeout(() => {
    noti.classList.add("show");
  }, 50);

  setTimeout(() => {
    noti.classList.remove("show");
    setTimeout(() => noti.remove(), 300);
  }, 3000);
}