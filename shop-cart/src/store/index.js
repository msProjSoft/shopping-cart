import Vue from 'vue'
import Vuex from 'vuex'
import shop from '../api/shop';
Vue.use(Vuex)

export default new Vuex.Store({
    state: { // = data
        products: [],
        cart: [],   // {id, quantity}
    },
    getters: { // computed
        productsCount() {
        },
        availableProducts (state, getters) {
            return state.products.filter(item => item.inventory > 0)
        },

        cartProducts(state) {
            return state.cart.map(cartItem => {
                const product = state.products.find(item => 
                    item.id === cartItem.id)
                return {
                    title: product.title,
                    price: product.price,
                    quantity: cartItem.quantity

                }
            })
        },

        cartTotal(state, getters) {

/*          let total = 0
            getters.cartProducts.forEach(product => {
                total += product.price * product.quantity
            })
            return total
 */
            return getters.cartProducts.reduce((total, product) => 
                total + product.price * product.quantity, 0)
        }
    },
    actions: { // methods
        fetchProducts({commit}) {  //fetch for using Ajax
            return new Promise((resolve, reject) => {
                //make de call
                //call setProducts mutations
                shop.getProducts(item => {
                    commit('setProducts', item)
                    resolve()
                })
            })
        },

        addProductToCart(context, product) {
            if(product.inventory > 0) {
                //find cartItem
                const cartItem = context.state.cart.find(item => 
                    item.id === product.id)

                if(!cartItem) {
                    // pushProductToCart
                    context.commit('pushProductToCart', product.id)
                }else {
                    //incrementItemQuantity
                    context.commit('incrementItemQuantity', cartItem)
                }

                context.commit('decrementProductInventory', product)
            }
        },
    },
    mutations: { //To update state
        setProducts(state, payload) {
            // Update products
            state.products = payload
        },

        //const cartItem = {id: 123, quantity:2}
        pushProductToCart(state, productId) {
            state.cart.push({
                id: productId, quantity: 1
            })
        },

        incrementItemQuantity(state, cartItem) {
            cartItem.quantity++
        },
        
        decrementProductInventory(state, product) {
            product.quantity--
        },

    }
})