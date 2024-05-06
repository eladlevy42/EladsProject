let DoneJson, Done, listAsJson, list;
initTodoLocalStorage();
printList();
function initTodoLocalStorage() {
  if (localStorage.getItem("ToDoLst") == null) {
    localStorage.setItem("ToDoLst", "[]");
  }
  if (localStorage.getItem("Done") == null) {
    localStorage.setItem("Done", "[]");
  }
  DoneJson = localStorage.getItem("Done");
  Done = JSON.parse(DoneJson);
  listAsJson = localStorage.getItem("ToDoLst");
  list = JSON.parse(listAsJson);
}
function printList() {
  if (localStorage.getItem("ToDoLst") != "[]") {
    document.querySelector("#list").innerHTML = "Your To Do List: <br />";
    let counter = 0;
    list.sort();
    for (let i of list) {
      document.querySelector(
        "#list"
      ).innerHTML += `<li class="deleteItem" id = "item${counter}" onclick = "deleteItem(this)">${i}</li>`;
      counter++;
    }
  } else {
    document.querySelector("#list").innerHTML = "Your To Do List is Empty";
  }
}
function deleteItem(item) {
  list.sort();
  let deletedItem = item.textContent;
  let indexInLst = list.indexOf(deletedItem);
  Done.push(deletedItem);
  Done.sort();
  DoneJson = JSON.stringify(Done);
  localStorage.setItem("Done", DoneJson);
  list.splice(indexInLst, 1);
  listAsJson = JSON.stringify(list);
  localStorage.setItem("ToDoLst", listAsJson);
  printList();
}
function reset() {
  list = [];
  listAsJson = JSON.stringify(list);
  Done = [];
  DoneJson = JSON.stringify(Done);
  localStorage.setItem("ToDoLst", "[]");
  localStorage.setItem("Done", "[]");
  printList();
}
function addBtn() {
  let listItem = document.querySelector("#toDoItem").value;
  document.querySelector("#toDoItem").value = "";
  if (list == null) {
    list = [];
  }
  if (list.indexOf(listItem) == -1) {
    list.push(listItem);
    listAsJson = JSON.stringify(list);
    localStorage.setItem("ToDoLst", listAsJson);
    printList();
  }
}
