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
            this._feedData[this._counter].id = data.id;
            this._feedData[this._counter].firstName = data.name;
            this._feedData[this._counter].age = data.age;
            this._feedData[this._counter].photoSrc = data.imgSrc;
            this._feedData[this._counter].colorFrom = 'grey';
            this._feedData[this._counter].colorTo = 'black';
            this._feedData[this._counter].text = data.description;
            this._feedData[this._counter].tags = data.tags;
            this._counter++;
        }

        getCurrentProfile() {
            return this._feedData[this._counter];
        }

        getFeed(){
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            };

            // fetch(`${serverAddress}${feedURL}`, requestOptions)
            //     .then((response) =>
            //         response.json().then((data) => ({
            //             data: data,
            //             status: response.status,
            //         })).then((res) => {
            //             if (res.data.status === 200) {
            //                 console.log(res.data.body);
            //                 this._addProfile(res.data.body);

            //                 callback(res.data, res.status);
            //             } else if (res.data.status === 404) {
            //                 console.log(res.data.body);
            //                 this._counter++;
            //                 callback();
            //             }
            //         })).catch((error) => console.log(error));
            this._feedData = [{
                'name': 'Elon',
                'age': '25',
                'photoSrc': 'img/Elon_Musk_2015.jpg',
                'text': `Инст: @elonmask<br>
                Всем привет меня зовут Илон Маск. Люблю играть в
                геншин импакт, обажаю гаремники. 
                Просто не могу жить без иссекаев,
                мое любимое аниме это конечно же Ван Пис ахахах)
                Я посмотрел все 1000+ серий
                так же у меня есть краш, поэтому ищу ТОЛЬКО ДРУГА
                в общем буду твоим сенпаем, писать в инсту, 
                а то drip лагает ахахахах)`,
                'tags' : [
                    'anime',
                    'IT',
                    'music',
                    'soccer',
                ]
            },
            {
                'name': 'Michail',
                'age': '20',
                'photoSrc': 'img/Elon_Musk_2015.jpg',
                'text': `
                Инст: @marvin<br>
                Тг: @Marvin<br>
                Првиет я Миша мне 2 года
                люблю сосать члены, господи как же я люблю хуи
                по жизни пассив конченный
                обоссанцец. Обожаю играть в геншин
                `,
                'tags' : [
                    'banana',
                    'fullstack',
                    'gay',
                    'anal',
                ]
            },
        ]
        

        }
        getNextUser(id, callback = noop) {
            alert(1)
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'id': id,
                }),
                credentials: 'include',
            };

            fetch(`${serverAddress}${feedURL}`, requestOptions)
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
                            console.log(res.data.body);
                            this._counter++;
                            callback();
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
