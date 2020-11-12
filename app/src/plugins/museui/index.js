import Vue from 'vue'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import theme from 'muse-ui/lib/theme'
theme.add('funtask', {
  primary: '#ff6300',
  secondary: '#5e5c5d'
}, 'dark')

theme.use('funtask')
Vue.use(MuseUI)
