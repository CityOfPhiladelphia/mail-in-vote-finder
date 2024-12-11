<script setup>

import { onMounted } from 'vue';

import $config from '../main.js';

import greetingSection from './greetingSection.vue';

const props = defineProps({
  database: {
    type: Array,
  },
  isMobile: {
    type: Boolean,
    default: false,
  },
});

const sections = ref({});

// computed
const electionOfficeCount = computed(() => {
  let electionOffices = [];
  for (let site of props.database) {
    if (site.site_type === 'Election office') {
      electionOffices.push(site);
    }
  }
  return electionOffices.length;
});

const i18nEnabled = computed(() => {
  if (this.$config.i18n) {
    return true;
  }
  return false;
});

onMounted(async () => {
  sections.value = $config.sections;
});

// methods
const getCounts = () => {
  // console.log('customGreeting.vue getCounts is running');
  const refineData = props.database;
  // const refineData = this.sources[this.$appType].data.rows;

  let service = '';

  // console.log('in getRefineSearchList, refineData:', refineData);
  refineData.forEach((arrayElem) => {
    // console.log('arrayElem:', arrayElem);
    if (arrayElem.services_offered) {
      service += `${arrayElem.services_offered},`;
    } else if (arrayElem.attributes.CATEGORY) {
      service += `${arrayElem.attributes.CATEGORY},`;
    }
  });

  // TODO: break this into smaller chunks
  // let serviceArray = service.split(/(,|;)/);
  let serviceArray = service.split(',');
  serviceArray = serviceArray.map(s => s.trim());

  // const uniqArray = [ ...new Set(serviceArray) ];
  // console.log('serviceArray:', serviceArray, 'uniqArray:', uniqArray);
  //
  // // clean up any dangling , or ;
  // let uniq = uniqArray.filter(a => a.length > 2);
  //
  // uniq.filter(Boolean); // remove empties

  let countObject = serviceArray.reduce(function (acc, curr) {
    if (typeof acc[curr] == 'undefined') {
      acc[curr] = 1;
    } else {
      acc[curr] += 1;
    }
    return acc;
  }, {});

  return countObject;
};

</script>

<template>
  <div
    class="custom-greeting content"
  >
    <div class="exclamation-holder columns is-mobile">
      <div class="column is-narrow padding-4 padding-top-8">
        <font-awesome-icon
          icon="exclamation-triangle"
          class="fa-2x fa-icon-class"
        />
      </div>
      <div class="column exclamation-details">
        <div class="column padding-4">
          {{ $t('introPage.exclamation') }} <a
            target="_blank"
            href="https://atlas.phila.gov/voting"
          >atlas.phila.gov/voting</a>.
        </div>
      </div>
    </div>

    <div class="has-text-centered container">
      <button
        class="button greeting-button"
        @click="$emit('view-list')"
        v-html="$t('app.viewList')"
      />
      <button
        v-if="isMobile"
        class="button greeting-button"
        @click="$emit('view-map')"
        v-html="$t('app.viewMap')"
      />
    </div>

    <!-- sections that rely on data -->
    <greeting-section
      v-for="(section, key) in sections"
      :key="key"
      :header="key"
      :section="$config.sections[key]"
      :color="$config.sections[key].color"
      :election-office-count="electionOfficeCount"
    />

    <div
      class="section-header"
      :style="{ 'background-color': '#F0F0F0', 'color': 'black' }"
    >
      <b>{{ $t('introPage.relatedContent') }}</b>
    </div>
    <a
      target="_blank"
      href="https://www.pavoterservices.pa.gov/Pages/voterregistrationstatus.aspx"
    >{{ $t('introPage.link1') }}</a><br>
    <a
      target="_blank"
      href="https://www.pavoterservices.pa.gov/pages/ballottracking.aspx"
    >{{ $t('introPage.link2') }}</a><br>
  </div>
</template>

<style lang="scss" scoped>

.greeting-button {
  background-color: #0f4d90 !important;
  border-color: #0f4d90 !important;
  font-size: 1rem;
  color: white;
  cursor: pointer;
  margin: 1rem;
}

.greeting-button:hover {
  background-color: #444444 !important;
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

h1 {
  font-size: 20px;
}

h2 {
  font-size: 16px;
}

.main-area {
  padding: 10px;
}

.custom-callout {
  border-style: solid;
  border-width: 1px;
  padding: 10px;
}

.no-margin {
  margin: 0px;
}

.open-list-div {
  margin: 0 auto;
}

.custom-greeting {
  margin-top: 1rem;
  margin-bottom: 2rem;
  margin-left: 2rem;
  margin-right: 1rem;
  /* padding: 12px; */
}

.padding-4 {
  padding: 4px;
}

.padding-top-8 {
  padding-top: 8px;
}

.exclamation-holder {
  padding: 1rem;
  display: flex;
  align-items: center;
  // margin-top: 6px;
  // margin-bottom: 14px;
}

.fa-icon-class {
  margin: 0 auto;
  display: block;
}

.exclamation-details {
  margin-left: 14px;
  font-size: 15px;
}

.mb-panel-topics-greeting {
  padding-top: 20px;
}

.greeting {
  font-size: 20px;
  color: #444;
  padding: 14px;
}

.greeting-error {
  border-left-color: #ff0000;
}

.custom-section {
  margin-left: 8px;
  margin-top: 4px;
}

.custom-ul {
  margin-left: 4rem;
  font-size: 14px;
}

/*medium*/
@media screen and (min-width: 750px) {
  .mb-panel-topics-greeting {
    /*make this scroll on medium screens*/
    /*REVIEW this is a little hacky. the 120px shouldn't be hard-coded.*/
    height: calc(100vh - 120px);
    overflow: auto;
  }
}

</style>
