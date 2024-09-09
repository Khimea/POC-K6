import http from 'k6/http';
import { check, sleep } from 'k6';
import { prepareRequest } from './requestHelper.js';

const config = await JSON.parse(open('../config.json'));
const data = await JSON.parse(open('../data/data.json'));
const service = __ENV.URL_KEY;
const caso = __ENV.CASO;
const endPoint = await config.urls[service];
const method = await endPoint.method
if (!service || !endPoint) {
    console.error('ERROR: Debes proporcionar una clave de URL válida.');
}

export let options = {
    stages: config.stressTest.stages,
    thresholds: config.stressTest.thresholds,
};
export default function () {
    const request = prepareRequest(service);
    
    let res;
    switch (method) {
        case 'GET':
            res = http.get(request.url);
            console.log(`Tested GET URL: ${endPoint.url} - Servicio: ${service} - Caso: ${caseID}`);
            break;
        case 'POST':
            res = http.post(request.url);
            console.log(`Tested POST URL: ${endPoint.url} - Servicio: ${service} - Caso: ${caseID}`);
            break;
        case 'PUT':
            res = http.post(request.url);
            console.log(`Tested PUT URL: ${endPoint.url} - Servicio: ${service} - Caso: ${caseID}`);
            break;
        default:
            console.error(`ERROR: Método HTTP no soportado: ${service}`);
            return;
    }
    check(res, {
        'status was 200': (r) => r.status === 200,
    });
    sleep(1);
    
}
