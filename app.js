const container = document.querySelector('.main');
const displayBtnsContainer = document.querySelector(".displayButtons-container");
const currentBtn = document.querySelector(".currentbtn");
const clearBtn = document.querySelector('.clear-btn')

//fetch data

let response = await fetch("/data.json");
let jobsData = await response.json();




    // function to display all users
function displayUser (usersArr){
  return  usersArr.map(function(item){
            let featured = ""
            let newUsr = ""
            let styles = ""
            if(item.featured){
                featured = `<span class="featured">featured</span>`;

                styles = `border-left: 4px solid hsl(180, 29%, 50%);`;   
                }

            if(item.new) {
             newUsr = `<span class="new"> new</span>`
             }
        return `
        <div class="current-user-container" style = "${styles}">
              <div class="user-detail">
                 <img class="user-img" alt="user" src="${item.logo}">
              <div class="user-info">
              <div>
                <h5 class= "user-name">${item.company}
                 <div class= "spans">
                    ${featured}
                    ${newUsr}
                 </div>
                </h5>
                
              </div>

              <h4>
               ${item.position}
              </h4>
          
              <div class="user-footer">
                <p>${item.postedAt}</p>
                <ul>
                  <li>${item.role}</li>
                  <li>${item.location}</li>
                </ul>
              </div>
           </div>

          </div>
        <div class="btns-container">
          <button class="user-btn role" data-id ="${item.role}">
          ${item.role}
          </button>
          <button class="user-btn level" data-id ="${item.level}">
          ${item.level}
          </button>
          
          ${item.tools.map(function(item){
            return  `<button class="user-btn tools" data-id ="${item}">
            ${item}
            </button>`
           
          }).join('')}

          ${item.languages.map(function(item){
            return  `<button class="user-btn languages" data-id ="${item}">
            ${item}
            </button>`
           
          }).join('')}

        </div>

      </div>
`
    })
};



let users = displayUser(jobsData)

function displayUserFunc(item){

container.innerHTML = item
}
displayUserFunc(users)
  
//filter functionality

let toggleJobsArr 
let currentFilteredArr = []

  let  filter = ()=>{
    toggleJobsArr = [...jobsData]
      const userBtns = [...container.querySelectorAll('.user-btn')];
    userBtns.forEach(btn => {
     
        btn.addEventListener('click' , (e)=>{
          let category = e.currentTarget.dataset.id
          showFiltered(category)}) 
  
  })};

    //function to show filtered jobs
  const showFiltered = (category)=>{

        if(category){  if(!currentFilteredArr.includes(category)){
            currentFilteredArr.push(category)
          }}

       currentFilteredArr.forEach(element => {

        toggleJobsArr = toggleJobsArr.filter((item)=>{
        if((item.role === element) ||
          (item.languages.includes(element))|| 
          (item.tools.includes(element)) ||
          (item.level.includes(element)))
         {
          return item
         }
        });

     });
       
     users = displayUser(toggleJobsArr)
          displayUserFunc(users)
           showCurrButton()
    
          };

  

window.addEventListener('click' , filter)

  //function to show active filters

 function showCurrButton(){
  let newBtn = currentFilteredArr.map(item => {
  
    return `
      <button class="user-btn close" data-id= ${item} >
         ${item} 
      <span class="icon-remove">
        <img src="./images/icon-remove.svg">
       </span>
     </button>`
    
      }).join('')

    currentBtn.innerHTML = newBtn  
    if(currentBtn.children.length){
     displayBtnsContainer.style.display = "flex"}
    
     else {
    displayBtnsContainer.style.display = ''
    }
  
 };
  
  //function to remove current filter on click
    const removeFilter = (e)=>{
  let btn = e.target.parentElement
    let category =  btn.parentElement.dataset.id

      //reomve from current categories
    if(btn.classList.contains('icon-remove')){

     currentFilteredArr = currentFilteredArr.filter((item)=>{
       if(item !== category){
        return item
       }
     })
     toggleJobsArr = [...jobsData]
     category = undefined
     showFiltered(category)
   
      
        }};

displayBtnsContainer.addEventListener('click' , removeFilter);




 // set back to defalut 
clearBtn.addEventListener('click' , ()=>{


        [...currentBtn.children].forEach(element => {
          element.remove()

          users = displayUser(jobsData)
          displayUserFunc(users)
          toggleJobsArr = []
          currentFilteredArr= []
          
    if(currentBtn.children.length){
      displayBtnsContainer.style.display =
      "flex"
    }
    else {
      displayBtnsContainer.style.display = ''
    }
          
        })
 });