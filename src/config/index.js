let currentEnvironment = 'dev'
const environment = {
    "dev": 'http://127.0.0.1:3000',
    'prod': ''
}
const config = {
    appEnv: 'develop',
    apiUrl: environment[currentEnvironment],
};

export default Object.freeze(config);

