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
};

export const validateRoomID = (roomId) => {
  var patt = new RegExp("(([A-Za-z]{4})(-)){2}[A-Za-z]{4}");
  return patt.test(roomId.trim()) && roomId.length == 14;
};

export const getExtensionByLangCode = (langCode) => {
  switch (langCode) {
    case "C++":
      return "cpp";
    case "C":
      return "c";
    case "JAVA":
      return "java";
    case "Python":
      return "py";
    case "JavaScript":
      return "js";
    case "TypeScript":
      return "ts";
    case "Clojure":
      return "clj";
    case "C#":
      return "cs";
    case "COBOL":
      return "cbl";
    case "COBOL":
      return "cob";
    case "Erlang":
      return "erl";
    case "Go":
      return "go";
    case "Python":
      return "py";
    case "FortRan":
      return "f90";
    case "Groovy":
      return "groovy";
    case "Kotlin":
      return "kt";
    case "PHP":
      return "php";
    case "R":
      return "r";
    case "Ruby":
      return "rb";
    case "SQL":
      return "sql";
    case "Swift":
      return "swift";
    default:
      return "txt";
  }
};
