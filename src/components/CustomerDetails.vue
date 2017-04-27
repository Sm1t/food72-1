<template>
  <div class="details container">
    <router-link class="btn btn-info" to="/">Назад</router-link>
    <h1 class="page-header">{{customer.name}} 
            <router-link class="btn btn-primary" v-bind:to="'/CustomerEdit/'+customer._id">Редактировать</router-link>
            <button class="btn btn-danger" v-on:click="deleteCustomer(customer._id)">Удалить</button>
            </span>
    </h1>
        <ul class="list-group">
            <li class="list-group-item"><span class="ion-person" aria-hidden="true"></span> {{customer.name}}</li>
            <li class="list-group-item"><span class="ion-iphone" aria-hidden="true"></span> {{customer.phone}}</li>
            <li class="list-group-item"><span class="ion-ios-camera" aria-hidden="true"></span> {{customer.avatar}}</li>
        </ul>
  </div>
</template>

<script>
export default {
  name: 'customerdetails',
  data () {
    return {
      customer: ''
    }
  },
  methods:{
      fetchCustomer(id){
          this.$http.get('http://arusremservis.ru/users/'+id, {
            headers: {
            'Authorization': localStorage.getItem('token') 
            }
          })
          .then(function(response){
            this.customer = response.body;
          });
      },
      deleteCustomer(id){
          this.$http.delete('http://arusremservis.ru/users/'+id)
          .then(function(response){
            this.$router.push({path: '/', query: {alert: 'Клиент удален!'}});
          });
      }
  },
  created: function(){
      this.fetchCustomer(this.$route.params.id);
  }
}
</script>

<style scoped>

</style>
