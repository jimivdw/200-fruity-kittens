import { db } from './firebase';


/** USERS **/
export async function createUser(id, name, email) {
  const user = {
    id,
    name,
    email,
  }
  await db.ref(`users/${id}`).set(user);
  return user;
}

export async function getUser(id) {
  const snapshot = await db.ref(`users/${id}`).once('value');
  return snapshot.val();
}

export async function getOrCreateUser(id, name, email) {
  const user = await getUser(id);
  return user || await createUser(id, name, email);
}

export async function updateUser(id, updates) {
  return db.ref(`users/${id}`).update(updates);
}

export async function removeUser(id) {
  return db.ref(`users/${id}`).remove();
}


/** WALLETS **/
export async function createWallet(name, userId) {
  const newWalletRef = db.ref('wallets').push();
  await newWalletRef.set({
    name,
    createdBy: userId,
    balance: 0
  });
  await addUserToWallet(newWalletRef.key, userId)
  return newWalletRef.key;
}

export function getWalletRef(id) {
  return db.ref(`wallets/${id}`);
}

export async function getWallet(id) {
  const snapshot = await db.ref(`wallets/${id}`).once('value');
  return snapshot.val();
}

export async function depositMoney(walletId, amount) {
  return db.ref(`wallets/${walletId}/balance`)
    .transaction(currentBalance => currentBalance ? currentBalance + amount : amount);
}

export async function spendMoney(walletId, amount) {
  const { balance } = await getWallet(walletId);
  if (balance - amount < 0) {
    throw new Error(`You don't have enough money! Current balance: ${walletId}, but trying to spend ${amount}.`);
  }

  return db.ref(`wallets/${walletId}/balance`)
    .transaction(currentBalance => currentBalance ? currentBalance - amount : amount);
}

export async function addUserToWallet(walletId, userId) {
  const user = await getUser(userId);
  const wallet = await getWallet(walletId);
  const walletRef = await getWalletRef(walletId);

  const userWallets = Object.keys(user.wallets || {});
  if (userWallets.includes(walletId)) {
    throw new Error(`User ${userId} is already part of ${walletId}.`);
  }

  await walletRef.push({ [userId]: true });
  await db.ref(`users/${userId}/wallets`).push({ [walletId]: wallet.name });
}

export async function removeUserFromWallet(walletId, userId) {
  const user = await getUser(userId);

  const userWallets = Object.keys(user.wallets || {});
  if (!userWallets.includes(walletId)) {
    return;
  }

  await db.ref(`wallets/${walletId}/${userId}`).delete();
  await db.ref(`users/${userId}/wallets/${walletId}`).delete();
}

export async function removeWallet(walletId) {
  const wallet = await getWallet(walletId);
  await Promise.all(Object.keys(wallet.users || {}).map(userId => db.ref(`users/${userId}/${walletId}`).delete()));
  return getWalletRef(walletId).delete();
}
