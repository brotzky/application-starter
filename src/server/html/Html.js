import React from 'react';

const Html = ({ bundles, css, html, scripts, state }) => {
  const isProd = process.env.NODE_ENV === 'production';
  const codesplitStlyes = bundles.filter(bundle =>
    bundle.file.endsWith('.css'),
  );
  const codesplitScripts = bundles.filter(bundle =>
    bundle.file.endsWith('.js'),
  );

  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style dangerouslySetInnerHTML={{ __html: css }} />
        {codesplitStlyes.map(style => (
          <link
            key={style.file}
            href={`/dist/${style.file}`}
            rel="stylesheet"
          />
        ))}
      </head>
      <body>
        {isProd ? (
          <main id="app" dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <main id="app" />
        )}
        <script dangerouslySetInnerHTML={{ __html: state }} />
        {codesplitScripts.map(script => (
          <script key={script.file} src={`/dist/${script.file}`} />
        ))}
        {scripts.map(filename => (
          <script key={filename} src={`/dist/${filename}`} />
        ))}
      </body>
    </html>
  );
};

export default Html;
