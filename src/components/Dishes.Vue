<template>
  <div class="customers container">
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Менеджер блюд</h1>
    <input class="form-control" placeholder="Введите имя" v-model="filterInput">
    <br />
    <table class="table table-striped">
        <thead>
          <tr>
            <!--<th>ID</th>-->
            <th>Изображение</th>
            <th>Наименование</th>
            <th>Категория</th>
            <th>Каллории</th>
            <th>Описание</th>
            <th>Цена</th>
            <th>Рейтинг</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dish in filterBy(dishes, filterInput)">
            <!--<td>{{dish._id}}</td>-->
            <td><img class="img-circle img-circle--size" v-bind:src="dish.dishPicture" onerror="this.src = 'http://image.freepik.com/free-icon/no-translate-detected_318-27155.jpg'"></td> 
            <td>{{dish.name}}</td>
            <td>{{dish.category}}</td>
            <td>{{dish.callories}}</td>
            <td>{{dish.description}}</td>
            <td>{{dish.price}}</td>
            <td>{{dish.rating}}</td>
            <td><router-link class="btn btn-default" v-bind:to="'/dish/'+dish._id">Подробнее</router-link></td>
          </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
  import Alert from './Alert';
  export default {
    name: 'dishes',
    data () {
      return {
        dishes: [],
        alert:'',
        filterInput:''
      }
    },
    methods: {
      fetchdishes(){
        this.$http.get('http://arusremservis.ru/dishes')
          .then(function(response){
            this.dishes = response.body;
          });
      },
      filterBy(list, value){
        //value = value.charAt(0).toUpperCase() + value.slice(1);
        return list.filter(function(dish){
          return dish.name.indexOf(value) > -1;
        });
      }
    },
    created: function(){
      if(this.$route.query.alert){
        this.alert = this.$route.query.alert;
      }
      this.fetchdishes();
    },
    updated: function(){
      this.fetchdishes();
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
