/**
 * 
 * @param {object} endPoint - Un objeto con los datos del endpoint, url y method
 * @param {string} service - El servicio para determinar el formato de la solicitud.
 * @param {JSON} data - Un objeto JSON que contiene los datos necesarios para preparar la solicitud.
 * @returns 
 */

export function prepareRequest(endPoint,data) {
    switch (endPoint.method) {
        case 'GET':
            let urlWithParams = `${endPoint.url}?${data}`;
            return { url: urlWithParams };

        case 'POST':
            let postData = JSON.stringify(data);
            return {
                url: endPoint.url,
                body: postData,
                headers: { 'Content-Type': 'application/json' },
            };

        case 'PUT':
            let putData = JSON.stringify(data);
            return {
                url: endPoint.url,
                body: putData,
                headers: { 'Content-Type': 'application/json' },
            };
        default:
            console.error(`ERROR: Método HTTP no soportado: ${endPoint.method}`);
            return null;
    }
}