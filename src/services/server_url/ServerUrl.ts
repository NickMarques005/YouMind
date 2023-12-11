
const USE_ENV = () => {
    const serverUrl = process.env.SERVER_URL;
    const apiRoute = process.env.API_ROUTE;

    console.log("SERVER URL: ", serverUrl);

    const fullApiServerUrl = `${serverUrl}${apiRoute}`;

    console.log(fullApiServerUrl);

    return {
        serverUrl,
        fullApiServerUrl
    }

};

export default USE_ENV;


