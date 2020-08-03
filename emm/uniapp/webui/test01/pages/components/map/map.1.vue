<template>
	<view>
		地图
		<view id="container"></view>

		<view class="address_box">
			<input id="tipinput" type="text" :value="address" @input="inputChange" placeholder="请输入地址" />
			<button type="primary" @click="clickBtn()">确认</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			address:'',		// 输入的地址
			
			map:null,			// 地图对象
			marker:null,		// 记录点击的坐标点
			infoWindow:null,	// 信息窗体
			geocoder:{},		// 用于经纬度与地址之间的相互查询
			autoOptions:{},					// 输入提示
			placeSearch:null,	// 构造地点查询类
		};
	},
	onLoad() {
		this.loadScrpit();
	},
	mounted() {
		window.mapInit = ()=> {

			this.map = new AMap.Map('container', {
				resizeEnable: true,
				center: [116.397428, 39.90923], //中心点坐标
				zoom: 13, //级别
				viewMode: '3D' //使用3D视图
			});
			//实时路况图层
			var trafficLayer = new AMap.TileLayer.Traffic({
				zIndex: 10
			});
			this.map.add(trafficLayer); //添加图层到地图

			this.geocoder = new AMap.Geocoder({
				//city: '010', // 城市设为北京，默认：“全国”
				radius: 1000 // 范围，默认：500
			});
			
			
			var autoOptions = {
			    input:document.getElementById('tipinput')
			};
			var auto = new AMap.Autocomplete(autoOptions);
			this.placeSearch = new AMap.PlaceSearch({
				map: this.map
			});  //构造地点查询类
			AMap.event.addListener(auto, "select", this.select);//注册监听，当选中某条记录时会触发
			
			document.getElementById('container').onclick = this.clickOn;
		};
	},
	methods: {
		// 小程序当中v-model会出现不能清空的状况  所以解决方案如下
		inputChange(e){
			this.address = e.detail.value
			
			var autoOptions = {
			    input:'tipinput'
			};
			var auto = new AMap.Autocomplete(autoOptions);
			this.placeSearch = new AMap.PlaceSearch({
				map: this.map
			});  //构造地点查询类
			console.log(11111111,auto)
			AMap.event.addListener(auto, "select", this.select);//注册监听，当选中某条记录时会触发
		},
		// 点击确认按钮
		clickBtn() {
			console.log('您输入：',this.address);
			// this.regeoCode(this.address, 'address');
		},
		// 添加坐标标记
		addMarker(pos, type) {
			if (this.marker) {
				// 删除标记点
				this.map.remove(this.marker);
			}
			
			this.marker = new AMap.Marker({
				position: pos
			});
			// 添加标记点
			this.map.add(this.marker);
			
			if (type == 'address') {
				// 地址转换成坐标
				// 根据地图上添加的覆盖物分布情况，自动缩放地图到合适的视野级别
				this.map.setFitView(this.marker);
			} else {
				// 坐标转换成地址
				this.regeoCode(pos, 'pos');
				
				
			}
			// 设置中心坐标
			this.map.setCenter(pos)
		},
		
		//在指定位置打开信息窗体
		openInfo(address) {
			this.infoWindow = new AMap.InfoWindow({
				content: '地址：' + address, //使用默认信息窗体框样式，显示信息内容
				offset: new AMap.Pixel(0, -30) // 信息窗体显示位置偏移量
			});
			this.infoWindow.open(this.map, this.marker.getPosition());
		},
		
		// 坐标和地址相互转换
		regeoCode(pos, type) {
			if (type == 'pos') {
				// 坐标转换成地址
				this.geocoder.getAddress(pos, (status, result)=> {
					if (status === 'complete' && result.regeocode) {
						var address = result.regeocode.formattedAddress;
						console.log(result.regeocode.addressComponent);
						// 显示信息窗体
						this.openInfo(address);
					} else {
						console.log('根据经纬度查询地址失败');
					}
				});
			} else {
				// 地址转换成坐标
				this.geocoder.getLocation(pos, (status, result)=> {
					if (status === 'complete' && result.geocodes.length) {
						var lnglat = result.geocodes[0].location;
						this.addMarker(lnglat, 'address');
					} else {
						console.log('根据地址查询位置失败');
					}
				});
			}
		},
		
		select(e) {
			console.log(222222,e)
			this.placeSearch.setCity(e.poi.adcode);
			this.placeSearch.search(e.poi.name);  //关键字查询查询
		},
		
		// 事件绑定
		clickOn() {
			this.map.on('click', this.showInfoClick);
			this.map.on('dblclick', this.showInfoDbClick);
			this.map.on('mousemove', this.showInfoMove);
		},
		
		showInfoClick(e) {
			var text = '您在 [ ' + e.lnglat.getLng() + ',' + e.lnglat.getLat() + ' ] 的位置单击了地图！';
			var pos = [e.lnglat.getLng(), e.lnglat.getLat()];
			this.addMarker(pos);
			console.log(text);
		},
		
		showInfoDbClick(e) {
			var text = '您在 [ ' + e.lnglat.getLng() + ',' + e.lnglat.getLat() + ' ] 的位置双击了地图！';
			console.log(text);
		},
		
		showInfoMove() {
			var text = '您移动了您的鼠标！';
			console.log(text);
		},

		// 插入高德地图引用
		loadScrpit() {
			var script = document.createElement('script');
			// &plugin=AMap.Geocoder 地址转化，不写会报错   其他同理
			script.src = 'https://webapi.amap.com/maps?v=1.4.15&key=34c21b2ca0a0795aa8ae9556f16aca95&plugin=AMap.Geocoder,AMap.Autocomplete,AMap.PlaceSearch&callback=mapInit';
			document.body.appendChild(script);
		}
	}
};
</script>

<style lang="scss" scoped>
#container {
	width: 100%;
	height: 800upx;
}
.address_box {
	padding: 20upx;
	#address {
		padding: 20upx;
	}
}
</style>
