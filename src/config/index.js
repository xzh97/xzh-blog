let currentEnvironment = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';
const environment = {
    "dev": 'http://127.0.0.1:3000',
    'prod': 'http://122.51.73.210:3000'
};
const config = {
    apiUrl: environment[currentEnvironment],
};

export default Object.freeze(config);

