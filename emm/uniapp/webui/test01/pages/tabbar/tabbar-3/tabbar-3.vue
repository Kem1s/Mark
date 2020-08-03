<template>
	<view class="content">
		<view class="nav_bar">
			<view class="nav_item" :class="activeIndex==0 ? 'active' : ''">待服务</view>
			<view class="nav_item" :class="activeIndex==1 ? 'active' : ''">服务中</view>
			<view class="nav_item" :class="activeIndex==2 ? 'active' : ''">已完成</view>
		</view>
		
		<view class="main">
			<!-- 待服务 -->
			<view class="dingdan" v-for="(item,i) in 5" :key="i">
				<view class="top">
					<view class="icon">
						<image src="../../../static/img/other/01.png" mode="scaleToFill"></image>
					</view>
					<view class="content">
						<view class="title">
							<view class="left">纸壳/书本</view>
							<view class="right">
								<text>查看详情</text>
								<text class="iconfont icon-xiangqing"></text>
							</view>
						</view>
						<view class="num">
							<text class="left">质量</text>
							<text class="right">100(Kg)</text>
						</view>
						<view class="num">
							<text class="left">单价</text>
							<text class="right">5(元/Kg)</text>
						</view>
						<view class="count">
							总计500元,应收<text class="count_num">500</text>元
						</view>
					</view>
				</view>
				<view class="bottom">
					<button size="mini" type="default">再来一单</button>
				</view>
			</view>
			
		</view>
	</view>
</template> 

<script>
export default {
	data() {
		return {
			active: false,
			activeIndex:0,		// 默认选中的导航
		};
	},
	onLoad() {},
	onShow() {
		// setTimeout(() => {
		this.active = true;
		// }, 500);
	},
	onHide() {
		this.active = false;
	},
	methods: {
		goToPage(url) {
			if (!url) return;
			uni.navigateTo({
				url
			});
		}
	}
};
</script>

<style lang="scss" scoped>
	.nav_bar{
		padding: 0 20upx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #FFFFFF;
		.nav_item{
			flex: 1;
			text-align: center;
			padding: 20upx;
		}
		.active{
			color: #007AFF;
			border-bottom: 1px solid #007AFF;
		}
	}
	.main{
		.dingdan{
			margin-top: 20upx;
			background: #FFFFFF;
			.top{
				display: flex;
				border-bottom: 1px solid #efefef;
				.icon{
					padding: 20upx;
					image{
						width: 100upx;
						height: 100upx;
					}
				}
				.content{
					flex: 1;
					padding: 20upx;
					padding-left: 0;
					.title{
						height: 100upx;
						line-height: 100upx;
						border-bottom: 1px solid #efefef;
						display: flex;
						.left{
							font-size: 32upx;
							font-weight: bold;
							flex: 1;
						}
						.right{
							width: 150upx;
							color: #999999;
							text{
								vertical-align: middle;
							}
							.iconfont{
								margin-left: 5upx;
							}
						}
					}
					.num{
						display: flex;
						color: #999999;
						text{
							flex: 1;
							padding: 10upx 0;
						}
						.right{
							text-align: right;
						}
					}
					.count{
						text-align: right;
						padding: 10upx 0;
						color: #999999;
						.count_num{
							font-size: 28upx;
							font-weight: bold;
							color: red;
						}
					}
				}
			}
			.bottom{
				padding: 20upx;
				text-align: right;
			}
		}
	}
	
	
	
	
</style>
