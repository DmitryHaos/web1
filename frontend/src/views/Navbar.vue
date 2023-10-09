<template>
	<nav class="navbar">
		<div v-if="currentUser" class="nav-container">
		</div>
		<div v-else class="nav-container">
		</div>

		<div v-if="currentUser" class="nav-container">
			<div class="nav-column">
				<router-link to="/profile" class="nav-row">
					{{ currentUser.login }}
				</router-link>
			</div>
			<div class="nav-column">
				<button class="nav-row" @click.prevent="logout">
					Выйти
				</button>
			</div>
		</div>
		<div v-else class="nav-container">
			<div class="nav-column">
				<router-link to="/register" class="nav-row">
					Регистрация
				</router-link>
				<router-link to="/login" class="nav-row">
					Вход в систему
				</router-link>
			</div>
		</div>
	</nav>
</template>

<script>
	export default {
		name: "NavBar",
		data() {
			return {
			};
		},
		computed: {
			currentUser() {
				return this.$store.state.auth.user;
			}
		},
		methods: {
			logout() {
				this.$store.dispatch('auth/logout');
				window.location.href = '/login';
			}
		}
	};
</script>

<style name="main" scoped>
	.navbar{
		display: flex;
		justify-content: space-between;
		background-color: #AAFFAA;
		padding: 2vmin 0;
	}
	.navbar > .nav-container{
		display: flex;
		margin: 0 1vmin;
	}
	.navbar > .nav-container > .nav-column{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 0 2vmin;
	}
	.navbar > .nav-container > .nav-column > :first-child{
		padding-top: 0 !important;
	}
	.navbar > .nav-container > .nav-column > :last-child{
		padding-bottom: 0 !important;
	}
	.navbar > .nav-container > .nav-column > .nav-row{
		color: #0000AA;
		font-weight: bold;
		font-size: 2.6vmin !important;
		text-decoration: none;
		background: none;
		border: none;
		padding: 0.2vh 0;
	}
	.navbar > .nav-container > .nav-column > .nav-row:hover{
		color: #FF0000;
	}
	.navbar > .nav-container > .nav-column > .nav-row:active{
		border: 0px solid rgba(0, 0, 0, 0);
	}
</style>

<style name="width" scoped>
	@media(max-width: 250px){
		.navbar{
			display: none;
		}
	}
</style>

<style name="height" scoped>
	@media(max-height: 250px){
		.navbar{
			display: none;
		}
	}	
</style>