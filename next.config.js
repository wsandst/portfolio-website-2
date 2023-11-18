module.exports = {
    async redirects() {
        return [
        {
            permanent: true,
            source: '/admin',
            destination: '/admin/index.html',
        },
        ]
    },
}