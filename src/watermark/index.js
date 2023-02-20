export default {
  name: "watermark",
  handle: function (el, bind) {
    const src = bind.value;
    if (!src) {
      console.log("watermark 需要提供一个图片链接");
      return
    }
    const draw = (img) => {
      let cans = document.createElement('canvas');
      cans.width = img.width;
      cans.height = img.height;
      let ctx = cans.getContext('2d');
      let width_ = (cans.width - img.width) / 2;
      let height_ = (cans.height - img.height) / 2;
      ctx.drawImage(img, width_, height_);
      let imgData = ctx.getImageData(width_, height_, img.width, img.height);
      for (let i = 0, len = imgData.data.length; i < len; i += 4) {
        // 改变每个像素的透明度
        imgData.data[i + 3] = imgData.data[i + 3] * 0.2;
      }
      ctx.putImageData(imgData, width_, height_);
      el.style.backgroundImage = "url(" + cans.toDataURL("image/png") + ")";
      el.style.backgroundRepeat = "no-repeat";
      el.style.backgroundPosition = "center";
      const observer = new MutationObserver(() => {
        //如果标签在，只修改了属性，重新赋值属性
        if (el) {
          el.style.backgroundImage = "url(" + cans.toDataURL("image/png") + ")";
          el.style.backgroundRepeat = "no-repeat";
          el.style.backgroundPosition = "center";
        }
      })
      observer.observe(document.body, {
        attributes: true,
        subtree: true,
        childList: true,
      });
    };
    let flag = true;
    const img = document.createElement("img");
    img.src = src;
    console.log(img);
    img.onload = function () {
      flag && draw(this);
      flag = false;
    };
  }
}