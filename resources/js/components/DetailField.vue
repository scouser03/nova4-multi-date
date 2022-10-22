<template>
  <div class="flex flex-col md:flex-row -mx-6 px-6 py-2 md:py-0 space-y-2 md:space-y-0">
    <div class="md:w-1/4 md:py-3">
      <slot>
        <h4 class="font-bold md:font-normal">{{ field.name }}</h4>
      </slot>
    </div>
    <div class="w-3/4 py-4 break-words">
      <slot name="value">
        <p class="md:py-3 break-all lg:break-words">
          <div v-if="data.length" v-for="date in data" class="flex items-center">
            <div class="flex items-center space-2 border p-2 mt-1 rounded-lg">
              <div class="flex items-center mx-2">
                  <label class="font-bold md:font-normal w-12"
                      >From:</label
                  >
                  <span
                      class="from-control"
                  >
                    {{ date.from_date }}
                  </span>
              </div>
              <span>|</span>
              <div class="flex items-center mx-2">
                  <label class="font-bold md:font-normal w-8"
                      >to:</label
                  >
                  <span
                      class="ml-1 from-control"
                  >
                  {{ date.to_date }}
                  </span>
              </div>
              </div>
          </div>
        </p>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
    props: ['resource', 'resourceName', 'resourceId', 'field'],
    data(){
        return {
            data: JSON.parse(this.field.value)
        }
    }
}
</script>