<template>
  <section class="services grid-x grid-padding-x">
    <div class="cell">
      <vertical-table-light
        class="print-padding"
        :slots="mainVerticalTableSlots"
        :options="mainVerticalTableOptions"
      >
        <template
          v-slot:component1
          class="table-slot"
        >
          <p
            v-for="field in arrayFields"
            :key="field"
            class="no-margin"
            v-html="$t(field)"
          >
            <!-- {{ field }} -->
          </p>
        </template>

        <template
          v-slot:component2
          class="table-slot"
        >
          <vertical-table-light
            class="print-padding"
            :slots="component1VerticalTableSlots"
            :options="component1VerticalTableOptions"
          />
        </template>
      </vertical-table-light>
    </div>
  </section>
</template>

<script>

import SharedFunctions from '@phila/pinboard/src/components/mixins/SharedFunctions.vue';

export default {
  name: 'MailInBallotDropOffCard',
  components: {
    VerticalTableLight: () => import(/* webpackChunkName: "pvc_VerticalTable3CellsLight" */'@phila/vue-comps/src/components/VerticalTableLight.vue'),
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
    mainVerticalTableSlots() {
      let slots = {
        id: 'mainTable',
        fields: [
          {
            label: 'details.details',
            labelType: 'i18n',
            valueType: 'component1',
          },
        ],
      };
      // if (this.days.length > 0) {
      if (this.$props.item.open_24_hours === "TRUE") {
        let newField = {
          label: 'siteHours',
          labelType: 'i18n',
          value: 'details.open24Hours',
          valueType: 'i18n',
        };
        slots.fields.push(newField);
      } else if (this.days.length > 0) {
        let newField = {
          label: 'siteHours',
          labelType: 'i18n',
          valueType: 'component2',
        };
        slots.fields.push(newField);
      }

      return slots;
    },
    mainVerticalTableOptions() {
      return {
        styles: {
          th: {
            'vertical-align': 'top',
            'font-size': '14px',
            'min-width': '40px !important',
            'max-width': '50px !important',
            'width': '10% !important',
          },
          td: {
            'font-size': '14px !important',
          },
        },
      };
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
            // value = 'In-person registration and mail-in voting, Mail-in ballot drop-off.';
          }
        }

        if (field === 'site_type') {
          if (item[field] === 'Election office') {
            values.push('details.ballotDropoff');
            // value = 'In-person registration and mail-in voting, Mail-in ballot drop-off.';
          }
        }

        if (field === 'site_type') {
          if (item[field] === 'Official mail-in ballot return') {
            values.push('details.ballotDropoff');
            // value = 'In-person registration and mail-in voting, Mail-in ballot drop-off.';
          }
        }

        if (field === 'multilingual_support') {
          if (item[field] === 'TRUE') {
            values.push('details.interpretationAvailable');
            // value = 'Telephonic interpretation services available.';
          }
        }

        if (field === 'site_accessible') {
          if (item[field] === 'TRUE') {
            values.push('details.wheelchair');
            // value = 'Wheelchair accessible.';
          }
        }

        // console.log('arrayFields, values:', values)
        for (let value of values) {
          finalArray.push(value);
        }
      }
      return finalArray;
    },

    days() {
      let allDays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
      let theFields = [];
      // let days = {};

      let item = this.item;
      // let holidays = [];
      // let exceptions = [];
      // if (this.$config.holidays && this.$config.holidays.days) {
      //   holidays = this.$config.holidays.days;
      // }
      // if (this.$config.holidays && this.$config.holidays.exceptions) {
      //   exceptions = this.$config.holidays.exceptions;
      // }
      // let siteName = this.getSiteName(this.item);

      for (let [ index, day ] of allDays.entries()) {
        // let normallyOpen = item[day] != null;
        // let holidayToday = holidays.includes(day);
        // let yesterday = allDays[index-1];
        // let normallyOpenYesterday = item[yesterday] != null;
        // let holidayYesterday = holidays.includes(yesterday);
        // let siteIsException = exceptions.includes(this.getSiteName(this.item));

        let fridayWeekendHours = item['friday_weekend_hours'];
        let isWeekend;
        if (fridayWeekendHours === "TRUE") {
          isWeekend = [ 'Sunday', 'Friday', 'Saturday' ].includes(day);
        } else {
          isWeekend = [ 'Sunday', 'Saturday' ].includes(day);
        }

        // console.log('day:', day, 'fridayWeekendHours:', fridayWeekendHours, 'isWeekend:', isWeekend)
        // if (this.item[day] != null){
        // if ((normallyOpen || (!siteIsException && holidayYesterday && normallyOpenYesterday)) && (!holidayToday || siteIsException)) {

        let hours;
        if (isWeekend && item['weekend_start']) {
          hours = item['weekend_start'] + ' - ' + item['weekend_end'];
        } else if (!isWeekend) {
          hours = item['weekday_start'] + ' - ' + item['weekday_end'];
        }
        // if ((normallyOpen && !holidayToday) || (normallyOpen && siteIsException)) {
        //   hours = item[day];
        // } else if (!normallyOpen && holidayYesterday) {
        //   hours = item[yesterday];
        // }

        let dayObject = {
          label: day,
          labelType: 'i18n',
          value: hours,
          // valueType: 'i18n',
        };
        if (hours) {
          theFields.push(dayObject);
        }
      }
      // }
      return theFields;
    },
    component1VerticalTableSlots() {
      return {
        id: 'compTable1',
        fields: this.days,
      };
    },
    component1VerticalTableOptions() {
      return {
        styles: {
          th: {
            'font-size': '14px',
            'min-width': '45px !important',
            'max-width': '50px !important',
            'width': '25% !important',
          },
          td: {
            'font-size': '14px !important',
          },
        },
      };
    },
  },
  methods: {
    parseAddress(address) {
      const formattedAddress = address.replace(/(Phila.+)/g, city => `<div>${city}</div>`).replace(/^\d+\s[A-z]+\s[A-z]+/g, lineOne => `<div>${lineOne}</div>`).replace(/,/, '');
      return formattedAddress;
    },
  },
};

</script>

<style lang="scss">

.no-margin {
  margin: 0px;
}

.td-style {
  font-size: 14px !important;
}

.td-textbox {
  padding-left: 2rem;
}

.location-item {
  position: relative;
  border-bottom: 1px solid black;
  height:100%;

  &:hover::after {
    color: white;
  }

  .temp-close-section {
    width: 100%;
  }

  .card-exclamation-holder {
    padding: 20px;
    background-color: #CC3000;
    text-align: center;
  }

  .fa-icon-class {
    color: white;
    text-align: center;
  }

  .card-exclamation-details {
    padding: 10px;
    background-color: #F5D6CC;
  }

  .location-title {
    cursor: pointer;
    padding: 1rem;
    margin-bottom: 0;
    &:hover{
      background: #2176d2;
      color: white;
    }
  }

  &::after{
    position: absolute;
    right:1rem;
    top: 0;
    content: '+';
    font-weight: 900;
    font-size:1.5rem;
    z-index: 100;
    color: color(dark-ben-franklin)
  }
  &.open{
    h2{
      color:white;
      background-color: color(ben-franklin-blue);
      font-weight: 900;
    }
    &::after{
      content: '-';
      color:white;
    }
  }
  .location-content{
    overflow: hidden;
    height:0;

    &.location-open{
      padding: 1rem;
      height: 100%;
      overflow: initial;
    }
  }
}
</style>
