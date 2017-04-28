<template>
  <div class="customers container">
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Менеджер пользователей</h1>
    <input class="form-control" placeholder="Введите имя" v-model="filterInput">
    <br />
    <table class="table table-striped">
        <thead>
          <tr>
            <!--<th>ID</th>-->           
            <th>Аватар</th>
            <th>Имя</th>
            <th>Телефон</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in filterBy(customers, filterInput)">
            <!--<td>{{customer._id}}</td>-->
            <td><div class="img-circle img-circle--size" v-bind:style="{backgroundImage: 'url(' + customer.avatar + ')', backgroundSize: 'cover', backgroundPosition: 'center' }"></div></td> 
            <td>{{customer.name}}</td>
            <td>{{customer.phone}}</td>
            <td><router-link class="btn btn-info" v-bind:to="'/customer/'+customer._id">Подробнее</router-link></td>
          </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
  import Alert from './Alert';
  export default {
    name: 'customers',
    data () {
      return {
        customers: [],
        alert:'',
        filterInput:''
      }
    },
    methods: {
      fetchCustomers(){
        this.$http.get('http://arusremservis.ru/users', {
          headers: {
            'Authorization': localStorage.getItem('token') 
          }
        }).then(function(response){
          this.customers = response.body
        });
      },

      filterBy(list, value){
        value = value.charAt(0).toUpperCase() + value.slice(1);
        return list.filter(function(customer){
          return customer.name.indexOf(value) > -1;
        });
      }
    },
    created: function(){
      if(this.$route.query.alert){
        this.alert = this.$route.query.alert;
      }
      this.fetchCustomers();
    },
    updated: function(){
      this.fetchCustomers();
    },
    components: {
      Alert
    }
  }
</script>

<!-- "scoped" - значит только для этого компонента! -->
<style scoped>
.img-circle--size{
  width: 70px;
  height: 70px;
}
</style>
