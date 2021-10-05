export default class LikesComponent {
    _parent
    _data = {
      'count': 3,
      'match': [
        {
          'img': '/img/aj1-V9h9GGM.jpg',
          'name': 'Ilyagu',
          'age': '25',
          'date': '01.01.1970',
        },
        {
          'img': '/img/Elon_Musk_2015.jpg',
          'name': 'Elon',
          'age': '45',
          'date': '01.01.1970',
        },
        {
          'img': '/img/silver-kanye-west-mary-opera-01.jpg',
          'name': 'Ye',
          'age': '40',
          'date': '01.01.1970',
        },
      ],
    }

    constructor(parent) {
      this._parent = parent;
    }
    _renderDOM() {
      this._parent.innerHTML = '';
      const renderedHTML = Handlebars.templates['likes'];
      this._parent.innerHTML = renderedHTML(this._data);
    }
    render() {
      this._renderDOM();
    }
}
