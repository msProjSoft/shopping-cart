import Vue from 'vue'
import Vuex from 'vuex'
import shop from '../api/shop';
import products from './modules/products.js'
import cart from './modules/cart.js'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        products,
        cart,
    },
    state: { // = data
       //// products: [],

    },
    getters: { // computed


/*         productIsInStock(state, product) {
            return (product) => {
                return product.inventory > 0
            }
        } */

    },
    actions: { // methods

/*         fetchProducts({commit}) {  //fetch for using Ajax
            return new Promise((resolve, reject) => {
                //make de call
                //call setProducts mutations
                shop.getProducts(item => {
                    commit('setProducts', item)
                    resolve()
                })
            })
        }, */

/*         addProductToCart({state, getters, commit}, product) {
            if(getters.productIsInStock(product)) {
                //find cartItem
                const cartItem = state.itemsCart.find(item => 
                    item.id === product.id)

                if(!cartItem) {
                    // pushProductToCart
                    commit('pushProductToCart', product.id)
                }else {
                    //incrementItemQuantity
                    commit('incrementItemQuantity', cartItem)
                }

                commit('decrementProductInventory', product)
            }
        }, */

/*         checkout({commit}) {
            var check = shop.checkoutProducts(this.state.itemsCart.length)
            if(check) {
                commit('setCheckoutStatus', 'success')
                commit('emptyCart')
            }else {
                commit('setCheckoutStatus', 'fail')
            }
        }, */
    },
    mutations: { //To update state
/*          setProducts(state, payload) {
            // Update products
            state.products = payload
        },  */

/*         
        //const cartItem = {id: 123, quantity:2}
        pushProductToCart(state, productId) {
            state.itemsCart.push({
                id: productId, quantity: 1
            })
        },

        incrementItemQuantity(state, cartItem) {
            cartItem.quantity++
        }, */
        
/*          decrementProductInventory(state, product) {
            product.inventory--
        },
 */
/*         setCheckoutStatus(state, status) {
            state.checkoutStatuts = status
        },
        emptyCart(state) {
            state.itemsCart = []
        }, */
    }
})

