<template>
	<view class="food-container">
		<view class="top-header">
			<view class="title">今天吃啥</view>
			<u-icon name="search" size="24"></u-icon>
		</view>
		<view class="cai-conatiner">
			<z-swiper ref="zSwiper" v-model="list" :options="options" @swiper="swiper">
				<z-swiper-item swiper-item-width="800rpx" v-for="(item,index) in list" :key="index">
					<view class="cp-box" @tap="goFoodDetil">
						<view class="cp-name">{{item.name}}</view>
						<image class="image" :src="item.imgUrl">
						</image>
						<view :class="item.isLike ? 'cp-like like':'cp-like dont-like'"></view>
					</view>
				</z-swiper-item>
			</z-swiper>
			<div class="choose">
				<button class="dont" @tap="nextFood">不想吃</button>
				<button class="isit">就它了</button>
			</div>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						name: "波龙啊",
						imgUrl: require("../../static/images/caipin/1.png"),
						isLike: false
					},
					{
						name: "波龙啊",
						imgUrl: require("../../static/images/caipin/1.png"),
						isLike: false
					}
				],
				options: {
					loop: true,
					speed: 1000,
					slidesPerView: 1,
					spaceBetween: 120,
					centeredSlides: true,
					watchSlidesProgress: true,
				}
			};
		},
		mounted() {},
		methods: {
			goFoodDetil(){
				uni.navigateTo({
					url: '/pages/foodsList/foodDetail'
				})
			},
			nextFood(){
				this.$refs.zSwiper.swiper.slideNext();
			},
			swiper() {
				this.$refs.zSwiper.swiper.on("setTranslate", (swiper) => {
					let slideList = swiper.slides
					slideList.map((i,index) => {
						let slide = slideList[index]
						let progress = slide.progress
						slide.css({
							'opacity': '',
							'background': '',
						});
						slide.transform(''); //清除样式
						slide.transform('rotate(' + progress * 30 + 'deg)');
					})

				})
				this.$refs.zSwiper.swiper.on("setTransition", (swiper, transition) => {
					let slideList = swiper.slides
					slideList.map((i,index) => {
						let slide = slideList[index]
						slide.transition(transition)
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.food-container {
		.top-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 40rpx;

			.title {
				font-size: 60rpx;
				font-weight: bold;
			}
		}

		.cai-conatiner {
			width: 94%;
			margin: 0 auto;
			overflow: hidden;

			.choose {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 50rpx;
				button{
					width: 240rpx;
					border-radius: 10px;
					box-sizing: content-box;
					color: #fff;
				}
				.dont{
					border: 1px solid #6C6C6C;
					background-color: #6C6C6C;
				}
				.isit{
					border: 1px solid #ff6036;
					background-color: #ff6036;
				}
			}

			.cp-box {
				position: relative;
				width: 100%;
				height: 960rpx;
				border-radius: 30rpx;
				overflow: hidden;

				.cp-name {
					position: absolute;
					font-size: 48rpx;
					color: #fff;
					left: 30rpx;
					bottom: 60rpx;
				}

				.cp-like {
					position: absolute;
					right: 30rpx;
					bottom: 45rpx;
					width: 96rpx;
					height: 96rpx;

					&.dont-like {
						background-image: url('../../static/images/caipin/bxh.png');
					}

					&.like {
						background-image: url('../../static/images/caipin/xh.png');
					}
				}

				image {
					width: 100%;
					height: 100%;
				}

			}
		}
	}
</style>