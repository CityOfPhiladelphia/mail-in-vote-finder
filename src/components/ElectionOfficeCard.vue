<script setup>

const props = defineProps({
  item: {
    type: Object,
    default: function(){
      return {};
    },
  },
});

// computed

// const i18nLocale = computed(() => {
//   return this.$i18n.locale;
// });

const hoursTableOrLine = computed(() => {
  let value;
  if (props.item.properties.open_24_hours === "TRUE") {
    value = 'line';
  } else {
    value = 'table';
  }
  return value;
});

const daysKey = computed(() => {
  return {
    'mon': 'Monday',
    'tues': 'Tuesday',
    'wed': 'Wednesday',
    'thurs': 'Thursday',
    'fri': 'Friday',
    'sat': 'Saturday',
    'sun': 'Sunday',
  };
});

const hours = computed(() => {
  let columns = [
    {
      label: 'Days',
      i18nLabel: 'daysOfOperation',
      field: 'days',
      thClass: 'no-header',
    },
    {
      label: 'Schedule',
      i18nLabel: 'schedule',
      field: 'schedule',
      thClass: 'no-header',
    },
  ];
  let daysArray = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ];
  let rows = [];
  for (let [ index, day ] of daysArray.entries()) {
    console.log('day:', day, 'index:', index);

    let fridayWeekendHours = props.item.properties['friday_weekend_hours'];
    let isWeekend;
    if (fridayWeekendHours === "TRUE") {
      isWeekend = [ 'Sunday', 'Friday', 'Saturday' ].includes(day);
    } else {
      isWeekend = [ 'Sunday', 'Saturday' ].includes(day);
    }

    let hours;
    if (isWeekend && props.item.properties['weekend_start']) {
      hours = props.item.properties['weekend_start'] + ' - ' + props.item.properties['weekend_end'];
    } else if (isWeekend) {
      hours = this.$i18n.messages[this.i18nLocale].closed;
      // hours = "Closed";
    } else if (!isWeekend) {
      hours = props.item.properties['weekday_start'] + ' - ' + props.item.properties['weekday_end'];
    }
    let scheduleOrClosed = hours;

    rows.push({
      id: index + 1,
      days: day,
      schedule: scheduleOrClosed,
    });
  }
  return { columns, rows };
});

const arrayFields = computed(() => {
  let allFields = [ 'site_type', 'multilingual_support', 'site_accessible' ];
  let finalArray = [];
  let item = props.item;

  for (let field of allFields) {
    let values = [];

    if (field === 'site_type') {
      if (item.properties[field] === 'Election office') {
        values.push('details.ballotRep');
      }
    }
    if (field === 'site_type') {
      if (item.properties[field] === 'Election office') {
        values.push('details.ballotDropoff');
      }
    }
    if (field === 'multilingual_support') {
      if (item.properties[field] === 'TRUE') {
        values.push('details.interpretationAvailable');
      }
    }

    if (field === 'site_accessible') {
      if (item.properties[field] === 'TRUE') {
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
    />

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
      style-class="table"
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

<style lang="scss">

.services {
  width: 100%;
}

</style>
