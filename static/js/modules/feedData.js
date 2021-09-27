/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */


(function() {
const noop = () => {};


class Feed {
  #counter = 0;
  #feedData = [];


  #addProfile(data) {
    this.#feedData[this.#counter] = Object();
    this.#feedData[this.#counter].id=data.id;
    this.#feedData[this.#counter].firstName=data.name;
    this.#feedData[this.#counter].age=data.age;
    this.#feedData[this.#counter].photoSrc=data.imgSrc;
    this.#feedData[this.#counter].colorFrom='grey';
    this.#feedData[this.#counter].colorTo='black';
    this.#feedData[this.#counter].text=data.description;
    this.#feedData[this.#counter].tags=data.tags;
    this.#counter++;
  }

  getCurrentProfile() {
    return this.#feedData[this.#counter-1];
  }


  getNextUser(id, callback=noop) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'id': id,
      }),
      credentials: 'include',
    };

    fetch(`${serverAddress}/api/v1/nextswipeuser`, requestOptions)
      .then((response) =>
        response.json().then((data) => ({
          data: data,
          status: response.status,
        })).then((res) => {
          if (res.data.status === 200) {
            console.log(res.data.body)
            this.#addProfile(res.data.body);

            callback(res.data, res.status);
          } else if (res.data.status === 404) {
            this.#counter++;
          }


          // cringe

          // if (res.data.status === 200) {
          //   // root.innerHTML = '';
          //   // addProfile(res.data.body)
          //   // renderFeed();
          //   // addMenu('feed');
          // } else if (res.data.status === 404) {
          //   root.innerHTML = '';
          //   renderFeed();
          //   addMenu('feed');
          // }
        })).catch((error) => console.log(error));
  }
  }
  window.Feed = new Feed();
})();
