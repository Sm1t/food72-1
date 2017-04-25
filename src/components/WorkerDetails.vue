<template>
  <div class="details container">
    <router-link to="/">Назад</router-link>
    <h1 class="page-header">{{worker.name}} 
            <router-link class="btn btn-primary" v-bind:to="'/workerEdit/'+worker._id">Редактировать</router-link>
            <button class="btn btn-danger" v-on:click="deleteworker(worker._id)">Удалить</button>
            </span>
    </h1>
        <ul class="list-group">
            <li class="list-group-item"><span class="ion-person" aria-hidden="true"></span> {{worker.name}}</li>
            <li class="list-group-item"><span class="ion-person-stalker" aria-hidden="true"></span> {{worker.surname}}</li>
            <li class="list-group-item"><span class="ion-man" aria-hidden="true"></span> {{worker.position}}</li>
        </ul>
  </div>
</template>

<script>
export default {
  name: 'workerdetails',
  data () {
    return {
      worker: ''
    }
  },
  methods:{
      fetchworker(id){
          this.$http.get('http://arusremservis.ru/employees/'+id)
          .then(function(response){
            this.worker = response.body;
          });
      },
      deleteworker(id){
          this.$http.delete('http://arusremservis.ru/employees/'+id)
          .then(function(response){
            /*this.$router.push({path: '/', query: {alert: 'worker Deleted'}});*/
          });
      }
  },
  created: function(){
      this.fetchworker(this.$route.params.id);
  }
}
</script>

<style scoped>

</style>
