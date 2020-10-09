export default {
  id: 'voting-sites',
  type: 'http-get',
  dependent: 'none',
  resettable: false,
  url: 'https://raw.githubusercontent.com/ajrothwell/devjson/main/dev.json',
  options: {
    // params: {
    //   q: "select * from voting_sites where temporary_closure = 'FALSE'",
    // },
  },
};
