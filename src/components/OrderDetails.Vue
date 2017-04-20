<template>
  <div class="details container">
    <router-link to="/">Назад</router-link>
    <h1 class="page-header">{{order.userId}} 
            <router-link class="btn btn-primary" v-bind:to="'/orderedit/'+order._id">Редактировать</router-link>
            <button class="btn btn-danger" v-on:click="deleteorder(order._id)">Удалить</button>
            </span>
    </h1>
        <ul class="list-group">
            <li class="list-group-item"><span class="ion-cash" aria-hidden="true"></span> {{order.totalPrice}}</li>
            <li class="list-group-item"><span class="ion-clock" aria-hidden="true"></span> {{order.time}}</li>
            <li class="list-group-item"><span class="ion-toggle" aria-hidden="true"></span> {{order.status}}</li>
            <li class="list-group-item"><span class="ion-checkmark" aria-hidden="true"></span> {{order.completed}}</li>
            <li class="list-group-item"><span class="ion-card" aria-hidden="true"></span> {{order.payStatus}}</li>
            <li class="list-group-item"><span class="ion-ios-medical" aria-hidden="true"></span> {{order.dishes}}</li>
        </ul>
  </div>
</template>

<script>
export default {
  name: 'orderdetails',
  data () {
    return {
      order: ''
    }
  },
  methods:{
      fetchorder(id){
          this.$http.get('http://arusremservis.ru/orders/'+id)
          .then(function(response){
            this.order = response.body;
          });
      },
      deleteorder(id){
          this.$http.delete('http://arusremservis.ru/users/orders/'+id)
          .then(function(response){
            this.$router.push({path: '/', query: {alert: 'order Deleted'}});
          });
      }
  },
  created: function(){
      this.fetchorder(this.$route.params.id);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
