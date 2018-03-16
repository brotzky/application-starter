const startup = () => {
  console.log('║');
  console.log('║');
  console.log('║    Welcome to the Grow Admin Console');
  console.log('║');
  console.log(`║    🚀   ==>  App is running in ${process.env.NODE_ENV} mode`);
  console.log(
    `║    🎯   ==>  API target https://${process.argv[2]}-${process.argv[3] ||
      'dev'}-gac.appspot.com`,
  );
  console.log(
    `║    💻   ==>  Local server running on http://localhost:${
      process.env.PORT
    }/`,
  );
  console.log('║    🕐   ==>  Please wait for compilation to finish.');
  console.log('║');
  console.log('║');
  console.log(
    '║    Gitlab: https://gitlab.com/poweredbygrow/software/grow-admin-console',
  );
  console.log(
    '║    Jira: https://poweredbygrow.atlassian.net/secure/RapidBoard.jspa?rapidView=81&projectKey=GAC',
  );
  console.log('║');
  console.log('║');
};
export default startup;
