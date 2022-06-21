<template>
	<view class="content">
		<view class="top-img">
			<image
			src="../../../../static/img/pages/others-page.svg"
			mode="widthFix"
			></image>
		</view>
		<view class="notify padding">
			<view class="notify-container">
				<view class="noti-title ">
					<text class="font-cl-red">注意</text>
				</view>
				<view class="content font-cl-red">
					<view class="item">
						<text>1. 此 app 为个人开发项目，仅供学习参考，不用于任何商业用途！</text>
					</view>
					<view class="item">
						<text>2. 此 app 数据来自于 https://news.qq.com/zt2020/page/feiyan.htm！</text>
					</view>
					<view class="item">
						<text>3. 由于个人开发因素，此 app 数据不具备参考价值，切勿将此 app 数据作为疾病的参考！</text>
					</view>
				</view>
			</view>
		</view>
		<view class="notify padding">
			<view class="notify-container">
				<view class="noti-title">
					<text class="">介绍</text>
				</view>
				<view class="content">
					<view class="item">
						<text>大家好，我是小海</text>
					</view>
					<view class="item">
						<text>这个 app 是一个练手项目，源代码会在不久上传，有兴趣可以 clone 跑一下</text>
					</view>
					<view class="item">
						<text>欢迎大家访问我的个人博客 https://xiaohai-learn.pub</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less" scoped>
	.content{
		
	}
	.top-img{
		text-align: center;
		margin: 0 auto;
		
		image{
			width: 80%;
			height: auto;
		}
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
	
	.notify{
		.notify-container{
			margin: 0 5vw;
			background-color: #f8f8f8 ;
			border-radius: 10rpx;
			.noti-title{
				color: #222;
				font-size: 4.8vw;
				padding: 20rpx 0 0 0;
				text-align: center;
				font-weight: 600;
				// padding: 10rpx 0 0 0;
			}
			.content{
				// word-wrap: break-word;
				word-break: break-all;
				width: auto;
				height: auto;
				padding: 20rpx;
				font-size: 4.267vw;
				
				.item{
					padding: 5rpx ;
					text-indent: 1em;
					
				}
			}
		}
	}
	.font-cl-red{
		color: #E61C1D;
	}
</style>
