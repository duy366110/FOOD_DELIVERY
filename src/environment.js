const environment = {
    port: 8080,
    origin: {
        dev: [
            "http://localhost:4200",
            "http://localhost:3000",
        ],
        pro: [
            "https://food-3f27f.web.app",
            "https://food-3f27f.firebaseapp.com",
            "https://fooddeliveryad-7a097.web.app",
            "https://fooddeliveryad-7a097.firebaseapp.com"
        ]
    }
}

export default environment;