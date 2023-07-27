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
                <div class="dropdown-content">
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
    deleteTask = gorev_liste.findIndex(function(gorev){
        return gorev.id == id;
    });
    gorev_liste.splice(deleteTask, 1);
    displaytask();
}

