<template>
	<popup-info-rapat
		v-if="popupInfo"
		:meetingInfo=meetingDatas
		:userInfo=userDatas
		@close="popupInfo = false"
	/>
	<status-jaringan 
		v-if="popupSignal"
		@close="popupSignal = false"
	 />
	<div class="top-navbar-meet">
		<div class="d-flex align-items-start gap-10 flex-grow-1">
			<div @click="popupSignal = !popupSignal; popupInfo = false" class="text-light-green mt-n2 cursor-pointer">
				<img v-if="connectionState == 0" :src=icons.signalBad>
				<img v-else-if="connectionState == 1" :src=icons.signalMed>
				<Icon v-else icon="ant-design:signal-filled" height="15" />
			</div>
			<h4 @click="popupInfo = !popupInfo; popupSignal = false" class="align-middle cursor-pointer">
				{{ meetingDatas.meetingTheme }}
				<Icon icon="ant-design:caret-down-filled" height="10" />
			</h4>
		</div>
		<div class="d-flex align-items-center gap-10">
			<div v-if="isRecord" class="text-red">
				<Icon icon="ri:record-circle-line" height="24" />
			</div>
			<div class="video-layout-wrap">
				<div @click="changeVideoLayout = !changeVideoLayout" class="current-video-layout">
					<Icon icon="carbon:user-speaker" height="17" />
					<div class="d-flex align-items-center justify-content-between gap-10">
						<p v-if="userDatas.layoutShow == '0'" class="p2">Default</p>
						<p v-else-if="userDatas.layoutShow == '1'" class="p2">Pembicara</p>
						<p v-else-if="userDatas.layoutShow == '2'" class="p2">Peserta</p>
						<Icon icon="bi:caret-down-fill" height="15" />
					</div>
				</div>
				<div v-if="changeVideoLayout" class="available-video-layout">
					<div v-for="layout in videoLayouts" :key="layout.layoutid" @click="setVideoLayoutForMe(layout.layoutid)" class="video-layout" :class="userDatas.layoutShow == layout.layoutid ? 'current' : ''">
						<Icon v-if="layout.layoutmode == 'a'" icon="emojione-monotone:letter-a" height="18" />
						<Icon v-if="layout.layoutmode == 'b'" icon="clarity:grid-chart-solid" height="18" />
						<Icon v-if="layout.layoutmode == 'c'" icon="bi:grid-3x3-gap-fill" height="18" />
						<Icon v-if="layout.layoutmode == 'd'" icon="icon-park:grid-sixteen" height="18" />
						<Icon v-if="layout.layoutmode == 'e'" icon="emojione-monotone:letter-a" height="18" />
						<Icon v-if="layout.layoutmode == 'f'" icon="emojione-monotone:letter-a" height="18" />
						<Icon v-if="layout.layoutmode == 'g'" icon="emojione-monotone:letter-a" height="18" />
						<Icon v-if="layout.layoutmode == '1'" icon="emojione-monotone:letter-a" height="18" />
						<Icon v-if="layout.layoutmode == '2'" icon="emojione-monotone:letter-a" height="18" />
						<Icon v-if="layout.layoutmode == '3'" icon="emojione-monotone:letter-a" height="18" />
						<Icon v-if="layout.layoutmode == '4'" icon="emojione-monotone:letter-a" height="18" />
						<Icon v-else-if="layout.layoutmode == 'speaker'" icon="carbon:user-speaker" height="17" />
						<div class="layout-title">
							<p v-if="layout.layoutid == '0'" class="p2">Default</p>
							<p v-else-if="layout.layoutid == '2'" class="p2">Peserta</p>
							<p v-else-if="layout.layoutid == '1'" class="p2">Pembicara</p>
							<Icon v-if="userDatas.layoutShow == layout.layoutid" icon="bi:check" height="18" />
						</div>
					</div>
					<div class="video-layout other">
						<Icon icon="fluent:full-screen-maximize-16-filled" height="23" />
						<div class="layout-title">
							<p class="p2">Layar Penuh</p>
						</div>
					</div>
				</div>
			</div>
			<!-- <h4 class="">00:05:39</h4> -->
		</div>
	</div>
</template>

<script>
import { Icon } from '@iconify/vue'
import PopupInfoRapat from './PopupInfoRapat.vue'
import StatusJaringan from './StatusJaringan.vue'
import signalbad from '../../assets/icons/signalbad.svg'
import signalmed from '../../assets/icons/signalmed.svg'
export default {
	components: { Icon, PopupInfoRapat, StatusJaringan },
	props: ['meetingDatas', 'userDatas', 'videoLayout'],
	data() {
		return {
			icons: {
				signalBad: signalbad,
				signalMed: signalmed,
			},
			connectionState: 3,
			popupInfo: false,
			popupSignal: false,
			isRecord: false,
			changeVideoLayout: false,
		}
	},
	computed: {
		videoLayouts: function () {
			return Object
				.values(this.videoLayout)
				.filter(layout => {
					return layout
				})
		}
	},
	methods: {
		setVideoLayoutForMe: function (layoutid) {
			webrtcSDK.setRemoteVideoLayout(layoutid)
			this.changeVideoLayout = false
			this.$parent.userInformation()
			this.toast('Anda telah mengganti tampilan video', 'bg-more-black', 3000)
		}
	}
}
</script>

<style lang="scss">
.video-layout-wrap {
	position: relative;
	.current-video-layout {
		display: flex;
		align-items: center;
		gap: 10px;
		background-color: #42424288;
		padding: 5px 14px;
		border-radius: 5px;
		cursor: pointer;
	}
	.available-video-layout {
		position: absolute;
		top: 42px;
		right: 0;
		background-color: #202020;
		border-radius: 5px;
		padding: 14px;
		gap: 10px;
		display: flex;
		flex-direction: column;
		.video-layout {
			display: flex;
			align-items: center;
			gap: 10px;
			border-radius: 5px;
			color: #9B9999;
			cursor: pointer;
			&:hover {
				color: white;
			}
			.layout-title {
				flex: 1 1 0%;
				display: flex;
				align-content: center;
				justify-content: space-between;
				gap: 10px;
				p {
					width: max-content;
					font-size: 14px;
				}
			}
		}
		.video-layout.current {
			color: white;
		}
		.video-layout.other {
			border-top: 1px solid #424242;
			margin: 0 -14px;
			padding: 12px 14px 0;
			border-radius: unset;
		}
	}
}
</style>