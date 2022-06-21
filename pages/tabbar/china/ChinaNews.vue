<template>
	<view class="content">
		<view class="top-img">
			<image
			src="@/static/img/pages/china-news-page.svg"
			mode="widthFix"
			></image>
			
		</view>
		<view class="title">
			<text class="content-padding">国内疫情</text>
		</view>
		<view class="tips content-padding"
		v-if="localCOV"
		>
			<text>病例数据更新于:{{localCOV.chinaTotal.mtime}};
			风险地区更新于:{{localCOV.chinaTotal.mRiskTime}}</text>
		</view>
		<view class="data-card content-padding padding"
		v-if="localCOV"
		>
			<view class="data-card-row">
				<view class="data-card-col cl-orange">
					<text class="card-number-format text-oriange">+{{localCOV.chinaAdd.localConfirmH5}}</text>
					<text class="card-text-format">本土确诊</text>
				</view>
				<view class="data-card-col cl-purple">
					<text class="card-number-format text-purple">+{{localCOV.chinaAdd.noInfectH5}}</text>
					<text class="card-text-format">本土无症状</text>
				</view>
				<view class="data-card-col cl-red">
					<text class="card-number-format text-red">+{{localCOV.chinaAdd.confirm}}</text>
					<text class="card-text-format">确诊病例</text>
				</view>
			</view>
			<view class="data-card-row">
				<view class="data-card-col cl-orange">
					<text class="card-number-format text-oriange">{{localCOV.chinaTotal.localConfirm}}</text>
					<text class="card-text-format">现有本土确诊</text>
				</view>
				<view class="data-card-col cl-purple">
					<text class="card-number-format text-purple">{{localCOV.chinaTotal.noInfectH5}}</text>
					<text class="card-text-format">现有本土无症状</text>
				</view>
				<view class="data-card-col cl-red">
					<text class="card-number-format text-red">{{localCOV.chinaTotal.nowConfirm}}</text>
					<text class="card-text-format">现有确诊病例</text>
				</view>
			</view>
			<view class="data-card-row">
				<view class="data-card-col cl-pink">
					<text class="card-number-format text-pink">{{localCOV.chinaTotal.highRiskAreaNum}}</text>
					<text class="card-text-format">高风险地区</text>
				</view>
				<view class="data-card-col cl-orange">
					<text class="card-number-format text-pink">{{localCOV.chinaTotal.mediumRiskAreaNum}}</text>
					<text class="card-text-format">中风险地区</text>
				</view>
				<view class="data-card-col cl-green">
					<text class="card-number-format text-green">{{localCOV.chinaTotal.dead}}</text>
					<text class="card-text-format">累计死亡</text>
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
		<view class="title">
			<text class="content-padding">国内31省市区本土疫情速报</text>
		</view>
		<!-- table -->
		<view class="padding">
			<CustomTable
			:dataList="tableDataList"
			:headerList="tableHeadList"
			></CustomTable>
		</view>
		<view class="title">
			<text class="content-padding">全国疫情数据(含港澳台)</text>
		</view>
		<view class="tips content-padding">
			<text>7:00-10:00为更新高峰，数据如有滞后请谅解。</text>
		</view>
		<div class="padding">
			<CustomTable
			:dataList="table2DataList"
			:headerList="table2HeadList"
			></CustomTable>
		</div>
		
		<view class="tips content-padding">
			<text>数据来源: https://news.qq.com/zt2020/page/feiyan.htm</text>
		</view>
		<view class="must-know">
			<MustToKnow></MustToKnow>
		</view>
	</view>
</template>

<script>
import { 
	getLocalCOVAndNewCOV,
	getNowDiseaseCaseAndAddDiseaseCase
 } from '@/network/api.js'
