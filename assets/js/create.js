const signupForm = document.getElementById("signup-form");
const message = document.getElementById("message");

//thông báo
const showMessage = (text, type = "danger") => {
  message.style.display = "block";
  message.className = `alert alert-${type}`;
  message.textContent = text; //đặt nội dung vô văn bản
  setTimeout(() => {
    message.style.display = "none";
  }, 2000);
};

//xử lý sự kiện submit
signupForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Ngăn form reload trang
  //đưa các biến vào trong sự kiện mới lấy đúng thời điểm được

  const email = document.getElementById("signup-email").value;
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;
  const confirm = document.getElementById("signup-confirm-password").value;

  if (!email || !username || !password || !confirm) {
    showMessage("Please enter complete information");
    return;
  }
  if (password !== confirm) {
    showMessage("Password mismatch");
    return;
  }

  //lấy danh sách từ localstorage
  // let users = JSON.parse(localStorage.getItem("users") || "[]");
  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.some((user) => user.username === username)) {
    showMessage("Existing users");
    return;
  }

  //lưu thông tin người dùng vào local storage

  //tạo object người dùng mới
  const newUsers = { username, password, email };
  //thêm vào mảng
  users.push(newUsers);
  //lưu mảng cập nhật vào local storage
  localStorage.setItem("users", JSON.stringify(users));

  console.log("Danh sách: ", users);
});
