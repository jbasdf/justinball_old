import { combineReducers }              from 'redux';
import settings                         from './settings';
import application                      from './application';
import messages                         from './messages';

const rootReducer = combineReducers({
  settings,
  application,
  messages
});

export default rootReducer;