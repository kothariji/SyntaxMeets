// Rooms object will store all clients in each room
// in the form of key-value pairs
// example of rooms object :
// this.rooms = {
//   id1: {
//     {clientid1: name1},
//     {clientid2: name2},
//   },
//   id2: {
//     {clientid3: name3},
//     {clientid4: name4}
//   },
//   id3: {
//     {clientid5: name5},
//     {clientid6: name6},
//     {clientid7: name7},
//   },
// };

class Rooms {
  constructor() {
    this.rooms = {};
  }
  addUserToRoom(id, name, room) {
    if (!this.rooms[room]) {
      //Create a new room object
      this.rooms[room] = {};
    }
    //Add user in the room in the form of key-value pair
    this.rooms[room][id] = name;
  }
  getAllUsers(room) {
    //return all users in the room using the roomId

    return this.rooms[room];
  }
  deleteUser(room, id) {
    //Delete user from the room
    if (this.rooms[room]) {
      // from the current room delete key-value of client

      delete this.rooms[room][id];
      return id;
    }
  }
  getUser(room) {
    let user = {};
    //the room dosen't exist
    if (!this.rooms[room]) return user;
    const keyArray = Object.keys(this.rooms[room]);
    //room exists but no user
    if (!keyArray.length) return user;
    //send old user
    //{id:name}
    return { [keyArray[0]]: this.rooms[room][keyArray[0]] };
  }
}
module.exports = Rooms;
