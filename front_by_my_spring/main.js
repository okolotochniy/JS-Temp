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
function writeInTable (oneObjData) {
    const row = document.createElement('tr');
    document.querySelector('.employees').appendChild(row);

    let idEmployee;

    const listNumberTd = document.createElement('td')
    listNumberTd.innerHTML = listNumber ++;
    document.querySelector('.employees').appendChild(listNumberTd);

    
    for (let key in oneObjData) {
        const tableDt = document.createElement('td');
        tableDt.innerHTML = `${oneObjData[key]}`
        document.querySelector('.employees').appendChild(tableDt);

        idEmployee = oneObjData.id;
        
    }


    const tdButton = document.createElement('td');
    document.querySelector('.employees').appendChild(tdButton);
    
    const buttonUpdate = document.createElement('button');
    buttonUpdate.innerText = 'Изменить';
    tdButton.appendChild(buttonUpdate);

    const buttonDelete = document.createElement('button');
    buttonDelete.id = idEmployee;
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
