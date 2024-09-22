self.onmessage = function (e) {
    const { aRect, bRect, paddingTop, paddingRight, paddingBottom, paddingLeft } = e.data;
    
    const isCollision = !(
        ((aRect.top + aRect.height - paddingBottom) < (bRect.top)) ||
        (aRect.top + paddingTop > (bRect.top + bRect.height)) ||
        ((aRect.left + aRect.width - paddingRight) < bRect.left) ||
        (aRect.left + paddingLeft > (bRect.left + bRect.width))
    );

    self.postMessage({ isCollision });
};
