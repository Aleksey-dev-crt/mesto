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


// Создайте класс UserInfo
// Класс UserInfo отвечает за управление информацией о пользователе на странице. Этот класс:
// Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
// Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Данные для этого метода нужно получать от методов класса Api — подумайте над тем, как внедрить метод класса Api в getUserInfo. Когда данные пользователя нужно будет подставить в форму при открытии — метод вам пригодится.
// Содержит публичный метод setUserInfo, который принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу.


