import * as axios from 'axios'; 
import { UserCredentialsDbAccess } from '../app/Authorization/UserCredentialsDbAccess';
import { HTTP_CODES, SessionToken, UserCredentials } from '../app/Models/ServerModels';

axios.default.defaults.validateStatus = () => true;


const serverUrl = 'http://localhost:8080';
const itestUserCredentials: UserCredentials = {
    accessRights: [1,2,3],
    password: 'iTestPassword',
    username: 'iTestUser'
}

describe(' Server itest suite', () => {

    let userCredentialsDbAccess: UserCredentialsDbAccess;
    let sessionToken: SessionToken;

    beforeAll(()=> {
        userCredentialsDbAccess = new UserCredentialsDbAccess();
    })

    test('server reacheable', async () => {
        const response : axios.AxiosResponse = await axios.default.options(serverUrl);
        expect(response.status).toBe(HTTP_CODES.OK);
    });

    test.skip('put credentials inside databe', async () => {
        await userCredentialsDbAccess.putUserCredential(itestUserCredentials);
    })

    test('reject invalid credentials', async () => {
        const response = await axios.default.post(
            (serverUrl + '/login'), {
                "username": "wrongCreds",
                "password": "wrongPssd"
            }
        )

        expect(response.status).toBe(HTTP_CODES.NOT_fOUND);

    })

    test('login successfull with correct credentials', async () => {
        const response = await axios.default.post(
            (serverUrl + '/login'), {
                "username": itestUserCredentials.username,
                "password": itestUserCredentials.password
               
            }
        )

        expect(response.status).toBe(HTTP_CODES.CREATED);
        sessionToken = response.data;

    })



})


async function serverReacheable() : Promise<boolean> {
    try {
        await axios.default.get(serverUrl);
        console.log("REACHED SERVER!");
    } catch(error) {
        console.log("SERVER NOT Reacheable");
        return false;
    }
    console.log("REACHED SERVER!");
    return true;
}