<template>
  <div class="upload-preview">
		<!-- <transition name="slide-down" appear> -->
            <div class="preview-card">
                <figure class="preview-image" :class="{'d-none': !isFileImg}">
                    <img id="previewImage" alt="Current Image">
                </figure>
                <div class="preview-file" :class="{'d-none': isFileImg}">
					<p class="p2-bold" id="fileName"></p>
					<Icon icon="ant-design:file-filled" class="text-green-name-chat" height="80" />
					<p class="p3" id="fileSize"></p>
                </div>
                <div class="card-body">
                    <p v-if="isFileImg" class="p2">Apakah Anda yakin ingin mengirim gambar ini ke Semua Orang?</p>
                    <p v-else class="p2">Apakah Anda yakin ingin mengirim dokumen ini ke Semua Orang?</p>
                </div>
                <div class="card-footer">
                    <button @click="$emit('cancel')" class="btn-fill-gr-white">Batal</button>
                    <button @click="$emit('onSend', file.target.files[0])" class="btn-fill-light-green">Kirim</button>
                </div>
            </div>
        <!-- </transition> -->
  </div>
</template>

<script>
import { Icon } from '@iconify/vue'
export default {
    name: 'UploadFilePreview',
	components: { Icon },
    props: ['file'],
	data() {
		return {
			isFileImg: false,
		}
	},
    mounted() {
        this.getInputImage(this.file)
    },
    methods: {
        getInputImage(fileInput) {
			// Get File extension
			let theFile = fileInput.target.files[0]
			let fileName = theFile.name
			let fileExt = fileName.split("?")[0].split("#")[0].split('.').pop()
			if (fileExt === 'tiff' || fileExt === 'pjp' || fileExt === 'jfif' || fileExt === 'bmp' || fileExt === 'gif' || fileExt === 'svg' || fileExt === 'png' || fileExt === 'xbm' || fileExt === 'dib' || fileExt === 'jxl' || fileExt === 'jpeg' || fileExt === 'svgz' || fileExt === 'jpg' || fileExt === 'webp' || fileExt === 'ico' || fileExt === 'tif' || fileExt === 'pjpeg' || fileExt === 'avif') {
				this.isFileImg = true
				let prevComponent = document.getElementById('previewImage')
				let result = prevComponent.setAttribute('src', URL.createObjectURL(theFile))
				prevComponent.onload = function () {URL.revokeObjectURL(result)}
			} else {
				this.isFileImg = false
				let fileNameComp = document.getElementById('fileName')
				let fileSizeComp = document.getElementById('fileSize')
				fileNameComp.textContent = fileName
				fileSizeComp.textContent = theFile.size + 'b'
			}
        }
    }
}
</script>


<style lang="scss">
.upload-preview {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(66, 66, 66, .8);
	.preview-card {
		width: 416px;
		text-align: center;
		background-color: white;
		border-radius: 5px;
		.preview-image {
			background-color: black;
			margin: 0;
			border-radius: 5px 5px 0 0;
			img {
				height: 100%;
				width: 100%;
				max-width: 416px;
				max-height: 416px;
				object-fit: contain;
				border-radius: 5px 5px 0 0;
			}
		}
		.preview-file {
			background-color: #E0FFC8;
			padding: 15px;
			display: flex;
			flex-direction: column;
			gap: 5px;
			align-items: center;
		}
		.card-body {
			padding: 25px 30px 20px;
		}
		.card-footer {
			background-color: white;
			display: flex;
			gap: 15px;
			padding: 20px 0;
			justify-content: center;
			button {
				font-weight: 400;
			}
		}
        .close-button {
            position: absolute;
            top: 15px;
            right: 15px;
            color: #9B9999;
            cursor: pointer;
        }
	}
}
</style>