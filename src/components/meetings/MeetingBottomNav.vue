<template>
	<div class="navbar bg-more-black px-50 py-15">
		<div class="d-flex gap-20 align-items-center text-white">
			<div @click="setLocalVideo()" class="nav-menu-icon" :class="selfCamera === true ? 'active' : ''">
				<Icon icon="fluent:video-person-48-filled" height="24" />
			</div>
			<div @click="setMute()" class="cursor-pointer">
				<img v-if="isMute" :src=icons.volumeMute class="icon-import">
				<img v-else :src=icons.volumeOn class="icon-import">
			</div>
			<input type="range" v-model="curVolume" id="volinput" class="range-input" min="0" max="100" @change="onVolumeChange()">
		</div>
		<div class="circle-icon-group">
			<div @click="clickLeave()" class="circle-icon-wrap bg-red text-white phone">
				<Icon icon="bx:bxs-phone" width="24" />
			</div>
			<div @click="setAllVideoCam()" class="circle-icon-wrap" :class="this.$parent.camOn ? 'active' : ''">
				<Icon icon="carbon:video-filled" width="18" />
			</div>
			<div @click="setMicrophone()" class="circle-icon-wrap" :class="this.$parent.micOn ? 'active' : ''">
				<Icon icon="fluent:mic-20-filled" height="25" />
			</div>
			<div @click="setShare()" class="circle-icon-wrap" :class="isShare === true ? 'active' : ''">
				<Icon icon="bi:share-fill" height="16" />
			</div>
			<div v-if="shareOption" class="share-option">
				<div @click="shareDesktop()" class="opt-menu">
					<div class="">
						<Icon icon="carbon:screen" />
					</div>
					<div class="menu-text">Bagikan Layar</div>
				</div>
				<div class="opt-menu">
					<div class="">
						<Icon icon="mdi:draw" />
					</div>
					<div class="menu-text">Bagikan Papan Tulis</div>
				</div>
				<div class="opt-menu">
					<div class="">
						<Icon icon="entypo:documents" />
					</div>
					<div class="menu-text">Bagikan Dokumen</div>
				</div>
			</div>
		</div>
		<div class="d-flex gap-20 text-white align-items-center position-relative">
			<div @click="this.$parent.openList = !this.$parent.openList; this.$parent.openChat = false;" class="nav-menu-icon" :class="this.$parent.openList === true ? 'active' : ''">
				<Icon icon="ph:users-three-fill" width="28" />
			</div>
			<div @click="this.$parent.openChat = !this.$parent.openChat; this.$parent.openList = false;" class="nav-menu-icon" :class="this.$parent.openChat === true ? 'active' : ''">
				<Icon icon="ic:round-comment" width="25" />
			</div>
			<div @click="isMore = !isMore; isResolution = false" class="nav-menu-icon" :class="isMore === true ? 'active' : ''">
				<Icon icon="entypo:dots-three-vertical" height="21" />
			</div>
			<div v-if="isMore" class="more-option">
				<div class="opt-menu">
					<div class="">
						<Icon icon="fluent:settings-48-filled" width="16" />
					</div>
					<div class="menu-text">Pengaturan</div>
				</div>
				<div v-if="this.$parent.camOn" class="opt-menu">
					<div class="">
						<Icon icon="fluent:video-clip-multiple-16-filled" />
					</div>
					<div @click="isResolution = true; isMore = false" class="menu-text">
						<p>Kualitas</p>
						<span class="p4">Auto(SD)</span>
					</div>
				</div>
				<div v-if="userDatas.role == 'host'" class="opt-menu">
					<div class="">
						<Icon icon="ri:record-circle-line" height="16" />
					</div>
					<div class="menu-text">Rekam Rapat</div>
				</div>
				<div @click="onHandUp()" v-if="userDatas.role == 'meeting_regular'" class="opt-menu" :class="this.$parent.handUp ? 'raised' : ''">
					<div class="">
						<img v-if="this.$parent.handUp" :src=icons.hand3>
						<div v-else class="">
							<!-- <img :src=icons.hand2> -->
							<img :src=icons.hand1>
						</div>
					</div>
					<div class="menu-text">Angkat Tangan</div>
				</div>
			</div>
			<div v-if="isResolution" class="more-option">
				<div @click="isResolution = false; isMore = true" class="opt-menu">
					<div class="menu-text">Kualitas</div>
				</div>
				<div class="opt-menu">
					<div class="menu-text">1080p</div>
				</div>
				<div class="opt-menu">
					<div class="menu-text">720p</div>
				</div>
				<div class="opt-menu">
					<div class="menu-text">SD</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Icon } from '@iconify/vue'
