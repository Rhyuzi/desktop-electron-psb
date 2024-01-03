export default {
    namespaced: true,
    state: {
        text: '',
        color: '',
        timeout: '',
    },
    mutations: {
        TOAST: function(state, value) {
            state.text = value.text
            state.color = value.color
            state.timeout = value.timeout
        },
    },
    actions: {
        toast: function({ commit }, payload) {
            commit('TOAST', payload)
        },
    },
}
