const initialState = () => {
    return {
        participants: []
    }
}

export default {
    namespaced: true,
    state: initialState(),
    mutations: {
        PUSH: function (state, [key, value]) {
            state[key].push(value)
        },
        SET: (state, [key, value]) => state[key] = value,
        FILTER: (state, [key, value]) => state[key] = state[key].filter(item => item.sipAccount != value),
        DELETE: (state, [key, value]) => state[key].splice(state[key].findIndex(item => item.sipAccount == value), 1),
        RESET: (state) => Object.assign(state, initialState())
    },
    getters: {
        getParticipants: (state) => state.participants,
    },
    actions: {
        hasLeaveMeeting: function ({commit}, payload) {
            commit('DELETE', ['participants', payload])
        },
        setParticipants: function({commit}, payload) {
            commit('FILTER', ['participants', payload.sipAccount])
            commit('PUSH', ['participants', payload])
        },
    },
}