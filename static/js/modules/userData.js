

(function() {
  const noop = () => {};


  class User {
  // eslint-disable-next-line
  #userData = {};

#setUserProfile(data) {
    this.#userData = Object();
    this.#userData.id=data.id;
    this.#userData.firstName=data.name;
    this.#userData.age = data.age;
    this.#userData.text = data.description;
    this.#userData.photoSrc = data.imgSrc;
    this.#userData.tags = data.tags;
  }

getUserData() {
  return this.#userData;
}

loginWithCookie(callback=noop) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };


  fetch(`${serverAddress}/api/v1/currentuser`, requestOptions)
      .then((response) =>
        response.json().then((data) => ({
          data: data,
          status: response.status,
        })).then((res) => {
          if (res.status === 200 && res.data.status === 200) {
            this.#setUserProfile(res.data.body);

            window.Feed.getNextUser(this.#userData.id);


            // !!! cring


            setTimeout(callback, 10);
            // swipeUser(user.id)
            // userProfileRender();
          }
        // if (res.data.status === 'ok') {
        //     profilePage();
        // }
        // console.log(res.data.status)
        })).catch((error) => console.log(error));
}

loginWithCredentials(email, password, callback=noop) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'email': email,
      'password': password,
    }),
    credentials: 'include',
  };
  fetch(`${serverAddress}/api/v1/login`, requestOptions)
      .then((response) =>
        response.json().then((data) => ({
          data: data,
          status: response.status,
        })).then((res) => {
          if (res.status === 200 && res.data.status === 200) {
            this.loginWithCookie(callback);
          } else if (res.data.status === 404) {

            // loginPageError("User not found")
          }
        })).catch((error) => console.log(error));
}


logoutCookie(callback=noop) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  fetch(`${serverAddress}/api/v1/logout`, requestOptions).then((response) => {
    callback();
  },
  );
}
  }
  window.User = new User();
})();