import raiseblackgray from '../../assets/icons/raisehand/blackgray.svg'
import raisegray from '../../assets/icons/raisehand/gray.svg'
import raisewhite from '../../assets/icons/raisehand/white.svg'
import volumeon from '../../assets/icons/volumeon.svg'
import volumeoff from '../../assets/icons/volumeoff.svg'
import DialogKonfirmasi from '../popups/DialogKonfirmasi.vue'
import LocalCamera from './LocalCamera.vue'
export default {
  components: { DialogKonfirmasi, Icon, LocalCamera },
	props: ['meetingDatas', 'userDatas'],
	data() {
		return {
			icons: {
				hand1: raisegray,
				hand2: raiseblackgray,
				hand3: raisewhite,
				volumeOn: volumeon,
				volumeMute: volumeoff,
			},
			isMore: false,
			isResolution: false,
			// On Menus
			isShare: false,
			selfCamera: false,
			shareOption: false,
			// Volumes
			isMute: false,
			curVolume: 100,
			oldVolume: 0,
		}
	},
	methods: {
		// On Volume Clicked and Change
		setMute: function () {
			if (this.isMute) {
				this.curVolume = this.oldVolume
				webrtcSDK.mute(false, function(err) {})
			} else {
				this.curVolume = 0
				webrtcSDK.mute(true, function(err){})
			}
			let vol = document.getElementById("volinput")
			vol.style.background = `linear-gradient(to right, white 0%, white ${(this.curVolume-vol.min)/(vol.max-vol.min)*100}%, #424242 ${(this.curVolume-vol.min)/(vol.max-vol.min)*100}%, #424242 100%)`
			this.isMute = !this.isMute
		},
		onVolumeChange: function () {
			let vol = document.getElementById("volinput")
			vol.style.background = `linear-gradient(to right, white 0%, white ${(this.curVolume-vol.min)/(vol.max-vol.min)*100}%, #424242 ${(this.curVolume-vol.min)/(vol.max-vol.min)*100}%, #424242 100%)`
			this.isMute = false
			this.oldVolume = this.curVolume
			webrtcSDK.setAudioVolume(this.curVolume, function (err){});
		},
		// Camera's
		openMainVideo: function () {
			webrtcSDK.sendMainVideoStream("")
			this.$parent.camOn = true
		},
		closeMainVideo: function () {
			webrtcSDK.stopSendMainVideoStream()
			this.$parent.camOn = false
		},
		openLocalVideo: function () {
			LocalCamera.methods.startCameraStream()
			document.getElementById('myLocalVideo').style.display = 'block'
			this.selfCamera = true
		},
		closeLocalVideo: function () {
			LocalCamera.methods.stopCameraStream()
			document.getElementById('myLocalVideo').style.display = 'none'
			this.selfCamera = false
		},
		setLocalVideo () {
			if (this.$parent.camOn) {
				if (this.selfCamera) {
					document.getElementById('myLocalVideo').style.display = 'none'
					this.selfCamera = false
				} else {
					this.selfCamera = true
					document.getElementById('myLocalVideo').style.display = 'block'
				}
			} else {
				this.toast('Kamera sedang tidak aktif', 'bg-more-black', 3000)
			}
		},
		setAllVideoCam: function () {
			if (this.$parent.camOn) {
				// When Camera On
				try {
					this.closeLocalVideo()
					this.closeMainVideo()
				} catch (err) {
					console.error(err);
				}
			} else {
				try {
					this.openLocalVideo()
					this.openMainVideo()
				} catch (err) {
					console.error(err);
				}
			}
		},
		// Share Screen
		setShare: function () {
			if (this.isShare) {
				console.warn('Has Share');
			} else {
				this.shareOption = !this.shareOption
			}
		},
		shareDesktop: function () {
			this.shareOption = false
			webrtcSDK.shareDesktop()	
		},
		// Microphone's
		setMicrophone: function () {
			if (this.$parent.micOn) {
				webrtcSDK.stopLocalAudio(function(err){})
				this.$parent.micOn = false
			} else {
				webrtcSDK.setAudioDevice(webrtcSDK.getAudioDevices, (err) => {})
				this.$parent.micOn = true
			}
		},
		// Raise Hand Rules
		onHandUp: function () {
			if (this.$parent.handUp) {
				webrtcSDK.handDown()
				this.$parent.handUp = false
			} else {
				webrtcSDK.handUp()
				this.$parent.handUp = true
			}
		},
		// On Leave Meeting Clicked
		clickLeave: function () {
			this.confirmDialog({
				title: 'Akhiri/Keluar Rapat',
				message: this.userDatas.role == 'meeting_regular' ? 'Apakah anda yakin ingin meninggalkan rapat?' : 'Apakah anda yakin ingin mengakhiri atau meninggalkan rapat? Ketika anda meninggalkan rapat, rapat tetap berlanjut.',
				useCloseButton: true,
				buttonConfirmTitle: this.userDatas.role == 'meeting_regular' ? 'Keluar Rapat' : 'Akhiri Rapat',
				buttonConfirmFunction: this.userDatas.role == 'meeting_regular' ? this.leaveMeeting : '',
				buttonConfirmClass: this.userDatas.role == 'meeting_regular' ? 'btn-fill-light-green' : 'btn-fill-red',
				withCancelButton: true,
				buttonCancelTitle: this.userDatas.role == 'meeting_regular' ? 'Batal' : 'Keluar Rapat',
				buttonCancelFunction: this.userDatas.role == 'meeting_regular' ? ()=>{return} : this.leaveMeeting,
				buttonCancelClass: 'btn-fill-gr-white',
			})
		},
		leaveMeeting: async function () {
			await webrtcSDK.exitRoom()
			this.$router.push({
				path: '/',
				replace: true
			})
		}
	}
}
</script>

<style lang="scss">
</style>