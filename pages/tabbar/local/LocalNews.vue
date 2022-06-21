<template>
	<view class="content">
		<view class="top-img">
			<image
			src="../../../static/img/pages/local-news-page.svg"
			mode="widthFix"
			></image>
		</view>
		<view class="title-and-btn content-padding">
			<text class="tips">统计截至:
				<text v-if="Object.keys(cardData).length">{{cardData.total.mtime}}</text>
			</text>
			
			
		</view>
		<view class="show-area-info content-padding padding">
			<view class="area-info">
				<text class="tips">当前地区：
					<text class="font-cl-them">{{cardData.name}}</text>
				</text>
			</view>
			<view class="selecter">
				<CustomSelect
				:selectData="areaList"
				:activeIndex="nowAreaIndex"
				@transSelectVal="dealSelectVal"
				>
					<template v-slot:component>
						<view class="btn-select">
							<text>请选择地区</text>
						</view>
					</template>
				</CustomSelect>
			</view>
		</view>
		<view class="local-card"
		v-if="Object.keys(cardData).length"
		>
			<view class="local-card-row">
				<view class="local-card-item bg-orange">
					<text class="number font-cl-orange">+{{cardData.today.local_confirm_add}}</text>
					<text class="words">本土确诊</text>
				</view>
				<view class="local-card-item bg-purple">
					<text class="number font-cl-purple">+{{cardData.today.wzz_add}}</text>
					<text class="words">本土无症状</text>
				</view>
				<view class="local-card-item bg-red">
					<text class="number font-cl-darkred">+{{cardData.today.abroad_confirm_add}}</text>
					<text class="words">境外输入</text>
				</view>
				<view class="local-card-item bg-grey">
					<text class="number font-cl-grey">+{{cardData.today.dead_add}}</text>
					<text class="words">死亡病例</text>
				</view>
			</view>
			<view class="local-card-row">
				<view class="local-card-item bg-orange">
					<text class="number font-cl-orange">{{cardData.total.highRiskAreaNum}}</text>
					<text class="words">高风险地区</text>
				</view>
				<view class="local-card-item bg-purple">
					<text class="number font-cl-purple">{{cardData.total.mediumRiskAreaNum}}</text>
					<text class="words">中风险地区</text>
				</view>
				<view class="local-card-item bg-red">
					<text class="number font-cl-darkred">{{cardData.total.nowConfirm}}</text>
					<text class="words">现有确诊</text>
				</view>
				<view class="local-card-item bg-yellow">
					<text class="number font-cl-orange">{{cardData.total.confirm}}</text>
					<text class="words">累计确诊</text>
				</view>
			</view>
		</view>
		<view class="content-padding">
			<CustomEcharts
			   :option='option'
			   :width='width'
			   :height='height'
			   :replace='replace_name'
			   />
		</view>
		<!-- 控制chart数据显示按钮 -->
		<view class="control-chart-data-btn content-padding padding">
			<view
			v-for="(item,index) in btnData"
			:key="index"
			@click="showChartData(index)"
			:class="{'data-control-btn-active':chartIndex == index}"
			>
				<text>{{item.tx1}}</text>
				<text>{{item.tx2}}</text>
			</view>
		</view>
		<!-- table -->
		<view class="table">
			<CustomTable
			:dataList="tableDataList"
			:headerList="tableHeadList"
			>
				
			</CustomTable>
		</view>
		<view class="must-know">
			<MustToKnow></MustToKnow>
		</view>
	</view>
</template>

