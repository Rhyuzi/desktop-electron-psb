<template>
	<upload-file-preview
		v-if="previewFile"
		:file=inputFiles
		@cancel="previewFile = false"
		@onSend="sendFiles" />
	<div class="chat-column" :class="{'d-none': !this.$parent.openChat}">
		<div class="head-section">
			<div class="top">
				<h3 class="text-gray-black">Percakapan Grup</h3>
				<div class="icon-groups">
					<div v-if="userDatas.role == 'host'" class="icon-group">
						<Icon icon="mdi:chat-remove" />
					</div>
					<div @click="onClearChats()" class="icon-group">
						<Icon icon="mdi:broom" />
					</div>
				</div>
			</div>
		</div>
		<div class="chat-section" id="chatSection">
			<div v-for="chat in chats" :key=chat class="chat" :class="chat.file ? (chat.file.type == 'File' ? 'file' : 'image') : ''">
				<div class="sender">
					{{ chat.from ? (chat.from.name || chat.from.userName) : 'Partisipan Lain' }}
					<Icon v-if="chat.from && chat.from.role == 'host'" icon="ph:crown-simple-fill" height="15" class="text-yellow-crown ms-5" />
					<Icon v-if="chat.to" icon="bi:caret-right-fill" height="9" class="text-light-green mx-7" />
					{{ chat.to ? chat.to.userName : '' }}
				</div>
				<p v-if="chat.msg" class="chat-text">
					{{ chat.msg }}
					<span class="delivered-time">{{ chat.time }}</span>
				</p>
				<a v-if="chat.file" :href=chat.file.location target="_blank" :class="{'file-info': chat.file.type == 'File'}">
					<Icon v-if="chat.file.type == 'File'" icon="ant-design:file-filled" height="29" class="text-green-name-chat" />
					<div v-if="chat.file.type == 'File'" class="text-black-gray">
						<p class="p2-bold">{{ chat.file.name }}</p>
						<p class="p3">{{ chat.file.size }}</p>
					</div>
					<img v-else-if="chat.file.type == 'Image'" :src=chat.file.location :alt=chat.file.name>
				</a>
				<p v-if="!chat.msg" class="delivered-time">{{ chat.time }}</p>
			</div>
		</div>
		<div class="send-section">
			<div @keypress.enter="onSendChat" class="text-message" contenteditable="true" placeholder="Tekan enter untuk mengirim pesan">
				{{ chatText }}
			</div>
			<div class="message-tools">
				<div class="d-inline-flex align-items-center">
					<p class="p3 text-gray">Ke</p>
					<div @click="viewpeople = !viewpeople" class="send-to-trigger">
						<p class="p3">{{ sendTo.name }}</p>
						<Icon v-if="viewpeople" icon="bi:caret-up-fill" width="6" />
						<Icon v-else icon="bi:caret-down-fill" width="6" />
					</div>
				</div>
				<div class="">
					<label for="inputFile" class="text-gray cursor-pointer">
						<input @change="onPreviewFile" type="file" id="inputFile" class="d-none">
						<Icon icon="ant-design:paper-clip-outlined" height="25" />
					</label>
				</div>
			</div>
			<div v-if="viewpeople" class="send-to-lists">
				<div>
					<label @click="currentSendTo(0, 'Semua Orang')" class="people-list-wrap" for="semua">
						<input type="radio" id="semua" name="sendTo" value="" :checked="sendTo.id == '0'">
						<div>
							<span>Semua Orang</span>
							<Icon icon="bi:check" height="28" />
						</div>
					</label>
				</div>
				<div v-for="participant in participants" :key=participant>
					<label @click="currentSendTo(participant.sipAccount, participant.dispalyName)" class="people-list-wrap">
						<input type="radio" :id="participant.sipAccount" name="sendTo" :value="participant.sipAccount">
						<div>
							<span>{{ participant.dispalyName }}</span>
							<Icon icon="bi:check" height="28" />
						</div>
					</label>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Icon } from '@iconify/vue'
