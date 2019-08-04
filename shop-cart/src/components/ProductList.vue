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
    data() {
        return {
            loading: false,
        }
    },

    computed: {
        ...mapState({
            products:state => state.products.items
        }),
        
        ...mapGetters({
            productIsInStock: 'productIsInStock'
        }),
    },

    methods: {
        ...mapActions({
            fetchProducts: 'fetchProducts',
            addProductToCart: 'addProductToCart'
        }),
   
    },
    created() {

        this.loading = true
        this.fetchProducts()
            .then(() => this.loading = false)
    },
}
</script>

