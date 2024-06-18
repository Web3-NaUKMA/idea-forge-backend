import fs from 'fs';

export const loadUserData = (userId: string): any => {
  try {
    const data = fs.readFileSync(`./${userId}_data.json`, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return {};
  }
};

export const saveUserData = (userId: string, data: any): void => {
  fs.writeFileSync(`./${userId}_data.json`, JSON.stringify(data, null, 2));
};

export const saveUserResponse = (userId: string, key: string, response: string, userData: any): void => {
  if (!userData[userId]) {
    userData[userId] = {};
  }
  userData[userId][key] = response;
  saveUserData(userId, userData);
};

export const getUserResponse = (userId: string, key: string, userData: any): string => {
  return userData[userId]?.[key] || '';
};