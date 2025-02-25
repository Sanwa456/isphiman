// ตรวจสอบสิทธิ์ admin
if (!localStorage.getItem("isLoggedIn") || localStorage.getItem("loggedInUser") !== "admin") {
    alert("คุณไม่มีสิทธิ์เข้าถึงหน้านี้!");
    window.location.href = "login.html";
}

// โหลดข้อมูลผู้ใช้จาก localStorage
function loadUsers(filterClass = "all") {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userList = document.getElementById("userList");
    userList.innerHTML = ""; // เคลียร์รายการก่อน

    users.forEach((user, index) => {
        if (filterClass === "all" || user.class === filterClass) {
            let listItem = document.createElement("li");
            listItem.innerHTML = `
                <b>${user.username}</b> (${user.class})
                <button class="deleteUserBtn" data-index="${index}">ลบ</button>
            `;
            userList.appendChild(listItem);
        }
    });

    // เพิ่ม event listener ให้ปุ่มลบ
    document.querySelectorAll(".deleteUserBtn").forEach(button => {
        button.addEventListener("click", function() {
            let index = this.getAttribute("data-index");
            deleteUser(index);
        });
    });
}

// เพิ่มผู้ใช้ใหม่
document.getElementById("addUserForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const userClass = document.getElementById("userClass").value;
    const newUsername = document.getElementById("newUsername").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();

    if (!userClass) {
        alert("กรุณาเลือกชั้นเรียน!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // ตรวจสอบว่าชื่อซ้ำหรือไม่
    if (users.some(user => user.username === newUsername)) {
        document.getElementById("message").innerText = `ชื่อผู้ใช้ ${newUsername} มีอยู่แล้ว!`;
        return;
    }

    // เพิ่มผู้ใช้
    users.push({ username: newUsername, password: newPassword, class: userClass });
    localStorage.setItem("users", JSON.stringify(users));

    document.getElementById("message").innerText = `เพิ่มผู้ใช้ ${newUsername} สำเร็จ!`;

    // รีโหลดรายชื่อผู้ใช้
    loadUsers(document.getElementById("filterClass").value);

    // เคลียร์ฟอร์ม
    document.getElementById("addUserForm").reset();
});

// ฟังก์ชันลบผู้ใช้
function deleteUser(index) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.splice(index, 1); // ลบข้อมูลที่ตำแหน่ง index
    localStorage.setItem("users", JSON.stringify(users));
    loadUsers(document.getElementById("filterClass").value); // รีโหลดรายชื่อ
}

// กรองรายชื่อผู้ใช้ตามชั้นเรียน
document.getElementById("filterClass").addEventListener("change", function() {
    loadUsers(this.value);
});

// ออกจากระบบ
document.getElementById("logoutBtn").addEventListener("click", function() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    window.location.href = "main.html";
});

// โหลดผู้ใช้เมื่อหน้าโหลดเสร็จ
document.addEventListener("DOMContentLoaded", function() {
    loadUsers();
});
