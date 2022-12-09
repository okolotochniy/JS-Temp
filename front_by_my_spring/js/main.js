import {Howl} from "/node_modules/howler/dist/howler.js"
const buttonPlay = document.getElementById('play')
buttonPlay.addEventListener('click', playSound)

function playSound() {
    const sound = new Howl({src: ['front_by_my_spring/sound/ramzan.mp3']});
    sound.play();
}

const url = 'http://localhost:8081/api/employees';

getAllEmployees();

setUrlInForm();

function setUrlInForm() {
    const form = document.querySelector('form');
    form.action = url;
}

function getAllEmployees() {

   fetch(url)
        .then(response => {
            if (!response.ok) {
                response.json().then(data => alert(data.info));
                return;
            }
                return response.json()
        })
        .then(json => selectionResponseProcessingFunction(json))
        .catch(error => {
            const message = document.createElement('p')
            message.innerText = 'Нет связи с сервером!'
            document.querySelector('.employees').remove();
            document.querySelector('.content').appendChild(message);

            console.log(error)
        });
}

function selectionResponseProcessingFunction (jsonArray) {
    if (jsonArray.length > 1) {
        parseAnswer(jsonArray);
    }else {
        writeInTable(jsonArray);
    }

}

function parseAnswer (arrayData) {
    for (let arrayDataKey in arrayData) {
        let oneObjData = arrayData[arrayDataKey];
        writeInTable(oneObjData);
    }
}

let listNumber = 1;
const tbody = document.createElement('tbody');
document.querySelector('.employees').appendChild(tbody);

function writeInTable (oneObjData) {
    const row = document.createElement('tr');
    row.id = 'row' + oneObjData.id;
    document.querySelector('tbody').appendChild(row);

    const listNumberTd = document.createElement('td')
    listNumberTd.innerHTML = listNumber ++;
    row.appendChild(listNumberTd);
    
    for (let key in oneObjData) {
        const tableDt = document.createElement('td');
        tableDt.innerHTML = `${oneObjData[key]}`
        if (oneObjData[key] === oneObjData.id){tableDt.hidden = true}
        row.appendChild(tableDt);
    }
    
    const tdButton = document.createElement('td');
    row.appendChild(tdButton);
    
    const buttonUpdate = document.createElement('button');
    buttonUpdate.id = oneObjData.id;
    buttonUpdate.innerText = 'Изменить';
    buttonUpdate.onclick = function (){changeRecord(row.id, buttonUpdate)}
    tdButton.appendChild(buttonUpdate);

    const buttonDelete = document.createElement('button');
    buttonDelete.id = oneObjData.id;
    buttonDelete.innerText = 'Удалить';
    buttonDelete.onclick = function (){deleteEmployee(buttonDelete.id)};
    tdButton.appendChild(buttonDelete);
    
}

document.querySelector('form').addEventListener('submit', submitForm);

function submitForm(event) {
    // Отменяем стандартное поведение браузера с отправкой формы
    event.preventDefault();

    // event.target — это HTML-элемент form
    let formData = new FormData(event.target);

    // Собираем данные формы в объект
    let obj = {};
    formData.forEach((value, key) => obj[key] = value);

    // Собираем запрос к серверу
    let request = new Request(event.target.action, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Отправляем (асинхронно!)
    fetch(request)
        .then(response => response.json())
        .then(json => alert('Работник добавлен: ' + JSON.stringify(json)))    
        .then(() => location.reload())
        .then(() => document.querySelector('form').reset())
        .catch(error => console.log(error))
    
}

function deleteEmployee(id) {
    fetch(url + '/' + id, {method: 'DELETE'})
        .then(response => {
            if (!response.ok) {
                response.json().then(data => alert(data.info));
                return;
            }
            return response.text()
        })
        .then(serverResp => alert(serverResp))
        .then(() => location.reload())
}

function changeRecord(idRow, buttonUpdate) {
    const changeableRow = document.getElementById(idRow);
    const tdChangeableRow = changeableRow.querySelectorAll('td');
    for (let i = 1; i <tdChangeableRow.length - 1; i++) {
        const changeInput = document.createElement('input');
        changeInput.value = tdChangeableRow[i].innerHTML;
        tdChangeableRow[i].innerHTML = '';
        tdChangeableRow[i].append(changeInput);
    }
    buttonUpdate.innerText = 'Сохранить';
    buttonUpdate.onclick = function () {
        createChangeEmployeeJson(idRow)
        
        
    }
    
}

function createChangeEmployeeJson(idRow) {
    const modifiedRow = document.getElementById(idRow);
    const inputModifiedRow = modifiedRow.querySelectorAll('input');
    const modifiedEmployee = {
        'id': inputModifiedRow[0].value,
        'name': inputModifiedRow[1].value,
        'surname': inputModifiedRow[2].value,
        'department': inputModifiedRow[3].value,
        'salary': inputModifiedRow[4].value
    }
    putEmployee(modifiedEmployee);
}

function putEmployee(modifiedEmployee) {

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(modifiedEmployee),
    })
        .then(response => response.json())
        .then(json => alert('Работник изменен: ' + JSON.stringify(json)))
        .then(() => location.reload())
        .catch(error => console.log(error))
}