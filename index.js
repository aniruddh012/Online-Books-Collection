console.log("js file is ready");

class Display {
    add(book) {
        // console.log("Adding to UI");
        let tableBody = document.getElementById('tableBody');
        let notify ="<p>You don't have any book, please add a Book to show here.</p>";
        if(tableBody.innerHTML==notify){
            tableBody.innerHTML = "";
        }
        let uiString = `<tr>
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.type}</td>
                            <td><button class="deleteBtn btn btn-primary">Delete</button></td>
                        </tr>`;
        tableBody.innerHTML += uiString;
    }

    clear() {
        let libForm = document.getElementById('libForm');
        libForm.reset();
    }

    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        }
        else {
            return true;
        }
    }
}

class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
};

function getData() {
    let display = new Display();
    let allData = JSON.parse(localStorage.getItem("data"));
    console.log(allData)
    if (allData.length>0) {
        Array.from(allData).forEach((elem) => {
            let book = new Book(elem[0], elem[1], elem[2]);
            display.add(book);
            display.clear();
        })
       
    }
    else {
        let tableBody = document.getElementById('tableBody');
        let notify ="<p>You don't have any book, please add a Book to show here.</p>";
        tableBody.innerHTML= notify;
    }
}
 getData();


function setData(book) {
    let allData = JSON.parse(localStorage.getItem("data"));
    if (allData.length >0) {
        
    }
    else {
        data = allData;
    }
    let bData = [];
    bData.push(book.name);
    bData.push(book.author);
    bData.push(book.type);
    data.push(bData);
    localStorage.setItem("data", JSON.stringify(data));
}

let libForm = document.getElementById("libForm");
libForm.addEventListener('submit', (e) => {
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let commics = document.getElementById('commics');

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (commics.checked) {
        type = commics.value;
    }

    let book = new Book(name, author, type);
    // console.log(book);

    let display = new Display();

    if (display.validate(book)) {
        display.add(book);
        display.clear();
        setData(book);
    }

    e.preventDefault();
})

let deleteBtn = document.getElementsByClassName("deleteBtn");
Array.from(deleteBtn).forEach((elem, index) => {
    elem.addEventListener('click', (e) => {
        console.log(e.target.parentNode.parentNode)
        let allData = JSON.parse(localStorage.getItem("data"));
        if (allData == null) {
        }
        else {
            allData.splice(index, 1);
        localStorage.setItem("data", JSON.stringify(allData));
        location.reload();
        }
        
    })
})
