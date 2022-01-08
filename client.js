window.onload = function() {
    fetchData();
}

function fetchData() { 
    fetch("/data").
        then(res => res.json()).
        then(res => dataToTable(JSON.parse(res)))
}

function dataToTable(data) {
    let table = document.getElementById('tbody');
    for (let element of data) {
        let entry_arr = [];
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            entry_arr.push(element[key]);
            cell.appendChild(text);
        }
        let btn_cell = row.insertCell(0);
        btn_cell.style.paddingRight = '10px';
        createBtnCell(btn_cell, entry_arr);
    }
}

function createBtnCell(cell, entry_arr) {
    let btn = document.createElement('button')
    btn.innerHTML = "Edit";
    btn.onclick = function() {
        localStorage.setItem('entry', JSON.stringify(entry_arr));
        location.href = '/editHTML';
    }
    cell.appendChild(btn); 
}

