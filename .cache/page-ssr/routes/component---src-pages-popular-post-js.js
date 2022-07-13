"use strict";
exports.id = "component---src-pages-popular-post-js";
exports.ids = ["component---src-pages-popular-post-js"];
exports.modules = {

/***/ "./node_modules/gatsby-image/index.js":
/*!********************************************!*\
  !*** ./node_modules/gatsby-image/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports["default"] = void 0;

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js"));

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "./node_modules/@babel/runtime/helpers/inheritsLoose.js"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js"));

var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));

var _excluded = ["sizes", "srcSet", "src", "style", "onLoad", "onError", "loading", "draggable", "ariaHidden"];

var logDeprecationNotice = function logDeprecationNotice(prop, replacement) {
  if (false) {}

  console.log("\n    The \"" + prop + "\" prop is now deprecated and will be removed in the next major version\n    of \"gatsby-image\".\n    ");

  if (replacement) {
    console.log("Please use " + replacement + " instead of \"" + prop + "\".");
  }
}; // Handle legacy props during their deprecation phase


var convertProps = function convertProps(props) {
  var convertedProps = (0, _extends2.default)({}, props);
  var resolutions = convertedProps.resolutions,
      sizes = convertedProps.sizes,
      critical = convertedProps.critical;

  if (resolutions) {
    convertedProps.fixed = resolutions;
    logDeprecationNotice("resolutions", "the gatsby-image v2 prop \"fixed\"");
    delete convertedProps.resolutions;
  }

  if (sizes) {
    convertedProps.fluid = sizes;
    logDeprecationNotice("sizes", "the gatsby-image v2 prop \"fluid\"");
    delete convertedProps.sizes;
  }

  if (critical) {
    logDeprecationNotice("critical", "the native \"loading\" attribute");
    convertedProps.loading = "eager";
  } // convert fluid & fixed to arrays so we only have to work with arrays


  if (convertedProps.fluid) {
    convertedProps.fluid = groupByMedia([].concat(convertedProps.fluid));
  }

  if (convertedProps.fixed) {
    convertedProps.fixed = groupByMedia([].concat(convertedProps.fixed));
  }

  return convertedProps;
};
/**
 * Checks if fluid or fixed are art-direction arrays.
 *
 * @param currentData  {{media?: string}[]}   The props to check for images.
 * @return {boolean}
 */


var hasArtDirectionSupport = function hasArtDirectionSupport(currentData) {
  return !!currentData && Array.isArray(currentData) && currentData.some(function (image) {
    return typeof image.media !== "undefined";
  });
};
/**
 * Tries to detect if a media query matches the current viewport.
 * @property media   {{media?: string}}  A media query string.
 * @return {boolean}
 */


var matchesMedia = function matchesMedia(_ref) {
  var media = _ref.media;
  return media ? isBrowser && !!window.matchMedia(media).matches : false;
};
/**
 * Find the source of an image to use as a key in the image cache.
 * Use `the first image in either `fixed` or `fluid`
 * @param {{fluid: {src: string, media?: string}[], fixed: {src: string, media?: string}[]}} args
 * @return {string?} Returns image src or undefined it not given.
 */


var getImageCacheKey = function getImageCacheKey(_ref2) {
  var fluid = _ref2.fluid,
      fixed = _ref2.fixed;
  var srcData = getCurrentSrcData(fluid || fixed || []);
  return srcData && srcData.src;
};
/**
 * Returns the current src - Preferably with art-direction support.
 * @param currentData  {{media?: string}[], maxWidth?: Number, maxHeight?: Number}   The fluid or fixed image array.
 * @return {{src: string, media?: string, maxWidth?: Number, maxHeight?: Number}}
 */


var getCurrentSrcData = function getCurrentSrcData(currentData) {
  if (isBrowser && hasArtDirectionSupport(currentData)) {
    // Do we have an image for the current Viewport?
    var foundMedia = currentData.findIndex(matchesMedia);

    if (foundMedia !== -1) {
      return currentData[foundMedia];
    } // No media matches, select first element without a media condition


    var noMedia = currentData.findIndex(function (image) {
      return typeof image.media === "undefined";
    });

    if (noMedia !== -1) {
      return currentData[noMedia];
    }
  } // Else return the first image.


  return currentData[0];
}; // Cache if we've seen an image before so we don't bother with
// lazy-loading & fading in on subsequent mounts.


var imageCache = Object.create({});

var inImageCache = function inImageCache(props) {
  var convertedProps = convertProps(props);
  var cacheKey = getImageCacheKey(convertedProps);
  return imageCache[cacheKey] || false;
};

var activateCacheForImage = function activateCacheForImage(props) {
  var convertedProps = convertProps(props);
  var cacheKey = getImageCacheKey(convertedProps);

  if (cacheKey) {
    imageCache[cacheKey] = true;
  }
}; // Native lazy-loading support: https://addyosmani.com/blog/lazy-loading/


var hasNativeLazyLoadSupport = typeof HTMLImageElement !== "undefined" && "loading" in HTMLImageElement.prototype;
var isBrowser = typeof window !== "undefined";
var hasIOSupport = isBrowser && window.IntersectionObserver;
var io;
var listeners = new WeakMap();

function getIO() {
  if (typeof io === "undefined" && typeof window !== "undefined" && window.IntersectionObserver) {
    io = new window.IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (listeners.has(entry.target)) {
          var cb = listeners.get(entry.target); // Edge doesn't currently support isIntersecting, so also test for an intersectionRatio > 0

          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            io.unobserve(entry.target);
            listeners.delete(entry.target);
            cb();
          }
        }
      });
    }, {
      rootMargin: "200px"
    });
  }

  return io;
}

function generateImageSources(imageVariants) {
  return imageVariants.map(function (_ref3) {
    var src = _ref3.src,
        srcSet = _ref3.srcSet,
        srcSetWebp = _ref3.srcSetWebp,
        media = _ref3.media,
        sizes = _ref3.sizes;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: src
    }, srcSetWebp && /*#__PURE__*/_react.default.createElement("source", {
      type: "image/webp",
      media: media,
      srcSet: srcSetWebp,
      sizes: sizes
    }), srcSet && /*#__PURE__*/_react.default.createElement("source", {
      media: media,
      srcSet: srcSet,
      sizes: sizes
    }));
  });
} // Return an array ordered by elements having a media prop, does not use
// native sort, as a stable sort is not guaranteed by all browsers/versions


function groupByMedia(imageVariants) {
  var withMedia = [];
  var without = [];
  imageVariants.forEach(function (variant) {
    return (variant.media ? withMedia : without).push(variant);
  });

  if (without.length > 1 && "development" !== "production") {
    console.warn("We've found " + without.length + " sources without a media property. They might be ignored by the browser, see: https://www.gatsbyjs.org/packages/gatsby-image/#art-directing-multiple-images");
  }

  return [].concat(withMedia, without);
}

function generateTracedSVGSources(imageVariants) {
  return imageVariants.map(function (_ref4) {
    var src = _ref4.src,
        media = _ref4.media,
        tracedSVG = _ref4.tracedSVG;
    return /*#__PURE__*/_react.default.createElement("source", {
      key: src,
      media: media,
      srcSet: tracedSVG
    });
  });
}

function generateBase64Sources(imageVariants) {
  return imageVariants.map(function (_ref5) {
    var src = _ref5.src,
        media = _ref5.media,
        base64 = _ref5.base64;
    return /*#__PURE__*/_react.default.createElement("source", {
      key: src,
      media: media,
      srcSet: base64
    });
  });
}

function generateNoscriptSource(_ref6, isWebp) {
  var srcSet = _ref6.srcSet,
      srcSetWebp = _ref6.srcSetWebp,
      media = _ref6.media,
      sizes = _ref6.sizes;
  var src = isWebp ? srcSetWebp : srcSet;
  var mediaAttr = media ? "media=\"" + media + "\" " : "";
  var typeAttr = isWebp ? "type='image/webp' " : "";
  var sizesAttr = sizes ? "sizes=\"" + sizes + "\" " : "";
  return "<source " + typeAttr + mediaAttr + "srcset=\"" + src + "\" " + sizesAttr + "/>";
}

function generateNoscriptSources(imageVariants) {
  return imageVariants.map(function (variant) {
    return (variant.srcSetWebp ? generateNoscriptSource(variant, true) : "") + generateNoscriptSource(variant);
  }).join("");
}

var listenToIntersections = function listenToIntersections(el, cb) {
  var observer = getIO();

  if (observer) {
    observer.observe(el);
    listeners.set(el, cb);
  }

  return function () {
    observer.unobserve(el);
    listeners.delete(el);
  };
};

var noscriptImg = function noscriptImg(props) {
  // Check if prop exists before adding each attribute to the string output below to prevent
  // HTML validation issues caused by empty values like width="" and height=""
  var src = props.src ? "src=\"" + props.src + "\" " : "src=\"\" "; // required attribute

  var sizes = props.sizes ? "sizes=\"" + props.sizes + "\" " : "";
  var srcSet = props.srcSet ? "srcset=\"" + props.srcSet + "\" " : "";
  var title = props.title ? "title=\"" + props.title + "\" " : "";
  var alt = props.alt ? "alt=\"" + props.alt + "\" " : "alt=\"\" "; // required attribute

  var width = props.width ? "width=\"" + props.width + "\" " : "";
  var height = props.height ? "height=\"" + props.height + "\" " : "";
  var crossOrigin = props.crossOrigin ? "crossorigin=\"" + props.crossOrigin + "\" " : "";
  var loading = props.loading ? "loading=\"" + props.loading + "\" " : "";
  var draggable = props.draggable ? "draggable=\"" + props.draggable + "\" " : "";
  var sources = generateNoscriptSources(props.imageVariants);
  return "<picture>" + sources + "<img " + loading + width + height + sizes + srcSet + src + alt + title + crossOrigin + draggable + "style=\"position:absolute;top:0;left:0;opacity:1;width:100%;height:100%;object-fit:cover;object-position:center\"/></picture>";
}; // Earlier versions of gatsby-image during the 2.x cycle did not wrap
// the `Img` component in a `picture` element. This maintains compatibility
// until a breaking change can be introduced in the next major release


var Placeholder = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var src = props.src,
      imageVariants = props.imageVariants,
      generateSources = props.generateSources,
      spreadProps = props.spreadProps,
      ariaHidden = props.ariaHidden;

  var baseImage = /*#__PURE__*/_react.default.createElement(Img, (0, _extends2.default)({
    ref: ref,
    src: src
  }, spreadProps, {
    ariaHidden: ariaHidden
  }));

  return imageVariants.length > 1 ? /*#__PURE__*/_react.default.createElement("picture", null, generateSources(imageVariants), baseImage) : baseImage;
});

var Img = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  var sizes = props.sizes,
      srcSet = props.srcSet,
      src = props.src,
      style = props.style,
      onLoad = props.onLoad,
      onError = props.onError,
      loading = props.loading,
      draggable = props.draggable,
      ariaHidden = props.ariaHidden,
      otherProps = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  return /*#__PURE__*/_react.default.createElement("img", (0, _extends2.default)({
    "aria-hidden": ariaHidden,
    sizes: sizes,
    srcSet: srcSet,
    src: src
  }, otherProps, {
    onLoad: onLoad,
    onError: onError,
    ref: ref,
    loading: loading,
    draggable: draggable,
    style: (0, _extends2.default)({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center"
    }, style)
  }));
});

Img.propTypes = {
  style: _propTypes.default.object,
  onError: _propTypes.default.func,
  onLoad: _propTypes.default.func
};

var Image = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2.default)(Image, _React$Component);

  function Image(props) {
    var _this;

    _this = _React$Component.call(this, props) || this; // If this image has already been loaded before then we can assume it's
    // already in the browser cache so it's cheap to just show directly.

    _this.seenBefore = isBrowser && inImageCache(props);
    _this.isCritical = props.loading === "eager" || props.critical;
    _this.addNoScript = !(_this.isCritical && !props.fadeIn);
    _this.useIOSupport = !hasNativeLazyLoadSupport && hasIOSupport && !_this.isCritical && !_this.seenBefore;
    var isVisible = _this.isCritical || isBrowser && (hasNativeLazyLoadSupport || !_this.useIOSupport);
    _this.state = {
      isVisible: isVisible,
      imgLoaded: false,
      imgCached: false,
      fadeIn: !_this.seenBefore && props.fadeIn,
      isHydrated: false
    };
    _this.imageRef = /*#__PURE__*/_react.default.createRef();
    _this.placeholderRef = props.placeholderRef || /*#__PURE__*/_react.default.createRef();
    _this.handleImageLoaded = _this.handleImageLoaded.bind((0, _assertThisInitialized2.default)(_this));
    _this.handleRef = _this.handleRef.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  var _proto = Image.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.setState({
      isHydrated: isBrowser
    });

    if (this.state.isVisible && typeof this.props.onStartLoad === "function") {
      this.props.onStartLoad({
        wasCached: inImageCache(this.props)
      });
    }

    if (this.isCritical) {
      var img = this.imageRef.current;

      if (img && img.complete) {
        this.handleImageLoaded();
      }
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.cleanUpListeners) {
      this.cleanUpListeners();
    }
  } // Specific to IntersectionObserver based lazy-load support
  ;

  _proto.handleRef = function handleRef(ref) {
    var _this2 = this;

    if (this.useIOSupport && ref) {
      this.cleanUpListeners = listenToIntersections(ref, function () {
        var imageInCache = inImageCache(_this2.props);

        if (!_this2.state.isVisible && typeof _this2.props.onStartLoad === "function") {
          _this2.props.onStartLoad({
            wasCached: imageInCache
          });
        } // imgCached and imgLoaded must update after isVisible,
        // Once isVisible is true, imageRef becomes accessible, which imgCached needs access to.
        // imgLoaded and imgCached are in a 2nd setState call to be changed together,
        // avoiding initiating unnecessary animation frames from style changes.


        _this2.setState({
          isVisible: true
        }, function () {
          _this2.setState({
            imgLoaded: imageInCache,
            // `currentSrc` should be a string, but can be `undefined` in IE,
            // !! operator validates the value is not undefined/null/""
            // for lazyloaded components this might be null
            // TODO fix imgCached behaviour as it's now false when it's lazyloaded
            imgCached: !!(_this2.imageRef.current && _this2.imageRef.current.currentSrc)
          });
        });
      });
    }
  };

  _proto.handleImageLoaded = function handleImageLoaded() {
    activateCacheForImage(this.props);
    this.setState({
      imgLoaded: true
    });

    if (this.props.onLoad) {
      this.props.onLoad();
    }
  };

  _proto.render = function render() {
    var _convertProps = convertProps(this.props),
        title = _convertProps.title,
        alt = _convertProps.alt,
        className = _convertProps.className,
        _convertProps$style = _convertProps.style,
        style = _convertProps$style === void 0 ? {} : _convertProps$style,
        _convertProps$imgStyl = _convertProps.imgStyle,
        imgStyle = _convertProps$imgStyl === void 0 ? {} : _convertProps$imgStyl,
        _convertProps$placeho = _convertProps.placeholderStyle,
        placeholderStyle = _convertProps$placeho === void 0 ? {} : _convertProps$placeho,
        placeholderClassName = _convertProps.placeholderClassName,
        fluid = _convertProps.fluid,
        fixed = _convertProps.fixed,
        backgroundColor = _convertProps.backgroundColor,
        durationFadeIn = _convertProps.durationFadeIn,
        Tag = _convertProps.Tag,
        itemProp = _convertProps.itemProp,
        loading = _convertProps.loading,
        draggable = _convertProps.draggable;

    var imageVariants = fluid || fixed; // Abort early if missing image data (#25371)

    if (!imageVariants) {
      return null;
    }

    var shouldReveal = this.state.fadeIn === false || this.state.imgLoaded;
    var shouldFadeIn = this.state.fadeIn === true && !this.state.imgCached;
    var imageStyle = (0, _extends2.default)({
      opacity: shouldReveal ? 1 : 0,
      transition: shouldFadeIn ? "opacity " + durationFadeIn + "ms" : "none"
    }, imgStyle);
    var bgColor = typeof backgroundColor === "boolean" ? "lightgray" : backgroundColor;
    var delayHideStyle = {
      transitionDelay: durationFadeIn + "ms"
    };
    var imagePlaceholderStyle = (0, _extends2.default)({
      opacity: this.state.imgLoaded ? 0 : 1
    }, shouldFadeIn && delayHideStyle, imgStyle, placeholderStyle);
    var placeholderImageProps = {
      title: title,
      alt: !this.state.isVisible ? alt : "",
      style: imagePlaceholderStyle,
      className: placeholderClassName,
      itemProp: itemProp
    }; // Initial client render state needs to match SSR until hydration finishes.
    // Once hydration completes, render again to update to the correct image.
    // `imageVariants` is always an Array type at this point due to `convertProps()`

    var image = !this.state.isHydrated ? imageVariants[0] : getCurrentSrcData(imageVariants);

    if (fluid) {
      return /*#__PURE__*/_react.default.createElement(Tag, {
        className: (className ? className : "") + " gatsby-image-wrapper",
        style: (0, _extends2.default)({
          position: "relative",
          overflow: "hidden",
          maxWidth: image.maxWidth ? image.maxWidth + "px" : null,
          maxHeight: image.maxHeight ? image.maxHeight + "px" : null
        }, style),
        ref: this.handleRef,
        key: "fluid-" + JSON.stringify(image.srcSet)
      }, /*#__PURE__*/_react.default.createElement(Tag, {
        "aria-hidden": true,
        style: {
          width: "100%",
          paddingBottom: 100 / image.aspectRatio + "%"
        }
      }), bgColor && /*#__PURE__*/_react.default.createElement(Tag, {
        "aria-hidden": true,
        title: title,
        style: (0, _extends2.default)({
          backgroundColor: bgColor,
          position: "absolute",
          top: 0,
          bottom: 0,
          opacity: !this.state.imgLoaded ? 1 : 0,
          right: 0,
          left: 0
        }, shouldFadeIn && delayHideStyle)
      }), image.base64 && /*#__PURE__*/_react.default.createElement(Placeholder, {
        ariaHidden: true,
        ref: this.placeholderRef,
        src: image.base64,
        spreadProps: placeholderImageProps,
        imageVariants: imageVariants,
        generateSources: generateBase64Sources
      }), image.tracedSVG && /*#__PURE__*/_react.default.createElement(Placeholder, {
        ariaHidden: true,
        ref: this.placeholderRef,
        src: image.tracedSVG,
        spreadProps: placeholderImageProps,
        imageVariants: imageVariants,
        generateSources: generateTracedSVGSources
      }), this.state.isVisible && /*#__PURE__*/_react.default.createElement("picture", null, generateImageSources(imageVariants), /*#__PURE__*/_react.default.createElement(Img, {
        alt: alt,
        title: title,
        sizes: image.sizes,
        src: image.src,
        crossOrigin: this.props.crossOrigin,
        srcSet: image.srcSet,
        style: imageStyle,
        ref: this.imageRef,
        onLoad: this.handleImageLoaded,
        onError: this.props.onError,
        itemProp: itemProp,
        loading: loading,
        draggable: draggable
      })), this.addNoScript && /*#__PURE__*/_react.default.createElement("noscript", {
        dangerouslySetInnerHTML: {
          __html: noscriptImg((0, _extends2.default)({
            alt: alt,
            title: title,
            loading: loading
          }, image, {
            imageVariants: imageVariants
          }))
        }
      }));
    }

    if (fixed) {
      var divStyle = (0, _extends2.default)({
        position: "relative",
        overflow: "hidden",
        display: "inline-block",
        width: image.width,
        height: image.height
      }, style);

      if (style.display === "inherit") {
        delete divStyle.display;
      }

      return /*#__PURE__*/_react.default.createElement(Tag, {
        className: (className ? className : "") + " gatsby-image-wrapper",
        style: divStyle,
        ref: this.handleRef,
        key: "fixed-" + JSON.stringify(image.srcSet)
      }, bgColor && /*#__PURE__*/_react.default.createElement(Tag, {
        "aria-hidden": true,
        title: title,
        style: (0, _extends2.default)({
          backgroundColor: bgColor,
          width: image.width,
          opacity: !this.state.imgLoaded ? 1 : 0,
          height: image.height
        }, shouldFadeIn && delayHideStyle)
      }), image.base64 && /*#__PURE__*/_react.default.createElement(Placeholder, {
        ariaHidden: true,
        ref: this.placeholderRef,
        src: image.base64,
        spreadProps: placeholderImageProps,
        imageVariants: imageVariants,
        generateSources: generateBase64Sources
      }), image.tracedSVG && /*#__PURE__*/_react.default.createElement(Placeholder, {
        ariaHidden: true,
        ref: this.placeholderRef,
        src: image.tracedSVG,
        spreadProps: placeholderImageProps,
        imageVariants: imageVariants,
        generateSources: generateTracedSVGSources
      }), this.state.isVisible && /*#__PURE__*/_react.default.createElement("picture", null, generateImageSources(imageVariants), /*#__PURE__*/_react.default.createElement(Img, {
        alt: alt,
        title: title,
        width: image.width,
        height: image.height,
        sizes: image.sizes,
        src: image.src,
        crossOrigin: this.props.crossOrigin,
        srcSet: image.srcSet,
        style: imageStyle,
        ref: this.imageRef,
        onLoad: this.handleImageLoaded,
        onError: this.props.onError,
        itemProp: itemProp,
        loading: loading,
        draggable: draggable
      })), this.addNoScript && /*#__PURE__*/_react.default.createElement("noscript", {
        dangerouslySetInnerHTML: {
          __html: noscriptImg((0, _extends2.default)({
            alt: alt,
            title: title,
            loading: loading
          }, image, {
            imageVariants: imageVariants
          }))
        }
      }));
    }

    return null;
  };

  return Image;
}(_react.default.Component);

