<template>
 <div class="tableDiv">
   <table class="employeeTable">
     <thead>
      <tr>
        <td>#</td>
        <td>ID</td>
        <td>Name</td>
        <td>Surname</td>
        <td>Department</td>
        <td>Salary</td>
        <td>actions</td>
      </tr>
     </thead>
         <tbody v-for="(employee, index) in employees" :key = "employee.id">
      <tr>
          <td>
            {{ index + 1 }}
          </td>
          <td v-for="empValue in employee" :key = "empValue.id">
            {{empValue}}
          </td>
        <td>
          <button @click="changer(employee.id)">Изменить</button>
          <button @click = "changer(employee.id)">Удалить</button>
        </td>

      </tr>
     </tbody>
   </table>
   <button @click = "getAllEmployees">Load</button>
 </div>
</template>

<script>
export default {
  name: "MyTable",

  data() {
    return {
      url: 'http://localhost:8081/api/employees/',
      employees: [],
      countEmployees: 0

    }
  },
  methods: {

    async getAllEmployees() {

     await fetch(this.url)
          .then(response => {
            if (!response.ok) {
              response.json().then(data => alert(data.info));
              return;
            }
            return response.json()
          })
          .then(json => this.employees = json)
          .catch(error => {
            console.log('HUI' + error)
          });
    },

    changer(id) {
      console.log(id)

    },




  },




}




</script>



<style>

</style>