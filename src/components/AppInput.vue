<template>
    <v-text-field 
        rounded="pill"
        bg-color="#fff"
        variant="outlined"
        :type="type"
        :disabled="disabled"
        :error-messages="errors"
        :value="value"
        v-bind="binds"
        v-on="events"
        @input="onInput">
    </v-text-field>
    <v-text-field
    rounded="pill"
        bg-color="#fff"
        variant="outlined"
        v-model="firstName"
        :rules="rules"
        label="First name"
      ></v-text-field>
</template>

<script>
export default {
  name: 'app-input',
  props: {
     name: {
      type: String,
      required: true
    },
    rules: {
      type: [String, Object],
      default: ''
    },
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text',
      validator: (val) => {
        return [
          'text',
          'number',
          'password',
          'tel',
          'time',
          'range',
          'color',
          'textarea',
          'checkbox',
          'select',
          'select-server',
          'date',
          'radio',
          'switch',
          'slider',
          'file',
          'chips',
          'chips-server',
          'datepicker',
          'picture',
          'dynamic-chips',
          'html-editor'
        ].includes(val)
      }
    },
    value: {
      required: true
    },
    view: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => []
    },
    binds: {
      type: Object,
      default: () => ({})
    },
    groupBinds: {
      type: Object,
      default: () => ({})
    },
    viewBinds: {
      type: Object,
      default: () => ({})
    },
    events: {
      type: Object,
      default: () => ({})
    },
    filterObject: {
      type: Function,
      default() {
        return 'name'
      }
    },
    multiple: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: ''
    },
    chips: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
</style>