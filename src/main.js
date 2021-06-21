import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Loading from 'vue-loading-overlay'
import VueScrollTo from 'vue-scrollto'
import VueClipboard from 'vue-clipboard2'
import '../src/assets/style/theme/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import 'vue-loading-overlay/dist/vue-loading.css'
import VueMeta from 'vue-meta'
import lang from 'element-ui/lib/locale/lang/zh-TW'
import locale from 'element-ui/lib/locale'
import VueFbCustomerChat from 'vue-fb-customer-chat'

import {
  Pagination,
  Tag,
  Drawer,
  Avatar,
  Dialog,
  Menu,
  MenuItem,
  Input,
  Checkbox,
  Select,
  Option,
  Button,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  Popover,
  Tooltip,
  Form,
  FormItem,
  Alert,
  Icon,
  Row,
  Col,
  Upload,
  Card,
  Steps,
  Step,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Link,
  Divider,
  Image,
  Calendar,
  MessageBox,
  Message,
  Collapse,
  CollapseItem
} from 'element-ui'

Vue.use(Pagination)
Vue.use(Tag)
Vue.use(Drawer)
Vue.use(Avatar)
Vue.use(Dialog)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(Popover)
Vue.use(Tooltip)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Alert)
Vue.use(Icon)
Vue.use(Row)
Vue.use(Col)
Vue.use(Upload)
Vue.use(Card)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Link)
Vue.use(Divider)
Vue.use(Image)
Vue.use(Calendar)
Vue.use(Collapse)
Vue.use(CollapseItem)

Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

Vue.use(VueMeta)
Vue.use(VueScrollTo)
Vue.use(VueClipboard)

// messenger
Vue.use(VueFbCustomerChat, {
  page_id: process.env.VUE_APP_FB_PAGE_ID,
  locale: 'zh_TW'
})

// configure language
locale.use(lang)

Vue.component('Loading', Loading)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
