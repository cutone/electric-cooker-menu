<template>
	<div>
		<mt-header :title="title" fixed>
			<a href="javascript:;" @click="goBack()" slot="left">
	            <mt-button icon="back">返回</mt-button>
	        </a>
		</mt-header>
		<div class="margin-top-40">	
			<div class="ecm-menu-item-wrap ecm-islink" v-for="item in menuList" @click="goToPath(item.menuId)">
			  	<img v-bind:src="serverPath+item.menuImage" class="ecm-menu-img">
			  	<div class="ecm-menu-info-wrap">
			  		<p class="ecm-menu-name">{{item.menuName}}</p>
			  		<p class="ecm-menu-summary">{{item.menuSummary}}</p>
			  	</div>
			</div>
		</div>
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
	}
	.ecm-search-btn{
		line-height: 30px;
		float: right;
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
	export default {
		data(){
			return {
				search: '',
				menuList: [],
				type: '',
				title: '我的收藏'
			}
		},
		mounted(){
			this.type = this.$route.query.type;
			if(this.type == 'create'){
				this.title = '我的创作';
				this.createList();
			}else if(this.type == 'collection'){
				this.title = '我的收藏';
				this.collectionList();
			}
		},
		computed: {
		    serverPath(){
		      	return this.$store.state.serverPath
		    }
		},
		methods: {
			collectionList(){
				axios.post('/users/collectionList').then((res)=>{
					var res = res.data;
					this.menuList = res.result;
				})
			},
			createList(){
				axios.post('/users/getCreateList').then((res)=>{
					var res = res.data;
					this.menuList = res.result;
				})
			},
			goToPath(menuId){
				this.$router.push({
					path: '/menuDetails?menuId='+menuId
				})
			},
			goBack(){
				this.$router.go(-1)
			}
		}
	}
</script>