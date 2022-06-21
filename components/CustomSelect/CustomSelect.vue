<template>
	<view class="select">
		<view class="select-main">
			<view class="" @click='showList()'>
				<slot name="component">
				</slot>
			</view>
		</view>
		
		<view v-if="show" class="list">
			<view class="select-list"
			v-for="(item,index) in selectData"
			:key="index"
			>
				<view class="select-list-item"
				@click="handleSelectVal(item)"
				:class="{'select-active':activeIndex === index}"
				>
					{{item.name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"CustomSelect",
		data() {
			return {
				show: false
			};
		},
		props:{
			selectData:{
				type: Array,
				default: ()=>[]
			},
			activeIndex:{
				type: Number,
				default: 0
			}
		},
		methods:{
			showList(){
				this.show = !this.show
				// console.log('123456');
			},
			handleSelectVal(obj){
				this.$emit('transSelectVal',obj)
				this.show = false
			}
		}
	}
</script>

<style lang="less" scoped>
	.select{
		width: auto;
		position: relative;
		.select-main{
			position: relative;
		}
		.list{
			position: absolute;
			right: 0;
			background: #fff;
			width: 35vw;
			max-height: 50vh;
			border: 1rpx solid #eee;
			overflow: auto;
			z-index: 1000;
			.select-list{
				
				
				.select-list-item{
					height: auto;
					width: auto;
					padding: 10rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					&:hover{
						background-color: #eee;
					}
				}
			}
		}
		
	}
	
	.select-active{
		background-color: #00bec7 ;
	}

</style>