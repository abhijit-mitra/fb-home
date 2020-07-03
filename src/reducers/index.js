import {combineReducers} from 'redux';

import currentUser from './auth';
import transfers from './transfers';
import toast from './toast';
import paymentChannels from './payment_channels';

export default combineReducers({currentUser, transfers, toast, paymentChannels});
