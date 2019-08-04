<template>
    <div>
        <h1>Shopping Cart</h1>
        <ul>
            <li v-for="item in cartProducts" :key="item.index">
                {{item.title}} - {{item.price}} - {{item.quantity}}

            </li>
        </ul>
        <p>Total: {{total}}</p>
        <button :disabled="!cartProducts.length >0"
                @click="checkout">Checkout</button>
        <p>{{checkoutStatuts}}</p>
    </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
export default { 
    computed: {
        ...mapGetters('cart',{
            cartProducts: 'cartProducts',
            total: 'cartTotal'
        }),

/*      // OU    
        ...mapGetters({
            cartProducts: 'cart/cartProducts',
            total: 'cart/cartTotal'
        }),

        // Para usar outro Getters...
        ...mapGetters('products', {
            productIsInStock: 'productIsInStock'
        })
 */
        ...mapState('cart',{
            checkoutStatuts:state => state.checkoutStatuts
        })

/*      //OU
        ...mapState({
            checkoutStatuts:state => state.cart.checkoutStatuts
        })
         */
    },

    methods: {
        ...mapActions('cart',['checkout'])
        //OU ...mapActions({checkout: 'checkout'})
    },
}
</script>

