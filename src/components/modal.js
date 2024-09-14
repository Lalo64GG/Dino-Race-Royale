let modal = document.getElementById("modal");
let modalTitle = document.getElementById("modalTitle");
let modalContent = document.getElementById("modal-content");

export const createModalConfiguration = () => {
    modal.style.display = "block";   
    modal.style.opacity = "1";       
    modal.style.pointerEvents = "auto";
    modal.style.padding = " 0rem 3rem"

    modalTitle.innerHTML = "Configuration";


    let musicConfiguration = document.createElement("div")
    musicConfiguration.classList.add("configuration");


    let titleMusic  = document.createElement("h2");
    titleMusic.innerHTML = "Music Configuration";
    titleMusic.style.color = "white"
    titleMusic.style.marginBottom = "2rem"

    
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    checkbox.id = "music-config";
    
    
    let label = document.createElement("label");
    label.innerHTML = "On/Off Music";
    label.classList.add("label");
    label.setAttribute("for", "music-config");

    let li = document.createElement("li");
    li.style.listStyle = "none"
    li.append( checkbox, label);

    musicConfiguration.append(titleMusic,li);

    let controlls = document.createElement("div")
    controlls.classList.add("controlls");

    let controllsTitle = document.createElement("h2");
    controllsTitle.innerHTML = "Controlls";
    controllsTitle.style.color = "white";
    controllsTitle.style.marginBottom = "2rem"

    let img = document.createElement("img");
    img.style.width = "250px";
    img.style.height = "120px";
    img.src = "../src/img/controlesFlecha.png";
    controlls.append(controllsTitle, img)

    modalContent.innerHTML = ''; 
    modalContent.append(musicConfiguration, controlls); 
}
