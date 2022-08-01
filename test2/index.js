const assert = require("chai").assert;

const database = (() => {
  const _database = {
    621: { id: 621, name: "XxDragonSlayerxX", friends: [123, 251, 631] },
    123: { id: 123, name: "FriendNo1", friends: [621, 631] },
    251: { id: 251, name: "SecondBestFriend", friends: [621] },
    631: { id: 631, name: "ThirdWh33l", friends: [621, 123, 251] },
  };

  const getUser = (id) =>
    new Promise((res, rej) => {
      setTimeout(() => {
        _database[id] ? res(_database[id]) : rej(`User with id ${id} does not exist in the database`);//The error content is changed to be more accurate
      }, 300);
    });

  const listUserIDs = () => Promise.resolve([621, 123, 251, 631]);

  return { getUser, listUserIDs };
})();

const expected = [
  {
    id: 621,
    name: "XxDragonSlayerxX",
    friends: [
      { id: 123, name: "FriendNo1", friends: [621, 631] },
      { id: 251, name: "SecondBestFriend", friends: [621] },
      { id: 631, name: "ThirdWh33l", friends: [621, 123, 251] },
    ],
  },
  {
    id: 123,//The id was incorrect. It was 350 and I changed it to the correct id '123'
    name: "FriendNo1",
    friends: [
      { id: 621, name: "XxDragonSlayerxX", friends: [123, 251, 631] },
      { id: 631, name: "ThirdWh33l", friends: [621, 123, 251] },
    ],
  },
  {
    id: 251,
    name: "SecondBestFriend",
    friends: [{ id: 621, name: "XxDragonSlayerxX", friends: [123, 251, 631] }],
  },
  {
    id: 631,
    name: "ThirdWh33l",
    friends: [
      { id: 621, name: "XxDragonSlayerxX", friends: [123, 251, 631] },
      { id: 123, name: "FriendNo1", friends: [621, 631] },
      { id: 251, name: "SecondBestFriend", friends: [621] },
    ],
  },
];

const validate = (result) => {
  try {
    assert.deepEqual(result, expected);
  } catch (e) {
    console.error("Failed", e);
  }
};

// implement a method to create this result

//Providing userID, the function finds the user in the database
//and collects all his friends
const getFriends = async (userID) => {
  try {
    const user = await database.getUser(userID);//Find the user in the database
    const friends = await Promise.all(user.friends.map(database.getUser));//Providing friend ids, find the friends in the database
    return Promise.resolve({ ...user, friends });
  } catch (error) {
    return Promise.reject(error);
  }

}

const populateFriends = () => {
  try {
    return Promise.resolve(database.listUserIDs().then(userIDS => Promise.all(userIDS.map(getFriends))));
  } catch (error) {
    return Promise.reject(error)
  }
};

// At the end call validate
populateFriends()
  .then(validate)
  .catch(error => {
    //One or more users are not found in the database
    console.error(error)
  });