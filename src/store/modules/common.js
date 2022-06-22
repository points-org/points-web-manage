const state = {
	showTags: true,
	breadCrumbs: [],
	breadCrumbsShow: true,
	themeClass: 'dark',
	language: 2
}

const mutations = {
	SWITCH_TAGS: (state) => {
		state.showTags = !state.showTags
	},
	SWITCH_BREAD_CRUMBS_SHOWS: (state) => {
		state.breadCrumbsShow = !state.breadCrumbsShow
	},
	SAVE_BREAD_CRUMBS: (state, view) => {
		state.breadCrumbs = view
	},
	SAVE_THEME_CLASS: (state, view) => {
		state.themeClass = view
	},
	SAVE_LANGUAGE: (state, view) => {
		state.language = view
	},
}

const actions = {
	swichTags({
		commit
	}) {
		commit('SWITCH_TAGS')
	},
	swichBreadCrumbsShows({
		commit
	}) {
		commit('SWITCH_BREAD_CRUMBS_SHOWS')
	},
	saveBreadCrumbs({
		commit
	}, view) {
		commit('SAVE_BREAD_CRUMBS', view)
	},
	saveThemeClass({
		commit
	}, view) {
		commit('SAVE_THEME_CLASS', view)
	},
	saveLanguage({
		commit
	}, view) {
		commit('SAVE_LANGUAGE', view)
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
