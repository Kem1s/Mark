<script>
export default {
	onLaunch: function() {
		console.log('App Launch');

		setTimeout(() => {
			// uni.setTabBarBadge({
			// 	index: 1,
			// 	text: '31'
			// });
			// uni.showTabBarRedDot({
			// 	index: 3
			// });
		}, 1000);
	},
	onShow: function() {
		console.log('App 进入前台');
	},
	onHide: function() {
		console.log('App 进入后台');
	}
};
</script>

<style lang="scss">
@import "./static/css/iconfont.css";
/*每个页面公共css */ 
page{
	background: #f5f6f7;
	font-size: 24upx;
}
ul{
	list-style: none;
	padding: 0;
}
</style>
