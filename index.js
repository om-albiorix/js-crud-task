const handleSubmit = (event) => {
    event.preventDefault();
    let fName = document.getElementById("inputfname").value;
    let lName = document.getElementById("inputlname").value;
    let emailAdd = document.getElementById("inputemailadd").value;
    let mobileNo = document.getElementById("inputmobile").value;
    let birthDate = document.getElementById("inputdateofbirth").value;
    let spCha = "` ~! @ # $ % ^ & * ( ) _ + | } { “ : ? > < [ ]  ; ’ , . / - =";
    let data = [];

    if (
        fName == "" ||
        lName == "" ||
        emailAdd == "" ||
        mobileNo == "" ||
        birthDate == ""
    ) {
        alert("please fill the blank");
    } else if (mobileNo.length > 10) {
        console.log(mobileNo.length);
        alert("mono. are not valid greater than 10");
    } else if (mobileNo.length < 10) {
        alert("mono. are not valid less than 10");
    } else if (!emailAdd.includes("@")) {
        alert("plaese use @");
    }
    else if (!isNaN(emailAdd[0]) || spCha.includes(emailAdd[0])) {
        alert("emailadd. should not start with a number or a special character");
    } else {
        let myObj = {
            fName, lName, emailAdd, mobileNo, birthDate
        };
        data.push(myObj);
        localStorage.setItem("myData", JSON.stringify(data));
        console.log(data);
    }
};
