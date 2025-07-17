// Ambil elemen-elemen form
const loginEmail = document.querySelector('.card-front input[type="email"]');
const loginPassword = document.querySelector('.card-front input[type="password"]');
const loginBtn = document.querySelector('.card-front .btn');

const signupName = document.querySelector('.card-back input[type="text"]');
const signupEmail = document.querySelector('.card-back input[type="email"]');
const signupPassword = document.querySelector('.card-back input[type="password"]');
const signupBtn = document.querySelector('.card-back .btn');

// Fungsi simpan data saat Sign Up
signupBtn.addEventListener('click', function (e) {
  e.preventDefault();

  const name = signupName.value.trim();
  const email = signupEmail.value.trim();
  const password = signupPassword.value;

  if (!name || !email || !password) {
    alert("Semua kolom harus diisi!");
    return;
  }

  if (password.length < 6) {
    alert("Password minimal 6 karakter!");
    return;
  }

  const user = {
    name: name,
    email: email,
    password: password
  };

  localStorage.setItem("userData", JSON.stringify(user));
  alert("Registrasi berhasil! Silakan login.");

  // Reset input
  signupName.value = '';
  signupEmail.value = '';
  signupPassword.value = '';
});

// Fungsi login
loginBtn.addEventListener('click', function (e) {
  e.preventDefault();

  const email = loginEmail.value.trim();
  const password = loginPassword.value;

  const stored = localStorage.getItem("userData");

  if (!stored) {
    alert("Belum ada akun terdaftar. Silakan Sign Up.");
    return;
  }

  const user = JSON.parse(stored);

  if (email === user.email && password === user.password) {
    alert("Login berhasil!");
    window.location.href = "isian.html"; // halaman setelah login
  } else {
    alert("Email atau Password salah!");
  }
});
