import { createSection, createSelect } from "./builder.js";
import fetchRequest from "./fetchRequest.js";
import preload from "./preload.js";
const searchInput = document.querySelector(".search-form__input");
const searchForm = document.querySelector(".search-form");
const searchSelect = document.querySelector(".header-select");
const containerHeader = document.querySelector(".container_header");
const main = document.querySelector("main");
let searchUrl;

const init = () => {
  preload.show();
  return Promise.all([
    fetchRequest("sources", {
      callback: createSelect,
      headers: {
        "X-Api-Key": "67164dae14734d42a0017a394b3f6f6f",
      },
    }),
    fetchRequest(`top-headlines?country=ru`, {
      callback: createSection,
      title: "Сежие новости",
      sectionClass: "hot-news",
      amountOfNews: 8,
      headers: {
        "X-Api-Key": "67164dae14734d42a0017a394b3f6f6f",
      },
    }),
  ]);
};
init().then((data) => {
  preload.remove();
  containerHeader.append(data[0]);
  document.querySelector(".main").append(data[1]);
});

const searchrender = () => {
  preload.show();
  return Promise.all([
    fetchRequest(searchUrl, {
      callback: createSection,
      title: `Результаты поиска по запросу ' ${searchInput.value} '`,
      amountOfNews: 8,
      sectionClass: "search-news",
      headers: {
        "X-Api-Key": "67164dae14734d42a0017a394b3f6f6f",
      },
    }),
    fetchRequest("top-headlines?country=ru", {
      callback: createSection,
      title: "Сежие новости",
      sectionClass: "hot-news",
      amountOfNews: 4,
      headers: {
        "X-Api-Key": "67164dae14734d42a0017a394b3f6f6f",
      },
    }),
  ]);
};
searchInput.addEventListener("change", () => {
  if (searchInput.value === "") {
    const sections = document.querySelectorAll(".section");
    sections.forEach((item) => {
      item.remove();
    });
    init().then((data) => {
      preload.remove();
      document.querySelector(".main").append(data[1]);
    });
  }
});
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchUrl = `everything?q=(${searchInput.value})`;
  const sections = document.querySelectorAll(".section");
  sections.forEach((item) => {
    item.remove();
  });
  searchrender().then((data) => {
    preload.remove();
    main.prepend(data[0]);
    main.append(data[1]);
  });
});
