import { data } from "autoprefixer";

export class Api {
  constructor() {
    // constructor body
    this._baseUrl = 'https://around-api.en.tripleten-services.com/v1'
  }
  //load cards from server
  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "2e65c592-5cc5-4cb0-a6bf-23fa612e6f57",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  // refactor duplicate code i.e authorization and fetch
  getCardsById(id){
    return fetch(`${this._baseUrl}/cards/${id}`);
  }
  //load info from server
  loadInfo() {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      headers: {
        authorization: "2e65c592-5cc5-4cb0-a6bf-23fa612e6f57",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }
  //editing profile
  updateInfo(modalInputs) {
    const { title, description } = modalInputs;
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "PATCH",
      headers: {
        authorization: "2e65c592-5cc5-4cb0-a6bf-23fa612e6f57",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: title,
        about: description,
      }),
    }).then((res) => {
      if (res.ok) {
        return res;
      }
    });
  }
  postCards(modalInputs) {
    const { place, Url } = modalInputs;
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "POST",
      headers: {
        authorization: "2e65c592-5cc5-4cb0-a6bf-23fa612e6f57",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: place,
        link: Url
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }
  deleteCards(id){
    /// grab id from card-send id to this api call-delete card from html 
     return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: "2e65c592-5cc5-4cb0-a6bf-23fa612e6f57",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    }); 
  }
  notLiked(id){
    /// grab id from card-send id to this api toggle like
     return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: "2e65c592-5cc5-4cb0-a6bf-23fa612e6f57",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    }); 
  }
  toLike(id){
    /// grab id from card-send id to this api call toggle like
     return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        authorization: "2e65c592-5cc5-4cb0-a6bf-23fa612e6f57",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    }); 
  }
}

