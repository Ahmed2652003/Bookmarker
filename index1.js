var bookmarkName = document.getElementById("bookmarkName")
var bookmarkURL = document.getElementById("bookmarkURL")
var bodyHTML = document.getElementById("tBody");
var boxAlert = document.getElementById("box-alert")
var closeBtn = document.getElementById("closeBtn")


var list = []
var index;


if (localStorage.getItem("allWebsites") != null) {
    list = JSON.parse(localStorage.getItem("allWebsites"))
    display(list);
}

function clearForm() {
    bookmarkName.value = "";
    bookmarkURL.value = "";
    bookmarkName.classList.remove("is-valid")
    bookmarkURL.classList.remove("is-valid")
}


bookmarkName.addEventListener("keyup", function () {
    if (validateName()) {
        bookmarkName.classList.add("is-valid")
        bookmarkName.classList.remove("is-invalid")
    }
    else {
        bookmarkName.classList.add("is-invalid")
        bookmarkName.classList.remove("is-valid")
    }
})


bookmarkURL.addEventListener("keyup", function () {
    if (validateURL()) {
        bookmarkURL.classList.add("is-valid")
        bookmarkURL.classList.remove("is-invalid")
    }
    else {
        bookmarkURL.classList.add("is-invalid")
        bookmarkURL.classList.remove("is-valid")
    }
})

function addBookmark() {

    if (validateName() && validateURL() && bookmarkName.value != "" && bookmarkURL.value != "") {
        var userInput = {
            Name: bookmarkName.value,
            URL: bookmarkURL.value
        }
        list.push(userInput)
        localStorage.setItem("allWebsites", JSON.stringify(list))
        display(list)
        clearForm()
    }
    else {
        boxAlert.classList.replace("d-none", "d-block")
    }

}

function display() {
    var cartonaa = ``;
    for (var i = 0; i < list.length; i++) {
        cartonaa += `
        <tr>
        <td>${i + 1}</td>
        <td >${list[i].Name}</td>
        <td><a href="${list[i].URL}" target="_blank" onclick="" class="btn-visit btn-sm btn ">
        <i class="fa-solid fa-eye pe-1"></i>
        Visit</a></td>
        <td class=""><button onclick="Delete(${i})" class="btn  btn-sm btn delete-btn ">
        <i class="fa-solid fa-trash-can pe-1"></i>
        Delete</button></td>
        </tr>
        `
    }
    bodyHTML.innerHTML = cartonaa;
}

function Delete(index) {
    list.splice(index, 1)
    localStorage.setItem("allWebsites", JSON.stringify(list))
    display(list)
}

function validateName() {
    var regex = /^([a-z]|[A-Z]){2,10}$/
    return regex.test(bookmarkName.value)
}
function validateURL() {
    var urlRegex = /^https?:\/\/(?:[-\w]+\.)?([-\w]+)\.[a-z]{2,}(?:\.[a-z]{2})?\/?.*$/
    return urlRegex.test(bookmarkURL.value)
}


closeBtn.addEventListener("click", function () {
    boxAlert.classList.replace("d-block", "d-none")
})