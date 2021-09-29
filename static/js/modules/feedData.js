/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */


(function() {
const noop = () => {};


class Feed {
  _counter = 0;
  _feedData = [];


  _addProfile(data) {
    this._feedData[this._counter] = Object();
    this._feedData[this._counter].id=data.id;
    this._feedData[this._counter].firstName=data.name;
    this._feedData[this._counter].age=data.age;
    this._feedData[this._counter].photoSrc=data.imgSrc;
    this._feedData[this._counter].colorFrom='grey';
    this._feedData[this._counter].colorTo='black';
    this._feedData[this._counter].text=data.description;
    this._feedData[this._counter].tags=data.tags;
    this._counter++;
  }

  getCurrentProfile() {
    return this._feedData[this._counter-1];
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
            console.log(res.data.body);
            this._addProfile(res.data.body);

            callback(res.data, res.status);
          } else if (res.data.status === 404) {
            this._counter++;
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
