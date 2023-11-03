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
    const requestData = (await request.json()).data


    const dataVisualizationContainer = document.getElementById("dataVisualizationContainer");
    const noDataSpace = document.getElementById("noDataSpace");

    dataVisualizationContainer.innerHTML = "";

    if (requestData.length != 0) {

        noDataSpace.classList.add("hidden");

        requestData.forEach(content => {
            const elementToDisplay = document.createElement("div");
            elementToDisplay.innerHTML = `
        
        <div class="">
        <figure><img class="w-[312px] h-[200px] rounded-lg"  src="${content.thumbnail}" alt="Shoes" /></figure>
        <div class="flex gap-3 mt-5">
            <div class="avatar">
                <div class="w-10 h-10 rounded-full">
                    <img src="${content?.authors[0]?.profile_picture}" />
                </div>
            </div>
            <div>
                <h2 class="text-[#171717] font-bold">
                   ${content.title}
                    
                </h2>
                <p class="text-[#111111B3] font-normal mt-2 text-[14px]">${content?.authors[0]?.profile_name}${!(content?.authors[0]?.verified) ? "" : '<i class="fa-solid fa-circle-check pl-2" style="color: #005eff;"></i>'}</p>
                <p class="text-[#111111B3] font-normal mt-2 text-[14px]">${content?.others?.views && content?.others?.views !== "0" ? content?.others?.views : "No views"} views</p>
            </div>
        </div>
    </div>

        `;
            dataVisualizationContainer.appendChild(elementToDisplay);
        });

    } else {

        const elementToDisplay = document.createElement("div");
        noDataSpace.classList.remove("hidden");
        noDataSpace.innerHTML = "";
        elementToDisplay.innerHTML = `

            <div class="flex justify-center mt-20">
                <img src="./Icon.png" alt="No_data_Image">
            </div>

            <div class="text-[#171717] font-bold text-3xl text-center mt-8">
                <h1>Oops!! Sorry, There is no <br> content here</h1>
            </div>
        `
        noDataSpace.appendChild(elementToDisplay);
    }

};

categoryShow();