<template>
	<div>
		<mt-header :title="title" fixed>
	        <a href="javascript:;" @click="goBack()" slot="left" v-if="type == 'edit'">
	            <mt-button icon="back">返回</mt-button>
	        </a>
	        <mt-button slot="right" @click="submitMenu()">提交</mt-button>
    	</mt-header>
		
		<imageUpload ref="imageUpload" :file-name="menuImage" class="margin-top-40"></imageUpload>

		<mt-field label="菜谱名称" placeholder="菜谱名称" v-model="menuName" class="ecm-border-bottom"></mt-field>
		<mt-field label="菜谱介绍" placeholder="菜谱介绍" type="textarea" v-model="menuSummary" class="ecm-border-bottom"></mt-field>
		<div class="ecm-wrapper">
			<label class="ecm-label">制作食材</label>
			<div v-for="item in foodList">
				<input class="ecm-food-input" type="text" v-model="item.foodName" placeholder="食材名称">
				<input class="ecm-food-input" type="text" v-model="item.foodQuantity" placeholder="食材数量（请输入单位）">
				<i class="fa fa-times-circle ecm-close-btn float-right" @click="deleteFood(item)"></i>
			</div>
			<mt-button type="primary" size="large" @click="addFood()">添加</mt-button>
		</div>
		<div class="ecm-wrapper">
			<label class="ecm-label">制作步骤</label>
			<div v-for="item in stepList">
				<input class="ecm-step-input" type="text" v-model="item.stepDetail" placeholder="步骤详情">
				<i class="fa fa-times-circle ecm-close-btn float-right" @click="deleteStep(item)"></i>
			</div>
			<mt-button type="primary" size="large" @click="addStep()">添加</mt-button>
		</div>
		<tab-bar v-if="type=='upload'"></tab-bar>
	</div>
</template>
<script>
	import imageUpload from '../components/uploadImage'
	import tabBar from '@/components/tabBar'
	import {Toast} from 'mint-ui';
	export default {
		data(){
			return {
				menuName: '',
				menuSummary: '',
				menuImage: '',
				foodList: [{
					foodName: '',
					foodQuantity: ''
				}],
				stepList: [{
					stepDetail: '',
					setpImage: ''
				}],
				type:'',
				title: ''
			}
		},
		mounted () {  
  			this.type = this.$route.query.type;
    		if(this.type == 'edit'){
    			this.title = '编辑菜谱'
    			this.menuId = this.$route.query.menuId;
      			this.getMenuDetails();
    		}else if(this.type == 'upload'){
    			this.title = '上传菜谱'
    		}
  		},  
		methods: {
			addFood(){
				var foodItem = {
					foodName: '',
					foodQuantity: ''
				}
				this.foodList.push(foodItem);
			},
			addStep(){
				var stepItem = {
					stepDetail: '',
					setpImage: ''
				}
				this.stepList.push(stepItem);
			},
			deleteFood(item){
				this.foodList.splice(this.foodList.indexOf(item),1);
			},
			deleteStep(item){
				this.stepList.splice(this.stepList.indexOf(item),1);
			},
			submitMenu(){
				this.menuImage = this.$refs.imageUpload.fileName;  //获取子组件中的filename变量
				
				if(!this.menuName){
					Toast({
					  	message: '请输入菜谱名称',
					  	position: 'bottom',
					  	duration: 2000
					});
					return;
				}else if(!this.menuSummary){
					Toast({
					  	message: '请输入菜谱简介',
					  	position: 'bottom',
					  	duration: 2000
					});
					return;
				}else if(!this.menuImage){
					Toast({
					  	message: '请上传菜谱图片',
					  	position: 'bottom',
					  	duration: 2000
					});
					return;
				}
				if(this.foodList.length == 0){
					Toast({
					  	message: '请添加制作食材',
					  	position: 'bottom',
					  	duration: 2000
					});
					return;
				}else{
					this.foodList.forEach((item)=>{
						if(!item.foodName || !item.foodQuantity){
							Toast({
							  	message: '请完善制作食材',
							  	position: 'bottom',
							  	duration: 2000
							});
							return;
						}
					})
				}
				if(this.stepList.length == 0){
					Toast({
					  	message: '请添加制作步骤',
					  	position: 'bottom',
					  	duration: 2000
					});
					return;
				}else{
					this.stepList.forEach((item)=>{
						if(!item.stepDetail){
							Toast({
							  	message: '请完善制作步骤',
							  	position: 'bottom',
							  	duration: 2000
							});
							return;
						}
					})
				}
				if(this.type == 'upload'){
					axios.post('/menus/addMenu',{
						menuName: this.menuName,
						menuImage: this.menuImage,
						menuSummary: this.menuSummary,
						food: this.foodList,
						step: this.stepList
					}).then((res)=>{
						var res = res.data;
						if(res.status == 1){
							let instance = Toast({
								message: '操作成功',
	  							iconClass: 'icon icon-success'
	  						});
							setTimeout(() => {
							  instance.close();
								this.$router.push({
									path:'/menuDetails',
									query:{menuId: res.result.menuId}
								})
							}, 2000);
						}
					})
				}else if(this.type == 'edit'){
					axios.post('/menus/editMenu',{
						menuId: this.menuId,
						menuName: this.menuName,
						menuImage: this.menuImage,
						menuSummary: this.menuSummary,
						food: this.foodList,
						step: this.stepList
					}).then((res)=>{
						var res = res.data;
						if(res.status == 1){
							let instance = Toast({
								message: '修改成功',
	  							iconClass: 'icon icon-success'
	  						});
							setTimeout(() => {
							  instance.close();
								this.$router.push({
									path:'/menuDetails',
									query:{menuId: res.result.menuId}
								})
							}, 2000);
						}
					})
				}
			},
			getMenuDetails(){
		      	axios.post('/menus/menuDetails',{
		        	menuId: this.menuId
		      	}).then((res)=>{
		        	var res = res.data;
		        	this.menuDetails = res.result;
		        	this.menuName = this.menuDetails.menuName,
					this.menuSummary = this.menuDetails.menuSummary,
					this.menuImage = this.menuDetails.menuImage,
					this.foodList = this.menuDetails.food,
					this.stepList = this.menuDetails.step
		      	})
		    },
		    goBack(){
		    	this.$router.go(-1);
		    }
		},
		components: {
			imageUpload,
		    tabBar
		}
	}
</script>
<style>
	.ecm-border-bottom{
		border-bottom: 1px solid #d5d5d5;
	}
	.ecm-wrapper{
		padding: 0 0 10px;
		border-bottom: 1px solid #d5d5d5;
		margin: 0 10px;
	}
	.ecm-label{
		display: inline-block;
		height: 40px;
		line-height: 40px;
	}
	.ecm-food-input{
		display: inline-block;
		width: 41vw;
		height: 40px;
	    line-height: 40px;
	    font-size: 14px;
	}
	.ecm-step-input{
		display: inline-block;
		width: 82vw;
		height: 40px;
	    line-height: 40px;
	    font-size: 14px;
	}
	.ecm-close-btn{
		color: #f85f48;
	    font-size: 7vw;
	    display: inline-block;
	    vertical-align: middle;
	    margin-top: 6px;
	}
</style>