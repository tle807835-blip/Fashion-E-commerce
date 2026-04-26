
// Regex
const nameRegex = /^[A-Za-zÀ-ỹ\s]{2,30}$/; // tên có dấu, 2-30 ký tự
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // email cơ bản
const passwordRegex = /^.{6,}$/; // ít nhất 6 ký tự

const tabs = document.querySelectorAll(".tab");
const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        if (tab.dataset.tab === "login") {
            loginForm.classList.add("active");
            registerForm.classList.remove("active");
        } else {
            registerForm.classList.add("active");
            loginForm.classList.remove("active");
        }
    });
});

function showMessage(text, type = "error") {
    let msg = document.getElementById("message");

    if (!msg) {
        msg = document.createElement("p");
        msg.id = "message";
        msg.style.marginBottom = "10px";
        msg.style.fontSize = "14px";

        const form = document.querySelector(".auth-form");
        if (form) form.prepend(msg);
    }

    msg.innerText = text;

    // 👉 Mặc định đỏ, success thì xanh
    msg.style.color = type === "success" ? "green" : "red";
}

const btnRegister = document.getElementById("btnRegister");
if (btnRegister) {
    btnRegister.addEventListener("click", (e) => {
        e.preventDefault(); // 🔥 chống reload

        const name = document.getElementById("regName").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const password = document.getElementById("regPassword").value;

        if (!name || !email || !password) {
            showMessage("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        if (!emailRegex.test(email)) {
            showMessage("Email không đúng định dạng!");
            return;
        }

        showMessage("Test chạy OK", "success");
    });
}

const btnLogin = document.getElementById("btnLogin");

if (btnLogin) {
    btnLogin.addEventListener("click", () => {
        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        if (!email || !password) {
            showMessage("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        if (!emailRegex.test(email)) {
            showMessage("Email không hợp lệ!");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(
            u => u.email === email && u.password === password
        );

        if (!user) {
            showMessage("Sai email hoặc mật khẩu!");
            return;
        }

        localStorage.setItem("currentUser", JSON.stringify(user));
        localStorage.setItem("isLoggedIn", "true");

        showMessage("Đăng nhập thành công!", "success");

        setTimeout(() => {
            window.location.href = "../index.html";
        }, 1000);
    });
}