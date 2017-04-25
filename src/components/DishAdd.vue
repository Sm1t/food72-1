<template>
  <div class="add container">
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Добавить блюдо</h1>
    <form v-on:submit="adddish">
        <div class="well">
            <h4>Общая информация</h4>
            <div class="form-group">
                <label>Наименование</label>
                <input type="text" class="form-control" placeholder="Наименование" v-model="dish.name">
            </div>
            <div class="form-group">
                <label>Категории</label>
                <input type="text" class="form-control" placeholder="Категории" v-model="dish.category">
            </div>   
        </div>
        <div class="well">
            <h4>Подробная информация</h4>
            <div class="form-group">
                <label>Каллории</label>
                <input type="text" class="form-control" placeholder="Каллории" v-model="dish.callories">
            </div>
            <div class="form-group">
                <label>Описания</label>
                <input type="text" class="form-control" placeholder="Описания" v-model="dish.description">
            </div>
            <div class="form-group">
                <label>Состав</label>
                <input type="text" class="form-control" placeholder="Состав" v-model="dish.description">
            </div>
        </div>
        <div class="well">
            <h4>Рассчетная информация</h4>
            <div class="form-group">
                <label>Цена</label>
                <input type="text" class="form-control" placeholder="Цена" v-model="dish.price">
            </div>
            <div class="form-group">
                <label>Рейтинг</label>
                <input type="text" class="form-control" placeholder="Рейтинг" v-model="dish.rating">
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
        dish: {},
        alert:''
        }
    },
    methods: {
        adddish(e){
            if(!this.dish.name || !this.dish.category || !this.dish.callories || !this.dish.description || !this.dish.price || !this.dish.rating){
                this.alert = 'Пожалуйста, заполните все поля!';
            } else {
                let newdish = {
                    name: this.dish.name,
                    category: this.dish.category,
                    callories: this.dish.callories,
                    description: this.dish.description,
                    price: this.dish.price,
                    rating: this.dish.rating,
                }

                this.$http.post('http://arusremservis.ru/dishes', newdish)
                    .then(function(response){
                       /* this.$router.push({path: '/', query: {alert: 'dish Added'}});*/
                       this.alert = 'Блюдо добавлено!';
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
