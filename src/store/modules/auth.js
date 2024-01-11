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
        login: async function({commit}, payload) {
            return new Promise(async (resolve, reject) => {
                const res = await API.login(payload)
                if (res.data.error == false) {
                    console.error(JSON.stringify(res.data))
                    localStorage.setItem('User', JSON.stringify(res.data.data));
                    resolve(res.data)
                }
               resolve(res.data)
            })
        },
    },
}