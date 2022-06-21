<template>
	<view class="must-to-know">
		<view class="must-to-know-title">
			<text>新冠肺炎预防须知</text>
		</view>
		<view class="must-to-know-container">
			
			<view
			v-for="(item,index) in textList"
			:key="index"
			>
				<view class="to-know-wrap">
					<view class="must-to-kno-img">
						<image :src="item['icon_path']" mode="widthFix"></image>
					</view>
					<text class="to-know-title">{{item.title_text}}</text>
				</view>
				<view class="content-wrap"
				v-for="(it,indx) in item.tips"
				:key="indx"
				>
					<view class="to-know-point"></view>
					<view class="">
						<text class="to-know-text">{{it}}</text>
					</view>
				</view>
			</view>
			
			
		</view>
	</view>
</template>

<script>
	export default {
		name:"MustToKnow",
		data() {
			return {
				textList:[
					{
						'icon_path':'/static/img/pages/toknow-blue.png',
						'title_text':'个人清洁',
						'tips':[
							'经常保持双手清洁，尤其在触摸口、鼻或眼之前。',
							'经常用洗手液和清水清洗双手，搓手最少20秒，并用纸巾擦干。',
							'打喷嚏或咳嗽时应用纸巾掩盖口鼻，把用过的纸巾弃置于有盖垃圾箱内，然后彻底清洁双手。 '
						]
					},
					{
						'icon_path':'/static/img/pages/toknow-red.png',
						'title_text':'尽量避免',
						'tips':[
							'减少前往人流密集的场所。如不可避免，应戴上外科口罩。',
							'避免到访医院。如有必要到访医院，应佩戴外科口罩及时刻注重个人和手部卫生。',
							'避免接触动物（包括野味）、禽鸟或其粪便；避免到海鲜、活禽市场或农场。',
							'切勿进食野味及切勿光顾有提供野味的餐馆。',
							' 注意食物安全和卫生，避免进食或饮用生或未熟透的动物产品，包括奶类、蛋类和肉类。 '
						]
					},
					{
						'icon_path':'/static/img/pages/toknow-green.png',
						'title_text':'尽快就诊',
						'tips':[
							'如有身体不适，特别是有发烧或咳嗽，应戴上外科口罩并尽快就诊。'
						]
					}
				]
			}
		}
	}
</script>

<style lang="less" scoped>
	.must-to-know{
		width: 100vw;
		min-height: 50px;
		.must-to-know-title{
			text-align: center;
			font-size: 4.267vw;
			font-weight: 700;
			color: #222;
		}
		.must-to-know-container{
			// width: 80vw;
			// height: 500px;
			margin: 5.333vw 5.333vw 0;
			border-radius: 1.6vw;
			background: #f8f8f8;
			padding: 1.333vw 4vw 5.333vw 5.333vw;
			// word-break: break-all;
			.must-to-kno-img image{
				width: 4.267vw;
				height: 4.267vw;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
		.to-know-title{
			font-size: 3.733vw;
			font-weight: 500;
			margin-left: 2.667vw;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.to-know-wrap{
			display: flex;
			align-items: center;
			padding-top: 4.267vw;
			padding-bottom: 2.133vw;
		}
		.to-know-point{
		    width: 1.5vw;
		    height: 1.5vw;
		    background: #00bec7;
		    border-radius: 50%;
		    margin-top: 1.867vw;
		    margin-right: 2.133vw;
			flex-shrink: 0 ;
			// flex: none !important;
		}
		.to-know-text{
			    font-weight: 400;
			    font-size: 3.2vw;
			    line-height: 4.267vw;
			    color: #222;
			    // margin-left: 3.2vw;
		}
		.content-wrap{
			margin-top: 2.133vw;
			overflow: hidden;
			display: flex;
			// justify-content: flex-start;
			align-items: baseline;
		}
	}
</style>