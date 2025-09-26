/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'deek57.sg-host.com', pathname: '/**' },
      // add dd-creation.local too for local dev if you want
    ],
  },
};
