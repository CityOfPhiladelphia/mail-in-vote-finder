<template>
  <div>
    <div
      class="section-header"
      :style="{ 'background-color': color }"
    >
      <b>{{ $t('sections.' + header + '.header') }}</b>
    </div>
    <div v-if="$t('sections.' + header + '.englishName') === 'Election office'">
      <div>
        <span>{{ $t('sections.' + header + '.p1') }}</span> <span> {{ electionOfficeCount }}</span>
        <span>{{ $t('sections.' + header + '.p2') }}</span>
      </div>
      <div class="emphasis-text">
        {{ $t('sections.' + header + '.p3') }}
      </div>
      <div class="non-bold-header">
        {{ $t('sections.' + header + '.h2') }}
      </div>

      <table class="dates">
        <tbody>
          <tr>
            <td>
              {{ $t('sections.' + header + '.dates.d2.text') }}
            </td>
            <td> {{ $t('sections.' + header + '.dates.d2.date') }}</td>
          </tr>
          <tr>
            <td>
              {{ $t('sections.' + header + '.dates.d3.text') }}
            </td>
            <td> {{ $t('sections.' + header + '.dates.d3.date') }}</td>
          </tr>
          <tr>
            <td>
              {{ $t('sections.' + header + '.dates.d4.text') }}
            </td>
            <td> {{ $t('sections.' + header + '.dates.d4.date') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="$t('sections.' + header + '.englishName') === 'Official mail-in ballot return'" />
    <div v-if="$t('sections.' + header + '.englishName') === 'Official mail-in ballot drop box'">
      <div>
        <div v-html="$t('sections.' + header + '.p1')" />
      </div>
    </div>
  </div>
</template>

<script>

import TopicComponent from '@phila/vue-comps/src/components/TopicComponent.vue';

export default {
  name: 'GreetingSection',
  components: {
    VerticalTableLight: () => import(/* webpackChunkName: "pvc_VerticalTableLight" */'@phila/vue-comps/src/components/VerticalTableLight.vue'),
    // HorizontalTableLight: () => import(/* webpackChunkName: "pvc_HorizontalTableLight" */'@phila/vue-comps/src/components/HorizontalTableLight.vue'),
  },
  mixins: [ TopicComponent ],
  props: {
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
  },
  computed: {
    subsectionsData() {
      return this.$store.state.subsections || [];
    },
    subsectionCountsFromProps() {
      let subsections = this.$props.section.subsections || [];
      let compiled = 0;
      let value = {};
      if (Array.isArray(subsections[0])) {
        for (let subsubsection of subsections[0]) {
          console.log('subsubsection:', subsubsection, 'this.subsectionsData[subsubsection]:', this.subsectionsData[subsubsection]);
          if (this.subsectionsData[subsubsection]) {
            compiled += this.subsectionsData[subsubsection];
          }
        }
        value.compiled = compiled;
      } else {
        value = this.subsectionsData;
      }
      return value || {};
    },
    mainVerticalTableOptions() {
      return {
        styles: {
          th: {
            'vertical-align': 'top',
            'font-size': '14px',
            'min-width': '45px !important',
            'max-width': '50px !important',
            'width': '10% !important',
          },
          td: {
            'font-size': '14px',
          },
        },
      };
    },
    mainVerticalTableSlots() {
      return {
        id: 'mainTable',
        fields: [
          {
            label: 'eligibility',
            labelType: 'i18n',
            value: 'sections.' + this.$props.header + '.dates',
            valueType: 'i18n',
            // valueType: 'component1',
            // value: 'component value',
          },
          {
            label: 'dates',
            labelType: 'i18n',
            valueType: 'component',
            value: 'component value',
          },
        ],
      };
    },

    // insideVerticalTableSlots() {
    //   return {
    //     id: 'insideTable',
    //     fields: [
    //       {
    //         label: 'Monday',
    //         value: 'test1',
    //         value1: 'test2',
    //         // value: function(state) {
    //         //   return state.sources.covidFreeMealSites.data.features[0].attributes.MONDAY;
    //         // },
    //       },
    //       {
    //         label: 'Tuesday',
    //         // valueType: 'i18n',
    //         value: function(state) {
    //           return state.sources.covidFreeMealSites.data.features[0].attributes.TUESDAY;
    //         },
    //       }
    //     ]
    //   }
    // },
    // insideHorizontalTableOptions() {
    //   return {
    //     id: 'daysAndHours',
    //     showOnlyIfData: true,
    //     limit: 5,
    //     fields: [
    //       {
    //         label: 'Day',
    //         value: function(state, item){
    //           return item.attributes.CATEGORY;
    //         },
    //         nullValue: 'no date available',
    //       },
    //       {
    //         label: 'Hours',
    //         value: function(state, item){
    //           return item.attributes.CATEGORY;
    //         },
    //         nullValue: 'no date available',
    //       },
    //       {
    //         label: 'Info',
    //         value: function(state, item){
    //           return item.attributes.CATEGORY;
    //         },
    //         nullValue: 'no date available',
    //       },
    //     ]
    //   }
    // },
    // insideHorizontalTableSlots() {
    //   return {
    //     // title: 'testtesttest',
    //     items: function(state) {
    //       let rows = {};
    //       if (state.sources.covidFreeMealSites.data) {
    //         var data = state.sources.covidFreeMealSites.data.features;
    //         rows = data.map(function(row){
    //           var itemRow = row;
    //           return itemRow;
    //         });
    //       }
    //       return rows;
    //     },
    //   }
    // }
  },
  watch: {
    subsectionsFromStore(nextSubsections) {
      this.$data.subsectionsData = nextSubsections;
    },
  },
};
</script>

<style>

  .non-bold-header {
    font-size: 18px;
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
