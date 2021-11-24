export default class UserInfo {
  constructor({userName, userInfo}, api) {
    this.userName = userName;
    this.userInfo = userInfo;
    this.api = api
  }

  getUserInfo() {
    return this.api.getUserData()
  }

  setUserInfo(profileName, profileJob, submitButton, popup) {
    return this.api.patchUserData(
      this.userName.value,
      this.userInfo.value
    ).then(() => {
      profileName.textContent = this.userName.value;
      profileJob.textContent = this.userInfo.value;
      popup.close();
    })
    .finally(() => (submitButton.textContent = "Сохранить"))
    .catch((err) => {
      console.log(err);
    });
  }
}
