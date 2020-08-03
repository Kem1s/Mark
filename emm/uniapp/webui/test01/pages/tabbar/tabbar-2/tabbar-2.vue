<template>
	<view class="content">
		<view class="weizhi">
			<image src="../../../static/img/icon/weizhi.png" mode="" class="dingwei"></image>
			<text class="text">{{ addressName }}</text>
			<text class="last_text" @click="showPopUp()">手动选择</text>
			<text class="last_text" @click="link()">重新定位</text>
		</view>

		<!-- 轮播组件 -->
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular">
						<swiper-item v-for="(item, i) in 5" :key="i">
							<view class="swiper-item uni-bg-red"><image class="banner" :src="'../../../static/img/other/b' + i + '.jpg'" mode="scaleToFill"></image></view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>

		<view>
			<!-- 回收分类 -->
			<view class="fenlei">
				<ul>
					<li>
						<image src="../../../static/img/other/01.png" mode=""></image>
						<text>纸壳/书本</text>
					</li>
					<li>
						<image src="../../../static/img/other/02.png" mode=""></image>
						<text>旧衣服</text>
					</li>
					<li>
						<image src="../../../static/img/other/03.png" mode=""></image>
						<text>塑料/金属</text>
					</li>
					<li>
						<image src="../../../static/img/other/04.png" mode=""></image>
						<text>家具/家电</text>
					</li>
				</ul>
			</view>

			<!-- 回收要求 -->
			<view class="yaoqiu">
				<view class="title">回收要求</view>
				<ul>
					<li>
						<image src="../../../static/img/other/01.png" mode=""></image>
						<view class="">
							<text class="red">拒绝</text>
							掺水
						</view>
					</li>
					<li>
						<image src="../../../static/img/other/02.png" mode=""></image>
						<view class="">
							<text class="red">拒绝</text>
							掺杂
						</view>
					</li>
					<li>
						<image src="../../../static/img/other/03.png" mode=""></image>
						<view class="">
							单次
							<text class="red">10KG</text>
							以上
						</view>
					</li>
				</ul>
			</view>

			<!-- 一键回收按钮 -->
			<view class="yijianhuishou">
				<view class="btn">
					<view class="text">一键</view>
					<view class="text">下单</view>
				</view>
				<view class="btn_before"></view>
				<view class="btn_after"></view>
			</view>
		</view>
	</view>
</template>

