<script setup>

import ElectionOfficeCard from './ElectionOfficeCard.vue';
import OfficialMobileBallotReturnCard from './OfficialMobileBallotReturnCard.vue';
import OfficialBallotReturnDropBox from './OfficialBallotReturnDropBox.vue';

const props = defineProps({
  item: {
    type: Object,
    default: function(){
      return {};
    },
  },
});

// computed
const section = computed(() => {
  return props.item.properties.site_type;
});

</script>

<template>
  <div class='main-ec-content'>
    <div class="columns top-section">
      <div class="column is-6">
        <div
          v-if="item.properties.street_address"
          class="columns is-mobile"
        >
          <div class="column is-1">
            <font-awesome-icon icon="map-marker-alt" />
          </div>

          <div class="column is-11">
            {{ item.properties.street_address }}<br>
            Philadelphia, PA {{ item.zip }}<br>
          </div>
        </div>
      </div>

      <div
        v-if="section !== 'Official mobile mail-in ballot return'"
        class="column is-6"
      >
        <div
          v-if="item.properties.phone_number"
          class="columns is-mobile"
        >
          <div class="column is-1">
            <font-awesome-icon icon="phone" />
          </div>
          <div class="column is-11">
            {{ item.properties.phone_number }}
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
      v-if="section === 'Official mail-in ballot dropbox' || section === 'Mail-in ballot dropbox (temporarily closed)'"
      :item="item"
    />
  </div>
</template>

<style lang="scss">

</style>
