import shop from '../../api/shop.js'
export default {
    state: {
        items: [],
    },
    getters: {
        availableProducts (state, getters) {
            return state.items.filter(product => product.inventory > 0)
        },

        productIsInStock(state, product) {
            return (product) => {
                return product.inventory > 0
            }
        }
    },
    mutations: {
        setProducts(state, payload) {
            // Update items
            state.items = payload
        }, 

        decrementProductInventory(state, product) {
            product.inventory--
        },

    },
    actions: {
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
    },

}