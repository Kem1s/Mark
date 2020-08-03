<template>
	<view class="content">
		<view class="top">
			<div class="jifen">我的积分: <text class="num">0</text></div>
			<div class="jilu">兑换记录</div>
		</view>
		<view class="main">
			<ul>
				<li v-for="(item,i) in 17" :key="i">
					<view class="goods_imgbox">
						<image class="goods_img" :src="'../../../static/img/other/a'+i%2+'.jpg'" mode="aspectFit"></image>
					</view>
					<view class="goods_tips">
						oppo findX2 pro啊发顺丰啥山东理工个大声说多无
					</view>
					<view class="goods_num">
						6000积分
					</view>
				</li>
			</ul>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: 'Hello'
		};
	},
	onLoad() {
	},
	methods: {}
};
</script>

<style lang="scss">
.content {
	.top{
		background: #FFFFFF;
		display: flex;
		padding: 20upx;
		.jifen{
			flex: .6;
			text-align: left;
			.num{
				color: red;
				font-weight: bold;
			}
		}
		.jilu{
			flex: .4;
			text-align: right;
			color: #007AFF;
			font-weight: bold;
		}
	}
	.main{
		padding: 20upx;
		ul{
			display: flex;
			flex-flow: wrap;
			li{
				width: 49%;
				box-sizing: border-box;
				padding: 10upx;
				margin: 0 2% 2% 0;
				background: #FFFFFF;
				.goods_imgbox{
					overflow: hidden;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.goods_img{
					width: 250upx;
					height: 250upx;
				}
				.goods_tips{
					padding-top: 10upx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				.goods_num{
					padding-top: 10upx;
					color: #f89715;
					font-weight: bold;
				}
			}
			li:nth-child(2n){
				margin-right: 0;
			}
		}
	}
}
</style>
