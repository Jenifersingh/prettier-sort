import React from "react";

import { EventEmitter } from "./event.emitter.js";

export const INFINITE_SCROLL_AXIS = {
  X: "x",
  Y: "y",
};

export function InfiniteContainer({
  children,
  scrollElemSelector,
  scrollOffset = 200,
  axis = INFINITE_SCROLL_AXIS.Y,
}) {
  let [observer, setObserver] = React.useState(null);
  let [eventManager, setEventManager] = React.useState(null);
  let visibilityCache = React.useRef({});

  let getVisibility = React.useCallback(function getVisibilityCallback(itemId) {
    return visibilityCache.current[itemId];
  }, []);

  React.useEffect(
    function initializeObservers() {
      let scrollElem =
        document.querySelector(
          `${scrollElemSelector} .ScrollbarsCustom-Scroller`
        ) || document.querySelector(scrollElemSelector);
      if (!scrollElem) {
        console.warn("No scroll parent element found");
        return;
      }

      function setVisibility(itemId, visibility) {
        visibilityCache.current[itemId] = visibility;
      }

      function observerCallback(entries) {
        entries.forEach((entry) => {
          let itemId = entry.target.getAttribute("id");
          let itemHeight = `${entry.target.offsetHeight}px`;
          let itemWidth = `${entry.target.offsetWidth}px`;
          if (entry.isIntersecting) {
            setVisibility(itemId, true);
            eventManager.emit("visibilityChange", {
              visibility: true,
              itemId,
              itemHeight,
              itemWidth,
            });
          } else if (!entry.isIntersecting && entry.intersectionRatio <= 0) {
            setVisibility(itemId, false);
            eventManager.emit("visibilityChange", {
              visibility: false,
              itemId,
              itemHeight,
              itemWidth,
            });
          }
        });
      }

      let options = {
        // root: scrollElem,
        rootMargin:
          axis === INFINITE_SCROLL_AXIS.Y
            ? `${scrollOffset}px 0px`
            : `0px ${scrollOffset}px`,
        threshold: 0,
      };
      let observer = new IntersectionObserver(observerCallback, options);
      setObserver(observer);

      let eventManager = new EventEmitter();
      setEventManager(eventManager);

      return () => observer.disconnect();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scrollElemSelector, scrollOffset]
  );

  return observer
    ? children({
        Observer: observer,
        EventManager: eventManager,
        getVisibility,
        axis,
      })
    : null;
}
