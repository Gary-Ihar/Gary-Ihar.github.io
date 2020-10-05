const form = document.querySelectorAll("form"),
  windowChatUser = document.querySelectorAll(".test"),
  input = document.querySelectorAll("input");
form.forEach((form) =>
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (form.firstChild.nextSibling.value != "") {
      render(form.firstChild.nextSibling.value, e.target.id);
      input.forEach((input) => (input.value = ""));
    }
  })
);
function render(message, userId) {
  windowChatUser.forEach((wind) => {
    const p = document.createElement("p");
    if (userId === "user1") p.classList = "text-right";
    p.textContent = message;
    wind.append(p);
    wind.scrollTop = wind.scrollHeight;
  });
}
