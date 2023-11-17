export class UserInfo {
  constructor({ nameSelector, jobSelector, avatarImg }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._userAvatar = document.querySelector(avatarImg);
  }
  getUserInfo() {
    const userInfoList = {};
    userInfoList.name = this._nameElement.textContent;
    userInfoList.description = this._jobElement.textContent;
    return userInfoList;
  }
  setUserInfo(name, description) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = description;
  }
  setAvatar(link) {
    this._userAvatar = link;
  }
}
