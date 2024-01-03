<template>
  <div v-if="show" class="popup-bg">
		<!-- <transition name="slide-down" appear> -->
            <div :id=properties.serial class="card">
                <div class="card-body text-black-gray">
                    <h3 class="pb-15">{{ properties.title }}</h3>
                    <p class="p2">{{ properties.message }}</p>
                </div>
                <div class="card-footer">
                    <button v-if="properties.withCancelButton" @click="() => { show = false, properties.buttonCancelFunction() }" :class="properties.buttonCancelClass">{{ properties.buttonCancelTitle }}</button>
                    <button @click="() => { properties.buttonConfirmFunction(), show = false }" :class="properties.buttonConfirmClass">{{ properties.buttonConfirmTitle }}</button>
                </div>
                <div v-if="properties.useCloseButton" @click="show = false" class="close-button">
                    <i class="fas fa-times fa-lg"></i>
                </div>
            </div>
        <!-- </transition> -->
  </div>
</template>

<script>
export default {
    name: 'DialogKonfirmasi',
    data() {
        return {
            show: false,
            properties: {
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
            }
        }
    },
    created() {
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'confirmDialog/CONFIRM') {
                this.show = true;
                for (const key in this.properties) {
                    this.properties[key] = state.confirmDialog[key]
                }
            }
        })
    }

}
</script>


<style lang="scss">
.popup-bg {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(66, 66, 66, .8);
	.card {
		width: 510px;
		text-align: center;
		.card-body {
			padding: 25px 30px 20px;
		}
		.card-footer {
			background-color: white;
			display: flex;
			gap: 15px;
			padding: 20px 0;
			justify-content: center;
			button {
				font-weight: 400;
			}
		}
        .close-button {
            position: absolute;
            top: 15px;
            right: 15px;
            color: #9B9999;
            cursor: pointer;
        }
	}
}
</style>