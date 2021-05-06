import Vue from 'vue'
import 'muse-ui/dist/muse-ui.css'
import MuseUI from 'muse-ui'
import Toast from 'muse-ui-toast'
import theme from 'muse-ui/lib/theme'
theme.add('funtask', {
  primary: '#ff6300',
  secondary: '#5e5c5d',
  success: '#4caf50',
  warning: '#fdd835',
  info: '#ff6300',
  error: '#f44336',
  track: '#757575',
  text: {
    primary: '#fff',
    secondary: 'rgba(255, 255, 255, 0.7)',
    alternate: '#303030',
    disabled: 'rgba(255, 255, 255, 0.8)',
    hint: 'rgba(255, 255, 255, 0.8)' // 提示文字颜色
  },
  divider: 'rgba(255, 255, 255, 0.3)',
  background: {
    paper: '#424242',
    chip: '#616161',
    default: '#303030'
  }
})

theme.use('funtask')
Vue.use(MuseUI)
Vue.use(Toast)
