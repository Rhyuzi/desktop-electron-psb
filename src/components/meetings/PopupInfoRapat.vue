<template>
	<div class="meeting-popup p2 text-white">
		<table @click="beHostForm = false; hostCode = ''" class="table-borderless">
			<tr>
				<td class="p2-bold pb-15 pe-42">ID Rapat</td>
				<td class="pb-15 d-inline-flex align-items-center">{{ meetingInfo.meetingNum }}
					<!-- Tampil Ketika Host -->
					<div v-if="userInfo.role == 'host'" class="text-light-green rounded-pill px-17 py-4 ms-10 border border-light-green">Kamu adalah Host</div>
				</td>
			</tr>
			<tr>
				<td class="p2-bold pb-15 pe-42">Penyelenggara</td>
				<td class="pb-15">{{ meetingInfo.creator }}</td>
			</tr>
			<tr>
				<td class="p2-bold pb-15 pe-42">Waktu Rapat</td>
				<td class="pb-15">{{ meetingInfo.meetingTime }}</td>
			</tr>
			<tr>
				<td class="p2-bold pb-15 pe-42">URL Rapat</td>
				<td class="pb-15 d-inline-flex align-items-center">{{ meetingInfo.roomUrl }} 
					<div @click="copyMeetingUrl" class="cursor-pointer ms-15">
						<Icon icon="bx:bxs-copy" height="17" />
					</div>
				</td>
			</tr>
		</table>
		<div v-if="userInfo.role == 'meeting_regular'" class="mt-30">
			<button v-if="userInfo.role == 'meeting_regular' && !beHostForm" @click="beHostForm = true" class="btn-fill-light-green">HOST RAPAT</button>
			<form @submit.prevent="onBecomeHost" v-if="beHostForm" class="d-flex flex-row gap-15">
				<input type="text" v-model="hostCode" pattern="[0-9]{4}" :placeholder="hostCode == '' ? 'Masukkan Kode Host': ''" class="radius-5 py-7 px-15" name="" id="">
				<input type="submit" value="KIRIM" class="btn-fill-light-green">
			</form>
		</div>
		<div @click="$emit('close')" class="close-button">
			<Icon icon="bi:x" height="30" />
		</div>
	</div>
</template>

<script>
import { Icon } from '@iconify/vue'
import useValidate from '@vuelidate/core'
import { numeric, helpers } from '@vuelidate/validators'
export default {
	props: ['meetingInfo', 'userInfo'],
	components: { Icon },
	data() {
		return {
			beHostForm: false,
            v$: useValidate(),
			hostCode: "",
		}
	},
	validation() {
		return {
			hostCode: {
				numeric: helpers.withMessage("Kode host harus berupa angka", numeric)
			},
		}
	},
	methods: {
		copyMeetingUrl: function () {
			navigator.clipboard.writeText(this.meetingInfo.roomUrl)
			this.toast('Permalink Rapat Telah Disalin', 'bg-more-black', 3000)
		},
		onBecomeHost: function () {
            this.v$.$validate()
            if (!this.v$.$error) {
				webrtcSDK.requestToBeHost(this.hostCode ,function(err){})
				this.beHostForm = false
				this.$emit('close')
				this.toast('Anda adalah host rapat', 'bg-more-black', 3000)
			}
		}
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