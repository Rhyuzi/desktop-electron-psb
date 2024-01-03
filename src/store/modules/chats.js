const initialState = () => {
    return {
        chats: []
    }
}

export default {
    namespaced: true,
    state: initialState(),
    mutations: {
        PUSH: function (state, [key, value]) {
            state[key].push(value)
        }
    },
    getters: {
        getChats: (state) => state.chats,
    },
    actions: {
        setChat: function({commit}, payload) {
            commit('PUSH', ['chats', payload])
        }
    },
}