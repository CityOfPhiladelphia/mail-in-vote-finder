<template>
  <section class="services">
    <h3>{{ $t('details.details') }}</h3>

    <p
      v-for="field in arrayFields"
      :key="field"
      class="no-margin"
      v-html="$t(field)"
    >
      <!-- {{ field }} -->
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

<script>

import SharedFunctions from '@phila/pinboard/src/components/mixins/SharedFunctions.vue';
import { VueGoodTable } from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css';

export default {
  name: 'MailInBallotDropOffBoxCard',
  components: {
    VueGoodTable,
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
    hoursTableOrLine() {
      let value;
      if (this.$props.item.open_24_hours === "TRUE") {
        value = 'line';
      } else {
        value = 'table';
      }
      return value;
    },
    daysKey() {
      return {
        'mon': 'Monday',
        'tues': 'Tuesday',
        'wed': 'Wednesday',
        'thurs': 'Thursday',
        'fri': 'Friday',
        'sat': 'Saturday',
        'sun': 'Sunday',
      };
    },
    hours() {
      let columns = [
        {
          label: 'Days',
          i18nLabel: 'daysOfTheWeek',
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
      let days = [ 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat', 'sun' ];
      let rows = [];
      for (let [ index, day ] of days.entries()) {
        // console.log('day:', day, 'index:', index);
        // let scheduleOrClosed = this.parseTimeRange(day, this.item.attributes['hours_'+day+'_start'], this.item.attributes['hours_'+day+'_end']);
        let scheduleOrClosed = 'wawa';
        rows.push({
          id: index + 1,
          days: this.daysKey[day],
          schedule: scheduleOrClosed,
        });
      }
      return { columns, rows };
    },

    arrayFields() {
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
    },

    // days() {
    //   let allDays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
    //   let theFields = [];
    //   let item = this.item;
    //
    //   for (let [ index, day ] of allDays.entries()) {
    //     let fridayWeekendHours = item['friday_weekend_hours'];
    //     let isWeekend;
    //     if (fridayWeekendHours === "TRUE") {
    //       isWeekend = [ 'Sunday', 'Friday', 'Saturday' ].includes(day);
    //     } else {
    //       isWeekend = [ 'Sunday', 'Saturday' ].includes(day);
    //     }
    //
    //     let hours;
    //     if (isWeekend && item['weekend_start']) {
    //       hours = item['weekend_start'] + ' - ' + item['weekend_end'];
    //     } else if (!isWeekend) {
    //       hours = item['weekday_start'] + ' - ' + item['weekday_end'];
    //     }
    //
    //     let dayObject = {
    //       label: day,
    //       labelType: 'i18n',
    //       value: hours,
    //     };
    //     if (hours) {
    //       theFields.push(dayObject);
    //     }
    //   }
    //   return theFields;
    // },
  },
};

</script>
