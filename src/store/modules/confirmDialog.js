export default {
    namespaced: true,
    state: {
        title: '',
        message: '',
        serial: '',
        useCloseButton: false,
        buttonConfirmTitle: '',
        buttonConfirmFunction: '',
        buttonConfirmClass: '',
        withCancelButton: false,
        buttonCancelTitle: '',
        buttonCancelFunction: '',
        buttonCancelClass: '',
    },
    mutations: {
        CONFIRM: function(state, value) {
            for (const key in value) {
                state[key] = value[key]
            }
        },
    },
    actions: {
        confirmDialog: function({ commit }, payload) {
            commit('CONFIRM', payload)
        },
    },
}
