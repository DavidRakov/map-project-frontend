let pending = false;

export const markLayerClick = () => {
  pending = true;
  setTimeout(() => { pending = false; }, 0);
};

export const wasLayerClicked = () => pending;
