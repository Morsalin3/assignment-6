const loadCatergories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCategoris(data.data.news_category))
    .catch(error => console.log(error));
}

const displayCategoris = categories =>{
    const allCategories = document.getElementById('categoris-container')
    categories.forEach(categorie => {
     // console.log(categorie);
     const categoriesUl = document.createElement('ul');
    categoriesUl.innerHTML =`
    <li id="loader-field" onclick="loadCatergoriesDetail('${categorie.category_id}')">${categorie.category_name }</li>
        `;
        allCategories.appendChild(categoriesUl);

    });
    
}
    



const loadCatergoriesDetail = (category_id) =>{
    toggleSpinner(true)
    const url =`https://openapi.programming-hero.com/api/news/category/${category_id}`
    // console.log(category_id)
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayCategoriesDetail(data.data))
    .catch(error => console.log(error));
}

const displayCategoriesDetail = (categorieDetail) =>{
    toggleSpinner(false);
    // console.log(categorieDetail);
    const detailCategorie = document.getElementById('detail-categorie');
    detailCategorie.innerHTML= ''
    categorieDetail.forEach(categorie => {
        // console.log(categorie);
    const detailCategorieDiv = document.createElement('card');
    detailCategorieDiv.innerHTML = `
    <div class="row g-0 mb-3">
        <div class="col-4">
        <img src="${categorie.thumbnail_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-8">
            <div class="card-body">
            <h5 class="card-title py-3">${categorie.title}</h5>
                        <p>${categorie.details.length > 500 ? categorie.details.slice(0 , 500) + '...' : categorie.details}</p>
                    <div class=" d-flex justify-content-between ">
                        <div  class=" d-flex align-items-center w-25">
                        <img src="${categorie.author.img}" class="img-fluid rounded-circle d-inline" style="width:25%">
                        <h5 class="px-1 d-inline">${categorie.author.name ? categorie.author.name : 'Not Data Found' }</h5>
                        </div>
                        <div class="d-flex align-items-center  ">
                        <i class="fa-regular fa-eye mx-1"></i> ${categorie.total_view ? categorie.total_view : 'No Data Found'}M
                        </div>
                        <button onclick="loadCategoryDetails('${categorie._id}')" href="#" class="btn px-3 rounded" data-bs-toggle="modal" data-bs-target="#categoryDetailModal">Show Details</button>

                    </div>
            </div>
        </div>
    </div>
    `;
    detailCategorie.appendChild(detailCategorieDiv);
    });
    
}

//    toggle spinner section 
const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
}


        // Modal Details here 
const loadCategoryDetails = async news_id =>{
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategoryDetails(data.data[0]);
}

const displayCategoryDetails = category =>{
    // console.log(category);
    const modalTitle = document.getElementById('categoryDetailModalLabel');
    modalTitle.innerText = category.title;
    const categoryDetails = document.getElementById('category-details');
    categoryDetails.innerHTML = `
    <p>Name:${category.author.name ? category.author.name : 'No Data Found'}</p>
    <p>Published Date:${category.author.published_date}</p>
    <p>Total View:<i class="fa-regular fa-eye mx-1"></i> ${category.total_view ? category.total_view : 'No Data Found'}M</p>
   

    `;
}

loadCatergories();