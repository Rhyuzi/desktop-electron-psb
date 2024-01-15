<template>
	<div class="overlay" id="popupOverlay">
        <div class="popup-kota">
			<div class="popup-header">
				<h3 class="title-popup-detail">Tambah Kota</h3>
				<div class="cursor-pointer" @click="this.$parent.onCreate = false">
					<i class="fa fa-times" aria-hidden="true"></i>
				</div>
			</div>
            <div class="overflow-auto">
                <form @submit.prevent="submitData">
                    <div class="form-group">
                        <div class="fluid-form-input margin-top-10">
                            <input type="text" v-model="state.nokota" id="nokota" placeholder="No Kota" min="0" class="fluid-input" :class="state.nokota == '' ? (v$.state.nokota.$error ? 'has-error' : '') : (v$.state.nokota.$error ? 'has-error' : 'no-error')">
                            <label id="nokota" for="nokota" class="fluid-label" :class="state.nokota == '' ? (v$.state.nokota.$error ? 'has-error' : 'no-error') : (v$.state.nokota.$error ? 'has-error d-block' : 'no-error d-block')">No Kota</label>
                            <div v-if="v$.state.nokota.$error" class="label-error">
                                <Icon icon="ep:warning-filled" height="13" />
                                <p class="error-text">{{ v$.state.nokota.$errors[0].$message }}</p>
                            </div>
                        </div>    
                    </div>
                    <div class="form-group">
                        <div class="fluid-form-input margin-top-10">
                            <input type="text" v-model="state.namakota" id="namakota" placeholder="Nama Kota" min="0" class="fluid-input" :class="state.namakota == '' ? (v$.state.namakota.$error ? 'has-error' : '') : (v$.state.namakota.$error ? 'has-error' : 'no-error')">
                            <label id="namakota" for="namakota" class="fluid-label" :class="state.namakota == '' ? (v$.state.namakota.$error ? 'has-error' : 'no-error') : (v$.state.namakota.$error ? 'has-error d-block' : 'no-error d-block')">Nama Kota</label>
                            <div v-if="v$.state.namakota.$error" class="label-error">
                                <Icon icon="ep:warning-filled" height="13" />
                                <p class="error-text">{{ v$.state.namakota.$errors[0].$message }}</p>
                            </div>
                        </div>    
                    </div>
                    <div class="form-group display-flex margin-5 margin-left-13">
                        <div class="fluid-form-input margin-top-10 width-95 margin-5">
                            <input type="text" v-model="state.kodekota1" id="kodekota" placeholder="Kode Kota" min="0" class="fluid-input" :class="state.kodekota1 == '' ? (v$.state.kodekota1.$error ? 'has-error' : '') : (v$.state.kodekota1.$error ? 'has-error' : 'no-error')">
                            <label id="kodekota1" for="kodekota1" class="fluid-label" :class="state.kodekota1 == '' ? (v$.state.kodekota1.$error ? 'has-error' : 'no-error') : (v$.state.kodekota1.$error ? 'has-error d-block' : 'no-error d-block')">Kode Kota</label>
                            <div v-if="v$.state.kodekota1.$error" class="label-error">
                                <Icon icon="ep:warning-filled" height="13" />
                                <p class="error-text">{{ v$.state.kodekota1.$errors[0].$message }}</p>
                            </div>
                        </div>

                        <div class="fluid-form-input margin-top-10 width-95 margin-5">
                            <input type="text" v-model="state.kodekota2" id="kodekota2" placeholder="Kode Kota" min="0" class="fluid-input" :class="state.kodekota2 == '' ? (v$.state.kodekota2.$error ? 'has-error' : '') : (v$.state.kodekota2.$error ? 'has-error' : 'no-error')">
                            <label id="kodekota2" for="kodekota2" class="fluid-label" :class="state.kodekota2 == '' ? (v$.state.kodekota2.$error ? 'has-error' : 'no-error') : (v$.state.kodekota2.$error ? 'has-error d-block' : 'no-error d-block')">Kode Kota</label>
                            <div v-if="v$.state.kodekota2.$error" class="label-error">
                                <Icon icon="ep:warning-filled" height="13" />
                                <p class="error-text">{{ v$.state.kodekota2.$errors[0].$message }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="fluid-form-input margin-top-10">
                        <select v-model="state.transit" id="transit" placeholder="Transit Via" min="0" class="fluid-input" :class="state.transit == '' ? (v$.state.transit.$error ? 'has-error' : '') : (v$.state.transit.$error ? 'has-error' : 'no-error')">
                            <option value="">--Pilih Transit--</option>
                            <option v-for="s in statList" :value="s.CategoryID">{{ s.CategoryName }}</option>
                        </select>
                        <label id="transit" for="transit" class="fluid-label" :class="state.transit == '' ? (v$.state.transit.$error ? 'has-error' : 'no-error') : (v$.state.transit.$error ? 'has-error d-block' : 'no-error d-block')">Transit Via</label>
                            <div v-if="v$.state.transit.$error" class="label-error">
                                <Icon icon="ep:warning-filled" height="13" />
                                <p class="error-text">{{ v$.state.transit.$errors[0].$message }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="fluid-form-input margin-top-10">
                        <select v-model="state.negara" id="negara" placeholder="Transit Via" min="0" class="fluid-input" :class="state.negara == '' ? (v$.state.negara.$error ? 'has-error' : '') : (v$.state.negara.$error ? 'has-error' : 'no-error')">
                            <option value="">--Pilih Negara--</option>
                            <option v-for="s in statList" :value="s.CategoryID">{{ s.CategoryName }}</option>
                        </select>
                        <label id="negara" for="negara" class="fluid-label" :class="state.negara == '' ? (v$.state.negara.$error ? 'has-error' : 'no-error') : (v$.state.negara.$error ? 'has-error d-block' : 'no-error d-block')">Transit Via</label>
                            <div v-if="v$.state.negara.$error" class="label-error">
                                <Icon icon="ep:warning-filled" height="13" />
                                <p class="error-text">{{ v$.state.negara.$errors[0].$message }}</p>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary margin-top-10">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { Icon } from '@iconify/vue'
import useValidate from '@vuelidate/core'
import { required, numeric, maxLength, helpers, email } from '@vuelidate/validators'
export default {
	props: ['meetingInfo', 'userInfo'],
	components: { Icon },
	data() {
		return {
            locList: [],
            bussList: [],
            statList: [],
            salesList: [],
			beHostForm: false,
            v$: useValidate(),
			hostCode: "",
			clickMenu: 'informasi-umum',
			data: {},
            state: {
                nokota: '',
                namakota: '',
                kodekota1: '',
                kodekota2: '',
                transit: 'default',
                negara: 'default',
            }
		}
	},
	validations() {
		return {
            state: {
                nokota: {
                    required: helpers.withMessage("No kota Harus diisi", required),
                },
                namakota: {
                    required: helpers.withMessage("Nama kota harus diisi", required),
                },
                kodekota1: {
                    required: helpers.withMessage("Kode kota harus diisi", required),
                },
                kodekota2: {
                    required: helpers.withMessage("Kode kota harus diisi", required),
                },
                transit: {
                    required: helpers.withMessage("Transit harus diisi", required),
                },
                negara: {
                    required: helpers.withMessage("Negara harus diisi", required),
                },
            }
		}
	},
	async mounted(){
		console.debug('dataaaa child',this.$parent.dataClicked)
		this.data = this.$parent.dataClicked
	},
	methods: {
       async submitData() {
            this.v$.$validate()
            console.error('cons',this.v$.$error)
            if (!this.v$.$error) {
                
            }
        },
		
		
	}
}
</script>

<style lang="scss">
.meeting-popup {
	position: absolute;
	left: 74px;
	top: 72px;
	background-color: #202020;
	padding: 25px 30px 35px;
	border-radius: 5px;
	width: 518px;
	z-index: 1;
	.close-button {
		position: absolute;
		top: 15px;
		right: 15px;
		color: #9B9999;
		cursor: pointer;
	}
}
</style>