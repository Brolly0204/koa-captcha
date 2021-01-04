    const svgToImg = (svgString) => {
      const svg = new Blob([svgString], {
        type: 'image/svg+xml;charset=utf-8'
      });
      const DOMURL = self.URL || self.webkitURL || self;
      const url = DOMURL.createObjectURL(svg)
      return url
    }

    module.exports = {
      svgToImg
    }
