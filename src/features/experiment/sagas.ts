import { fork, call, delay } from 'redux-saga/effects';

function* fetchAll() {
  console.log(`start fetchAll`)
  const task1: void = yield fork(fetchResource, 'users');
  const task2: void = yield fork(fetchResource, 'comments');

  yield delay(1000);

  console.log(`end fetchAll`)
}

function* fetchResource(resource: string) {
  console.log(`start ${resource}`)

  yield delay(500)
  console.log(`end ${resource}`)
  return true;
}

export function* main() {
  console.log(`start main`);
  try {
    yield call(fetchAll)
  }
  catch (e) {
    // handle fetchAll errors
  console.log(`handle fetchAll errors `, e);
  }
  console.log(`end main`)
}