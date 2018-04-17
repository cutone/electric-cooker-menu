<template>
	<div class="ecm-signIn-wrap" ref="element">
		<div class="ecm-form">
			<mt-field placeholder="请输入账号" v-model="account" type="text" class="ecm-account-input" :attr="{autocomplete:'on'}"></mt-field>
			<mt-field placeholder="请输入密码" v-model="password" type="password" class="ecm-pasword-input" :attr="{autocomplete:'off'}"></mt-field>
			<mt-button type="primary" size="large" class="ecm-signUp-btn" @click="toSignUp()">注册</mt-button>
			<mt-button type="primary" size="large" class="ecm-signIn-btn" @click="signIn()">登陆</mt-button>
		</div>
	</div>	
</template>
<script>
	import {Toast} from 'mint-ui';
	export default {
		data() {
			return {
				account: '',
				password: ''
			}
		},
		methods: {
			signIn(){
				if(!this.account){
					Toast({
					  	message: '请输入账号',
					  	position: 'bottom',
					  	duration: 2000
					});
					return;
				}else if(!this.password){
					Toast({
					  	message: '请输入密码',
					  	position: 'bottom',
					  	duration: 2000
					});
					return;
				}
				axios.post('/users/signIn',{
					account: this.account,
					password: this.password
				}).then((res)=>{
					var res = res.data;
					if(res.status == '1'){
						var userId = res.result;
						this.$store.commit('updateUserId',userId);
						this.$router.push('/menulist');
					}else{
						Toast({
						  	message: res.msg,
						  	position: 'bottom',
						  	duration: 2000
						});
					}
				})
			},
			toSignUp(){
				this.$router.push('/signUp')
			}
		}
	}
</script>
<style>
	.ecm-signIn-wrap{
		background: url('../assets/signIn-bg.jpg') center no-repeat;
		background-size: 100% 100%;
		height: 100%;
		display: flex;
		align-items: center;
		margin-bottom: 0;
	}
	.ecm-account-input,.ecm-pasword-input{
		background: transparent;
		display: block;
		width: 100%;
		margin: 0 0 10px !important;
		padding-left: 10px;
		height: 40px;
		line-height: 40px;
		box-sizing: border-box;
	}
	.ecm-account-input input,
	.ecm-pasword-input input{
		background: transparent;
	}
	.ecm-signUp-btn,.ecm-signIn-btn{
		opacity: 0.7;
		margin-bottom: 10px;
	}
	.ecm-form{
		width: 65%;
		margin: 0 auto;
	}
</style>