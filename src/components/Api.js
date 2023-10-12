class Api {
    constructor(options) {
      // constructor body
    }
  
    getInitialCards() {
      // ...
    }
  
    // other methods for working with the API
  }
  
  const api = new Api({
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    headers: {
      authorization: "4a9aa088-debb-4c5e-aefd-b138d89f6573",
      "Content-Type": "application/json"
    }
})
.then(res => {
  if (res.ok) {
    return res.json();
  }
  // if the server returns an error, reject the promise
  return Promise.reject(`Error: ${res.status}`);
  }); 
 