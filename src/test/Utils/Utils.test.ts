import { Utils } from '../../app/Utils/Utils'
import { IncomingMessage } from 'http';

describe('Utils test suite', () => {

    test('getRequestPath valid request', () => {
        const request = {
            url: 'http://localhost:8080/login'
        } as IncomingMessage; // THIS IS A STUB OBJECT!!!
        const resultPath = Utils.getRequestBasePath(request);
        expect(resultPath).toBe('login');
    });

    test('getRequestPath with no path name', () => {
        const request = {
            url: 'http://localhost:8080/'
        } as IncomingMessage;
        const resultPath = Utils.getRequestBasePath(request);
        expect(resultPath).toBeFalsy(); // toBeFalsy checks for null | ''| undefined | false
    });

});