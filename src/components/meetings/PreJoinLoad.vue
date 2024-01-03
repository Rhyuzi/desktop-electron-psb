<template>
	<div class="pre-join-load">
		<img :src=image class="mb-40">
		<div class="loading-self">
			<div class="outer-ring">
				<div class="inside-ring"></div>
			</div>
		</div>
		<div class="p2 text-gray mt-30">Anda akan segera bergabung dalam rapat</div>
	</div>
</template>

<script>
import imgLogo from '../../assets/logo-kejaksaan.png'
export default {
	name: "PreJoinLoad",
	data() {
		return {
			image: imgLogo,
		}
	}
}
</script>

<style lang="scss">
.pre-join-load {
	position: absolute;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	animation: gradient-bg 5s;
	img {
		height: 120px;
		animation: img-grayscale 4s forwards;
	}
}
@keyframes gradient-bg {
	0% {
		background-color: #f3f3f3;
	}
	100% {
		background-color: #000000;
	}
}
@keyframes img-grayscale {
	0% {
		filter: saturate(1);
		opacity: 1;
	}
	100% {
		filter: saturate(0);
		opacity: .5;
	}
}
/* Loading */
@keyframes loading-double-ring {
  0% { transform: rotate(0) }
  100% { transform: rotate(360deg) }
}
.loading-self {
	width: 40px;
	height: 40px;
	.outer-ring {
		width: 40px;
		height: 40px;
		border: 4px solid;
		border-color: #9b9999 #9b9999 #9b9999 transparent;
		border-radius: 50%;
		animation: loading-double-ring 1s linear infinite;
		display: flex;
		align-items: center;
		justify-content: center;
		.inside-ring {
			border: 4px solid;
			border-color: #9b9999 #9b9999 #9b9999 transparent;
			border-radius: 50%;
			animation: loading-double-ring .5s linear infinite reverse;
			width: 24px;
			height: 24px;
		}
	}
}
</style>