<template>
    <div class="join-meeting-page">
		<div class="d-flex flex-column justify-content-center align-items-center">
			<h2 class="text-black-gray mb-5">Gabung Rapat</h2>
			<router-link to="/pilihserver" class="pilih-server-text">
				Kejaksaan Agung <i class="fas fa-chevron-right"></i>
			</router-link>
		</div>
		<form @submit.prevent="gabungRapat" class="join-form">
			<div class="fluid-form-input">
				<input type="number" v-model="joinData.idRapat" id="idrapat" placeholder="ID Rapat" min="0" class="fluid-input" :class="joinData.idRapat == '' ? (v$.joinData.idRapat.$error ? 'has-error' : '') : (v$.joinData.idRapat.$error ? 'has-error' : 'no-error')">
				<label id="idrapatlabel" for="idrapat" class="fluid-label" :class="joinData.idRapat == '' ? (v$.joinData.idRapat.$error ? 'has-error' : 'no-error') : (v$.joinData.idRapat.$error ? 'has-error d-block' : 'no-error d-block')">ID Rapat</label>
				<div v-if="v$.joinData.idRapat.$error" class="label-error">
					<Icon icon="ep:warning-filled" height="13" />
					<p class="error-text">{{ v$.joinData.idRapat.$errors[0].$message }}</p>
				</div>
			</div>
			<div class="fluid-form-input">
				<input type="text" v-model="joinData.namaParticipant" id="namaanda" maxlength="64" placeholder="Nama Anda" autocomplete="name" class="fluid-input" :class="joinData.namaParticipant == '' ? (v$.joinData.namaParticipant.$error ? 'has-error' : '') : (v$.joinData.namaParticipant.$error ? 'has-error' : 'no-error')">
				<label id="namaandalabel" for="namaanda" class="fluid-label" :class="joinData.namaParticipant == '' ? (v$.joinData.namaParticipant.$error ? 'has-error' : 'no-error') : (v$.joinData.namaParticipant.$error ? 'has-error d-block' : 'no-error d-block')">Nama Anda</label>
				<div v-if="v$.joinData.namaParticipant.$error" class="label-error">
					<Icon icon="ep:warning-filled" height="13" />
					<p class="error-text">{{ v$.joinData.namaParticipant.$errors[0].$message }}</p>
				</div>
			</div>
			<div class="fluid-form-input">
				<input v-if="showpassword" type="text" v-model="joinData.passMeeting" id="passmeeting" maxlength="8" placeholder="Kata Sandi Rapat (Jika Diperlukan)" class="fluid-input" :class="joinData.passMeeting == '' ? (v$.joinData.passMeeting.$error ? 'has-error' : '') : (v$.joinData.passMeeting.$error ? 'has-error' : 'no-error')">
				<input v-else type="password" @keypress="numberPasswordValidate" inputmode="numeric" v-model="joinData.passMeeting" id="passmeeting" maxlength="8" placeholder="Kata Sandi Rapat (Jika Diperlukan)" autocomplete="new-password" class="fluid-input" :class="joinData.passMeeting == '' ? (v$.joinData.passMeeting.$error ? 'has-error' : '') : (v$.joinData.passMeeting.$error ? 'has-error' : 'no-error')">
				<label id="passmeetinglabel" for="passmeeting" class="fluid-label" :class="joinData.passMeeting == '' ? (v$.joinData.passMeeting.$error ? 'has-error' : 'no-error') : (v$.joinData.passMeeting.$error ? 'has-error d-block' : 'no-error d-block')">Kata Sandi Rapat (Jika Diperlukan)</label>
				<span class="show" id="look" @click="showHidePassword"><i id="eye-new" class="fas fa-eye eye-reset"></i></span>
				<div v-if="v$.joinData.passMeeting.$error" class="label-error">
					<Icon icon="ep:warning-filled" height="13" />
					<p class="error-text">{{ v$.joinData.passMeeting.$errors[0].$message }}</p>
				</div>
			</div>
			<div class="checkbox-form-input mt-12">
				<input v-if="saveToLocal.ingatSaya" type="checkbox" v-model="saveToLocal.ingatSaya" id="ingatSaya" checked>
				<input v-else type="checkbox" v-model="saveToLocal.ingatSaya" id="ingatSaya">
				<label for="ingatSaya">Ingat saya</label>
			</div>
			<div class="checkbox-form-input">
				<input v-if="saveToLocal.ingatServer" type="checkbox" v-model="saveToLocal.ingatServer" id="ingatServer" checked>
				<input v-else type="checkbox" v-model="saveToLocal.ingatServer" id="ingatServer">
				<label for="ingatServer">Ingat opsi server</label>
			</div>
			<div class="d-flex justify-content-between align-items-center mt-79 w-100">
				<a @click="$router.go(-1)" class="link-text">
					<i class="fas fa-chevron-left"></i>
					Kembali
				</a>
				<input value="GABUNG" v-if="v$.$error" type="submit" class="btn-primary-kejaksaan px-32 pt-9 pb-10" disabled>
				<input value="GABUNG" v-else type="submit" class="btn-primary-kejaksaan px-32 pt-9 pb-10">
			</div>
		</form>
	</div>
	<pre-join-load v-if="isLoading" />
