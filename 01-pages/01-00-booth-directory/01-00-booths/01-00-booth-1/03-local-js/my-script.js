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
