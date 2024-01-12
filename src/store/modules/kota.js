import API from '../../api'
const initialState = () => {
    return {
        city: []
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
        getCitys: (state) => state.city,
    },
    actions: {
        getCity: async function({commit}, payload) {
            return new Promise(async (resolve, reject) => {
                const res = await API.get_kota(payload)
                if (res.data.error == false) {
                    commit('SET', ['city', res.data.data])
                    resolve(res.data)
                }
               resolve(res.data)
            })
        },
    },
}