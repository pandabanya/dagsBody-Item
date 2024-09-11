<template>
	<view class="welcome-page" v-if="imgSrc">
		<!-- 	<image :src="imgSrc" mode="aspectFill"></image> -->
		<view class="welcome-title shake-animation">欢迎来到牛马Item</view>
		<lottie :options="defaultOptions" v-on:animCreated="handleAnimation"></lottie>
		<view class="bottom-box">
			<view>{{time}}</view>
			<view @click="gotoIndex">跳过</view>
		</view>
	</view>
</template>

<script>
	import * as animationData from '@/static/lottie/welcome.json'
	export default {
		data() {
			return {
				defaultOptions: {
					animationData: animationData
				},
				imgSrc: require('../../static/welcome/welcome.jpg'),
				time: 5,
				timer: null
			};
		},
		onLoad() {
			this.countDown()
		},
		onUnload() {
			if (this.timer) {
				clearInterval(this.timer)
				this.timer = null
			}
		},
		onShow() {
			console.log(document);
		},
		methods: {
			handleAnimation(anim) {
				this.anim = anim;
				console.log(anim);
			},
			/**
			 * 跳转到首页
			 */
			gotoIndex() {
				uni.reLaunch({
					url: '/pages/index/index'
				});
			},
			/**
			 * 倒计时
			 */
			countDown() {
				this.time = 5
				this.timer = setInterval(() => {
					this.time--;
					if (this.time < 1) {
						clearInterval(this.timer)
						this.time = 0
						this.gotoIndex()
					}
				}, 1000)
			}
		}
	}
</script>

<style lang="scss">
	.welcome-page {
		position: relative;
		width: 100vw;
		height: 100vh;
		background-color: #4690d9;
		.shake-animation {
			color: #333;
			animation: shake-it 3s infinite linear;
		}

		@keyframes shake-it {
			0% {
				transform: translateY(0);
			}

			25% {
				transform: translateY(-10px);
			}

			50% {
				transform: translateY(10px);
			}

			75% {
				transform: translateY(-10px);
			}

			100% {
				transform: translateY(10px);
			}
		}

		.welcome-title {
			position: fixed;
			font-size: 30px;
			top: 180rpx;
			transform: translateX(-50%);
			width: 100%;
			text-align: center;
			color: #fff;

		}

		image {
			display: block;
			width: 100%;
			height: 100%;
		}

		.bottom-box {
			position: absolute;
			left: 0;
			bottom: 80rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			padding: 0 60rpx;
			box-sizing: border-box;

			view {
				width: 120rpx;
				height: 64rpx;
				background-color: rgba(0, 0, 0, .3);
				border-radius: 999rpx;
				text-align: center;
				line-height: 64rpx;
				color: #fff;
				font-size: 28rpx;
			}
		}
	}
</style>