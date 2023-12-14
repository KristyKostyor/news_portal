import { createSection } from "./builder.js";
import { createCountryName } from "./createCountries.js";
import fetchRequest from "./fetchRequest.js";

export const getCurrentNews = (country) => {
  const currentCountryFyllName = createCountryName(country);
  return Promise.all([
    fetchRequest(`top-headlines?country=${country}`, {
      callback: createSection,
      title: `Свежие новости в стране ${currentCountryFyllName}`,
      amountOfNews: 8,
      sectionClass: "hot-news",
      headers: {
        "X-Api-Key": "67164dae14734d42a0017a394b3f6f6f",
      },
    }),
  ]);
};
