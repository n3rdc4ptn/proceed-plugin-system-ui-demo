/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        config.externals = config.externals || {};

        if (!isServer) {
            config.externals['react'] = 'React';
            config.externals['react-dom'] = 'ReactDOM';
        }

        return config;
    },
}

module.exports = nextConfig