Image.defaultProps = {
  fadeIn: true,
  durationFadeIn: 500,
  alt: "",
  Tag: "div",
  // We set it to `lazy` by default because it's best to default to a performant
  // setting and let the user "opt out" to `eager`
  loading: "lazy"
};

var fixedObject = _propTypes.default.shape({
  width: _propTypes.default.number.isRequired,
  height: _propTypes.default.number.isRequired,
  src: _propTypes.default.string.isRequired,
  srcSet: _propTypes.default.string.isRequired,
  base64: _propTypes.default.string,
  tracedSVG: _propTypes.default.string,
  srcWebp: _propTypes.default.string,
  srcSetWebp: _propTypes.default.string,
  media: _propTypes.default.string
});

var fluidObject = _propTypes.default.shape({
  aspectRatio: _propTypes.default.number.isRequired,
  src: _propTypes.default.string.isRequired,
  srcSet: _propTypes.default.string.isRequired,
  sizes: _propTypes.default.string.isRequired,
  base64: _propTypes.default.string,
  tracedSVG: _propTypes.default.string,
  srcWebp: _propTypes.default.string,
  srcSetWebp: _propTypes.default.string,
  media: _propTypes.default.string,
  maxWidth: _propTypes.default.number,
  maxHeight: _propTypes.default.number
});

function requireFixedOrFluid(originalPropTypes) {
  return function (props, propName, componentName) {
    var _PropTypes$checkPropT;

    if (!props.fixed && !props.fluid) {
      throw new Error("The prop `fluid` or `fixed` is marked as required in `" + componentName + "`, but their values are both `undefined`.");
    }

    _propTypes.default.checkPropTypes((_PropTypes$checkPropT = {}, _PropTypes$checkPropT[propName] = originalPropTypes, _PropTypes$checkPropT), props, "prop", componentName);
  };
} // If you modify these propTypes, please don't forget to update following files as well:
// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-image/index.d.ts
// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-image/README.md#gatsby-image-props
// https://github.com/gatsbyjs/gatsby/blob/master/docs/docs/gatsby-image.md#gatsby-image-props


Image.propTypes = {
  resolutions: fixedObject,
  sizes: fluidObject,
  fixed: requireFixedOrFluid(_propTypes.default.oneOfType([fixedObject, _propTypes.default.arrayOf(fixedObject)])),
  fluid: requireFixedOrFluid(_propTypes.default.oneOfType([fluidObject, _propTypes.default.arrayOf(fluidObject)])),
  fadeIn: _propTypes.default.bool,
  durationFadeIn: _propTypes.default.number,
  title: _propTypes.default.string,
  alt: _propTypes.default.string,
  className: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  // Support Glamor's css prop.
  critical: _propTypes.default.bool,
  crossOrigin: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.bool]),
  style: _propTypes.default.object,
  imgStyle: _propTypes.default.object,
  placeholderStyle: _propTypes.default.object,
  placeholderClassName: _propTypes.default.string,
  backgroundColor: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.bool]),
  onLoad: _propTypes.default.func,
  onError: _propTypes.default.func,
  onStartLoad: _propTypes.default.func,
  Tag: _propTypes.default.string,
  itemProp: _propTypes.default.string,
  loading: _propTypes.default.oneOf(["auto", "lazy", "eager"]),
  draggable: _propTypes.default.bool
};
var _default = Image;
exports["default"] = _default;

/***/ }),

/***/ "./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js":
/*!**********************************************************************!*\
  !*** ./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GatsbyImage": () => (/* binding */ B),
/* harmony export */   "MainImage": () => (/* binding */ z),
/* harmony export */   "Placeholder": () => (/* binding */ O),
/* harmony export */   "StaticImage": () => (/* binding */ V),
/* harmony export */   "generateImageData": () => (/* binding */ f),
/* harmony export */   "getImage": () => (/* binding */ M),
/* harmony export */   "getImageData": () => (/* binding */ x),
/* harmony export */   "getLowResolutionImageURL": () => (/* binding */ m),
/* harmony export */   "getSrc": () => (/* binding */ S),
/* harmony export */   "getSrcSet": () => (/* binding */ N),
/* harmony export */   "withArtDirection": () => (/* binding */ I)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var camelcase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! camelcase */ "./node_modules/gatsby-plugin-image/node_modules/camelcase/index.js");
/* harmony import */ var camelcase__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(camelcase__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);





function n() {
  return n = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var a = arguments[t];

      for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i]);
    }

    return e;
  }, n.apply(this, arguments);
}

function o(e, t) {
  if (null == e) return {};
  var a,
      i,
      r = {},
      n = Object.keys(e);

  for (i = 0; i < n.length; i++) t.indexOf(a = n[i]) >= 0 || (r[a] = e[a]);

  return r;
}

var s = [.25, .5, 1, 2],
    l = [750, 1080, 1366, 1920],
    d = [320, 654, 768, 1024, 1366, 1600, 1920, 2048, 2560, 3440, 3840, 4096],
    u = function (e) {
  return console.warn(e);
},
    c = function (e, t) {
  return e - t;
},
    h = function (e) {
  return e.map(function (e) {
    return e.src + " " + e.width + "w";
  }).join(",\n");
};

function g(e) {
  var t = e.lastIndexOf(".");

  if (-1 !== t) {
    var a = e.slice(t + 1);
    if ("jpeg" === a) return "jpg";
    if (3 === a.length || 4 === a.length) return a;
  }
}

function p(e) {
  var t = e.layout,
      i = void 0 === t ? "constrained" : t,
      r = e.width,
      o = e.height,
      s = e.sourceMetadata,
      l = e.breakpoints,
      d = e.aspectRatio,
      u = e.formats,
      c = void 0 === u ? ["auto", "webp"] : u;
  return c = c.map(function (e) {
    return e.toLowerCase();
  }), i = camelcase__WEBPACK_IMPORTED_MODULE_1___default()(i), r && o ? n({}, e, {
    formats: c,
    layout: i,
    aspectRatio: r / o
  }) : (s.width && s.height && !d && (d = s.width / s.height), "fullWidth" === i ? (r = r || s.width || l[l.length - 1], o = o || Math.round(r / (d || 1.3333333333333333))) : (r || (r = o && d ? o * d : s.width ? s.width : o ? Math.round(o / 1.3333333333333333) : 800), d && !o ? o = Math.round(r / d) : d || (d = r / o)), n({}, e, {
    width: r,
    height: o,
    aspectRatio: d,
    layout: i,
    formats: c
  }));
}

function m(e, t) {
  var a;
  return void 0 === t && (t = 20), null == (a = (0, (e = p(e)).generateImageSource)(e.filename, t, Math.round(t / e.aspectRatio), e.sourceMetadata.format || "jpg", e.fit, e.options)) ? void 0 : a.src;
}

function f(e) {
  var t,
      a = (e = p(e)).pluginName,
      i = e.sourceMetadata,
      r = e.generateImageSource,
      o = e.layout,
      d = e.fit,
      c = e.options,
      m = e.width,
      f = e.height,
      b = e.filename,
      E = e.reporter,
      k = void 0 === E ? {
    warn: u
  } : E,
      M = e.backgroundColor,
      S = e.placeholderURL;
  if (a || k.warn('[gatsby-plugin-image] "generateImageData" was not passed a plugin name'), "function" != typeof r) throw new Error("generateImageSource must be a function");
  i && (i.width || i.height) ? i.format || (i.format = g(b)) : i = {
    width: m,
    height: f,
    format: (null == (t = i) ? void 0 : t.format) || g(b) || "auto"
  };
  var N = new Set(e.formats);
  (0 === N.size || N.has("auto") || N.has("")) && (N.delete("auto"), N.delete(""), N.add(i.format)), N.has("jpg") && N.has("png") && (k.warn("[" + a + "] Specifying both 'jpg' and 'png' formats is not supported. Using 'auto' instead"), N.delete("jpg" === i.format ? "png" : "jpg"));

  var x = function (e) {
    var t = e.filename,
        a = e.layout,
        i = void 0 === a ? "constrained" : a,
        r = e.sourceMetadata,
        o = e.reporter,
        d = void 0 === o ? {
      warn: u
    } : o,
        c = e.breakpoints,
        h = void 0 === c ? l : c,
        g = Object.entries({
      width: e.width,
      height: e.height
    }).filter(function (e) {
      var t = e[1];
      return "number" == typeof t && t < 1;
    });
    if (g.length) throw new Error("Specified dimensions for images must be positive numbers (> 0). Problem dimensions you have are " + g.map(function (e) {
      return e.join(": ");
    }).join(", "));
    return "fixed" === i ? function (e) {
      var t = e.filename,
          a = e.sourceMetadata,
          i = e.width,
          r = e.height,
          n = e.fit,
          o = void 0 === n ? "cover" : n,
          l = e.outputPixelDensities,
          d = e.reporter,
          c = void 0 === d ? {
        warn: u
      } : d,
          h = a.width / a.height,
          g = v(void 0 === l ? s : l);

      if (i && r) {
        var p = y(a, {
          width: i,
          height: r,
          fit: o
        });
        i = p.width, r = p.height, h = p.aspectRatio;
      }

      i ? r || (r = Math.round(i / h)) : i = r ? Math.round(r * h) : 800;
      var m = i;

      if (a.width < i || a.height < r) {
        var f = a.width < i ? "width" : "height";
        c.warn("\nThe requested " + f + ' "' + ("width" === f ? i : r) + 'px" for the image ' + t + " was larger than the actual image " + f + " of " + a[f] + "px. If possible, replace the current image with a larger one."), "width" === f ? (i = a.width, r = Math.round(i / h)) : i = (r = a.height) * h;
      }

      return {
        sizes: g.filter(function (e) {
          return e >= 1;
        }).map(function (e) {
          return Math.round(e * i);
        }).filter(function (e) {
          return e <= a.width;
        }),
        aspectRatio: h,
        presentationWidth: m,
        presentationHeight: Math.round(m / h),
        unscaledWidth: i
      };
    }(e) : "constrained" === i ? w(e) : "fullWidth" === i ? w(n({
      breakpoints: h
    }, e)) : (d.warn("No valid layout was provided for the image at " + t + ". Valid image layouts are fixed, fullWidth, and constrained. Found " + i), {
      sizes: [r.width],
      presentationWidth: r.width,
      presentationHeight: r.height,
      aspectRatio: r.width / r.height,
      unscaledWidth: r.width
    });
  }(n({}, e, {
    sourceMetadata: i
  })),
      I = {
    sources: []
  },
      W = e.sizes;

  W || (W = function (e, t) {
    switch (t) {
      case "constrained":
        return "(min-width: " + e + "px) " + e + "px, 100vw";

      case "fixed":
        return e + "px";

      case "fullWidth":
        return "100vw";

      default:
        return;
    }
  }(x.presentationWidth, o)), N.forEach(function (e) {
    var t = x.sizes.map(function (t) {
      var i = r(b, t, Math.round(t / x.aspectRatio), e, d, c);
      if (null != i && i.width && i.height && i.src && i.format) return i;
      k.warn("[" + a + "] The resolver for image " + b + " returned an invalid value.");
    }).filter(Boolean);

    if ("jpg" === e || "png" === e || "auto" === e) {
      var i = t.find(function (e) {
        return e.width === x.unscaledWidth;
      }) || t[0];
      i && (I.fallback = {
        src: i.src,
        srcSet: h(t),
        sizes: W
      });
    } else {
      var n;
      null == (n = I.sources) || n.push({
        srcSet: h(t),
        sizes: W,
        type: "image/" + e
      });
    }
  });
  var R = {
    images: I,
    layout: o,
    backgroundColor: M
  };

  switch (S && (R.placeholder = {
    fallback: S
  }), o) {
    case "fixed":
      R.width = x.presentationWidth, R.height = x.presentationHeight;
      break;

    case "fullWidth":
      R.width = 1, R.height = 1 / x.aspectRatio;
      break;

    case "constrained":
      R.width = e.width || x.presentationWidth || 1, R.height = (R.width || 1) / x.aspectRatio;
  }

  return R;
}

var v = function (e) {
  return Array.from(new Set([1].concat(e))).sort(c);
};

