let gorev_liste = [
    {"id": 1, "gorevadi": "görev 1"}, 
    {"id": 2, "gorevadi": "görev 2"}, 
    {"id": 3, "gorevadi": "görev 3"}, 
    {"id": 4, "gorevadi": "görev 4"}, 
];

let edit_id;
let is_edit_task = false;
let task_input = document.querySelector("#txt_task_name");

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
                    <button onclick='edit_task(${gorev.id}, "${gorev.gorevadi}")' type="button" class="btn-dropdown-secondary-rename btn-dropdown-secondary"><i class="fa-solid fa-pen"></i> rename</button>
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
        e.preventDefault(); // sayfanın yenilenmesini engeller
    }
});

function newTask(event){
    event.preventDefault(); // sayfanın yenilenmesini engeller


    if(task_input.value === ""){
        alert("Lütfen görev adını belirleyin...");
    } else{
        if(!is_edit_task){
            // * görev ekelenecek alan
            gorev_liste.push({"id": gorev_liste.length + 1, "gorevadi": task_input.value});
        } else{
            // * güncelleme yapılacak alan
            for(let gorev of gorev_liste){
                if(gorev.id == edit_id){ 
                    gorev.gorevadi = task_input.value;
                }
                is_edit_task = false;
            }
        }
        task_input.value = "";
        is_empty();
        displaytask();
    }
}

// ! edit bölümü
function edit_task(task_id, task_name){
    edit_id = task_id;
    is_edit_task = true;
    task_input.value = task_name;
    task_input.focus();

    console.log("edit id : ", edit_id);
    console.log("is edit mod : ", is_edit_task);

}

// ! temizleme bölünü
document.querySelector("#btn_clear").addEventListener("click", alldelete);
function alldelete(){
    gorev_liste.splice(0);

    is_empty();

    displaytask();
}

// ! silme bölümü
function delete_task(id){
    let deleteTask;
    deleteTask = gorev_liste.findIndex(function(gorev){
        return gorev.id == id;
    });
    gorev_liste.splice(deleteTask, 1);
    is_empty();
    displaytask();
}

function is_empty() {
    let cont = document.getElementById("card-task-header");

    if (gorev_liste.length === 0) {
        let h4 = `
        <h4 class="empty_alert_mesage" id="empty_alert_mesage">hmm... empty</h4>
        `;

        cont.insertAdjacentHTML("afterbegin", h4);
    } else {
        // "empty_alert_mesage" sınıfına sahip elementi seçelim
        let existingMessage = document.querySelector(".empty_alert_mesage");
        if (existingMessage) {
            existingMessage.remove();
        }
    }
}
