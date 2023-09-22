const addBtn = document.querySelector("#add");
const Title = document.querySelector("input");
const textarea = document.querySelector("textarea");
const notesContainer = document.querySelector("#notes");
const deleteBtn = document.querySelector("#deleteAll");

addBtn.addEventListener("click", () => {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    let notesObj = [];
    notesObj.push({ title: Title.value, note: textarea.value });
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
  } else {
    let notesObj = JSON.parse(localStorage.getItem("notes"));
    notesObj.push({ title: Title.value, note: textarea.value });
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
  }
});

function showNotes() {
  let notes = JSON.parse(localStorage.getItem("notes"));
  if (notes == null) {
    notesContainer.innerHTML = "<h1>Please Add Notes</h1>";
  } else {
    let notesObj = JSON.parse(localStorage.getItem("notes"));
    if (notesObj.length == 0) {
      notesContainer.innerHTML = "<h1>No Notes Present, Please Add Notes</h1>";
    } else {
      let html = "";
      notesObj.forEach((element, index) => {
        let notesCard = `
                <div class="card m-2" style="width: 18rem">
            <div class="card-body">
              <h5 class="card-title">${element.title}</h5>
              <p class="card-text">
                ${element.note}
              </p>
              <a href="#" class="btn btn-outline-danger btn-lg" onclick="Delete(this.id)" id="${index}">Delete</a>
            </div>
          </div>`;
        html = html + notesCard;
      });
      notesContainer.innerHTML = html;
    }
  }
}

deleteBtn.addEventListener("click", () => {
  localStorage.clear();
  showNotes();
});

function Delete(id) {
  let notesObj = JSON.parse(localStorage.getItem("notes"));
  notesObj.splice(id, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}
