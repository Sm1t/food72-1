<template>
  <div class="edit container">
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Редактор пользователей</h1>
    <form v-on:submit="updateCustomer">
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
        <button type="submit" class="btn btn-primary">Применить</button>
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
        fetchCustomer(id){
            this.$http.get('http://arusremservis.ru/users/'+id)
            .then(function(response){
                this.customer = response.body;
            });
        },
        updateCustomer(e){
            if(!this.customer.name || !this.customer.phone || !this.customer.avatar){
                this.alert = 'Please fill in all required fields';
            } else {
                let updCustomer = {
                    first_name: this.customer.name,
                    phone: this.customer.phone,
                    avatar: this.customer.avatar,
                    
                }

                this.$http.put('http://arusremservis.ru/users/update/'+this.$route.params.id, updCustomer)
                    .then(function(response){
                        this.$router.push({path: '/', query: {alert: 'Customer Updated'}});
                    });

                e.preventDefault();
            }
            e.preventDefault();
        }
    },
    created: function(){
        this.fetchCustomer(this.$route.params.id);
    },
    components:{
        Alert
    }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
