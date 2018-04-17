<template>
	<div>
		<mt-header title="菜谱详情" fixed>
	        <a href="javascript:;" @click="goBack()" slot="left">
	            <mt-button icon="back">返回</mt-button>
	        </a>
	        <mt-button slot="right" @click="toEdit()" v-if="userid == menuDetails.createrId">编辑</mt-button>
	        <mt-button slot="right" @click="collect()" v-if="userid != menuDetails.createrId && !isCollectMenu">收藏</mt-button>
	        <mt-button slot="right" @click="cancelCollect()" v-if="userid != menuDetails.createrId && isCollectMenu">取消收藏</mt-button>
    	</mt-header>
		<img v-bind:src="serverPath+menuDetails.menuImage" alt="" class="ecm-menu-image">
		<p class="ecm-menu-name ecm-center">{{menuDetails.menuName}}</p>
		<p class="ecm-menu-summary">{{menuDetails.menuSummary}}</p>
		<mt-navbar v-model="selected">
		  	<mt-tab-item id="1" class="ecm-tab-item">制作食材</mt-tab-item>
		  	<mt-tab-item id="2" class="ecm-tab-item">制作步骤</mt-tab-item>
		</mt-navbar>

		<!-- tab-container -->
		<mt-tab-container v-model="selected" class="ecm-tab-container">
		  	<mt-tab-container-item id="1">
		    	<mt-cell v-bind:title="food.foodName+'--'+food.foodQuantity" v-for="food in menuDetails.food"></mt-cell>
		  	</mt-tab-container-item>
		  	<mt-tab-container-item id="2">
		    	<mt-cell v-bind:title="index+1+'、'+step.stepDetail" v-for="(step,index) in menuDetails.step"></mt-cell>
		  	</mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>
<script>
export default {
	data(){
		return {
			menuDetails: {},
			menuId: this.$route.query.menuId,
			selected: '1',
			isCollectMenu: false
		}
	},
	mounted(){
		this.getMenuDetails();
		this.isCollect();
	},
	computed:{
		serverPath(){
	      	return this.$store.state.serverPath;
	    },
	    userid(){
	      	return this.$store.state.userid;
	    }
	},
	methods: {
		getMenuDetails(){
			axios.post('/menus/menuDetails',{
				menuId: this.menuId
			}).then((res)=>{
				var res = res.data;
				this.menuDetails = res.result;
			})
		},
		collect(){
			axios.post('/users/collectMenu',{
				menuId: this.menuId,
				menuName: this.menuDetails.menuName,
				menuImage: this.menuDetails.menuImage,
				menuSummary: this.menuDetails.menuSummary,
				updateTime: this.menuDetails.updateTime
			}).then((res)=>{
				var res = res.data;
				if(res.status == '1'){
					this.isCollectMenu = true
				}
			})
		},
		cancelCollect(){
			axios.post('/users/cancelCollectMenu',{
				menuId: this.menuId
			}).then((res)=>{
				var res = res.data;
				if(res.status == '1'){
					this.isCollectMenu = false;
				}
			})
		},
		isCollect(){
			axios.post('/users/isCollect',{
				menuId: this.menuId,
			}).then((res)=>{
				var res = res.data;
				if(res.status == '1'){
					this.isCollectMenu = res.result;
				}
			})
		},
		goBack(){
			this.$router.go(-1);
		},
		toEdit(){
			this.$router.push({
				path: '/upload?menuId='+ this.menuId + '&&type=edit'
			})
		}
	}
}
</script>
<style>
	.ecm-menu-image{
		width: 100px;
	    display: block;
	    margin: 50px auto 0;
	}
	.ecm-menu-name{
		font-size: 18px;
	}
	.ecm-center{
		text-align: center;
	}
	.ecm-menu-summary{
		font-size: 14px;
		text-align: center;
	}
	.ecm-tab-item .mint-tab-item-label{
		font-size: 16px;
	}
	.ecm-tab-container{
		margin-top: 5px;
	}
	.mint-cell{
		border-bottom: 1px solid #d5d5d5;
		margin: 0 10px;
		padding: 5px 0;
	}
	.mint-cell-text{
		line-height: 20px;
	}
</style>