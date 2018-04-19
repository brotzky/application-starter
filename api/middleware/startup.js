export default function startup() {
  console.log(
    `║  💻   ==>  API running in ${
      process.env.NODE_ENV
    } mode on http://localhost:${process.env.APIPORT}`,
  );
}
