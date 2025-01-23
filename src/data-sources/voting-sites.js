export default {
  id: 'voting-sites',
  type: 'http-get',
  dependent: 'none',
  resettable: false,
  url: 'https://phl.carto.com:443/api/v2/sql',
  options: {
    params: {
      q: "select * from voting_sites_staging where site_approved = 'TRUE' order by site_type desc",
    },
  },
};
