export default {
  id: 'voting-sites',
  type: 'http-get',
  dependent: 'none',
  resettable: false,
  url: 'https://phl.carto.com/api/v2/sql?q=select+*+from+voting_sites_staging',
  options: {
    // params: {
    //   q: "select * from voting_sites where temporary_closure = 'FALSE'",
    // },
  },
};
