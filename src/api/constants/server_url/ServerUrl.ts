
const USE_ENV = () => {
    const serverUrl = process.env.SERVER_URL;
    const apiRoute = process.env.API_ROUTE;

    const fullApiServerUrl = `${serverUrl}${apiRoute}`;

    return {
        serverUrl,
        fullApiServerUrl
    }
};

export default USE_ENV;


