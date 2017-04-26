<template>
  <div class="add container">
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Авторизация на сервисе</h1>
    <form v-on:submit="loginWorker">
        <div class="well">
            <h4>Введите данные для авторизации</h4>
            <div class="form-group">
                <label>Логин</label>
                <input type="text" class="form-control" placeholder="Логин" v-model="worker.login">
            </div>
            <div class="form-group">
                <label>Пароль</label>
                <input type="password" class="form-control" placeholder="Пароль" v-model="worker.password">
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Войти</button>
    </form>
  </div>
</template>

<script>
    import Alert from './Alert'
    export default {
    name: 'add',
    token: '',
    data () {
        return {
        worker: {},
        alert:''
        }
    },
    methods: {
        loginWorker(e){
            if(!this.worker.login || !this.worker.password){
                this.alert = 'Пожалуйста, заполните все поля!';
            } else {
                let authWorker = {
                    login: this.worker.login,
                    password: this.worker.password,
                }

                this.$http.post('http://arusremservis.ru/employees/login', authWorker)
                    .then(function(response){
                        console.log(response.body.token);
                        localStorage.setItem('token', response.body.token);
                        this.alert = 'Добро пожаловать на сервис!';                      
                    },
                    function(err) {
                        this.alert = 'Неверный логин или пароль!';
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
