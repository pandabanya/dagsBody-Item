<template>
	<div class="TheCircle">
		<div class="Water">
			<div class="wave1" :style="{'height': height}"></div>
			<span class="CenteredText">喝水进度 {{ heightPer }}%</span>
			<div class="wave2"></div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			heightPer: {
				type: Number,
				default: 0
			},
			height: {
				type: String,
				default: '0'
			}
		}
	}
</script>

<style scoped lang="scss">
	.TheCircle {
		position: relative;
		width: 600rpx;
		margin: 0 auto;
		height: 700rpx;
		overflow: hidden;
		cursor: pointer;
		clip-path: polygon(0% 0%, 100% 0, 80% 100%, 20% 100%);
	}

	.Water {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #00aaff;
		overflow: hidden;
		z-index: 1;
		border-radius: 10px;
	}

	.CenteredText {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #fff;
		z-index: 2;
	}

	.wave1 {
		width: 400px;
		// outline: 2px dashed gray;
		--c: #2196F3;
		--w1: radial-gradient(100% 57% at top, #0000 100%, var(--c) 100.5%) no-repeat;
		--w2: radial-gradient(100% 57% at bottom, var(--c) 100%, #0000 100.5%) no-repeat;
		background: var(--w1), var(--w2), var(--w1), var(--w2);
		background-position-x: -200%, -100%, 0%, 100%;
		background-position-y: 100%;
		background-size: 50.5% 100%;
		transition: all .5s cubic-bezier(0.215, 0.610, 0.355, 1);
		animation: m 1s infinite linear;
		position: absolute;
		bottom: 0;
	}

	@keyframes m {
		0% {
			background-position-x: -200%, -100%, 0%, 100%
		}

		100% {
			background-position-x: 0%, 100%, 200%, 300%
		}
	}
</style>