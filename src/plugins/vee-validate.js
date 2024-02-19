import { defineRule, configure } from 'vee-validate';
import { required } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
// Define the rule globally
import th from '@vee-validate/i18n/dist/locale/th.json';

configure({
  generateMessage: localize({
    th
  }),
});