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

function includesInArrayOfObj(arr, item) {
  for(let i = 0;i < arr.length;i++) {
      if(arr[i].id == item) {
          return i;
      }
  }
  return -1;
}

export function categoriesAlgo(array) {
  const result = [];
    
  for(let i = 0;i < array.length;i++) {
      const index = includesInArrayOfObj(result, array[i].parent_id)
      if(index !== -1) {
        if(result[index].children === undefined) {
          result[index] = {...result[index], children: []}   
        }
        result[index].children.push(array[index]);
        continue;
      }
      result.push(array[i]);
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