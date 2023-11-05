const api_base_url = process.env.VUE_APP_API_BASE_URL || 'http://localhost:8080';


module.exports = {
    devServer: {
        port: 8081,
        proxy: {
            '/api': {
                target: api_base_url,
                ws: true,
                changeOrigin: true
            },
        },
    },

    transpileDependencies: [
        'vuetify'
    ],
}