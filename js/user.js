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
    msg.style.color = type === "success" ? "green" : "red";
}

const btnRegister = document.getElementById("btnRegister");

if (btnRegister) {
    btnRegister.addEventListener("click", () => {
        const name = document.getElementById("regName").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const password = document.getElementById("regPassword").value;

        if (!name || !email || !password) {
            showMessage("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.find(u => u.email === email)) {
            showMessage("Email đã tồn tại!");
            return;
        }

        users.push({
            name,
            email,
            password
        });

        localStorage.setItem("users", JSON.stringify(users));

        showMessage("Đăng ký thành công!", "success");

        setTimeout(() => {
            window.location.href = "../login/login.html";
        }, 1200);
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