import { mapGetters } from 'vuex'
import UploadFilePreview from './UploadFilePreview.vue'
export default {
	name: "KolomPercakapan",
	components: { Icon, UploadFilePreview },
	props: ['userDatas'],
	data() {
		return {
			viewpeople: false,
			// chats data
			chatText: "",
			chatLength: 0,
			sendTo: {
				id: "",
				name: "Semua Orang",
			},
			previewFile: false,
			inputFiles: {}
		}
	},
	computed: {
        ...mapGetters({
			chatLists: 'chats/getChats',
            participants: 'participants/getParticipants'
        }),
		chats: function () {
			return this.chatLists.map(item => {
				return {...item, time:item.time.substring(0, 5)}
			})
		},
		inputTextRows: function () {
			this.chatLength = this.chatText.length
			if (this.chatLength < 40) {
				return 1
			} else if (this.chatLength < 80) {
				return 2
			} else {
				return 3
			}
		}
	},
	methods: {
		onSendChat: function () {
			// let now = new Date()
			// let textElement = document.createElement('p')
			// let timeElement = document.createElement('span')
			// let chatElement = document.createElement('div')
			// textElement.setAttribute('class', 'chat-text')
			// textElement.textContent = this.chatText
			// timeElement.setAttribute('class', 'delivered-time')
			// timeElement.textContent = now.getHours().toString() + ':' + now.getMinutes().toString()
			// textElement.appendChild(timeElement)
			// chatElement.setAttribute('class', 'chat self')
			// chatElement.appendChild(textElement)
			// let finalElement = chatElement
			// document.getElementById('chatSection').appendChild(finalElement)

			if (this.chatText !== '') {
				if (this.sendTo.id == '') {
					webrtcSDK.sendMessageToAll(this.chatText, function(err){
							console.error(err);
					})
				} else {
					webrtcSDK.sendMessageToAll(this.chatText, this.sendTo.id, function(err){
						console.error(err);
					})
				}
				// console.warn('Me: ', this.userDatas.id);
				// console.warn('Send To: ', this.sendTo.id);
				// console.warn('Message: ', this.chatText);
				this.$parent.sendTextChat(this.userDatas.id, this.sendTo.id, this.chatText)
				this.chatText = ""
			} else {
				this.toast('Pesan yang dikirim tidak boleh kosong', 'bg-more-black', 3000)
			}
		},
		sendFiles: function (file) {
			if (this.sendTo.id == '0') {
				webrtcSDK.sendMessageToAll(this.chatText, function(err){
						console.error(err);
				}, file)
			} else {
				webrtcSDK.sendMessageToAll(this.chatText, this.sendTo.id, function(err){
					console.error(err);
				}, file)
			}
			this.previewFile = false
		},
		onSendFile: function (data) {
			if (data) {
				let now = new Date()
				let fileElement = document.createElement('div')
				fileElement.setAttribute('class', 'chat file self')
				let file = document.createElement('a')
				file.setAttribute('class', 'file-info')
				file.setAttribute('href', data.fileUrl)
				file.setAttribute('target', '_blank')
				let icon = document.createElement('span')
				icon.setAttribute('class', 'text-green-name-chat iconify')
				icon.setAttribute('data-icon', 'ant-design:file-filled')
				icon.setAttribute('style', 'font-size: 50px')
				let fileInfos = document.createElement('div')
				fileInfos.setAttribute('class', 'text-black-gray')
				let fileName = document.createElement('p')
				fileName.setAttribute('class', 'p2-bold')
				let fileText = data.msg
				fileName.innerText = fileText.substring(fileText.lastIndexOf('[')+1, fileText.lastIndexOf('(')).trim()
				let fileSize = document.createElement('p')
				fileSize.setAttribute('class', 'p3')
				fileSize.innerText = fileText.substring(fileText.lastIndexOf('(')+1, fileText.lastIndexOf(')'))
				fileInfos.appendChild(fileName)
				fileInfos.appendChild(fileSize)
				file.appendChild(icon)
				file.appendChild(fileInfos)
				let delivered = document.createElement('span')
				delivered.setAttribute('class', 'delivered-time')
				delivered.textContent = now.getHours().toString() + ':' + now.getMinutes().toString()
				fileElement.appendChild(file)
				fileElement.appendChild(delivered)
				let finalElement = fileElement
				document.getElementById('chatSection').appendChild(finalElement)
			}
		},
		onSendImage: function (data) {
			if (data) {
				let now = new Date()
				let timeElement = document.createElement('span')
				let imgParentElement = document.createElement('a')
				let imageElement = document.createElement('img')
				let chatElement = document.createElement('div')
				let fileText = data.msg
				imageElement.setAttribute('alt', fileText.substring(fileText.lastIndexOf('[')+1, fileText.lastIndexOf('(')).trim())
				imageElement.setAttribute('src', data.selfImgSrc)
				imgParentElement.setAttribute('href', data.selfImgSrc)
				imgParentElement.setAttribute('target', '_blank')
				imgParentElement.appendChild(imageElement)
				timeElement.setAttribute('class', 'delivered-time')
				timeElement.textContent = now.getHours().toString() + ':' + now.getMinutes().toString()
				chatElement.setAttribute('class', 'chat image self')
				chatElement.appendChild(imgParentElement)
				chatElement.appendChild(timeElement)
				let finalElement = chatElement
				document.getElementById('chatSection').appendChild(finalElement)
			}
		},
		chatFileImageMessageReceived: function (data) {
			if (data) {
				let senderElement = document.createElement('p')
				let timeElement = document.createElement('span')
				let imgParentElement = document.createElement('a')
				let imageElement = document.createElement('img')
				let chatElement = document.createElement('div')
				senderElement.setAttribute('class', 'sender')
				if (data.from === undefined) {
					senderElement.innerText = 'Partisipan Lain'
				} else {
					senderElement.innerText = data.from.name
				}
				imageElement.setAttribute('alt', data.file.name)
				imageElement.setAttribute('src', data.file.location)
				imgParentElement.setAttribute('href', data.file.location)
				imgParentElement.setAttribute('target', '_blank')
				imgParentElement.appendChild(imageElement)
				timeElement.setAttribute('class', 'delivered-time')
				timeElement.textContent = data.time
				chatElement.setAttribute('class', 'chat image')
				chatElement.appendChild(senderElement)
				chatElement.appendChild(imgParentElement)
				chatElement.appendChild(timeElement)
				let finalElement = chatElement
				document.getElementById('chatSection').appendChild(finalElement)
			}
		},
		chatFileMessageReceived: function (data) {
			if (data) {
				let fileElement = document.createElement('div')
				fileElement.setAttribute('class', 'chat file')
				let senderElement = document.createElement('p')
				senderElement.setAttribute('class', 'sender')
				if (data.from === undefined) {
					senderElement.innerText = 'Partisipan Lain'
				} else {
					senderElement.innerText = data.from.name
				}
				let file = document.createElement('a')
				file.setAttribute('class', 'file-info')
				file.setAttribute('href', data.file.location)
				file.setAttribute('target', '_blank')
				let icon = document.createElement('span')
				icon.setAttribute('class', 'text-green-name-chat iconify')
				icon.setAttribute('data-icon', 'ant-design:file-filled')
				icon.setAttribute('style', 'font-size: 50px')
				let fileInfos = document.createElement('div')
				fileInfos.setAttribute('class', 'text-black-gray')
				let fileName = document.createElement('p')
				fileName.setAttribute('class', 'p2-bold')
				fileName.innerText = data.file.name
				let fileSize = document.createElement('p')
				fileSize.setAttribute('class', 'p3')
				fileSize.innerText = data.file.size
				fileInfos.appendChild(fileName)
				fileInfos.appendChild(fileSize)
				file.appendChild(icon)
				file.appendChild(fileInfos)
				let delivered = document.createElement('span')
				delivered.setAttribute('class', 'delivered-time')
				delivered.textContent = data.time
				fileElement.appendChild(senderElement)
				fileElement.appendChild(file)
				fileElement.appendChild(delivered)
				let finalElement = fileElement
				document.getElementById('chatSection').appendChild(finalElement)
			}
		},
		chatGroupMessageReceived: function (data) {
			if (data) {
				let senderElement = document.createElement('p')
				let textElement = document.createElement('p')
				let timeElement = document.createElement('span')
				let chatElement = document.createElement('div')
				senderElement.setAttribute('class', 'sender')
				senderElement.innerText = data.from.name
				textElement.setAttribute('class', 'chat-text')
				textElement.textContent = data.msg
				timeElement.setAttribute('class', 'delivered-time')
				timeElement.textContent = data.time
				textElement.appendChild(timeElement)
				chatElement.setAttribute('class', 'chat')
				chatElement.appendChild(senderElement)
				chatElement.appendChild(textElement)
			}
		},
		chatTextFromMe: function (to, message, time) {
			let newTime = new Date(time)
			let textElement = document.createElement('p')
			let timeElement = document.createElement('span')
			let chatElement = document.createElement('div')
			textElement.setAttribute('class', 'chat-text')
			textElement.textContent = message
			timeElement.setAttribute('class', 'delivered-time')
			timeElement.textContent = newTime.getHours().toString() + ':' + newTime.getMinutes().toString()
			textElement.appendChild(timeElement)
			chatElement.setAttribute('class', 'chat self')
			chatElement.appendChild(textElement)
			let finalElement = chatElement
			document.getElementById('chatSection').appendChild(finalElement)
		},
		chatTextReceived: function (sipAccount, name, message, time) {
			const chatElement = '<div class="chat">' +
									'<p class="sender">' + name + '</p>' +
									'<p class="chat-text">' + message +
										'<span class="delivered-time">' + time + '</span>'
									'</p>' +
								'</div>'
			document.getElementById('chatSection').appendChild(chatElement)
		},
		chatPrivateMessageReceived: function (data) {
			if (data) {
				let senderElement = document.createElement('p')
				let textElement = document.createElement('p')
				let timeElement = document.createElement('span')
				let chatElement = document.createElement('div')
				senderElement.setAttribute('class', 'sender')
				senderElement.innerText = data.from.userName
				textElement.setAttribute('class', 'chat-text')
				textElement.textContent = data.msg
				timeElement.setAttribute('class', 'delivered-time')
				timeElement.textContent = data.time
				textElement.appendChild(timeElement)
				chatElement.setAttribute('class', 'chat')
				chatElement.appendChild(senderElement)
				chatElement.appendChild(textElement)
				let finalElement = chatElement
				document.getElementById('chatSection').appendChild(finalElement)
			}
		},
		chatSystemMessageReceived: function (data) {
			if (data) {
				let chatElement = document.createElement('div')
				chatElement.setAttribute('class', 'chat notif')
				chatElement.textContent = data.msg
				document.getElementById('chatSection').appendChild(chatElement)
			}	
		},
		currentSendTo: function (id, name) {
			this.sendTo.id = id
			this.sendTo.name = name
		},
		onClearChats: function () {
			let element = document.getElementById("chatSection");
			if (element.hasChildNodes() === true) {
				this.confirmDialog({
					title: 'Hapus Percakapan',
					message: 'Anda yakin ingin menghapus riwayat percakapan?',
					useCloseButton: false,
					buttonConfirmTitle: 'Hapus',
					buttonConfirmFunction: this.ClearChats,
					buttonConfirmClass: 'btn-fill-light-green',
					withCancelButton: true,
					buttonCancelTitle: 'Batal',
					buttonCancelFunction: ()=>{return},
					buttonCancelClass: 'btn-fill-gr-white',
				})
			} else {
				this.toast('Tidak ditemukan pesan untuk dihapus', 'bg-more-black', 3000)
			}
		},
		ClearChats: function () {
			let element = document.getElementById("chatSection");
			while (element.firstChild) {
				element.removeChild(element.firstChild);
			}
		},
        onPreviewFile(ev) {
            this.inputFiles = ev
			this.previewFile = true
        },
	}
}
</script>

<style>
input[type=radio]:checked + label.people-list {
	background-color: #32BA7C;
	color: white;
}
</style>