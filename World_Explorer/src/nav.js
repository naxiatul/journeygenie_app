const { shell } = require('electron');

const body = document.querySelector("body"),
    sidebar = body.querySelector(".sidebar"),
    toggle = body.querySelector(".toggle"),
    searchBtn = body.querySelector(".search-box"),
    logo = body.querySelector("#logo");

const openLogoSrc = 'image/logo.png';  
const closeLogoSrc = 'image/logo2.png';

toggle.addEventListener("click", () =>{
    sidebar.classList.toggle("close");
    
    if (sidebar.classList.contains("close")) {
        logo.src = closeLogoSrc;  
    } else {
        logo.src = openLogoSrc;  
    }
});

searchBtn.addEventListener("click", () =>{
    sidebar.classList.remove("close");
    logo.src = openLogoSrc;
});

function searchCountry(inputId) {
    var countryInput = document.getElementById(inputId);
    var country = countryInput.value.trim();

    if (country) {
        window.location.href = `country-info.html?country=${country}`;
    } else {
    }
}

function toggleDropdown(event) {
    event.stopPropagation();
    if (sidebar.classList.contains("close")) {
        sidebar.classList.remove("close");
        logo.src = openLogoSrc;
    }
    
    closeDropdowns();
    var element = document.getElementById("popular");
    element.classList.toggle("active");
}

function closeDropdowns() {
    var dropdowns = document.querySelectorAll(".nav-link");
    dropdowns.forEach(function(dropdown) {
        dropdown.classList.remove("active");
    });
}

document.addEventListener("click", function(event) {
    if (!event.target.closest(".nav-link")) {
        closeDropdowns();
    }
});

function openExternalLink(url) {
    shell.openExternal(url);
}




