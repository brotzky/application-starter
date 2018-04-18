export default function startup() {
  console.log('║');
  console.log('║');
  console.log(`║    🚀   ==>  API is running in ${process.env.NODE_ENV} mode`);
  console.log(
    `║    🎯   ==>  API target https://${process.argv[2] || 'dev'}.appspot.com`,
  );
  console.log(
    `║    💻   ==>  Local API server running on http://localhost:${
      process.env.APIPORT
    }`,
  );
  console.log('║');
  console.log('║');
}