function w(e) {
  var t,
      a = e.sourceMetadata,
      i = e.width,
      r = e.height,
      n = e.fit,
      o = void 0 === n ? "cover" : n,
      l = e.outputPixelDensities,
      d = e.breakpoints,
      u = e.layout,
      h = a.width / a.height,
      g = v(void 0 === l ? s : l);

  if (i && r) {
    var p = y(a, {
      width: i,
      height: r,
      fit: o
    });
    i = p.width, r = p.height, h = p.aspectRatio;
  }

  i = i && Math.min(i, a.width), r = r && Math.min(r, a.height), i || r || (r = (i = Math.min(800, a.width)) / h), i || (i = r * h);
  var m = i;
  return (a.width < i || a.height < r) && (i = a.width, r = a.height), i = Math.round(i), (null == d ? void 0 : d.length) > 0 ? (t = d.filter(function (e) {
    return e <= a.width;
  })).length < d.length && !t.includes(a.width) && t.push(a.width) : t = (t = g.map(function (e) {
    return Math.round(e * i);
  })).filter(function (e) {
    return e <= a.width;
  }), "constrained" !== u || t.includes(i) || t.push(i), {
    sizes: t = t.sort(c),
    aspectRatio: h,
    presentationWidth: m,
    presentationHeight: Math.round(m / h),
    unscaledWidth: i
  };
}

function y(e, t) {
  var a = e.width / e.height,
      i = t.width,
      r = t.height;

  switch (t.fit) {
    case "fill":
      i = t.width ? t.width : e.width, r = t.height ? t.height : e.height;
      break;

    case "inside":
      var n = t.width ? t.width : Number.MAX_SAFE_INTEGER,
          o = t.height ? t.height : Number.MAX_SAFE_INTEGER;
      i = Math.min(n, Math.round(o * a)), r = Math.min(o, Math.round(n / a));
      break;

    case "outside":
      var s = t.width ? t.width : 0,
          l = t.height ? t.height : 0;
      i = Math.max(s, Math.round(l * a)), r = Math.max(l, Math.round(s / a));
      break;

    default:
      t.width && !t.height && (i = t.width, r = Math.round(t.width / a)), t.height && !t.width && (i = Math.round(t.height * a), r = t.height);
  }

  return {
    width: i,
    height: r,
    aspectRatio: i / r
  };
}

var b = ["baseUrl", "urlBuilder", "sourceWidth", "sourceHeight", "pluginName", "formats", "breakpoints", "options"],
    E = ["images", "placeholder"];

function k() {
  return "undefined" != typeof GATSBY___IMAGE && GATSBY___IMAGE;
}

var M = function (e) {
  var t;
  return function (e) {
    var t, a;
    return Boolean(null == e || null == (t = e.images) || null == (a = t.fallback) ? void 0 : a.src);
  }(e) ? e : function (e) {
    return Boolean(null == e ? void 0 : e.gatsbyImageData);
  }(e) ? e.gatsbyImageData : function (e) {
    return Boolean(null == e ? void 0 : e.gatsbyImage);
  }(e) ? e.gatsbyImage : null == e || null == (t = e.childImageSharp) ? void 0 : t.gatsbyImageData;
},
    S = function (e) {
  var t, a, i;
  return null == (t = M(e)) || null == (a = t.images) || null == (i = a.fallback) ? void 0 : i.src;
},
    N = function (e) {
  var t, a, i;
  return null == (t = M(e)) || null == (a = t.images) || null == (i = a.fallback) ? void 0 : i.srcSet;
};

function x(e) {
  var t,
      a = e.baseUrl,
      i = e.urlBuilder,
      r = e.sourceWidth,
      s = e.sourceHeight,
      l = e.pluginName,
      u = void 0 === l ? "getImageData" : l,
      c = e.formats,
      h = void 0 === c ? ["auto"] : c,
      g = e.breakpoints,
      p = e.options,
      m = o(e, b);
  return null != (t = g) && t.length || "fullWidth" !== m.layout && "FULL_WIDTH" !== m.layout || (g = d), f(n({}, m, {
    pluginName: u,
    generateImageSource: function (e, t, a, r) {
      return {
        width: t,
        height: a,
        format: r,
        src: i({
          baseUrl: e,
          width: t,
          height: a,
          options: p,
          format: r
        })
      };
    },
    filename: a,
    formats: h,
    breakpoints: g,
    sourceMetadata: {
      width: r,
      height: s,
      format: "auto"
    }
  }));
}

function I(e, t) {
  var a,
      i,
      r,
      s = e.images,
      l = e.placeholder,
      d = n({}, o(e, E), {
    images: n({}, s, {
      sources: []
    }),
    placeholder: l && n({}, l, {
      sources: []
    })
  });
  return t.forEach(function (t) {
    var a,
        i = t.media,
        r = t.image;
    i ? (r.layout !== e.layout && "development" === "development" && console.warn('[gatsby-plugin-image] Mismatched image layout: expected "' + e.layout + '" but received "' + r.layout + '". All art-directed images use the same layout as the default image'), (a = d.images.sources).push.apply(a, r.images.sources.map(function (e) {
      return n({}, e, {
        media: i
      });
    }).concat([{
      media: i,
      srcSet: r.images.fallback.srcSet
    }])), d.placeholder && d.placeholder.sources.push({
      media: i,
      srcSet: r.placeholder.fallback
    })) :  true && console.warn("[gatsby-plugin-image] All art-directed images passed to must have a value set for `media`. Skipping.");
  }), (a = d.images.sources).push.apply(a, s.sources), null != l && l.sources && (null == (i = d.placeholder) || (r = i.sources).push.apply(r, l.sources)), d;
}

var W,
    R = ["src", "srcSet", "loading", "alt", "shouldLoad"],
    j = ["fallback", "sources", "shouldLoad"],
    _ = function (t) {
  var a = t.src,
      i = t.srcSet,
      r = t.loading,
      s = t.alt,
      l = void 0 === s ? "" : s,
      d = t.shouldLoad,
      u = o(t, R);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", n({}, u, {
    decoding: "async",
    loading: r,
    src: d ? a : void 0,
    "data-src": d ? void 0 : a,
    srcSet: d ? i : void 0,
    "data-srcset": d ? void 0 : i,
    alt: l
  }));
},
    A = function (t) {
  var a = t.fallback,
      i = t.sources,
      r = void 0 === i ? [] : i,
      s = t.shouldLoad,
      l = void 0 === s || s,
      d = o(t, j),
      u = d.sizes || (null == a ? void 0 : a.sizes),
      c = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_, n({}, d, a, {
    sizes: u,
    shouldLoad: l
  }));
  return r.length ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("picture", null, r.map(function (t) {
    var a = t.media,
        i = t.srcSet,
        r = t.type;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("source", {
      key: a + "-" + r + "-" + i,
      type: r,
      media: a,
      srcSet: l ? i : void 0,
      "data-srcset": l ? void 0 : i,
      sizes: u
    });
  }), c) : c;
};

_.propTypes = {
  src: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
  alt: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
  sizes: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
  srcSet: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
  shouldLoad: prop_types__WEBPACK_IMPORTED_MODULE_2__.bool
}, A.displayName = "Picture", A.propTypes = {
  alt: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
  shouldLoad: prop_types__WEBPACK_IMPORTED_MODULE_2__.bool,
  fallback: prop_types__WEBPACK_IMPORTED_MODULE_2__.exact({
    src: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
    srcSet: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    sizes: prop_types__WEBPACK_IMPORTED_MODULE_2__.string
  }),
  sources: prop_types__WEBPACK_IMPORTED_MODULE_2__.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2__.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2__.exact({
    media: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
    type: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    sizes: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    srcSet: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired
  }), prop_types__WEBPACK_IMPORTED_MODULE_2__.exact({
    media: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    type: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
    sizes: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    srcSet: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired
  })]))
};

var T = ["fallback"],
    O = function (t) {
  var a = t.fallback,
      i = o(t, T);
  return a ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(A, n({}, i, {
    fallback: {
      src: a
    },
    "aria-hidden": !0,
    alt: ""
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", n({}, i));
};

O.displayName = "Placeholder", O.propTypes = {
  fallback: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
  sources: null == (W = A.propTypes) ? void 0 : W.sources,
  alt: function (e, t, a) {
    return e[t] ? new Error("Invalid prop `" + t + "` supplied to `" + a + "`. Validation failed.") : null;
  }
};

var z = function (t) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(A, n({}, t)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("noscript", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(A, n({}, t, {
    shouldLoad: !0
  }))));
};

z.displayName = "MainImage", z.propTypes = A.propTypes;

var L = ["children"],
    q = function () {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("script", {
    type: "module",
    dangerouslySetInnerHTML: {
      __html: 'const t="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype;if(t){const t=document.querySelectorAll("img[data-main-image]");for(let e of t){e.dataset.src&&(e.setAttribute("src",e.dataset.src),e.removeAttribute("data-src")),e.dataset.srcset&&(e.setAttribute("srcset",e.dataset.srcset),e.removeAttribute("data-srcset"));const t=e.parentNode.querySelectorAll("source[data-srcset]");for(let e of t)e.setAttribute("srcset",e.dataset.srcset),e.removeAttribute("data-srcset");e.complete&&(e.style.opacity=1,e.parentNode.parentNode.querySelector("[data-placeholder-image]").style.opacity=0)}}'
    }
  });
},
    C = function (t) {
  var a = t.layout,
      i = t.width,
      r = t.height;
  return "fullWidth" === a ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    "aria-hidden": !0,
    style: {
      paddingTop: r / i * 100 + "%"
    }
  }) : "constrained" === a ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    style: {
      maxWidth: i,
      display: "block"
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
    alt: "",
    role: "presentation",
    "aria-hidden": "true",
    src: "data:image/svg+xml;charset=utf-8,%3Csvg height='" + r + "' width='" + i + "' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E",
    style: {
      maxWidth: "100%",
      display: "block",
      position: "static"
    }
  })) : null;
},
    D = function (a) {
  var i = a.children,
      r = o(a, L);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(C, n({}, r)), i, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(q, null));
},
    P = ["as", "className", "class", "style", "image", "loading", "imgClassName", "imgStyle", "backgroundColor", "objectFit", "objectPosition"],
    H = ["style", "className"],
    F = function (e) {
  return e.replace(/\n/g, "");
},
    B = function (t) {
  var a = t.as,
      i = void 0 === a ? "div" : a,
      r = t.className,
      s = t.class,
      l = t.style,
      d = t.image,
      u = t.loading,
      c = void 0 === u ? "lazy" : u,
      h = t.imgClassName,
      g = t.imgStyle,
      p = t.backgroundColor,
      m = t.objectFit,
      f = t.objectPosition,
      v = o(t, P);
  if (!d) return console.warn("[gatsby-plugin-image] Missing image prop"), null;
  s && (r = s), g = n({
    objectFit: m,
    objectPosition: f,
    backgroundColor: p
  }, g);

  var w = d.width,
      y = d.height,
      b = d.layout,
      E = d.images,
      M = d.placeholder,
      S = d.backgroundColor,
      N = function (e, t, a) {
    var i = {},
        r = "gatsby-image-wrapper";
    return k() || (i.position = "relative", i.overflow = "hidden"), "fixed" === a ? (i.width = e, i.height = t) : "constrained" === a && (k() || (i.display = "inline-block", i.verticalAlign = "top"), r = "gatsby-image-wrapper gatsby-image-wrapper-constrained"), {
      className: r,
      "data-gatsby-image-wrapper": "",
      style: i
    };
  }(w, y, b),
      x = N.style,
      I = N.className,
      W = o(N, H),
      R = {
    fallback: void 0,
    sources: []
  };

  return E.fallback && (R.fallback = n({}, E.fallback, {
    srcSet: E.fallback.srcSet ? F(E.fallback.srcSet) : void 0
  })), E.sources && (R.sources = E.sources.map(function (e) {
    return n({}, e, {
      srcSet: F(e.srcSet)
    });
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(i, n({}, W, {
    style: n({}, x, l, {
      backgroundColor: p
    }),
    className: I + (r ? " " + r : "")
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(D, {
    layout: b,
    width: w,
    height: y
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(O, n({}, function (e, t, a, i, r, o, s, l) {
    var d = {};
    o && (d.backgroundColor = o, "fixed" === a ? (d.width = i, d.height = r, d.backgroundColor = o, d.position = "relative") : ("constrained" === a || "fullWidth" === a) && (d.position = "absolute", d.top = 0, d.left = 0, d.bottom = 0, d.right = 0)), s && (d.objectFit = s), l && (d.objectPosition = l);
    var u = n({}, e, {
      "aria-hidden": !0,
      "data-placeholder-image": "",
      style: n({
        opacity: 1,
        transition: "opacity 500ms linear"
      }, d)
    });
    return k() || (u.style = {
      height: "100%",
      left: 0,
      position: "absolute",
      top: 0,
      width: "100%"
    }), u;
  }(M, 0, b, w, y, S, m, f))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(z, n({
    "data-gatsby-image-ssr": "",
    className: h
  }, v, function (e, t, a, i, r) {
    return void 0 === r && (r = {}), k() || (r = n({
      height: "100%",
      left: 0,
      position: "absolute",
      top: 0,
      transform: "translateZ(0)",
      transition: "opacity 250ms linear",
      width: "100%",
      willChange: "opacity"
    }, r)), n({}, a, {
      loading: i,
      shouldLoad: e,
      "data-main-image": "",
      style: n({}, r, {
        opacity: 0
      })
    });
  }("eager" === c, 0, R, c, g)))));
},
    G = ["src", "__imageData", "__error", "width", "height", "aspectRatio", "tracedSVGOptions", "placeholder", "formats", "quality", "transformOptions", "jpgOptions", "pngOptions", "webpOptions", "avifOptions", "blurredOptions"],
    V = function (t) {
  return function (a) {
    var i = a.src,
        r = a.__imageData,
        s = a.__error,
        l = o(a, G);
    return s && console.warn(s), r ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(t, n({
      image: r
    }, l)) : (console.warn("Image not loaded", i), s || "development" !== "development" || console.warn('Please ensure that "gatsby-plugin-image" is included in the plugins array in gatsby-config.js, and that your version of gatsby is at least 2.24.78'), null);
  };
}(B),
    U = function (e, t) {
  return "fullWidth" !== e.layout || "width" !== t && "height" !== t || !e[t] ? prop_types__WEBPACK_IMPORTED_MODULE_2___default().number.apply((prop_types__WEBPACK_IMPORTED_MODULE_2___default()), [e, t].concat([].slice.call(arguments, 2))) : new Error('"' + t + '" ' + e[t] + " may not be passed when layout is fullWidth.");
},
    X = new Set(["fixed", "fullWidth", "constrained"]),
    Y = {
  src: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string.isRequired),
  alt: function (e, t, a) {
    return e.alt || "" === e.alt ? prop_types__WEBPACK_IMPORTED_MODULE_2___default().string.apply((prop_types__WEBPACK_IMPORTED_MODULE_2___default()), [e, t, a].concat([].slice.call(arguments, 3))) : new Error('The "alt" prop is required in ' + a + '. If the image is purely presentational then pass an empty string: e.g. alt="". Learn more: https://a11y-style-guide.com/style-guide/section-media.html');
  },
  width: U,
  height: U,
  sizes: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  layout: function (e) {
    if (void 0 !== e.layout && !X.has(e.layout)) return new Error("Invalid value " + e.layout + '" provided for prop "layout". Defaulting to "constrained". Valid values are "fixed", "fullWidth" or "constrained".');
  }
};

V.displayName = "StaticImage", V.propTypes = Y;


/***/ }),

/***/ "./node_modules/gatsby-plugin-image/node_modules/camelcase/index.js":
/*!**************************************************************************!*\
  !*** ./node_modules/gatsby-plugin-image/node_modules/camelcase/index.js ***!
  \**************************************************************************/
/***/ ((module) => {



const preserveCamelCase = string => {
  let isLastCharLower = false;
  let isLastCharUpper = false;
  let isLastLastCharUpper = false;

  for (let i = 0; i < string.length; i++) {
    const character = string[i];

    if (isLastCharLower && /[a-zA-Z]/.test(character) && character.toUpperCase() === character) {
      string = string.slice(0, i) + '-' + string.slice(i);
      isLastCharLower = false;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = true;
      i++;
    } else if (isLastCharUpper && isLastLastCharUpper && /[a-zA-Z]/.test(character) && character.toLowerCase() === character) {
      string = string.slice(0, i - 1) + '-' + string.slice(i - 1);
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = false;
      isLastCharLower = true;
    } else {
      isLastCharLower = character.toLowerCase() === character && character.toUpperCase() !== character;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = character.toUpperCase() === character && character.toLowerCase() !== character;
    }
  }

  return string;
};

const camelCase = (input, options) => {
  if (!(typeof input === 'string' || Array.isArray(input))) {
    throw new TypeError('Expected the input to be `string | string[]`');
  }

  options = Object.assign({
    pascalCase: false
  }, options);

  const postProcess = x => options.pascalCase ? x.charAt(0).toUpperCase() + x.slice(1) : x;

  if (Array.isArray(input)) {
    input = input.map(x => x.trim()).filter(x => x.length).join('-');
  } else {
    input = input.trim();
  }

  if (input.length === 0) {
    return '';
  }

  if (input.length === 1) {
    return options.pascalCase ? input.toUpperCase() : input.toLowerCase();
  }

  const hasUpperCase = input !== input.toLowerCase();

  if (hasUpperCase) {
    input = preserveCamelCase(input);
  }

  input = input.replace(/^[_.\- ]+/, '').toLowerCase().replace(/[_.\- ]+(\w|$)/g, (_, p1) => p1.toUpperCase()).replace(/\d+(\w|$)/g, m => m.toUpperCase());
  return postProcess(input);
};

module.exports = camelCase; // TODO: Remove this for the next major release

module.exports["default"] = camelCase;

/***/ }),

/***/ "./src/pages/popular-post.js":
/*!***********************************!*\
  !*** ./src/pages/popular-post.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _public_page_data_sq_d_2740687385_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../public/page-data/sq/d/2740687385.json */ "./public/page-data/sq/d/2740687385.json");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");
/* harmony import */ var gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gatsby-plugin-image */ "./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js");
/* harmony import */ var gatsby_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gatsby-image */ "./node_modules/gatsby-image/index.js");







const PopularPost = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.StaticQuery, {
  query: "2740687385",
  render: data => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, data.allWpPost.nodes.map((post, node, nodes) => {
    const {
      slug,
      id,
      title,
      categories,
      featuredImage,
      content,
      date,
      excerpt
    } = post;
    let img = (0,gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_4__.getImage)(featuredImage.node.localFile.childImageSharp.gatsbyImageData);
    const categ = categories.nodes;
    const aut = categ[0].icat.caticon.localFile.childImageSharp.fluid;
    var x = content;
    const time = 1500;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
      key: id,
      class: "flex justify-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
      class: "block text-left mb-5 mt-10 pr-10"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.Link, {
      kay: categ[0].id,
      to: `/${categ[0].slug}`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
      class: "flex"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(gatsby_image__WEBPACK_IMPORTED_MODULE_3__["default"], {
      fluid: aut,
      alt: "A corgi smiling happily",
      className: "h-10 w-10 object-cover rounded-full mr-3"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h6", {
      className: "font-bold text-indigo-700 hover:text-pink-700"
    }, categ[0].name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("small", {
      className: "text-sm"
    }, date, " - ", Math.round(x.length / time), " \u043C\u0438\u043D\u0443\u0442")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.Link, {
      kay: id,
      to: `/${categ[0].slug}/${slug}`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
      class: "pt-4 mb-5"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", {
      className: "text-xl2 font-bold mb-2"
    }, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", {
      class: "text-sm mb-2",
      dangerouslySetInnerHTML: {
        __html: excerpt
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_4__.GatsbyImage, {
      class: "rounded-lg",
      image: img,
      alt: title
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", {
      class: "text-blue-600"
    }, "\u0427\u0438\u0442\u0430\u0442\u044C \u0441\u0442\u0430\u0442\u044C\u044E \u2192"))));
  })),
  data: _public_page_data_sq_d_2740687385_json__WEBPACK_IMPORTED_MODULE_0__
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PopularPost);

