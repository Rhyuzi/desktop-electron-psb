<template>
    <div class="meeting-room">
        <div class="ruang-rapat">
            <meeting-top-nav
                :meetingDatas=meetingInfos
                :userDatas=userInfos
                :videoLayout=videoLayouts
            />
            <div class="main-section">
                <img :src=image class="img-background">
                <div id="video"></div>
                <local-camera />
            </div>
            <meeting-bottom-nav
                :meetingDatas=meetingInfos
                :userDatas=userInfos
            />
        </div>
        <kolom-percakapan
            :userDatas=userInfos />
        <kolom-daftar-peserta
            :userDatas=userInfos />
    </div>
</template>

<script>
import MeetingBottomNav from '../components/meetings/MeetingBottomNav.vue'
import MeetingTopNav from '../components/meetings/MeetingTopNav.vue'
import LocalCamera from '../components/meetings/LocalCamera.vue'
import KolomPercakapan from '../components/meetings/KolomPercakapan.vue'
import KolomDaftarPeserta from '../components/meetings/KolomDaftarPeserta.vue'
import PreJoinLoad from '../components/meetings/PreJoinLoad.vue'
import config from '../config/config'
import imgLogo from '../assets/logo-kejaksaan.png'
export default {
	components: { MeetingTopNav, MeetingBottomNav, LocalCamera, KolomPercakapan, KolomDaftarPeserta },
	data() {
		return {
            dataInfo: {
                camera: 0,
                displayName: webrtcSDK.getUserInfo().name,
                email: "",
                hostEmail: webrtcSDK.getRoomInformation().creator.split('(')[1].split(')')[0],
                meetingNum: webrtcSDK.getRoomInformation().meetingNum,
                meetingSerialNum: "",
                roleCode: "",
                sipAccount: webrtcSDK.getUserInfo().id,
                sipPwd: "",
                type: webrtcSDK.getUserInfo().devType,
            },
			image: imgLogo,
			meetingInfos: "",
			userInfos: {},
            socket: "",
            videoLayouts: {},

            // Every Clicked Event Data
            camOn: false,
            handUp: false,
            micOn: false,
            openChat: false,
            openList: false,

            // Participants
            participantList: '',
            participants: '',
            parToAppend: '',
		}
	},
	async mounted() {
        this.remoteVideoLayouts()
		this.roomInformation()
		this.userInformation()
		let self = this
		this.$nextTick(() => {
            self.addListener()
            this.remoteVideoLayouts
		})
	},
	methods: {
		roomInformation: async function () {
			this.meetingInfos = await webrtcSDK.getRoomInformation()
		},
		userInformation: async function () {
            this.userInfos = await webrtcSDK.getUserInfo()
		},
		userLists: async function () {
            this.participantList = await webrtcSDK.getUserList()
		},
        remoteVideoLayouts: async function () {
            this.videoLayouts = await webrtcSDK.getRemoteVideoLayouts()
        },
        sendTextChat: function (from, to, message, type = 'text') {
            const time = new Date().getTime()
            this.socket.emit('sendChat', {from, to, message, time, type})
            this.$store.dispatch('chats/setChat', {
                from: from,
                to: to,
                msg: message,
                time: time
            })
            if (type === 'text') {
                KolomPercakapan.methods.chatTextFromMe(to, message, time)
            }
        },
		addListener: function () {
            webrtcSDK.addEventHandler(webrtcSDK.EVENT_MEETING, this.onEvent)
        },
		onEvent: function (eventName, data) {
            switch (eventName) {
                case webrtcSDK.EVENT_CHAT_FILE_MESSAGE_RECEIVED:
                    // Get New File Chat and send it to KolomPercakapan Component
                    if (data) {
                        this.$store.dispatch('chats/setChat', data)
                    }
                    break;
                case webrtcSDK.EVENT_CHAT_FILE_UPLOADED:
                    // Get New File Chat and send it to KolomPercakapan Component
                    if (data) {
                        // if (data.uploadType === 'file') {
                        //     // Sent other file type to KolomPercakapan Component
                        //     KolomPercakapan.methods.onSendFile(data)
                        // } else {
                        //     // Sent file type image to KolomPercakapan Component
                        //     KolomPercakapan.methods.onSendImage(data)
                        // }
                        this.$store.dispatch('chats/setChat', data)
                    }
                    break;
                case webrtcSDK.EVENT_CHAT_GROUP_MESSAGE_RECEIVED:
                    // Get New Group Chat and send it to KolomPercakapan Component
                    if (data) {
                        this.$store.dispatch('chats/setChat', data)
                    }
                    break;
                case webrtcSDK.EVENT_CHAT_PRIVATE_MESSAGE_RECEIVED:
                    // Get New Private Chat and send it to KolomPercakapan Component
                    if (data) {
                        // KolomPercakapan.methods.chatPrivateMessageReceived(data)
                        console.warn(data);
                        this.$store.dispatch('chats/setChat', data)
                    }
                    break;
                case webrtcSDK.EVENT_CHAT_SYSTEM_MESSAGE_RECEIVED:
                    // Get New System Chat and send it to KolomPercakapan Component
                    if (data) {
                        // KolomPercakapan.methods.chatSystemMessageReceived(data)
                        this.$store.dispatch('chats/setChat', data)
                        this.userInformation
                        this.userLists()
                    }
                    break;
                case webrtcSDK.EVENT_MAIN_VIDEO_PLAYER_BIND_STREAM:
                    // Main Video Meeting for Mac
                    if(data){
                        data.setAttribute('style', 'width: 100%; max-width: 100vw; height: calc(100vh - 70px); max-height: calc(100vh - 70px)');
                        data.setAttribute('autoplay', '');
                        data.setAttribute('playsinline', 'true');
                        data.setAttribute('webkit-playsinline', 'true');

                        if(document.getElementById(data.id) == null || document.getElementById('mainVideo') == null) {
                            document.getElementById('video').appendChild(data);
                        }

                        document.getElementById(data.id).play();
                        
                    }

                    break;
                case webrtcSDK.EVENT_MAIN_VIDEO_OPEN:
                    // Main Video Meeting for Windows
                    if (data) {
                        data.setAttribute('style', 'width: 100%; max-width: 100vw; height: calc(100vh - 70px); max-height: calc(100vh - 70px)');
                        data.setAttribute('autoplay', '');
                        data.setAttribute('playsinline', 'true');
                        data.setAttribute('webkit-playsinline', 'true');

                        if(document.getElementById(data.id) == null || document.getElementById('mainVideo') == null) {
                            document.getElementById('video').appendChild(data);
                        }
                        
                        document.getElementById(data.id).play();
                    }
                    break;
                case webrtcSDK.EVENT_PRESENT_VIDEO_CLOSE:
                    if (data) {
                        // Remove Share Screen Video When Close
                        let shareVideo = document.getElementById(data.id)
                        shareVideo.remove()
                        if (document.getElementById('mainVideo') != null) {
                            document.getElementById('mainVideo').play()
                            document.getElementById('mainVideo').style.display = 'block'
                        }
                    }
                    break
                case webrtcSDK.EVENT_PRESENT_VIDEO_PLAYER_BIND_STREAM:
                    // Get Share Screen Video fo Mac
                    if (data) {
                        data.setAttribute('style', 'width: 100%; max-width: 100vw; height: calc(100vh - 70px); max-height: calc(100vh - 70px)');
                        data.setAttribute('autoplay', '');
                        data.setAttribute('playsinline', 'true');
                        data.setAttribute('webkit-playsinline', 'true');
                        if (document.getElementById('mainVideo') != null) {
                            document.getElementById('mainVideo').style.display = 'none'
                            document.getElementById('mainVideo').pause()
                        }
                        if(document.getElementById(data.id) == null || document.getElementById('shareVideo') == null) {
                            document.getElementById('video').appendChild(data);
                        }
                        document.getElementById(data.id).play();
                    }
                    break;
                case webrtcSDK.EVENT_PRESENT_VIDEO_OPEN:
                    // Get Share Screen Video for Windows
                    if (data) {
                        data.setAttribute('style', 'width: 100%; max-width: 100vw; height: calc(100vh - 70px); max-height: calc(100vh - 70px)');
                        data.setAttribute('autoplay', '');
                        data.setAttribute('playsinline', 'true');
                        data.setAttribute('webkit-playsinline', 'true');
                        if (document.getElementById('mainVideo') != null) {
                            document.getElementById('mainVideo').style.display = 'none'
                            document.getElementById('mainVideo').pause()
                        }
                        if(document.getElementById(data.id) == null || document.getElementById('shareVideo') == null) {
                            document.getElementById('video').appendChild(data);
                        }
                        document.getElementById(data.id).play();
                    }
                    break;
                case webrtcSDK.EVENT_USER_REMOVED_FROM_MEETING:
                    // When Removed from Meeting
                    if (data) {
                        this.$router.push({
                            path: '/',
                            replace: true
                        })
                    }
                    break;
                case webrtcSDK.EVENT_JOIN_MEETING_SUCCESS:
                    console.info('EVENT_JOIN_MEETING_SUCCESS', data);
                    break;
                case webrtcSDK.EVENT_JOIN_MEETING_ERROR:
                    console.info('EVENT_JOIN_MEETING_ERROR', data);
                    break;
                case webrtcSDK.EVENT_MEETING_PREPARATION_START:
                    console.info('EVENT_MEETING_PREPARATION_START', data);
                    break;
                case webrtcSDK.EVENT_MEETING_START:
                    console.info('EVENT_MEETING_START', data);
                    break;
                case webrtcSDK.EVENT_USER_NUMBER_CHANGE:
                    console.info('EVENT_USER_NUMBER_CHANGE', data);
                    break;
                case webrtcSDK.EVENT_SILENT_OUTPUT_DEVICE_DETECTED:
                    console.info('EVENT_SILENT_OUTPUT_DEVICE_DETECTED', data);
                    break;
                case webrtcSDK.EVENT_REMOTE_AUDIO_PLAYER_BIND_STREAM:
                    // if (data) {
                    //     console.info('EVENT_REMOTE_AUDIO_PLAYER_BIND_STREAM', data);
                    // }
                    break;
                case webrtcSDK.EVENT_MEDIA_PLAYER_AUTOPLAY_PREVENTED:
                    if (data) {
                        console.log('EVENT_MEDIA_PLAYER_AUTOPLAY_PREVENTED: ', data);
                    }
                    break;
                case webrtcSDK.EVENT_HANDS_UP_SUCCESS:
                    if (data) {
                        console.warn('EVENT_HANDS_UP_SUCCESS: ', data);
                    }
                    break;
                case webrtcSDK.EVENT_SHARED_CAMERA_PREVIEW_BIND_STREAM:
                    console.warn('EVENT_SHARED_CAMERA_PREVIEW_BIND_STREAM: ', data);
                    if (data) {
                        // Receive Video from someone
                        data.setAttribute('style', 'position: absolute; z-index: 9999; width: 100vw; transform: translate(-50%, -50%)');
                        data.setAttribute('autoplay', '');
                        data.setAttribute('playsinline', 'true');
                        data.setAttribute('webkit-playsinline', 'true');
                        if(document.getElementById(data.id) == null || document.getElementById('mainVideo') == null) {
                            document.getElementById('video').appendChild(data);
                        }
                        let video = document.getElementById(data.id).play();

                        if(video !== undefined) {
                            video.then(_ => {
                                console.log(_)
                            }).catch(error => {
                                console.err(error)
                            })
                        }
                        // document.getElementById(data.id).play();
                    }
                    break;
                case webrtcSDK.EVENT_LOCAL_VIDEO_PREVIEW_PLAYER_BIND_STREAM:
                    console.warn('EVENT_LOCAL_VIDEO_PREVIEW_PLAYER_BIND_STREAM', data);
                    // if (data) {
                    //     data.setAttribute('style', 'height: 135px; width: auto; border-radius: 5px; opacity: 1; transform: scale(1, 1); cursor: move;');
                    //     data.setAttribute('autoplay', '');
                    //     data.setAttribute('playsinline', 'true');
                    //     data.setAttribute('webkit-playsinline', 'true');
                    //     if(document.getElementById(data.id) == null || document.getElementById('cameraPrev') == null) {
                    //         document.getElementById('localVideo').appendChild(data);
                    //     }
                    //     let localVideo = document.getElementById(data.id).play();
                    // }
                    break;
                case webrtcSDK.EVENT_LOCAL_VIDEO_PREVIEW_PLAYER_OPEN:
                    // Local Camera Mini Player
                    // if (data) {
                    //     data.setAttribute('style', 'height: 135px; width: auto; border-radius: 5px; opacity: 1; transform: scale(1, 1); cursor: move;');
                    //     data.setAttribute('autoplay', '');
                    //     data.setAttribute('playsinline', 'true');
                    //     data.setAttribute('muted', '');
                    //     data.setAttribute('webkit-playsinline', 'true');
                    //     if(document.getElementById(data.id) == null || document.getElementById('cameraPrev') == null) {
                    //         document.getElementById('localVideo').appendChild(data);
                    //     }
                    //     let localVideo = document.getElementById(data.id).play();
                    // }
                    break;
                case webrtcSDK.EVENT_OPEN_CAMERA_PREVIEW_VIDEO_OPEN:
                    console.info('EVENT_OPEN_CAMERA_PREVIEW_VIDEO_OPEN', data);
                    // if (data) {
                    //     data.setAttribute('style', 'position: absolute; z-index: 9999; width: 100vw; transform: translate(-50%, -50%)');
                    //     data.setAttribute('autoplay', '');
                    //     data.setAttribute('playsinline', 'true');
                    //     data.setAttribute('webkit-playsinline', 'true');
                    //     document.getElementById('video').appendChild(data);
                    // }
                    break;
                case webrtcSDK.EVENT_OPEN_CAMERA_PREVIEW_VIDEO_CLOSE:
                    console.log('EVENT_OPEN_CAMERA_PREVIEW_VIDEO_CLOSE', data);
                    // if (data) {
                    //     let prevVideo = document.getElementById(data.id);
                    //     prevVideo.remove();
                    // }
                    break;
                case webrtcSDK.EVENT_PRESENT_VIDEO_PLAYER_BIND_STREAM:
                    console.warn('EVENT_PRESENT_VIDEO_PLAYER_BIND_STREAM', data);
                    if (data) {
                    }
                    break;
                case webrtcSDK.EVENT_OPEN_DOCUMENT:
                    console.warn('EVENT_OPEN_DOCUMENT', data);
                    if (data) {
                    }
                    break;
                case webrtcSDK.EVENT_SPEECH_RECOGNITION_INFO_HANDLER:
                    if (data) {
                        console.log('EVENT_SPEECH_RECOGNITION_INFO_HANDLER', data);
                    }
                    break;
                case webrtcSDK.EVENT_CHAT_PANELIST_MESSAGE_RECEIVED:
                    if (data) {
                        console.log('EVENT_CHAT_PANELIST_MESSAGE_RECEIVED', data);
                    }
                    break;
                case webrtcSDK.EVENT_WHITEBOARD_STATUS_CHANGE:
                    // if(data){
                    //     console.log('EVENT_WHITEBOARD_STATUS_CHANGE', data);
                    //     if(data.status == 1) {
                    //         // Receive Whiteboard from another and show it
                    //         setTimeout(() => {
                    //             var dataIframe = '<iframe data-host="0" id="whiteboard-iframe" name="whiteboard-iframe-webrtc" allowfullscreen="true" '
                    //             + ' webkitallowfullscreen="true" mozallowfullscreen="true" '
                    //             + ' src="' + data.whiteboardAddr + '"'
                    //             + ' ></iframe>';
                    //             // console.log("dataIframe:" + dataIframe);
                    //             // $("#ctxShowBox").css({"height": "511px", "width": "908.444px"});
                    //             $('#container_main_video').html(dataIframe);
                    //             // document.getElementById("video-stream-norm").style.display='block';
                    //         }, 1000);
                    //     } else if(data.status == 2) {
                    //         // Receive Document from another and show it
                    //         setTimeout(() => {
                    //             var dataIframe = '<iframe data-host="0" id="whiteboard-iframe" name="whiteboard-iframe-webrtc" allowfullscreen="true" '
                    //             + ' webkitallowfullscreen="true" mozallowfullscreen="true" '
                    //             + ' src="' + data.whiteboardAddr + '&type=doc"'
                    //             + ' ></iframe>';
                    //             // console.log("dataIframe:" + dataIframe);
                    //             // $("#ctxShowBox").css({"height": "511px", "width": "908.444px"});
                    //             $('#container_main_video').html(dataIframe);
                    //             // document.getElementById("video-stream-norm").style.display='block';
                    //         }, 1000);

                    //     } else {
                    //         $('#container_main_video').html("");
                    //     }

                    // }
                    break;
                case webrtcSDK.EVENT_MEETING_EXIT:
                    // if (data) {
                    //     let self = this;
                    //     this.$f7.dialog
                    //         .create({
                    //             title: 'The Meeting Has Ended',
                    //             closeByBackdropClick: 'fasle',
                    //             buttons: [
                    //                 {
                    //                     text: 'OK',
                    //                     onClick: function() {
                    //                         if(this.isCamera) {
                    //                             self.closeCamera();
                    //                         }
                    //                         if(this.isMic) {
                    //                             self.stopLocalAudio();
                    //                         }
                    //                         self.backToPage('/');
                    //                     },
                    //                 },
                    //             ],
                    //         })
                    //         .open();
                    // }
                    break;
                case webrtcSDK.EVENT_MEDIA_NETWORK_STATE_CHANGE:
                    // Network in Networks Informations
                    if (data) {
                        
                    }
                    break;
                case webrtcSDK.EVENT_MEETING_END:
                    // if (data) {
                    //     let self = this;
                    //     this.$f7.dialog
                    //         .create({
                    //             title: 'The Meeting Has Ended',
                    //             closeByBackdropClick: 'fasle',
                    //             buttons: [
                    //                 {
                    //                     text: 'OK',
                    //                     onClick: function() {
                    //                         if(this.isCamera) {
                    //                             self.closeCamera();
                    //                         }
                    //                         if(this.isMic) {
                    //                             self.stopLocalAudio();
                    //                         }
                    //                         self.backToPage('/');
                    //                     },
                    //                 },
                    //             ],
                    //         })
                    //         .open();
                    // }
                    break;
                default:
                    break;
            }
		},

	}
}
</script>

<style>

</style>