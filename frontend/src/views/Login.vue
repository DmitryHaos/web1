<template>
	<div class="container-fluid">
		<window title="Вход в систему">
			<div class="field mx-3 mt-1">
				<input class="form-control" :class="{error : validError.login}" type="text" placeholder="Логин" v-model="user.login" @click="updateStatus('login')"/>
			</div>
			<div class="field mx-3">
				<input class="form-control" :class="{error : validError.password}" type="password" placeholder="Пароль" v-model="user.password" @click="updateStatus('password')"/>
			</div>
			<div class="field mx-3">
				<button class="btn btn-dark" @click="login">
					<span v-show="loading" class="spinner-border spinner-border-sm"></span>
					<span>Войти</span>
				</button>
			</div>
			<div class="alert-message mx-3">
				<span>{{message}}</span>
			</div>
		</window>
	</div>
</template>

<script>
	import Window from '@/components/Window';
	export default {
		name: 'LoginUser',
		components: {
			Window: Window
		},
		data() {
			return {
				user: {
					login: "",
					password: ""
				},
				loading: false,
				message: "",
				validError: {
					"login": false,
					"password": false
				}
			};
		},
		methods: {
			login() {
				if (!this.validate()){
					this.message = "Не введен логин/пароль";
					return;
				}
				this.message = "";
				this.loading = true;
				this.$store.dispatch("auth/login", this.user)
					.then(() => {
						window.location.href = '/';
					})
					.catch(e => {
						this.loading = false;
						this.message = e.response.data.message;
					});
			},
			validate(){
				if (this.user.login.length === 0){
					this.validError.login = true;
				}
				if (this.user.password.length === 0){
					this.validError.password = true;
				}
				return (!this.validError.login) && (!this.validError.password);
			},
			updateStatus(key){
				this.validError[key] = false;
				this.message = "";
			}
		}
	}
</script>

<style name="main" scoped>
	.container-fluid{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-grow: 1;
	}
	.container-fluid .field{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-basis: 25%;
	}
	.container-fluid .alert-message{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-basis: 15%;
	}
	.container-fluid .alert-message > span{
		user-select: none;
		color: #FF0000;
		font-weight: bold;
		font-size: 2.5vmin !important;
	}
	.container-fluid .field > :nth-child(n){
		border-radius: 15px;
		width: 95%;
		user-select: none;
		font-size: 2.5vmin !important;
		padding: 1.2vmin !important;
	}
	.container-fluid .field > .form-control:focus{
		background-color: #B0CAFF;
	}
</style>

<style name="custom" scoped>
	.error{
		background-color: #FF8080;
		border: 2px solid #FF0000;
		outline: 0;
		box-shadow: 0 0 0 0.25rem rgba(255, 0, 0, 0.25);
	}
</style>