import Vue from 'vue';
import Vuetify from 'vuetify';
import '@mdi/font/css/materialdesignicons.css'
import colors from 'vuetify/lib/util/colors'
import 'vuetify/dist/vuetify.min.css';
import es from 'vuetify/es5/locale/es'
import en from 'vuetify/es5/locale/en'

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi',
    },
    theme:{
        themes:{
            light:{
                primary: colors.blue.lighten1,
                secondary: colors.grey.lighten5,
                accent: colors.shades.white,
                errors: colors.red.accent3,
                info: colors.grey.darken4,
                success: colors.green.lighten1,
            },
            dark:{
                primary: '#0b3052',
                secondary: '#012039',
                accent: '#06365e',
                errors: colors.red.accent3,
                info: colors.shades.white,
                success: colors.green.lighten1,
            }
        }
    },
    lang: {
        locales: {en,es},
        current: 'en',
    }
});