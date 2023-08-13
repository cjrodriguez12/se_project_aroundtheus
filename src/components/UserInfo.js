export class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }, handleFormFill) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._userAvatar = document.querySelector(avatarSelector);
    this._handleFormFill = handleFormFill;
  }
  getUserInfo() {
    const userInfoList = {};
    userInfoList.name = this._nameElement.textContent;
    userInfoList.description = this._jobElement.textContent;
    this._handleFormFill(userInfoList.name, userInfoList.description);
    return userInfoList;
  }
  setUserInfo(name, description) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = description;
  }
}
