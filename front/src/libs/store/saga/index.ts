import { all, call, put, takeEvery } from "redux-saga/effects";
import { ApiService } from "../services/ApiService";
import { getActiveRoomsError, getActiveRoomsSuccess } from "../reducer/actions";
import { GET_ACTIVE_ROOMS } from "../reducer/actionTypes";

const api = new ApiService();
function* fetchRooms() {
  try {
    const { data } = yield call(api.getRooms);
    yield put(getActiveRoomsSuccess(data));
  } catch (error) {
    yield put(getActiveRoomsError("room fetching error"));
  }
}

function* watchFetchData() {
  yield takeEvery(GET_ACTIVE_ROOMS, fetchRooms);
}

export default function* rootSaga() {
  yield all([watchFetchData()]);
}
