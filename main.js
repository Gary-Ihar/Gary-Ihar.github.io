const form = document.querySelectorAll("form"),
  windowChatUser = document.querySelectorAll(".window"),
  textarea = document.querySelectorAll("textarea");
form.forEach((form) =>
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (form.firstChild.nextSibling.value !== "") {
      render(form.firstChild.nextSibling.value.split(/\n/g), e.target.id); // теперь передам массив разбитый по enter
      textarea.forEach((textarea) => (textarea.value = ""));
    }
  })
);
function render(message, userId) {
  if (message.length === 1) {
    // если абзацев нет, то все штатно
    windowChatUser.forEach((wind) => {
      const { div, p } = createdElementDivAndP(userId);
      p.textContent = message[0];
      makeLastStep(wind, p, div);
    });
  } else {
    windowChatUser.forEach((wind) => {
      const { div } = createdElementDivAndP(userId);
      for (let i = 0; i < message.length; i++) {
        if (i === message.length - 1 && message[message.length - 1] === "") {
          // если после "абзаца" ничего нет(пустая строка)
        } else {
          const { p } = createdElementDivAndP(userId);
          p.textContent = message[i];
          makeLastStep(wind, p, div);
        }
      }
    });
  }
}
function createdElementDivAndP(id) {
  const p = document.createElement("p");
  const div = document.createElement("div");
  if (id === "user1") {
    p.classList = "text-right";
    div.classList = "bg-color";
  }
  return { p, div };
}
function makeLastStep(wind, p, div) {
  div.append(p);
  wind.append(div);
  wind.scrollTop = wind.scrollHeight;
}
