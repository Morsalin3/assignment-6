const loadCatergories = () => {
    // const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCategoris(data.data.news_category))
}

const displayCategoris = categories =>{
    const allCategories = document.getElementById('categoris-container')
    categories.forEach(categorie => {
        // console.log(categorie);
        const categoriesUl = document.createElement('ul');
        categoriesUl.innerHTML =`
        <li onclick="loadCatergoriesDetail('${categorie.category_id}')">${categorie.category_name }</li>
        `;
        allCategories.appendChild(categoriesUl);

    });
}

const loadCatergoriesDetail = (category_id) =>{
    const url =`https://openapi.programming-hero.com/api/news/category/${category_id}`
    // console.log(category_id)
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayCategoriesDetail(data.data))
}

const displayCategoriesDetail = (categorieDetail) =>{
    // console.log(categorieDetail);
    const detailCategorie = document.getElementById('detail-categorie');
    detailCategorie.innerHTML= ''
    categorieDetail.forEach(categorie => {
        console.log(categorie);
    const detailCategorieDiv = document.createElement('card');
    detailCategorieDiv.innerHTML = `
    <div class="row g-0 mb-3">
        <div class="col-4">
        <img src="${categorie.thumbnail_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-8">
            <div class="card-body">
            <h5 class="card-title py-3">${categorie.title.length > 100 ? 
                categorie.title.slice(0 , 100) + '...' : categorie.title}</h5>
                        <p>${categorie.details}</p>
                    <div class=" d-flex justify-content-around ">
                        <div  class=" d-flex align-items-center">
                        <img src="${categorie.author.img}" class="img-fluid rounded-circle" style="width:10%">
                        <h5 class="px-1">${categorie.author.name ? categorie.author.name : 'not found' }</h5>
                        </div>
                        <div class="d-flex align-items-center  ">
                        <i class="fa-regular fa-eye mx-1"></i> ${categorie.total_view}M
                        </div>
                        <button>Detail</button>
                    </div>
            </div>
        </div>
    </div>
    `;
    detailCategorie.appendChild(detailCategorieDiv);
    });
}

loadCatergories();