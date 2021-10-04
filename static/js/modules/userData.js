(function() {
  const noop = () => {};

  let csrfToken = document.getElementsByName("gorilla.csrf.Token")[0].value

  class User {
        // eslint-disable-next-line
        _userData = {};

        _setUserProfile(data) {
          this._userData = Object();
          this._userData.id = data.id;
          this._userData.firstName = data.name;
          this._userData.age = data.age;
          this._userData.text = data.description;
          this._userData.photoSrc = data.imgSrc;
          this._userData.tags = data.tags;
        }

        getUserData() {
          return this._userData;
        }

        loginWithCookie(callback = noop) {
          const requestOptions = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          };


          fetch(`${serverAddress}${profileURL}`, requestOptions)
              .then((response) =>
                response.json().then((data) => ({
                  data: data,
                  status: response.status,
                })).then((res) => {
                  if (res.status === 200 && res.data.status === 200) {
                    this._setUserProfile(res.data.body);

                    window.Feed.getNextUser(this._userData.id);


                    // !!! cring


                    setTimeout(callback, 100);
                    // swipeUser(user.id)
                    // userProfileRender();
                  } else if (res.data.status === 404) {
                    // w
                  }
                  // if (res.data.status === 'ok') {
                  //     profilePage();
                  // }
                  // console.log(res.data.status)
                })).catch((error) => console.log(error));
        }

        loginWithCredentials(email, password, callback = noop) {
          console.log(email, password, callback);
          const requestOptions = {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'X-CSRF-Token': csrfToken,
            },
            body: JSON.stringify({
              'email': email,
              'password': password,
            }),
            credentials: 'include',
          };
          fetch(`${serverAddress}${authURL}`, requestOptions)
              .then((response) =>
                response.json().then((data) => ({
                  data: data,
                  status: response.status,
                })).then((res) => {
                  if (res.status === 200 && res.data.status === 200) {
                    this.loginWithCookie(callback);
                  } else if (res.data.status === 404) {


                  }
                })).catch((error) => console.log(error));
        }

        editProfile(name, date, description, tags, callback) {
          const requestOptions = {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-Token': csrfToken,
            },
            body: JSON.stringify({
              'name': name,
              'date': date,
              'description': description,
              'tags': tags,
            }),
            credentials: 'include',
          };
          fetch(`${serverAddress}${profileURL}`, requestOptions)
              .then((response) =>
                response.json().then((data) => ({
                  data: data,
                  status: response.status,
                })).then((res) => {
                  if (res.status === 200 && res.data.status === 200) {
                    this._setUserProfile(res.data.body);
                    window.Feed.getNextUser(this._userData.id);
                    callback();
                  } else if (res.data.status === 404) {}
                  console.log(res.data.status);
                })).catch((error) => console.log(error));
        }

        logoutCookie(callback = noop) {
          
          const requestOptions = {
            method: 'DELETE',
            headers: { 
              'Content-Type': 'application/json',
              'X-CSRF-Token': csrfToken,
            },
            credentials: 'include',
          };
          fetch(`${serverAddress}${authURL}`, requestOptions).then((response) => {
            callback();
          } );
        }
  }
  window.User = new User();
})();
