document.addEventListener("DOMContentLoaded", function() {

  // วนในทุกกล่อง qty_demo ทีละชุด (รสแต่ละรส)
  document.querySelectorAll(".qty_demo").forEach(qtyBox => {

    const plusBtn = qtyBox.querySelector(".plus");
    const minusBtn = qtyBox.querySelector(".minus");
    const qtyText = qtyBox.querySelector(".qty");

    if (!plusBtn || !minusBtn || !qtyText) return;

    let qty = 0; 
    qtyText.textContent = qty;

    plusBtn.addEventListener("click", () => {
      qty++;
      qtyText.textContent = qty;
    });

    minusBtn.addEventListener("click", () => {
      if (qty > 0) {
        qty--;
        qtyText.textContent = qty;
      }
    });

  });

});