</template>

<script>
import useValidate from '@vuelidate/core'
import { Icon } from '@iconify/vue'
import { required, numeric, maxLength, helpers, email } from '@vuelidate/validators'
import CONFIG from '../config/config'
import PreJoinLoad from '../components/meetings/PreJoinLoad.vue'
export default {
	components: { Icon, PreJoinLoad },
	data() {
		return {
			showpassword: false,
			loading: false,
			// Start Data Input
            v$: useValidate(),
			joinData: {
				idRapat: "",
				namaParticipant: localStorage.getItem('lastJoinName') || "",
				passMeeting: "",
			},
			saveToLocal: {
				ingatSaya: true,
				ingatServer: false,
			},
            isLoading: false,

			states: ""
		}
	},
	validations() {
		return {
			joinData: {
				idRapat: {
					required: helpers.withMessage("ID Rapat harus diisi", required),
					maxLength: helpers.withMessage("Maksimal 9 Digit", maxLength(9)),
					numeric: helpers.withMessage("Harus berupa angka", numeric)
				},
				namaParticipant: {
					required: helpers.withMessage("Nama Partisipan harus diisi", required)
				},
				passMeeting: {
					maxLength: helpers.withMessage("Maksimal 8 Digit", maxLength(8)),
					numeric: helpers.withMessage("Harus berupa angka", numeric)
				},
			}
		}
	},
	mounted() {
		this.setupServer()
	},
	methods: {
		setupServer: function () {
			webrtcSDK.setServerAddr(CONFIG.APP_DOMAIN)
		},
		gabungRapat: function () {
			this.v$.$validate()
            if (!this.v$.$error) {
				this.isLoading = true
				let email = new Date().getTime() + "@vica-kejaksaan.go.id"
				const options = {
					roomId: this.joinData.idRapat.toString(),
					userName: this.joinData.namaParticipant,
					email,
					roomPassword: this.joinData.passMeeting
				}
				if (this.saveToLocal.ingatSaya) {
					localStorage.setItem('lastJoinName', this.joinData.namaParticipant)
				} else {
					localStorage.setItem('lastJoinName', '')
				}
				webrtcSDK.joinRoom(options, 
					async () => {
						await setInterval(() => {
							this.$router.push('/ruangrapat')
						}, 2000);
					}
				)
			}
		},
		showHidePassword: function () {
			if (this.states) {
                document.querySelector('#passmeeting').setAttribute('type', 'password');
                document.querySelector('#eye-new').classList.remove('fa-eye-slash');
				document.querySelector('#eye-new').classList.add('fa-eye');
                this.states = false;
            } else {
				document.querySelector('#passmeeting').setAttribute('type', 'number');
                document.querySelector('#eye-new').classList.remove('fa-eye');
				document.querySelector('#eye-new').classList.add('fa-eye-slash');
                this.states = true;
            }
		},
	}
}
</script>

<style>
.join-meeting-page {
	height: 100vh;
	width: 100%;
	padding: 40px 50px;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.join-form {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 13px;
	max-width: 360px;
	margin: 0 auto;
}
</style>