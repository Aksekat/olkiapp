import { getImage } from '../utils/getImage';

export function extractUsers(data) {
  const userObj = {};
  const users = [];
  const userData = data.value;
  let counter = 0;
  let counter1 = 0;

  const addUserItem = (userItem, image) => {
    const userObject = {
      id: counter1,
      name: userItem.displayName,
      mail: userItem.mail,
      role: userItem.jobTitle,
      image: image,
      phone: userItem.businessPhones
    };
    counter1++;
    users.push(userObject);
  };

  for (const element of userData) {
    //const image = await getImage(`https://graph.microsoft.com/v1.0/users/${element.id}/photo/$value`,accessTokeni);
    let user = 'useritem' + counter.toString();
    let userstring = element;
    userObj[user] = userstring;
    counter++;
    addUserItem(element, 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png');
  }

  return users;
}