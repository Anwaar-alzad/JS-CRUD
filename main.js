let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');



// get total 
function getTotal(){
    if(price.value != null){
        let result = parseInt(+price.value+ +taxes.value + + ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green';
    }else{
        total.style.background = 'red';
    }
}

// this empties the array
// let dataPro = [];
let dataPro;
if(localStorage.product){
    //اذا الداتا ستوراج فيها داتا احفظلي اياها فالداتا برو
    dataPro = JSON.parse(localStorage.product)
}else{
    dataPro= []
}



submit.onclick = function () {
    // Validate required fields
    if (
        title.value.trim() !== '' &&
        price.value.trim() !== '' &&
        category.value.trim() !== '' &&
        total.innerHTML !== ''
    ) {
        let newPro = {
            title: title.value.trim(),
            price: price.value,
            taxes: taxes.value || 0,
            ads: ads.value || 0,
            discount: discount.value || 0,
            total: total.innerHTML,
            category: category.value.trim(),
            count: count.value || 1, // default to 1 if empty
        };

        if (mode === 'create') {
            // If count > 1, create multiple records
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }
        } else {
            dataPro[tempIndex] = newPro;
            mode = 'create';
            submit.innerHTML = 'Create';
        }

        localStorage.setItem('product', JSON.stringify(dataPro));
        clearData();
        showData();
    } else {
        alert("Please fill in required fields: Title, Price, Category.");
    }
};

// create product ✅
// save localstorage ✅
// clear inputs 
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// read

function showData() {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `<tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].count}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="deleteItem(${i})">Delete</button></td>
            <td><button onclick="updateItem(${i})">Update</button></td>
        </tr>`;               
    }
    // ✅ Now render it into the HTML
    document.getElementById('tbody').innerHTML = table;
}


// count
// delete
function deleteItem(index) {
    dataPro.splice(index, 1);
    localStorage.setItem('product', JSON.stringify(dataPro));
    showData();
}

// update
let mode = 'create';
let tempIndex; // to store index when updating

function updateItem(index) {
    title.value = dataPro[index].title;
    price.value = dataPro[index].price;
    taxes.value = dataPro[index].taxes;
    ads.value = dataPro[index].ads;
    discount.value = dataPro[index].discount;
    category.value = dataPro[index].category;
    count.value = dataPro[index].count;
    getTotal();

    mode = 'update';
    tempIndex = index;
    submit.innerHTML = 'Update';
}

// search

let searchMode = 'title';

function setSearchMode(id) {
    searchMode = id;
    let searchInput = document.getElementById('search');
    searchInput.placeholder = 'Search by ' + id;
    searchInput.focus();
    searchInput.value = '';
    showData(); // Refresh all before typing
}

document.getElementById('search').onkeyup = function () {
    searchData(this.value);
}

function searchData(value) {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMode === 'title') {
            if (dataPro[i].title.toLowerCase().includes(value.toLowerCase())) {
                table += buildRow(i);
            }
        } else {
            if (dataPro[i].category.toLowerCase().includes(value.toLowerCase())) {
                table += buildRow(i);
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

function buildRow(i) {
    return `<tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].count}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="deleteItem(${i})">Delete</button></td>
        <td><button onclick="updateItem(${i})">Update</button></td>
    </tr>`;
}

// clean data
