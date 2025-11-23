 var myIndex1 = 0;
    var myIndex2 = 0;
    var myIndex3 = 0;
    var myIndex4 = 0;

    carousel1();
    carousel2();
    carousel3();
    carousel4();

    // For slides1
    function carousel1() {
        var i;
        var x = document.getElementsByClassName("mySlides1");
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        myIndex1++;
        if (myIndex1 > x.length) { myIndex1 = 1 }
        x[myIndex1 - 1].style.display = "block";
        setTimeout(carousel1, 3000);
    }

    // For slides2
    function carousel2() {
        var i;
        var s = document.getElementsByClassName("mySlides2");
        for (i = 0; i < s.length; i++) {
            s[i].style.display = "none";
        }
        myIndex2++;
        if (myIndex2 > s.length) { myIndex2 = 1 }
        s[myIndex2 - 1].style.display = "block";
        setTimeout(carousel2, 3000);
    }

    // For slides3
    function carousel3() {
        var i;
        var y = document.getElementsByClassName("mySlides3");
        for (i = 0; i < y.length; i++) {
            y[i].style.display = "none";
        }
        myIndex3++;
        if (myIndex3 > y.length) { myIndex3 = 1 }
        y[myIndex3 - 1].style.display = "block";
        setTimeout(carousel3, 3000);
    }

    // For slides4
    function carousel4() {
        var i;
        var z = document.getElementsByClassName("mySlides4");
        for (i = 0; i < z.length; i++) {
            z[i].style.display = "none";
        }
        myIndex4++;
        if (myIndex4 > z.length) { myIndex4 = 1 }
        z[myIndex4 - 1].style.display = "block";
        setTimeout(carousel4, 3000);
    }

    document.addEventListener("DOMContentLoaded", function() {
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".nav-menu");

    if (!toggle || !menu) return;

    // เริ่มต้น aria
    toggle.setAttribute("aria-expanded", "false");

    toggle.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("active");
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
});