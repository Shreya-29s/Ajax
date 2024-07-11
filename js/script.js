
var userId;
var xhttp = new XMLHttpRequest();
var table ;
window.onload = function () {
  alert("edit the data and click edit ");
  var userPlus = document.getElementById("addUser");
  var addModal = document.getElementById("modalAddUser");
 

  userPlus.addEventListener("click", () => {
    addModal.classList.add("show");
    addModal.style.display = "block";
  });

  window.addEventListener("click", (event) => {
    if (event.target == addModal) {
      addModal.style.display = "none";
    }
  });

  displayUser();
  table= document.querySelector("table");
};

function displayUser() {
  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const userData = JSON.parse(this.responseText);
      tableUser(userData);
    }
  };

  xhttp.open("GET", "https://65f720ceb4f842e8088527c2.mockapi.io/api/employee/User", true);
  xhttp.send();
}

function tableUser(data) {
  const tbody = document.querySelector("table");
  tbody.innerHTML = "";
  const headerRow = document.createElement("tr");
  const fullnameHeader= document.createElement("th");
  fullnameHeader.textContent = "Name";
  const ageHeader = document.createElement("th");
  ageHeader.textContent = "Age";
  const mobileHeader = document.createElement("th");
  mobileHeader.textContent = "State";
  const functionHeader = document.createElement("th");
  functionHeader.textContent = "Function";
  headerRow.appendChild(fullnameHeader);
  headerRow.appendChild(ageHeader);
  headerRow.appendChild(mobileHeader);
  headerRow.appendChild(functionHeader);
  headerRow.style.backgroundcolor = "grey";
  tbody.appendChild(headerRow);

  data.forEach((user) => {
      const row = document.createElement("tr");
      row.dataset.id = user.id;
      row.innerHTML = ` 
      <tr class="user" data-id="${user.id}" id="editModal${user.id}">
        <td><input type="text" name="name" value="${user.Name}" class="name" /></td> 
        <td><input type="number" name="age" value="${user.Age}" class="age" /></td> 
        <td><input type="text" name="state" value="${user.State}" class="state"/></td> 
        <td id="buttonss">
          <button class="edit" onclick="editUser(${user.id})" id="editButton${user.id}">
            <i class="fa-solid fa-pen-clip"></i>Edit
          </button><button class="deleteB" onclick="deleteUser(${user.id})">
            <i class="fa-solid fa-trash-can"></i>Delete
          </button><button class="saveEditButton" style="display: none;" id="saveEditButton${user.id}">
            Save
          </button>
        </td> 
      </tr>`;
      tbody.appendChild(row);
  });
  displayUser();
}
function showSaveEditButton() {
  var editButton = document.getElementById("edit");
  var saveEditButton = document.getElementById("saveEditButton");

  editButton.addEventListener("click", () => {
    // Hide the edit button
    editButton.style.display = "none";

    // Show the save button
    saveEditButton.style.display = "inline-block";

    // Show the delete button
    deleteButton.style.display = "inline-block";
  });
  
}

//const table = document.querySelector('table'); // replace with the actual selector for your table
const buttons = table.querySelectorAll('button');

for (const button of buttons) {
  button.addEventListener("click", () => {
    const userId = button.closest('tr').dataset.id;
    editUser(userId);
  });
}
function editUser(userId) {
  const editModal = document.querySelector(`tr[data-id="${userId}"]`);
  const editButton = document.getElementById(`editButton${userId}`);
  const saveButton = document.getElementById(`saveEditButton${userId}`);

  if (editButton.style.display === "none") {
    editButton.style.display = "inline-block";
    saveButton.style.display = "none";
  } else {
    editButton.style.display = "none";
    saveButton.style.display = "inline-block";

    saveButton.addEventListener("click", () => {
      const updatedName = editModal.querySelector(".name").value;
      const updatedAge = editModal.querySelector(".age").value;
      const updatedState = editModal.querySelector(".state").value;

      const xhr = new XMLHttpRequest();
      xhr.open("PUT", `https://65f720ceb4f842e8088527c2.mockapi.io/api/employee/User/${userId}`, true);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onload = () => {
        if (xhr.status === 200) {
          console.log("User updated successfully!");
          const rowToUpdate = editModal.parentNode;
          rowToUpdate.querySelector(".name").value = updatedName;
          rowToUpdate.querySelector(".age").value = updatedAge;
          rowToUpdate.querySelector(".state").value = updatedState;
        } else {
          console.error("Error updating user:", xhr.responseText);
        }
      };
xhr.send(JSON.stringify({ Name: updatedName, Age: updatedAge, State: updatedState }));

      editButton.style.display = "inline-block";
      saveButton.style.display = "none";
    });
  }
}
function deleteUser(userId) {
  const modal = document.getElementById("deleteModal");
  modal.classList.add("show");
  modal.style.display = "block";

  const cancelDelete = document.querySelectorAll(".deleteCancel");
  cancelDelete.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  });

  const confirmDelete = document.querySelector(".confirmDelete");
  confirmDelete.addEventListener("click", () => {
    modal.style.display = "none";

    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", `https://65f720ceb4f842e8088527c2.mockapi.io/api/employee/User/${userId}`, true);
    xhr.onload = () => {
      if (xhr.status === 200) {
        console.log("User deleted successfully!");
        displayUser();
      } else {
        console.error("Error deleting user:", xhr.responseText);
      }
    };
    xhr.send();
  });
}


function addUser() {
  var nameInput = document.getElementById("inputName");
  var ageInput = document.getElementById("inputAge");
  var stateInput = document.getElementById("inputState");
  if(nameInput.value!== "" && ageInput.value!== ""   && stateInput!== "" ){
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://65f720ceb4f842e8088527c2.mockapi.io/api/employee/User", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = () => {
    if (xhr.status === 201) {
      console.log("User added successfully!");
    } else {
      console.error("Error adding user:", xhr.responseText);
    }
  };

  xhr.send(JSON.stringify({ Name: nameInput.value, Age: ageInput.value, State: stateInput.value }));

  nameInput.value = "";
  ageInput.value = "";
  stateInput.value = "";
  displayUser();
  var display1=document.getElementById("addUserForm");
  display1.classList.remove("show");
  display1.style.display="none";
  display1.style.border="none";
  display1.style.background="transparent";
  alert("User added successfully ");
}
}
