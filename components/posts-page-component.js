import { USER_POSTS_PAGE, POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, getToken } from "../index.js";
import { likePost } from "../api.js";



export function renderPostsPageComponent({ appEl, page }) {
  // TODO: реализовать рендер постов из api
  //console.log("Актуальный список постов:", posts);
  //console.log(page);
  
  
  
  //console.log("Актуальный список постов:", posts[6].likes.length-1);
  let str ='';
  for(let key of posts){
    //if( page == "user-posts") continue;
    str = str +`<li class="post">
                  <div class="post-header"  

                  ${
                    page=="user-posts"
                    ?
                    `style= "display : none"`
                    :
                    ''
                  }

                  data-user-id="${key.user.id}">
                      <img src="${key.user.imageUrl}" class="post-header__user-image">
                      <p class="post-header__user-name">${key.user.name}</p>
                  </div>
                  <div class="post-image-container">
                    <img class="post-image" src="${key.imageUrl}">
                  </div>
                  <div class="post-likes">
                    <button data-post-id="${key.id}" data-like="${key.isLiked}" class="like-button">
                      ${likeImage(key)}
                    </button>
                    <p class="post-likes-text">
                      Нравится: <strong>${likeText(key)}</strong>
                    </p>
                  </div>
                  <p class="post-text">
                    <span class="user-name">${key.user.name}</span>
                    ${key.description}
                  </p>
                  <p class="post-date">
                  ${key.createdAt}
                  </p>
                </li>`;

    
  }

  function likeText(key){
    if(key.likes.length==0) {
      return '0';
    } else if(key.likes.length==1) {
      return key.likes[0].name;
    } else {
      return key.likes[randomNumber(key.likes.length-1)].name + ' и еще '+ (key.likes.length-1)
    }   ;
  }

  function randomNumber(number) {      
    return Math.floor(Math.random() * (number + 1));
  } 

  function likeImage(key){
    let img;    
    if(key.isLiked){
      img = '<img src="./assets/images/like-active.svg"></img>';
    } else {
      img = '<img src="./assets/images/like-not-active.svg">';
    }
    return img;
  }



  

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */




  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                
              <div class="posts-user-header"
              ${
                page=="user-posts"
                ?
                `style= "display : flex"`
                :
                `style= "display : none"`
              }              
              >
              <img src="
              ${
                page=="user-posts" ? posts[0].user.imageUrl : ''
              } 
              
              
              " class="posts-user-header__user-image">
              <p class="posts-user-header__user-name">
                ${
                  page=="user-posts" ? posts[0].user.name  : ''
                }              
              </p>
              </div>                
                <ul class="posts">                  
                  ${str}
                </ul>
                <br>
              </div>`;




  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }

  
  for (let userEl of document.querySelectorAll(".like-button")) {
    
    userEl.addEventListener("click", () => {

      if(!getToken()) {
        alert('Лайкать посты могут только авторизованные пользователи');
        return;
      } 

      let postToLiked = userEl.dataset.postId;
      let likeStatus = userEl.dataset.like;
      userEl.classList.add('-loading-like');
        
        
      likePost (postToLiked, getToken(), likeStatus)
      .then((result)=> {
        userEl.classList.remove('-loading-like');
        let flag;
        if (page== 'user-posts'){
            goToPage(USER_POSTS_PAGE, {
              userId: result.post.user.id,
            },flag = true );
        } else {
            goToPage(POSTS_PAGE, {
              userId: result.post.user.id,
            },flag = true);
        }
      })
    });
  }
}


