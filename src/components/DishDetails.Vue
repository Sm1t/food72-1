<template>
  <div class="details container">
    <router-link to="/">Назад</router-link>
    <h1 class="page-header">{{dish.name}} 
            <router-link class="btn btn-primary" v-bind:to="'/dishedit/'+dish._id">Редактировать</router-link>
            <button class="btn btn-danger" v-on:click="deletedish(dish._id)">Удалить</button>
            </span>
    </h1>
        <ul class="list-group">
            <li class="list-group-item"><span class="ion-icecream" aria-hidden="true"></span> {{dish.name}}</li>
            <li class="list-group-item"><span class="ion-stats-bars" aria-hidden="true"></span> {{dish.category}}</li>
            <li class="list-group-item"><span class="ion-pizza" aria-hidden="true"></span> {{dish.callories}}</li>
            <li class="list-group-item"><span class="ion-checkmark-circled" aria-hidden="true"></span> {{dish.description}}</li>
            <li class="list-group-item"><span class="ion-pricetag" aria-hidden="true"></span> {{dish.price}}</li>
            <li class="list-group-item"><span class="ion-connection-bars" aria-hidden="true"></span> {{dish.rating}}</li>
            <li class="list-group-item ion-compose"><span aria-hidden="true" v-for="composition in compositions"> {{composition.name}}, </span></li>
            <li class="list-group-item ion-compose"><span aria-hidden="true" v-for="topping in toppings"> {{topping.toppingId}}, </span></li>
            <li class="list-group-item ion-compose"><span aria-hidden="true" v-for="location in locations"> {{location.locationId}}, </span></li>
        </ul>
  </div>
</template>

<script>
export default {
  name: 'dishdetails',
  data () {
    return {
      dish: '',
      compositions:''
    }
  },
  methods:{
      fetchdish(id){
          this.$http.get('http://arusremservis.ru/dishes/'+id)
          .then(function(response){
            this.dish = response.body;
          });
      },
      fetchcompositions(id){
          this.$http.get('http://arusremservis.ru/dishes/'+id+'/composition')
          .then(function(response){
            this.compositions = response.body;
          });
      },
      fetchtoppings(id){
          this.$http.get('http://arusremservis.ru/dishes/'+id+'/toppings')
          .then(function(response){
            this.toppings = response.body;
          });
      },
      fetchlocations(id){
          this.$http.get('http://arusremservis.ru/dishes/'+id+'/locations')
          .then(function(response){
            this.locations = response.body;
          });
      },
      deletedish(id){
          this.$http.delete('http://arusremservis.ru/users/delete/'+id)
          .then(function(response){
            this.$router.push({path: '/', query: {alert: 'dish Deleted'}});
          });
      }
  },
  created: function(){
      this.fetchdish(this.$route.params.id);
      this.fetchcompositions(this.$route.params.id);
      this.fetchtoppings(this.$route.params.id);
      this.fetchlocations(this.$route.params.id);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
