document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".product_category").forEach(product => {

    const plusBtn = product.querySelector(".plus");
    const minusBtn = product.querySelector(".minus");
    const qtyText = product.querySelector(".qty");

    // ถ้าเมนูไหนยังไม่มีปุ่ม + - ให้ข้าม ไม่ Error
    if (!plusBtn || !minusBtn || !qtyText) return;

    let qty = 0;

    plusBtn.addEventListener("click", () => {
      qty++;
      qtyText.textContent = qty;
    });

    minusBtn.addEventListener("click", () => {
      if (qty > 0) qty--;
      qtyText.textContent = qty;
    });
  });
});
