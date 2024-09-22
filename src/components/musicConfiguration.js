export const musicConfiguration = () => {
    let musicConfiguration = document.createElement("div")
    musicConfiguration.style.marginTop ="0.1rem"
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
    return musicConfiguration;
}

  
