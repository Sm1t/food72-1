<template>
  <div class="edit container">
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Редактор пользователей</h1>
    <form v-on:submit="updateworker">
        <div class="well">
            <h4>Общая информация</h4>
            <div class="form-group">
                <label>Имя</label>
                <input type="text" class="form-control" placeholder="Имя" v-model="worker.name">
            </div>
            <div class="form-group">
                <label>Фамилия</label>
                <input type="text" class="form-control" placeholder="Фамилия" v-model="worker.surname">
            </div>
        </div>
        <div class="well">
            <h4>Рабочая информация</h4>
            <div class="form-group">
                <label>Должность</label>
                <input type="text" class="form-control" placeholder="Должность" v-model="worker.position">
            </div>
        </div>
        <button type="submit" class="btn btn-primary" v-on:click="updateworker  (worker._id)">Применить</button>
    </form>
  </div>
</template>

<script>
    import Alert from './Alert'
    export default {
    name: 'add',
    data () {
        return {
        worker: {},
        alert:''
        }
    },
    methods: {
        fetchworker(id){
            this.$http.get('http://arusremservis.ru/employees/'+id, {
              headers: {
                'Authorization': localStorage.getItem('token') 
              }
            }).then(function(response){
                this.worker = response.body;
            });
        },
        updateworker(e){
            if(!this.worker.name || !this.worker.surname || !this.worker.position){
                this.alert = 'Пожалуйста, заполните все поля!';
            } else {
                let updworker = {
                    name: this.worker.name,
                    surname: this.worker.surname,
                    position: this.worker.position,          
                }

                this.$http.post('http://arusremservis.ru/employees/'+/*this.$route.params.*/id, updworker, {
                  headers: {
                    'Authorization': localStorage.getItem('token') 
                  }
                }).then(function(response){
                    console.log(response);
                    this.alert = 'Данные о сотруднике обновлены!';
                });

                e.preventDefault();
            }
            e.preventDefault();
        }
    },
    created: function(){
        this.fetchworker(this.$route.params.id);
    },
    components:{
        Alert
    }
    }
</script>

<style scoped>

</style>