<script>
	import { 
		getLocalCOVAndNewCOV,
		getLocalCOVDataByAdcode} from '@/network/api.js'
	import { deepClone } from '@/utils/common.js'
	import MustToKnow from '@/components/pages/MustToKnow.vue'
	import CustomSelect from '@/components/CustomSelect/CustomSelect.vue'
	import CustomEcharts from '@/components/CustomEcharts/CustomEcharts.vue'
	import CustomTable from '@/components/CustomTable/CustomTable.vue'
	export default {
		data() {
			return {
				title: 'Hello',
				
				areaList: [],//省份信息
				areaTree :[], //所有省份信息
				nowAreaIndex: 2, //省份信息 默认选择的index
				cardData: [], // card 模块信息
				
				//chart
				width:'100vw',
				height:'80vw',
				renderType:'svg',
				replace_name:['series'],
				
				xAxisData: [],//x 轴信息
				chartTitle: ['新增本土确诊趋势','新增无症状趋势'],
				chartIndex: 0,
				lineData:[],
				localConfirmAdd: [], //新增确诊数据
				localWzzAdd: [], //新增无症状数据
				//btn
				btnData:[
					{
						'tx1': '新增',
						'tx2': '本土确诊'
					},
					{
						'tx1': '新增',
						'tx2': '本土无症状'
					},
				],
				//table
				tableDataList: [],
				tableHeadList: [{
						'label':['地区'],
						'width': 7.5
					},
					{
						'label':['本土','确诊'],
						'width': 3
					},
					{
						'label':['本土','无症状'],
						'width': 3
					},
					{
						'label':['风险地区','高 | 中'],
						'width': 4.5
					},
					{
						'label':['更新','时间'],
						'width': 6
					}]
			}
		},
		components: {
			MustToKnow,
			CustomSelect,
			CustomEcharts,
			CustomTable
		},
		computed: {
			option() {
			  return {
				  color:'#E57631',
				  title: {
				      text: `${this.cardData.name} ${this.chartTitle[this.chartIndex]}`,
					  textStyle: {
						'fontSize': '3.733vw',
						'fontWeight': 600,
						'color': '#222'
					  }
				},
			      tooltip: { // 鼠标悬浮提示框显示 X和Y 轴数据
			           trigger: 'axis',
			            axisPointer: {
			                type: 'cross'
			            }
					},
			      xAxis: {
			        type: 'category',
					axisLabel: {
					    //x轴文字的配置
						show: true,
						rotate: 45,
					    interval: 1,//使x轴文字显示全
					},
			        data: this.xAxisData
			      },
			      yAxis: {
			        type: 'value'
			      },
			      series: [
			        {
			          data: this.lineData,
			          type: 'line',
					  smooth: true
			        }
			      ]
			  }
			}
		},
		onLoad() {
			this.doGetLocalCOVAndNewCOV()
		},
		onPullDownRefresh() {
			try{
				this.doGetLocalCOVAndNewCOV()
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
			doGetLocalCOVAndNewCOV(){
				this.areaList = []
				this.tableDataList = []
				getLocalCOVAndNewCOV()
				.then(res=>{
					// console.log(res.data);
					const temp = res.data
					const areaTree = temp.diseaseh5Shelf.areaTree[0].children
					this.areaTree = areaTree
					areaTree.forEach((el,index)=>{
						const area = {}
						const card = {}
						area.index = index
						area.name = el.name
						area.adcode = el.adcode
						
						this.areaList.push(area)
					})
					//设置初始化默认地区信息
					this.cardData = areaTree[this.nowAreaIndex]
					//该地区下各市信息
					areaTree[this.nowAreaIndex].children.forEach(el=>{
						const paylod = {}
						paylod.name = `${el.name}`
						paylod.confirm = `+${el.today.confirm}`
						paylod.wzz_add = `+${el.today.wzz_add}`
						paylod.riskarea = `${el.total.highRiskAreaNum} | ${el.total.mediumRiskAreaNum}`
						paylod.date = el.total.mtime
						this.tableDataList.push(paylod)
					})
					// console.log(this.cardData);
				})
				.catch(err=>{
					console.log(err);
				})
				.finally(()=>{
					
					//获取选择地30天内疫情信息 用于渲染chart
					this.doGetLocalCOVDataByAdcode(Number(this.cardData.adcode))
				})
			},
			doGetLocalCOVDataByAdcode(code){
				this.xAxisData = []
				this.localConfirmAdd = []
				this.localWzzAdd = []
				getLocalCOVDataByAdcode(code)
				.then(res=>{
					// console.log(res);
					const temp = res.data
					temp.forEach(el=>{
						this.xAxisData.push(el.date)
						this.localConfirmAdd.push(el.confirm_add)
						this.localWzzAdd.push(el.wzz_add)
					})
					//初始化
					this.lineData = this.localConfirmAdd
				})
				.catch(err=>{
					console.log(err);
				})
			},
			dealSelectVal(v){
				// console.log(v);
				const {adcode,index,name} = v
				// console.log(adcode,index,name);
				this.nowAreaIndex = index
				this.cardData = this.areaTree[index]
	
				this.doGetLocalCOVAndNewCOV()
			},
			showChartData(id){
				this.chartIndex = id
				this.lineData = []
				switch (id){
					case 0:
						this.lineData = this.localConfirmAdd
						break;
					case 1:
						this.lineData = this.localWzzAdd
						break;
					default:
						break;
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.content {
		
	}
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
	.local-card{
		.local-card-row{
			display: flex;
			justify-content: space-evenly;
			
			.local-card-item{
				width: 24%;
				height: auto;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				height: 21.333vw;
				margin: 0.533vw 0.533vw 0 0;
				padding: 3.2vw 0;
				box-sizing: border-box;
				.number{
					margin: 0 4.533vw 1.333vw 4vw;
					font-size: 5.867vw;
					font-weight: 700;
					line-height: 1;
					text-align: center;
				}
				.words{
					font-size: 3.2vw;
					font-weight: 700;
					line-height: 1.09;
					text-align: center;
					color: #222;
				}
			}
		}
	}
	.font-cl-orange{
		color: #E57631;
	}
	.font-cl-purple{
		color: #AE3AC6;
	}
	.font-cl-red{
		color: #E61C1D;
	}
	.font-cl-darkred{
		color: #BE2121;
	}
	.font-cl-grey{
		color: #4E5A65;
	}
	.font-cl-them{
		color: #00bec7 ;
	}
	.bg-orange{
		background-color: #FFFAF7;
	}
	.bg-purple{
		background-color: #FEF7FF;
	}
	.bg-red{
		background-color: #FFF4F4;
	}
	.bg-grey{
		background-color: #F3F6F8;
	}
	.bg-yellow{
		background-color: #FFFBEB;
	}
	.show-area-info{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.area-info{
		flex-grow: 1;
	}
	.selecter{
		// position: absolute;
		// right: 0;
		// top: 0;
	}
	.btn-select{
		width: 22vw;
		height: 8vw;
		background: #00bec7;
		border-radius: 10rpx;
		text-align: center;
		line-height: 8vw;
		font-size: 3.2vw;
		font-weight: 500;
		color: #FFF;
		border: 1rpx solid #0b8288;
	}
	
	.control-chart-data-btn{
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		view{
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			// display: block;
			width: 48%;
			font-size: 3.2vw;
			line-height: 4.267vw;
			text-align: center;
			height: auto;
			padding: 1.333vw 0;
			border: 1px solid #e9ebed;
			border-radius: 1.067vw;
			font-size: 3.2vw;
			background-color: #f3f6f8;
		}
	}
	//tbn active
	.data-control-btn-active{
		    background-color: #00bec7 !important;
		    // border-color: #8fb8ff !important;
		    color: #FFFFFF;
		    font-weight: 500;
			// border: 1px solid #005def !important ;
	}
	.must-know{
		padding: 80rpx 0 50rpx 0 ;
	}
</style>
