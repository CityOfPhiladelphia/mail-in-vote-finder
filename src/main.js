// this is the base-config for resource-finder
// the point of this file is that it will move outside the project
// (so that settings we put in it can be used by other projects)
// and be pulled in with an axios call or something
// (we might not need to use axios with new vue async tools)
// if that is not needed, we can move this info to main.js

import isMac from './util/is-mac';
if (isMac()) {
  import('./assets/mac-style.scss')
}

// Font Awesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import { faBuilding } from '@fortawesome/free-solid-svg-icons/faBuilding';
import { faUserMd } from '@fortawesome/free-solid-svg-icons/faUserMd';
import { faCircle } from '@fortawesome/free-solid-svg-icons/faCircle';
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons/faExternalLinkAlt";
import { faAngleDown as farAngleDown } from '@fortawesome/pro-regular-svg-icons/faAngleDown';
import { faAngleUp as farAngleUp } from '@fortawesome/pro-regular-svg-icons/faAngleUp';
import { faTimes as farTimes } from '@fortawesome/pro-regular-svg-icons/faTimes';
import { faPlus as farPlus } from '@fortawesome/pro-regular-svg-icons/faPlus';
import { faMinus as farMinus } from '@fortawesome/pro-regular-svg-icons/faMinus';

library.add(faExclamationTriangle, faBuilding, faUserMd, faCircle, faExternalLinkAlt,farAngleUp, farAngleDown, farTimes, farPlus, farMinus );

// use these if running off unlinked package
import pinboard from '@phila/pinboard';
import '../node_modules/@phila/pinboard/dist/style.css';
// OR
// use this if running off linked package
// import pinboard from '../node_modules/@phila/pinboard/src/main.js';

import legendControl from './general/legendControl';

// data-sources
import nextElection from './data-sources/next-election';
import votingSites from './data-sources/voting-sites';
// import votingSites from './data-sources/voting-sites-dev';

import expandCollapseContent from './components/ExpandCollapseContent.vue';
import customGreeting from './components/customGreeting.vue';
const customComps = markRaw({
  'expandCollapseContent': expandCollapseContent,
  'customGreeting': customGreeting,
});

import i18n from './i18n/i18n';
console.log('main.js i18n:', i18n);

let $config = {
  publicPath: import.meta.env.VITE_PUBLICPATH,
  i18n: i18n.i18n,
  app: {
    // title: 'Mail-in Voting Centers',
    // subtitle: 'Find a vote-by-mail location near you',
    logoAlt: 'City of Philadelphia',
    type: 'votingSites',
  },
  gtag: {
    category: 'rf-voting',
  },
  printView: false,
  allowPrint: true,
  showBuffers: true,
  resetDataOnGeocode: true,
  retractableRefine: false,
  dropdownRefine: false,
  searchBar: {
    searchTypes: [
      'address',
    ],
    searchDistance: 3,
  },
  fieldsUsed: {
    section: 'site_type',
  },
  locationInfo: {
    siteNameField: 'site_name',
    siteName: function(item) { return item.properties.site_name },
  },
  customComps,
  refine: {
    type: 'categoryField_value',
    value: function(item) {
      // console.log(item.site_type);
      return item.properties.site_type;
    },
    showLabels: true,
  },
  sections: {
    'Election office': {
      title: 'Election offices',
      titleSingular: 'Election office',
      color: '#a86518',
    },
    'Official mobile mail-in ballot return': {
      title: 'Official mobile mail-in ballot returns',
      titleSingular: 'Official mobile mail-in ballot return',
      color: '#721817',
    },
    'Official mail-in ballot dropbox': {
      title: 'Official mail-in ballot dropboxes',
      titleSingular: 'Official mail-in ballot dropbox',
      color: '#4F6D0A',
    },
    'Mail-in ballot dropbox (temporarily closed)': {
      title: 'Mail-in ballot dropboxes (temporarily closed)',
      titleSingular: 'Mail-in ballot dropbox (temporarily closed)',
      color: '#a1a1a1',
    },

  },
  legendControl,
  dataSources: {
    nextElection,
    votingSites,
  },
  mapLayer: {
    id: 'resources',
    source: 'resources',
    type: 'circle',
    paint: {
      'circle-radius': 7,
      'circle-color': [
        'match',
        ['get', 'site_type'],
        'Election office',
        '#a86518',
        'Official mobile mail-in ballot return',
        '#721817',
        'Official mail-in ballot dropbox',
        '#4F6D0A',
        'Mail-in ballot dropbox (temporarily closed)',
        '#a1a1a1',
        /* other */ '#000000'
      ],
      'circle-stroke-width': 1,
      'circle-stroke-color': 'white',
    },
  },
  router: {
    enabled: false,
  },
  projection: '4326',
  geocoder: {
    url(input) {
      const inputEncoded = encodeURIComponent(input);
      return `//api.phila.gov/finder/v1/search/${inputEncoded}`;
    },
    params: {
      include_units: true,
    },
  },
  footer: [
    {
      type: "native",
      href: "https://www.phila.gov/",
      attrs: {
        target: "_blank",
      },
      text: "app.cityOfPhiladelphia",
    },
    {
      type: "native",
      href: "https://www.phila.gov/voting/",
      text: "app.about",
    },
    {
      type: "native",
      href: "https://www.phila.gov/feedback/",
      attrs: {
        target: "_blank",
      },
      text: "app.feedback",
    },
  ],
  alerts: {
    // modal: {
    //   enabled: true,
    //   header: 'Access Centers ',
    //   body: '<p>Access Centers are free, but you must check eligibility and register your child in advance. For full program details, visit the <a href="https://www.phila.gov/access-centers">Access Centers webpage</a>.',
    // },
    // header: {
    //   type: 'alertBanner',
    //   // enabled: function(state) {
    //   //   return state.alertResponse === 'alertHours';
    //   // },
    //   // content: '<b>Until further notice:</b> Please call ahead or check hours of operation while business restrictions are still in effect.',
    // },
    alertChecks: [
      // {
      //   type: 'alertHours',
      //   condition: [
      //     {
      //       'day': 1,
      //       'startTime': '1:00',
      //       'endTime': '23:59',
      //     },
      //     {
      //       'day': 2,
      //       'startTime': '1:00',
      //       'endTime': '23:59',
      //     },
      //   ],
      // },
    ],
  },
  // hiddenRefine: {
  //   Type: function(item) {
  //     return item.site_type !== 'Official mobile mail-in ballot return';
  //   },
  // },
};

console.log('$config:', $config);

pinboard($config);
export default $config;
