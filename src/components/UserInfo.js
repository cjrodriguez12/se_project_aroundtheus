export class UserInfo {
  constructor({ nameSelector, jobSelector }, handleProfileEditSubmit) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    // this._userAvatar = document.querySelector(avatarSelector);
    this._handleProfileEditSubmit=handleProfileEditSubmit

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
    this._handleProfileEditSubmit(this._nameElement, this._jobElement);
  }
}
