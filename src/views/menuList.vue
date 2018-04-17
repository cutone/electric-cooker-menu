<template>
	<div>
		<div class="ecm-search-wrap" fixed>
			<input class="ecm-search-input" type="text" placeholder="请输入菜谱名称" v-model="keyword">
			<span class="white ecm-search-btn" @click="getMenuList()">搜索</span>
		</div>
		<div class="ecm-menu-item-wrap ecm-islink" v-for="item in menuList" @click="goToPath(item.menuId)">
		  	<img v-bind:src="serverPath+item.menuImage" class="ecm-menu-img">
		  	<div class="ecm-menu-info-wrap">
		  		<p class="ecm-menu-name">{{item.menuName}}</p>
		  		<p class="ecm-menu-summary">菜谱简介：{{item.menuSummary}}</p>
		  	</div>
		</div>
		<tab-bar></tab-bar>
	</div>
</template>
<style>
	.ecm-search-wrap{
		padding: 5px 10px;
		background-color: #26a2ff;
	}
	.ecm-search-input{
		height: 30px;
	    width: 80%;
	    border: 1px solid #ccc;
	    border-radius: 30px;
	    line-height: 30px;
	    padding-left: 20px;
	    font-size: 14px;
	}
	.ecm-search-btn{
		line-height: 30px;
		float: right;
		font-size: 14px;
	}
	.ecm-menu-item-wrap{
		display: block;
		padding: 10px;
		border-bottom: 1px solid #f8f8f8;
	}
	.ecm-menu-img{
		display: inline-block;
		width: 50px;
		height: 50px;
		vertical-align: middle;
	}
	.ecm-menu-info-wrap{
		display: inline-block;
		vertical-align: middle;
	}
	.ecm-menu-summary{
		font-size: 12px;
	}
</style>
<script>
	import tabBar from '@/components/tabBar'
	export default {
		data(){
			return {
				keyword: '',
				menuList: []
			}
		},
		mounted(){
			this.getMenuList();
		},
		computed: {
		    serverPath(){
		      	return this.$store.state.serverPath
		    }
		},
		methods: {
			getMenuList(){
				axios.post('/menus/menuList',{
					menuName: this.keyword
				}).then((res)=>{
					var res = res.data;
					this.menuList = res.result;
				})
			},
			goToPath(menuId){
				this.$router.push({
					path: '/menuDetails?menuId='+menuId
				})
			}
		},
		components: {
		    tabBar
		}
	}
</script>