<template>
	<view class="drink-container">
		<text class="title">今天也要多喝水哦</text>
		<DrinkWater id="drinkWater" ref="drinkWater" :height='height' :heightPer="heightPer" />
		<u-gap height="50" bgColor="#fff"></u-gap>
		<div class="set-wrapper">
			<u-gap height="10" bgColor="#fff"></u-gap>
			<u-button @click="show2 = true" color="linear-gradient(to right, #144fc6, #00aaff)" text=" 添加饮水量"
				icon="plus"></u-button>
			<u-gap height="10" bgColor="#fff"></u-gap>
			<u-button @click="show = true" color="linear-gradient(to right, #144fc6, #00aaff)" text=" 设置每日总饮水量"
				icon="account-fill"></u-button>
			<text style="font-size: 24px;text-align: center;display: block;padding: 30px 0;">每日喝水记录</text>
			<uni-list>
				 <uni-list-chat v-for="(item,index) in waterDrinkList" :avatar="imgUrl" :key="index" title="当前喝水量" :note="`${item.waterOne}ml`" :time="item.nowDrinkTime"></uni-list-chat>
			</uni-list>
		</div>
		<u-popup :show="show2" @close="close2" @open="open2">
			<view class="set-water">
				<text class="zdy">自定义</text>
				<view class="sh-image">
					<image src="../../static/images/sh.svg" mode=""></image>
				</view>
				<view class="number">
					<u--form labelPosition="left" :model="form2" ref="uForm2">
						<u-form-item label="饮水量:" prop="waterOne" label-width="90">
							<u-input v-model="form2.waterOne" type="number" placeholder="请输入饮水量"></u-input>
						</u-form-item>
						<u-form-item label="本次饮水时间:" prop="nowDrinkTime" label-width="120">
							<uni-datetime-picker v-model="form2.nowDrinkTime" />
						</u-form-item>
					</u--form>
					<u-gap height="10" bgColor="#fff"></u-gap>
					<u-button type="primary" text="确定" @tap="addWater"></u-button>
				</view>
			</view>
		</u-popup>

		<u-popup :show="show" @close="close" @open="open">
			<view class="set-water">
				<text class="zdy">自定义</text>
				<view class="sh-image">
					<image src="../../static/images/sh.svg" mode=""></image>
				</view>
				<view class="number">
					<u--form labelPosition="left" :model="form1" ref="uForm1">
						<u-form-item label="每日饮水总量:" prop="waterSum" label-width="100">
							<u-input v-model="form1.waterSum" type="number" placeholder="请输入自定义每日饮水总量"></u-input>
						</u-form-item>
					</u--form>
					<u-gap height="10" bgColor="#fff"></u-gap>
					<u-button type="primary" text="确定" @tap="addWaterSum"></u-button>
				</view>
			</view>
		</u-popup>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import DrinkWater from '@/components/DrinkWater/index.vue'
	export default {
		components: {
			DrinkWater
		},
		data() {
			return {
				show: false,
				show2: false,
				imgUrl: require('../../static/images/hs.png'),
				waterAdd: 0,
				drinkCupHeight: 0,
				form2: {
					waterOne: 250,
					nowDrinkTime:''
				},
				form1: {
					waterSum: 2500
				},
				waterDrinkList: []
			}
		},
		computed: {
			heightPer() {
				const percentageComplete = (this.waterAdd / this.form1.waterSum) * 100;
				const roundedPercentage = Math.round(percentageComplete * 100) / 100;
				return roundedPercentage
			},
			height() {
				if (this.heightPer) {
					return (Math.ceil(this.drinkCupHeight * this.heightPer) / 100) * 2 + 50 + 'px'
				} else {
					return 0
				}
			}
		},
		mounted() {
			this.getHeight()
			if(uni.getStorageSync('waterDrinkList')){
				this.waterDrinkList = JSON.parse(uni.getStorageSync('waterDrinkList'))
				this.waterAdd = this.waterDrinkList.reduce((pre,cur)=>{
					return pre + cur.waterOne
				},0)
				
			}
		},
		methods: {
			getHeight() {
				uni.createSelectorQuery().in(this).select('#drinkWater').boundingClientRect(data => {
					if (data) {
						this.drinkCupHeight = data.height
						console.log(this.drinkCupHeight, this.height);
						// data包含元素的大小和位置信息
						// console.log(data.width); // 元素的宽
						// console.log(data.height); // 元素的高
						// console.log(data.top); // 元素上边界到页面顶部的距离
						// console.log(data.bottom); // 元素下边界到页面顶部的距离
						// ...
					}
				}).exec();
			},
			addWater() {
				if (this.waterAdd > (this.form1.waterSum + this.form2.waterOne)) {
					this.$refs.uToast.show({
						type: 'error',
						icon: false,
						title: '警告',
						message: "喝水太多也不行哟",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png',
						duration: 1000
					},)
					return
				}
				this.waterAdd += Number(this.form2.waterOne)
				this.waterDrinkList.push(this.form2)
				uni.setStorageSync('waterDrinkList',JSON.stringify(this.waterDrinkList))
				this.close2()
				this.form2.nowDrinkTime = "";
			},
			addWaterSum() {
				this.close()
			},
			open2() {
				// console.log('open');
			},
			close2() {
				this.show2 = false
				// console.log('close');
			},
			open() {
				// console.log('open');
			},
			close() {
				this.show = false
				// console.log('close');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.drink-container {
		.title {
			text-align: center;
			padding: 10px 0;
			font-size: 36rpx;
			display: block;
			letter-spacing: 0.2rem;
			font-size: 1.5rem;
			background-image: -webkit-linear-gradient(left, #144fc6, #00aaff 25%, #144fc6 50%, #E6D205 75%, #144fc6);
			-webkit-text-fill-color: transparent;
			-webkit-background-clip: text;
			-webkit-background-size: 200% 100%;
			-webkit-animation: maskedAnimation 4s infinite linear;
		}

		.set-wrapper {
			width: 90%;
			margin: 0 auto;
		}

		.cups {
			display: flex;
			/* 有必要的时候进行拆行 */
			flex-wrap: wrap;
			/* 垂直水平居中 */
			align-items: center;
			justify-content: center;
			width: 560rpx;

			.cup-small {
				background-color: #fff;
				border: 4px solid #144fc6;
				color: #144fc6;
				/* 底部椭圆 */
				border-radius: 0 0 40px 40px;
				margin: 30px 0;
				display: flex;
				flex-direction: column;
				overflow: hidden;
				width: 100rpx;
				height: 180rpx;
				border-radius: 0 0 15px 15px;
				background-color: rgba(255, 255, 255, 0.9);
				cursor: pointer;
				font-size: 14px;
				align-items: center;
				justify-content: center;
				text-align: center;
				margin: 5px;
				transition: 0.3s ease;
			}
		}
	}

	.sh-image {
		width: 80rpx;
		margin: 40rpx auto;
		height: 80rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.set-water {
		padding: 30rpx;
		text-align: center;

		.zdy {
			margin-bottom: 30rpx;
		}
	}

	@keyframes maskedAnimation {
		0% {
			background-position: 0 0;
		}

		100% {
			background-position: -100% 0;
		}
	}
</style>