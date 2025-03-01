const loginForm = document.getElementById("login-form");
const message = document.getElementById("message");

const showMessage = (text, type = "danger") => {
  //hiển thị
  message.style.display = "block";
  message.className = `alert alert - ${type}`;
  message.textContent = text;
  setTimeout(() => {
    //tắt cái hiển thị
    message.style.display = "none";
  }, 2000);
};

//xử lý sự kiện
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  if (!username || !password) {
    showMessage("Please enter a username or password");
    return;
  }
  //   console.log("user", username);
  //   console.log("pass", password);

  //lấy danh sách từ local
  let users = [];
  const stoUsers = localStorage.getItem("users");
  if (stoUsers) {
    users = JSON.parse(stoUsers);
  }

  //thêm admin nếu chưa có
  if (!users.some((user) => user.username === "admin")) {
    users.push({
      username: "admin",
      password: "admin",
      email: "admin@gmail.com",
    });
    localStorage.setItem("users", JSON.stringify(users));
  }

  //kiểm tra thông tin đăng nhập
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (!user) {
    showMessage("Username or Password error");
    loginForm();
    return;
  } else {
    showMessage("Login success! Username " + user.username);
  }
  //
  loginForm.reset();
});