import CustomEcharts from '@/components/CustomEcharts/CustomEcharts.vue'
import CustomTable from '@/components/CustomTable/CustomTable.vue'
import MustToKnow from '@/components/pages/MustToKnow.vue'
export default {
	data() {
		return {
			title: 'Hello',
			//疫情信息
			localCOV: null,
			newCOV: null,
			
			//echarts参数
			width:'100vw',
			height:'80vw',
			renderType:'svg',
			replace_name:['series'],
			lineData:[],
			xAxisData: [],
			chartTitle: ['全国新增本土确诊','全国新增本土无症状','全国现有本土确诊','全国现有本土无症状'],
			chartIndex: 0,
			localConfirmAdd: [] ,//新增本土确诊
			localInfectionAdd: [] ,//新增本土无症状
			localConfirm: [], //现有本土确诊
			noInfect: [], //现有本土无症状
			
			//table 疫情速报数据
			tableHeadList:[
				{
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
				}
			],  //表头数据
			tableDataList:[],  //表内容数据
			//table2 全国所有地区疫情速报数据
			table2HeadList:[
				{
					'label':['地区'],
					'width': 4
				},
				{
					'label':['新增','确诊'],
					'width': 4
				},
				{
					'label':['现有','确诊'],
					'width': 4
				},
				{
					'label':['累计','确诊'],
					'width': 4
				},
				{
					'label':['累计','死亡'],
					'width': 4
				},
				{
					'label':['详情'],
					'width': 4
				}
			],
			table2DataList: [],
			
			//渲染echarts limit参数
			limit: [30,60,90,182,365],
			limitIndex: 0,
			
			//控制chart数据显示按钮
			btnData:[
				{
					'tx1': '新增',
					'tx2': '本土确诊'
				},
				{
					'tx1': '新增',
					'tx2': '本土无症状'
				},
				{
					'tx1': '现有',
					'tx2': '本土确诊'
				},
				{
					'tx1': '新增',
					'tx2': '本土无症状'
				},
			]
		};
	},
	components: {
		CustomEcharts,
		CustomTable,
		MustToKnow
	},
	computed: {
	    option() {
			const color = ['#E57631','#E57631','#BE2121','#BE2121']
	      return {
			  color:color[this.chartIndex],
			  title: {
			      text: this.chartTitle[this.chartIndex],
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
		//疫情数据
		this.doGetLocalCOVAndNewCOV()
		//chart数据
		this.doGetNowDiseaseCaseAndAddDiseaseCase()
		
	},
	onPullDownRefresh() {
		try{
			this.doGetLocalCOVAndNewCOV()
			this.doGetNowDiseaseCaseAndAddDiseaseCase()
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
			getLocalCOVAndNewCOV()
			.then(res=>{
				// console.log(res)
				const temp = res.data
				this.localCOV = temp.diseaseh5Shelf
				this.newCOV = temp.localCityNCOVDataList
				//table1 数据
				temp.localCityNCOVDataList.forEach(el=>{
					const paylod = {}
					paylod.city = `${el.city}(${el.province})`
					// console.log(el.city)
					paylod.local_confirm_add = `+${el.local_confirm_add}`
					paylod.local_wzz_add = `+${el.local_wzz_add}`
					paylod.riskarea = `${el.highRiskAreaNum} | ${el.mediumRiskAreaNum}`
					paylod.date = el.date
					this.tableDataList.push(paylod)
				})
				//table2数据
				temp.diseaseh5Shelf.areaTree[0].children.forEach(el=>{
					const paylod = {}
					paylod.provience = `${el.name}`
					paylod.confirm = el.today.confirm
					paylod.nowConfirm = el.total.nowConfirm
					paylod.totalConfirm = el.total.confirm
					paylod.totalDead = el.total.dead
					paylod.details = ''
					this.table2DataList.push(paylod)
				})
				
			})
			.catch(err=>console.log(err))
		},
		doGetNowDiseaseCaseAndAddDiseaseCase(){
			getNowDiseaseCaseAndAddDiseaseCase(this.limit[this.limitIndex])
			.then(res=>{
				
				const temp = res.data
				const chinaDayAddListNew = temp.chinaDayAddListNew
				const chinaDayListNew = temp.chinaDayListNew
				this.localConfirmAdd = []
				this.localInfectionAdd = []
				this.xAxisData = []
				this.lineData = []
				chinaDayAddListNew.forEach(element=>{
					this.xAxisData.push(element.date)
					// console.log(element.date)
					this.localConfirmAdd.push(element.localConfirmadd)
					this.localInfectionAdd.push(element.localinfectionadd)
				})
				this.lineData = this.localConfirmAdd //初始化数据为第一项
				
				this.localConfirm = []
				this.noInfect = []
				chinaDayListNew.forEach(element=>{
					if(!this.xAxisData){
						this.xAxisData.push(element.date)
					}
					this.localConfirm.push(element.localConfirm)
					this.noInfect.push(element.noInfect)
				})
			})
			.catch(err=>{
				console.log(err)
			})
		},
		showChartData(id){
			this.chartIndex = id
			this.lineData = []
			switch (id){
				case 0:
					this.lineData = this.localConfirmAdd
					break;
				case 1:
					this.lineData = this.localInfectionAdd
					break;
				case 2:
					this.lineData = this.localConfirm
					break;
				case 3:		
					this.lineData = this.noInfect
					break;
				default:
					break;
			}
		}
	}
};
</script>

<style lang="less" scoped >
.content {
	/* text-align: center;
	height: 400upx;
	margin-top: 200upx; */
	box-sizing: border-box;
}
.top-img{
	text-align: center;
	margin: 0 auto;
	
	image{
		width: 80%;
		height: auto;
	}
}
//内容公用padding
.content-padding {
	padding-left: 10rpx;
	padding-right: 10rpx;
}
	
.padding {
	padding-top: 20rpx;
	padding-bottom: 20rpx;
}
.center{
	text-align: center;
}
.title{
	font-size: 4.267vw;
	font-weight: 700;
	color: #222;
	padding: 10rpx 0;
}
.tips{
	color: #8a8a8a;
	font-size: 3.5vw;
}
.data-card{
	.data-card-row{
		display: flex;
		justify-content: space-around;
		align-items: center;
		
		.data-card-col{
			margin: 10rpx;
			width: 33%;
			height: calc( 70vw / 3);
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
		.card-number-format{
			    font-size: 5.867vw;
			    font-weight: 700;
		}
		.card-text-format{
			font-size: 3.2vw;
			font-weight: 700;
			line-height: 1.09;
			text-align: center;
			color: #222;
		}
	}
}
//card color
.cl-orange{
	background-color: #FFFAF7;
}
.cl-purple{
	background-color: #FEF7FF;
}
.cl-pink{
	background-color: #FFF7F7;
}
.cl-red{
	background-color: #FFF4F4;
}
.cl-green{
	background-color: #F3F6F8;
}
//card text color
.text-oriange{
	color: #E57631;
}
.text-purple{
	color: #CA3F81;
}
.text-pink{
	color: #F23A3B;
}
.text-red{
	color: #BE2121;
}
.text-green{
	color: #4E5A65;
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
		width: 22%;
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
