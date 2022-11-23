
const url = 'http://localhost:8081/api/employees/';


getEmployees();

async function getEmployees() {
    // try {
        const response = await fetch(url);
        const responseData = await response.json();
        console.log(responseData);
/*
    } catch (err){
        alert("Ошибка HTTP: " + err);
    }
*/

}

