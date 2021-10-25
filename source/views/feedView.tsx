import ViewBase from "./viewBase.js";
import { MonkeysVirtualDOM } from "../virtualDOM/virtualDOM.js";
import { Tapbar } from "../components/tapbar.js";
import { CardLikes } from "../components/cardLikes.js";
import { IconButton } from "../components/iconButton.js";
import { CardFeed } from "../components/cardFeed.js";
import { CardExpended } from "../components/cardExpended.js";
import feedStore from "../store/feedStore.js";
import eventBus from "../dispatcher/eventBus.js";

export default class FeedView extends ViewBase {
  constructor(parent: HTMLElement) {
    super(parent);
    const cardData = feedStore.get();
    this.updateDataTemaplate(cardData);
    feedStore.subscribe(this.subscribtionCallback, this);
  }
  private updateDataTemaplate(cardData){
    if (!cardData.outOfCards) {
        this._data.cardData.userData = cardData.profiles[cardData.counter];
        // console.log(cardData.profiles[cardData.counter]);
        this._template = this._createTmpl(this._data, cardData.expanded);
      } else {
        this._template = (
          <div>
            <div class="card-container">
              <h1>You are out of cards</h1>
            </div>
            {Tapbar(this._data.tapbar)}
          </div>
        );
      }
  }
  _data = {
    cardData: {
      userData: {},
      buttons: {
        dislikeButton: {
          type: "button",
          src: "icons/button_dislike_white.svg",
          class: "dislike-card",
          onclick: () => {
            eventBus.dispatch("feed:dislike-button");
          },
        },
        expandButton: {
          type: "button",
          src: "icons/button_expand_white.svg",
          class: "expand-card",
          onclick: () => {
            eventBus.dispatch("feed:expand-button");
          },
        },
        likeButton: {
          type: "button",
          src: "icons/tapbar_likes_white_selected.svg",
          class: "like-card",
          onclick: () => {
            eventBus.dispatch("feed:like-button");
          },
        },
      },
    },
    tapbar: {
      class: "menu-feed",
    },
  };
  _createTmpl(data: any, expanded: boolean) {
    if (!expanded) {
      this._data.cardData.buttons.expandButton = {
        type: "button",
        src: "icons/button_expand_white.svg",
        class: "expand-card",
        onclick: () => {
          eventBus.dispatch("feed:expand-button");
        },
      };

      return (
        <div>
          <div class="card-container">
            <div class="card3"></div>
            <div class="card3"></div>
            <div class="card2"></div>
            {CardFeed(data.cardData)}
          </div>
          {Tapbar(data.tapbar)}
        </div>
      );
    } else {
      this._data.cardData.buttons.expandButton = {
        type: "button",
        src: "icons/button_shrink_white.svg",
        class: "expand-card",
        onclick: () => {
          eventBus.dispatch("feed:shrink-button");
        },
      };
      return (
        <div>
          <div class="card-container">
            <div class="card3"></div>
            <div class="card3"></div>
            <div class="card2"></div>
            {CardExpended(data.cardData)}
          </div>
          {Tapbar(data.tapbar)}
        </div>
      );
    }
  }

  public unsubscribe() {
    feedStore.unsubscribe(this.subscribtionCallback);
  }

  private subscribtionCallback(data, view) {
    const cardData = feedStore.get();
    this.updateDataTemaplate(cardData);
    this.render();
  }
}
