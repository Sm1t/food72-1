<template>
  <div class="add container">
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Добавить заказ</h1>
    <form v-on:submit="addorder">
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
                <input type="text" class="form-control" placeholder="Завершен" v-model="order.completed">
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
        order: {},
        alert:''
        }
    },
    methods: {
        addorder(e){
            if(!this.order.totalPrice || !this.order.time || !this.order.status || !this.order.completed || !this.order.payStatus || !this.order.dishes){
                this.alert = 'Please fill in all required fields';
            } else {
                let neworder = {
                    totalPrice: this.order.totalPrice,
                    time: this.order.time,
                    status: this.order.status,
                    completed: this.order.completed,
                    payStatus: this.order.payStatus,
                    dishes: this.order.dishes,
                }

                this.$http.post('http://arusremservis.ru/orders', neworder)
                    .then(function(response){
                        this.$router.push({path: '/', query: {alert: 'order Added'}});
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
