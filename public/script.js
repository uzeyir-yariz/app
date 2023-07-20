let gorev_liste = [
    {"id": 1, "gorevadi": "görev 1"}, 
    {"id": 2, "gorevadi": "görev 2"}, 
    {"id": 3, "gorevadi": "görev 3"}, 
    {"id": 4, "gorevadi": "görev 4"}, 
];

displaytask();
function displaytask(){
    let ul = document.getElementById("task-list");

    ul.innerHTML = "";

    for(let gorev of gorev_liste){
        let li = `
        <li class="task">
            <div class="form-check">
                <input type="checkbox" name="${gorev.id}" id="${gorev.id}" class="form-check-input">
                <label for="${gorev.id}" class="form-check-label">${gorev.gorevadi}</label>
            </div>
            <div class="dropdown">
                <button type="button" class="btn-dropdown-primary"><i class="fa-solid fa-ellipsis"></i></button>
                <div class="dropdown-content dropdown-content-deactive">
                    <button onclick="delete_task(${gorev.id})" type="button" class="btn-dropdown-secondary-delete btn-dropdown-secondary"><i class="fa-solid fa-trash"></i> delete</button>
                    <button type="button" class="btn-dropdown-secondary-rename btn-dropdown-secondary"><i class="fa-solid fa-pen"></i> rename</button>
                </div>
            </div>
        </li>
        `;

        ul.insertAdjacentHTML("beforeend", li);
    }
}

// ! ekleme bölümü
document.querySelector("#btn_Add_new_task").addEventListener("click", newTask);
document.querySelector("#txt_task_name").addEventListener("keypress", function(e){
    if(event.key == "Enter"){
        document.getElementById("btn_Add_new_task").click();
        e.preventDefault(); // Sayfanın yenilenmesini engelle
    }
});

function newTask(event){
    event.preventDefault(); // Sayfanın yenilenmesini engelle
    close_dropdown_contents();

    let task_input = document.querySelector("#txt_task_name");

    if(task_input.value === ""){
        alert("Lütfen görev adını belirleyin...");
    } else{
        gorev_liste.push({"id": gorev_liste.length + 1, "gorevadi": task_input.value});
        task_input.value = "";
        displaytask();
    }
}

// ! temizleme bölünü
document.querySelector("#btn_clear").addEventListener("click", alldelete);
function alldelete(){
    gorev_liste.splice(0);
    displaytask();
}

// ! silme bölümü
function delete_task(id){
    let deleteTask;
    /* for(let index in gorev_liste){
        if(gorev_liste[index].id == id){
            deleteTask = index;
        }
    } */
    deleteTask = gorev_liste.findIndex(function(gorev){
        return gorev.id == id;
    });
    gorev_liste.splice(deleteTask, 1);
    displaytask();
}


// ! dropdown bölümü açma kapam yeri
const dropdown_btns = document.querySelectorAll(".btn-dropdown-primary"); // dropdown düğmelerini seçiyor
const dropdown_contents = document.querySelectorAll(".dropdown-content"); // dropdown içeriklerini seçiyor

// dropdown içeriklerini kapatan fonksiyon
function close_dropdown_contents(){
    dropdown_contents.forEach(function(content){
        if(content.classList.contains("dropdown-content-active")){
            content.classList.remove("dropdown-content-active");
            content.classList.add("dropdown-content-deactive");
        }
    });
}

// her düğme için bir olay dinleyici
dropdown_btns.forEach(function(btns) {
    btns.addEventListener("click", function(e){
        e.stopPropagation(); // * Dropdown düğmesine tıklanıldığında tıklama olayını durdur

        const dropdown_content = this.nextElementSibling;

        if(dropdown_content.classList.contains("dropdown-content-deactive")){
            close_dropdown_contents();
            dropdown_content.classList.remove("dropdown-content-deactive");
            dropdown_content.classList.add("dropdown-content-active");
        } else{
            dropdown_content.classList.remove("dropdown-content-active");
            dropdown_content.classList.add("dropdown-content-deactive");
        }
    });
});

// * eğer herhangi bir yere basılırsa dropdown menüsü kapanacak
document.addEventListener("click", function(){
    close_dropdown_contents();
});