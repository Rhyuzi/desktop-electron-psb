<template>
	<div class="participant-column" :class="{'d-none': !this.$parent.openList}">
		<div class="head-section">
			<div class="top">
				<h3 class="text-gray-black">Daftar Peserta</h3>
				<div class="icon-groups">
					<div v-if="userDatas.role == 'host'" class="icon-group">
						<Icon icon="fluent:arrow-sort-16-filled" />
					</div>
					<div v-if="userDatas.role == 'host'" class="icon-group">
						<Icon icon="wpf:add-user" />
					</div>
				</div>
			</div>
			<div class="search-wrap">
				<Icon icon="eva:search-fill" height="23" class="text-gray" />
				<input @keyup="searchParticipant" v-model="searchText" type="text" class="search-input" placeholder="Cari nama peserta">
			</div>
		</div>
		<div class="participants-section">
			<div class="participant-wrap" :id="'user-'+userDatas.id">
				<div class="participant-info">
					<div class="device-icon self">
						<Icon icon="tabler:world" height="18" />
					</div>
					<div class="participant-text">
						<p class="participant-name" :title=userDatas.name>
							{{ userDatas.name }}
						</p>
						<span v-if="userDatas.role == 'host'" class="text-yellow-crown mt-n3">
							<Icon icon="ph:crown-simple-fill" height="15" />
						</span>
					</div>
				</div>
				<div class="participant-access">
					<div v-if="this.$parent.handUp">
						<img :src=icons.raisehand>
					</div>
					<div v-if="userDatas.micSta == 'ForbiddenMute'" class="text-red">
						<Icon icon="ic:sharp-mic-off" height="22" />
					</div>
					<div v-else :class="this.$parent.micOn ? 'text-light-green' : 'text-red'">
						<Icon icon="ic:sharp-mic" height="22" />
					</div>
					<div :class="this.$parent.camOn ? 'text-light-green' : 'text-red'">
						<Icon icon="carbon:video-filled" height="19" />
					</div>
				</div>
			</div>
			<div v-for="participant in participantLists" :id="'user-'+participant.sipAccount" :key="participant.sipAccount" class="participant-wrap">
				<div class="participant-info">
					<div class="device-icon">
						<Icon icon="tabler:world" height="18" />
					</div>
					<div class="participant-text">
						<p class="participant-name" :title=participant.dispalyName>
							{{ participant.dispalyName }}
						</p>
						<span v-if="participant.isHost" class="text-yellow-crown mt-n3">
							<Icon icon="ph:crown-simple-fill" height="15" />
						</span>
					</div>
				</div>
				<div class="participant-access">
					<!-- <div v-if="participant.handup == 'On'">
						<img :src=icons.raisehand>
					</div> -->
					<!-- <div v-if="participant.micSta == 'ForbiddenMute'" class="text-red">
						<Icon icon="ic:sharp-mic-off" height="22" />
					</div> -->
					<!-- <div v-else :class="participant.micSta == 'Normal' ? 'text-light-green' : 'text-red'">
						<Icon icon="ic:sharp-mic" height="22" />
					</div> -->
					<div :class="participant.camera == 1 ? 'text-light-green' : 'text-red'">
						<Icon icon="carbon:video-filled" height="19" />
					</div>
				</div>
			</div>
		</div>
		<div v-if="userDatas.role == 'host'" class="foot-section">
			<button @click="muteAllParticipants()" class="btn-fill-white">Bisukan Semua</button>
			<button @click="handDownAllParticipants()" class="btn-fill-white">Turunkan Semua Tangan</button>
		</div>
	</div>
</template>

<script>
import { Icon } from '@iconify/vue'
import { mapGetters } from 'vuex'
import raisehandYellow from '../../assets/icons/raisehand/yellow.svg'
export default {
	name: 'KolomDaftarPeserta',
	props: ['userDatas'],
	components: { Icon },
	data() {
		return {
			icons: {
				raisehand: raisehandYellow
			},
			searchText: '',
			raisehand: false,
		}
	},
	computed: {
        ...mapGetters({
            participantsList: 'participants/getParticipants'
        }),
		participantLists: function () {
			return Object
				.values(this.participantsList)
				.filter(participant => {
					if (participant.dispalyName.indexOf(this.searchText) !== -1) {
						return participant
					} else {
						let newParticipant = participant.dispalyName.toLowerCase().match(this.searchText)
						return newParticipant
					}
				})
		},
	},
	methods: {
		searchParticipant: function (ev) {
			this.searchText = ev.target.value
			if (this.searchText == '') {
				document.getElementById(`user-${this.userDatas.id}`).style.display = 'flex'
			} else {
				document.getElementById(`user-${this.userDatas.id}`).style.display = 'none'
			}
		},
		// Raised Hand Rules
		handDownAllParticipants: function () {
			webrtcSDK.handDownAll()
			this.toast('Anda menurunkan semua tangan', 'bg-more-black', 3000)
		},
		handDownUser: function (pid) {
			webrtcSDK.handDownUser(pid)
			this.toast(`Anda menurunkan tangan ${pid}`, 'bg-more-black', 3000)
		},
		// Mic Rules
		muteAllParticipants: function () {
			webrtcSDK.muteAll()
			this.toast('Anda membisukan seluruh peserta', 'bg-more-black', 3000)
		},
		muteUser: function (pid) {
			webrtcSDK.muteUser(pid)
			this.toast(`Anda membisukan ${pid}`, 'bg-more-black', 3000)
		},
	}
}
</script>

<style>

</style>