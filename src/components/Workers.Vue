<template>
  <div class="workers container">
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Менеджер пользователей</h1>
    <input class="form-control" placeholder="Введите имя" v-model="filterInput">
    <br />
    <table class="table table-striped">
        <thead>
          <tr>          
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Должность</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="worker in filterBy(workers, filterInput)">
            <td>{{worker.name}}</td>
            <td>{{worker.surname}}</td>
            <td>{{worker.position}}</td>            
            <td><router-link class="btn btn-info" v-bind:to="'/worker/'+worker._id">Подробнее</router-link></td>
          </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
  import Alert from './Alert';
  export default {
    name: 'workers',
    data () {
      return {
        workers: [],
        alert:'',
        filterInput:''
      }
    },
    methods: {
      fetchworkers(){
        this.$http.get('http://arusremservis.ru/employees', {
          headers: {
            'Authorization': localStorage.getItem('token') 
          }
        }).then(function(response){
            this.workers = response.body;
          });
      },
      filterBy(list, value){
        value = value.charAt(0).toUpperCase() + value.slice(1);
        return list.filter(function(worker){
          return worker.name.indexOf(value) > -1;
        });
      }
    },
    created: function(){
      if(this.$route.query.alert){
        this.alert = this.$route.query.alert;
      }
      this.fetchworkers();
    },
    /*updated: function(){
      this.fetchworkers();
    },*/
    components: {
      Alert
    }
  }
</script>

<style scoped>

</style>
