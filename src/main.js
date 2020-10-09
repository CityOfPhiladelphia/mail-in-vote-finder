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
import votingSites from './data-sources/voting-sites-dev';
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
  gtag: {
    category: 'rf-voting',
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
  refine: {
    type: 'categoryField_value',
    value: function(item) {
      return item.site_type;
    },
    showLabels: true,
  },
  sections: {
    'Election office': {
      title: 'Election Offices',
      titleSingular: 'Election Office',
      color: '#0F4D90',
    },
    'Official ballot return': {
      title: 'Official Ballot Returns',
      titleSingular: 'Official Ballot Return',
      color: '#721817',
    },

  },
  baseConfig: BASE_CONFIG_URL,
  markerType: 'circle-marker',
  circleMarkers:{
    circleColors: {
      'Election office': '#0f4d90',
      'Official ballot return': '#721817',
    },
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
        text: 'cityCommissioners',
        // text: 'City Commissioners',
        link: 'https://www.philadelphiavotes.com/',
      },
      guide: {
        text: 'ballotGuide',
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
    // languages: [ 'en-US', 'es' ],
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
            p1_1: 'The Philadelphia City Commissioners have approved ',
            p1_2: ' satellite election offices located throughout Philadelphia, in addition to the two existing County Board of Election offices.',
            p2: 'In a single visit to these locations, voters can:​',
            ul1: {
              li1: 'Register to vote,',
              li2: 'Request a mail-in ballot, and',
              li3: 'Receive their ballot, vote, and return it.',
            },
            p3: 'Voters can also drop off their completed ballots at an election office.',
            p4_b: 'Note: ',
            p4: 'Voters must wait until October 6 to request a replacement ballot at the offices. This will prevent duplicating ballots already in the mail.',
            relatedContent: 'Related content',
            link1: 'Check your voter registration status',
            link2: 'Check the status of your mail-in ballot',
            link3: 'See our mail-in ballot guide for Philadelphia Voters',

          },
          cityOfPhiladelphia: 'City of Philadelphia',
          cityCommissioners: 'City Commissioners',
          ballotGuide: 'General election mail-in ballot guide',
          siteHours: 'Site hours',
          details: {
            details: 'Details',
            inPerson: 'In-person registration and mail-in voting',
            ballotDropoff: 'Mail-in ballot drop-off',
            ballotDropoffLong: 'The Board of Elections should be notified immediately in the event the receptacle is full, not functioning, or is damaged in any fashion, by calling 215-686-3469 or by emailing <a href="mailto:vote@phila.gov>vote@phila.gov</a>.',
            interpretationAvailable: 'Telephonic interpretation services available',
            wheelchair: 'Wheelchair accessible',
            open24Hours: 'Open 24 hours',
          },
          'Election office': 'Election Office',
          'Official ballot return': 'Official Ballot Returns',
          sections: {
            'Election office': {
              header: 'Election Office',
            },
            'Official ballot return': {
              header: 'Official Ballot Returns',
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
          Yes: 'Yes',
          No: 'No',
          Unknown: 'Unknown',
          website: 'Website',
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
            p1_1: 'Los Comisionados de la Ciudad de Filadelfia han aprobado ',
            p1_2: ' oficinas electorales satélite ubicadas en Filadelfia, además de las dos oficinas existentes de la Junta Electoral del Condado.',
            p2: 'En una sola visita a estos lugares, los votantes pueden:',
            ul1: {
              li1: 'Inscribirse para votar,',
              li2: 'Solicitar una boleta de votación por correo, y',
              li3: 'Recibir su boleta, votar y devolverla.',
            },
            p3: 'Los votantes también pueden entregar sus boletas completadas en una oficina electoral.',
            p4_b: 'Nota: ',
            p4: 'Los votantes deben esperar hasta el 6 de octubre para solicitar una boleta de reemplazo en las oficinas. Esto evitará que se dupliquen las boletas que ya están en el correo.',
            relatedContent: 'Contenido relacionado',
            link1: 'Verifique el estatus de la inscripción de votante',
            link2: 'Verifique el estatus de su boleta por correo',
            link3: 'Consulte nuestra guía de votación por correo para los votantes de Filadelfia',

          },
          cityOfPhiladelphia: 'La Ciudad de Filadelfia',
          cityCommissioners: 'Los Comisionados de la Ciudad de Filadelfia',
          ballotGuide: 'Guía de votación por correo para la elección general',
          siteHours: 'Horas del centro',
          details: {
            details: 'Detalles',
            inPerson: 'Inscripción para votar y votar por correo',
            ballotDropoff: 'Entrega de boletas por correo',
            ballotDropoffLong: 'En caso de que el buzón esté lleno, no funcione o esté dañado de alguna manera, se debe notificar inmediatamente a la Junta Electoral, llamando al 215-686-3469 o enviando un correo electrónico a <a href="mailto:vote@phila.gov>vote@phila.gov</a>.',
            interpretationAvailable: 'Servicios de intérprete disponibles',
            wheelchair: 'Local accesible en silla de ruedas',
            open24Hours: 'Abierto las 24 horas',
          },
          'Election office': 'Oficina Electoral',
          'Official ballot return': 'Sitio oficial para devolver boletas',
          sections: {
            'Election office': {
              header: 'Oficina Electoral',
            },
            'Official ballot return': {
              header: 'Sitio oficial para devolver boletas',
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
          Yes: 'Sí',
          No: 'No',
          Unknown: 'Desconocido',
          website: 'Sitio web',
        },

        'ch': {
          language: '中文',
          app: {
            title: '邮寄投票中心',
            subtitle: '查找您附近的邮寄投票地点',
            // bannerAlert: '今天很多地点均关闭。有关更多信息，请查看具体地点详细信息。',
            noResults: '在您的搜索范围内未找到检测地点。请致电您的医疗保健提供者或访问公共卫生部 (Department of Public Health) 的 COVID-19 网站，了解关于 <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">在费城进行检测</a>的信息.',
          },
          introPage: {
            introTitle: '关于此搜索工具',
            p1_1: '除现有的两处县选举委员会办公室外，费城市政专员已批准位于费城市内的',
            p1_2: ' 处卫星选举办公室。',
            p2: '仅到访这些地点一次，选民便可以：',
            ul1: {
              li1: '登记投票、',
              li2: '申请邮寄选票、',
              li3: '领取选票、投票并返回选票。',
            },
            p3: '选民也可以在选举办公室提交其完成的选票。',
            p4_b: '注意： ',
            p4: '选民必须等到 10 月 6 日才能在办公室申请替换选票。这将防止邮件中的选票重复。',
            relatedContent: '相关内容',
            link1: '查看您的选民登记状态',
            link2: '查看您的邮寄选票状态',
            link3: '参阅我们的费城选民邮寄选票指南',

          },
          cityOfPhiladelphia: '费城市',
          cityCommissioners: '市政专员',
          ballotGuide: '大选邮寄选票指南',
          siteHours: '站点营业时间',
          details: {
            details: '详情',
            inPerson: '亲自登记和邮寄投票',
            ballotDropoff: '邮寄选票提交',
            interpretationAvailable: '提供电话口译服务',
            wheelchair: '轮椅无障碍服务',
          },

          beforeYouGo: '在您出发前请先了解以下信息',
          checkSite: '查看具体地点详情。',
          hoursVary: '时间和可用性各不相同。',
          eligibility: '详情',
          testingHours: '检测时间',
          daysOfOperation: '营业时间',
          Monday: '周一',
          Tuesday: '周二',
          Wednesday: '周三',
          Thursday: '周四',
          Friday: '周五',
          Saturday: '周六',
          Sunday: '周日',
          Yes: '是',
          No: '否',
          Unknown: '未知',
          website: '网站',
        },
        'vi': {
          language: 'Tiếng Việt',
          app: {
            title: 'Trung Tâm Bỏ Phiếu Qua Đường Bưu Điện',
            subtitle: 'Tìm một địa điểm bỏ phiếu qua đường bưu điện gần quý vị',
            // bannerAlert: 'Hôm nay, nhiều địa điểm đóng cửa. Hãy kiểm tra các chi tiết về địa điểm cụ thể để biết thêm thông tin.',
            noResults: 'Không tìm thấy cơ sở xét nghiệm trong phạm vi tìm kiếm của quý vị. Vui lòng gọi điện cho nhà cung cấp dịch vụ chăm sóc sức khỏe của quý vị hoặc truy cập trang web về COVID-19 của Sở Y Tế Công Cộng để biết thông tin về a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">cách nhận xét nghiệm tại Philadelphia</a>.',
          },
          introPage: {
            introTitle: 'Giới thiệu công cụ tìm kiếm này',
            p1_1: 'Các Ủy Viên Thành Phố Philadelphia đã phê duyệt ',
            p1_2: 'văn phòng bầu cử chi nhánh trên khắp Philadelphia, ngoài hai văn phòng hiện có của Hội Đồng Bầu Cử Quận.',
            p2: 'Với mỗi lần đến những địa điểm đó, cử tri có thể:',
            ul1: {
              li1: 'Đăng ký bầu cử,',
              li2: 'Yêu cầu lá phiếu bầu qua đường bưu điện, và',
              li3: 'Nhận lá phiếu bầu, điền phiếu và gửi lại lá phiếu bầu.',
            },
            p3: 'Cử tri cũng có thể bỏ lá phiếu đã điền của họ tại văn phòng bầu cử.',
            p4_b: 'Lưu ý: ',
            p4: 'Cử tri phải đợi đến ngày 6 tháng 10 để có thể yêu cầu lá phiếu bầu thay thế tại những văn phòng này. Việc này nhằm đảm bảo ngăn các lá phiếu bầu trùng lặp đã được gửi qua đường bưu điện.',
            relatedContent: 'Nội dung liên quan',
            link1: 'Kiểm tra trạng thái đăng ký cử tri của quý vị',
            link2: 'Kiểm tra trạng thái của lá phiếu bầu qua đường bưu điện của quý vị',
            link3: 'Xem hướng dẫn về lá phiếu bầu qua đường bưu điện dành cho Cử Tri Philadelphia',

          },
          cityOfPhiladelphia: 'Thành Phố Philadelphia',
          cityCommissioners: 'Các Ủy Viên Thành Phố',
          ballotGuide: 'Hướng dẫn bỏ phiếu qua đường bưu điện trong cuộc tổng tuyển cử',
          siteHours: 'Giờ mở cửa của cơ sở',
          details: {
            details: 'Chi tiết',
            inPerson: 'Đăng ký trực tiếp và bỏ phiếu qua đường bưu điện',
            ballotDropoff: 'Điểm bỏ lá phiếu bầu qua đường bưu điện',
            interpretationAvailable: 'Có các dịch vụ thông dịch qua điện thoại.',
            wheelchair: 'Hỗ trợ tiếp cận cho xe lăn',
          },

          beforeYouGo: 'Trước khi quý vị đến',
          checkSite: 'Hãy kiểm tra thông tin chi tiết của cơ sở cụ thể.',
          hoursVary: 'Giờ làm việc và tính sẵn có khác nhau.',
          eligibility: 'Chi tiết',
          testingHours: 'Giờ xét nghiệm',
          daysOfOperation: 'Ngày làm việc',
          Monday: 'Thứ hai',
          Tuesday: 'Thứ ba',
          Wednesday: 'Thứ tư',
          Thursday: 'Thứ năm',
          Friday: 'Thứ sáu',
          Saturday: 'thứ bảy',
          Sunday: 'Chủ Nhật',
          Yes: 'Có',
          No: 'Không',
          Unknown: 'Không biết',
          website: 'Trang web',
        },
        'ru': {
          language: 'Pусский',
          app: {
            title: 'Центры голосования по почте',
            subtitle: 'Найдите место для голосования по почте рядом с вами',
            // bannerAlert: 'Многие места сегодня закрыты. Для получения более подробной информации о месте отдыха просмотрите дополнительные сведения.',
            noResults: 'В ходе поиска не найдено ни одного пункта для тестирования. Позвоните своему врачу или посетите веб-сайт Департамента здравоохранения, посвященный COVID-19, и узнайте, как <a href="https://www.phila.gov/programs/coronavirus-disease-2019-covid-19/guidance/faq/#getting-tested" target="_blank">пройти тестирование в Филадельфии</a>.',
          },
          introPage: {
            introTitle: 'Об этом средстве поиска',
            p1_1: 'Уполномоченные по выборам в Филадельфии утвердили открытие ',
            p1_2: 'дополнительных избирательных офисов, расположенных по всей Филадельфии, в дополнение к двум существующим офисам Окружной счетной комиссии.',
            p2: 'Посетив эти пункты всего один раз, избиратели смогут:​',
            ul1: {
              li1: 'зарегистрироваться для голосования',
              li2: 'запросить бюллетень для голосования по почте,',
              li3: 'получить бюллетень, проголосовать и вернуть его.',
            },
            p3: 'Избиратели также могут опустить свои заполненные бюллетени в урну в избирательном офисе.',
            p4_b: 'Примечание. ',
            p4: 'Запрашивать новые бюллетени в офисах избиратели смогут не раньше 6 октября. Эта мера призвана предотвратить дублирование бюллетеней, уже отправленных по почте.',
            relatedContent: 'Сопутствующие материалы',
            link1: 'Проверьте статус своей регистрации в качестве избирателя',
            link2: 'Проверьте статус своего бюллетеня для голосования по почте',
            link3: 'Ознакомьтесь с нашим руководством для голосования по почте для избирателей Филадельфии',

          },
          cityOfPhiladelphia: 'Городская администрация Филадельфии',
          cityCommissioners: 'Департамент уполномоченных по выборам',
          ballotGuide: 'Руководство для голосования по почте на всеобщих выборах',
          siteHours: 'Часы работы пункта',
          details: {
            details: 'Сведения',
            inPerson: 'Личная регистрация и голосование по почте',
            ballotDropoff: 'Пункты приема бюллетеней для голосования по почте',
            interpretationAvailable: 'Предоставляются услуги переводчика по телефону',
            wheelchair: 'Приспособлено для людей на инвалидных колясках',
          },

          beforeYouGo: 'Прежде чем вы пойдете',
          checkSite: 'Проверьте дополнительные сведения о пункте тестирования.',
          hoursVary: 'Часы работы и возможность оказания услуги могут меняться.',
          eligibility: 'Сведения',
          testingHours: 'Часы тестирования',
          daysOfOperation: 'Рабочие дни',
          Monday: 'Пн',
          Tuesday: 'Вт',
          Wednesday: 'Ср',
          Thursday: 'Чт',
          Friday: 'Пт',
          Saturday: 'Сб',
          Sunday: 'Вс',
          Yes: 'Да',
          No: 'Нет',
          Unknown: 'Неизвестно',
          website: 'Веб-сайт',
        },
        'fr': {
          language: 'Français',
          app: {
            title: 'Centres de vote par correspondance',
            subtitle: 'Trouver un bureau de vote par correspondance près de chez vous',
            // bannerAlert: 'De nombreux sites sont fermés aujourd’hui. Consultez les détails spécifiques au site pour obtenir de plus amples informations.',
            noResults: 'Aucun site de dépistage n’a été trouvé pour votre recherche. Veuillez appeler votre prestataire de soins de santé ou consulter le site Web du département de la Santé publique sur le COVID-19 pour obtenir des informations sur les tests de dépistage à Philadelphie.',
          },
          introPage:{
            introTitle: 'À propos de cet outil de recherche',
            p1_1: 'Les commissaires de la ville de Philadelphie ont approuvé l’ouverture de ',
            p1_2: ' bureaux de vote satellites répartis dans toute la ville, en plus des deux bureaux de vote existants du comté.',
            p2: 'En se rendant une seule fois dans ces bureaux, les électeurs peuvent:',
            ul1: {
              li1: 'S’inscrire pour voter,',
              li2: 'Demander un bulletin de vote par correspondance, et',
              li3: 'Recevoir leur bulletin de vote, le remplir et le remettre.',
            },
            p3: 'Les électeurs peuvent également déposer leur bulletin de vote dûment rempli dans un bureau de vote.',
            p4_b: 'Remarque: ',
            p4: 'Les électeurs doivent attendre jusqu’au 6 octobre pour demander un bulletin de remplacement dans les bureaux. Cela permettra d’éviter les duplicatas avec les bulletins déjà envoyés par la poste.',
            relatedContent: 'Contenu connexe',
            link1: 'Vérifiez que vous êtes inscrit(e) sur les listes électorales',
            link2: 'Vérifiez où en est le traitement de votre bulletin de vote par correspondance',
            link3: 'Consultez notre guide sur le vote par correspondance pour les électeurs de Philadelphie',

          },
          cityOfPhiladelphia: 'Ville de Philadelphie',
          cityCommissioners: 'Commissaires de la ville',
          ballotGuide: 'Guide sur le vote par correspondance pour les élections générales',
          siteHours: 'Heures d’ouverture des sites',
          details: {
            details: 'Détails',
            inPerson: 'Inscription en personne et vote par correspondance',
            ballotDropoff: 'Dépôt des bulletins de vote par correspondance',
            interpretationAvailable: 'Services d’interprétation par téléphone disponibles',
            wheelchair: 'Accessible aux fauteuils roulants',
          },

          beforeYouGo: 'Avant de vous déplacer',
          checkSite: 'Consultez les détails concernant un site particulier.',
          hoursVary: 'Les horaires et la disponibilité varient.',
          eligibility: 'Détails',
          testingHours: 'Horaires de dépistage',
          daysOfOperation: 'Jours d’ouverture',
          Monday: 'Lundi',
          Tuesday: 'Mardi',
          Wednesday: 'Mercredi',
          Thursday: 'Jeudi',
          Friday: 'Vendredi',
          Saturday: 'Samedi',
          Sunday: 'Dimanche',
          Yes: 'Oui',
          No: 'Non',
          Unknown: 'Inconnu',
          website: 'Site Web',
        },

      },
    },
  },
});
