<template>
	<div class="jaringan-popup p2 text-white">
        <div class="jaringan-grid">
            <div class="d-flex flex-column justify-content-start gap-5">
                <p class="p2">Status Jaringan</p>
                <h2 v-if="network == 0" class="text-red">BURUK</h2>
                <h2 v-else-if="network == 1" class="text-SEDANG">SEDANG</h2>
                <h2 v-else class="text-light-green">BAGUS</h2>
            </div>
            <div class="d-flex flex-column justify-content-start gap-5">
                <p class="p2">Server</p>
                <h2 class="">LOKAL</h2>
            </div>
            <!-- Kecepatan -->
            <div class="d-flex flex-column justify-content-start gap-5">
                <p class="p2-bold">Kecepatan</p>
                <div class="d-flex align-items-center gap-10">
                    <Icon icon="bi:arrow-up-circle" height="20" class="text-yellow-crown" />
                    <span>238.81 Kbps</span>
                </div>
                <div class="d-flex align-items-center gap-10">
                    <Icon icon="bi:arrow-down-circle" height="20" class="text-light-green" />
                    <span>0.00%, opus</span>
                </div>
            </div>
            <!-- Video -->
            <div class="d-flex flex-column justify-content-start gap-5">
                <p class="p2-bold">Video</p>
                <div class="d-flex align-items-center gap-10">
                    <Icon icon="bi:arrow-up-circle" height="20" class="text-yellow-crown" />
                    <span>{{ video.up == '' ? 'tidak ada' : video.up + ', H264, 1280*720' }}</span>
                </div>
                <div class="d-flex align-items-center gap-10">
                    <Icon icon="bi:arrow-down-circle" height="20" class="text-light-green" />
                    <span>{{ video.down == '' ? 'tidak ada' : video.down + ', H264, 1280*720' }}</span>
                </div>
            </div>
            <!-- Suara -->
            <div class="d-flex flex-column justify-content-start gap-5">
                <p class="p2-bold">Suara</p>
                <div class="d-flex align-items-center gap-10">
                    <Icon icon="bi:arrow-up-circle" height="20" class="text-yellow-crown" />
                    <span>{{ audio.up == '' ? 'tidak ada' : audio.up + ', opus' }}</span>
                </div>
                <div class="d-flex align-items-center gap-10">
                    <Icon icon="bi:arrow-down-circle" height="20" class="text-light-green" />
                    <span>{{ audio.down == '' ? 'tidak ada' : audio.down + ', opus' }}</span>
                </div>
            </div>
            <!-- Presentasi -->
            <div class="d-flex flex-column justify-content-start gap-5">
                <p class="p2-bold">Presentasi</p>
                <div class="d-flex align-items-center gap-10">
                    <Icon icon="bi:arrow-up-circle" height="20" class="text-yellow-crown" />
                    <span>{{ share.up == '' ? 'tidak ada' : share.up + ', H264, 1280*720' }}</span>
                </div>
                <div class="d-flex align-items-center gap-10">
                    <Icon icon="bi:arrow-down-circle" height="20" class="text-light-green" />
                    <span>{{ share.down == '' ? 'tidak ada' : share.down + ', H264, 1280*720' }}</span>
                </div>
            </div>
        </div>
		<div @click="$emit('close')" class="close-button">
            <Icon icon="bi:x" height="30" />
		</div>
	</div>
</template>

<script>
import { Icon } from '@iconify/vue'
export default {
    components: { Icon },
	props: ['meetingInfo', 'userInfo'],
    data() {
        return {
            audio: {},
            network: 3,
            share: {},
            video: {},
        }
    },
    mounted: function () {
        this.audio = webrtcSDK.viewAudioPackLossRate()
        this.share = webrtcSDK.viewDemoVideoPackLossRate()
        this.video = webrtcSDK.viewVideoPackLossRate()
        setInterval(()=>{
            this.updateRate()
        }, 250)
    },
	methods: {
        copyMeetingUrl: function () {
            navigator.clipboard.writeText(this.meetingInfo.roomUrl)
			this.toast('Permalink Rapat Telah Disalin', 'bg-more-black', 3000)
		},
        updateRate: function () {
            this.audio = webrtcSDK.viewAudioPackLossRate()
            this.share = webrtcSDK.viewDemoVideoPackLossRate()
            this.video = webrtcSDK.viewVideoPackLossRate()
        }
	}
}
</script>

<style lang="scss">
.jaringan-popup {
	position: absolute;
	left: 50px;
	top: 72px;
	background-color: #202020;
	padding: 25px 30px 40px;
	border-radius: 5px;
	width: 410px;
	z-index: 1;
    .jaringan-grid {
        display: grid;
        grid-template-columns: max-content 1fr;
        grid-column-gap: 49px;
        grid-row-gap: 20px;
    }
	.close-button {
		position: absolute;
		top: 15px;
		right: 15px;
		color: #9B9999;
		cursor: pointer;
	}
}
</style>