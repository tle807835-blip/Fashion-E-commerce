const nameRegex = /^[A-Za-zÀ-ỹ\s]{2,20}$/; 
const emailRegex = /^[a-zA-Z0-9]+@gmail\.com$/;
const passwordRegex = /^.{6,}$/; 

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
    const form = document.querySelector(".auth-form.active"); 
    if (!form) return;

    let msg = form.querySelector(".message");

    if (!msg) {
        msg = document.createElement("p");
        msg.className = "message";
        msg.style.marginBottom = "10px";
        msg.style.fontSize = "14px";
        form.prepend(msg);
    }

    msg.innerText = text;
    msg.style.color = type === "success" ? "green" : "red";
}

const btnRegister = document.getElementById("btnRegister");
if (btnRegister) {
    btnRegister.addEventListener("click", (e) => {
        e.preventDefault();

        const name = document.getElementById("regName").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const password = document.getElementById("regPassword").value;

        if (!name || !email || !password) {
            showMessage("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        if (!nameRegex.test(name)) {
            showMessage("Tên phải 2-30 ký tự, chỉ chứa chữ cái!");
            return;
        }

        if (!emailRegex.test(email)) {
            showMessage("Email không đúng định dạng!");
            return;
        }

        if (!passwordRegex.test(password)) {
            showMessage("Mật khẩu phải có ít nhất 6 ký tự!");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const exists = users.some(u => u.email === email);
        if (exists) {
            showMessage("Email đã tồn tại!");
            return;
        }

        const newUser = { name, email, password };
        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        showMessage("Đăng ký thành công!", "success");
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
