let main = document.createElement("main");
main.classList.add("container");

document.body.prepend(main);

let projectName = document.createElement("h1");
projectName.innerHTML = "Let's do it";
main.append(projectName);

let listBlock = document.createElement("div");
listBlock.className = "mainBlock";
main.append(listBlock);

let firsDiv = document.createElement("div");
listBlock.append(firsDiv);

let texIn = document.createElement("input");
texIn.className = "textIn";
texIn.setAttribute("placeholder", "Gonna do...");
firsDiv.append(texIn);

let setDate = document.createElement("input");
setDate.setAttribute("type", "date");
firsDiv.append(setDate);

let addBtn = document.createElement("button");
addBtn.innerHTML = "Add";
addBtn.id = "addBtn";
firsDiv.append(addBtn);

let list = document.createElement("ul");
listBlock.append(list);

let todos = localStorage.getItem('todos') == null
?[]
:[...JSON.parse(localStorage.getItem('todos'))]
  
const addTodo = () => {
  let newTask = texIn.value;
  let date = setDate.value;
  if (newTask != "") {
    todos.push({
      text:newTask,
      checked:false,
      date
    })
    localStorage.setItem('todos',JSON.stringify(todos))
renderTodoItem()
    texIn.value = "";
    setDate.value = "";
  }
};

const deleTodo = (e) => {
  e.currentTarget.parentNode.remove(e.parentNode);
};

const completeTodo = (e) => {
  // console.log(e.target.parentNode.)
  let todoTemporery = [...todos];
  let index =  parseInt(e.target.parentNode.id);
  console.log(index);
  // console.log(typeof parseInt(e.target.parentNode.id))
  // console.log(typeof e.target.parentNode.id)
  let objElement = todoTemporery[index].checked;
  todoTemporery[index].checked = !objElement;
  localStorage.setItem('todos', JSON.stringify(todoTemporery));
//   e.currentTarget.parentNode.classList.toggle("done");
  let isDone = e.currentTarget.parentNode.classList.contains("done");
// console.log(isDone);
  isDone
    ? e.currentTarget.parentNode.classList.remove("done")
    :e.currentTarget.parentNode.classList.add("done");
// e.currentTarget.parentNode.classList.toggle('done')
};

addBtn.addEventListener("click", addTodo);

const renderTodoItem = () => {
  list.innerHTML= ''
  todos.map((todo,id)=>{
    let li = document.createElement("li");
    li.className = todo.checked ? 'taskItem done': 'taskItem'
    li.id = id

    let doneBtn = document.createElement("img");
    doneBtn.src = "done-icon.png";
    doneBtn.className = "btn";
    doneBtn.addEventListener("click", completeTodo);

    let deleBtn = document.createElement("img");
    deleBtn.src = "delete-icon.png";
    deleBtn.className = "btn";
    deleBtn.addEventListener("click", deleTodo);

    let label = document.createElement("label");
    label.append(todo.text + '' + todo.date);
    li.append(label);
    li.append(doneBtn);
    li.append(deleBtn);

    list.prepend(li);
  })
}
renderTodoItem()