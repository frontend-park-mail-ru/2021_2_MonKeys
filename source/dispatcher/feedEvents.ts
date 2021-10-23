import EventBus from "./eventBus.js";

export const FeedEventsRegister = () => {
  EventBus.register("feed:like-button", () => {
    //...
  });
  EventBus.register("feed:dislike-button", () => {
    //...
  });
  EventBus.register("feed:expand-button", () => {
    //...
  });
  EventBus.register("feed:shrink-button", () => {
    //...
  });
  EventBus.register("feed:swipe-start", () => {
    //...
  });
  EventBus.register("feed:swipe-move", () => {
    //...
  });
  EventBus.register("feed:swipe-end", () => {
    //...
  });
  EventBus.register("feed:liked", () => {
    //...
  });
  EventBus.register("feed:disliked", () => {
    //...
  });
};
