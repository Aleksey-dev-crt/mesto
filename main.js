(()=>{"use strict";var e={193:(e,t,n)=>{e.exports=n.p+"e3c42771bff3aaa52f76.svg"},123:(e,t,n)=>{e.exports=n.p+"87ed371465c7a6a1cd01.svg"},377:(e,t,n)=>{e.exports=n.p+"fe17a515669479b1e649.svg"},562:(e,t,n)=>{e.exports=n.p+"bad0f45a85a7a8272e00.svg"},988:(e,t,n)=>{e.exports=n.p+"2ceb783afbab75916ddc.svg"},349:(e,t,n)=>{e.exports=n.p+"d86bb2edc2f6eadb96b7.svg"},965:(e,t,n)=>{e.exports=n.p+"bbe7c5b6093ec0273de1.jpg"},889:(e,t,n)=>{e.exports=n.p+"8667ac4a523e8fc42e59.svg"},214:(e,t,n)=>{e.exports=n.p+"f4b4dfc2864f7ec9e6ff.jpg"}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={exports:{}};return e[r](a,a.exports,n),a.exports}n.m=e,n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.p="",n.b=document.baseURI||self.location.href,(()=>{var e={popupImage:"popup_type_picture",popupCardAdd:"popup_type_card_add",popupProfile:"popup_type_profile",popupAvatar:"popup_type_avatar_change",popupDeleteConfirm:document.querySelector(".popup_type_delete_confirm"),popupCloseBtn:"popup__button-close",cardsContainer:document.querySelector(".elements__list"),cardTemplate:document.querySelector("#card-template").content,cardElement:".element",elementImage:".element__image",image:document.querySelector(".popup__image"),popupPictureCaption:document.querySelector(".popup__picture-caption"),cardTitle:".element__title",cardDelete:".element__delete",cardLike:".element__like",cardLikeActive:"element__like_active",popupOpened:"popup_opened",avatarSubmit:document.forms.avatar.querySelector(".popup__button-save"),avatarInputList:Array.from(document.forms.avatar.querySelectorAll(".popup__input")),avatarInput:document.forms.avatar.querySelector(".popup__input"),avatarForm:document.forms.avatar,createPlace:document.forms.place,createPlaceInputList:Array.from(document.forms.place.querySelectorAll(".popup__input")),createPlaceSubmit:document.forms.place.querySelector(".popup__button-save"),placeInputTitle:document.forms.place.elements.title,placeInputLink:document.forms.place.elements.link,editProfile:document.querySelector(".profile__edit-button"),editProfileSubmit:document.forms.profile.querySelector(".popup__button-save"),profileInputList:Array.from(document.forms.profile.querySelectorAll(".popup__input")),profileInputName:document.forms.profile.elements.name,profileInputJob:document.forms.profile.elements.job,inputErrorClass:"popup__input_type_error",saveProfile:document.forms.profile,profileTitle:document.querySelector(".profile__title"),profileSubTitle:document.querySelector(".profile__subtitle"),profileAvatar:document.querySelector(".profile__avatar"),addPlace:document.querySelector(".profile__add-button"),deleteConfirmButton:document.querySelector(".popup__button-save_type_confirm"),likesCounter:".element__likes-counter",userId:"",cardForRemove:{}},t=function(t){t.classList.add(e.popupOpened),document.addEventListener("keydown",o),document.addEventListener("click",a)},r=function(t){t.classList.remove(e.popupOpened),document.removeEventListener("keydown",o),document.removeEventListener("click",a)},o=function(t){if("Escape"===t.key){var n=document.querySelector(".".concat(e.popupOpened));r(n)}},a=function(e){e.target.classList.contains("popup")&&r(e.target)},c={baseUrl:"https://nomoreparties.co/v1/plus-cohort-3",headers:{authorization:"404cf7e6-f742-45c3-8054-e5f1c388edbf","Content-Type":"application/json"}},i=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status+" - "+e.statusText))},u=function(e,t){return fetch("".concat(c.baseUrl,"/cards/likes/").concat(e),{method:t,headers:c.headers}).then(i)},l=function(t,n,r){var o=n.querySelector(e.likesCounter),a=n.querySelector(e.cardLike);o.textContent=t.likes.length.toString(),t.likes.some((function(t){return t._id==e.userId}))?(a.classList.add(e.cardLikeActive),r&&u(t._id,"DELETE").then((function(n){r.target.classList.remove(e.cardLikeActive),o.textContent=n.likes.length.toString(),t.likes=n.likes})).catch((function(e){console.log(e)}))):(a.classList.remove(e.cardLikeActive),r&&u(t._id,"PUT").then((function(n){r.target.classList.add(e.cardLikeActive),o.textContent=n.likes.length.toString(),t.likes=n.likes})).catch((function(e){console.log(e)})))},p=function(n){var r=e.cardTemplate.querySelector(e.cardElement).cloneNode(!0),o=r.querySelector(e.elementImage),a=r.querySelector(e.cardDelete),c=document.querySelector(".".concat(e.popupImage));return l(n,r),o.src=n.link,o.alt=n.name,o.addEventListener("click",(function(){var r=e.image;r.src=n.link,r.alt=n.name,e.popupPictureCaption.textContent=n.name,t(c)})),r.querySelector(e.cardTitle).textContent=n.name,n.owner._id!=e.userId&&(a.style.display="none"),a.addEventListener("click",(function(r){r.target.parentElement.id=n._id,e.cardForRemove=r.target.parentElement,t(e.popupDeleteConfirm)})),r.querySelector(e.cardLike).addEventListener("click",(function(e){l(n,r,e)})),r},s=function(e){e.forEach((function(e){return d(e)}))},d=function(t){document.querySelector("#".concat(t.name,"-error")).textContent="",t.classList.remove(e.inputErrorClass)},f=function(e,t){!function(e){return e.every((function(e){return e.validity.valid}))}(e)?t.disabled=!0:t.disabled=!1};function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}new URL(n(193),n.b),new URL(n(377),n.b),new URL(n(123),n.b),new URL(n(562),n.b),new URL(n(988),n.b),new URL(n(349),n.b),new URL(n(889),n.b),new URL(n(214),n.b),new URL(n(965),n.b);var v=document.querySelector(".".concat(e.popupCardAdd)),y=document.querySelector(".".concat(e.popupProfile)),b=document.querySelector(".".concat(e.popupAvatar)),_=Array.from(document.querySelectorAll(".".concat(e.popupCloseBtn)));e.editProfile.addEventListener("click",(function(){s(e.profileInputList),e.profileInputName.value=e.profileTitle.textContent,e.profileInputJob.value=e.profileSubTitle.textContent,t(y),f(e.profileInputList,e.editProfileSubmit)})),e.addPlace.addEventListener("click",(function(){s(e.createPlaceInputList),t(v),f(e.createPlaceInputList,e.createPlaceSubmit)})),e.profileAvatar.addEventListener("click",(function(){s(e.avatarInputList),t(b),f(e.avatarInputList,e.avatarSubmit)})),_.forEach((function(e){return e.addEventListener("click",(function(e){r(e.target.closest(".popup"))}))})),e.deleteConfirmButton.addEventListener("click",(function(){var t;(t=e.cardForRemove.id,fetch("".concat(c.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:c.headers}).then(i)).then((function(){e.cardForRemove.remove(),r(e.popupDeleteConfirm)})).catch((function(e){console.log(e)}))})),e.saveProfile.addEventListener("submit",(function(t){var n,o;t.preventDefault(),e.editProfileSubmit.textContent="Сохранение...",(n=e.profileInputName.value,o=e.profileInputJob.value,fetch("".concat(c.baseUrl,"/users/me"),{method:"PATCH",headers:c.headers,body:JSON.stringify({name:n,about:o})}).then(i)).then((function(){e.profileTitle.textContent=e.profileInputName.value,e.profileSubTitle.textContent=e.profileInputJob.value,r(y)})).finally((function(){return e.editProfileSubmit.textContent="Сохранить"})).catch((function(e){console.log(e)}))})),e.avatarForm.addEventListener("submit",(function(t){var n;t.preventDefault(),e.avatarSubmit.textContent="Сохранение...",(n=e.avatarInput.value,fetch("".concat(c.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:c.headers,body:JSON.stringify({avatar:n})}).then(i)).then((function(t){e.profileAvatar.style.backgroundImage="url(".concat(t.avatar,")"),e.avatarInput.value="",r(b)})).finally((function(){e.avatarSubmit.textContent="Сохранить"})).catch((function(e){console.log(e)}))})),e.createPlace.addEventListener("submit",(function(t){var n,o,a;t.preventDefault(),e.createPlaceSubmit.textContent="Создание...",(a={}).name=e.placeInputTitle.value,a.link=e.placeInputLink.value,(n=a.name,o=a.link,fetch("".concat(c.baseUrl,"/cards"),{method:"POST",headers:c.headers,body:JSON.stringify({name:n,link:o})}).then(i)).then((function(t){e.cardsContainer.prepend(p(t)),r(v),e.createPlace.reset()})).finally((function(){return e.createPlaceSubmit.textContent="Создать"})).catch((function(e){console.log(e)}))})),Promise.all([fetch("".concat(c.baseUrl,"/users/me"),{headers:c.headers}).then(i),fetch("".concat(c.baseUrl,"/cards"),{headers:c.headers}).then(i)]).then((function(t){var n,r,o,a,c=(a=2,function(e){if(Array.isArray(e))return e}(o=t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a=[],c=!0,i=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(a.push(r.value),!t||a.length!==t);c=!0);}catch(e){i=!0,o=e}finally{try{c||null==n.return||n.return()}finally{if(i)throw o}}return a}}(o,a)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(e,t):void 0}}(o,a)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=c[0],u=c[1];e.profileTitle.textContent=i.name,e.profileSubTitle.textContent=i.about,e.profileAvatar.style.backgroundImage="url(".concat(i.avatar,")"),e.userId=i._id,n=u,r=e.cardsContainer,n.forEach((function(e){return r.append(p(e))}))})).catch((function(e){console.log(e)})),Array.from(document.forms).forEach((function(t){var n,r,o=Array.from(t.elements).filter((function(e){return"submit"==e.type})).pop();n=Array.from(t.elements).filter((function(e){return"submit"!=e.type})),r=o,n.forEach((function(t){t.addEventListener("input",(function(){(function(t){t.validity.valid?d(t):function(t){document.querySelector("#".concat(t.name,"-error")).textContent=t.validationMessage,t.classList.add(e.inputErrorClass)}(t)})(t),f(n,r)}))}))}))})()})();