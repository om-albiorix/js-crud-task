let Data = JSON.parse(localStorage.getItem("myData")) || [];
let editIndex = -1; // Variable to store the index of the row being edited

window.onload = function () {
    listedData();
};

function handleSubmit(event) {
    event.preventDefault();

    let fName = document.getElementById("inputfname");
    let lName = document.getElementById("inputlname");
    let emailAdd = document.getElementById("inputemailadd");
    let mobileNo = document.getElementById("inputmobile");
    let birthDate = document.getElementById("inputdateofbirth");

    let spCha = "`~!@#$%^&*()_+|}{“:?>[],'’,./-=";

    if (
        fName.value == "" ||
        lName.value == "" ||
        emailAdd.value == "" ||
        mobileNo.value == "" ||
        birthDate.value == ""
    ) {
        alert("Please fill in all the fields");
    } else if (mobileNo.value.length > 10) {
        alert("Mobile No. should not exceed 10 digits");
    } else if (mobileNo.value.length < 10) {
        alert("Mobile No. should be at least 10 digits");
    } else if (!emailAdd.value.includes("@")) {
        alert("Email address is not valid");
    } else if (!isNaN(emailAdd.value[0]) || spCha.includes(emailAdd.value[0])) {
        alert(
            "Email address should not start with a number or a special character"
        );
    } else {
        let myData = JSON.parse(localStorage.getItem("myData")) || [];

        if (editIndex > -1) {
            // Update the existing row
            myData[editIndex] = {
                fname: fName.value,
                lname: lName.value,
                emailadd: emailAdd.value,
                mobileno: mobileNo.value,
                birthDate: birthDate.value,
            };
            
            editIndex = -1; // Reset the editIndex
        } else {
            // Insert a new row
            myData.push({
                fname: fName.value,
                lname: lName.value,
                emailadd: emailAdd.value,
                mobileno: mobileNo.value,
                birthDate: birthDate.value,
            });
        }

        localStorage.setItem("myData", JSON.stringify(myData));
        listedData();
        clearForm();
    }
}

function listedData() {
    let table = document.getElementById("information-list");

    if (table) {
        table.innerHTML = "";

        let myData = JSON.parse(localStorage.getItem("myData")) || [];

        let thead = table.createTHead();
        let row = thead.insertRow();
        row.innerHTML = `
      <th>First Name</th>
      <th>Last Name</th>
      <th>Email Address</th>
      <th>Mobile No.</th>
      <th>Birth Date</th>
      <th>Action</th>`;

        if (myData && myData.length > 0) {
            myData.forEach((item, index) => {
                let newRow = table.insertRow();
                newRow.innerHTML = `
          <td>${item.fname}</td>
          <td>${item.lname}</td>
          <td>${item.emailadd}</td>
          <td>${item.mobileno}</td>
          <td>${item.birthDate}</td>
          <td>
            <a class='btn btn-primary' onClick="onEdit(${index})">Edit</a>
            <a class='btn btn-danger' onClick="onDelete(${index})">Delete</a>
          </td>
        `;
                table.appendChild(newRow);
            });
        }
    }
}

function onDelete(index) {
    let myData = JSON.parse(localStorage.getItem("myData")) || [];
    myData.splice(index, 1);
    localStorage.setItem("myData", JSON.stringify(myData));
    listedData();
}

function clearForm() {
    document.getElementById("myForm").reset();
}

function onEdit(index) {
    let myData = JSON.parse(localStorage.getItem("myData")) || [];

    // Set the form fields with the data of the row being edited
    let item = myData[index];
    document.getElementById("inputfname").value = item.fname;
    document.getElementById("inputlname").value = item.lname;
    document.getElementById("inputemailadd").value = item.emailadd;
    document.getElementById("inputmobile").value = item.mobileno;
    document.getElementById("inputdateofbirth").value = item.birthDate;

    editIndex = index; // Set the editIndex to the current row index

    const addButton = document.getElementById("AddData");
    addButton.innerText = "Update Data";
    // addButton.removeEventListener("click", handleSubmit);
    // addButton.addEventListener("click", function () {
    //     handleUpdate(index);
    // });
}
