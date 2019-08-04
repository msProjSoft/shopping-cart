<template>
    <div>
        <h2>Produt List</h2>
            <img v-if="loading"
                src="https://i.imgur.com/JfPpwOA.gif">
            <ul v-else>
                <li v-for="item in products" :key="item.index">
                    {{item.title}} - {{item.price}} - {{item.inventory}}
                <button :disabled="!productIsInStock(item)" @click="addProductToCart(item)">Add to cart</button>
                </li>
            </ul>
    </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
export default {

    //=================== DATA ==========================
    data() {
        return {
            loading: false,
        }
    },

   //=================== COPMPUTED ==========================
    computed: {
        ...mapState({
            products:state => state.products.items
        }),
        
        ...mapGetters('products',{
            productIsInStock: 'productIsInStock'
        }),
    },

   //=================== METHODS ==========================
    methods: {
        ...mapActions({
            fetchProducts: 'products/fetchProducts',
            addProductToCart: 'cart/addProductToCart'
        }),
   
    },

     //=================== CREATED ==========================
    created() {
        this.loading = true
        this.fetchProducts()

            .then(() => this.loading = false)
    },
}
</script>

