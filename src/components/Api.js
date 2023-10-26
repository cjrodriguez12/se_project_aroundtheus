 class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "2e65c592-5cc5-4cb0-a6bf-23fa612e6f57"
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
      });
    }
    // refactor duplicate code i.e authorization and fetch
  loadInfo() {
  return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
  headers: {
    authorization:"2e65c592-5cc5-4cb0-a6bf-23fa612e6f57"
  }
})
  .then(res =>{
     if (res.ok){
      return res.json();
     } 
  })
  }
}

export const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "2e65c592-5cc5-4cb0-a6bf-23fa612e6f57",
    "Content-Type": "application/json"
  }
}); 
