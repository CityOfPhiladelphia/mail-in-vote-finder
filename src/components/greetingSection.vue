<script setup>

import $config from '../main.js';

// use these if running off unlinked package
import { useDataStore } from '@phila/pinboard';
// OR
// use this if running off linked package
// import { useDataStore } from '../../node_modules/@phila/pinboard/src/stores/DataStore.js';

const DataStore = useDataStore();

const instance = getCurrentInstance();
const locale = computed(() => instance.appContext.config.globalProperties.$i18n.locale);
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const languageKey = {
  'en': 'english',
  'es': 'spanish',
  'ch': 'chinese',
}

const electionCountdown = DataStore.sources.nextElection.data.election_count_down_settings;

const props = defineProps({
  'header': {
    type: String,
    default: 'defaultTitle',
  },
  'color': {
    type: String,
    default: '#0F4D90',
  },
  'electionOfficeCount': {
    type: Number,
    default: 10,
  },
  'section': {
    type: Object,
    default: function(){
      return {};
    },
  },
});

// computed
// const calloutText = computed(() => {
//   // console.log('greetingSection.vue calloutText computed, this.$i18n:', this.$i18n, 'this.$i18n.messages[this.$i18n.locale]:', this.$i18n.messages[this.$i18n.locale]);
//   let text = '';
//   if (t(sections[props.section.titleSingular].callout1)) {
//     text += t(sections[props.section.titleSingular].callout1);
//   } else {
//     text += t(sections[props.section.titleSingular].callout1);
//   }

//   if (t(sections[props.section.titleSingular].callout2)) {
//     text += '<br>' + t(sections[props.section.titleSingular].callout2);
//   } else if (this.$i18n.messages['en'].sections[this.$props.section.titleSingular].callout1) {
//     text += '<br>' + this.$i18n.messages['en'].sections[this.$props.section.titleSingular].callout2;
//   }
//   return text;
// });

// const subsectionsData = computed(() => {
//   return $config.subsections || [];
// });

// const subsectionCountsFromProps = computed(() => {
//   let subsections = this.$props.section.subsections || [];
//   let compiled = 0;
//   let value = {};
//   if (Array.isArray(subsections[0])) {
//     for (let subsubsection of subsections[0]) {
//       // console.log('subsubsection:', subsubsection, 'this.subsectionsData[subsubsection]:', this.subsectionsData[subsubsection]);
//       if (this.subsectionsData[subsubsection]) {
//         compiled += this.subsectionsData[subsubsection];
//       }
//     }
//     value.compiled = compiled;
//   } else {
//     value = this.subsectionsData;
//   }
//   return value || {};
// });

// watch(
//   () => subsectionsFromStore,
//   (nextSubsections) => {
//     this.$data.subsectionsData = nextSubsections;
//   }
// )

</script>

<template>
  <div class="greeting-section">
    <div
      class="section-header"
      :style="{ 'background-color': color }"
    >
      <b>{{ $t('sections.' + header + '.header') }}</b>
    </div>

    <div>
      <h3 v-if="$t('sections.' + header + '.h2')">
        {{ $t('sections.' + header + '.h2') }}
      </h3>
      <div class="spacer">
        <span v-if="header != 'Election office'" v-html="$t('sections.' + header + '.p1')" />
        <span v-else>{{ electionCountdown[languageKey[locale]].ballot_drop_off_finder_note_text }}</span>
      </div>
      <div v-if="$t('sections.' + header + '.dates') != '' ">
        <table class="dates">
          <tbody>
            <tr>
              <td>{{ $t('sections.' + header + '.dates.d2.text') }}</td>
              <td>{{ electionCountdown[languageKey[locale]].apply_for_mail_in_ballot_date }}</td>
            </tr>
            <tr>
              <td>{{ $t('sections.' + header + '.dates.d3.text') }}</td>
              <td>{{ electionCountdown[languageKey[locale]].request_replacement_ballot_date }}</td>
            </tr>
            <tr>
              <td>{{ $t('sections.' + header + '.dates.d4.text') }}</td>
              <td>{{ electionCountdown[languageKey[locale]].drop_off_completed_ballot_date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

  h3 {
    color: #444444;
    font-family: "Montserrat-SemiBold", "Montserrat SemiBold", "Montserrat", sans-serif;
    font-weight: 650;
    font-size: 24px;
    padding-top: 14px;
    padding-bottom: 14px;
    line-height: 30px !important;
  }

  .greeting-section {
    font-size: 14px;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  .non-bold-header {
    font-size: 18px;
  }

  .spacer {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .callout {
    background-color: #f0f0f0;
    border: 6px;
    border-color: #f99300;
    border-left-style: solid;
    padding-left: 16px;
    padding-top: 8px;
    padding-bottom: 8px;
    margin-bottom: 10px;
    /* margin-top: 10px; */
    font-weight: bold;
  }

  .dates tbody tr:nth-child(even) {
    background:white;
  }

  .dates tbody tr:nth-child(odd) {
    background:white;
  }

  .dates td{
    border-bottom: 1px solid black;
    padding-left: 0;
  }
  .emphasis-text{
    /* font-style: italic; */
    padding: 1rem 0;
  }

  .section-header {
    background-color: #0f4d90;
    font-size: 16px;
    color: white;
    margin-top: 4px;
    margin-bottom: 4px;
    padding: 4px;
    padding-left: 8px;
  }

  .subsection-content{
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .underlined {
    text-decoration: underline;
  }

  .table-light table {
    width: 100% !important;
    margin-left: 0px !important;
  }

  /* .table-light th {
    max-width: 50px !important;
    width: 10% !important;
  } */

  .table-slot {
    margin-left: 8px;
    margin-top: 4px;
  }

</style>
