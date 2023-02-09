export function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

export function categoriesAlgo(categories) {
  const result = [];
  const map = {};
  for (const category of categories) {
    map[category.id] = category;
    category.children = [];
  }
  for (const category of categories) {
    if (category.parent_id) {
      map[category.parent_id].children.push(category);
    } 
    else {
      // result.push(category);
      category.parent = true;
    }
    result.push(category);
  }
  return result;
}


export function removeRepeatItems(array) {
  const result = [];
  const hash = {};
  
  for(let i = 0;i < array.length;i++) {
      const item = array[i].product.id;
      if(hash[item] !== undefined) {
          result[hash[item]].quantity += array[i].quantity;
          continue;
      }
      hash[item] = i;
      result.push(array[i]);  
  }
  return result;
}