<template>
	<view class="table-container"
	:key="initKey"
	>
		<view class="table-header">
			<view class="table-header-item"
			v-for="(item,index) in headerList"
			:key="index"
			:style="{'width': 'calc( 95vw / 24 * '+item.width+' ) !important'}"
			>	
				<text>{{item.label[0]}}</text>
				<text v-if="item.label.length>1">{{item.label[1]}}</text>
			</view>
		</view>
		<view class="table-body">
			<view class="table-body-item"
			v-for="(item,index) in headerList"
			:key="item.name"
			>
				<view class="table-item-cell"
				v-for="(it,ind) in dataList"
				:key="ind"
				:style="{'width': 'calc( 95vw / 24 * '+item.width+' ) !important'}"
				>	
					<view>
						<text class="arrow" v-if="index === 0">></text>
						<text>{{Object.values(it)[index]}}</text>
						<text class="arrow" v-if="index === headerList.length-1">></text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"CustomTable",
		data() {
			return {
				
			};
		},
		computed: {
			initKey(){
				return new Date().getTime()
			}
		},
		props:{
			headerList:{
				type: Array,
				default: ()=>[]
			},
			dataList: {
				type: Array,
				default: ()=>[]
			}
		}
	}
</script>

<style lang="less">
.table-container{
	
}
.table-header{
	width: 100vw;
	display: flex;
	justify-content: space-evenly;
	.table-header-item{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		min-height: 8.533vw;
		// min-width: 10vw;
		line-height: 4.8vw;
		 padding: 1.067vw 0;
		text-align: center;
		color: #222;
		font-size: 3.2vw;
		border-right: 1px solid #fff;
		background-color: #f5f5f5;
		&:nth-child(1){
			background-color: #f5f5f5;
			color: #222;
		}
		&:nth-child(2){
			background-color: linen;
			color: #ff7140;
		}
		&:nth-child(3){
			background-color: #fef7ff;
			color: #ca3f81;
		}
		&:nth-child(4){
			background-color: #fff7f7;
			color: #f23a3b;
		}
		&:nth-child(5){
			background-color: #fffaf7;
			color: #222;
		}
	}
	
}
.table-body{
	display: flex;
	justify-content: space-evenly;
	.table-body-item{
		// background-color: #ca3f81;
		font-size: 3.2vw;
		display: flex;
		flex-direction: column;
			.table-item-cell{
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 10rpx 0;
				min-height: 10vw;
			}
		&:nth-child(1) .table-item-cell{
			justify-content: flex-start !important;
		}
	}
	.arrow{
		font-weight: 800;
		padding: 0 5rpx;
		color: #00bec7;
	}
	.arrow-details{
		justify-content: flex-end !important;
	}
}

</style>