<script>
import { uniPopup } from '@dcloudio/uni-ui';
import amap from '../../../sdk/amap-wx.js';
import gcoord from '../../../sdk/gcoord.js';
export default {
	components: {
		uniPopup
	},
	data() {
		return {
			addressName: '定位中...',

			indicatorDots:true,			// 显示轮播指示点
			autoplay: true,				// 自动轮播
            interval: 3000,				// 轮播等待时间
            duration: 500,				// 滑动动画时长
            circular: true,				// 是否衔接滑动
			
			amapPlugin: null, 			// new地图
			key: '1ef4d7504a4fe4ecd24b24ec78c976fb',
			address: '',				// 详细地址
			lat:'',						// 纬度
			lng:'',						// 经度
		};
	},
	onLoad() {
		// 如果Storage存在数据,就不调用接口
		uni.getStorage({
		    key: 'city',
		    success: function (res) {
				if(!res.data){
					// this.getCity()
				}
		    }
		});
	},
	mounted() {
		this.amapPlugin = new amap.AMapWX({
			//初始化
			key: this.key
		});
		//获取当前位置
		// this.amapPlugin.getRegeo({
		// 	success: (res) => {
		// 		this.address = res[0].regeocodeData.formatted_address;
		// 		this.lat = res[0].latitude;
		// 		this.lng = res[0].longitude;
		// 		console.log(this.address);//可自己查看所需返回值取用
		// 	}
		// });
	},
	methods: {
		// 获取城市列表
		getCity(getData){
			uni.request({
				url: this.$lib + '/city',
				data: getData,
				method:'GET',//请求方式  或GET
				success: res => {
					if(!getData){
						uni.setStorage({
							key: 'city',
							data: JSON.stringify(res.data),
							success: function () {
								console.log('success');
							}
						})
					}
				}
			});
		},
		// 位置授权
		getAuthorizeInfo(){
			const that = this;
			uni.authorize({
				scope: 'scope.userLocation',
				success() { // 允许授权
					that.getLocationInfo();
				},
				fail(){    // 拒绝授权
					that.openConfirm();
					console.log("你拒绝了授权，无法获得周边信息")
				}
			})
		},
		// 获取地理位置
		getLocationInfo(){
			var that = this;
			// uni.getLocation({
			// 	type: 'wgs84',
			// 	success (res) {
			// 		console.log(res)
			// 		console.log('当前位置的经度：' + res.longitude);
			// 		console.log('当前位置的纬度：' + res.latitude);
			// 	}
			// });
			uni.showLoading({
				title: '获取信息中'  
			});  
			this.amapPlugin.getRegeo({  
				success: (data) => {  
					console.log(data)  
					this.addressName = data[0].name || '定位失败';  
					uni.hideLoading();  
				}  
			}); 
		},
		// 再次获取授权
		// 当用户第一次拒绝后再次请求授权
		openConfirm(){
			uni.showModal({
				title: '请求授权当前位置',
				content: '需要获取您的地理位置，请确认授权',
				success: (res)=> {
					if (res.confirm) {
						uni.openSetting();// 打开地图权限设置
					} else if (res.cancel) {
						uni.showToast({
							title: '你拒绝了授权，无法获得周边信息',
							icon: 'none',
							duration: 1000
						})
					}
				}
			});
		},

		onShow() {
			// 动态设置标题
			// uni.setNavigationBarTitle({
			//     title: this.$t('买金'),
			// })
		   this.getAuthorizeInfo();
		},
		showPopUp() {
			uni.navigateTo({
			    url: '../../components/city/city'
			});
			// uni.showModal({
			//     title: '提示',
			//     content: '这是一个模态弹窗',
			//     success: function (res) {
			//         if (res.confirm) {
			//             console.log('用户点击确定');
			//         } else if (res.cancel) {
			//             console.log('用户点击取消');
			//         }
			//     }
			// });
		},
		link(){
			uni.navigateTo({
			    url: '../../components/map/map'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	.swiper {
		height: 300upx;
		.swiper-item {
			display: block;
			line-height: 300upx;
			text-align: center;
		}
		/*图片宽度设置100% ，高度300upx（设为auto图片无法显示）*/
		.banner {
			width: 100%;
			height: 300upx;
		}
	}
	.weizhi {
		overflow: hidden;
		padding: 20upx;
		background: #ffffff;
		.dingwei {
			width: 30upx;
			height: 35upx;
			vertical-align: middle;
		}
		.text {
		}
		.last_text {
			color: #007aff;
			float: right;
			margin: 0 10upx;
		}
	}
	.fenlei {
		padding: 20upx;
		background: #ffffff;
		margin-bottom: 20upx;
		ul {
			display: flex;
			flex-flow: wrap;
			li {
				width: 49%;
				box-sizing: border-box;
				padding: 10upx;
				margin: 0 2% 2% 0;
				background: #ffffff;
				box-shadow: 5px 5px 10px #ccc;
				border-radius: 10upx;
				image {
					width: 100upx;
					height: 100upx;
					margin-right: 20upx;
					vertical-align: middle;
				}
			}
			li:nth-child(2n) {
				margin-right: 0;
			}
		}
	}
	.yaoqiu {
		background: #ffffff;
		padding: 20upx;
		.title {
			font-size: 28upx;
			font-weight: bold;
			text-align: center;
			padding: 20upx 0;
		}
		.red {
			color: red;
		}
		ul {
			display: flex;
			align-items: center;
			justify-content: center;
			li {
				flex: 1;
				text-align: center;
				image {
					width: 120upx;
					height: 120upx;
				}
			}
		}
	}
	.yijianhuishou {
		position: relative;
		height: 170upx;
		margin-top: 50upx;
		.btn {
			width: 120upx;
			height: 120upx;
			background: #00cc23;
			border-radius: 50%;
			position: absolute;
			top: 50%;
			left: 50%;
			z-index: 10;
			transform: translate(-50%, -50%);
			text-align: center;
			display: flex;
			flex-direction: column; /*元素的排列方向为垂直*/
			justify-content: center; /*水平居中对齐*/
			align-items: center; /*垂直居中对齐*/
			.text {
				font-size: 28upx;
				font-weight: bold;
				color: #ffffff;
			}
			.text:first-child {
				padding: 5upx;
			}
		}
		.btn_before {
			content: '';
			width: 120upx;
			height: 120upx;
			background: #fdfa7c;
			border-radius: 50%;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			z-index: 9;
			animation: scale1 3s infinite alternate;
		}
		.btn_after {
			content: '';
			width: 120upx;
			height: 120upx;
			background: rgba(79, 221, 255, 0.6);
			border-radius: 50%;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			z-index: 8;
			animation: scale2 3s infinite alternate;
		}
	}
}
@keyframes scale1 {
	from {
		transform: translate(-50%, -50%) scale(1.1);
	}
	to {
		transform: translate(-50%, -50%) scale(1.2);
	}
}
@keyframes scale2 {
	from {
		transform: translate(-50%, -50%) scale(1.2);
	}
	to {
		transform: translate(-50%, -50%) scale(1.4);
	}
}
</style>
