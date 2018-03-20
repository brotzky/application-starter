import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const contentStyle = {
  fontSize: '1rem',
  margin: '0.6rem 0 0.6rem 1.4rem',
  fontWeight: '600',
  fontFamily: 'Monospace',
};

const ErrorTemplate = ({ error }) => (
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style
        dangerouslySetInnerHTML={{
          __html: `
          body {
            padding: 2rem;
            background: #fde1e0;
            font-family: -apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", Helvetica, Ubuntu, Roboto, Noto, "Segoe UI", Arial, sans-serif;
            font-size: 1.6rem;
            color: rgb(38, 38, 38);
            font-weight: 800;
          }`,
        }}
      />
    </head>
    <body>
      {error.split('at').map((err, index) => (
        <div
          key={err}
          style={index ? contentStyle : { marginBottom: '1.2rem' }}
        >
          {index ? `at ${err}` : err}
        </div>
      ))}
    </body>
  </html>
);

export default function logger(error, req, res, next) {
  // Keeping this super simple for now
  console.error({ error });

  const markup = <ErrorTemplate error={error.stack.toString()} />;
  const html = `<!doctype html>${renderToStaticMarkup(markup)}`;

  res.status(500).send(html);
}
