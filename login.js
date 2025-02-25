document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMessage = document.getElementById("errorMessage");

    function normalizeInput(input) {
        return input.replace(/\uFF10-\uFF19/g, function(d) {
            return String.fromCharCode(d.charCodeAt(0) - 0xFEE0);
        });
    }

    const normalizedUsername = normalizeInput(username);
    const normalizedPassword = normalizeInput(password);

  
    let users = JSON.parse(localStorage.getItem("users")) || [];

   
    const validUser = users.find(user => user.username === normalizedUsername && user.password === normalizedPassword);

    if (validUser) {
        localStorage.setItem("isLoggedIn", "true"); 
        localStorage.setItem("loggedInUser", normalizedUsername); 

     
        if (normalizedUsername === "admin") {
            window.location.href = "dashboard.html";
        } else {
            window.location.href = "user-dashboard.html";
        }
    } else {
        errorMessage.textContent = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
    }
});
