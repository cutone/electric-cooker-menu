<template>
	<div>
		<mt-header title="修改资料" fixed>
	        <a href="javascript:;" @click="goBack()" slot="left">
	            <mt-button icon="back">返回</mt-button>
	        </a>
	        <mt-button slot="right" @click="submitUserInfo()">提交</mt-button>
    	</mt-header>
		<div class="margin-top-40">
			<image-upload ref="imageUpload" :file-name="user.userImage"></image-upload>
			<mt-field label="昵称" v-model="user.userName"></mt-field>
			<mt-field label="个人简介" type="textarea" v-model="user.userSummary" rows='4'></mt-field>
		</div>
	</div>
</template>
<script>
	import imageUpload from '../components/uploadImage'
	import {Toast} from 'mint-ui';
	export default {
		data(){
			return {
				user: {}
			}
		},
		mounted(){
			this.getUserInfo();
		},
		methods: {
			getUserInfo(){
				axios.post('/users/getUserInfo').then((res)=>{
					var res = res.data;
					this.user = res.result;
				})
			},
			submitUserInfo(){
				this.user.userImage = this.$refs.imageUpload.fileName;  //获取子组件中的filename变量
				if(!this.user.userName){
					Toast({
					  	message: '请输入昵称',
					  	position: 'bottom',
					  	duration: 2000
					});
					return;
				}else if(!this.user.userSummary){
					Toast({
					  	message: '请输入个人简介',
					  	position: 'bottom',
					  	duration: 2000
					});
					return;
				}else if(!this.user.userImage){
					Toast({
					  	message: '请上传头像',
					  	position: 'bottom',
					  	duration: 2000
					});
					return;
				}
				axios.post('/users/editUserInfo',{
					userName: this.user.userName,
					userImage: this.user.userImage,
					userSummary: this.user.userSummary
				}).then((res)=>{
					var res = res.data;
					if(res.status == '1'){
						let instance = Toast({
							message: '修改成功',
  							iconClass: 'icon icon-success'
  						});
						setTimeout(() => {
						  	instance.close();
							this.$router.go(-1);
						}, 2000);	
					}
				})
			},
			goBack(){
				this.$router.go(-1);
			}
		},
		components: {
			imageUpload
		}
	}
</script>