document.getElementById("cars").addEventListener("click", (event) => {
  if (event.target.classList.contains("more")) {
    const desc = event.target.parentElement.querySelector(".description");
    if (desc.style.display == "block") {
      desc.style.display = "none";
      event.target.textContent = "Show more details";
    } else {
      desc.style.display = "block";
      event.target.textContent = "Hide details";
    }
  }
});
