<template>
    <div class="join-meeting-page">
		<div class="layout-login">

			<div class="d-flex flex-column justify-content-center align-items-center">
				<h2 class="text-black-gray mb-5">Login</h2>
			</div>
			<form @submit.prevent="login" class="join-form">
				<div class="fluid-form-input margin-top-10">
					<input type="text" v-model="joinData.username" id="username" placeholder="Username" min="0" class="fluid-input" :class="joinData.username == '' ? (v$.joinData.username.$error ? 'has-error' : '') : (v$.joinData.username.$error ? 'has-error' : 'no-error')">
					<label id="username" for="userame" class="fluid-label" :class="joinData.username == '' ? (v$.joinData.username.$error ? 'has-error' : 'no-error') : (v$.joinData.username.$error ? 'has-error d-block' : 'no-error d-block')">Username</label>
					<div v-if="v$.joinData.username.$error" class="label-error">
						<Icon icon="ep:warning-filled" height="13" />
						<p class="error-text">{{ v$.joinData.username.$errors[0].$message }}</p>
					</div>
				</div>
				<div class="fluid-form-input">
					<input v-if="showpassword" type="text" v-model="joinData.password" id="password" maxlength="8" placeholder="Kata Sandi " class="fluid-input" :class="joinData.password == '' ? (v$.joinData.password.$error ? 'has-error' : '') : (v$.joinData.password.$error ? 'has-error' : 'no-error')">
					<input v-else type="password" @keypress="numberPasswordValidate" inputmode="numeric" v-model="joinData.password" id="password" placeholder="Kata Sandi" autocomplete="new-password" class="fluid-input" :class="joinData.password == '' ? (v$.joinData.password.$error ? 'has-error' : '') : (v$.joinData.password.$error ? 'has-error' : 'no-error')">
					<label id="password" for="password" class="fluid-label" :class="joinData.password == '' ? (v$.joinData.password.$error ? 'has-error' : 'no-error') : (v$.joinData.password.$error ? 'has-error d-block' : 'no-error d-block')">Kata Sandi Rapat (Jika Diperlukan)</label>
					<span class="show" id="look" @click="showHidePassword"><i id="eye-new" class="fas fa-eye eye-reset"></i></span>
					<div v-if="v$.joinData.password.$error" class="label-error">
						<Icon icon="ep:warning-filled" height="13" />
						<p class="error-text">{{ v$.joinData.password.$errors[0].$message }}</p>
					</div>
				</div>
				
				<div class="d-flex justify-content-between align-items-center mt-79 w-100">
					<a @click="$router.go(-1)" class="link-text">
						<i class="fas fa-chevron-left"></i>
						Kembali
					</a>
					<input value="LOGIN" v-if="v$.$error" type="submit" class="btn-primary-kejaksaan px-32 pt-9 pb-10" disabled>
					<input value="LOGIN" v-else type="submit" class="btn-primary-kejaksaan px-32 pt-9 pb-10">
				</div>
			</form>
		</div>
	</div>
	<pre-join-load v-if="isLoading" />
</template>

<script>
import useValidate from '@vuelidate/core'
import { Icon } from '@iconify/vue'
import { required, numeric, maxLength, helpers, email } from '@vuelidate/validators'
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
				username: "",
				password: "",
			},
            isLoading: false,

			states: ""
		}
	},
	validations() {
		return {
			joinData: {
				username: {
					required: helpers.withMessage("Username harus diisi", required),
				},
				password: {
					required: helpers.withMessage("Password harus diisi", required),
				},
			}
		}
	},
	mounted() {

	},
	methods: {
		login: async function () {
			this.v$.$validate()
            if (!this.v$.$error) {
				const res = await this.$store.dispatch('auth/login',this.joinData)
				console.debug("login",res)
				if (res.error == false) {
					this.$router.push('/dashboard')
				}
			}
		},
		showHidePassword: function () {
			if (this.states) {
                document.querySelector('#password').setAttribute('type', 'password');
                document.querySelector('#eye-new').classList.remove('fa-eye-slash');
				document.querySelector('#eye-new').classList.add('fa-eye');
                this.states = false;
            } else {
				document.querySelector('#password').setAttribute('type', 'number');
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
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  background-image: url('../assets/sign-in.png');
}

.join-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 13px;
  max-width: 360px;
  margin: 0 auto;
}

.layout-login {
  box-shadow: -10px 10px 15px 0px #00000040;
  border-radius: 8px;
  padding: 80px;
  background: white;
  width: 40%;
}
</style>