export const controllsConfiguration = () => {
    let controlls = document.createElement("div")
    controlls.classList.add("controlls");

    let controllsTitle = document.createElement("h2");
    controllsTitle.innerHTML = "Controlls";
    controllsTitle.style.color = "white";
    controllsTitle.style.marginBottom = "2rem"

    let upArrow = document.createElement("img");
    upArrow.style.width = "250px";
    upArrow.style.height = "120px";
    upArrow.src = "../src/img/controlesFlecha.png";
    controlls.append(controllsTitle, upArrow)

    return controlls;
}
