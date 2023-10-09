import AuthService from '../services/auth.service';

var user = JSON.parse(localStorage.getItem('user'));

const state = {
	authData: {
		"token" : "",
		"tokenExp" : ""
	},
	loggedIn: user ? true : false,
	user:  user ? user : null
};

const getters = {
	isTokenActive() {
		const user = JSON.parse(localStorage.getItem("user"));
		const tokenExp = JSON.parse(localStorage.getItem("tokenExp"));
		if (!user || !tokenExp) {
			return false;
		}
		var res = AuthService.tokenAlive(tokenExp);
		return res;
	}
};

const actions = {
	login(ctx, user) {
		return AuthService.login(user).then(
			user => {
				ctx.commit("loginSuccess", user);
				return Promise.resolve(user);
			},
			error => {
				ctx.commit('loginError');
				return Promise.reject(error);
			}
		);
	},
	logout(ctx) {
		AuthService.logout();
		ctx.commit('logout');
	},
	register(ctx, user) {
		return AuthService.register(user).then(
			response => {
				ctx.commit('registerSuccess');
				console.log(response.data);
				return Promise.resolve(response.data);
			},
			error => {
				ctx.commit('registerError');
				return Promise.reject(error);
			}
		);
	},
	refreshToken(ctx, user) {
		return AuthService.refreshToken(user).then(
			user => {
				ctx.commit('saveTokenData', user);
				return Promise.resolve(user);
			},
			error => {
				console.log(error);
				return Promise.reject(error);
			}
		);
	}
};

const mutations = {
	loginSuccess(state, user) {
		state.loggedIn = true;
		state.user = user;
		const jwtDecodedValue = AuthService.jwtDecrypt(user.accessToken);
		const newTokenData = {
			token: user.accessToken,
			tokenExp: jwtDecodedValue.exp
		};
		localStorage.setItem('tokenExp', JSON.stringify(newTokenData.tokenExp));
		state.authData = newTokenData;
	},
	loginError(state) {
		state.loggedIn = false;
		state.user = null;
	},
	logout(state) {
		state.loggedIn = false;
		state.user = null;
	},
	registerSuccess(state) {
		state.loggedIn = false;
	},
	registerError(state) {
		state.loggedIn = false;
	},
	saveTokenData(state, user) {
		const jwtDecodedValue = AuthService.jwtDecrypt(user.accessToken);
		const newTokenData = {
			token: user.accessToken,
			tokenExp: jwtDecodedValue.exp
		};
		localStorage.setItem('tokenExp', JSON.stringify(newTokenData.tokenExp));
		state.authData = newTokenData;
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};