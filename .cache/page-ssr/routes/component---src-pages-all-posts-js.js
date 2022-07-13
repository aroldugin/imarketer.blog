"use strict";
exports.id = "component---src-pages-all-posts-js";
exports.ids = ["component---src-pages-all-posts-js"];
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

/***/ "./src/pages/all-posts.js":
/*!********************************!*\
  !*** ./src/pages/all-posts.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _public_page_data_sq_d_2120012155_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../public/page-data/sq/d/2120012155.json */ "./public/page-data/sq/d/2120012155.json");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");
/* harmony import */ var gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gatsby-plugin-image */ "./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js");
/* harmony import */ var gatsby_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gatsby-image */ "./node_modules/gatsby-image/index.js");







const AllPosts = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.StaticQuery, {
  query: "2120012155",
  render: data => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, data.allWpPost.nodes.map((post, node, nodes) => {
    const {
      slug,
      id,
      title,
      categories,
      featuredImage,
      date,
      content
    } = post;
    let img = (0,gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_4__.getImage)(featuredImage.node.localFile.childImageSharp.gatsbyImageData);
    const categ = categories.nodes;
    const aut = categ[0].icat.caticon.localFile.childImageSharp.fluid;
    var x = content;
    const time = 1500;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
      key: id,
      className: "flex justify-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
      className: "block text-left mt-10 pr-10"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.Link, {
      key: id,
      to: `/${categ[0].slug}/`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
      className: "flex"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(gatsby_image__WEBPACK_IMPORTED_MODULE_3__["default"], {
      fluid: aut,
      alt: "A corgi smiling happily",
      className: "h-10 w-10 object-cover rounded-full mr-3"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h6", {
      className: "font-bold text-indigo-700 hover:text-pink-700"
    }, categ[0].name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("small", {
      className: "text-sm"
    }, date, " - ", Math.round(x.length / time), " \u043C\u0438\u043D\u0443\u0442")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.Link, {
      key: id,
      to: `/${categ[0].slug}/${slug}`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
      className: "pt-4 mb-5"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", {
      className: "text-xl font-bold mb-2"
    }, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_4__.GatsbyImage, {
      className: "rounded",
      image: img,
      alt: title
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", {
      className: "text-blue-600"
    }, "\u0427\u0438\u0442\u0430\u0442\u044C \u0441\u0442\u0430\u0442\u044C\u044E \u2192"))));
  })),
  data: _public_page_data_sq_d_2120012155_json__WEBPACK_IMPORTED_MODULE_0__
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AllPosts);

/***/ }),

