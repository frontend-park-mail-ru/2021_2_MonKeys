let currentCard
let previousCard 
let previousCard2

let thisIsNeverThat;

export default class FeedComponent {
  _parent;
  _x;
  _y;
  _x1;
  _y1;
  _data = {
    actions: {
      "dislike-card": {
        actionIcon: "icons/button_dislike_white.svg",
        actionClass: "dislike-card",
        function: this._dislikeCard
      },
      "expand-card": {
        actionIcon: "icons/button_expand_white.svg",
        actionClass: "expand-card",
      },
      "like-card": {
        actionIcon: "icons/tapbar_likes_white_selected.svg",
        actionClass: "like-card",
        function: this._likeCard
      },
    },
    card: {},
  };

  constructor(parent) {
    this._parent = parent;
  }

  set data(data) {
    this._data = data;
  }
  _expandCard(){
    
  }
  _likeCard(){
    // ЗАПРОС НА ЛАЙК
    window.Feed.next();
      
    this._x1 = null;
    this._x = null;
    currentCard.style.animation = "swipedRight 1s ease 1";
    setTimeout(thisIsNeverThat._reRenderMainCard, 1000);
  }

  _dislikeCard(){
    // ЗАПРОС НА ДИЗЛАЙК
    window.Feed.next();
      
    this._x1 = null;
    this._x = null;
    currentCard.style.animation = "swipedLeft 1s ease 1";
    setTimeout(thisIsNeverThat._reRenderMainCard, 1000);
  } 

  
  _handleTouchMove(event) {
    const { touches } = event;
    this._x = touches[0].clientX;
    this._y = touches[0].clientY;
    if (window.innerHeight < this._y || window.innerWidth < this._x || this._y < 0 || this._x < 0) {
      return;
    }
    const diffX= this._x - this._x1
    const diffY= this._y - this._y1;
  
    if(diffX<280){
      const diffBig = Math.abs(diffX / 40);
      const diffSmall = Math.abs(diffX / 56); 
      previousCard.style.top = `${12 - diffSmall}%`;
      previousCard.style.height = `${75 + diffSmall}%`;
      previousCard.style.width = `${90 + diffSmall}%`
      previousCard2.style.top = `${19 - diffBig }%`;
      previousCard2.style.height = `${70 + diffBig}%`;
      previousCard2.style.width = `${85 + diffBig}%`;
    }
    currentCard.style.transform = `translate(${diffX}px, ${diffY}px)`;
    currentCard.style.transform += `rotateZ(${diffX / 10}deg)`;
  }

  
  /**
   * Сбрасывает стили на всех карточках
   */

  _reRenderMainCard() {
    console.log()
    currentCard.innerHTML = "";
    currentCard.style="";
    const renderedHTML = Handlebars.templates["feedCard"];
    thisIsNeverThat._data.card = window.Feed.getCurrentProfile();
    currentCard.innerHTML = renderedHTML(thisIsNeverThat._data);
  }
  _handleTouchEnd(event) {
    if (!this._x1 || !this._y1) {
      return;
    }
    if (this._x1 - this._x < -100) {
      currentCard.style.animation = "liked 1s ease 1";
      // ЗАПРОС НА ЛАЙК
      window.Feed.next();
      
      this._x1 = null;
      this._x = null;
 
      setTimeout(thisIsNeverThat._reRenderMainCard, 1000);
    } else if (this._x1 - this._x > 100) {
      currentCard.style.animation = "liked 1s ease 1";
      // ЗАПРОС НА ДИЗЛАЙК
   

      window.Feed.next();
      this._x1 = null;
      this._x = null;
      setTimeout(thisIsNeverThat._reRenderMainCard, 1000);
    } else {
      const { target } = event;
      if (!(target.class === "expand-class" || target.alt === "shrink")) {
        previousCard.style.animation = "shrinkSecondary 1s linear 1";
        previousCard2.style.animation = "shrinkThird 1s linear 1";
        currentCard.style.animation = "spin2 1s linear 1";
        setTimeout( () => {
          currentCard.style="";
          currentCard.style.transform = "translate(0px, 0px)";
          previousCard.style.width = "90%";
          previousCard.style.height = "75%";
          previousCard.style.top = "12%";
          previousCard.style.animation = "";
          previousCard2.style.width = "85%";
          previousCard2.style.height = "70%";
          previousCard2.style.top = "19%";
          previousCard2.style.animation = "";
          
        }, 1000);
      }
    }
  }

  _handleTouchStart(event) {
    const { touches } = event;
    this._x1 = touches[0].clientX;
    this._y1 = touches[0].clientY;
  }

      /**
       * чистит лишние обработчики событий, которые были на ленте
       */
  _clearEventListeners() {
    document.removeEventListener('touchstart', this._handleTouchStart, false);
    document.removeEventListener('touchmove', this._handleTouchMove, false);
    document.removeEventListener('touchend', this._handleTouchEnd, false);
  }
  _handleClicks(event) {
    const { target } = event;
    
    if(thisIsNeverThat._data.actions[target.className]){
  
      thisIsNeverThat._data.actions[target.className].function();
    }
  }
  _addEventListeners() {
    document.addEventListener("click", this._handleClicks,false);
    document.addEventListener("touchstart", this._handleTouchStart, false);
    document.addEventListener("touchmove", this._handleTouchMove, false);
    document.addEventListener("touchend", this._handleTouchEnd, false);
  }
  _getElems() {   
    currentCard = document.getElementsByClassName("card")[0];
    previousCard = document.getElementsByClassName("card2")[0];
    previousCard2 = document.getElementsByClassName("card3")[1];
  }
  _renderDOM() {
    this._parent.innerHTML = "";
    const renderedHTML = Handlebars.templates["feed"];
    this._data.card = window.Feed.getCurrentProfile();
    this._parent.innerHTML = renderedHTML(this._data);
    this._getElems();
    this._addEventListeners();
    thisIsNeverThat = this;
  }
  render() {
    this._renderDOM();
  }
}
