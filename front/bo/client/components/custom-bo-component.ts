import { Component } from 'vue-property-decorator'
import { UstraBoComponent } from '@ustra/nuxt-mng-bo/src/components/ustra-bo-component'

@Component
export default class CustomBoComponent extends UstraBoComponent {
  mounted() {}
}

export { CustomBoComponent }
