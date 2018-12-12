document.cookie = getToken(); //set the cookie equal to access token - this sets a global cookie with accesstoken available everywhere

function getToken() {
  let q = window.location.search;
  let token = q.slice(14);
  console.log(token);
  return token;
}

