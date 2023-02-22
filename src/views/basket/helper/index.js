export function findRegion(countries, defaultUserMap) {
    if(!defaultUserMap) return {};
    for(let i = 1;i <= 14;i++) {
      const country = countries[i];
      for(let j = 0;j < country.length;j++) {
        const town = country[j];
        if(town.name == defaultUserMap.town) {
          return countries.country.find((item) => item.id == i);
        }
      }
    }
    return {};
}