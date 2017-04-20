<template>
  <div class="orders container">
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Менеджер заказов</h1>
    <input class="form-control" placeholder="Введите имя" v-model="filterInput">
    <br />
    <table class="table table-striped">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Цена</th>
            <th>Время</th>
            <th>Статус</th>
            <th>Завершен</th>
            <th>Оплачен</th>
            <th>Блюда</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in filterBy(orders, filterInput)">
            <td>{{ order.user }}</td>
            <td>{{ order.totalPrice }}</td>
            <td>{{ order.time }}</td>
            <td>{{ order.status }}</td>
            <td>{{ order.completed }}</td>
            <td>{{ order.payStatus }}</td>
            <td><pre>{{ enumDishes(order.formatedDishes) }}</pre></td>
            <td><router-link class="btn btn-default" v-bind:to="'/order/'+order._id">Подробнее</router-link></td>
          </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
  import Alert from './Alert';
  export default {
    name: 'orders',
    data () {
      return {
        orders: [],
        alert:'',
        filterInput:''
      }
    },
    methods: {
      fetchorders(){
        this.$http.get('http://arusremservis.ru/orders').then(response => {
          response.body.map((order) => {
            this.$http.get('http://arusremservis.ru/users/' + order.userId + '/name').then(response => {
              order.user = response.body;
              order.formatedDishes = [];
              order.dishes.map((dishes) => {
                this.$http.get('http://arusremservis.ru/dishes/' + dishes.dishId + '/name').then(response => {
                  order.formatedDishes.push({'Наименование': response.body, 'Количество': dishes.quantity});
                })
              })
              this.orders.push(order);
            });
          });
        });
      },
      filterBy(list, value){
        value = value.charAt(0).toUpperCase() + value.slice(1);
        return list.filter(function(order){
          return order.user.indexOf(value) > -1;
        });
      },
      //Красивый вывод блюд
      enumDishes(dishes) {
        var dish = '';
        for (var i = dishes.length - 1; i >= 0; i--) {
          for (var key in dishes[i]) {
            dish += key + ': ' + dishes[i][key];
            if (key == 'Наименование') dish += ', ';
          }
          dish = dish + '\n';
        }
        return dish;
      }
    },
      /*showUser: function(userId){
        this.$http.get('http://arusremservis.ru/users/'+userId+'/name')
        .then(function(response){
          return console.log(response.body);          
          //return (response.body);
        });
      },*/

      /*showDishes: function(dishId){
        this.$http.get('http://arusremservis.ru/dishes/'+dishId+'/name')
        .then(function(response){
          return console.log(response.body);          
          //return (response.body);
        });
      }
    },*/
    created: function(){
      if(this.$route.query.alert){
        this.alert = this.$route.query.alert;
      }
      this.fetchorders();
    },
    /*updated: function(){
      this.fetchorders();
    },*/
    components: {
      Alert
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
