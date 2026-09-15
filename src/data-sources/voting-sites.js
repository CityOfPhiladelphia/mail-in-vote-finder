export default {
  id: 'voting-sites',
  type: 'http-get',
  dependent: 'none',
  resettable: false,
  url: 'https://api-prod.phila.gov/databridge-api/v1/get',
  replaceOnSuccess: true,
  options: {
    params: {
      sql: "select * from voting_sites where temporary_closure = 'FALSE' and site_approved = 'TRUE' order by site_type desc",
      client_id: import.meta.env.VITE_DATABRIDGE_CLIENT_ID,
    },
    success: function(data) {
      return data.data.features.map(feature => feature.properties);
    },
  },
};
