export const userContent = () => {
  let userNameContent = document.createElement("div");

  if(localStorage.getItem('userName') !== null) {
    userNameContent.style.display = "none";
    return userNameContent;
  }

  let userName;
 
  userNameContent.style.backgroundColor = "#F1EDED";
  userNameContent.style.display = "flex";
  userNameContent.style.alignItems = "center";
  userNameContent.style.justifyContent = "center";
  userNameContent.style.flexDirection = "column";
  userNameContent.style.height = "150px";
  userNameContent.style.width = "300px";
  userNameContent.style.borderRadius = "10px";
  userNameContent.style.padding = "1rem";
  userNameContent.style.opacity = "2";
  userNameContent.style.zIndex = "9999999";
  userNameContent.style.position = "fixed";

  const titleUserNameTitlte = document.createElement("h2");
  titleUserNameTitlte.innerHTML = "Please create your username";
  titleUserNameTitlte.style.fontWeight = "normal";

  let userNameInput = document.createElement("input");

  userNameInput.style.width = "100%";
  userNameInput.style.marginTop = "1rem";
  userNameInput.style.border = "1px solid #ccc";
  userNameInput.style.borderRadius = "8px";
  userNameInput.style.padding = "0.75rem 0";
  userNameInput.style.fontSize = "1rem";
  userNameInput.style.color = "#333";
  userNameInput.style.outline = "none";
  userNameInput.style.transition = "all 0.3s ease";
  userNameInput.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";

  // Estilo al hacer focus
  userNameInput.addEventListener("focus", () => {
    userNameInput.style.boxShadow = "0 4px 15px rgba(0,0,0,0.3)";
    userNameInput.style.borderColor = "#007bff";
  });

  userNameInput.addEventListener("blur", () => {
    userNameInput.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    userNameInput.style.borderColor = "#ccc";
  });

  let button = document.createElement("button");
  button.innerHTML = "Accept";
  button.style.backgroundColor = "#0056b3";
  button.style.margin = "1rem";
  button.classList.add("button");

  button.addEventListener("click", () => {
    if (userNameInput.value === "") {
      return;
    }
    userName = userNameInput.value;
    localStorage.setItem("userName", userName);
    userNameContent.style.display = "none";
  });

  userNameContent.append(titleUserNameTitlte, userNameInput, button);
  return userNameContent;
};
