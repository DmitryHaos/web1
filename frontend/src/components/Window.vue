<template>
	<div class="block">
		<div class="block-header">
			<h4>{{title}}</h4>
		</div>
		<div class="block-main">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'UI-Window',
		props: {
			title: {
				type: String,
				required: true
			}
		}
	}
</script>

<style name="main" scoped>
	.block{
		display: flex;
		flex-direction: column;
		border-radius: 20px;
		background-color: #A497D9;
		aspect-ratio: 3 / 2;
		margin: 20px;
	}
	.block > .block-header{
		display: flex;
		flex-basis: 25%;
		justify-content: center;
		align-items: center;
		border-radius: 20px 20px 0px 0px;
		background-color: #5829B2;
	}
	.block > .block-main{
		display: flex;
		flex-direction: column;
		flex-basis: 75%;
		justify-content: center;
		border-radius: 0px 0px 20px 20px;
	}
	.block > .block-header > h4{
		user-select: none;
		color: #FFFFFF;
		font-weight: bold;
		font-size: 4vmin !important;
		margin: 0;
	}
</style>

<style name="width" scoped>
	@media(max-width: 250px){
		.block{
			display: none;
		}
	}
</style>

<style name="height" scoped>
	@media(max-height: 250px){
		.block{
			display: none;
		}
	}
	@media(min-height: 250px) and (max-height: 300px){
		.block{
			width: 200px;
		}
	}
	@media(min-height: 300px) and (max-height: 350px){
		.block{
			width: 280px;
		}
	}
	@media(min-height: 350px) and (max-height: 400px){
		.block{
			width: 360px;
		}
	}
	@media(min-height: 400px) and (max-height: 450px){
		.block{
			width: 440px;
		}
	}
	@media(min-height: 450px) and (max-height: 500px){
		.block{
			width: 520px;
		}
	}
	@media(min-height: 500px) and (max-height: 700px){
		.block{
			width: 600px;
		}
	}
	@media(min-height: 700px) and (max-height: 900px){
		.block{
			width: 700px;
		}
	}
	@media(min-height: 900px) and (max-height: 1100px){
		.block{
			width: 800px;
		}
	}
	@media(min-height: 1100px){
		.block{
			width: 81vh;
		}
	}
</style>