/***/ "./public/page-data/sq/d/2120012155.json":
/*!***********************************************!*\
  !*** ./public/page-data/sq/d/2120012155.json ***!
  \***********************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"data":{"allWpPost":{"nodes":[{"date":"24 июня 2022 г.","id":"cG9zdDo5","content":"\\n<p>Довольно часто, общаясь с клиентами, мне задают вопрос –&nbsp;сколько стоит&nbsp;<a href=\\"https://teox.eu/educations/seo-chto-eto-takoe/\\">SEO</a>? На что я имею в запасе несколько ответов, как правило, то что в итоге услышит клиент, зависит скорее от его тона, интонации и контекста вопроса. Но смысл всегда один и тот же – «<strong>я не знаю сколько реально сегодня стоит&nbsp;SEO&nbsp;для конкретно Вашего сайта…</strong>».</p>\\n\\n\\n\\n<figure class=\\"wp-block-image\\"><img src=\\"https://teox.eu/wp-content/webpc-passthru.php?src=https://teox.eu/wp-content/uploads/2019/10/sdf.png&amp;nocache=1\\" alt=\\"\\" class=\\"wp-image-6164\\"/></figure>\\n\\n\\n\\n<p>И на это есть ряд веских причин. Самое главное – невозможно точно рассчитать цену seo продвижения, так как есть ряд зависящих факторов, так же есть ряд вещей которые эту цену могут снизить.</p>\\n\\n\\n\\n<p>Я не буду приводить списки&nbsp;seo чек-листа, которые обычно описываются в подобных статьях, не вижу смысла – профессионал и так знает, что делать, а заказчик ищет результат и покупает ожидание.</p>\\n\\n\\n\\n<blockquote class=\\"wp-block-quote\\"><p>В этой статье, вы не найдете точных цифр, сравнений стоимости услуг seo на рынке. На мой взгляд, вы можете найти больше — модель поведения при определении цены на&nbsp;seo.</p></blockquote>\\n\\n\\n\\n<h3>Что делает SEO дорогим продуктом?</h3>\\n\\n\\n\\n<p>Тут следует заметить, что одна из наиболее частых причин, это невозможность просчитать себестоимость продукта, поэтому цена на seo задается «с потолка». Обычно к такой стратегии ценообразования приходят менее опытные seo специалисты. Алгоритм получения цены на seo, в таком случае прост – берется средняя цена на рынке у SEO компаний (которым нужно платить, кроме себестоимости услуги, еще за ряд вещей, таких как офис, сотрудники и прочее).</p>\\n\\n\\n\\n<h3>Не качественный сайт – дороже продвижение</h3>\\n\\n\\n\\n<p>Простая формула, но очень частая. К сожалению, большая часть рынка не использует качественные услуги по веб-разработке сайта и ищет фрилансеров, которые пилят сайт на wordpress «за неделю», «на коленке».</p>\\n\\n\\n\\n<p>Заниматься оптимизацией такого сайта задача не простая, но выполнимая. Однако, такой старт в SEO будет стоить дороже и возьмет много времени.</p>\\n\\n\\n\\n<p><strong>Вывод:</strong>&nbsp;хотите сделать свое SEO дешевле – вписывайте в ТЗ четкие правила по внедрению SEO Оптимизации, уже на старте разработки. Для таких случаев можно&nbsp;нанять seo специалиста, который за вменяемые деньги сделает анализ и напишет ТЗ.</p>\\n\\n\\n\\n<h3>Наличие фильтров, банана или переоптимизации – делает SEO в разы дороже</h3>\\n\\n\\n\\n<p>Возникает это в процессе, когда заказчик уже попробовал самостоятельно заняться продвижением своего сайта, не имея ни стратегии, ни знаний об этом. Обычно такое вдохновение приходит после прочтения пары-тройки статей о продвижении сайтов. И тогда начинаются попытки играть «я сам знаю, как надо».</p>\\n\\n\\n\\n<ol><li>SEO становится дороже, потому что заказчик ничего не знает, но делает. Пишет тексты, забивает ключами весь контент на сайте, накупает ссылок. В итоге потом оптимизатор чистит все это … и это будет стоит дороже – цена на seo вырастает.</li><li>Заказчик попробовал и у него не получилось, нанял специалиста, но при этом, он – заказчик, думает что по прежнему «знает лучше» — это делает seo дороже, цена будет расти, потому что специалист вместо продвижения сайта будет выполнять «пожелания» клиента.</li></ol>\\n\\n\\n\\n<p><strong>Вывод:</strong>&nbsp;не занимайтесь SEO самостоятельно, если не прошли специальный&nbsp;курс по SEO, или не провели достаточное количество часов за изучением того, как это работает.</p>\\n\\n\\n\\n<h2>Что может уменьшить цену на SEO услуги?</h2>\\n\\n\\n\\n<p>По причине того, что результаты от&nbsp;продвижения сайтов&nbsp;становятся заметными не сразу, а лишь спустя некоторое время после запуска компании по SEO-продвижению, многие полагают, что не могут позволить потратить свои финансовые средства на раскрутку проекта, не видя длительное время результатов от этого. Но если правильно подойти к процессу раскрутки, то можно найти методы, сэкономить финансы и время, и сделать качественное SEO-продвижение значительно доступнее для своего бюджета.</p>\\n\\n\\n\\n<p>Но надо понимать, что вопрос экономии бюджета на раскрутку сайта предполагает и ряд подводных камней. Поисковая оптимизация не может быть эффективной без определенных составляющих, к примеру, таких, как качественный&nbsp;контент&nbsp;сайта. Экономить на подобного рода вещах нецелесообразно, то есть сокращение расходов на SEO-продвижение должно преследовать в первую очередь не экономию денег, а получение наиболее эффективных результатов, за меньшее количество потраченных средств.</p>\\n\\n\\n\\n<h3>Поиск узкой ниши для таргетинга</h3>\\n\\n\\n\\n<p>Сократить расходы на кампанию по продвижению можно еще на этапе планирования. Для этого нужно правильно выбрать рынок и аудиторию, на которую будет рассчитан ваш проект. Многие маркетологи стараются охватить максимально широкую аудиторию, чтобы собрать наибольшее количество потенциальных клиентов, с разными вкусами, интересами, материальным положением, географическим нахождением и т.д.</p>\\n\\n\\n\\n<p>Лучше и дешевле будет сегментировать всю аудиторию и работать с каждой отдельно, выявив при этом ту аудиторию, в которой покупательская способность выше (больше денег).</p>\\n\\n\\n\\n<h3>Разделите бюджет на части</h3>\\n\\n\\n\\n<p>Вообще, SEO может быть реализовано несколькими путями. Один из них – обратиться к услугам компаний, занимающихся раскруткой сайтов, и полностью заказать весь комплекс работ по продвижению. Такой вариант наиболее дорогостоящий, но при этом он принесет эффективные результаты достаточно быстро — при условии, что вы выбрали именно «ту» компанию, которая на это способна.</p>\\n\\n\\n\\n<p>Также можно обратиться к фрилансерам, которые, как правило, могут выполнять аналогичные работы значительно дешевле. Можно и самостоятельно продвигать свой ресурс, что более сложно, поскольку вам придется самостоятельно разбираться во всех тонкостях этой области. Чтобы сэкономить свои средства, можно поделить бюджет на части, заказав какие-то наиболее важные работы у специалистов, а другие задачи выполняя самостоятельно.</p>\\n\\n\\n\\n<p><strong>Вывод:</strong>&nbsp;если у вас нет времени, используйте принцип «разделяй и властвуй» — делайте самостоятельно только то, в чем действительно разбираетесь. Остальное можно отдать профессионалам, составив четкое ТЗ.</p>\\n\\n\\n\\n<p><strong>Пример:</strong>&nbsp;один из моих клиентов пишет тексты самостоятельно. Нет, он не профессиональный писатель, но разбирается в теме своего бизнеса лучше чем любой, даже самый опытный копирайтер или рерайтер.</p>\\n\\n\\n\\n<h3>Использование маркетинговых тактик</h3>\\n\\n\\n\\n<p>Эффективное SEO-продвижение не может существовать отдельно от многих других компонентов развития бизнеса. То есть вам необходимо задействовать и такие элементы как SMM-маркетинг, email-рассылки, контент-маркетинг, линк-билдинг и т.д.</p>\\n\\n\\n\\n<p>Часто это нужно не только ради привлечения трафика. Есть такой алгоритм, который анализирует поведенческие факторы. Если вас цитируют в соц. сетях или на сайтах, ранжирование сайта сильно возрастет. Экономить тут можно за счет создаваемого уникального контента, которым пользователи будут делиться.</p>\\n\\n\\n\\n<p>+ регистрация статей, публикация RSS-лент и партнерские соглашения с блогами и т.д. Вы можете тратить на это не много времени, при этом существенно сократите стоимость seo.</p>\\n\\n\\n\\n<h3>Инвестирование только в эффективные платформы</h3>\\n\\n\\n\\n<p>Используйте эффективные инструменты. Создайте собственный план работ и действуйте. Пошагово распределяя&nbsp;бюджеты не только на улучшение качества сайта, но и на использование инструментов для SEO.</p>\\n\\n\\n\\n<p>На сегодняшний день есть ряд, идеальный SEO сервисов, которые помогут вам сделать SEO дешевле и качественней, если вы научитесь использовать их самостоятельно:</p>\\n\\n\\n\\n<p><a href=\\"https://serpstat.com/?ref=557\\">Serpstat</a>&nbsp;— SEO платформа на каждый день, очень проста в освоении, но в то же время и сложна в плане потенциала в получении данных. Тут вы найдете почти все, что вам нужно для управления, оптимизации и создания идеальной стратегии.&nbsp;Особенностью является еще и весьма подробный анализ конкурентов, который способен в разы удешевить ваше seo. Можете посмотреть подробный&nbsp;<a href=\\"https://teox.eu/tools/serpstat/\\">обзор этого инструмента</a>, перед тем как принимать решение, попробуйте бесплатную версию.</p>\\n\\n\\n\\n<p><a href=\\"https://topvisor.ru/?inv=24705\\">Topvisor</a>&nbsp;— поможет отслеживать изменения на сайте, заняться кластеризацией ключевых слов и проверять позиции сайта. Особенность — акцент на ключевых словах, проверка и анализ которых проводятся с достаточной скоростью.</p>\\n\\n\\n\\n<p><a href=\\"https://www.miralinks.ru/from:264794\\">Miralinks&nbsp;</a>— платформа для получения качественных обратных ссылок. Особенность — возможно (главное условие) определять качество ссылки самостоятельно, при необходимости написать и разместить статью на выбранном вами сайте, вы можете смело контролировать процесс внешнего SEO.&nbsp;</p>\\n\\n\\n\\n<p>Так же рекомендую посмотреть на инструменты, которые способны сделать качественный&nbsp;<a href=\\"https://teox.eu/lifehack/siteadit/\\">анализ сайта</a>&nbsp;(17 инструментов).&nbsp;<a href=\\"https://teox.eu/tools/seotools/\\">Еще</a>&nbsp;одна подборка инструментов и о том, как собрать&nbsp;<a href=\\"https://teox.eu/tools/instrumenty-dlya-seanki/\\">семантическое ядро&nbsp;самостоятельно</a>.</p>\\n\\n\\n\\n<h3>Качество превыше количества</h3>\\n\\n\\n\\n<p>Этот принцип крайне важен для эффективного SEO-продвижения. То, насколько ваш ресурс авторитетен и ценен, напрямую связано с качеством его контента. Один качественный пост в блоге принесет значительно больше пользы, чем десяток постов с ссылкой на ваш ресурс низкого качества.</p>\\n\\n\\n\\n<p>Точно так же, как и одна ссылка, размещенная на авторитетной платформе, будет более ценной, нежели большое количество ссылок, размещенных на низкокачественных сайтах, не пользующихся особым интересом у пользователей.</p>\\n\\n\\n\\n<p>Еще, на мой взгляд, — качественный контент на вашем сайте, оптимизированные заголовки и ясное виденье конкурентной картины в вашей нише — являются наиболее ценными качествами для вас и вашего seo.</p>\\n\\n\\n\\n<h2>Вместо вывода: так сколько же стоит SEO?</h2>\\n\\n\\n\\n<p>Конечно, рассчитывать стоимость seo необходимо опираясь на показатели качества. Иногда можно тратить тысячи и не получить результата, но бывают случаи, когда достаточно и пары сотен, если вы делаете это самостоятельно.</p>\\n\\n\\n\\n<p>Цена SEO вычисляется из стоимости клиента и среднего чека затрат на&nbsp;<a href=\\"https://teox.eu/lifehack/s-chego-nachat-seo/\\">продвижение</a>&nbsp;и конверсии в нише. Я хочу сказать, что реальной цены нет, увы. Стоимость вашего SEO определите самостоятельно, опираясь на простую формулу — ваши затраты в месяц должны приносить в 3 — 4 раза больше прибыли.</p>\\n\\n\\n\\n<p>Т.е. если, например, вы тратите $100 в месяц, то зарабатывать должны $400. Единственное, что считайте бюджеты, опираясь на реальные цифры (ищите или проводите исследования) и имей ввиду, что SEO — это вложение на будущее. Результаты могут появиться спустя только несколько месяцев после начала работ.</p>\\n\\n\\n\\n<p>Если вы знаете еще какие-то способы сделать SEO дешевле, делитесь в комментариях, полезно будет всем.</p>\\n","excerpt":"<p>Довольно часто, общаясь с клиентами, мне задают вопрос –&nbsp;сколько стоит&nbsp;SEO? На что я имею в запасе несколько ответов, как правило, то что в итоге услышит клиент, зависит скорее от его тона, интонации и контекста вопроса. Но смысл всегда один и тот же – «я не знаю сколько реально сегодня стоит&nbsp;SEO&nbsp;для конкретно Вашего сайта…». И на [&hellip;]</p>\\n","slug":"post1","title":"Какова реальная цена SEO продвижение сайта?","author":{"node":{"name":"Andrew Roldugin","description":"Напишите немного о себе. Эта информация может отображаться на сайте."}},"categories":{"nodes":[{"name":"Исследования","slug":"research","id":"dGVybTo0","icat":{"caticon":{"localFile":{"childImageSharp":{"fluid":{"base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAOxAAADsQH1g+1JAAAFYklEQVQ4y3WTa0yTVxjHn3Zj2T4sS/ZpH3fJ4gc+EI1RUJTgBGEq13JRrkKBggjigCIGB0zFDd3UmajZCEPjRAQFpiAwLBcBXbkIA2y5ldJS2vft+7690AuFnmd5q0u2D5zkSc55kvPL/zz//wFjUwyYByXAdR8DTpYmsC+cETgWy8CxWLbNPl9aZ1NKVatThS7reIHTMnxCYR7Kvmbqz/yU7UoFtjNFKAUAtisFqPoIoO5HAnCydDAPZV/hetKPM+1JsGY4x8OK7Atn0KaU4urkN2gdy0eLPBfNgxI09WciJ0uzsp3JsUxHEhib44DtTK6iH8UUGVvjAbgeMZgGJAVMeyKu1IQEO1cqxfb5t7DpIpdNUey2zZQQm0JKLKP5bq5H7GI7kpFpS0C6MdrfIs/N58/UvYgwj0KqPkrAtCUAVR8ZyfWkSxyLZVabQoo2RfGGQ30WnbrviFNXQZyas8SxeJpYx08i25G8bmyOQ7pRNMN1H0tjO5K/Yp4kAPM0SQjc8wyBZSTPy/wyh3/qD/8qc6i/Ret4HqEbQwlVH4krNSLU/nyEcH3HifmFBOkmkYuqj0B93cFkujEaqIYor5VfgwXA9WV4hqmvOwQ2pXSSn5lHnbacWEaO45zUB5WZW1GR7o/TyftxsSoMOZmYGFvjN/R1B1Ff93Ur/TAW2O5UMPweBrzDfzJtCXPGlrhK2+viaevYSbTNlLjtqjLiUJeh8VkuKrODUZEdgqrzoagqD0bt1TBCN8Zs6GtDUXcrqN8iz73AdqVq6cboJjA9zywy/nGk2tgcG2WdKFDybtoUUrd9/gxZnSpC+2whzhXG4lTSIVRXheBSVShqvg8h2ktBG7qb+1F3Y1+vRZ4bzjxNukY1ROaAaSALjC3xwDw5ChZ57gAfDetY/oZNKSXWVwVkdeIEKnIScTI+GjWXQjyw5R9DcelcwLrmgj8uXw+spRtFwPWm83MEMA1K3mUeH/Uy9WWA+WVOjidnPelrltF8tAznEeuIhPwdn4HjhxNx+Uow0V4OJdrq/WSpcrcHqK7YuU9fcxAMt8Peox5EvQOO5XJoBuAtv0s/is3hZOnDbGcKsl0pLlN/FlrkmWSuNJMos2OI7voBoq0OQs35PWuai3tw6fyuBxZ5bhnXI/6J6xPDqqIIgHuWxhtz+02wD3zBtKd4U3dFDkNtOBpqwzcMv4WhpmonUWYGokoagOpS3w11qS8uVexampV8/pF1NC+Iv0s1RJXSTSIA4+Oj/G+JZ9oTfZj2I6CvFcFSZZDPfPHexdl8P1RmbXWPBWzDwS3BZDjQ261I9EaleNvLhdwdn6gKt4N5KAvohzH7qIaoED6PQDfHAdcrBqYtEYwt0cKpspj3xvPDoT/EJ3Ug2h8HInev9wQGkG6/3UQWsN3df2Anyvw+830lDoaJnCAv86BYSD+K9RhCN0YLPCBTr1jItCcK9YjAIgLtML9P0fbnBi2LBi3rpnQMGpb5Yt0GLYc047hjRwSrAYFC5FMipBqihB6F/13jGifMrzhBZVj78C+VQzG44MShBadraMG5/rbW+J5c5egA0QggIkxonLDp0nJuuPHwNTyQLcECtX5fuexEhdbuVGjtrrflmNE5UUWvV01rHDCptgt1JrI5cEKzJni9sg4zNPl4WGVfG1W7cIpC16QecVKPhN+PLDpxRGVXIqLgjcK1zYGn78zAlXtywTwi/NJr8xVLr72ITj2FMelSFKUVY1TKKcwpr2m5O4pblIhw4/GCoOTO7ObAi00qaOhWwuGIWEHJ1Va+9YHfjq2XAwP2sHv9/ZZ9vL+U8qrKbnZDal6F4Fa7Gqpb1P+D/APJu79LMQsPfwAAAABJRU5ErkJggg==","aspectRatio":1,"src":"/static/84e97583048fb86545f63b06c320c583/62915/tips.png","srcSet":"/static/84e97583048fb86545f63b06c320c583/62915/tips.png 128w","sizes":"(max-width: 128px) 100vw, 128px"}}}}}}]},"featuredImage":{"node":{"localFile":{"childImageSharp":{"gatsbyImageData":{"layout":"constrained","placeholder":{"fallback":"data:image/webp;base64,UklGRoIAAABXRUJQVlA4IHYAAADwAwCdASoUAA0APtFUo0uoJKMhsAgBABoJZQAD5Jnmp9qxWLcLAKAAAP7oW5o6xBg9lh2vrRzY5QKULHLRrO6I46lkJXtRN3nBIqWVUcGGo+6A+zRea5V4b3hAVjoeKsP8TaxVMgSDS44W83qcebcVPDcUiAAA"},"images":{"fallback":{"src":"/static/84de6e9e830e958ddff5cdba1b6de650/d4839/webpc-passthru-1.webp","srcSet":"/static/84de6e9e830e958ddff5cdba1b6de650/a1dad/webpc-passthru-1.webp 149w,\\n/static/84de6e9e830e958ddff5cdba1b6de650/0e0b1/webpc-passthru-1.webp 298w,\\n/static/84de6e9e830e958ddff5cdba1b6de650/d4839/webpc-passthru-1.webp 596w","sizes":"(min-width: 596px) 596px, 100vw"},"sources":[]},"width":596,"height":380}}}}}}]}}}');

/***/ })

};
;
//# sourceMappingURL=component---src-pages-all-posts-js.js.map