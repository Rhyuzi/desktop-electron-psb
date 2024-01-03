<template>
    <div class="w-100 d-flex justify-content-center">
        <div class="p2 text-white py-5 px-15" :class="color" id="toast">{{ text }}</div>
    </div>
</template>

<script>
export default {
    name: 'Toast',
    data: () => {
        return {
            // show: false,
            text: '',
            color: '',
            timeout: 3000
        };
    },
    created() {
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'toast/TOAST') {
                this.text = state.toast.text
                this.color = state.toast.color
                this.timeout = state.toast.timeout
                this.show = true

                const toast = document.querySelector('#toast')
                toast.classList.add('show')

                setTimeout(() => {
                    // this.show = false
                    toast.classList.remove('show')
                }, this.timeout)
            }
        })
    }
};
</script>

<style lang="scss" scoped>
#toast {
    visibility: hidden;
    min-width: 240px;
    max-width: 475px;
    text-align: center;
    border-radius: 10px;
    position: fixed;
    z-index: 2;
    bottom: 85px;
}

#toast.show {
    visibility: visible;
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@-webkit-keyframes fadein {
    from {
        bottom: 70px;
        opacity: 0;
    }
    to {
        bottom: 85px;
        opacity: 1;
    }
}

@keyframes fadein {
    from {
        bottom: 70px;
        opacity: 0;
    }
    to {
        bottom: 85px;
        opacity: 1;
    }
}

@-webkit-keyframes fadeout {
    from {
        bottom: 85px;
        opacity: 1;
    }
    to {
        bottom: 70px;
        opacity: 0;
    }
}

@keyframes fadeout {
    from {
        bottom: 85px;
        opacity: 1;
    }
    to {
        bottom: 70px;
        opacity: 0;
    }
}
</style>
