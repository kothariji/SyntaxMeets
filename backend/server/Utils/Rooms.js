class Rooms {
  constructor() {
    this.rooms = {};
  }
  addUserToRoom(id, name, room) {
    if (!this.rooms[room]) {
      // then no user in the room
      this.rooms[room] = {};
    }
    this.rooms[room][id] = name;
  }
  getAllUsers(room) {
    return this.rooms[room];
  }
  deleteUser(room, id) {
    console.log("The id to be deleted is:", room, id);
    if (this.rooms[room]) {
      delete this.rooms[room][id];
      return id;
    }
  }
}
module.exports = Rooms;
