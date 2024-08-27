<template>
	<div class="TheCircle">
		<div class="Water">
			<div class="wave1"></div>
			<span class="CenteredText">喝水进度</span>
			<div class="wave2"></div>
		</div>
	</div>
</template>

<script>
</script>

<style scoped lang="scss">
	.TheCircle {
		position: relative;
		width: 500rpx;
		height: 500rpx;
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
	}

	.CenteredText {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #333;
		z-index: 2;
	}

	.wave1 {
		width: 400px;
		height: 200px;
		outline: 2px dashed gray;
		--c: #2196F3;
		--w1: radial-gradient(100% 57% at top, #0000 100%, var(--c) 100.5%) no-repeat;
		--w2: radial-gradient(100% 57% at bottom, var(--c) 100%, #0000 100.5%) no-repeat;
		background: var(--w1), var(--w2), var(--w1), var(--w2);
		background-position-x: -200%, -100%, 0%, 100%;
		background-position-y: 100%;
		background-size: 50.5% 100%;
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

	// .wave2 {
	// 	content: '';
	// 	position: absolute;
	// 	top: 0;
	// 	left: 50%;
	// 	width: 200%;
	// 	height: 100%;
	// 	border-radius: 32%;
	// 	background-color: rgba(240, 228, 228, 0.2);
	// 	background: linear-gradient(to right, #ff6347, #ffca6a);
	// 	background-repeat: repeat-x;
	// 	/* 水波纹外部颜色及透明度 */
	// 	animation: real 7s linear infinite;
	// 	/* 虚拟水波纹的动画效果 */
	// }

	@keyframes real {
		0% {
			transform: translateX(-100%);
		}

		100% {
			transform: translateX(100%);
		}
	}

	@keyframes virtual {
		0% {
			/* 初始状态：向上平移50%、左平移60%，不进行缩放，旋转0度 */
			transform: translate(-50%, -60%) scale(1) rotate(0deg);
		}

		100% {
			/* 终止状态：向上平移50%、左平移60%，进行1.1倍的缩放，旋转360度，
	            形成旋转一周的效果并放大水波纹 */
			transform: translate(-50%, -60%) scale(1.1) rotate(360deg);

		}
	}
</style>