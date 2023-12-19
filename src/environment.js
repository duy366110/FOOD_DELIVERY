const environment = {
    port: 8080,
    origin: {
        dev: ["http://localhost:4200"],
        pro: [
            "http://localhost:4200",
            "https://fooddeliveryad-7a097.web.app",
            "https://fooddeliveryad-7a097.firebaseapp.com"
        ]
    }
}

export default environment;