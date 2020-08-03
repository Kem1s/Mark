<template>
	<view class="city">
		<view class="address_title">请选择地址</view>

		<view class="select_address">
			<view class="title">
				<view class="tip_title">请选择省市区街道</view>
				<view class="tip_select"> 显示选择文本区域 </view>
			</view>
			
			<!-- 竖向选择城市 -->
			<view class="city-tab-bar">
				<swiper class="swiper-left" :current="currentIndex" vertical="true">
					<swiper-item>
						<scroll-view scroll-y class="scroll_box">
							<view class="city_item" v-for="(item,i) in cityList" :key="i">
								{{item.NAME}}
							</view>
						</scroll-view>
					</swiper-item>
				</swiper>
				
				<scroll-view scroll-y class="scroll_right">
					<view v-for="(item,i) in city1" :key="i">
						{{item.NAME}}
					</view>
				</scroll-view>
			</view>
			
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			currentIndex:0,
			cityList:[],		// 一级城市(省)
			city1:[],			// 二级城市
		};
	},
	mounted() {
		// 从缓存中读取一级城市
		// this.getCity1()
	},
	methods: {
		// 获取一级城市（省份）
		getCity1(){
			var city = uni.getStorageSync('city')
			this.cityList = (JSON.parse(city)).data
			console.log(this.cityList)
			if(this.cityList.length == 0){
				this.getCity('',(res)=>{
					uni.setStorage({
						key: 'city',
						data: JSON.stringify(res),
						success: function () {
							
						}
					})
				})
			}else{
				// 获取二级城市
				var id = this.cityList[0].CODE
				var obj = {
					id
				}
				this.getCity(obj,(res)=>{
					this.city1 = res.data
				})
			}
		},
		// 公用接口-获取城市列表
		getCity(getData,callback){
			uni.request({
				url: this.$lib + '/city',
				data: getData,
				method:'GET',//请求方式  或GET
				success: res => {
					callback(res.data)
				}
			});
		},
	}
};
</script>

<style lang="scss">
page{
	height: 100%;
}
.city {
	display: flex;
	flex-direction: column;
	padding: 20upx;
	background: #ffffff;
	height: 100%;
	box-sizing: border-box;

	.address_title {
		font-size: 28upx;
		padding: 10upx 20upx;
		text-align: center;
		border-bottom: 1px solid red;
	}
	.select_address{
		flex: 1;
		display: flex;
		flex-direction: column;
		.title{
			.tip_title{
				padding: 10upx 0;
			}
			.tip_select{
				background: #ccc;
				padding: 10upx 0;
			}
		}
		.city-tab-bar{
			flex: 1;
			display: flex;
			.swiper-left{
				min-height: 100%;
				width: 150upx;
				background: #F0AD4E;
				.scroll_box{
					height: 100%;
					.city_item{
						text-align: center;
						padding: 10upx;
						box-sizing: border-box;
					}
				}
			}
			.scroll_right{
				height: 100%;
			}
		}
	}
}
</style>
