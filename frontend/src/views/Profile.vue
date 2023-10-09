<template>
	<div class="container-fluid">
		<window title="Профиль" v-if="currentUser">
			<div class="field mx-4">
				<div class="item"><b>ID:</b> {{currentUser.id}}</div>
				<div class="item"><b>Логин:</b> {{currentUser.login}}</div>
				<div class="item"><b>Роль:</b> {{currentUser.role}}</div>
			</div>
			<div class="field mx-4">
				<button class="btn btn-dark" @click.prevent="logout">Выйти</button>
			</div>
		</window>
	</div>
</template>

<script>
	import Window from '@/components/Window';
	export default {
		name: 'ProfileUser',
		components: {
			Window: Window
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
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex-basis: 25%;
	}
	.container-fluid .field > .item{
		border: 2px solid black;
		background-color: #FFFFFF;
	}
	.container-fluid .field > :nth-child(n){
		border-radius: 15px;
		width: 95%;
		user-select: none;
		font-size: 2.5vmin !important;
		padding: 0.6vmin !important;
		margin: 1vmin 0;
	}
</style>