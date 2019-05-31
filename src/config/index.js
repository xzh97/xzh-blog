let currentEnvironment = 'dev'
const environment = {
    "dev": 'http://127.0.0.1:3000',
    'prod': ''
}
let originTest = environment[currentEnvironment];
const config = {
    appEnv: 'develop',
    apiUrl: originTest,
};

export default Object.freeze(config);

