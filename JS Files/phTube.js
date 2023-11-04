let requestData = [];
let categoryId = null;
let sortButtonState = false;
// let isActiveSort = false;
let activeButton = null;
let allCategoryButton = null;
let flag = 0;

const categoryShow = async (sortMode = false) => {

    const request = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await request.json();
    const categories = data.data;


    const categoriesContainer = document.getElementById("categoriesContainerLaptopView");
    const categoriesContainerMobileView = document.getElementById("categoriesContainerMobileView");
    categoriesContainer.innerHTML = "";
    categoriesContainerMobileView.innerHTML = "";

    categories.forEach(EachCategory => {
        // console.log(EachCategory.category);

        const addCategoryTab = document.createElement("div");
        // addCategoryTab.classList.add("w-full")
        addCategoryTab.innerHTML = `
             <button id="category-${EachCategory.category}" onclick="toggleActive(this,'category-${EachCategory.category}'); RestSortBtn(); ShowCategoryWise('${EachCategory.category_id}', ${sortMode});"
                class="category-${EachCategory.category} categoryBtn w-full py-2 px-5 rounded text-[18px] font-medium text-[#252525] bg-[#25252533] md:w-fit">${EachCategory.category}</button>
            `;


        categoriesContainer.appendChild(addCategoryTab)

        // I create two view for diffrent screen
        const addCategoryTabOne = addCategoryTab.cloneNode(true);

        categoriesContainerMobileView.appendChild(addCategoryTabOne);
    });

    if (flag == 0) {
        let buttons = document.querySelectorAll(".category-All");
        allCategoryButton = buttons;
        if (buttons) {
            buttons.forEach(buttonClick => {
                // console.log(buttonClick);
                buttonClick.classList.add("active");
                flag += 1;
                // activeButton = AllButton;
                // buttonClick.click();
            });

            console.log("Clicked all categories");
        } else {
            console.log("Not Clicked all categories");
        }

    }


};

// remove aphabates from a string

function extractNumericValue(views) {
    // Remove any non-numeric characters (like "K") and parse as an integer
    return parseInt(views.replace(/[^0-9]/g, ''), 10);
}


const ShowCategoryWise = async (categoryID, sortMode) => {
    console.log(categoryID, sortMode)

    categoryId = categoryID
    const request = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryID}`)
    requestData = (await request.json()).data

    if (sortMode) {
        if (requestData.length > 0) {
            forSorted = requestData;

            forSorted.sort((b, a) => extractNumericValue(a.others?.views) - extractNumericValue(b.others?.views));

            // requestData = newData; const newData =
        }
    }

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



const RestSortBtn = () => {
    sortButtonState = false;
    const SortButton = document.getElementById("btnSort");
    SortButton.classList.remove("active");
};

const isSorted = async () => {
    console.log('Calling isSorted');
    const SortButton = document.getElementById("btnSort");
    if (sortButtonState == false) {
        sortButtonState = true;
        const result = await ShowCategoryWise(categoryId, sortButtonState)
        SortButton.classList.add("active");
        console.log("result");
    } else {
        sortButtonState = false;
        SortButton.classList.remove("active");
        const result = await ShowCategoryWise(categoryId, sortButtonState)

    }
    // categoryShow(sortButtonState);
    // console.log(requestData);

};

// For Catagory button colored

function toggleActive(clickedButton, categoryBtnID) {


    const clickBtn = document.getElementById(categoryBtnID);
    console.log("Button click: ", clickedButton.id);
    console.log("Button click Privious: ", clickBtn.id);

    allCategoryButton.forEach(eachButton => {
        eachButton.classList.remove("active");
    });

    if (activeButton) {
        // console.log(activeButton);
        activeButton.classList.remove("active");
    }
    clickedButton.classList.add("active");
    activeButton = clickedButton;
}


// console.log(sortButtonState);

categoryShow();
ShowCategoryWise(1000, sortButtonState);



