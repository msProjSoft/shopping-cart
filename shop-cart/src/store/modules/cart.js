import shop from '../../api/shop.js'
export default {
    state: {
        itemsCart: [],   // {id, quantity}
        checkoutStatuts: null,
    },
    getters: {
        cartProducts(state, getters, rootState) {
            return state.itemsCart.map(cartItem => {
                const product = rootState.products.items.find(item => 
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
        },

    },
    mutations: {
                
        //const cartItem = {id: 123, quantity:2}
        pushProductToCart(state, productId) {
            state.itemsCart.push({
                id: productId, quantity: 1
            })
        },

        incrementItemQuantity(state, cartItem) {
            cartItem.quantity++
        },

        setCheckoutStatus(state, status) {
            state.checkoutStatuts = status
        },
        
        emptyCart(state) {
            state.itemsCart = []
        },
    },
    actions: {
        addProductToCart({state, getters, commit, rootState}, product) {
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
        },

        checkout({commit}) {
            var check = shop.checkoutProducts()
            if(check) {
                commit('setCheckoutStatus', 'success')
                commit('emptyCart')
            }else {
                commit('setCheckoutStatus', 'fail')
            }
        },

    },

}