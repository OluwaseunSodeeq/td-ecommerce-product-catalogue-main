// ==================================
// 0. Declaration of varaiables
// ==================================
const link = document.querySelector(".link");
const hamburger = document.querySelector(".hamburger");
const tabsizeMediaQuery = window.matchMedia("(max-width: 768px)");
let whenActive = false;

// ==================================
// 1. Toggle humbugger menu;
// By default, the .link tag should
// display none.
// ==================================
const navMenunsFunction = (none) => {
  link.style.display = none;
};
if (tabsizeMediaQuery.matches) {
  navMenunsFunction("none");
}
window.addEventListener("resize", () => {
  if (tabsizeMediaQuery.matches) {
    navMenunsFunction("none");
  } else {
    navMenunsFunction("flex");
  }
});
const togglefunction = () => {
  if (whenActive === false) {
    navMenunsFunction("flex");
    whenActive = true;
  } else {
    navMenunsFunction("none");
    whenActive = false;
  }
};
hamburger.addEventListener("click", togglefunction);

//***************** Later things*************
//window.addEventListener("resize", checkForWindowResize);
//(window.outerWidth <= 768)
// (window.innerWidth <= 768)
// (screen.width > 250 && screen.width <= 768)

// ==================================
// 2. Display products based on
// All, Men or Female categories.
// ==================================
let babiesParentElement = document.querySelector(".card_row");
let babiesDiv = document.createElement("div");
let babiesText = document.createTextNode("item not found!");

const productTab = document.querySelectorAll('[name = "tabset"]');
const catalogue = document.querySelectorAll(".catalogue");
const classTag = document.querySelectorAll(".tag");

const errorContentFuntion = (y) => {
  babiesDiv.append(babiesText);
  babiesDiv.classList.add("babiesStyle");
  babiesParentElement.append(babiesDiv);
  babiesDiv.style.display = y;
};

productTab.forEach((element) => {
  element.addEventListener("change", (e) => {
    if (e.target.id === "tab1") {
      classTag.forEach((item) => {
        item.parentNode.parentNode.parentNode.style.display = "block";
        errorContentFuntion("none");
      });
    } else if (e.target.id === "tab2") {
      classTag.forEach((item) => {
        if (item.innerText === "Men") {
          item.parentNode.parentNode.parentNode.style.display = "block";
          errorContentFuntion("none");
        } else {
          item.parentNode.parentNode.parentNode.style.display = "none";
        }
      });
    } else if (e.target.id === "tab3") {
      classTag.forEach((item) => {
        if (item.innerText === "Female") {
          item.parentNode.parentNode.parentNode.style.display = "block";
          errorContentFuntion("none");
        } else {
          item.parentNode.parentNode.parentNode.style.display = "none";
        }
      });
    } else if (e.target.id === "tab4") {
      classTag.forEach((item) => {
        if (item.innerText === "Babies") {
          item.parentNode.parentNode.parentNode.style.display = "block";
          document.addEventListener("click", () => {
            babiesParentElement.removeChild(babiesDiv);
            babiesText.textContent = "item not found!";
            babiesDiv.classList.remove("babiesStyle");
          });
          //
        } else {
          item.parentNode.parentNode.parentNode.style.display = "none";
        }
      });
      errorContentFuntion("block");
    }
  });
});

// ==================================
// 2. Display products based on
// search keywords in the input fields.
// ==================================
let ifInputFound = false;
let ifInputNotFound = false;
///////////////conversion of Nodelist to Array ////////
//const catalogueArray = Array.prototype.slice.call(catalogue);
const catalogueArray = [].slice.call(catalogue); //
//const catalogueArray = Array.from(catalogue);

const search = document.querySelector(".search_product");
const searchFunction = (userInputs) => {
  catalogueArray.forEach((card) => {
    card.style.display = "none";

    const cardContainer = card.children[0].innerText.toLowerCase();
    const cardTitle = card.children[0].children[2].innerHTML.toLowerCase();

    const tagPiece =
      card.children[0].children[3].children[1].innerHTML.toLowerCase();

    if (cardTitle.includes(userInputs)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
  const errorAlertFunction = () => {
    ifInputNotFound = catalogueArray.every(
      (card) => card.style.display === "none"
    );
    ifInputFound = catalogueArray.some((card) => card.style.display === "flex");
    if (ifInputNotFound) {
      errorContentFuntion("block");
    } else if (ifInputFound) {
      errorContentFuntion("none");
    } else {
      errorContentFuntion("none");
    }
  };
  errorAlertFunction();
};

search.addEventListener("input", (e) => {
  searchFunction(e.target.value.toLowerCase());
});
