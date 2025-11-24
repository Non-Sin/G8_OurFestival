const qtyInput = document.getElementById("qty");
const btnIncrease = document.getElementById("increase");
const btnDecrease = document.getElementById("decrease");

btnIncrease.addEventListener("click", () => {
  qtyInput.value = parseInt(qtyInput.value) + 1;
});

btnDecrease.addEventListener("click", () => {
  if (parseInt(qtyInput.value) > 1) {
    qtyInput.value = parseInt(qtyInput.value) - 1;
  }
});
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector("header .menu-toggle");
    const menu = document.querySelector("header .nav-menu");

    toggle.addEventListener("click", () => menu.classList.toggle("active"));
});
