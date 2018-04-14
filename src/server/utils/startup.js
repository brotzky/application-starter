const startup = () => {
  console.log('║');
  console.log('║');
  console.log('║    Product starter');
  console.log('║');
  console.log(`║    🚀   ==>  App is running in ${process.env.NODE_ENV} mode`);
  console.log(
    `║    🎯   ==>  API target https://${
      process.argv[2]
    } || 'dev'}.appspot.com`,
  );
  console.log(
    `║    💻   ==>  Local server running on http://localhost:${
      process.env.PORT
    }/`,
  );
  console.log('║    🕐   ==>  Please wait for compilation to finish.');
  console.log('║');
  console.log('║');
};
export default startup;
