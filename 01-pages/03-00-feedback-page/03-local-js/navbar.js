const toggle = document.querySelector("header .menu-toggle");
        const menu = document.querySelector("header .nav-menu");

        toggle.addEventListener("click", () => menu.classList.toggle("active"));