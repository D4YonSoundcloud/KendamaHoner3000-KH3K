
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import trickListData from "@/store/modules/trickListData";

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        trickListData
    },
    plugins: [createPersistedState()],
})