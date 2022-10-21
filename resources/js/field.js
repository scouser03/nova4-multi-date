import IndexField from './components/IndexField'
import DetailField from './components/DetailField'
import FormField from './components/FormField'

Nova.booting((app, store) => {
  app.component('index-nova4-multi-date', IndexField)
  app.component('detail-nova4-multi-date', DetailField)
  app.component('form-nova4-multi-date', FormField)
})
