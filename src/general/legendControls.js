export default {
  // water: {
  //   options: {
  //     topics: [ 'water' ],
  //     showWithBaseMapOnly: false,
  //   },
  //   // TODO give these an id instead of using the label as a key
  //   data: {
  //     'Roof': {
  //       'background-color': '#FEFF7F',
  //     },
  //     'Other Impervious Surface': {
  //       'background-color': '#F2DCFF',
  //     },
  //   },
  // },
  legend: {
    options: {
      showWithBaseMapOnly: true,
      shape: 'circle',
    },
    data: {
      // TODO give these an id instead of using the label as a key
      'Election offices': {
        'border-color': 'black',
        'border-style': 'solid',
        'border-weight': '0px',
        'width': '15px',
        'height': '15px',
        'font-size': '10px',
        'background-color': '#a86518',
        // 'background-color': '#9400c6',
      },
      'Official mail-in ballot drop boxes': {
        'border-color': 'black',
        'border-style': 'solid',
        'border-weight': '0px',
        'width': '15px',
        'height': '15px',
        'font-size': '10px',
        'background-color': '#4F6D0A',
      },
      'Official mobile mail-in ballot return': {
        'border-color': 'black',
        'border-style': 'solid',
        'border-weight': '0px',
        'width': '15px',
        'height': '15px',
        'font-size': '10px',
        'background-color': '#721817',
      },
      'Mail-in ballot drop box (temporarily closed)': {
        'border-color': 'black',
        'border-style': 'solid',
        'border-weight': '0px',
        'width': '15px',
        'height': '15px',
        'font-size': '10px',
        'background-color': '#a1a1a1',
      },
    },
  },
};
