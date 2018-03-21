import { db } from './firebase';


/** USERS **/
export async function createUser(id, name) {
  return db.ref(`users/${id}`).set({
    name
  });
}

export async function getUser(id) {
  const snapshot = await db.ref(`users/${id}`).once();
  return snapshot.val();
}

export async function updateUser(id, updates) {
  return db.ref(`users/${id}`).update(updates);
}

export async function removeUser(id) {
  return db.ref(`users/${id}`).remove();
}


/** WALLETS **/
export async function createWallet(userId) {
  const newWalletRef = db.ref('wallets').push();
  await newWalletRef.set({
    createdBy: userId,
    balance: 0
  });
  return newWalletRef.val();
}

export function getWalletRef(id) {
  return db.ref(`wallets/${id}`);
}

export async function getWallet(id) {
  const snapshot = await db.ref(`wallets/${id}`).once();
  return snapshot.val();
}

export async function depositMoney(walletId, amount) {
  return db.ref(`wallets/${walletId}/balance`)
    .transaction(currentBalance => currentBalance ? currentBalance + amount : amount);
}

export async function spendMoney(walletId, amount) {
  const { balance } = await getWallet(walletId);
  if(balance - amount < 0) {
    throw new Error(`You don't have enough money! Current balance: ${walletId}, but trying to spend ${amount}.`);
  }

  return db.ref(`wallets/${walletId}/balance`)
    .transaction(currentBalance => currentBalance ? currentBalance - amount : amount);
}

export async function addUserToWallet(walletId, userId) {
  const user = await getUser(userId);
  const walletRef = await getWalletRef(walletId);

  const userWallets = Object.keys(user.wallets);
  if(userWallets.includes(walletId)) {
    throw new Error(`User ${userId} is already part of ${walletId}.`);
  }

  await walletRef.push({ [userId]: true });
  await db.ref(`users/${userId}`).push({ [walletId]: true });
}
