<template>
	<view class="content">
		<view class="map_container"><map class="map" id="map" :longitude="longitude" :latitude="latitude" scale="14" :markers="markers" @markertap="makertap"></map></view>
	</view>
</template>

<script>
import amap from '../../../sdk/amap-wx.js';
var markersData = [];
var poisData = [];
export default {
	data() {
		return {
			amapPlugin: null,
			key: '1ef4d7504a4fe4ecd24b24ec78c976fb',
			markers: [
				{
					latitude: 39.909,
					longitude: 116.39742
				},
				{
					latitude: 39.9,
					longitude: 116.39
				}
			],
			poisdatas: [{}, {}, {}],
			title: 'map',
			latitude: '',
			longitude: '',
			textData: [],
			mapContBotm: '',
			mapTxtHeight: ''
		};
	},
	onLoad() {
		var that = this;
		this.amapPlugin = new amap.AMapWX({
			//初始化
			key: this.key
		});
		this.amapPlugin.getRegeo({
			//我的位置
			iconPath: '../../../static/img/icon/weizhi.png',
			iconWidth: 48,
			iconHeight: 48,
			success: function(data) {
				that.latitude = 39.909;
				that.longitude = 116.39742;
			}
		});
	},
	onShow() {},
	methods: {
		makertap: function(e) {
			var id = e.markerId;
			var that = this;
			that.showMarkerInfo(poisData, id);
			that.changeMarkerColor(markersData, id);
		},
		showMarkerInfo: function(data, i) {
			var that = this;
			that.textData = [
				{
					name: data[i].name,
					address: data[i].address,
					distance: data[i].distance,
					tel: data[i].tel
				}
			];
			that.mapContBotm = 'bottom:80px';
			that.mapTxtHeight = 'height:80px';
		},
		changeMarkerColor: function(data, i) {
			var that = this;
			var markers = [];
			for (var j = 0; j < data.length; j++) {
				if (j == i) {
					data[j].iconPath = '../../../static/img/icon/weizhi.png'; //如：..­/..­/img/marker_checked.png
				} else {
					data[j].iconPath = '../../../static/img/icon/weizhi.png'; //如：..­/..­/img/marker.png
				}
				markers.push({
					id: data[j].id,
					latitude: data[j].latitude,
					longitude: data[j].longitude,
					iconPath: data[j].iconPath,
					width: data[j].width,
					height: data[j].height
				});
			}
			that.markers = markers;
		},
		phonecall: function(e) {
			if (JSON.stringify(e) == '' || JSON.stringify(e) == '[]') {
				console.log('抱歉，未查询到此医院的电话');
			} else {
				uni.makePhoneCall({
					phoneNumber: e
				});
			}
		},
		tabhospital(e) {
			var id = e;
			var that = this;
			that.showMarkerInfo(poisData, id);
			that.changeMarkerColor(markersData, id);
		}
	}
};
</script>

<style scoped>
.content {
	padding: 0;
}
.map_container {
	position: absolute;
	top: 0;
	bottom: 80px;
	left: 0;
	right: 0;
}
.map {
	width: 100%;
	height: 100%;
}
.map_text {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0px;
	height: 80px;
	background: #fff;
	padding: 0 15px;
	overflow-y: scroll;
}
text {
	margin: 3px 0;
	display: block;
	font-size: 12px;
}
.h1 {
	margin: 15px 0;
	font-size: 15px;
}
</style>
