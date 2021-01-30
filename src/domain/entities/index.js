import guid from '../../helpers/guid.js';
import { emailValidator, phoneValidator } from '../../helpers/validators.js';
import buildMakeUser from './user.js';

const makeUser = buildMakeUser({ guid, emailValidator, phoneValidator });

const entityFactories = Object.freeze({ makeUser });

export { makeUser };
export default entityFactories;
