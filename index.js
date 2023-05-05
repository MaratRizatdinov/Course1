import { getPosts, addPost, getUserPosts } from "./api.js";
import { renderAddPostPageComponent } from "./components/add-post-page-component.js";
import { renderAuthPageComponent } from "./components/auth-page-component.js";
import {
  ADD_POSTS_PAGE,
  AUTH_PAGE,
  LOADING_PAGE,
  POSTS_PAGE,
  USER_POSTS_PAGE,
} from "./routes.js";
import { renderPostsPageComponent } from "./components/posts-page-component.js";
import { renderLoadingPageComponent } from "./components/loading-page-component.js";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  saveUserToLocalStorage,
} from "./helpers.js";

// Получаем объект пользователя из функции (файл helpers.js ) Значение user || null
//imageUrl: "https://storage.yandexcloud.net/skypro-webdev-homework-bucket/1680591910917-%25C3%2590%25C2%25A1%25C3%2590%25C2%25BD%25C3%2590%25C2%25B8%25C3%2590%25C2%25BC%25C3%2590%25C2%25BE%25C3%2590%25C2%25BA%2520%25C3%2591%25C2%258D%25C3%2590%25C2%25BA%25C3%2591%25C2%2580%25C3%2590%25C2%25B0%25C3%2590%25C2%25BD%25C3%2590%25C2%25B0%25202023-04-04%2520%25C3%2590%25C2%25B2%252014.04.40.png"
// login:"Пята"
// name:"Пятачок"
// password:"Чок"
// token:"3983ek3d43b46g3a43co3c86g3983ek3d43b43do3co3c8"
// _id:"6448e56e883f193fe08181d3"
export let user = getUserFromLocalStorage();

// Присваиваем переменной page значение null
export let page = null; 

// Присваиваем переменной posts значение пустого массива
export let posts = [];

// Функция getToken генерирует строку  в зависимости от значения user
export const getToken = () => {
  const token = user ? `Bearer ${user.token}` : undefined;
  return token;
};
//---------------------------------------------------------------------------------------------------------------------------------------------

// Функция -коллбэк. Используется при нажатии кнопки выйти (вкладка header-components.js)

export const logout = () => {
  //Обнуляет значение переменной user в скрипте
  user = null;
  // вызывает функцию (вкладка helpers.js) - удаление данных из LocalStorage
  removeUserFromLocalStorage();
  // вызывает функцию, которая открывает страничку с постами для неавторизованного пользователя
  goToPage(POSTS_PAGE);
};

//---------------------------------------------------------------------------------------------------------------------------------------------
/**
 * Включает страницу приложения
 * 
 * 
 * 
 * 
 */
export const goToPage = (newPage, data, flag = false) => {
   
  if (
    [
      POSTS_PAGE,
      AUTH_PAGE,
      ADD_POSTS_PAGE,
      USER_POSTS_PAGE,
      LOADING_PAGE,
    ].includes(newPage)
  ) {
    if (newPage === ADD_POSTS_PAGE) {
      // Если пользователь не авторизован, то отправляем его на авторизацию перед добавлением поста
      page = user ? ADD_POSTS_PAGE : AUTH_PAGE;
      return renderApp();
    }

    if (newPage === POSTS_PAGE) {
      if (!flag) page = LOADING_PAGE;
      renderApp();

      return getPosts({ token: getToken() })
        .then((newPosts) => {
          page = POSTS_PAGE;
          posts = newPosts;
          renderApp();
        })
        .catch((error) => {
          console.error(error);
          goToPage(POSTS_PAGE);
        });
    }

    if (newPage === USER_POSTS_PAGE) {
      // TODO: реализовать получение постов юзера из API
      if (!flag) page = LOADING_PAGE;
      console.log("Открываю страницу пользователя: ", data.userId);
      //page = USER_POSTS_PAGE;
      getUserPosts({token:getToken(),
                    id:data.userId})
      .then((newPosts) => {
        posts =newPosts;
        console.log(posts);
        page = USER_POSTS_PAGE;
        renderApp();

      }
        )


      //posts = posts.filter(el=>el.user.id =data.userId);
      //console.log(posts);
      
      return renderApp(data);
    }

    page = newPage;
    flag = false;
    renderApp();

    return;
  }

  throw new Error("страницы не существует");
};

const renderApp = (data) => {
  
  const token = getToken();
  const appEl = document.getElementById("app");
  if (page === LOADING_PAGE) {
    return renderLoadingPageComponent({
      appEl,
      user,
      goToPage,
    });
  }

  if (page === AUTH_PAGE) {
    return renderAuthPageComponent({
      appEl,
      setUser: (newUser) => {
        user = newUser;
        saveUserToLocalStorage(user);
        goToPage(POSTS_PAGE);
      },
      user,
      goToPage,
    });
  }

  if (page === ADD_POSTS_PAGE) {
    return renderAddPostPageComponent({
      appEl: appEl,
      onAddPostClick: function ({ description, imageUrl }) {
        // TODO: реализовать добавление поста в API
        console.log("Добавляю пост...", { description, imageUrl });
        addPost({description, imageUrl, token});
        goToPage(POSTS_PAGE);
      },
    });
  }

  if (page === POSTS_PAGE) {
    return renderPostsPageComponent({
      appEl,
    });
  }

  if (page === USER_POSTS_PAGE) {
    // TODO: реализовать страницу фотографию пользвателя
    
    
    appEl.innerHTML = "Здесь будет страница фотографий пользователя";
    //console.log(page);
    // posts=posts.filter((el)=>{
    //   el.user.id=
    // })
    //posts = posts.filter(el=>el.user.id == data.userId);
    //console.log(posts);
    //console.log(dataset.user);
    //return;
    return renderPostsPageComponent({
      appEl, page
    });
  }
};

goToPage(POSTS_PAGE);
