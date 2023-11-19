module.exports = {
    trailingSlash: true,
    async redirects() {
        return [
            {
                permanent: true,
                source: '/admin',
                destination: '/admin/index.html',
            },
        ]
    },
    async rewrites() {
        return [
            {
                source: '/projects/gameboy/',
                destination: '/projects/snowflakes/index.html',
            },
            {
                source: '/projects/snowflakes/',
                destination: '/projects/snowflakes/index.html',
            },
        ]
    }
}