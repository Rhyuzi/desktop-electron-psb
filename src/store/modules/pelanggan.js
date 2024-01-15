import API from '../../api'
const initialState = () => {
    return {
        pelanggan: []
    }
}

export default {
    namespaced: true,
    state: initialState(),
    mutations: {
        PUSH: function (state, [key, value]) {
            state[key].push(value)
        },
        SET(state, [key, value]) {
            state[key] = value
        },
        FILTER: (state, [key, value]) => state[key] = state[key].filter(item => item.sipAccount != value),
        DELETE: (state, [key, value]) => state[key].splice(state[key].findIndex(item => item.sipAccount == value), 1),
        RESET: (state) => Object.assign(state, initialState())
    },
    getters: {
        getPelanggan: (state) => state.pelanggan,
    },
    actions: {
        getPelanggan: async function({commit}, payload) {
            return new Promise(async (resolve, reject) => {
                const res = await API.get_pelanggan(payload)
                if (res.data.error = false) {
                    commit('SET', ['pelanggan', res.data.data])
                    resolve(res.data)
                }
               resolve(res.data)
            })
        },
        getLocation: async function({commit}, payload) {
            return new Promise(async (resolve, reject) => {
                const res = await API.get_location(payload)
                if (res.data.error == false) {
                    resolve(res.data)
                }
               resolve(res.data)
            })
        },
        getBussinesList: async function({commit}, payload) {
            return new Promise(async (resolve, reject) => {
                const res = await API.get_pelanggan_bisnis(payload)
                if (res.data.error == false) {
                    resolve(res.data)
                }
               resolve(res.data)
            })
        },
        getSalesList: async function({commit}, payload) {
            return new Promise(async (resolve, reject) => {
                const res = await API.get_pelanggan_sales(payload)
                if (res.data.error == false) {
                    resolve(res.data)
                }
               resolve(res.data)
            })
        },
        getStatusList: async function({commit}, payload) {
            return new Promise(async (resolve, reject) => {
                const res = await API.get_pelanggan_status(payload)
                if (res.data.error == false) {
                    resolve(res.data)
                }
               resolve(res.data)
            })
        },
        addCustomer: async function({commit}, payload) {
            return new Promise(async (resolve, reject) => {
                const res = await API.add_customer(payload)
                if (res.data.error == false) {
                    resolve(res.data)
                }
               resolve(res.data)
            })
        },
        areaPickup: async function({commit}, payload) {
            return new Promise(async (resolve, reject) => {
                const res = await API.area_pickup(payload)
                if (res.data.error == false) {
                    resolve(res.data)
                }
               resolve(res.data)
            })
        },

        updateCustomer: async function({commit}, payload) {
            return new Promise(async (resolve, reject) => {
                const res = await API.update_customer(payload)
                if (res.data.error == false) {
                    resolve(res.data)
                }
               resolve(res.data)
            })
        }
    },
}