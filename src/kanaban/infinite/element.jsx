import React from "react";

export const INFINITE_SCROLL_AXIS = {
  X: "x",
  Y: "y",
};

export function InfiniteElement({
  Observer,
  EventManager,
  getVisibility,
  itemId,
  Wrapper = "div",
  minHeight = "3rem",
  minWidth = "2rem",
  children = null,
  axis = INFINITE_SCROLL_AXIS.Y,
  pageStyle,
  ...rest
}) {
  let [showChild, toggleShowChild] = React.useState(false);

  let style = axis === INFINITE_SCROLL_AXIS.X ? { minWidth } : { minHeight };

  let [itemStyle, setItemStyle] = React.useState(style);

  let itemRef = React.createRef();

  React.useEffect(
    function observeItem() {
      let itemNode = itemRef.current;
      itemNode && Observer.observe(itemNode);
      return () => Observer.unobserve(itemNode);
    },
    [Observer, itemRef]
  );

  React.useEffect(
    function onVisibilityChange() {
      function callback({ visibility, itemId: id, itemHeight, itemWidth }) {
        if (itemId !== id) {
          return;
        }
        requestAnimationFrame(() => {
          toggleShowChild(getVisibility(id));
          if (
            axis === INFINITE_SCROLL_AXIS.Y &&
            itemHeight &&
            showChild !== getVisibility(id)
          ) {
            setItemStyle(
              Object.assign({}, itemStyle, {
                minHeight: getVisibility(id) ? "auto" : itemHeight,
              })
            );
          }
          if (
            axis === INFINITE_SCROLL_AXIS.X &&
            itemWidth &&
            showChild !== getVisibility(id)
          ) {
            setItemStyle(
              Object.assign({}, itemStyle, {
                minWidth: getVisibility(id) ? "auto" : itemWidth,
              })
            );
          }
        });
        //Todo set element height based on its content it ir is visible
      }
      EventManager.on("visibilityChange", callback);
      return () => {
        EventManager.removeListener("visibilityChange", callback);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [EventManager, itemId, itemStyle, getVisibility]
  );

  return (
    <Wrapper
      id={itemId}
      ref={itemRef}
      className={pageStyle}
      data-pageindex={itemId}
      style={itemStyle}
      {...rest}
    >
      {typeof children === "function"
        ? children({ isVisible: showChild })
        : showChild && children}
    </Wrapper>
  );
}
