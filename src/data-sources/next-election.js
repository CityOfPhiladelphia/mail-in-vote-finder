export default {
  id: 'next-election',
  type: 'http-get',
  dependent: 'none',
  resettable: false,
  url: 'https://admin-vote.phila.gov/wp-json/votes/v1/election',
  options: {
    params: {},
  },
};
