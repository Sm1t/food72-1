<template>
  <div class="add container">
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Добавить сотрудника</h1>
    <form v-on:submit="addWorker">
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
            <h4>Контакты</h4>
            <div class="form-group">
                <label>Должность</label>
                <input type="text" class="form-control" placeholder="Должность" v-model="worker.position">
            </div>
        </div>
        <div class="well">
            <h4>Аутентификаци</h4>
            <div class="form-group">
                <label>Логин</label>
                <input type="text" class="form-control" placeholder="Логин" v-model="worker.login">
            </div>
            <div class="form-group">
                <label>Пароль</label>
                <input type="password" class="form-control" placeholder="Пароль" v-model="worker.password">
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Добавить</button>
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
        addWorker(e){
            if(!this.worker.name || !this.worker.surname || !this.worker.position || !this.worker.login || !this.worker.password){
                this.alert = 'Пожалуйста, заполните все поля!';
            } else {
                let newWorker = {   
                    name: this.worker.name,
                    surname: this.worker.surname,
                    position: this.worker.position,
                    login: this.worker.login,
                    password: this.worker.password,
                }

                this.$http.post('http://arusremservis.ru/employees/login', newWorker)
                    .then(function(response){
                        console.log(response);
                        this.alert = 'Сотрудник добавлен!';                      
                    });

                e.preventDefault();
            }
            e.preventDefault();
        }
    },
    components: {
        Alert
    }
    }
</script>

<style scoped>

</style>
