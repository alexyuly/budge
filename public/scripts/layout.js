const navHeading = document.querySelector("nav h1");
navHeading.addEventListener("click", () => {
  const nav = document.querySelector("nav");
  if (nav.classList.contains("open")) {
    nav.classList.remove("open");
  } else {
    nav.classList.add("open");
  }
});
