<template>
  <div class="add container">
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Добавить клиента</h1>
    <form v-on:submit="addCustomer">
        <div class="well">
            <h4>Общая информация</h4>
            <div class="form-group">
                <label>Имя</label>
                <input type="text" class="form-control" placeholder="Имя" v-model="customer.name">
            </div>
        </div>
        <div class="well">
            <h4>Контакты</h4>
            <div class="form-group">
                <label>Телефон</label>
                <input type="text" class="form-control" placeholder="Телефон" v-model="customer.phone">
            </div>
        </div>
        <div class="well">
            <h4>Файлы</h4>
            <div class="form-group">
                <label>Аватар</label>
                <input type="text" class="form-control" placeholder="Аватар" v-model="customer.avatar">
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
        customer: {},
        alert:''
        }
    },
    methods: {
        addCustomer(e){
            if(!this.customer.name || !this.customer.phone || !this.customer.avatar){
                this.alert = 'Пожалуйста, заполните все поля!';
            } else {
                let newCustomer = {
                    name: this.customer.name,
                    phone: this.customer.phone,
                    avatar: this.customer.avatar,
                }

                this.$http.post('http://arusremservis.ru/users', newCustomer)
                    .then(function(response){
                        this.$router.push({path: '/', query: {alert: 'Customer Added'}});
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
