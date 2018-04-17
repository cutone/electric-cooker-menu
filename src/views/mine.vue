<template>
	<div>
		<div class="ecm-user-info-wrap">
			<i class="fa fa-pencil-square-o fa-2x ecm-edit-btn" @click="editInfo()"></i>
			<img v-bind:src="serverPath + user.userImage" alt="" class="ecm-user-img">	
			<p class="ecm-user-name">{{user.userName}}</p>
			<p class="ecm-user-summary">{{user.userSummary}}</p>
		</div>
		<div>
			<mt-cell title="我的创作" is-link @click="toCreateList()" to="/collection?type=create">
			  	<span style="color: green"></span>
			</mt-cell>
			<mt-cell title="我的收藏" is-link to="/collection?type=collection">
			  	<span style="color: green"></span>
			</mt-cell>
		</div>
		<mt-button type="danger" class="ecm-logout-btn" size="large" @click="logOut()">退出登陆</mt-button>
		<tab-bar></tab-bar>
	</div>
</template>
<script>
	import tabBar from '@/components/tabBar'
	export default {
		data(){
			return {
				user: ''
			}
		},
		mounted(){
			this.getUserInfo();
		},
		computed: {
			serverPath(){
		      	return this.$store.state.serverPath
		    }
		},
		methods:{
			getUserInfo(){
				axios.post('/users/getUserInfo').then((res)=>{
					var res = res.data;
					this.user = res.result;
				})
			},
			editInfo(){
				this.$router.push({
					path: '/editUserInfo?userId=' + this.user.userId
				})
			},
			logOut(){
				axios.post('/users/logout').then((res)=>{
					var res = res.data;
					if(res.status == '1'){
						this.$router.push('/signIn');
					}
				})
			}
		},
		components: {
		    tabBar
		}
	}
</script>
<style>
	.ecm-user-info-wrap{
		background: #26a2ff;
	    color: #fff;
	    padding: 20px 10px;
	    text-align: center;
	    position: relative;
	}
	.ecm-edit-btn{
		position: absolute;
		top: 20px;
		right: 10px;
	}
	.ecm-user-img{
		display: block;
	    margin: 0 auto;
	    width: 70px;
	    height: 70px;
	    border-radius: 70px;
	    border: 1px solid #fff;
	}
	.ecm-user-name{
		font-size: 16px;
		line-height: 40px;
	}
	.ecm-user-summary{
		line-height: 20px;
	}
	.mint-cell{
		border-bottom: 1px solid #d5d5d5;
		margin: 0 10px;
	}
	.ecm-logout-btn{
		width: 80%;
		display: block;
		margin: 20px auto;
	}
</style>