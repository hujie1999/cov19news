<template>
	<view class="content">
		<view class="top-img">
			<image src="../../../static/img/pages/global-news-page.svg" mode="widthFix"></image>
		</view>
		<view class="title padding">
			<text class="content-padding">全球疫情</text>
		</view>
		<!-- <text>{{title}}</text> -->
		
		<view class="tips content-padding"
		v-if="WomWorld"
		>
			<text>统计截至:{{WomWorld.lastUpdateTime}}</text>
		</view>
		<view class="blobal-data-card padding">
			<view class="blobal-data-card-row">
				<view class="blobal-data-card-item bg-red">
					<text class="compare-text">较上日<text class="compare-number font-cl-red">{{WomWorld.nowConfirmAdd}}</text></text>
					<text class="data-number font-cl-red">{{WomWorld.nowConfirm}}</text>
					<text class="words">现有确诊</text>
				</view>
				<view class="blobal-data-card-item bg-darkred">
					<text class="compare-text">较上日<text class="compare-number font-cl-darkred">+{{WomWorld.confirmAdd}}</text></text>
					<text class="data-number font-cl-darkred">{{WomWorld.confirm}}</text>
					<text class="words">累计确诊</text>
				</view>
				<view class="blobal-data-card-item bg-green">
					<text class="compare-text">较上日<text class="compare-number font-cl-green">+{{WomWorld.healAdd}}</text></text>
					<text class="data-number font-cl-green">{{WomWorld.heal}}</text>
					<text class="words">累计治愈</text>
				</view>
				<view class="blobal-data-card-item bg-grey">
					<text class="compare-text">较上日<text class="compare-number font-cl-grey">+{{WomWorld.deadAdd}}</text></text>
					<text class="data-number font-cl-grey">{{WomWorld.dead}}</text>
					<text class="words">累计死亡</text>
				</view>
			</view>
		</view>
		
		<view class="title padding">
			<text class="content-padding">海外疫情</text>
		</view>
		<view class="padding">
			<CustomTable
			:dataList="dataList"
			:headerList="headerList"
			>
			</CustomTable>
		</view>
		<view class="must-know">
			<MustToKnow></MustToKnow>
		</view>
	</view>
</template>

<script>
	import { getForeignCountryCOV } from '@/network/api.js'
	import CustomTable from '@/components/CustomTable/CustomTable.vue';
	import MustToKnow from '@/components/pages/MustToKnow.vue'
	export default {
		data() {
			return {
				title: 'Hello',
				//card数据
				WomWorld: [],
				WomAboard: [],
				FAutoCountryConfirmAdd: [],
				//table数据
				dataList: [],
				headerList : [
					{
						'label':['地区'],
						'width': 6
					},
					{
						'label':['新增确诊'],
						'width': 4
					},
					{
						'label':['累计确诊'],
						'width': 4
					},
					{
						'label':['治愈'],
						'width': 4
					},
					{
						'label':['死亡'],
						'width': 4
					},
					{
						'label':['详情'],
						'width': 2
					}
				]
			}
		},
		components: {
			CustomTable,
			MustToKnow
		},
		onLoad() {
			this.doGetForeignCountryCOV()
		},
		onPullDownRefresh() {
			try{
				this.title = 'world2333'
				this.doGetForeignCountryCOV()
			}catch(e){
				//TODO handle the exception
				uni.showToast({
					title:'未知错误',
					icon:'error',
					duration:2000
				})
			}finally{
				uni.stopPullDownRefresh()
			}
		},
		methods: {
			doGetForeignCountryCOV(){
				getForeignCountryCOV()
				.then(res=>{
					// console.log(res.data);
					const temp = res.data
					this.WomWorld = temp.WomWorld
					this.WomAboard = temp.WomAboard
					this.FAutoCountryConfirmAdd = temp.FAutoCountryConfirmAdd
					this.dataList = []
					temp.WomAboard.forEach(el=>{
						const cate = {}
						cate.name = el.name
						cate.confirmAdd = el.confirmAdd
						cate.confirm = el.confirm
						cate.heal = el.heal
						cate.dead = el.dead
						cate.details = ''
						
						this.dataList.push(cate)
					})
				})
				.catch(err=>{
					console.log(err);
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.content {}

	.content-padding {
		padding-left: 10rpx;
		padding-right: 10rpx;
	}
	
	.padding {
		padding-top: 20rpx;
		padding-bottom: 20rpx;
	}

	.center {
		text-align: center;
	}

	.title {
		font-size: 4.267vw;
		font-weight: 700;
		color: #222;
		padding: 10rpx 0;
	}

	.tips {
		color: #8a8a8a;
		font-size: 3.5vw;
	}

	.top-img{
		text-align: center;
		margin: 0 auto;
		
		image{
			width: 80%;
			height: auto;
		}
	}
	.blobal-data-card{
		.blobal-data-card-row{
			display: flex;
			flex-direction: row;
			justify-content: space-evenly;
			.blobal-data-card-item{
				width: 24%;
				padding: 1.6vw 0 3.2vw;
				height: auto;
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align: center;
				.compare-text{
					padding-top: 1.6vw;
					color: #7c7c7c;
					font-size: 2.4vw;
					line-height: 2.667vw;
					height: 2.667vw;
					font-weight: 500;
					white-space: nowrap;
				}
				.data-number{
					font-size: 3.733vw;
					line-height: 5.867vw;
					height: 5.867vw;
					font-weight: 600;
					padding-top: 1.6vw;
				}
				.words{
					font-size: 3.2vw;
					height: 3.2vw;
					line-height: 3.2vw;
					color: #222;
					font-weight: 500;
					margin-top: 1.6vw;
				}
			}
		}
	}
	.font-cl-red{
		color: #e61c1d;
	}
	.font-cl-darkred{
		color: #be2121;
	}
	.font-cl-green{
		color: #178b50;
	}
	.font-cl-grey{
		color: #4e5a65;
	}
	.bg-red{
		background-color: #fff8f8;
	}
	.bg-darkred{
		background-color: #fff4f4;
	}
	.bg-green{
		background-color: #f1f8f4;
	}
	.bg-grey{
		background-color: #f3f6f8;
	}
	
	.must-know{
		padding: 80rpx 0 50rpx 0 ;
	}
</style>
