export function saveUserToLocalStorage(user) {
  window.localStorage.setItem("user", JSON.stringify(user));
}
//--------------------------------------------------------------------------
// Функция пытается получить переменную User из LocalStorage. Возвращает user или null
// Используется в index.js(строка 19). 
// * Вопрос - зачем в скобках аргумент user?
//imageUrl: "https://storage.yandexcloud.net/skypro-webdev-homework-bucket/1680591910917-%25C3%2590%25C2%25A1%25C3%2590%25C2%25BD%25C3%2590%25C2%25B8%25C3%2590%25C2%25BC%25C3%2590%25C2%25BE%25C3%2590%25C2%25BA%2520%25C3%2591%25C2%258D%25C3%2590%25C2%25BA%25C3%2591%25C2%2580%25C3%2590%25C2%25B0%25C3%2590%25C2%25BD%25C3%2590%25C2%25B0%25202023-04-04%2520%25C3%2590%25C2%25B2%252014.04.40.png"
// login:"Пята"
// name:"Пятачок"
// password:"Чок"
// token:"3983ek3d43b46g3a43co3c86g3983ek3d43b43do3co3c8"
// _id:"6448e56e883f193fe08181d3"

export function getUserFromLocalStorage(user) {
  try {
    return JSON.parse(window.localStorage.getItem("user"));
  } catch (error) {
    return null;
  }
}
//--------------------------------------------------------------------------
//Функция удаляет из LocalStorage данные user


export function removeUserFromLocalStorage(user) {
  window.localStorage.removeItem("user");
}
