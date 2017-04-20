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
            <td><img class="img-circle img-circle--size" v-bind:src="customer.avatar" onerror="this.src = 'http://image.freepik.com/free-icon/user-male-shape-in-a-circle-ios-7-interface-symbol_318-35357.jpg'"></td> 
            <td>{{customer.name}}</td>
            <td>{{customer.phone}}</td>
            <td><router-link class="btn btn-default" v-bind:to="'/customer/'+customer._id">Подробнее</router-link></td>
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
        this.$http.get('http://arusremservis.ru/users')
          .then(function(response){
            this.customers = response.body;
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.img-circle--size{
  width: 70px;
  height: 70px;
}
</style>
