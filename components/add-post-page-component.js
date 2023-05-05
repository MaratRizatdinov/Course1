import {renderHeaderComponent} from "./header-component.js";
import {renderUploadImageComponent} from "./upload-image-component.js";
  


export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
    const render = () => {
      // TODO: Реализовать страницу добавления поста
      
      const appHtml = `
      <div class="page-container">
        <div class="header-container"></div>
        <div class="form">
          <h3 class="form-title">Добавить пост</h3>
          <div class="form-inputs">
              <div class="upload-image-container">
                  
              </div>
              <label>
                  Опишите фотографию:
                  <textarea class="input textarea" rows="4"></textarea>
              </label>
              <button class="button" id="add-button">Добавить</button>
          </div>
      </div>
      
      
      


     `;
    

      appEl.innerHTML = appHtml;    
    
      renderHeaderComponent({
        element: document.querySelector(".header-container"),
      });

      renderUploadImageComponent({
        element: document.querySelector(".upload-image-container"),
      });

      document.getElementById("add-button").addEventListener("click", () => {
          
        if(document.querySelector('.textarea').value==''){
            alert('Не заполнено описание фото');
            return;
          }
          if(document.querySelector('.file-upload-image')==null){
            alert('Не указано фото');
            return;
          }
          document.querySelector('.textarea').value = document.querySelector('.textarea').value.replaceAll("&", "&amp;")
              .replaceAll("<", "&lt;").replaceAll(">", "&gt;");
        
          onAddPostClick({
            description: document.querySelector('.textarea').value,
            imageUrl: document.querySelector('.file-upload-image').src,
          });
        });
     };

  render();
  
}


