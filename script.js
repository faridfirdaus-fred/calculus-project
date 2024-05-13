/*Toggle dropdown list*/
/*https://gist.github.com/slavapas/593e8e50cf4cc16ac972afcbad4f70c8*/

let navMenuDiv = document.getElementById("nav-content");
let navMenu = document.getElementById("nav-toggle");

document.onclick = check;
function check(e) {
  let target = (e && e.target) || (event && event.srcElement);

  //Nav Menu
  if (!checkParent(target, navMenuDiv)) {
    // click NOT on the menu
    if (checkParent(target, navMenu)) {
      // click on the link
      if (navMenuDiv.classList.contains("hidden")) {
        navMenuDiv.classList.remove("hidden");
      } else {
        navMenuDiv.classList.add("hidden");
      }
    } else {
      // click both outside link and outside menu, hide menu
      navMenuDiv.classList.add("hidden");
    }
  }
}
function checkParent(t, elm) {
  while (t.parentNode) {
    if (t == elm) {
      return true;
    }
    t = t.parentNode;
  }
  return false;
}

 var scrollpos = window.scrollY;
 var header = document.getElementById("header");
 var navcontent = document.getElementById("nav-content");
 var navaction = document.getElementById("navAction");
 var brandname = document.getElementById("brandname");
 var toToggle = document.querySelectorAll(".toggleColour");
 let navlist = document.querySelectorAll('.navlist')

 document.addEventListener("scroll", function () {
   /*Apply classes for slide in bar*/
   scrollpos = window.scrollY;

   if (scrollpos > 10) {
     header.classList.add("bg-white");
     navaction.classList.remove("bg-white");
     navaction.classList.add("bg-primary");
     navaction.classList.remove("text-gray-800");
     navaction.classList.add("text-white");
     navlist.forEach(function (element) {
       element.classList.remove("lg:text-white");
     });
    
     //Use to switch toggleColour colours
     for (var i = 0; i < toToggle.length; i++) {
       toToggle[i].classList.add("text-gray-800");
       toToggle[i].classList.remove("text-white");
     }
     header.classList.add("shadow");
     navcontent.classList.remove("bg-gray-100");
     navcontent.classList.add("bg-white");
   } else {
     header.classList.remove("bg-white");
     navaction.classList.remove("bg-primary");
     navaction.classList.add("bg-white");
     navaction.classList.remove("text-white");
      navlist.forEach(function (element) {
        element.classList.add("lg:text-white");
      });

     navaction.classList.add("text-gray-800");
     //Use to switch toggleColour colours
     for (var i = 0; i < toToggle.length; i++) {
       toToggle[i].classList.add("text-white");
       toToggle[i].classList.remove("text-gray-800");
     }

     header.classList.remove("shadow");
     navcontent.classList.remove("bg-white");
     navcontent.classList.add("bg-gray-100");
   }
 });
// nav button
document.getElementById("navAction").addEventListener("click", function () {
  window.location.href = "kalkulator.html";
});

// animasi mengetik sendiri
const typed = new Typed("#slogan", {
  strings: ["mengerjakan soal kalkulus", "belajar kalkulus"],
  typeSpeed: 100,
  loop: true,
  backDelay: 2000,
  backSpeed: 40,
});

// Kalkulator Bilangan Kompleks
// Fungsi untuk memecah string input menjadi komponen bilangan kompleks
function parseComplexNumber(complexString) {
  const matches = complexString.match(/(-?\d+)\s*([+-]?)\s*(\d*)i/);
  if (matches) {
    const realPart = parseFloat(matches[1]);
    const sign = matches[2];
    const imaginaryPart = parseFloat(sign + matches[3] || "1");
    return { realPart, imaginaryPart };
  }
  return null;
}

// Fungsi untuk menghitung operasi pada bilangan kompleks
let image = document.getElementById("movingImage");
let position = 0;
let direction = 1;
const speed = 5; // Ubah kecepatan pergerakan di sini

function moveImage() {
  position += speed * direction;
  image.style.left = position + "px";

  // Jika gambar mencapai batas, balik arah
  if (position >= window.innerWidth - image.width || position <= 0) {
    direction *= -1;
  }

  requestAnimationFrame(moveImage);
}

moveImage();
