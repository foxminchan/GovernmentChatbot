const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Government Chatbot',
  tagline:
    'Smart chatbot for streamlined administrative procedures, powered by advanced language models 🤖',
  url: 'https://foxminchan.github.io',
  baseUrl: '/GovernmentChatbot',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'foxminchan',

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        {
          name: 'keywords',
          content:
            'chatbot, goverment, administrative procedures, large language model',
        },
        {
          name: 'description',
          content:
            'Smart chatbot for streamlined administrative procedures, powered by advanced language models 🤖',
        },
        { name: 'og:title', content: 'Government Chatbot' },
        {
          name: 'og:description',
          content:
            'Smart chatbot for streamlined administrative procedures, powered by advanced language models 🤖',
        },
      ],
      zoom: {
        selector: '.markdown :not(em) > img',
        config: {
          background: {
            light: 'rgb(255, 255, 255)',
            dark: 'rgb(50, 50, 50)',
          },
        },
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
      },
      announcementBar: {
        id: 'announcement-bar',
        content:
          '<a target="_blank" rel="nofollow noopener noreferrer" href="https://github.com/foxminchan/GovernmentChatbot">⭐ Star Application on GitHub</a>',
        isCloseable: true,
      },
      image: 'img/web-preview.png',
      navbar: {
        title: 'Government Chatbot',
        logo: {
          alt: 'Government Chatbot Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://www.olp.vn/',
            label: 'Website',
            position: 'left',
            target: '_self',
          },
          {
            href: 'https://github.com/foxminchan/GovernmentChatbot',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Organization',
            items: [
              {
                label: 'ICPC Vietnam',
                href: 'https://www.olp.vn/',
              },
              {
                label: 'Vfossa',
                href: 'https://vfossa.vn/',
              },
            ],
          },
          {
            title: 'References',
            items: [
              {
                label: 'Langchain',
                href: 'https://js.langchain.com/',
              },
              {
                label: 'Open AI',
                href: 'https://openai.com/',
              },
              {
                label: 'Weaviate',
                href: 'https://weaviate.io/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'About the Contest',
                href: 'https://vfossa.vn/topic/olympic-tin-hoc-sinh-vien-viet-nam-lan-thu-32/',
              },
              {
                label: 'OLP - HUSC',
                href: 'http://olp.husc.edu.vn',
              },
              {
                label: 'Hutech University',
                href: 'https://www.hutech.edu.vn',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Hutech. All rights reserved`,
        logo: {
          alt: 'School Logo',
          src: 'img/school.png',
          href: 'https://www.hutech.edu.vn/',
          width: 300,
        },
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
    }),

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/foxminchan/GovernmentChatbot/tree/main/apps/docs',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-pwa',
      {
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/logo.png',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: 'rgb(37, 194, 160)',
          },
        ],
      },
    ],
  ],
};

module.exports = config;
