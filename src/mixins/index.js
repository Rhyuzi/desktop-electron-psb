const mixins = {
    methods: {
        // toast mixins
        toast: function (text, color, timeout) {
            this.$store.dispatch('toast/toast', {text, color, timeout})
        },
        confirmDialog: function (payload) {
            this.$store.dispatch('confirmDialog/confirmDialog', payload)
        }
    }
}

export default mixins
