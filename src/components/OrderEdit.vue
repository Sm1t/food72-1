<template>
  <div class="edit container">
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Редактор заказов</h1>
    <form v-on:submit="updateorder">
        <div class="well">
            <h4>Общая информация</h4>
            <div class="form-group">
                <label>Сумма</label>
                <input type="text" class="form-control" placeholder="Сумма" v-model="order.totalPrice">
            </div>
            <div class="form-group">
                <label>Время</label>
                <input type="text" class="form-control" placeholder="Время" v-model="order.time">
            </div>
        </div>
        <div class="well">
            <h4>Информация о готовности</h4>
            <div class="form-group">
                <label>Статус</label>
                <input type="text" class="form-control" placeholder="Статус" v-model="order.status">
            </div>
            <div class="form-group">
                <label>Завершен?</label>
                <input type="text" class="form-control" placeholder="Завершен?" v-model="order.completed">
            </div>
            <div class="form-group">
                <label>Статус оплаты</label>
                <input type="text" class="form-control" placeholder="Статус оплаты" v-model="order.payStatus">
            </div>
        </div>
        <div class="well">
            <h4>Подробная информаци</h4>
            <div class="form-group">
                <label>Состав</label>
                <input type="text" class="form-control" placeholder="Состав" v-model="order.dishes">
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
        order: {},
        alert:''
        }
    },
    methods: {
        fetchorder(id){
            this.$http.get('http://arusremservis.ru/orders/'+id)
            .then(function(response){
                this.order = response.body;
            });
        },
        updateorder(e){
            if(!this.order.name || !this.order.phone || !this.order.avatar){
                this.alert = 'Please fill in all required fields';
            } else {
                let updorder = {
                    name: this.order.name,
                    phone: this.order.phone,
                    avatar: this.order.avatar,
                    
                }

                this.$http.put('http://arusremservis.ru/users/update/'+this.$route.params.id, updorder)
                    .then(function(response){
                        this.$router.push({path: '/', query: {alert: 'order Updated'}});
                    });

                e.preventDefault();
            }
            e.preventDefault();
        }
    },
    created: function(){
        this.fetchorder(this.$route.params.id);
    },
    components:{
        Alert
    }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
