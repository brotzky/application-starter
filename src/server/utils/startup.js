const startup = () => {
  console.log('Grow Admin Console');
  console.log('');
  console.log('enviroment:', process.env.NODE_ENV);
  console.log('version:', process.env.GIT.VERSION);
  console.log('hash:', process.env.GIT.COMMITHASH);
  console.log('Running on http://localhost:3000/');
};
