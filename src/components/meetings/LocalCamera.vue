<template>
	<div @mousedown="dragMouseDown" id="myLocalVideo" class="local-video">
		<video ref="camera" id="theVideo" muted autoplay></video>
	</div>
</template>

<script>
export default {
	name: "LocalCamera",
	data() {
		return {
			pos1: 0,
			pos2: 0,
			pos3: 0,
			pos4: 0,
		}
	},
	methods: {
		startCameraStream() {
			const constraints = (window.constraints = {
				audio: false,
				video: true
			})
			navigator
				.mediaDevices
				.getUserMedia(constraints).then(stream => {
					document.getElementById('theVideo').srcObject = stream
				})
				.catch(err => {
					alert("Browser tidak mendukung atau ada error" + err)
				})
		},
		stopCameraStream: function () {
			let tracks = document.getElementById('theVideo').srcObject.getTracks()
			tracks.forEach(track => {
				track.stop()
			});
		},
		// Start Dragable Component
		dragMouseDown: function (event) {
			event = event || window.event
			event.preventDefault()
			this.pos3 = event.clientX
			this.pos4 = event.clientY
			document.onmousemove = (event) => {
				event = event || window.event
				event.preventDefault()
				this.pos1 = this.pos3 - event.clientX
				this.pos2 = this.pos4 - event.clientY
				this.pos3 = event.clientX
				this.pos4 = event.clientY
				document.getElementById('myLocalVideo').style.top = (document.getElementById('myLocalVideo').offsetTop - this.pos2) + "px"
				document.getElementById('myLocalVideo').style.left = (document.getElementById('myLocalVideo').offsetLeft - this.pos1) + "px"
			}
			document.onmouseup = () => {
				document.onmouseup = null
				document.onmousemove = null
			}
		},
	}
}
</script>

<style lang="scss">
.local-video {
	position: absolute;
	right: 30px;
	bottom: 30px;
	z-index: 0;
	video {
		height: 135px;
		width: auto;
		border-radius: 5px;
		transform: scale(1, 1);
	}
}
</style>