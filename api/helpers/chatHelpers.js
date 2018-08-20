const organizeResponse = (user, object) => {
  let chats = [];
  object.forEach((element, i) => {
    let value = {};
    if (user.id === element.chat_first.id) {
      value.user = {
        id: element.chat_first.id,
        name: element.chat_first.userName,
        image: element.chat_first.image
      }
      value.send = {
        id: element.chat_last.id,
        name: element.chat_last.userName,
        image: element.chat_first.image
      }
    } else {
      value.user = {
        id: element.chat_last.id,
        name: element.chat_last.userName,
        image: element.chat_first.image
      }
      value.send = {
        id: element.chat_first.id,
        name: element.chat_first.userName,
        image: element.chat_first.image
      }
    }
    value.messages = element.messages;
    value.room = element.roomName;
    value.idRoom = element.id;
    chats.push(value);
  });

  return chats;
}

module.exports = { organizeResponse };
