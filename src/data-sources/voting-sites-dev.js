export default {
  id: 'voting-sites',
  type: 'http-get',
  dependent: 'none',
  resettable: false,
  url: 'https://gist.githubusercontent.com/karissademi/8fcbbb48aead43122475bf5175c35214/raw',
  options: {
    // params: {
    //   q: "select * from voting_sites where temporary_closure = 'FALSE'",
    // },
  },
};
