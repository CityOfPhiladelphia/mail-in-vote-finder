<script setup>

const instance = getCurrentInstance();
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const props = defineProps({
  item: {
    type: Object,
    default: function(){
      return {};
    },
  },
});

// computed
const hoursTableOrLine = computed(() => {
  let value;
  if (this.$props.item.open_24_hours === "TRUE") {
    value = 'line';
  } else {
    value = 'table';
  }
  return value;
});

const daysKey = computed(() => {
  return {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
  };
});

const hours = computed(() => {
  let columns = [
    {
      label: 'Days',
      i18nLabel: 'daysOfOperation',
      field: 'days',
      thClass: 'th-black-class',
    },
    {
      label: 'Schedule',
      i18nLabel: 'schedule',
      field: 'schedule',
      thClass: 'th-black-class',
    },
  ];
  let days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  let rows = [];
  for (let [ index, day ] of days.entries()) {
    let closed = this.$i18n.messages[this.i18nLocale].closed;
    console.log('closed:', closed);
    let scheduleOrClosed = this.item[day+'_hours'] || closed;
    rows.push({
      id: index + 1,
      days: this.daysKey[day],
      schedule: scheduleOrClosed,
    });
  }
  return { columns, rows };
});

const arrayFields = computed(() => {
  let allFields = [ 'site_type', 'multilingual_support', 'site_accessible' ];
  let finalArray = [];
  let item = this.item;

  for (let field of allFields) {
    let values = [];

    if (field === 'site_type') {
      if (item[field] === 'Election office') {
        values.push('details.inPerson');
      }
    }

    if (field === 'site_type') {
      if (item[field] === 'Election office') {
        values.push('details.ballotDropoff');
      }
    }

    if (field === 'site_type') {
      if (item[field] === 'Official mobile mail-in ballot return') {
        values.push('details.ballotDropoff');
      }
    }
    if (field === 'site_type') {
      if (item[field] === 'Official mail-in ballot drop box') {
        values.push('details.ballotDropoff'); //TODO: check this
      }
    }

    if (field === 'multilingual_support') {
      if (item[field] === 'TRUE') {
        values.push('details.interpretationAvailable');
      }
    }

    if (field === 'site_accessible') {
      if (item[field] === 'TRUE') {
        values.push('details.wheelchair');
      }
    }

    // console.log('arrayFields, values:', values)
    for (let value of values) {
      finalArray.push(value);
    }
  }
  return finalArray;
});

</script>

<template>
  <section class="services">
    <h3>{{ $t('details.details') }}</h3>

    <p
      v-for="field in arrayFields"
      :key="field"
      class="no-margin"
      v-html="$t(field)"
    >
    </p>

    <h3>{{ $t('siteHours') }}</h3>

    <p
      v-if="hoursTableOrLine === 'line'"
    >
      {{ $t('details.electionDayHours') }}
    </p>

    <vue-good-table
      v-if="hoursTableOrLine === 'table'"
      :columns="hours.columns"
      :rows="hours.rows"
      :sort-options="{ enabled: false }"
      style-class="vgt-table condensed"
    >
      <template
        slot="table-column"
        slot-scope="props"
      >
        <span
          v-if="props.column.label =='Days'"
          class="table-header-text"
        >
          {{ $t(props.column.i18nLabel) }}
        </span>
        <span
          v-if="props.column.label =='Schedule'"
          class="table-header-text"
        >
          {{ $t(props.column.i18nLabel) }}
        </span>
      </template>

      <template
        slot="table-row"
        slot-scope="props"
      >
        <span
          v-if="props.column.field == 'days'"
          class="table-text"
        >
          {{ $t(props.row.days) }}
        </span>
        <div
          v-if="props.column.field == 'schedule'"
          class="table-text"
        >
          {{ props.row.schedule }}
        </div>
      </template>
    </vue-good-table>
  </section>
</template>
