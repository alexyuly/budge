heading = document.querySelector("h1");

heading.addEventListener("click", () => {
  if (document.body.classList.contains("menu-open")) {
    document.body.classList.remove("menu-open");
  } else {
    document.body.classList.add("menu-open");
  }
});
