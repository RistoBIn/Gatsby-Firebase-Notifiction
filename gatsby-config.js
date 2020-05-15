'use strict';

const siteConfig = require('./config.js');

module.exports = {
  siteMetadata: {
    ...siteConfig,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GatsbyJS`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: `src/assets/icon.png`,
        gcm_sender_id: "921558333196",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        importWorkboxFrom: `cdn`,
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
  ],
};
