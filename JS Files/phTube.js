const categoryShow = async () => {
    const request = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await request.json();
    const categories = data.data;


    const categoriesContainer = document.getElementById("categoriesContainerTwo");
    const categoriesContainerOne = document.getElementById("categoriesContainerOne");
    categoriesContainer.innerHTML = "";

    categories.forEach(EachCategory => {
        // console.log(EachCategory.category);

        const addCategoryTab = document.createElement("div");
        // addCategoryTab.classList.add("w-full")
        addCategoryTab.innerHTML = `
        
        <button onclick="ShowCategoryWise('${EachCategory.category_id}')"  class=" w-full py-2 px-5 rounded text-[18px] font-medium text-[#252525] bg-[#25252533] md:w-fit">${EachCategory.category}</button>

        `;

        categoriesContainer.appendChild(addCategoryTab)

        // I create two view for diffrent screen
        const addCategoryTabOne = addCategoryTab.cloneNode(true);
        categoriesContainerOne.appendChild(addCategoryTabOne);
    });



};

const ShowCategoryWise = async (categoryID) => {
    console.log(categoryID)
    const request = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryID}`)
    const requestData = await request.json();
    console.log(requestData.data);

};

categoryShow();