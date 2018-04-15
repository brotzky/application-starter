import Datastore from '@google-cloud/datastore';
import gstore from 'gstore-node';

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
  const subdomainEnv = process.argv[2] || subdomain[0];

  const projectId = `product-starter-${subdomainEnv}`;

  datastore.projectId = projectId;

  googlestore.connect(datastore);
  req.gstore = googlestore;

  next();
}
