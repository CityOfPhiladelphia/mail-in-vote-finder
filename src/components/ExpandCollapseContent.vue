<template>
  <div :class="isMobile ? 'main-content-mobile' : 'main-content'">
    <print-share-section
      :item="item"
    />
    <div class="columns top-section">
      <div class="column is-6">
        <div
          v-if="item.street_address"
          class="columns is-mobile"
        >
          <div class="column is-1">
            <font-awesome-icon icon="map-marker-alt" />
          </div>

          <div class="column is-11">
            {{ item.street_address }}<br>
            Philadelphia, PA {{ item.zip }}<br>
          </div>
        </div>
      </div>

      <div
        v-if="section !== 'Official mobile mail-in ballot return'"
        class="column is-6"
      >
        <div
          v-if="item.phone_number"
          class="columns is-mobile"
        >
          <div class="column is-1">
            <font-awesome-icon icon="phone" />
          </div>
          <div class="column is-11">
            {{ item.phone_number }}
          </div>
        </div>
      </div>
    </div>

    <election-office-card
      v-if="section === 'Election office'"
      :item="item"
    />

    <official-mobile-ballot-return-card
      v-if="section === 'Official mobile mail-in ballot return'"
      :item="item"
    />
    <official-ballot-return-drop-box
      v-if="section === 'Official mail-in ballot drop box'"
      :item="item"
    />
  </div>
</template>

<script>

import SharedFunctions from '@phila/pinboard/src/components/mixins/SharedFunctions.vue';
import ElectionOfficeCard from './ElectionOfficeCard.vue';
import OfficialMobileBallotReturnCard from './OfficialMobileBallotReturnCard.vue';
import OfficialBallotReturnDropBox from './OfficialBallotReturnDropBox.vue';

import PrintShareSection from '@phila/pinboard/src/components/PrintShareSection';

export default {
  name: 'ExpandCollapseContent',
  components: {
    // VerticalTableLight: () => import(/* webpackChunkName: "pvc_VerticalTable3CellsLight" */'@phila/vue-comps/src/components/VerticalTableLight.vue'),
    ElectionOfficeCard,
    OfficialMobileBallotReturnCard,
    OfficialBallotReturnDropBox,
    PrintShareSection,
  },
  mixins: [ SharedFunctions ],
  props: {
    item: {
      type: Object,
      default: function(){
        return {};
      },
    },
  },
  computed: {
    section() {
      return this.$props.item.site_type;
    },
  },
};

</script>

<style lang="scss">

// table {
//   border: 0px none;
//   border-style: none !important;
// }
//
// .table-intro {
//   margin-bottom: 16px;
// }
//
// .vgt-inner-wrap {
//   box-shadow: 0 0 0 0;
// }
//
// .vgt-table th {
//   padding: 0.4em 0.4em 0.4em 0.4em !important;
//   border-bottom-color: #444444 !important;
//   border-bottom-width: 2px !important;
//   background: #ffffff !important;
//   text-align: left;
// }
//
// table td:not([align]), table th:not([align]) {
//   text-align: left !important;
// }
//
// .vgt-table td {
//   // border-bottom-color: #444444 !important;
// }
//
// .vgt-table tr:nth-child(odd) {
//   background: #eee;
// }
//
// .center {
//   text-align: center;
// }
//
// .table-text {
//   font-family: "OpenSans-Regular", "Open Sans", sans-serif;
//   font-size: 14px;
// }
//
// .table-header-text {
//   font-family: "OpenSans-SemiBold", "Open Sans SemiBold", "Open Sans", sans-serif;
//   font-size: 14px;
// }
//
// .no-margin {
//   margin: 0px;
// }
//
// .no-header {
//   display: none;
// }

</style>
