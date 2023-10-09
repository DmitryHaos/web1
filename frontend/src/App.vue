<template>
	<navbar/>
	<router-view></router-view>
</template>

<script>
	import Navbar from '@/views/Navbar';
	export default {
		name: 'App',
		components: {
			Navbar: Navbar
		}
	}
</script>

<style>
	* {
		margin: 0;
		padding: 0;
	}
	body{
		background: linear-gradient(90deg, #000000, #111111, #222222, #333333);
		background-attachment: fixed;
	}
	#app{
		display: flex;
		flex-direction: column;
		height: 100vh;
		color: #2C3E50;
		font-family: Avenir, Helvetica, Arial, sans-serif;
	}
</style>