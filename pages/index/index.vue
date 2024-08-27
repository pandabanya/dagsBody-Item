<template>
	<u-loading-page v-if="loading" :loading="loading" loading-text="zzz..."></u-loading-page>
	<view v-else class="main-content">
		<view class="man-say">
			<image class="yin-icon" src="../../static/images/upyin.svg" mode="aspectFit"></image>
			<text class="say-content">{{manSay}}</text>
			<image class="yin-icon" src="../../static/images/downyin.svg" mode="aspectFit"></image>
		</view>
		<view class="man-money">
			<view class="day-info">
				<view class="day-info-item address"><wu-icon name="empty-address"></wu-icon>所在城市：{{city}}</view>
				<view class="day-info-item weather">今日天气：{{weather}}</view>
			</view>
			<u--form :model="moneyForm" ref="uForm">
				<u-form-item label="选择发薪日" labelWidth="90" :prop="moneyForm.payday" borderBottom @click="showPay = true;"
					ref="item1">
					<u--input v-model="moneyForm.payday" disabled disabledColor="#ffffff" placeholder="请选择发薪日"
						border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
			</u--form>
			<view v-if="daysUntilNextMonthPayday > 0">
				距离本次发薪还有:
				<text class="come">
					<u-count-to :startVal="0" :endVal="daysUntilNextMonthPayday"></u-count-to>
				</text> 天
			</view>
			<view v-if="daysUntilNowMonthPayday > 0">
				距离下次发薪还有:
				<text class="come">
					<u-count-to :startVal="0" :endVal="daysUntilNowMonthPayday"></u-count-to>
				</text> 天
			</view>
			<view class="" v-if="daysUntilNowMonthPayday > 0">
				<u-line-progress :percentage="percentageOfCurrentMonthPassed" height="8" :showText="false"></u-line-progress>
			</view>
			<view class="index">
				<DataPicker></DataPicker>
			</view>
			<view class="drink">
				<DrinkWater />
			</view>
		</view>
		<u-action-sheet :show="showPay" :actions="actions" title="请选择发薪日" @close="showPay = false" @select="paySelect">
		</u-action-sheet>
		<u-modal :show="showModal" title="提示" content="该日期不配查询发薪日" :closeOnClickOverlay="true" @confirm="handleClose"
			@close="handleClose"></u-modal>
	</view>
</template>

<script>
	import DataPicker from '@/components/DataPicker/index.vue'
	import DrinkWater from '@/components/DrinkWater/index.vue'
	import {
		getPercentageOfCurrentMonthPassed,
		getDaysUntilNextMonthPayday
	} from '../../utils'
	export default {
		components: {
			DataPicker,
			DrinkWater
		},
		data() {
			return {
				loading: true,
				title: 'Hello',
				manSay: 'manSay',
				showDatePicker: true,
				show: false,
				showPay: false,
				showModal: false,
				daysUntilNowMonthPayday: 0,
				daysUntilNextMonthPayday: 0,
				percentageOfCurrentMonthPassed: 0,
				moneyForm: {
					payday: ''
				},
				actions: [{
						name: '1号',
					},
					{
						name: '5号',
					},
					{
						name: '10号',
					},
					{
						name: '15号',
					},
					{
						name: '27号',
					},
				],
				city: "",
				weather: ""
			}
		},
		onLoad() {
			console.log(uni.$u.config.v)
		},
		onShow() {
			console.log(1111);
			this.getWeather()
			this.getDailyJT()
			setTimeout(() => {
				this.loading = false
			}, 1000)
		},
		methods: {
			getPercentageOfCurrentMonthPassed,
			getDaysUntilNextMonthPayday,
			calendarChange(e) {
				console.log(e);
			},
			formatter(day) {
				console.log(day);
			},
			getWeather() {
				uni.request({
					url: "https://restapi.amap.com/v3/weather/weatherInfo",
					data: {
						'key': '67443a8f194a9de29765fbe5e4d0e841',
						'city': '340100'
					},
					header: {
						'content-type': 'application/json'
					}
				}).then(res => {
					console.log(res);
					this.city = res.data.lives[0].province + '- ' + res.data.lives[0].city
					this.weather = res.data.lives[0].weather + '温度： ' + res.data.lives[0].temperature
				})
			},
			getDailyJT() {
				const apiUrl = 'https://v2.alapi.cn/api/mingyan'; // 接口请求URL
				const requestParams = {
					token: 'LwExDtUWhF3rH5ib',
					typeid: Math.floor(Math.random() * 45) + 1
				};
				uni.request({
					url: apiUrl,
					method: 'POST',
					data: {
						...requestParams
					}
				}).then(res => {
					if (res.data.code === 200) {
						this.manSay = res.data.data.content
					} else {
						this.manSay = "记录打工生活"
					}
				})
			},
			paySelect(e) {
				console.log(e.name);
				if (e.name === '27号') {
					this.showModal = true
				}
				this.moneyForm.payday = e.name.replace('号', '')
				this.cal(parseInt(e.name.replace('号', '')))
			},
			handleClose() {
				this.showModal = false
				this.moneyForm.payday = ''
				this.daysUntilNextMonthPayday = 0
				this.daysUntilNowMonthPayday = 0
			},
			cal(payDay) {
				if (payDay === 27) {
					return
				}
				//  获取下个月的发薪日
				const currentDate = new Date(); // 假设当前日期为2022年8月15日
				const payDayOfMonth = payDay; // 假设发薪日为每月的第10天
				// 结果计算
				const daysUntilNextMonthPayday = this.getDaysUntilNextMonthPayday(currentDate, payDayOfMonth, false)
				const daysUntilNowMonthPayday = this.getDaysUntilNextMonthPayday(currentDate, payDayOfMonth, true)
				const percentageOfCurrentMonthPassed = this.getPercentageOfCurrentMonthPassed(currentDate,
					daysUntilNextMonthPayday)
				console.log(daysUntilNextMonthPayday, daysUntilNowMonthPayday, percentageOfCurrentMonthPassed);
				this.daysUntilNextMonthPayday = daysUntilNextMonthPayday
				this.daysUntilNowMonthPayday = daysUntilNowMonthPayday
				this.percentageOfCurrentMonthPassed = percentageOfCurrentMonthPassed
			},
		}
	}
</script>
<style lang="scss">
	$com-width: 90%;

	.main-content {
		position: relative;

		.man-say {
			width: $com-width;
			margin: 30rpx auto;
			padding: 20rpx;
			border-radius: 5px;
			box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
			position: relative;

			.say-content {
				line-height: 60rpx;
				text-indent: 2em;
				font-size: 40rpx
			}

			.yin-icon {
				width: 30rpx;
				height: 30rpx;
				padding: 0 20rpx;
			}
		}

		.man-money {
			width: $com-width;
			margin: 0 auto;

			.day-info {
				margin-top: 50rpx;

				.day-info-item {
					margin-bottom: 30rpx;
				}

				.address {
					display: flex;
				}
			}

			.come {
				font-size: 60rpx
			}
		}

	}
</style>