/***/ }),

/***/ "./public/page-data/sq/d/2740687385.json":
/*!***********************************************!*\
  !*** ./public/page-data/sq/d/2740687385.json ***!
  \***********************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"data":{"allWpPost":{"nodes":[{"date":"4 июля 2022 г.","id":"cG9zdDo2Ng==","excerpt":"<p>Семантическое ядро&nbsp;— это список&nbsp;релевантных ключевых слов&nbsp;для продвижения сайта. Релевантность ключевых слов определяется частотностью, популярностью и актуальностью поискового запроса. Семантическое ядро&nbsp;необходимо для продвижения сайта, ведь если вы не знаете по каким запросам ищет информацию в сети пользователь — вы никогда не будете популярны. Если вас не видят по этим релевантным запросам — вы не будете популярны. [&hellip;]</p>\\n","content":"\\n<p><strong>Семантическое ядро</strong>&nbsp;— это список&nbsp;<a href=\\"https://teox.eu/lifehack/klasterizacziya-semanticheskogo-yadra/\\">релевантных ключевых слов</a>&nbsp;для продвижения сайта. Релевантность ключевых слов определяется частотностью, популярностью и актуальностью поискового запроса.</p>\\n\\n\\n\\n<p><a href=\\"https://teox.eu/lifehack/klasterizacziya-semanticheskogo-yadra/\\">Семантическое ядро</a>&nbsp;необходимо для продвижения сайта, ведь если вы не знаете по каким запросам ищет информацию в сети пользователь — вы никогда не будете популярны. Если вас не видят по этим релевантным запросам — вы не будете популярны. Соответственно, эффективность семантического ядра определяется качеством, структурой и анализом данных.</p>\\n\\n\\n\\n<p>Как расширять семантическое ядро. Об этом мы и поговорим в сегодняшней статье.</p>\\n\\n\\n\\n<p>Рекомендую перед прочтением этой статьи прочитать о том,&nbsp;<a href=\\"https://teox.eu/educations/seo-chto-eto-takoe/\\">что такое seo</a>.</p>\\n\\n\\n\\n<p><strong>Перед тем, как начать, составим план:</strong></p>\\n\\n\\n\\n<ol><li>Понятие, что такое семантическое ядро</li><li>Инструменты работы с семантическим ядром</li><li>Первичный сбор ключевых слов</li><li>Структура ключевых слов</li><li>Расширение семантического ядра</li></ol>\\n\\n\\n\\n<h2>Что такое семантическое ядро?</h2>\\n\\n\\n\\n<p><strong>Семантическое ядро сайта</strong>&nbsp;— это набор поисковых слов, их морфологических форм и словосочетаний, которые наиболее точно характеризуют вид деятельности, товар или услугу, предлагаемые сайтом. Ключевые слова (поисковые запросы) для семантического ядра подбираются путём строгого анализа услуг или товаров компании, анализа статистики поисковой системы, статистики сайта, конкурентов на рынке и сезонности ключевых слов. Запросы в семантическом ядре должны максимально соответствовать представлениям посетителей о сайте.</p>\\n\\n\\n\\n<p><strong>ВАЖНО!</strong>&nbsp;Семантическое ядро сайта составляют те ключевые слова, которые уже обнаружила поисковая машина при сканировании сайта!</p>\\n\\n\\n\\n<p>То есть, если у вас есть сайт и вы хотите продвигать его по определенному ряду ключевых слов, то поисковая машина, должна видеть эти слова на вашем сайте. Соответственно, на этом этапе не важно, на какой странице в поисковой выдаче есть ваш сайт по этим ключевым словам, главное, чтобы он был хоть где-то.</p>\\n\\n\\n\\n<p>Существует ряд инструментов для работы с семантическим ядром, о некоторых мы поговорим ниже. Но перед тем, как выбрать инструмент, я рекомендую потратить время и «поиграться» с каждым существующим, чтобы понять, что подходит именно вам.</p>\\n\\n\\n\\n<h2>Инструменты работы с семантическим ядром</h2>\\n\\n\\n\\n<p>Описанные ниже инструменты не гарантированно станут решением ваших задач и целей. Ряд инструментов для работы с семантическим ядром является платным, а некоторые бесплатны. Я предлагаю вам выбрать один или несколько инструментов сбора ключевых слов, для работы параллельно прочтению этой статьи, выбирайте:</p>\\n\\n\\n\\n<h2><strong>Бесплатные инструменты&nbsp;сбора ключевых слов</strong></h2>\\n\\n\\n\\n<p><a href=\\"http://wordstat.yandex.ru/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">Яндекс Вордстат</a>&nbsp;— бесплатный инструмент для сбора ключевых фраз, аналитики и просмотра частотностей.</p>\\n\\n\\n\\n<p><a href=\\"http://wordstat.rambler.ru/wrds/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">Рамблер Вордстат</a>&nbsp;— аналогичный инструмент на подобие Яндекс Вордстат — позволяет просмотреть частотности поисковых запросов, отсортировать по регионам.</p>\\n\\n\\n\\n<p><a href=\\"https://adwords.google.com/select/KeywordToolExternal\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">Keyword Planner от Google</a>&nbsp;— инструмент от самой популярной поисковой системы. Имеет больше возможностей и пунктов проверки, чем его «собратья» из других поисковиков.</p>\\n\\n\\n\\n<p><a href=\\"https://google.com/trends/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">Тренды Google</a>&nbsp;— подходит для мониторинга трендов слов в месяц. Тут вы можете увидеть, что наиболее популярно сейчас.</p>\\n\\n\\n\\n<h2><strong>Сбор семантического ядра из аналитики</strong></h2>\\n\\n\\n\\n<p><a href=\\"https://google.com/analytics/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">Google Analytics</a>&nbsp;— не смотря на то, что&nbsp;Google Analytics скрывает информацию о ключевых запросах, вытащить оттуда интересную информацию можно, особенно если вы связали аналитику с панелью вебмастера.</p>\\n\\n\\n\\n<p><a href=\\"http://metrika.yandex.ru/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">Яндекс.Метрика</a>&nbsp;— аналитика от Яндекса, поможет собрать список ключей, по которым к вам уже приходят или приходили пользователи.</p>\\n\\n\\n\\n<p><a href=\\"https://liveinternet.ru/stat/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">LiveInternet</a>&nbsp;— поможет собрать большую часть данных по ключевым словам, особенно если вы совместили поиск релевантных ключей с системами аналитики Яндекса и Google.</p>\\n\\n\\n\\n<h2>Платные программы и сервисы для сбора семантического ядра</h2>\\n\\n\\n\\n<p>Рекомендую тщательно выбирать платный инструмент сбора ключевых слов. Как правило, каждый сервис или программа предлагаю «Демо» доступ к возможностям, чем вы вполне можете пользоваться, чтобы выявить наиболее полезный для вас инструмент.</p>\\n\\n\\n\\n<p>Программы готовых баз ключевых слов</p>\\n\\n\\n\\n<p><a href=\\"https://xseo.top/tools/bazyi-klyuchevyih-slov-pastuhova/\\">Базы Макса Пастухова</a>&nbsp;— крутые базы ключевых слов, которые можно эффективно использовать для собрания самого эффективного семантического ядра. Однако самая главная особенность — в большом количестве данных и необходимости их обработать. На мой взгляд, программа отлично подходит для собирания ключей, но есть проще программы для анализа. Я использую несколько программ для работы с семантикой, но это другая тема.</p>\\n\\n\\n\\n<p><a href=\\"https://xseo.top/tools/key-collector-programma-dlya-sostavleniya-semanticheskogo-yadra/\\">Key Collector</a>&nbsp;— пожалуй, самая функциональная программа на рынке для сбора, анализа и создания эффективного семантического ядра.</p>\\n\\n\\n\\n<p><a href=\\"https://yazzle.ru/seo/bc3bdb3fd1dc2e0074c0c125b894b234/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">CS Yazzle</a>&nbsp;— программа с множеством разных функций, которые позволяют очень многое, кроме удобного анализа семантического ядра, хотя эту программу позиционируют как инструмент для работы с ключами. Почитайте и попробуйте, все равно рекомендую вам ее приобрести.</p>\\n\\n\\n\\n<p><a href=\\"https://xseo.top/seo-faq/obzor-servisa-dlya-prodvizheniya-saytov-prodvigator-ua/\\">Serpstat.com</a>&nbsp;— онлайн сервис для работы с конкурентами, семантикой и многими другими факторами. Хотя этот сервис и является самым эффективным инструментом на рынке, но&nbsp;я бы рекомендовал формировать список в программе, предназначенной для этого, а вот анализировать только в «<a href=\\"https://xseo.top/tools/serpstat/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">Serpstat</a>.com».</p>\\n\\n\\n\\n<p><a href=\\"http://mutagen.ru/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">Мутаген</a>&nbsp;— база онлайн, где можно собрать весьма эффективный список ключевых слов для продвижения сайта.</p>\\n\\n\\n\\n<p><a href=\\"http://seomart.ru/baza-klyuchevyh-slov-up-base/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">UP Base</a>&nbsp; — основное преимущества этой программы — наличие англоязычной базы ключевых слов.</p>\\n\\n\\n\\n<p><strong>Специальные сервисы для создания семантического ядра</strong></p>\\n\\n\\n\\n<p><a href=\\"http://keywordtool.io/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">keywordtool.io</a>&nbsp;—&nbsp;<strong>бесплатный</strong>&nbsp;сервис для сбора семантического ядра.</p>\\n\\n\\n\\n<p><a href=\\"http://fastkeywords.biz/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">fastkeywords.biz</a>&nbsp;— условно бесплатный сервис для работы с семантическим ядром.</p>\\n\\n\\n\\n<p><a href=\\"https://wordtracker.com/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">wordtracker.com</a>&nbsp;— платный инструмент для работы с англоязычными списками ключевых слов.</p>\\n\\n\\n\\n<p><a href=\\"http://keywords.megaindex.ru/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">keywords.megaindex.ru</a>&nbsp;— бесплатный инструмент от сервиса «мегаиндекс», сам не пользуюсь, но говорят не очень удобный, зато бесплатный.</p>\\n\\n\\n\\n<h2>Программы для работы с большими ядрами</h2>\\n\\n\\n\\n<p><a href=\\"https://clevergizmos.com/keyword-organizer/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">Keyword Organizer</a>&nbsp;— платный инструмент для работы с семантическими ядрами, с возможностью сортировки.</p>\\n\\n\\n\\n<p><a href=\\"http://assistant.contentmonster.ru/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">Key Assistant</a>&nbsp;— инструмент для ручной сортировки ключевых слов, полезен, если вам лень разбираться в формулах xl.</p>\\n\\n\\n\\n<p><a href=\\"https://keysa.ru/?r=1679\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">Кейса&nbsp;</a>— отличный инструмент для создания иерархии ключевых слов, для организации и добавления собственных данных.</p>\\n\\n\\n\\n<h2>Первичный сбор ключевых слов</h2>\\n\\n\\n\\n<p>Теперь, когда вы выбрали для себя инструмент для сбора ключевых фраз, мы можем перейти непосредственно к работе и начать сбор семантического ядра.</p>\\n\\n\\n\\n<p>Для начала работы нам с вами нужна цель, давайте ее поставим и соберем, проанализируем и составим релевантное семантическое ядро. Пожалуй, я соберу семантику фраз для этой статьи, много не получится, но у вас появится отличный практический пример алгоритма работы.</p>\\n\\n\\n\\n<p>Пойдем простым путем и используем бесплатный инструмент от Яндекса.</p>\\n\\n\\n\\n<p>Мы можем уже составить релевантные фразы и увидеть частотности для того, чтобы двигаться дальше. Но мы забыли о геопривязке ключевых слов. В этом же инструменте есть набор функций:</p>\\n\\n\\n\\n<p>Если вы выставили фильтр и отсортировали ключевые слова по центральному региону России.</p>\\n\\n\\n\\n<p>Соответственно вы получаете совершенно другие цифры, которые соответствуют региональной привязке. То есть ключевой запрос «семантическое ядро» запрашивается пользователями в Яндексе 5253 раза в месяц.</p>\\n\\n\\n\\n<p>К слову, следует заметить, что эта цифра не стабильна, и если вы покопаетесь в инструментах, то сможете увидеть динамику запросов в течение месяцев.</p>\\n\\n\\n\\n<p><strong>Итак, у нас получился список ключей:</strong></p>\\n\\n\\n\\n<ol><li>семантическое ядро</li><li>семантическое ядро сайта</li><li>составление семантического ядра</li><li>сбор семантического ядра</li><li>как составить семантическое ядро</li></ol>\\n\\n\\n\\n<p>Дальше, если бы мы хотели собрать большое семантическое ядро, например про продающую страницу и сайт услуг по сбору семантики, мы могли бы воспользоваться программой готовых баз.</p>\\n\\n\\n\\n<p>Получаем несколько тысяч вариантов ключевых запросов</p>\\n\\n\\n\\n<p>Дальше можно поиграться с настройками и получить данные частотностей ключевых слов, отфильтровать и вытащить из этой базы самое полное семантическое ядро.</p>\\n\\n\\n\\n<p>Но у нас нет цели писать мануал по Базам Пастухова, поэтому двигаемся дальше.</p>\\n\\n\\n\\n<h2>Структура ключевых слов</h2>\\n\\n\\n\\n<p>Теперь, когда мы собрали больше чем 5 слов, нам нужно создать структуру данных. В задачи, которую я описал выше — сбор ключей для этой статьи, есть маленькое упущение — всего одна продвигаемая страница.</p>\\n\\n\\n\\n<p>Нам этого мало, поэтому мы рассмотрим другой пример для моего блога и структурируем семантическое ядро, используя программы для этого и обычную логику.</p>\\n\\n\\n\\n<p><strong>Структура данных</strong></p>\\n\\n\\n\\n<p>Для эффективного продвижения сайта нам нужно настроить структуру и разделить ключевые слова на группы. Я собрал 80 релевантных ключевых слов для продвижения некоторых статей, но прежде чем мы продолжим, давайте представим, что у нас есть сайт, на котором есть несколько страниц, под&nbsp;продвижение&nbsp;которых мы и собрали первичное семантическое ядро из 80 ключей.</p>\\n\\n\\n\\n<p>Я использовал сервис «<a href=\\"https://keysa.ru/?r=1679\\">Кейса</a>» для получения структуры данных. Немного времени и данные обрели структуру.</p>\\n\\n\\n\\n<p>Как вы понимаете, списки я создал в виде названий продвигаемых страниц. Внутри списков ключевые слова, которые буду использованы в продвижении этой страницы и для&nbsp;внутренней перелинковки.</p>\\n\\n\\n\\n<p>Далее мы формируем стратегию продвижения страниц. С помощью структурирования данных в группы ключевых слов под конкретные страницы, вы можете создавать саму стратегию или тактику продвижения.</p>\\n\\n\\n\\n<p>Это поможет как при настройке рекламных кампаний, так и для постановки тех. заданий для&nbsp;seo. Надеюсь, вам понятна логика структурирования данных. Если нет, задавайте вопросы в комментариях, я с удовольствием дополню.</p>\\n\\n\\n\\n<h2>Расширение семантического ядра</h2>\\n\\n\\n\\n<p>Что ж, возможно вам понадобится расширить семантическое ядро. Я обычно использую два метода:</p>\\n\\n\\n\\n<ul><li>Сбор похожих фраз</li><li>Сбор фраз из анализа конкурентов</li></ul>\\n\\n\\n\\n<p>Рассмотрим оба варианта.</p>\\n\\n\\n\\n<p><strong>#1 Расширение семантического ядра&nbsp;</strong></p>\\n\\n\\n\\n<p>Что такое «похожие фразы» в контексте рассмотрения темы семантического ядра?</p>\\n\\n\\n\\n<p>Как вариант, вы можете посмотреть ключевые слова, которые чаще всего употребляли с искомым вами запросом. И собрать более расширенное ядро для своего продвижения.</p>\\n\\n\\n\\n<p>Но наиболее эффективным будет использовать одну из упомянутых выше программ. Например, сервис «мутаген».</p>\\n\\n\\n\\n<p>То есть, сбор подсказок — это те слова, которые наиболее часты и популярны после того, как пользователь вводил искомый вами вопрос.</p>\\n\\n\\n\\n<p>Например, если человек вводит запрос «семантическое ядро», то возможно (скорее всего) он введет после этого более уточняющий запрос, например: «семантическое ядро как составить».</p>\\n\\n\\n\\n<blockquote class=\\"wp-block-quote\\"><p>Да, к слову, запятые и другие элементы знаков препинания не ранжируются поисковиками, так что не имеет значение, как вы вводите запрос, используете запятые или нет.</p></blockquote>\\n\\n\\n\\n<p>Второй вариант поиска подсказок, который я использую:&nbsp;Serpstat.com</p>\\n\\n\\n\\n<p>Вы вводите поисковой запрос и в разделе «поисковые запросы», получаете данные. Плюс этого сервиса в том, что вы видите популярность слова в поисковых системах.</p>\\n\\n\\n\\n<p>Но если вы перейдете на вкладку «похожие фразы», получите более подробный и целевой список.</p>\\n\\n\\n\\n<p>Все довольно просто и интуитивно понятно.</p>\\n\\n\\n\\n<p><strong>#2 Расширение семантического ядра — анализ конкурентов</strong></p>\\n\\n\\n\\n<p>Давайте рассмотрим еще один вариант сбора ключевых фраз из списка, по которому продвигаются ваши конкуренты. Самым лучшим сервисом для сбора этих данных, является&nbsp;<a href=\\"https://prodvigator.ru/?ref=557\\">Serpstat.com</a>.</p>\\n\\n\\n\\n<p>Для этого вводим запрос в поисковую форму и выбираем вкладку «страницы».</p>\\n\\n\\n\\n<p>Вы получаете список url страниц, которые наиболее популярны в поиске по этому запросу. Так же в графе «потенциальный трафик» вы найдете ни что иное, как тот самый потенциальный трафик.</p>\\n\\n\\n\\n<p>Далее: выбираем понравившийся нам url и кликаем по нему, попадая на страницу результатов, которые анализируем по пунктам:</p>\\n\\n\\n\\n<ul><li>позиции конкурентов</li><li>видимость в поисковой выдаче</li><li>ключевые слова и частотности</li></ul>\\n\\n\\n\\n<p>Подобные данные можно использовать для создания контента на своем сайте, наборе ссылочной массы и прочего. Надеюсь, опыт вам подскажет, а если нет, я обязательно еще напишу об этом.</p>\\n\\n\\n\\n<p><strong>Вывод</strong></p>\\n\\n\\n\\n<p><strong>Семантическое ядро</strong>, является одним из важнейших элементов плана по&nbsp;<a href=\\"https://teox.eu/lifehack/s-chego-nachat-seo/\\">продвижению сайта</a>. Создавая стратегию и тактику на любом этапе, вы прибегаете к полученным данным в семантическом ядре. Поэтому рекомендую уделять большое внимание этому этапу, чтобы не упустить на самом старте продвижения сайта важный элемент — эффективное семантическое ядро.</p>\\n\\n\\n\\n<p>На этом на сегодня все. Если у вас остались вопросы, задавайте их в комментариях.</p>\\n","slug":"instrumenty-dlya-sozdaniya-effektivnogo-semanticheskogo-yadra","title":"Инструменты для создания эффективного семантического ядра","author":{"node":{"name":"Andrew Roldugin","description":"Напишите немного о себе. Эта информация может отображаться на сайте."}},"categories":{"nodes":[{"name":"Инструменты","slug":"tools","id":"dGVybToz","icat":{"caticon":{"localFile":{"childImageSharp":{"fluid":{"base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAOxAAADsQH1g+1JAAAFZUlEQVQ4yy2TWWxUZRTHzxCivmmiTz75qA8ugUB8QI2KL8aFoKJoVHgQUYyCS4yKJkYTI0Sg0CKWsolAoaWdTqfQdgamdJm209JtZtpM29nvzNxl7jZ32pm7fOeYW304yZd8+X75zvn9D8hVAmWt0KOt4No5LSKUDQLJwFfFCilCBS1eJ7OoYb6g4ROSgZCUETIKwpKEnqTMwK3lMgJkJQsKsr2uWieo2WvgnXKVHpAMAqGCnwgVJF4np6gjFjQkTmXP5VQGWQUfySi4PS0jEBHEi5ZnOlcHKCqOh5NtqFu0XjawUzaIJAP9UoXeESoU5XWiooasoCHjVEY5hYWyCnsro+BUWmaUkllDYFaF8dQqRAsWwK+XFwEebgTZQK9SXYOZkkHE60g5BWlRYhgXGC2IjvsYOQ3pfxClZLSXy4xmOfOIZBJUkDzQO1l264PpZJVE/T9YXkVnlmd225LFDk+Z9MOoid8PmXh41KSehO2kFbRTMmPLZcSpbJ11T8p0+Q7/9MVQCdb6vz7MP+gbE/vSokVFnZxRzsHDs3XcN1KnfQM1tj9QtT+/uWLv8tbwvWs1OjJo4nKZYUYjNpyo0rlA4exgonbvKpEH6g5BSrCAk513iyrSHM9sF/bpSJ0OBlV2rIejlv4CXRrg6cKwQt/6V9i2s3U61F/DvMrYgshoKm9tjGTqkDIIQDLoVUHHT8UKRfMqUtuixfb9DzvZlaZz/ZzYOsgf6Rwr/xWcUVYG4jp93VFjrzWt0umgzJKyQ/MS3por2XtjAnsWxAoqgo5rEhISQ3dmbpvuz871c/LViPJoS28e/JEyBGLVrdHciuOdrtG2Jgv3Nov0z20OYzyjmMBotuTEQTTIFCrkuNFwbboC3Jm5bV4Z5BvP9OWhpY+7JzCjrl8WVmGRtwKxgk07mkxn90kND11dpNZh0YkKzJkTWB0SRdNa4q21nLnRcG26AtyZdY5JZ/0TZbgd1dbrK+hxBRY0NrRQYrT9qOnsbtSw5WaWTvdxzDsh40iqtgq+ManUHZEoKdqUUREPh03a5a2jKyA4q9T65ipbk5K1loaForNbryP5phx8/mcTvzmn0NXBAl68w1PzzTz9HSpNwYUgt+G4N/3SIm8PFHQkX9xytrdU6cA1gw3EKxTjataSYPmLOrulm0SJEtL7Dav44kGD/rohON6ISNfC0pWGztQLf/bkHoPXD45AOGFAXsM33Q3IqGj/3KHiloM52nNKYNfCFZrL2xTnHGofWcG3f+Nx4z6OvjvD441JifnuqtQfNZ5qG5Vg50/D/wU7wdvuok+565RWkLmh/f58BjfsGaNNe8fxuS8mnGc+iziPfziKmz6aoG9OJfHGhIT+KZUF4gaNpOo3RzPm/S4L5osmzBetN6KcSVHOtGbyJsZLNssozGn0ptiOH4fo5QMBfOWrIH58KEJN3pTTMyE53ojM/NMau7VQpaFkjcay5pPjWRNgIKZ5xhYNGJyvnAjFdArFdcc/KVMwqtN4ctVdK/yjfZmab+To0kARrwzydCFUcgVQZ0TGnhmN+qKV/cH5KvTHjHUQmNMgvLQCQwsGdE/IDRdDJWrqzp5vD0ub20elUFtYpJP+LDvelWYne3JuRFrP9hc2NXjToTOBAl0fL3/ZM6PD+VsluD5WBgjFdeidVjzNvXkIzGrQ6MtsaezK3Hc+WIDm3vxnzb15Ot2bt4/7MuxEV8aFuzah0Zd96HhXenPriASTJYSO8TL0zGgAfTMqdI1L4J+UIZyoehq8aWgdFj2/XEpAY3f2xQZvOnfkegqPdqTYsc5U9IQv85h793vrMhztSEH7uLzOf1eFtrAE3XdV+Bcv29xFEX6khwAAAABJRU5ErkJggg==","aspectRatio":1,"src":"/static/335240251b6dc03a51a4cb7afc76fb4a/62915/settings-1.png","srcSet":"/static/335240251b6dc03a51a4cb7afc76fb4a/62915/settings-1.png 128w","sizes":"(max-width: 128px) 100vw, 128px"}}}}}},{"name":"Работа","slug":"works","id":"dGVybTo1","icat":{"caticon":{"localFile":{"childImageSharp":{"fluid":{"base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAOxAAADsQH1g+1JAAAFgklEQVQ4yy2T7VOTZxbGb+xsZz/sh/4B/S90d6dCMSgIIoEibxIhyYoSQUoChFLxpVWWAYGxYoOVgbGVBIRWbFUUK7NYQpEXB5lduzuopRB5qYAQEshz7vAk5+o8mf1w5nz7zXXOdV2i8imJyqdSVD6lqOZNFvZxEhVj9H7FKFWXj8ghm5uWbW4ZKh2U6skBWih+KH+09FFJ4V16r6CXxD96KMp8k4S5WwpTF4n/w+SOqmdSWN0BDVhlH5e+irEgbMMEmzuI4odbKH4YwMlHEiceEE7cD+L4D3KxoJdM5m4SR7/TYDLK6JIioqxqkkT1v+lP9gm6VzkhYRtWYOnb2LYOyVDJgMIptdOc1jjDRf3BcOFdUo2uDfXYbULBLQlzNzmMTik0mKlTCtH4dluUjZDQYPYJCetPSjDn2nLY3LmG8pFtNrq8nFI7HxlTp59P3A9yxpUVpF9aDZlvkmq+KZHvpMv5ThL5TtqhgbT51D4uYR2iYH6Hn3NafTjeT1z0SHJu+yayW/zIdvhhaNtE4R3J+U6F9XUbSL/k53ynDOXdkDBcpwzDdRLCPiHfrxgjf/mIROEdCpu7CZYfiBvHJE4PEgq+I+R1EbJvEA53EMzfEsw3CVkOhfX1fg0aOvK1RG6bnM5soXdFxM0nEqWDtH2yn2B5JLlpPAjvJmPZx5heCWFwRoVrahv1jyUsvUGYuiSMLoncduJDX/iQ/VUgdLhVIvsqZYpINIYJmgFl7iBb+gN8amALy37GRgDwBQC/AngDwJI3hJreJWS2byHv6wAM1xU+8s0257SSmnWVkOmQ14VtmJatQxIlA8SmznVObZiDof0NXr5l+LYYb3yMBS9jfoPR9mAeCeVPoK/3IPnCa+yreoXUi6ucfVWGMx0SGc30H2EdotDH/5Iwdm5xzjUfH77mh8EVwOMZNaJMg82thbHoB3rcq9DZnyPp/CwSzywgrmIWsaXTHH9qljOaCemX5Lb4WGvAo0im2NQl2eSSyHERnM+2I2dqyjTYi5UwXvuBb8e3kNqwgoTTi9DZXiK29DknVM9x+hcSaY2kiJIBuVD8o0TRAwofu01s7iTkugh1j2XkZ239C+gZfhuBTS2qeLnO6HiiIOncIhKqPdDXrfGhy8FQWpNE6kWaEFo3ix4QLPdILbxLfPx7Yi0ampuaAfvtY4ir/AU945t4sc4YnZO4Mfg7MhpWkdkS5owrIU5rUFT9RYmUOnKIE/dliaWPUNCrVYpg6iLWcqZFQ3NTXzcX+Zl25o0RJQLLaVhC0oU1HPhsgffYpji5Zj2krwsiuUbZLyz36D2t6Me+lzjyjQxltRCyWhQ2OgnGDomPmjYi58WfXohsTZkGiyl+yjuP3EGsdUrV16tIrqHR7CthIczdijB3k8nYqSC/Q1GzHAFOa9pE9rUA57QqfOD8CvZVebDH9gIJpzw4dDnEiWfneWfeXcScHA8frCUcOK8g6XMlJulzEuJw21pUbrtXZDm8X2U0r+HQ5XU1td4b0tev46MmLydfWOa4ilcca33OieeW+OA/ffxhyaSmUE086+WE6nXEn1qvSDizIfaf3XhHpF9aiTp4wS+yvnwrkms8jsRzvyLxrDaz6v4zs2rC6dmwrux/2GP7heOrZsN7K39TdWXTIS2DurIZ6Mo99n1Vb0T8md+jdNYFITKaV0Va41JUjPWVSD7vEXH2qZzY0tFfY4qHEV3kRnSRtkc4umgEuy1ufFDoxu7Cn7HbMjoZXfxMp7PNiPhP56PiKhbFvk9WhEhrfCMO1nqEvn5epNR6dujKJ8Xfjt7589+P9hl2GW87d+Xf+m2noRs7DT28K+/Wf3fl3W79q6kvRfzlXRFdNCl0ZTPv7P1kRejKX4u9lcviD6mXQzEzhKhAAAAAAElFTkSuQmCC","aspectRatio":1,"src":"/static/1b54e7231a52b0e750aebf3cb04315fa/62915/browser.png","srcSet":"/static/1b54e7231a52b0e750aebf3cb04315fa/62915/browser.png 128w","sizes":"(max-width: 128px) 100vw, 128px"}}}}}}]},"featuredImage":{"node":{"localFile":{"childImageSharp":{"gatsbyImageData":{"layout":"constrained","placeholder":{"fallback":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEt0lEQVQ4ywXB6U9aBwAA8Jd93j7sw5ptaZqsS/ZhR3c0a7du9tCu17S1zNZW13ohKljwIcj1OATk8TgFOZ7cyI1c7wlSQeRURJ0KWLvYabZk+9Il+weWLPv9ADhsGdNLOiRirVSoVBDapsW3eMwWCucMX/HhhKifj5wi8ohDo5f6HnwzOcE2Coga5hd66/VgFBQ+AtIbudTOltPd1w4bb80wrjCoF2TGx2zkAon2E5Vzupd5iT5zbmDqjXv0K0yG1tACB1C619MWxMY8JsCDw5XnKhoy1sXXfccyvctAe/hmnxNjIR61PkSD7Z+RxZ2geBAUXqUIdZrLR4coVqu1mOfPYJvA92rVEy7YxpRzuKq4M0WG3b5EuZBvrqS20ngts7Q+Pm3pggxtQ2x4PhxTUtLu85pw4CEf+oTMBkZg/c0Zy+luJkvlL63tz8/6wGFB0pdr5F/mw3ncgwei+Q4IvUVV0Hjq+5OKq6NcUALSzEYi6gf45LtECr8DNKCe1UK89uhyx+DHbw4TpxaSr2T93T6ZvFE4UtqWuhl6EDL0koX8yS7vso4RWoW8XoCi6P+6a1ShcNSzhybPFvlxr6P7DAtSs9GCiHDxuRcvZQ8KixXEHJUYQ/ZZhWu205vPTYewuyoUaCX1/fCQ2EOZXsP2pbaqxFbmgWy5YwVSBZ0mX710VE3Wk4Gyw4LxZ32oxaObG4nGONrF8HtkCaDVeBw2DAuUdnMvxaokRepTWjGNlMniCH9vnvzz69+7qSbuqiTsGbc3o5XMU0aoXA6BZjWSLEaApHDFvKsHxePj6rHbnqXw0PGHrQM3Pnpw73YyET3MbTSSeyl7IWhYsttSLitOFhtbGOpHsFk11wNwtd5MYquYqG+nXxyVT04af0m4QojFPGge7tWqCZMkrXOX/LtBLWaai6rl1mEGW6KjhQK0Kc0QIOJrE9HNSrSejzdeV17/+8d/zdVc2q2Me/0iSCDTmnGDbyf2MmvJwYj3Nl0+JCQX1jyR/Gq3BgZEYkNiabsU2S+F63X8+GT9zxpeloNDHKVNrI0wBEbcuFBO7mY9RYdtuROEB3lPNrdwikB4A5oEgJvkwWlXMrZZ9u9UsVfb+MGL3GHKmYQ5SjZdhIzTEoZYIbKVSTSzyb1IID2r1mrcumd62XWZFHi7fUyiDeTwWiJS3Y01N7BGcrGwsljxmxe1kGzBGNyNNdbi+z7/+tSMVY5ohA5UaZd0GmwEqwugjrOIiHUlWXPP+RYjxcrS/np8ZyVcWImUc/GNErZZwH4pLtf7eaYvSZwJCGyVIGq78BSkfEeKAven4HMkvhn1aJmQUaBeSm0msT08Wk5jxexyJRTNGBwYFsoIDMEuLgIqeQSFZsIx9ylPOEQlAU/Zve00IaJWOE0ahMUJ2kIdfAMazm2vN+2+589UjouMmQ8GuBfIEx1gf+/Ez6p5ZrtO+SOLNTA6CIjj6rec2c9h8x0bRpIqRrjS9zkKutxEmvW0CnWPRaqvSNAdQnvUP1AoSlR6OoKqz04jZ+nQyPgo0J+JnveGBPonhAUxifhUbKISVcNkLvMSnX+Nyujk8fs0Lq935NVvVUMgwnLOjTmC384Yrxn9U8QH/wPOVp6Xtjw5hwAAAABJRU5ErkJggg=="},"images":{"fallback":{"src":"/static/3c57b09592f37f2befef1c8eb5f4dbad/5f169/av.webp","srcSet":"/static/3c57b09592f37f2befef1c8eb5f4dbad/d66e1/av.webp 125w,\\n/static/3c57b09592f37f2befef1c8eb5f4dbad/e7160/av.webp 250w,\\n/static/3c57b09592f37f2befef1c8eb5f4dbad/5f169/av.webp 500w","sizes":"(min-width: 500px) 500px, 100vw"},"sources":[]},"width":500,"height":500}}}}}},{"date":"24 июня 2022 г.","id":"cG9zdDoxNQ==","excerpt":"<p>Вы точно думали, куда бы пойти поучиться, чтобы получить востребованную профессию в Израиле. </p>\\n","content":"\\n<p>Вы точно думали, куда бы пойти поучиться, чтобы получить востребованную профессию в Израиле.&nbsp;Обучение в Израиле&nbsp;доступно каждому, не зависимо от возраста, пола и самоидентификации. То есть не важно, кто вы – важно кем вы можете стать. Уровень безработицы в Израиле низок, но при этом большой спрос имеют только некоторые вакансии. Я опишу 5 самых востребованных профессий в Израиле.&nbsp;<a href=\\"https://teox.eu/travel/10-mest-v-israel/\\">Израиль</a>&nbsp;— это страна, где ежегодно запускается масса стартапов, идет приток новых репатриантов, а интернет-рынок все больше и сильнее. Однако мы все же несколько отстаем от большинства, более продвинутых в электронной коммерции, стран. Но это настолько стремительно меняется, нужно не упустить свой шанс стать специалистом и получить идеальное место работы в Израиле.</p>\\n\\n\\n\\n<h2>Самые популярные и оплачиваемые профессии в Израиле</h2>\\n\\n\\n\\n<p>Давайте рассмотрим самые популярные направления, связанные с работой в Интернете. Речь пойдет о курсах, за которые нужно заплатить (будет указана стоимость), так же и о курсах от Министерства Абсорбций. Обзор подготовлен и составлен из информации, размещенной в интернете разными колледжами, университетами и частными лицами.</p>\\n\\n\\n\\n<p>В некоторых местах вы найдете ссылку на обучающие программы, связанные с профессией. Но также вы можете задать любой вопрос в комментариях к этому посту. Мое сотрудничество с колледжем в Тель Авиве позволит дать достаточный ответ, связанный с обучением и трудоустройством на стажировку в Израиле.</p>\\n\\n\\n\\n<h2>#1 Программист в Израиле</h2>\\n\\n\\n\\n<p>Мы знаем, что программист это сложная профессия, но и высокооплачиваемая. Учиться на&nbsp;курсах программиста&nbsp;нужно долго, проходя уровни, которые оцениваются опытом работы.</p>\\n\\n\\n\\n<p>Но начать работать можно уже через 6-10 месяцев обучения, что достаточно для получения минимальной оплаты, в идеале это 1 год полноценного&nbsp;обучения программированию&nbsp;и практики на программах стажировки.</p>\\n\\n\\n\\n<p>Поэтому эта профессия забирает первое место в рейтинге «востребованные профессии в Израиле».</p>\\n\\n\\n\\n<blockquote class=\\"wp-block-quote\\"><p><strong>Специализация</strong></p><p>Разработка под Java, PHP — WEB, приложения, сервисы. То есть специалист, который способен разрабатывать сайты, сервисы и мобильные приложения.</p><p><strong>Продолжительность обучения</strong></p><p>Начальный уровень требует от 80 часов обучения, что примерно составляет пол года.</p><p><strong>Минимальная зарплата</strong></p><p>4000 — 35 000 зарплата. Все зависит от конкуренции на место (конкуренция велика) и сложности проекта, который нужно разрабатывать.</p><p><strong>Стоимость обучения</strong></p><p>от 8000 — 15 000 за пол года/год. Есть и бесплатные курс, которые можно пройти, но как показывает опыт — бесплатные курсы дают основу и не дают практику. Так что приготовьтесь оплатить полгода обучения непосредственно практическим навыкам.</p></blockquote>\\n\\n\\n\\n<h2>#2 Интернет — Маркетолог</h2>\\n\\n\\n\\n<p>Человек, занимающийся планированием и развитием проекта. Профессия, набирающая популярность в стране, где каждый год запускается бесконечное количество StartUp-ов. Например,&nbsp;курсы SEO&nbsp;или&nbsp;курсы Интернет-Маркетинга, вполне становятся популярными.</p>\\n\\n\\n\\n<p>Одна из наиболее сложных профессий в целом. В отличие от программирования, тут мало знаний алгоритмов работы, нужно постоянно быть в курсе событий на рынке, отслеживать изменения и делать правильные выводы. Строить свои собственные стратегии и учиться жонглировать инструментами интернет-маркетинга, подобно цирковому жонглеру.</p>\\n\\n\\n\\n<p>Эта работа точно понравится тем, кто разбирается в политике или любит интриги и игры с большим количеством ходов, которые приносят не только популярность, но и власть над тем, что происходит в нише.</p>\\n\\n\\n\\n<blockquote class=\\"wp-block-quote\\"><p><strong>Специализация</strong></p><p>Интернет-Маркетинг, Поисковое&nbsp;<a href=\\"https://teox.eu/lifehack/s-chego-nachat-seo/\\">продвижение</a>, Продвижение в социальных сетях. (понятно, что в эту профессию входит и email-рассылка и контент-маркетинг и прочие инструменты одного механизма).</p><p><strong>Продолжительность обучения</strong></p><p>От 40 часов обучения, что примерно равно 3 месяца.</p><p><strong>Минимальная зарплата</strong>&nbsp;4000 — 25000 зарплата. Новичкам платят меньше, но в отличии от программирования, где опытом изучается язык, в маркетинге развитие происходит значительно быстрее. Достигнуть зарплаты в 25 000 шекелей реально, но очень сложно!</p><p><strong>Стоимость обучения</strong>&nbsp;от 2000 за 3 месяца. Бесплатных курсов нет, есть масса платных с разным профилем и программами. В основном на иврите или английском. На русском языке стоимость варьируется от 1000 — 8000 за курс (4-12 месяцев). Важно понимать, что дешевле выучиться в зарубежных онлайн-школах, но что более важно — вы не получаете навыки маркетинга в Израиле, если учитесь, например, в РФ.</p></blockquote>\\n\\n\\n\\n<h2>#3 Тестирование компьютерных программ (QA)</h2>\\n\\n\\n\\n<p>Профессия, набирающая популярность в Израиле. Тестирование программ — это рутинная работа и очень ответственная, поэтому и оплачивается на ряду с программированием. Последние годы эта профессия становится все более востребованной и высокооплачиваемой.</p>\\n\\n\\n\\n<p>Если вы обладаете усидчивостью и способны работать в процессах тестирования, вполне можете попробовать себя в этой специальности. По сложности весьма схоже с программированием, а в некоторых местах даже более оплачиваема.</p>\\n\\n\\n\\n<blockquote class=\\"wp-block-quote\\"><p><strong>Специализация</strong></p><p>Функциональное тестирование (functional testing), тестирование производительности (performance testing), нагрузочное тестирование (load testing), стресс-тестирование (stress testing), тестирование стабильности (stability / endurance / soak testing), юзабилити-тестирование (usability testing), тестирование интерфейса пользователя (UI testing), тестирование безопасности (security testing), тестирование локализации (localization testing), тестирование совместимости (compatibility testing).</p><p><strong>Продолжительность обучения</strong></p><p>От 180 часов — первый уровень (его не всегда достаточно) суммарно, чтобы начать работать нужно 320 часов обучения, что равняется примерно 1,5 года жизни.</p><p><strong>Минимальная зарплата</strong>&nbsp;От 6000 — 15 000, если у вас есть опыт работы, вы можете претендовать на зарплату в 10 000- 12 000 шекелей.</p><p><strong>Стоимость обучения</strong>&nbsp;Варьируется в зависимости от желаемого уровня. Начинается все с 8000 за 120 часов и заканчивается 15 000 за 320 часов занятий.</p></blockquote>\\n\\n\\n\\n<h2>#4 Веб-Дизайнер</h2>\\n\\n\\n\\n<p>В настоящее время веб-дизайнер должен обладать базовыми знаниями верстки, разбираться в юзабилити. Веб-дизайнер не на столько популярная профессия, как предыдущие. Подходит людям, любящим творить, то есть, если вы личность творческая, любите и умеете рисовать (даже карандашом), вам точно сюда.</p>\\n\\n\\n\\n<p>Есть небольшой недостаток — найти постоянную работу на начальных этапах весьма не просто, нужно получить опыт и набрать портфолио, тогда все дороги будут вам открыты.</p>\\n\\n\\n\\n<blockquote class=\\"wp-block-quote\\"><p><strong>Специализация</strong></p><p>Разработка дизайнов сайтов, мобильных приложений. Знания и навыки: Web-дизайн — основы, Adobe Photoshop &amp; Adobe Illustrator, HTML, DreamWeaver</p><p><strong>Продолжительность обучения</strong></p><p>Начальный уровень требует от 80-200 часов обучения. Мы считаем, что минимум это 200 часов обучения.</p><p><strong>Минимальная зарплата</strong>&nbsp;4000 — 12 000 зарплата. Где 12 000 это потолок, такую оплату найти крайне сложно. В основном средняя зарплата веб-дизайнера составляется 5000-8000 шекелей в месяц.</p><p><strong>Стоимость обучения</strong>&nbsp;от 6000 — 25 000 за год. Есть и бесплатные курсы для новых репатриантов (обратитесь в Министерство Абсорбций). Продолжительность, как и стоимость курса, зависят от качества и количества материала.</p></blockquote>\\n\\n\\n\\n<h2>#5 Журналист, контент – маркетолог</h2>\\n\\n\\n\\n<p>Еще одна творческая профессия, которая требует умения усидеть на одном месте, исполнительности и грамматики. Журналистика весьма распространена среди новых заявок на будущий учебный год, однако есть масса минусов в обучении этой профессии.</p>\\n\\n\\n\\n<blockquote class=\\"wp-block-quote\\"><p><strong>Специализация</strong></p><p>Создание плана появления контента, написание эксклюзива и репортажей. Поиск новых тем.</p><p><strong>Продолжительность обучения</strong></p><p>Продолжительно обучения — до нескольких лет, если вы собираетесь стать профессионалом. Необходимы дополнительные курсы, связанные с контент-маркетинг и&nbsp;seo&nbsp;продвижением, если хотите писать оптимизированные качественные тексты.</p><p><strong>Минимальная зарплата</strong></p><p>4000 — 8 000 зарплата.</p><p><strong>Стоимость обучения</strong></p><p>от 2000 — 20 000. Как было написано выше, смотря что вы выбираете — посещение курсов или обучение в университете.</p></blockquote>\\n\\n\\n\\n<p>На этом все. Сбор информации занял у меня около 20 часов. Были просмотрены и проанализированы около десятка &nbsp;обучающих программ на основании ТОП поисковой выдачи. Суммы зарплаты взяты на основании личного опыта и информации в интернете.&nbsp;<strong>Исследование не является официальным.&nbsp;</strong></p>\\n\\n\\n\\n<p>Если вы располагаете другой информацией, сообщите об этом в комментариях, аргументируя или оставляя ссылки на источник информации.</p>\\n","slug":"post-2","title":"Самые востребованные профессии в Израиле, связанные с интернетом","author":{"node":{"name":"Andrew Roldugin","description":"Напишите немного о себе. Эта информация может отображаться на сайте."}},"categories":{"nodes":[{"name":"Жизнь","slug":"life","id":"dGVybToy","icat":{"caticon":{"localFile":{"childImageSharp":{"fluid":{"base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAOxAAADsQH1g+1JAAAF1ElEQVQ4y2XTWVATVhQG4AMZp3XaN6cqJOBA2GxkM6xKXFhCIi4suSQkIZANUERRLC7Ramud0VqV4oYouIK1oFShxQULTFgCxBBRQUwUwR1U0I4r4Z422IfO9Mz8r9/8d865AP8Zi4CAVTgex3sLRGAViiZahKSkh0/ed0aSV608so04ymABxEJjsMyhIUgBNyJU0BWcCf+b3uhE2DolEe4KCTxaTKAvLtHBIiBXevgEzZGEts0h2Bgmxj8CU0r7YxQA4AHtwVrH6+EaMIdlgImb/Ql69BMLHu9xgr71vg7WnHDo5ROGvalFQLbbsc5I8t4wh9DGMPFYbWDKaB1Xhm1hivV/BqbD7fBlYOIuY3QGLwVjwApo980FQAS4KRPCwFYP6IB9DtZYsR3z7eETW2ckQTvWECbGizNTsGqGlF6bpRi7xVPh9TCt3hyc5X1tZjYYA3IY7TNWg2H6GoAT0Aq9SyOg/3tPl0c7nCfcikuA7hhy3GzHeORjQ4jEjtHffKX0jI8MjWFKeiNca+sMyUQTN/svY0DO7A7/ldDhl8to9ckH6N/ibU+ydVUQdqfGFlwPUE8yR5I3hjkEG0Il9FJEAr0wNw7PBMXj6elSagrR4vWQLDv2wRiQgx1+uSNtnDw3w9droI2T5wiWFaFwd1WQslsmQHOcpNA0jyjtC2gIkYxe4sXT6hg+rZi1CI/5JuLZkCTsmquk1wKXU2NgDrb75X5o4+Rhq09+jR1s98t1gMeLF8JdsQBa+KlMvfIzMPBIbWOoGC+FElt1lAArwhfhKf9ELPIgWD+f4A2hHI2BObTdN5e2cfJoq0/+WLPnemxi62Y3sXWfbs8iECXcFYq2mSKTvOpDxY8vc6V4ftaSsV9CF9KT/ol40INgmV8ymvlSNEYosYObjf9i2Oy5frSJrUO9+8Y9eveNAFYB+cIiED2wCgl2R4vvXeJK31b6JGNl+GJ6lpeAR6YTLPWSYGuEFM1CJXbGZaDBPxdb2Gux2WsdbWLrbHr3jahn6xrHG1qFIpZFQIbv8JPpHb4UTSEybElX0YFyDQ4UEOzMFmBbXDze26DGwfNqHLqgwAf7U7GDtxr1rpuo3kNna2KPgzf0bN1Ee0PmHb54uDdGit0RctudJDV917MB3/bk0RdVafhwZxwO7I3HkWYNDl9NxefVKThcm4h9hUlY57mGtrh/a9OzddjE3tild9d9DpZY8Ze3o6W9PVFy7OIqxvq3LKdvH6zD16ZVdESfhc9OSfDlxTR8eVmBz89LcLBShM9OxeOzMgH+OjeZ1jjl21o9N6HeXVentz+5e54CuuenVnbPT0NzgHL0/uZsfGNdja9al+NIc+Y49uJ3+XizITtWvgSfHF2Ag6XR9My8JCycpBq9yl6LLexN2wzszQA3een2JN20f6eZ2tGe5KX42pRDR1qycLhe/alZTQoOnRPh4Okl+PR4HD4tiaH3d0fRUi85LXJS0XLXLKxzWxt4xS0fANUi+GHCajCGaAwdwRlo4Cz72Lc9A181pNKhc1I6WEHwWVkCPj26EJ8Ux+LDwig6VBRB60TxuP8r9Yfjrlo85ZJVXjVtJZydluMIjQEax8YADdT5avwvcjQfa70z8SIn82PPmgR8vDOS9n8XRe9vmkv7NkTQe9+E0QfruKgnMXSfU/qHYqYKS1mah6ddlk0+ytLCUZbWAa6FaqCWo2Zc8FZDhYeaf5qtenfSVYPlbmpb/YLY0S75zDGzJBDNyX7YSfzGqnnRowVTU8f2OimwiJn+6AhTwyllaaGUpXEsc8kCaA/KgKu+GqjyVjHK3FRQ4pLOOeSqaNjHVGDB1DQ87L0QK4NCaQU3nB5kL8Edk+W420mGhUx55QHn9CmHmCo4zFQxSlkaOMHKAKjxUUOVlxaOTUuHcnclo9glDUrYcihgSQW7nFOKf5ySenunkwR3OKXQ7VNkXbucJT/vYUpnFbBSYJ9zGhQxlYwDzDQ4xFTCsX/AvwFUmCiSGGy5ZAAAAABJRU5ErkJggg==","aspectRatio":1,"src":"/static/84659c605333a173d78b560d48ff1aaf/62915/tinder.png","srcSet":"/static/84659c605333a173d78b560d48ff1aaf/62915/tinder.png 128w","sizes":"(max-width: 128px) 100vw, 128px"}}}}}}]},"featuredImage":{"node":{"localFile":{"childImageSharp":{"gatsbyImageData":{"layout":"constrained","placeholder":{"fallback":"data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAADwAwCdASoUAA0APtFUo0uoJKMhsAgBABoJYgCdMoAliBQmpLHT2xzAAP3SSEaT9f2bkb6/PJpB3pWTVkXY0YwqxQlRUZAHlF0CtXrEGzGRFxDyp3eJbSsPrwy1YnDcltFadJG1C8oAAA=="},"images":{"fallback":{"src":"/static/b1442d20b64114f1965e08e9bd1dad9f/37c8a/webpc-passthru3.webp","srcSet":"/static/b1442d20b64114f1965e08e9bd1dad9f/90bd7/webpc-passthru3.webp 290w,\\n/static/b1442d20b64114f1965e08e9bd1dad9f/d523d/webpc-passthru3.webp 580w,\\n/static/b1442d20b64114f1965e08e9bd1dad9f/37c8a/webpc-passthru3.webp 1160w","sizes":"(min-width: 1160px) 1160px, 100vw"},"sources":[]},"width":1160,"height":772}}}}}},{"date":"15 мая 2022 г.","id":"cG9zdDo2","excerpt":"<p>В данной теме мы поговорим о том, нужны ли ссылки для оптимизации и продвижения сайтов и как с этими ссылками работать. Также узнаете какими бывают ссылки и для чего используют различные их виды, откуда можно взять внешние ссылки и к каким методам получения ссылок не стоит прибегать вовсе. Рекомендую прочитать о seo, что это такое и только после, переходить к этой статье.</p>\\n","content":"\\n<p>В данной теме мы поговорим о том,&nbsp;<strong>нужны ли ссылки для оптимизации и&nbsp;<a href=\\"https://teox.eu/lifehack/s-chego-nachat-seo/\\">продвижения сайтов</a></strong>&nbsp;и как с этими ссылками работать. Также узнаете&nbsp;какими бывают ссылки и для чего используют различные их виды, откуда можно взять&nbsp;<strong>внешние ссылки</strong>&nbsp;и к каким методам получения ссылок не стоит прибегать вовсе. Рекомендую прочитать о&nbsp;<a href=\\"https://teox.eu/educations/seo-chto-eto-takoe/\\">seo,&nbsp;что это такое</a>&nbsp;и только после, переходить к этой статье.</p>\\n\\n\\n\\n<h2>Неработающие ссылки для seo</h2>\\n\\n\\n\\n<p>Довольно часто специалисты, занимающиеся&nbsp;SEO-продвижением, спустя какой-то период времени начинают сомневаться в том, все ли их действия правильны, верно ли и в том ли месте они покупают ссылки – ведь времени уже прошло достаточно, а результата до сих пор нет. А причина проста – загвоздка на самом деле не в ссылках, а в эффективности работы по&nbsp;внутренней оптимизации&nbsp;ресурса. Без этого фактора любые ссылки или другие методы продвижения работать не будут.</p>\\n\\n\\n\\n<p>Началом любого продвижения должна быть внутренняя оптимизация, а именно – проведение технического аудита для того, чтобы удостовериться в отсутствии внутренних преград для успешности сайта.</p>\\n\\n\\n\\n<p>Также одним из ключевых моментов является наличие полноразмерного и полновесного семантического ядра. Эту работу можно поручить специалистам или же сделать самостоятельно при помощи Вордстата, или же использовав для этих целей автоматизацию (Кейколлектор). Ну а далее – создание структуры сайта и подготовка текстов.</p>\\n\\n\\n\\n<p><strong>Следующий шаг</strong>&nbsp;– тестирование сайта на предмет сбоев и ошибок, из-за которых может тормозиться его продвижение. Это очень важный процесс, к которому нужно подойти серьезно и с соблюдением рекомендуемой последовательности действий.</p>\\n\\n\\n\\n<p>Таким образом, есть вероятность, что через определенный срок после проведенного SEO &nbsp;аудита какая-то часть запросов из вашего семантического ядра будет в ТОПе, даже если вы вовсе не будете прибегать к закупке ссылок. Конечно же, этот результат не будет из разряда высокочастотников, зато именно по низким частотам результативность намного выше (правда, для этого у вас должно быть качественное семантическое ядро).</p>\\n\\n\\n\\n<p>Несмотря на логичность и очевидную необходимость проведения вышеописанных мероприятий, немногие поступают именно таким образом – большинство все-таки начинают с закупки ссылок. Эта тактика неверна, внутреннюю оптимизацию необходимо проводить в обязательном порядке.</p>\\n\\n\\n\\n<p>Другой вопрос, актуальный на сегодняшний день – насколько сильное влияние на ранжирование сайтов в поисковиках оказывают ссылки. Ответ на этот вопрос вовсе не однозначен и зависит от различных факторов, однако, в большинстве случаев можно сказать – да, ссылки напрямую влияют на продвижение сайтов.<br>Однако нельзя также не отметить, другую тенденцию – влияние ссылок на продвижение неуклонно снижается, так как ссылочное распределение в рейтинге за последние годы перешло из категории главного в разряд косвенного.</p>\\n\\n\\n\\n<p>Иными словами, если на новый сайт закупить огромное количество ссылок это не выведет его в ТОП автоматически, как можно было надеяться еще некоторое время назад. И с этой точки зрения работа по продвижению сайтов значительно усложнилась и теперь во внимание необходимо принимать также иные факторы и правильно распределять акценты.</p>\\n\\n\\n\\n<p>Помимо этих факторов, из всего общего объема ссылок, накопленных коммерческими ресурсами, максимум 10% действительно окажут какое-либо влияние на ранжирование сайта. Вся остальная ссылочная масса – это просто балласт. Забегаем вперед и отвечаем на ваш вопрос – да, это соотношение можно увеличить, но только если вы обладаете определенными навыками, а также готовы потратить для достижения этой цели время и приложить определенные усилия. К примеру, на всем известной Сапе, по самым скромным подсчетам, можно обнаружить около 5% работающих ссылок, но их еще надо найти, проверить вручную и т.п.</p>\\n\\n\\n\\n<p>Подводя итог вышесказанному, можно сказать следующее:&nbsp;<strong>получению внешних ссылок</strong>&nbsp;разумно уделять максимум 10% времени, направив основные усилия на внутренний аудит и оптимизацию. Да, это не простая задача. Да, если у вас коммерческий сайт, то вам еще необходим будет технический аудит, разработка семантического ядра и дизайна, работа над структурой и функционалом ресурса, анализ конкурентов и еще много другое.</p>\\n\\n\\n\\n<p>Допустим, что с этим вопросом у вас полный порядок и по необходимым вам запросам вы можете рассчитывать на нахождение в ТОПе поисковиков. А вот для попадания в этот самый ТОП вам потребуются любые, даже самые малозначительные способы, которые помогут вам улучшить свои позиции в ТОПе и закрепиться там. И одним из этих способов как раз будут ссылки.<br>Давайте теперь попробуем разобраться для чего, собственно, ссылки нужны.</p>\\n\\n\\n\\n<h2>Какие ссылки необходимы для seo продвижении сайта?</h2>\\n\\n\\n\\n<p>Итак, прежде всего, нужно понимать, что ссылка связана с тем ресурсом, на который она ведет, несколькими факторами. Каждый из этих факторов принимается во внимание поисковиками:</p>\\n\\n\\n\\n<p><strong>1. Статистический вес страницы</strong>, который постепенно накапливается. Поясняем: этот вес рассчитывается индивидуально для каждой вэб-страницы, и он находится в прямой зависимости от количества ссылок, которые ведут на эту страницу. Данная страница будет именоваться «акцептором», а страницы, с которых ведут ссылки, будут называться «донорами». «Доноры» могут вести с основного сайта или же с других сайтов. При том, что статистический вес страницы-акцептора, будет обусловлен как количеством доноров, так и собственным статистическим весом. Тот же способ положен в основу расчетов ПейджРанка.</p>\\n\\n\\n\\n<p><strong>2. Анкорный (динамический) вес</strong>. Этот фактор учитывается наряду со статистическим весом и зависит напрямую от текста ссылки, которая ведет на страницу («анкора»). Чем вернее анкор коррелируется с запросом в поисковике, по которому продвигается страница, тем большим динамическим весом будет обладать гиперссылка.</p>\\n\\n\\n\\n<p><strong>3. Гиперссылки</strong>&nbsp;были задуманы с целью перехода на другие документы в гиперпространстве. Таким образом, они являются еще и дополнительным трафиком для вашего сайта.</p>\\n\\n\\n\\n<ol><li>Исходя из этого параметра, можно выделить еще одну характеристику ссылки, а именно – ее&nbsp;<strong>кликабельность</strong>. При этом не имеет особого значения, какая именно эта ссылка – внешняя или же внутренняя, показательно то, что если ей воспользовался живой человек, то это свидетельствует о ее востребованности, а значит — качестве. Именно такие кликабельные обратные ссылки являются основной целью и задачей, к сожалению, получить их сложно и они стоят дорого.</li></ol>\\n\\n\\n\\n<p>К тому же довольно распространенным является заблуждение, что поисковик не отличает покупные ссылки от «естественных». Это уже более 5 лет умеет делать Yandex, и еще раньше научился делать Google. Плюс, однако, в том, что какая-то доля приобретенных ссылок, особенно кликабельных, все же учитывается поисковой системой, влияя на ранжирование ресурса.</p>\\n\\n\\n\\n<p>Исходя из этих факторов, по логике вещей, максимальный эффект будут оказывать ссылки, по тексту максимально совпадающие с основным запросом, который используют для продвижения ресурса. Неопытные&nbsp;SEO-специалисты&nbsp;рассматривают эту модель упрощенно и приобретают огромное количество, доходящее иногда до нескольких тысяч, бэклинков с прямым вхождением, не понимая, что таким образом достичь желаемой цели практически невозможно. Реальность такова, что поисковые системы очень хорошо различают количественные и качественные показатели приобретенных ссылок. Отмечая значительный прирост обратных ссылок, ведущих на определенный ресурс, с прямым вхождением определенного ВЧ запроса, тем более коммерческого запроса, поисковик моментально фильтрует этот процесс, и ваши деньги оказываются потраченными впустую.</p>\\n\\n\\n\\n<p>Отсюда многочисленные разочарованные восклицания о неэффективности ссылок, о том, что они уже не работают и что необходимо переключаться на Директ. А по сути, с Директом, да и вообще с контекстной рекламой необходимо работать параллельно, одновременно с продвижением в поисковиках. Дело в том, что контекстная реклама является очень эффективным инструментом и дает моментальный результат, а эффект от SEO придется ждать больше года (хотя тут мы видим другой нюанс – при использовании&nbsp;SEO цена&nbsp;привлеченного пользователя будет на порядок ниже).</p>\\n\\n\\n\\n<p>Также необходимо добавить несколько моментов, касающихся статистического веса. Итак, вес страницы – донора распределяется поровну между всей массой ссылок (внешних и внутренних), которые исходят с этой страницы. Это знание можно использовать для фильтрации и отсеивания страниц-доноров с недостаточным весом, которые бесполезны для продвижения вашего ресурса. Вам необходимы идеальные страницы-доноры, на которые ссылаются максимально большое число иных страниц (прекрасно, если их и ваша тематика совпадают), и, одновременно с этим, чем меньшее количество исходящих ссылок с нее уходит, тем лучше. Тогда страница-донор будет обладать значительным статистическим весом и весомая часть которого достанется вам.</p>\\n\\n\\n\\n<h2>Для чего приобретают обратные ссылки и какие?</h2>\\n\\n\\n\\n<p>Итак, мы выяснили, что ссылки оказывают влияние на позиции вашего сайта в поисковиках. Далее мы будем рассматривать ссылки, опираясь на текст, т.е. анкор.</p>\\n\\n\\n\\n<p>В формате Html гиперссылки выглядят следующим образом:</p>\\n\\n\\n\\n<blockquote class=\\"wp-block-quote\\"><p><em>анкор&nbsp;— (текст, который будет являться ссылкой)</em></p></blockquote>\\n\\n\\n\\n<p><strong>Таким образом, можно рассмотреть несколько видов обратных ссылок:</strong></p>\\n\\n\\n\\n<p><strong>1. Безанкорные ссылки.</strong>&nbsp;Казалось бы, название говорит само за себя, однако в таких ссылках все же присутствует текст, но поисковикам очень сложно ранжировать сайт по этому тексту. В данном случае мы говорим о простых словах, распространенных наречиях, например «здесь», «сюда», «тут»и т.п. Либо это может быть просто бэк, с адресом сайта вместо текста ссылки.</p>\\n\\n\\n\\n<p><strong>Для чего это делается?</strong>&nbsp;&nbsp;– для обогащения анкор-листа (то есть текстов всего объема ссылок, которые ведут на продвигаемую страницу), а также для того, чтобы ссылочная масса выглядела естественно. При этом можно отметь интересную особенность – даже из такого рода ссылок поисковики стараются добыть информацию, которая может повлиять на ранжирование. В итоге, бывает так, что поисковик, не обнаружив в тексте ссылки какого-то смысла, приступает к поиску рядом с ссылкой и, бывает, учитывают околоссылочный текст для ранжирования. Таким образом, иногда есть смысл размещать рядом с безанкорной ссылкой ключевые слова или их синонимы.</p>\\n\\n\\n\\n<p><strong>2. Ссылки с прямым вхождением ключевых слов</strong>. Это самый популярный вид анкора, ведь для этого все, что требуется – использовать тот поисковый запрос, по какому вы желаете продвигать конкретную страницу, и окружить это запрос открывающими и закрывающими тэгами ссылки. С другой стороны – это как раз и есть слабое место такого рода ссылок, так как покупной характер таких обратных ссылок очень легко определяется поисковиком.</p>\\n\\n\\n\\n<p>Ведь в настоящем анкор-листе, куда не приобретались ссылки за деньги, будет очень небольшое количество обратных ссылок. А в ситуации, когда продвижение конкретного сайта проводиться методом покупки ссылок, таких анкоров будет гораздо большее число, иногда почти все ссылки будут такими, так как за счет ссылок с прямым вхождением должна быть достигнута поставленная цель. Так вот, поисковые машины очень хорошо умеют это фильтровать.</p>\\n\\n\\n\\n<p><strong>3. Ссылки с разбавленным вхождением ключевых слов.</strong>&nbsp;При такой методике используется текст запроса, который «разбавляется» каким-то словом. Часто используют «разбавочные» слова из семантического ядра, либо пользуются универсальными словами («недорого», «город» и.т.д.).</p>\\n\\n\\n\\n<p><strong>4. Ссылки с околоссылочным текстом.</strong>&nbsp;Очень много их при закупках в САПе и похожих ресурсах, или в агрегаторах. Это, как правило, обычная фраза или предложение, напоминающее рекламное объявление, вот только тэгами ссылки размещают только вокруг необходимого ключевого запроса:</p>\\n\\n\\n\\n<blockquote class=\\"wp-block-quote\\"><p>Быстрое&nbsp;создание сайтов&nbsp;всего за 100 рублей</p></blockquote>\\n\\n\\n\\n<p>Этот способ удобен при повременном размещении ссылок, так как в данном случае ссылка как бы органично внедрена в текст, а не размещена непонятно где, сбоку. Это увеличивает шансы того, что на ссылку будут чаще нажимать. Если вы используете другой способ, а именно – закупку «вечных» ссылок, то вышеописанный метод для вас не интересен по той причине, что «вечные» ссылки не просто вписываются в текст, но и нередко сам текст пишется под них. Однако, конечно, это и стоить будет совсем других денег.</p>\\n\\n\\n\\n<p><strong>5. Ссылки с изображениями вместо анкоров.</strong>&nbsp;Такие ссылки не редкость в естественном анкор-листе, и их можно смело покупать. Также желательно, чтобы возле изображения были размещены ключевые слова.</p>\\n\\n\\n\\n<p>И, конечно, в атрибуте alt (или же title)тега А было упомянуто ключевое слово.</p>\\n\\n\\n\\n<p>Также ссылки с изображениями хорошо разбавляют анкор-лист.</p>\\n\\n\\n\\n<p>Ранее мы уже говорили о том, что только 5% от общей массы ссылок в&nbsp;<a href=\\"https://sape.ru/r.iPHvdVyDIk.php\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">САПе</a>, могут быть полезны для продвижения. Таким образом, можно сделать простой вывод о том, что более 90% вложенных вами в ссылки средств расходуются не рационально. Учитывая то, что по статистике 20% от предпринимаемых действий дают 80% результативности, то становится совсем грустно. При неумелом подходе можно без толку потратить весь бюджет.</p>\\n\\n\\n\\n<p>Также мы говорили о том, что в настоящее время ссылки трансформировались из категории основных критериев ранжирования в косвенные. Поисковики пытаются противостоять влиянию ссылочного мусора на ранжирование сайтов, но совсем отвергнуть ссылки не могут (но это не значит, что не пытаются). Из-за этого-то и добавили в Яндексе временной лаг, в течение действия которого приобретенные ссылки никак не смогу влиять на ранжирование, даже в том случае, если они вполне адекватные и кликабельные. Этот лаг может длиться от 3 до 6 месяцев.</p>\\n\\n\\n\\n<p>Для того, чтобы держать в тонусе&nbsp;специалистов по SEO, поисковые системы систематически изменяют алгоритмы и методику и из-за этого то, что раньше было эффективным и работающим, теперь становится бесполезным. К тому же эти изменения иногда очень сложно отследить и в результате складывается ситуация, когда налицо правильная стратегия внешней оптимизации, а результат неудовлетворительный. То есть приходится все время идти на риск, и никто не гарантирует 100% отдачу от вложенных в продвижение средств. Что уж тут говорить о неопытных SEOшниках, когда неумение накладывается еще и на объективные факторы.</p>\\n\\n\\n\\n<p>Все эти нюансы будут актуальны для закупаемых ссылок, тем более, если при их закупке не использовались тщательно продуманные фильтры, ведь по прошествии некоторого времени схемы, отработанные в течение многих лет вдруг перестают работать вообще или существенно снижается их эффективность.</p>\\n\\n\\n\\n<p>Что касается «жирных» или трастовых ссылок, то они, как правило, вообще не стоят затраченных на них средств. Причина проста – при анализе доноров необходимо учитывать очень много параметров, и «трастовость» здесь не будет основным фактором. Без сомнения, замечательно было бы заполучить ссылку с трастового сайта, которая подпадает под ваши критерии и параметры отбора, но это случается редко, таких случаев не может быть много.</p>\\n\\n\\n\\n<p>Ну и подводя итого раздела: все-таки наиболее благоприятный вариант – обзавестись теми ссылками, по которым к вам придут «живые» пользователи. Это сложно, но это и наиболее эффективный вариант.</p>\\n\\n\\n\\n<h2>Где мы ищем внешние ссылки? Где лучше их не приобретать?</h2>\\n\\n\\n\\n<p>Итак, вы уже поняли, что в процессе продвижения вашего сайта, бесплатно или платное получение внешних ссылок требует осторожного и серьезного подхода. В дальнейшем мы планируем опубликовать серию статей о том, как правильно это делать, сегодня же мы расскажем вам о том, чего делать не надо:</p>\\n\\n\\n\\n<ol><li>Оптимальным является получение одной ссылки с одного сайта, таким образом, вы получите наибольший результат при наименьших затратах. Но качественных доноров на самом деле очень ограниченное число, и поэтому довольно распространенной является ситуация, когда с одного сайта получают несколько ссылок. Но нет никакого смысла приобретать обратные ссылки с одного сайта в огромных количествах.</li><li>При закупке ссылок на биржах, позаботьтесь об обязательном использовании фильтров, иначе вы можете растратить весь ваш ссылочный бюджет на ветер.</li><li>Не бойтесь пользоваться агрегаторами ссылок, если сомневаетесь в своей способности самостоятельно совладать с фильтрами. Таких ресурсов достаточное количество: Визард, Руки, Сеопульт, Сеохаммер и т.д.).</li></ol>\\n\\n\\n\\n<p>За свои услуги они попросят процент от цены приобретенных ссылок, но в работе будут использовать собственные отработанные методики фильтрации, и в будущем также будут продолжать отслеживать доноров, чтобы при необходимости избавляться от неэффективных ссылок. Учтите только, что при запуске кампании в агрегаторе необходимо ограничить бюджет, чтоб избежать чрезмерных затрат.</p>\\n\\n\\n\\n<ol><li>Не нужно пользоваться такими услугами, как прогон по множеству ГС-каталогов, несмотря на то, что они по-прежнему активно предлагаются. Зачастую путают ГС-каталоги с трастовыми и тематическими каталогами, которые действительно работают и результативны. Но их ни в коем случае не тысячи.</li><li>Совершенно нет необходимости заливать на новый, молодой сайт огромную массу купленных ссылок. Тут нужно постепенное движение, примерно две-три в неделю для того, чтобы создавалась видимость естественного роста.</li><li>Даже если ваш сайт уже «в возрасте», давно существует и работает, не стоит рисковать и приобретать одновременно большое количество ссылок, так как в этом случае существует вероятность попасть под фильтры, и ваши ссылки не будут учитываться поисковиками. Здесь нужна та же тактика, что и в предыдущем примере – постепенное наращивание ссылок для имитации естественного процесса.</li><li>Если ваш сайт является коммерческим, избегайте участия в разнообразных системах по обмену ссылками. Это касается и «ручного» обмена. Лучше всего вообще не размещать внешних ссылок на сторонние ресурсы.</li></ol>\\n\\n\\n\\n<p>Ну и кратко пройдемся по способам получения и источникам внешних ссылок для коммерческих сайтов:</p>\\n\\n\\n\\n<p>Наличие аккаунтов в ключевых соцсетях – это в том числе также и бэклинки. Коммерческому сайту обязательно нужно постараться попасть в ЯндексКаталог, Дмоз, тематические каталоги. Замечательно, если вы будете добавлены в ЯндексСправочник, чтобы отображаться в Яндекс и Гугл Картах. С определенными сложностями, но можно также попробовать попасть в Википедию.</p>\\n\\n\\n\\n<p>Работайте напрямую с&nbsp;<a href=\\"https://sape.ru/r.iPHvdVyDIk.php\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">САПой</a>, ТрастЛинком, то есть с качественными биржами ссылок в аренду. Или привлекайте агрегаторы. При использовании таких вариантов, ссылки оплачивают ежемесячно, и в случае обнаружения каких-либо проблем или недостатков, их можно будет удалить. Зато тут есть преимущества, выражающиеся в большом количестве доноров, а также в том, что можно автоматизировать закупку и снятие ссылок через агрегаторы. Имеющиеся минусы рассматривались выше.</p>\\n\\n\\n\\n<p>«Вечные» ссылки через&nbsp;биржи&nbsp;(Гогетлинкс, Гетгудлинск и т.п.), либо же через биржи, позволяющие размещать целиком статьи с вписанными на сайт ссылками (<a rel=\\"noreferrer noopener\\" href=\\"https://xseo.top/frilance/miralinks/\\" target=\\"_blank\\">Миралинкс</a>, Вебартекс). Не так давно появилась возможность автоматизировать покупку «вечных» ссылок при помощи ресурса Гогеттоп. При этом ваша ссылка лучшим образом, более органично будет вписана в текст на размещающей ее странице. Тут также есть необходимость проверки и фильтрации площадки, так как есть большое количество доноров, где мы можете просто впустую израсходовать деньги.</p>\\n\\n\\n\\n<p>Поиск доноров, без применения для этого бирж. Этот вариант на порядок более сложен и трудозатратен, однако в случае получения ссылки, она будет намного эффективнее, особенно в случае совпадения тематики и если донорский сайт не является участником ссылочных бирж. Еще лучше, если бы донор не являлся ГС, а был бы добавлен с Дмоз или же ЯндексКаталог. Ну и совсем волшебным был бы вариант, когда помимо вашей ссылки с донорской страницы, других ссылок не было бы.</p>\\n\\n\\n\\n<p><strong>Выводы.</strong></p>\\n\\n\\n\\n<p>Если попытаться обобщить все вышесказанное:</p>\\n\\n\\n\\n<p>Ссылки все еще играют важную роль, так как являются одним из тех существенных параметром в ранжировании сайтов, которые используются поисковиками. Коммерческие сайты в погоне за местом в топовой десятке противостоят тысячам конкурентов, и, конечно же, очень проблематично занять место на этом вожделенном пьедестале сайту, который не подкреплен достаточным по количеству и по качеству объемом ссылок.</p>\\n\\n\\n\\n<p><strong>Внутренняя оптимизация</strong>&nbsp;была и остается ключевым фактором. Без нее ссылки становятся просто бесполезным элементом, так как уже давно находятся в хвосте первой десятки факторов ранжирования.<br>Действительно работающих ссылок наберется не более 20% от всех имеющейся массы. Для того чтобы оптимально использовать выделенный на ссылки бюджет, нужно крайне внимательно подходите к выбору доноров.</p>\\n\\n\\n\\n<p>Из года в год работа по продвижению сайтов усложняется, и это касается в полной мере также и работы по построению реально работающей ссылочной массы. Так что поиск легких и обходных путей в этом деле – занятие неблагодарное. Процесс намного усложнился, но стал также более азартным и интересным.</p>\\n","slug":"hello-world-2","title":"Очень подробно про SEO ссылки — что это такое, где брать и что с ними делать","author":{"node":{"name":"Andrew Roldugin","description":"Напишите немного о себе. Эта информация может отображаться на сайте."}},"categories":{"nodes":[{"name":"Работа","slug":"works","id":"dGVybTo1","icat":{"caticon":{"localFile":{"childImageSharp":{"fluid":{"base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAOxAAADsQH1g+1JAAAFgklEQVQ4yy2T7VOTZxbGb+xsZz/sh/4B/S90d6dCMSgIIoEibxIhyYoSQUoChFLxpVWWAYGxYoOVgbGVBIRWbFUUK7NYQpEXB5lduzuopRB5qYAQEshz7vAk5+o8mf1w5nz7zXXOdV2i8imJyqdSVD6lqOZNFvZxEhVj9H7FKFWXj8ghm5uWbW4ZKh2U6skBWih+KH+09FFJ4V16r6CXxD96KMp8k4S5WwpTF4n/w+SOqmdSWN0BDVhlH5e+irEgbMMEmzuI4odbKH4YwMlHEiceEE7cD+L4D3KxoJdM5m4SR7/TYDLK6JIioqxqkkT1v+lP9gm6VzkhYRtWYOnb2LYOyVDJgMIptdOc1jjDRf3BcOFdUo2uDfXYbULBLQlzNzmMTik0mKlTCtH4dluUjZDQYPYJCetPSjDn2nLY3LmG8pFtNrq8nFI7HxlTp59P3A9yxpUVpF9aDZlvkmq+KZHvpMv5ThL5TtqhgbT51D4uYR2iYH6Hn3NafTjeT1z0SHJu+yayW/zIdvhhaNtE4R3J+U6F9XUbSL/k53ynDOXdkDBcpwzDdRLCPiHfrxgjf/mIROEdCpu7CZYfiBvHJE4PEgq+I+R1EbJvEA53EMzfEsw3CVkOhfX1fg0aOvK1RG6bnM5soXdFxM0nEqWDtH2yn2B5JLlpPAjvJmPZx5heCWFwRoVrahv1jyUsvUGYuiSMLoncduJDX/iQ/VUgdLhVIvsqZYpINIYJmgFl7iBb+gN8amALy37GRgDwBQC/AngDwJI3hJreJWS2byHv6wAM1xU+8s0257SSmnWVkOmQ14VtmJatQxIlA8SmznVObZiDof0NXr5l+LYYb3yMBS9jfoPR9mAeCeVPoK/3IPnCa+yreoXUi6ucfVWGMx0SGc30H2EdotDH/5Iwdm5xzjUfH77mh8EVwOMZNaJMg82thbHoB3rcq9DZnyPp/CwSzywgrmIWsaXTHH9qljOaCemX5Lb4WGvAo0im2NQl2eSSyHERnM+2I2dqyjTYi5UwXvuBb8e3kNqwgoTTi9DZXiK29DknVM9x+hcSaY2kiJIBuVD8o0TRAwofu01s7iTkugh1j2XkZ239C+gZfhuBTS2qeLnO6HiiIOncIhKqPdDXrfGhy8FQWpNE6kWaEFo3ix4QLPdILbxLfPx7Yi0ampuaAfvtY4ir/AU945t4sc4YnZO4Mfg7MhpWkdkS5owrIU5rUFT9RYmUOnKIE/dliaWPUNCrVYpg6iLWcqZFQ3NTXzcX+Zl25o0RJQLLaVhC0oU1HPhsgffYpji5Zj2krwsiuUbZLyz36D2t6Me+lzjyjQxltRCyWhQ2OgnGDomPmjYi58WfXohsTZkGiyl+yjuP3EGsdUrV16tIrqHR7CthIczdijB3k8nYqSC/Q1GzHAFOa9pE9rUA57QqfOD8CvZVebDH9gIJpzw4dDnEiWfneWfeXcScHA8frCUcOK8g6XMlJulzEuJw21pUbrtXZDm8X2U0r+HQ5XU1td4b0tev46MmLydfWOa4ilcca33OieeW+OA/ffxhyaSmUE086+WE6nXEn1qvSDizIfaf3XhHpF9aiTp4wS+yvnwrkms8jsRzvyLxrDaz6v4zs2rC6dmwrux/2GP7heOrZsN7K39TdWXTIS2DurIZ6Mo99n1Vb0T8md+jdNYFITKaV0Va41JUjPWVSD7vEXH2qZzY0tFfY4qHEV3kRnSRtkc4umgEuy1ufFDoxu7Cn7HbMjoZXfxMp7PNiPhP56PiKhbFvk9WhEhrfCMO1nqEvn5epNR6dujKJ8Xfjt7589+P9hl2GW87d+Xf+m2noRs7DT28K+/Wf3fl3W79q6kvRfzlXRFdNCl0ZTPv7P1kRejKX4u9lcviD6mXQzEzhKhAAAAAAElFTkSuQmCC","aspectRatio":1,"src":"/static/1b54e7231a52b0e750aebf3cb04315fa/62915/browser.png","srcSet":"/static/1b54e7231a52b0e750aebf3cb04315fa/62915/browser.png 128w","sizes":"(max-width: 128px) 100vw, 128px"}}}}}}]},"featuredImage":{"node":{"localFile":{"childImageSharp":{"gatsbyImageData":{"layout":"constrained","placeholder":{"fallback":"data:image/webp;base64,UklGRoIAAABXRUJQVlA4IHYAAACwAwCdASoUAA0APtFUo0uoJKMhsAgBABoJZwAAPcEHYrjCSfWdQAD+7t7iGqxW7lczJEAy9ioC4hM2jJ1zwFH/L1FWn5OELSs+XYDWTPZq1HvWYU9roo6rn1O4JPsU5jTINRn+TqmKKMV2bcAjMJeslezGcqAA"},"images":{"fallback":{"src":"/static/f14434d2db73b0ced05eda26849e037c/3b606/webpc-passthru-3.webp","srcSet":"/static/f14434d2db73b0ced05eda26849e037c/28975/webpc-passthru-3.webp 360w,\\n/static/f14434d2db73b0ced05eda26849e037c/4b463/webpc-passthru-3.webp 720w,\\n/static/f14434d2db73b0ced05eda26849e037c/3b606/webpc-passthru-3.webp 1440w","sizes":"(min-width: 1440px) 1440px, 100vw"},"sources":[]},"width":1440,"height":900}}}}}}]}}}');

/***/ })

};
;
//# sourceMappingURL=component---src-pages-popular-post-js.js.map