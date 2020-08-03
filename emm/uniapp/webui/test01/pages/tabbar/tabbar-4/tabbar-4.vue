<template>
	<view class="content">
		<view class="header">
			<view class="user_img">
				<i v-if="!isLogin" class="iconfont icon-weidenglutouxiang"></i>
				<image v-else class="tx" src="../../../static/img/other/tx.jpg" mode="scaleToFill"></image>
			</view>
			<view class="user_name">点击登录</view>
			<view data-v-92d5a17c="" class="wave_lightred"></view>
		</view>
		
		<view class="wallet">
			<view class="balance">
				<text class="iconfont icon-yue"></text>
				钱包
				<text>￥0.00</text>
			</view>
			<view class="integral">
				<text class="iconfont icon-jifen"></text>
				积分
				<text>1000</text>
			</view>
		</view>
		
		<view class="list_box">
			<ul class="list">
				<li class="item">
					<div class="title">
						<text class="iconfont icon-mingxitiaozhang"></text>资金明细
					</div>
					<div class="note">
						查看明细
						<text class="iconfont icon-xiangqing"></text>
					</div>
				</li>
				<li class="item">
					<div class="title">
						<text class="iconfont icon-shouru"></text>收款方式
					</div>
					<div class="note">
						<text class="iconfont icon-xiangqing"></text>
					</div>
				</li>
				<li class="item">
					<div class="title">
						<text class="iconfont icon-dizhi"></text>地址管理
					</div>
					<div class="note">
						<text class="iconfont icon-xiangqing"></text>
					</div>
				</li>
				<li class="item">
					<div class="title">
						<text class="iconfont icon-yijianfankui"></text>意见反馈
					</div>
					<div class="note">
						<text class="iconfont icon-xiangqing"></text>
					</div>
				</li>
				<li class="item">
					<div class="title">
						<text class="iconfont icon-zaixiankefux"></text>在线客服
					</div>
					<div class="note">
						<text class="iconfont icon-xiangqing"></text>
					</div>
				</li>
				<li class="item">
					<div class="title">
						<text class="iconfont icon-guanyuwomen"></text>关于我们
					</div>
					<div class="note">
						<text class="iconfont icon-xiangqing"></text>
					</div>
				</li>
			</ul>
		</view>
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			isLogin: true,

		};
	},
	onLoad() {},
	methods: {
	}

};
</script>

<style lang="scss" scoped>
.header {
	background: #17c174;
	text-align: center;
	.user_img {
		padding-top: 20upx;
		.iconfont {
			font-size: 150upx;
			color: #fff;
		}
		.tx {
			width: 150upx;
			height: 150upx;
			border-radius: 50%;
		}
	}
	.user_name {
		padding: 10upx 0;
		color: #fff;
	}
}
.wallet {
	background: #fff;
	padding: 20upx 20upx 0 20upx;
	display: flex;
	text-align: center;
	color: #999999;
	box-shadow: 0 5px 10px #dadada;
	.balance {
		flex: 1;
		padding: 20upx;
		color:#ec5050
	}
	.integral {
		flex: 1;
		padding: 20upx;
		color:#19b4f5
	}
	.iconfont {
		margin-right: 5upx;
		vertical-align: middle;
	}
}
.list_box{
	margin-top: 20upx;
	.list{
		background: #FFFFFF;
		.item{
			color: #999999;
			overflow: hidden;
			padding: 30upx 20upx;
			position: relative;
			&:after{
				content: '';
				width: 100%;
				height: 1upx;
				position: absolute;
				bottom: 1upx;
				left: 0;
				transform: scaleY(0.5);
				background: #dadada;
			}
			.title{
				float: left;
				.iconfont{
					margin-right: 10upx;
				}
			}
			.note{
				float: right;
				.iconfont{
					margin-left: 10upx;
				}
			}
			.iconfont{
				vertical-align: text-top;
			}
		}
	}
}
.wave_lightred {
	position: relative;
	bottom: -24upx;
	height: 40upx;
	transform: rotateX(180deg);
	background: url('../../../static/img/other/wave_lightred.png') repeat-x;
	background-size: 100% auto;
	animation: wave 10s cubic-bezier(0.32, 0.5, 0.8, 0.62) infinite;
}
@keyframes wave {
	0% {
		background-position-x: -100vw;
	}
	100% {
		background-position-x: 100vw;
	}
}
</style>
