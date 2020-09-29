// this is the base-config for resource-finder
// the point of this file is that it will move outside the project
// (so that settings we put in it can be used by other projects)
// and be pulled in with an axios call or something
// (we might not need to use axios with new vue async tools)
// if that is not needed, we can move this info to main.js

// turn off console logging in production
// const { hostname='' } = location;
// if (hostname !== 'localhost' && !hostname.match(/(\d+\.){3}\d+/)) {
//   console.log = console.info = console.debug = console.error = function () {};
// }

// Font Awesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import { faBuilding } from '@fortawesome/free-solid-svg-icons/faBuilding';
import { faUserMd } from '@fortawesome/free-solid-svg-icons/faUserMd';
import { faCircle } from '@fortawesome/free-solid-svg-icons/faCircle';
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons/faExternalLinkAlt";

library.add(faExclamationTriangle, faBuilding, faUserMd, faCircle, faExternalLinkAlt );

// import pinboard
import pinboard from '@phila/pinboard/src/main.js';

// data-sources
import votingSites from './data-sources/voting-sites';
// import compiled from './data-sources/compiled';
var BASE_CONFIG_URL = 'https://cdn.jsdelivr.net/gh/cityofphiladelphia/mapboard-default-base-config@6126861722cee9384694742363d1661e771493b9/config.js';

import expandCollapseContent from './components/ExpandCollapseContent.vue';
import customGreeting from './components/customGreeting.vue';
const customComps = {
  'expandCollapseContent': expandCollapseContent,
  'customGreeting': customGreeting,
};

