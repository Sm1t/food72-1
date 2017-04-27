<template>
  <div class="edit container">
    <Alert v-if="alert" v-bind:message="alert" />
    <h1 class="page-header">Редактор блюд</h1>
    <form v-on:submit="updatedish">
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
                <input type="text" class="form-control" placeholder="Состав" v-for="composition in compositions" v-model="composition.name">
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
        dish: {},
        alert:'',
        compositions:''
        }
    },
    methods: {
        fetchdish(id){
            this.$http.get('http://arusremservis.ru/dishes/'+id, {
              headers: {
                'Authorization': localStorage.getItem('token') 
              }
            }).then(function(response){
                this.dish = response.body;
            });
        },
        fetchcompositions(id){
          this.$http.get('http://arusremservis.ru/dishes/'+id+'/composition')
          .then(function(response){
            this.compositions = response.body;
          });
        },
        updatedish(e){
            if(!this.dish.name || !this.dish.phone || !this.dish.avatar){
                this.alert = 'Please fill in all required fields';
            } else {
                let upddish = {
                    first_name: this.dish.name,
                    phone: this.dish.phone,
                    avatar: this.dish.avatar,
                    
                }

                this.$http.put('http://arusremservis.ru/dishes/'+this.$route.params.id, upddish, {
                  headers: {
                    'Authorization': localStorage.getItem('token') 
                  }
                }).then(function(response){
                    this.$router.push({path: '/', query: {alert: 'Информация о блюде обновлена!'}});
                });

                e.preventDefault();
            }
            e.preventDefault();
        }
    },
    created: function(){
        this.fetchdish(this.$route.params.id);
        this.fetchcompositions(this.$route.params.id);
    },
    components:{
        Alert
    }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
