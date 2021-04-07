export const generateRoomId = () => {
    var tempId = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var charactersLength = characters.length;
    for (var i = 0; i < 12; i++) {
        tempId += characters.charAt(Math.floor(Math.random() * charactersLength));
        if ((i + 1) % 4 === 0 && i !== 11) {
            tempId += "-";
        }
    }
    return tempId;
}

export const validateRoomID = (roomId) => {

    var patt = new RegExp("(([A-Za-z]{4})(-)){2}[A-Za-z]{4}");
    return patt.test(roomId.trim()) && roomId.length == 14;

}