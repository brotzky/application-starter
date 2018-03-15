/**
 * This react helmt code is adapted from
 * https://themeteorchef.com/tutorials/reusable-seo-with-react-helmet.
 *
 * A great tutorial explaining how to setup a robust version of an
 * SEO friendly react-helmet instance.
 */
import React from 'react';
import Helmet from 'react-helmet';

const getMetaTags = ({ title, url, contentType }) => {
  const metaTags = [
    { charset: 'utf-8' },
    {
      'http-equiv': 'X-UA-Compatible',
      content: 'IE=edge',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    { itemprop: 'name', content: `${title}` },
    { itemprop: 'description', content: 'Grow Admin Console' },
  ];

  return metaTags;
};

const Title = ({ description, contentType, title }) => (
  <Helmet
    htmlAttributes={{
      lang: 'en',
    }}
    title={title}
    meta={getMetaTags({
      title,
      description,
      contentType,
    })}
  />
);

export default Title;
