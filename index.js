// let fName = document.getElementById("inputfname");
// let lName = document.getElementById("inputlname");
// let emailAdd = document.getElementById("inputemailadd");
// let mobileNo = document.getElementById("inputmobile");
// let birthDate = document.getElementById("inputdateofbirth");
// let Data = [];

// let handleSubmit = (event) => {
//     event.preventDefault();
//     let spCha = "` ~! @ # $ % ^ & * ( ) _ + | } { “ : ? > < [ ]  ; ’ , . / - =";

//     if (
//         fName.value == "" ||
//         lName.value == "" ||
//         emailAdd.value == "" ||
//         mobileNo.value == "" ||
//         birthDate.value == ""
//     ) {
//         alert("Please fill the blank");
//     } else if (mobileNo.value.length > 10) {
//         alert("Mobile No are not valid greater than 10");
//     } else if (mobileNo.value.length < 10) {
//         alert("Mobile no. are not valid less than 10");
//     } else if (!emailAdd.value.includes("@")) {
//         alert("Email address are not valid");
//     } else if (!isNaN(emailAdd.value[0]) || spCha.includes(emailAdd.value[0])) {
//         alert(
//             "Email address should not start with a number or a special character"
//         );
//     } else {
//         Data.push({
//             fname: fName.value,
//             lname: lName.value,
//             emailadd: emailAdd.value,
//             mobileno: mobileNo.value,
//             birthDate: birthDate.value,
//         });
//         localStorage.setItem("myData", JSON.stringify(Data));
//         listedData();
//         return true;
//     }
// };

// window.onload = listedData();

// function listedData() {
//     let newrow = null;
//     let myData = JSON.parse(localStorage.getItem("myData"));
//     console.log(myData)
//     let table = document.getElementById("information-list");
//     newrow = table.insertRow(table.length);
//     myData.slice(myData.length - 1, myData.length).map((item,index) => {
//         cell1 = newrow.insertCell(0);
//         cell1.innerHTML = item.fname;
//         cell2 = newrow.insertCell(1);
//         cell2.innerHTML = item.lname;
//         cell3 = newrow.insertCell(2);
//         cell3.innerHTML = item.emailadd;
//         cell4 = newrow.insertCell(3);
//         cell4.innerHTML = item.mobileno;
//         cell5 = newrow.insertCell(4);
//         cell5.innerHTML = item.birthDate;
//         cell6 = newrow.insertCell(5);
//         cell6.innerHTML = `<a class='btn btn-primary' onClick="onEdit(this)">Edit</a>
//     <a class='btn btn-danger' onClick="onDelete(myData)">Delete</a>`})
// }
// function onDelete() {
//     myData.splice(index, 1)
//     console.log(myData)
// }

// // let showData = " ";
// // function listedData() {
// //     let myData = JSON.parse(localStorage.getItem("myData"));
// //     myData.forEach(function (element, index) {
// //         showData += "<tr>";
// //         showData += "<td>" + element.fname + "</td>";
// //         showData += "<td>" + element.lname + "</td>";
// //         showData += "<td>" + element.emailadd + "</td>";
// //         showData += "<td>" + element.mobileno + "</td>";
// //         showData += "<td>" + element.birthDate + "</td>";
// //         showData += '<td><button onclick="deleteData(' + index + ')" class="btn btn-danger">Delete</button><button onclick=""updateData(' + index + ') class="btn btn-primary">Edit</button></td>';
// //         showData += "</tr>";
// //     });
// //     document.getElementById("information-list").innerHTML = showData;
// // }




let Data = JSON.parse(localStorage.getItem("myData")) || [];

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
        myData.push({
            fname: fName.value,
            lname: lName.value,
            emailadd: emailAdd.value,
            mobileno: mobileNo.value,
            birthDate: birthDate.value,
        });
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
                        <a class='btn btn-primary' id="editData" onClick="onEdit(${index})">Edit</a>
                        <a class='btn btn-danger'  onClick="onDelete(${index})">Delete</a>
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
// document.getElementById("editData").addEventListener('click',)

function onEdit(index) {
    let myData = JSON.parse(localStorage.getItem("myData")) || [];
    myData.map((ele, i) => {
        if (index == i) {
            document.getElementById("inputfname").value = ele.fname;
            document.getElementById("inputlname").value = ele.lname;
            document.getElementById("inputemailadd").value = ele.emailadd;
            document.getElementById("inputmobile").value = ele.mobileno;
            document.getElementById("inputdateofbirth").value = ele.birthDate;
        }
    })
}

