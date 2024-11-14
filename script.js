
let taskField = document.querySelector(".get-task")
let taskDiv = document.querySelector(".task-div")
let searchBar = document.querySelector(".search-bar")
let time = 0;


showTasks();
function addTaskToStorage(taskName) {

    let list = window.localStorage.getItem("key");
    if (list == undefined || list == null)
        window.localStorage.setItem("key", JSON.stringify([]));

    list = JSON.parse(window.localStorage.getItem("key"));
    list.push({ name: taskName, mark: "unmarked" });
    window.localStorage.setItem("key", JSON.stringify(list));


}
function getTaskFromStorage() {
    let list = JSON.parse(window.localStorage.getItem("key"));
    return list;

}


function addTaskBtn() {
    let taskValue = taskField.value;

    addTaskToStorage(taskValue);
    window.location.reload();
}

function deleteTask(idx) {
    let list = getTaskFromStorage();
    list.splice(idx, 1);

    window.location.reload();
    window.localStorage.setItem("key", JSON.stringify(list));


}
function editTask(idx) {
    let list = getTaskFromStorage();
    list.splice(idx, 1);
    // window.alert("Task has been deleted")
    window.location.reload();
    window.localStorage.setItem("key", JSON.stringify(list));


}
function markOrUnmarkTask(idx) {
    let list = getTaskFromStorage();
    list[idx].mark = (list[idx].mark == "marked") ? "unmarked" : "marked"
    window.alert("Task has been marked")
    window.location.reload();
    window.localStorage.setItem("key", JSON.stringify(list));


}
function searchTask() {
    let search = searchBar.value;

    let task_list = document.querySelector(".task-list");
    if (task_list != undefined && task_list != null)
        taskDiv.removeChild(task_list)
    // window.location.reload();
    console.log(search)
    let list = getTaskFromStorage();
    let ul = document.createElement("ul");
    ul.classList.add("task-list");
    document.querySelector(".task-div").appendChild(ul);
    list.forEach((task, idx) => {
        let taskname = task.name.toLowerCase();
        search = search.toLowerCase();
        // console.log(taskname,search,taskname.includes(search))
        if (taskname.includes(search)) {

            let li = document.createElement("li");
            li.style.backgroundColor = "red";
            let div = `
            
                <div style="display: flex;align-items: center;justify-content: space-between;padding-inline:10px">
                    <p class="">${task.name}</p>
                    <div>
                
                        <button onclick="deleteTask(${idx})">Delete</button>
                        <button onclick="markOrUnmarkTask(${idx})">${(task.mark == 'marked') ? "Click to Unmark" : "Click to mark"}</button>
                    </div>
                </div>
            `
            li.innerHTML = div;
            ul.append(li)
        }


    })



}
function showTasks(filter) {
    let task_list = document.querySelector(".task-list");
    if (task_list != undefined && task_list != null) {
        taskDiv.removeChild(task_list)
    }
    let list = getTaskFromStorage();
    let ul = document.createElement("ul");
    ul.classList.add("task-list");
    document.querySelector(".task-div").appendChild(ul);
    list.forEach((task, idx) => {
        if (filter == task.mark || filter == "all" || filter == undefined) {



            let li = document.createElement("li");
            li.style.backgroundColor = "red";
            let div = `
            
                <div style="display: flex;align-items: center;justify-content: space-between;padding-inline:10px">
                    <p class="">${task.name}</p>
                    <div>
                
                        <button onclick="deleteTask(${idx})">Delete</button>
                        <button onclick="markOrUnmarkTask(${idx})">${(task.mark == 'marked') ? "Click to Unmark" : "Click to mark"}</button>
                    </div>
                </div>
            `
            li.innerHTML = div;
            ul.append(li)
        }

    })



}

