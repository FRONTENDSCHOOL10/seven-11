import { removeStorageData } from '@/utils';
import pb from './pb';

export async function userSignUp(username, email, password) {
  const newUser = {
    email,
    username,
    password,
    passwordConfirm: password,
    emailVisibility: true,
  };

  const authData = await pb.collection('users').create(newUser);

  return authData;
}

export async function userSignIn(email, password) {
  const authData = await pb
    .collection('users')
    .authWithPassword(email, password);

  return authData;
}

export async function signOut() {
  pb.authStore.clear();
  removeStorageData('authInfo');

  console.log('로그아웃됨!');
}