pinboard({
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
  app: {
    logoAlt: 'City of Philadelphia',
    type: 'votingSites',
    title: 'Mail-in Voting Centers',
    subtitle: 'Find a vote-by-mail location near you',
  },
  comboSearch: {
    dropdown: [ 'address' ],
    searchDistance: 3,
  },
  locationInfo: {
    siteName: function(item) {
      // console.log(`  locationInfo:`, item );
      return item.site_name;
    },
  },
  customComps,
  baseConfig: BASE_CONFIG_URL,
  // holidays: {
  //   days: ['Monday'],
  // },
  // refine: {
  //   type: 'multipleFields',
  //   multipleFields: {
  //     'Housing Counseling Agency': function(item){
  //       console.log('running HCA function, item:', item);
  //       return item.attributes.HCA === 'Yes';
  //     },
  //     'Neighborhood Advisory Committee': function(item) { return item.attributes.NAC === 'Yes'; },
  //     'Neighborhood Energy Center': function(item) { return item.attributes.NEC === 'Yes'; },
  //   },
  // },
  markerType: 'circle-marker',
  circleMarkers:{
    color: '#0f4d90',
    weight: 0,
    radius: 8,
    mobileRadius: 12,
    size: 16,
    mobileSize: 20,
  },
  cyclomedia: {
    enabled: false,
    measurementAllowed: false,
    popoutAble: true,
    recordingsUrl: 'https://atlas.cyclomedia.com/Recordings/wfs',
    username: process.env.VUE_APP_CYCLOMEDIA_USERNAME,
    password: process.env.VUE_APP_CYCLOMEDIA_PASSWORD,
    apiKey: process.env.VUE_APP_CYCLOMEDIA_API_KEY,
  },
  dataSources: {
    votingSites,
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
  footer: {
    'HowToUse': false,
    'OtherLinks': {
      commissioners: {
        text: 'City Commissioners',
        link: 'https://www.philadelphiavotes.com/',
      },
      guide: {
        text: 'General election mail-in ballot guide',
        link: 'https://www.phila.gov/2020-09-08-general-election-mail-in-ballot-guide-for-philadelphia-voters/',
      },
    },
  },
  // infoCircles: {
  //   'symptomatic': {
  //     'html': '\
  //     <div class="full-div">For more information, see <a class="white-font-link" target="_blank" href="https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html">\
  //     Symptoms of coronavirus (CDC)</a>.</div>\
  //     ',
  //   },
  // },
  map: {
    // type: 'leaflet',
    type: 'mapbox',
    // tiles: 'hosted',
    containerClass: 'map-container',
    defaultBasemap: 'pwd',
    center: [ -75.146998, 40.001496 ],
    minZoom: 8,
    maxZoom: 25,
    shouldInitialize: true,

    zoom: 10,
    geocodeZoom: 12,
    imagery: {
      enabled: false,
    },
    basemaps: {
      pwd: {
        url: 'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap/MapServer',
        tiledLayers: [
          'cityBasemapLabels',
        ],
        type: 'featuremap',
        attribution: 'Parcels: Philadelphia Water',
      },
    },
    tiledLayers: {
      cityBasemapLabels: {
        url: 'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap_Labels/MapServer',
        zIndex: '3',
      },
    },
  },
  // mbStyle: 'mapbox://styles/ajrothwell/ck6gz6rmk04681ir1fdmagq5h',
  mbStyle: {
    version: 8,
    sources: {
      pwd: {
        tiles: [
          'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap/MapServer/tile/{z}/{y}/{x}',
        ],
        type: 'raster',
        tileSize: 256,
      },
    },
    layers: [
      {
        id: 'pwd',
        type: 'raster',
        source: 'pwd',
      },
    ],
  },
  basemapSources: {
    pwd: {
      source: {
        tiles: [
          'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap/MapServer/tile/{z}/{y}/{x}',
          // '//tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap_Labels/MapServer/tile/{z}/{y}/{x}'
        ],
        type: 'raster',
        tileSize: 256,
      },
      layer: {
        id: 'pwd',
        type: 'raster',
      },
    },
    imagery2019: {
      source: {
        tiles: [
          'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityImagery_2019_3in/MapServer/tile/{z}/{y}/{x}',
          // '//tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap_Labels/MapServer/tile/{z}/{y}/{x}'
        ],
        type: 'raster',
        tileSize: 256,
      },
      layer: {
        id: 'imagery2019',
        type: 'raster',
      },
    },
  },
  basemapLabelSources:{
    cityBasemapLabels: {
      source: {
        tiles: [ 'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityBasemap_Labels/MapServer/tile/{z}/{y}/{x}' ],
        type: 'raster',
        tileSize: 256,
      },
      layer: {
        id: 'cityBasemapLabels',
        type: 'raster',
      },
    },
    imageryBasemapLabels: {
      source: {
        tiles: [ 'https://tiles.arcgis.com/tiles/fLeGjb7u4uXqeF9q/arcgis/rest/services/CityImagery_Labels/MapServer/tile/{z}/{y}/{x}' ],
        type: 'raster',
        tileSize: 256,
      },
      layer: {
        id: 'imageryBasemapLabels',
        type: 'raster',
      },
    },
  },
  i18n: {
    header: 'i18nBanner',
    enabled: true,
    languages: [ 'en-US', 'es' ],
    refinePanel: false,
    expandCollapseTitle: false,
    footer: true,
    data: {
      locale: 'en-US',
      messages: {
        'en-US': {
          language: 'English',
          app: {
            title: 'Mail-in Voting Centers',
            subtitle: 'Find a vote-by-mail location near you.',
            // bannerAlert: 'Many sites are closed today. Check specific site details for more information.',
            noResults: 'No center was found within your search. Please try again.',
          },
          introPage: {
            introTitle: 'About this finder',
            p1: 'The Philadelphia City Commissioners have approved 7 satellite election offices located throughout Philadelphia, in addition to the two existing County Board of Election offices.',
            p2: 'In a single visit to these locations, voters can:​',

            ul1: {
              li1: 'Register to vote',
              li2: 'Request a mail-in ballot, and',
              li3: 'Receive their ballot, vote, and return it.'
            },
            //section1Title: 'Find out if you’re eligible',
            // ul2: {
            //   li1: 'Limit testing to people who meet certain criteria.',
            //   li2: 'Require an appointment.',
            //   li3: 'Require a referral from your doctor.',
            //   li4: 'Ask you to stay in your car (for drive-thru sites).',
            // },
            p3: 'Check a location’s specific details on the map. Then, call or visit the provider\'s website before going for a test.',
            callout1: {
              p1: '<b>Questions?</b> Please call your health care provider or see our FAQ about <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">getting tested in Philadelphia</a>.',
            },
          },
          beforeYouGo: 'Before you go',
          checkSite: 'Eligibility requirements and testing hours vary by site. Be sure to check site details to arrange for testing.',
          hoursVary: 'Hours and availability varies.',
          eligibility: 'Details',
          testingHours: 'Testing hours',
          daysOfOperation: 'Days of operation',
          Monday: 'Mon.',
          Tuesday: 'Tues.',
          Wednesday: 'Wed.',
          Thursday: 'Thurs.',
          Friday: 'Fri.',
          Saturday: 'Sat.',
          Sunday: 'Sun.',
          // access: 'Process',
          Yes: 'Yes',
          No: 'No',
          Unknown: 'Unknown',
          website: 'Website',
          process: {
            category: 'Process',
            dt: 'Drive-thru',
            wu: 'Walk-up',
            both: 'Drive-thru & walk-up',
          },
          symptomatic: {
            category: 'Must be symptomatic',
            null: '',
            symptom: 'Must be symptomatic',
            asymptom: 'Need not be symptomatic',
          },
          refReq: {
            category: 'Referral required',
            null: '',
            yes: 'Referral required',
            no: 'No referral required',
          },
          patientAge: {
            category: 'Patient age',
            null: '',
            year14: '+14 years old',
            year18: '+18 years old',
            pedCare: 'Offers pediatric testing',
          },
          panelText:{
            p1: 'If you are unable to get a COVID-19 test through your health care provider, this tool can help you find a test within the City of Philadelphia.',
          },
          restrictions: {
            lowInc: 'This site is intended for low-income families and individuals.',
            year14: 'Must be 14 years or older.',
            year18: 'Must be 18 years or older.',
            netPat: 'A patient must be in the provider’s network to receive a test at this site.',
            medPrior: 'Priority will be given to health care workers and first responders at this site.',
            homeless: 'This site is intended for people experiencing homelessness.',
            telemed: 'A telemedicine visit is required before testing at this site.',
            onlineQuest: 'An online questionnaire must be completed before visiting this site.',
          },
          notes:{
            schedApp: 'Appointments are required for testing.',
            refReq: 'Referral required.',
            schedAppRefReq: 'Appointment and referral required.',
            noApp: 'No appointment necessary for testing.',
            testAll: 'Testing provided even if symptoms are not present.',
          },
          facilityType: {
            drugstore: 'Drugstore',
            fieldSite: 'Field Site',
            clinic: 'Clinic',
            hospital: 'Hospital',
            other: 'Other',
            phmcHC: 'PHMC health center',
            urgentCare: 'Urgent Care',
            cityHC: 'City health center',
            homelessServices: 'Homeless services',
          },
        },
        'es': {
          language: 'Español',
          app: {
            title: 'Centros de votación por correo',
            subtitle: 'Encuentre un centro de votación por correo cerca de usted.',
            // bannerAlert: 'Muchos lugares están cerrados hoy. Consulte los detalles específicos del lugar para obtener más información.',
            noResults: 'No se encontró un lugar donde se realicen pruebas que coincida con su búsqueda.',
          },
          introPage: {
            introTitle: 'Acerca de este buscador',
            p1: 'Los Comisionados de la Ciudad de Filadelfia han aprobado 7 oficinas electorales satélite ubicadas en Filadelfia, además de las dos oficinas existentes de la Junta Electoral del Condado.',
            p2: 'En una sola visita a estos lugares, los votantes pueden:',
            ul1: {
              li1: 'Inscribirse para votar,',
              li2: 'Solicitar una boleta de votación por correo, y',
              li3: 'Recibir su boleta, votar y devolverla.',
            },
            section1Title: 'Saber si es elegible.',
            ul2: {
              li1: 'Restringir la prueba para personas que cumplan ciertos requisitos.',
              li2: 'Exigir una cita.',
              li3: 'Exigir una derivación médica.',
              li4: 'Pedirle que se quede en su automóvil (en lugares a los que se accede en automóvil).',
            },
            p3: 'Revise los detalles de una ubicación específica en el mapa. Luego, puede llamar o visitar el sitio web del proveedor antes de ir a realizarse la prueba.',
            callout1: {
              p1: '<b>¿Tiene preguntas?</b> Llame a su proveedor de atención médica o consulte nuestras Preguntas frecuentes sobre <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">cómo hacerse la prueba en Filadelfia</a>.',
            },
          },
          beforeYouGo: 'Antes de ir',
          checkSite: 'Revise los detalles específicos del lugar.',
          hoursVary: 'Los horarios y la disponibilidad pueden variar.',
          eligibility: 'Detalles',
          testingHours: 'Horario para las pruebas',
          daysOfOperation: 'Días de servicio',
          Monday: 'Lun.',
          Tuesday: 'Mar.',
          Wednesday: 'Mié.',
          Thursday: 'Jue.',
          Friday: 'Vie.',
          Saturday: 'Sáb.',
          Sunday: 'Dom.',
          // access: 'Acceso',
          Yes: 'Sí',
          No: 'No',
          Unknown: 'Desconocido',
          website: 'Sitio web',
          process: {
            category: 'Proceso',
            dt: 'En vehículo',
            wu: 'A pie',
            both: 'En vehículo y a pie',
          },
          symptomatic: {
            category: 'Debe ser sintomático',
            null: '',
            symptom: 'Debe ser sintomático',
            asymptom: 'No debe ser sintomático',
          },
          refReq: {
            category: 'Se necesita derivación',
            null: '',
            yes: 'Se necesita derivación',
            no: 'No se necesita derivación',
          },
          patientAge: {
            category: 'Edad del paciente',
            null: '',
            year14: 'Más de 14 años',
            year18: 'Más de 18 años',
            pedCare: 'Ofrece pruebas pediátricas',
          },
          panelText: {
            p1: 'Si no puede obtener una prueba de COVID-19 a través de su proveedor de atención médica, esta herramienta puede ayudarlo a encontrar una prueba gratuita en la ciudad de Filadelfia.',
          },
          restrictions: {
            lowInc: 'Este sitio está dirigido a las familias y las personas de bajos ingresos. ',
            year14: 'Debe tener 14 años de edad o más.',
            year18: 'Debe tener 18 años de edad o más.',
            netPat: 'El paciente debe pertenecer a la red del proveedor para recibir una prueba en este lugar.',
            medPrior: 'En este lugar, se dará prioridad a los trabajadores de salud y las personas en la primera línea de respuesta.',
            homeless: 'Este lugar está dirigido a las personas sin hogar.',
            telemed: 'Se requiere una consulta de telemedicina antes de realizar pruebas en este lugar.',
            onlineQuest: 'Se debe completar un cuestionario en línea antes de acudir a este sitio.',
          },
          notes: {
            schedApp: 'Se requiere cita para las pruebas.',
            refReq: 'Se necesita derivación.',
            schedAppRefReq: 'Se necesita cita y derivación.',
            noApp: 'No se requiere cita para las pruebas.',
            testAll: 'Se realiza la prueba aunque no tenga síntomas.',
          },
          facilityType: {
            drugstore: 'Farmacia',
            fieldSite: 'Sitio de campo',
            clinic: 'Clínica',
            hospital: 'Hospital',
            other: 'Otro',
            phmcHC: 'Centro de salud PHMC',
            urgentCare: 'Atención urgente',
            cityHC: 'Centro de salud de la ciudad',
            homelessServices: 'Servicios para personas sin hogar',
          },
        },
      },
    },
  },
});
