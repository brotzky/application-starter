export default function startup() {
  console.log('║');
  console.log('║');
  console.log(`║    🚀   ==>  API is running in ${process.env.NODE_ENV} mode`);
  console.log(`║    📂   ==>  Database namespace "${process.argv[2]}"`);
  console.log(
    `║    🎯   ==>  API authentication target https://${
      process.argv[2]
    }-${process.argv[3] || 'dev'}-gac.appspot.com`,
  );
  console.log(
    `║    💻   ==>  Local API server running on http://localhost:${
      process.env.APIPORT
    }/`,
  );
  console.log('║');
  console.log('║');
}
