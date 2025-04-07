import { type PageProps } from "$fresh/server.ts";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>noteable</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&display=swap" />
        <link rel="stylesheet" href="/styles.css" />
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              // Add transition class to document elements
              document.documentElement.classList.add('transition-colors', 'duration-300');
              
              const theme = localStorage.getItem('theme');
              if (theme === 'light') {
                document.documentElement.classList.add('light-theme');
                document.documentElement.classList.remove('dark-theme');
                document.body.classList.add('bg-gray-100', 'text-gray-800');
                document.body.classList.remove('bg-gray-900', 'text-gray-200');
              } else {
                document.documentElement.classList.add('dark-theme');
                document.documentElement.classList.remove('light-theme');
                document.body.classList.add('bg-gray-900', 'text-gray-200');
                document.body.classList.remove('bg-gray-100', 'text-gray-800');
              }
            })();
          `
        }} />
      </head>
      <body class="font-atkison transition-colors duration-300">
        <Component />
      </body>
    </html>
  );
}
