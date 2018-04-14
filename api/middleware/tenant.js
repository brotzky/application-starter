import Datastore from '@google-cloud/datastore';
import gstore from 'gstore-node';

// Defining out client outside of requests
const datastore = new Datastore({
  keyFilename: './api/keyfile.json',
});

const googlestore = gstore();

/**
 * tenant()
 * Will dynamically set the namespace of the client so we can
 * partition the databse for each partner and write/read the
 * correct data. The datastore is added to the req object and
 * can be accessed in all express middlewares through req.datastore
 */
export default function tenant(req, res, next) {
  const host = req.get('host');
  const subdomain = host.split('.')[0].split('-');
  const subdomainOrg = process.argv[2] || subdomain[0];
  const subdomainEnv = process.argv[3] || subdomain[1];

  const projectId = `grow-admin-console-${subdomainEnv}`;
  const namespace = subdomainOrg;

  datastore.projectId = projectId;
  datastore.namespace = namespace;

  googlestore.connect(datastore);
  req.gstore = googlestore;

  next();
}
