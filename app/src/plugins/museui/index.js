import Vue from 'vue'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import theme from 'muse-ui/lib/theme'
theme.add('teal', {
  primary: '#ff6300',
  secondary: '#5e5c5d',
  success: '#4caf50',
  warning: '#ffeb3b',
}, 'dark')
theme.use('teal')
Vue.use(MuseUI)
