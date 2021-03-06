import { all } from 'redux-saga/effects';
import SignupSaga from './signup/sagas'
import LoginSaga from './login/sagas';
import StorageSaga from './storage/sagas';
import LogoutSaga from './logout/sagas';
import ProfileSaga from './profile/sagas';
import ShareSaga from './share/sagas';
import SearchSaga from './search/sagas';
import AdminSaga from './admin/sagas';

export default function* IndexSaga() {
  yield all([
    SignupSaga(),
    LoginSaga(),
    LogoutSaga(),
    StorageSaga(),
    ProfileSaga(),
    ShareSaga(),
    SearchSaga(),
    AdminSaga(),
  ])
}