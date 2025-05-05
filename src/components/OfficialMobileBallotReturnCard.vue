<template>
  <section class="services">
    <h3>{{ $t("details.details") }}</h3>

    <p
      v-for="field in arrayFields"
      :key="field"
      class="no-margin"
      v-html="$t(field)"
    >
      <!-- {{ field }} -->
    </p>

    <h3>{{ $t("siteHours") }}</h3>

    <p v-if="hoursTableOrLine === 'line'">
      {{ $t("details.electionDayHours") }}
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
          v-if="props.column.label == 'Days'"
          class="table-header-text"
        >
          {{ $t(props.column.i18nLabel) }}
        </span>
        <span
          v-if="props.column.label == 'Schedule'"
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

    <!-- <div class="cell"> -->
    <!-- <vertical-table-light
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
            v-html="$t(field)"
          >
          </p>
        </template>

        <template
          v-slot:component
          class="table-slot"
        >
          <vertical-table-light
            class="print-padding"
            :slots="component1VerticalTableSlots"
            :options="component1VerticalTableOptions"
          />
        </template>
        <template
          v-slot:component2
          class="table-slot"
        >
          <vertical-table-light
            class="print-padding uppercase"
            :slots="component2VerticalTableSlots"
            :options="component1VerticalTableOptions"
          />
        </template>
      </vertical-table-light> -->
    <!-- </div> -->
  </section>
</template>

<script>
import SharedFunctions from "@phila/pinboard/src/components/mixins/SharedFunctions.vue";
import { VueGoodTable } from "vue-good-table";
import "vue-good-table/dist/vue-good-table.css";

export default {
  name: "OfficalMobileBallotReturnCard",
  components: {
    VueGoodTable,
  },
  mixins: [ SharedFunctions ],
  props: {
    item: {
      type: Object,
      default: function() {
        return {};
      },
    },
  },
  computed: {
    i18nLocale() {
      return this.$i18n.locale;
    },
    hoursTableOrLine() {
      let value;
      if (this.$props.item.open_24_hours === "TRUE") {
        value = "line";
      } else {
        value = "table";
      }
      return value;
    },
    daysKey() {
      return {
        monday: "Monday",
        tuesday: "Tuesday",
        wednesday: "Wednesday",
        thursday: "Thursday",
        friday: "Friday",
        saturday: "Saturday",
        sunday: "Sunday",
      };
    },
    hours() {
      let columns = [
        {
          label: "Days",
          i18nLabel: "daysOfOperation",
          field: "days",
          thClass: "th-black-class",
        },
        {
          label: "Schedule",
          i18nLabel: "schedule",
          field: "schedule",
          thClass: "th-black-class",
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
    },

    arrayFields() {
      let allFields = [ "site_type", "multilingual_support", "site_accessible" ];
      let finalArray = [];
      let item = this.item;

      for (let field of allFields) {
        let values = [];

        if (field === "site_type") {
          if (item[field] === "Election office") {
            values.push("details.inPerson");
            // value = 'In-person registration and mail-in voting, Mail-in ballot drop-off.';
          }
        }

        if (field === "site_type") {
          if (item[field] === "Election office") {
            values.push("details.ballotDropoff");
            // value = 'In-person registration and mail-in voting, Mail-in ballot drop-off.';
          }
        }

        if (field === "site_type") {
          if (item[field] === "Official mobile mail-in ballot return") {
            values.push("details.ballotDropoffMobile");
            values.push("details.ballotDropoffMobileStandAlone");
            // value = 'In-person registration and mail-in voting, Mail-in ballot drop-off.';
          }
        }

        if (field === "multilingual_support") {
          if (item[field] === "TRUE") {
            values.push("details.interpretationAvailable");
            // value = 'Telephonic interpretation services available.';
          }
        }

        if (field === "site_accessible") {
          if (item[field] === "TRUE") {
            values.push("details.wheelchair");
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

    // days() {
    //   let allDays = [ 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday' ];
    //   let theFields = [];
    //   // let days = {};
    //
    //   let item = this.item;
    //   let holidays = [];
    //   let exceptions = [];
    //   if (this.$config.holidays && this.$config.holidays.days) {
    //     holidays = this.$config.holidays.days;
    //   }
    //   if (this.$config.holidays && this.$config.holidays.exceptions) {
    //     exceptions = this.$config.holidays.exceptions;
    //   }
    //
    //   for (let [ index, day ] of allDays.entries()) {
    //     let normallyOpen = item[day+"_hours"] != null;
    //     let holidayToday = holidays.includes(day);
    //     let yesterday = allDays[index-1];
    //     let normallyOpenYesterday = item[yesterday] != null;
    //     let holidayYesterday = holidays.includes(yesterday);
    //     let siteIsException = false;
    //     // let siteIsException = exceptions.includes(this.getSiteName(this.item));
    //
    //     // if (this.item.attributes[day] != null){
    //     if ((normallyOpen || (!siteIsException && holidayYesterday && normallyOpenYesterday)) && (!holidayToday || siteIsException)) {
    //
    //       let hours;
    //       if ((normallyOpen && !holidayToday) || (normallyOpen && siteIsException)) {
    //         hours = item[day+"_hours"];
    //       } else if (!normallyOpen && holidayYesterday) {
    //         hours = item[yesterday];
    //       }
    //
    //       let dayObject = {
    //         label: day,
    //         labelType: 'i18n',
    //         value: hours,
    //         // valueType: 'i18n',
    //       };
    //       theFields.push(dayObject);
    //     }
    //   }
    //   // }
    //   return theFields;
    // },
    // component2VerticalTableSlots() {
    //   return {
    //     id: 'compTable1',
    //     fields: this.days,
    //   };
    // },
    // component1VerticalTableOptions() {
    //   return {
    //     styles: {
    //       th: {
    //         'font-size': '14px',
    //         'min-width': '45px !important',
    //         'max-width': '50px !important',
    //         'width': '25% !important',
    //       },
    //       td: {
    //         'font-size': '14px !important',
    //       },
    //     },
    //   };
    // },
  },
  // methods: {
  //   parseAddress(address) {
  //     const formattedAddress = address.replace(/(Phila.+)/g, city => `<div>${city}</div>`).replace(/^\d+\s[A-z]+\s[A-z]+/g, lineOne => `<div>${lineOne}</div>`).replace(/,/, '');
  //     return formattedAddress;
  //   },
  // },
};
</script>

<style lang="scss">
.uppercase {
  text-transform: capitalize;
}
</style>
