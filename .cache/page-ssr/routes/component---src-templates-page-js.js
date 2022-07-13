exports.id = "component---src-templates-page-js";
exports.ids = ["component---src-templates-page-js"];
exports.modules = {

/***/ "./node_modules/gatsby-image/index.js":
/*!********************************************!*\
  !*** ./node_modules/gatsby-image/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


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

"use strict";
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

"use strict";


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

/***/ "./src/components/footer.js":
/*!**********************************!*\
  !*** ./src/components/footer.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");
/* harmony import */ var gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gatsby-plugin-image */ "./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js");




const Footer = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("footer", {
    class: "footer footer-center  bg-slate-900 text-slate-100 mt-20"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "avatar pt-10"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "w-16 rounded-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    key: "377",
    to: "/"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_2__.StaticImage, {
    className: "w-16 rounded-full",
    alt: "",
    src: "../images/iam.webp",
    formats: ["auto", "webp", "avif"],
    __imageData: __webpack_require__(/*! ./.cache/caches/gatsby-plugin-image/4031179360.json */ "./.cache/caches/gatsby-plugin-image/4031179360.json")
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mb-5"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, "\u0410\u0432\u0442\u043E\u0440 \u0431\u043B\u043E\u0433\u0430 ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("br", null), "\u0420\u043E\u043B\u0434\u0443\u0433\u0438\u043D \u0410\u043D\u0434\u0440\u0435\u0439")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", null, "Copyright \xA9 2022 - \u0412\u0441\u0435 \u043F\u0440\u0430\u0432\u0430 \u0437\u0430\u0449\u0438\u0449\u0435\u043D\u044B. ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("br", null), "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0440\u0430\u0437\u0440\u0435\u0448\u0430\u0435\u0442\u0441\u044F \u0438\u0441\u043A\u043B\u044E\u0447\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0441 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435\u043C \u043E\u0431\u0440\u0430\u0442\u043D\u043E\u0439 \u0441\u0441\u044B\u043B\u043A\u0438"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mt-5"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_2__.StaticImage, {
    src: "../images/social/telegram.png",
    formats: ["auto"],
    alt: "@imarketer",
    className: "w-7 h-7 mr-2",
    __imageData: __webpack_require__(/*! ./.cache/caches/gatsby-plugin-image/1465561968.json */ "./.cache/caches/gatsby-plugin-image/1465561968.json")
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_2__.StaticImage, {
    src: "../images/social/facebook.png",
    formats: ["auto"],
    alt: "@imarketer",
    className: "w-7 h-7 mr-2",
    __imageData: __webpack_require__(/*! ./.cache/caches/gatsby-plugin-image/1139469522.json */ "./.cache/caches/gatsby-plugin-image/1139469522.json")
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_2__.StaticImage, {
    src: "../images/social/instagram.png",
    formats: ["auto"],
    alt: "@imarketer",
    className: "w-7 h-7 mr-2",
    __imageData: __webpack_require__(/*! ./.cache/caches/gatsby-plugin-image/3426521238.json */ "./.cache/caches/gatsby-plugin-image/3426521238.json")
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_2__.StaticImage, {
    src: "../images/social/linkedin.png",
    formats: ["auto"],
    alt: "@imarketer",
    className: "w-7 h-7 mr-2",
    __imageData: __webpack_require__(/*! ./.cache/caches/gatsby-plugin-image/1324946639.json */ "./.cache/caches/gatsby-plugin-image/1324946639.json")
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null)));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Footer);

/***/ }),

/***/ "./src/components/header.js":
/*!**********************************!*\
  !*** ./src/components/header.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menu */ "./src/components/menu.js");
/* harmony import */ var gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gatsby-plugin-image */ "./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js");





const Header = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "dark mb-10 border-b"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "navbar"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "navbar-start"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "avatar lg:hidden"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_3__.StaticImage, {
    className: "w-16 h-16 rounded-full",
    alt: "",
    src: "../images/iam.webp",
    formats: ["auto", "webp", "avif"],
    __imageData: __webpack_require__(/*! ./.cache/caches/gatsby-plugin-image/4031179360.json */ "./.cache/caches/gatsby-plugin-image/4031179360.json")
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "navbar  relative hidden lg:flex"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "logo"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "w-full rounded-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "avatar"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "w-16 rounded-full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(gatsby__WEBPACK_IMPORTED_MODULE_0__.Link, {
    key: "377",
    to: "/"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_3__.StaticImage, {
    className: "w-16 rounded-full",
    alt: "",
    src: "../images/iam.webp",
    formats: ["auto", "webp", "avif"],
    __imageData: __webpack_require__(/*! ./.cache/caches/gatsby-plugin-image/4031179360.json */ "./.cache/caches/gatsby-plugin-image/4031179360.json")
  })))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "navbar-end"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_menu__WEBPACK_IMPORTED_MODULE_2__["default"], null))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);

/***/ }),

/***/ "./src/components/layout.js":
/*!**********************************!*\
  !*** ./src/components/layout.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _layout_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layout.css */ "./src/components/layout.css");
/* harmony import */ var _layout_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_layout_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./header */ "./src/components/header.js");
/* harmony import */ var _footer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./footer */ "./src/components/footer.js");
/* harmony import */ var gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! gatsby-plugin-image */ "./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js");
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");







const Layout = ({
  children
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "page"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "px-4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_header__WEBPACK_IMPORTED_MODULE_2__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "flex flex-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "static"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    class: "fixed ml-10 top-32"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mb-10"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_5__.StaticImage, {
    src: "../images/social/minimal/home.png",
    formats: ["auto"],
    alt: "@imarketer",
    className: "w-5 h-5",
    __imageData: __webpack_require__(/*! ./.cache/caches/gatsby-plugin-image/330628405.json */ "./.cache/caches/gatsby-plugin-image/330628405.json")
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mb-10"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_5__.StaticImage, {
    src: "../images/social/minimal/notification.png",
    formats: ["auto"],
    alt: "@imarketer",
    className: "w-5 h-5",
    __imageData: __webpack_require__(/*! ./.cache/caches/gatsby-plugin-image/1250803909.json */ "./.cache/caches/gatsby-plugin-image/1250803909.json")
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "mb-5"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(gatsby__WEBPACK_IMPORTED_MODULE_4__.Link, {
    key: "3",
    to: "https://t.me/iam_marketer",
    target: "_blank"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_5__.StaticImage, {
    src: "../images/social/minimal/telegram.png",
    formats: ["auto"],
    alt: "@imarketer",
    className: "w-5 h-5 online placeholder",
    __imageData: __webpack_require__(/*! ./.cache/caches/gatsby-plugin-image/780604402.json */ "./.cache/caches/gatsby-plugin-image/780604402.json")
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "basis-full pt-0"
  }, children)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_footer__WEBPACK_IMPORTED_MODULE_3__["default"], null));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);

/***/ }),

/***/ "./src/components/menu.js":
/*!********************************!*\
  !*** ./src/components/menu.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _public_page_data_sq_d_220261205_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../public/page-data/sq/d/220261205.json */ "./public/page-data/sq/d/220261205.json");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");





const Menu = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.StaticQuery, {
  query: "220261205",
  render: data => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("ul", {
    className: "menu menu-horizontal p-0 hidden lg:flex font-bold"
  }, data.wpMenu.menuItems.nodes.map(item => {
    const {
      label,
      path,
      id
    } = item;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.Link, {
      key: id,
      to: path
    }, label));
  })),
  data: _public_page_data_sq_d_220261205_json__WEBPACK_IMPORTED_MODULE_0__
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Menu);

/***/ }),

/***/ "./src/components/posts-sidebar.js":
/*!*****************************************!*\
  !*** ./src/components/posts-sidebar.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _public_page_data_sq_d_310293774_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../public/page-data/sq/d/310293774.json */ "./public/page-data/sq/d/310293774.json");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");
/* harmony import */ var gatsby_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gatsby-image */ "./node_modules/gatsby-image/index.js");






const PostsSidebar = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.StaticQuery, {
  query: "310293774",
  render: data => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, data.allWpPost.nodes.map((post, node, nodes) => {
    const {
      slug,
      id,
      title,
      categories,
      content,
      date
    } = post;
    const categ = categories.nodes;
    const aut = categ[0].icat.caticon.localFile.childImageSharp.fluid;
    var x = content;
    const time = 1500;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
      key: id,
      className: "flex justify-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
      className: "block text-left p-5"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.Link, {
      key: categ[0].id,
      to: `/${categ[0].slug}`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
      className: "flex"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(gatsby_image__WEBPACK_IMPORTED_MODULE_3__["default"], {
      fluid: aut,
      alt: "A corgi smiling happily",
      className: "h-5 w-5 object-cover rounded-full mr-3"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h6", {
      className: "font-bold text-indigo-700 hover:text-pink-700"
    }, categ[0].name)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.Link, {
      to: `/${categ[0].slug}/${slug}`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
      className: "pt-2 mb-4"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", {
      className: "text-lg font-bold mb-2"
    }, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("small", {
      className: "text-sm"
    }, date, " - ", Math.round(x.length / time), " \u043C\u0438\u043D\u0443\u0442")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", {
      className: "text-blue-600"
    }, "\u0427\u0438\u0442\u0430\u0442\u044C \u0441\u0442\u0430\u0442\u044C\u044E \u2192"))));
  })),
  data: _public_page_data_sq_d_310293774_json__WEBPACK_IMPORTED_MODULE_0__
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PostsSidebar);

/***/ }),

/***/ "./src/templates/page.js":
/*!*******************************!*\
  !*** ./src/templates/page.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/layout */ "./src/components/layout.js");
/* harmony import */ var _components_posts_sidebar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/posts-sidebar */ "./src/components/posts-sidebar.js");




const PageTemplate = ({
  data
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_layout__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "flex flex-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "basis-10/12"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "p-10 pt-0"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "content-page max-w-3xl mx-auto"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "header-post mt-5"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", null, data.wpPage.title)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "content max-w-3xl mx-auto",
    dangerouslySetInnerHTML: {
      __html: data.wpPage.content
    }
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "basis-2/12 static"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "fixed max-w-sm"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_posts_sidebar__WEBPACK_IMPORTED_MODULE_2__["default"], null)))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PageTemplate);
const query = "3799301976";

/***/ }),

/***/ "./src/components/layout.css":
/*!***********************************!*\
  !*** ./src/components/layout.css ***!
  \***********************************/
/***/ (() => {



/***/ }),

/***/ "./.cache/caches/gatsby-plugin-image/1139469522.json":
/*!***********************************************************!*\
  !*** ./.cache/caches/gatsby-plugin-image/1139469522.json ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#384888","images":{"fallback":{"src":"/static/978b4ce6b38f362d097b84b3c955bd4d/bf8e1/facebook.png","srcSet":"/static/978b4ce6b38f362d097b84b3c955bd4d/914ee/facebook.png 32w,\\n/static/978b4ce6b38f362d097b84b3c955bd4d/1c9ce/facebook.png 64w,\\n/static/978b4ce6b38f362d097b84b3c955bd4d/bf8e1/facebook.png 128w","sizes":"(min-width: 128px) 128px, 100vw"},"sources":[]},"width":128,"height":128}');

/***/ }),

/***/ "./.cache/caches/gatsby-plugin-image/1250803909.json":
/*!***********************************************************!*\
  !*** ./.cache/caches/gatsby-plugin-image/1250803909.json ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/79d5aca6bf61f9982b29b5a972d4baac/bf8e1/notification.png","srcSet":"/static/79d5aca6bf61f9982b29b5a972d4baac/914ee/notification.png 32w,\\n/static/79d5aca6bf61f9982b29b5a972d4baac/1c9ce/notification.png 64w,\\n/static/79d5aca6bf61f9982b29b5a972d4baac/bf8e1/notification.png 128w","sizes":"(min-width: 128px) 128px, 100vw"},"sources":[]},"width":128,"height":128}');

/***/ }),

/***/ "./.cache/caches/gatsby-plugin-image/1324946639.json":
/*!***********************************************************!*\
  !*** ./.cache/caches/gatsby-plugin-image/1324946639.json ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#0868c8","images":{"fallback":{"src":"/static/80aba14d7915031796bf3b7ab721a231/bf8e1/linkedin.png","srcSet":"/static/80aba14d7915031796bf3b7ab721a231/914ee/linkedin.png 32w,\\n/static/80aba14d7915031796bf3b7ab721a231/1c9ce/linkedin.png 64w,\\n/static/80aba14d7915031796bf3b7ab721a231/bf8e1/linkedin.png 128w","sizes":"(min-width: 128px) 128px, 100vw"},"sources":[]},"width":128,"height":128}');

/***/ }),

/***/ "./.cache/caches/gatsby-plugin-image/1465561968.json":
/*!***********************************************************!*\
  !*** ./.cache/caches/gatsby-plugin-image/1465561968.json ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#28a8e8","images":{"fallback":{"src":"/static/eb5797d03e9f2ad0f563d079204a00a2/bf8e1/telegram.png","srcSet":"/static/eb5797d03e9f2ad0f563d079204a00a2/914ee/telegram.png 32w,\\n/static/eb5797d03e9f2ad0f563d079204a00a2/1c9ce/telegram.png 64w,\\n/static/eb5797d03e9f2ad0f563d079204a00a2/bf8e1/telegram.png 128w","sizes":"(min-width: 128px) 128px, 100vw"},"sources":[]},"width":128,"height":128}');

/***/ }),

/***/ "./.cache/caches/gatsby-plugin-image/330628405.json":
/*!**********************************************************!*\
  !*** ./.cache/caches/gatsby-plugin-image/330628405.json ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/11ba6ed27b338a69a28574de31a4e311/bf8e1/home.png","srcSet":"/static/11ba6ed27b338a69a28574de31a4e311/914ee/home.png 32w,\\n/static/11ba6ed27b338a69a28574de31a4e311/1c9ce/home.png 64w,\\n/static/11ba6ed27b338a69a28574de31a4e311/bf8e1/home.png 128w","sizes":"(min-width: 128px) 128px, 100vw"},"sources":[]},"width":128,"height":128}');

/***/ }),

/***/ "./.cache/caches/gatsby-plugin-image/3426521238.json":
/*!***********************************************************!*\
  !*** ./.cache/caches/gatsby-plugin-image/3426521238.json ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/cd07f6c6564bb8aa6d5d2da578d6ac36/bf8e1/instagram.png","srcSet":"/static/cd07f6c6564bb8aa6d5d2da578d6ac36/914ee/instagram.png 32w,\\n/static/cd07f6c6564bb8aa6d5d2da578d6ac36/1c9ce/instagram.png 64w,\\n/static/cd07f6c6564bb8aa6d5d2da578d6ac36/bf8e1/instagram.png 128w","sizes":"(min-width: 128px) 128px, 100vw"},"sources":[]},"width":128,"height":128}');

/***/ }),

/***/ "./.cache/caches/gatsby-plugin-image/4031179360.json":
/*!***********************************************************!*\
  !*** ./.cache/caches/gatsby-plugin-image/4031179360.json ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/cc7900150aeefe15893195ac32a7e54a/299bc/iam.webp","srcSet":"/static/cc7900150aeefe15893195ac32a7e54a/4f7ad/iam.webp 18w,\\n/static/cc7900150aeefe15893195ac32a7e54a/dbb7e/iam.webp 35w,\\n/static/cc7900150aeefe15893195ac32a7e54a/299bc/iam.webp 70w","sizes":"(min-width: 70px) 70px, 100vw"},"sources":[{"srcSet":"/static/cc7900150aeefe15893195ac32a7e54a/8b19b/iam.avif 18w,\\n/static/cc7900150aeefe15893195ac32a7e54a/85943/iam.avif 35w,\\n/static/cc7900150aeefe15893195ac32a7e54a/4be15/iam.avif 70w","type":"image/avif","sizes":"(min-width: 70px) 70px, 100vw"}]},"width":70,"height":70}');

/***/ }),

/***/ "./.cache/caches/gatsby-plugin-image/780604402.json":
/*!**********************************************************!*\
  !*** ./.cache/caches/gatsby-plugin-image/780604402.json ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#080808","images":{"fallback":{"src":"/static/45a5c36476adbf2873b6c62ec4e525f6/bf8e1/telegram.png","srcSet":"/static/45a5c36476adbf2873b6c62ec4e525f6/914ee/telegram.png 32w,\\n/static/45a5c36476adbf2873b6c62ec4e525f6/1c9ce/telegram.png 64w,\\n/static/45a5c36476adbf2873b6c62ec4e525f6/bf8e1/telegram.png 128w","sizes":"(min-width: 128px) 128px, 100vw"},"sources":[]},"width":128,"height":128}');

/***/ }),

/***/ "./public/page-data/sq/d/220261205.json":
/*!**********************************************!*\
  !*** ./public/page-data/sq/d/220261205.json ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"data":{"wpMenu":{"menuItems":{"nodes":[{"id":"cG9zdDoxNg==","label":"Главная","title":null,"path":"http://localhost:10003/","parentId":null},{"id":"cG9zdDoxMjg=","label":"Главная","title":null,"path":"http://localhost:10003/","parentId":null},{"id":"cG9zdDo5Ng==","label":"О блоге","title":null,"path":"/sample-page-2/","parentId":null},{"id":"cG9zdDoxMzI=","label":"О блоге","title":null,"path":"/sample-page-2/","parentId":null},{"id":"cG9zdDo5Mw==","label":"Контакты","title":null,"path":"/kontakty/","parentId":null},{"id":"cG9zdDoxMjk=","label":"Контакты","title":null,"path":"/kontakty/","parentId":null}]}}}}');

/***/ }),

/***/ "./public/page-data/sq/d/310293774.json":
/*!**********************************************!*\
  !*** ./public/page-data/sq/d/310293774.json ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"data":{"allWpPost":{"nodes":[{"date":"July 4, 2022","id":"cG9zdDo2Ng==","excerpt":"<p>Семантическое ядро&nbsp;— это список&nbsp;релевантных ключевых слов&nbsp;для продвижения сайта. Релевантность ключевых слов определяется частотностью, популярностью и актуальностью поискового запроса. Семантическое ядро&nbsp;необходимо для продвижения сайта, ведь если вы не знаете по каким запросам ищет информацию в сети пользователь — вы никогда не будете популярны. Если вас не видят по этим релевантным запросам — вы не будете популярны. [&hellip;]</p>\\n","content":"\\n<p><strong>Семантическое ядро</strong>&nbsp;— это список&nbsp;<a href=\\"https://teox.eu/lifehack/klasterizacziya-semanticheskogo-yadra/\\">релевантных ключевых слов</a>&nbsp;для продвижения сайта. Релевантность ключевых слов определяется частотностью, популярностью и актуальностью поискового запроса.</p>\\n\\n\\n\\n<p><a href=\\"https://teox.eu/lifehack/klasterizacziya-semanticheskogo-yadra/\\">Семантическое ядро</a>&nbsp;необходимо для продвижения сайта, ведь если вы не знаете по каким запросам ищет информацию в сети пользователь — вы никогда не будете популярны. Если вас не видят по этим релевантным запросам — вы не будете популярны. Соответственно, эффективность семантического ядра определяется качеством, структурой и анализом данных.</p>\\n\\n\\n\\n<p>Как расширять семантическое ядро. Об этом мы и поговорим в сегодняшней статье.</p>\\n\\n\\n\\n<p>Рекомендую перед прочтением этой статьи прочитать о том,&nbsp;<a href=\\"https://teox.eu/educations/seo-chto-eto-takoe/\\">что такое seo</a>.</p>\\n\\n\\n\\n<p><strong>Перед тем, как начать, составим план:</strong></p>\\n\\n\\n\\n<ol><li>Понятие, что такое семантическое ядро</li><li>Инструменты работы с семантическим ядром</li><li>Первичный сбор ключевых слов</li><li>Структура ключевых слов</li><li>Расширение семантического ядра</li></ol>\\n\\n\\n\\n<h2>Что такое семантическое ядро?</h2>\\n\\n\\n\\n<p><strong>Семантическое ядро сайта</strong>&nbsp;— это набор поисковых слов, их морфологических форм и словосочетаний, которые наиболее точно характеризуют вид деятельности, товар или услугу, предлагаемые сайтом. Ключевые слова (поисковые запросы) для семантического ядра подбираются путём строгого анализа услуг или товаров компании, анализа статистики поисковой системы, статистики сайта, конкурентов на рынке и сезонности ключевых слов. Запросы в семантическом ядре должны максимально соответствовать представлениям посетителей о сайте.</p>\\n\\n\\n\\n<p><strong>ВАЖНО!</strong>&nbsp;Семантическое ядро сайта составляют те ключевые слова, которые уже обнаружила поисковая машина при сканировании сайта!</p>\\n\\n\\n\\n<p>То есть, если у вас есть сайт и вы хотите продвигать его по определенному ряду ключевых слов, то поисковая машина, должна видеть эти слова на вашем сайте. Соответственно, на этом этапе не важно, на какой странице в поисковой выдаче есть ваш сайт по этим ключевым словам, главное, чтобы он был хоть где-то.</p>\\n\\n\\n\\n<p>Существует ряд инструментов для работы с семантическим ядром, о некоторых мы поговорим ниже. Но перед тем, как выбрать инструмент, я рекомендую потратить время и «поиграться» с каждым существующим, чтобы понять, что подходит именно вам.</p>\\n\\n\\n\\n<h2>Инструменты работы с семантическим ядром</h2>\\n\\n\\n\\n<p>Описанные ниже инструменты не гарантированно станут решением ваших задач и целей. Ряд инструментов для работы с семантическим ядром является платным, а некоторые бесплатны. Я предлагаю вам выбрать один или несколько инструментов сбора ключевых слов, для работы параллельно прочтению этой статьи, выбирайте:</p>\\n\\n\\n\\n<h2><strong>Бесплатные инструменты&nbsp;сбора ключевых слов</strong></h2>\\n\\n\\n\\n<p><a href=\\"http://wordstat.yandex.ru/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">Яндекс Вордстат</a>&nbsp;— бесплатный инструмент для сбора ключевых фраз, аналитики и просмотра частотностей.</p>\\n\\n\\n\\n<p><a href=\\"http://wordstat.rambler.ru/wrds/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">Рамблер Вордстат</a>&nbsp;— аналогичный инструмент на подобие Яндекс Вордстат — позволяет просмотреть частотности поисковых запросов, отсортировать по регионам.</p>\\n\\n\\n\\n<p><a href=\\"https://adwords.google.com/select/KeywordToolExternal\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">Keyword Planner от Google</a>&nbsp;— инструмент от самой популярной поисковой системы. Имеет больше возможностей и пунктов проверки, чем его «собратья» из других поисковиков.</p>\\n\\n\\n\\n<p><a href=\\"https://google.com/trends/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">Тренды Google</a>&nbsp;— подходит для мониторинга трендов слов в месяц. Тут вы можете увидеть, что наиболее популярно сейчас.</p>\\n\\n\\n\\n<h2><strong>Сбор семантического ядра из аналитики</strong></h2>\\n\\n\\n\\n<p><a href=\\"https://google.com/analytics/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">Google Analytics</a>&nbsp;— не смотря на то, что&nbsp;Google Analytics скрывает информацию о ключевых запросах, вытащить оттуда интересную информацию можно, особенно если вы связали аналитику с панелью вебмастера.</p>\\n\\n\\n\\n<p><a href=\\"http://metrika.yandex.ru/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">Яндекс.Метрика</a>&nbsp;— аналитика от Яндекса, поможет собрать список ключей, по которым к вам уже приходят или приходили пользователи.</p>\\n\\n\\n\\n<p><a href=\\"https://liveinternet.ru/stat/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">LiveInternet</a>&nbsp;— поможет собрать большую часть данных по ключевым словам, особенно если вы совместили поиск релевантных ключей с системами аналитики Яндекса и Google.</p>\\n\\n\\n\\n<h2>Платные программы и сервисы для сбора семантического ядра</h2>\\n\\n\\n\\n<p>Рекомендую тщательно выбирать платный инструмент сбора ключевых слов. Как правило, каждый сервис или программа предлагаю «Демо» доступ к возможностям, чем вы вполне можете пользоваться, чтобы выявить наиболее полезный для вас инструмент.</p>\\n\\n\\n\\n<p>Программы готовых баз ключевых слов</p>\\n\\n\\n\\n<p><a href=\\"https://xseo.top/tools/bazyi-klyuchevyih-slov-pastuhova/\\">Базы Макса Пастухова</a>&nbsp;— крутые базы ключевых слов, которые можно эффективно использовать для собрания самого эффективного семантического ядра. Однако самая главная особенность — в большом количестве данных и необходимости их обработать. На мой взгляд, программа отлично подходит для собирания ключей, но есть проще программы для анализа. Я использую несколько программ для работы с семантикой, но это другая тема.</p>\\n\\n\\n\\n<p><a href=\\"https://xseo.top/tools/key-collector-programma-dlya-sostavleniya-semanticheskogo-yadra/\\">Key Collector</a>&nbsp;— пожалуй, самая функциональная программа на рынке для сбора, анализа и создания эффективного семантического ядра.</p>\\n\\n\\n\\n<p><a href=\\"https://yazzle.ru/seo/bc3bdb3fd1dc2e0074c0c125b894b234/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">CS Yazzle</a>&nbsp;— программа с множеством разных функций, которые позволяют очень многое, кроме удобного анализа семантического ядра, хотя эту программу позиционируют как инструмент для работы с ключами. Почитайте и попробуйте, все равно рекомендую вам ее приобрести.</p>\\n\\n\\n\\n<p><a href=\\"https://xseo.top/seo-faq/obzor-servisa-dlya-prodvizheniya-saytov-prodvigator-ua/\\">Serpstat.com</a>&nbsp;— онлайн сервис для работы с конкурентами, семантикой и многими другими факторами. Хотя этот сервис и является самым эффективным инструментом на рынке, но&nbsp;я бы рекомендовал формировать список в программе, предназначенной для этого, а вот анализировать только в «<a href=\\"https://xseo.top/tools/serpstat/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">Serpstat</a>.com».</p>\\n\\n\\n\\n<p><a href=\\"http://mutagen.ru/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">Мутаген</a>&nbsp;— база онлайн, где можно собрать весьма эффективный список ключевых слов для продвижения сайта.</p>\\n\\n\\n\\n<p><a href=\\"http://seomart.ru/baza-klyuchevyh-slov-up-base/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">UP Base</a>&nbsp; — основное преимущества этой программы — наличие англоязычной базы ключевых слов.</p>\\n\\n\\n\\n<p><strong>Специальные сервисы для создания семантического ядра</strong></p>\\n\\n\\n\\n<p><a href=\\"http://keywordtool.io/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">keywordtool.io</a>&nbsp;—&nbsp;<strong>бесплатный</strong>&nbsp;сервис для сбора семантического ядра.</p>\\n\\n\\n\\n<p><a href=\\"http://fastkeywords.biz/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">fastkeywords.biz</a>&nbsp;— условно бесплатный сервис для работы с семантическим ядром.</p>\\n\\n\\n\\n<p><a href=\\"https://wordtracker.com/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">wordtracker.com</a>&nbsp;— платный инструмент для работы с англоязычными списками ключевых слов.</p>\\n\\n\\n\\n<p><a href=\\"http://keywords.megaindex.ru/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">keywords.megaindex.ru</a>&nbsp;— бесплатный инструмент от сервиса «мегаиндекс», сам не пользуюсь, но говорят не очень удобный, зато бесплатный.</p>\\n\\n\\n\\n<h2>Программы для работы с большими ядрами</h2>\\n\\n\\n\\n<p><a href=\\"https://clevergizmos.com/keyword-organizer/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">Keyword Organizer</a>&nbsp;— платный инструмент для работы с семантическими ядрами, с возможностью сортировки.</p>\\n\\n\\n\\n<p><a href=\\"http://assistant.contentmonster.ru/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">Key Assistant</a>&nbsp;— инструмент для ручной сортировки ключевых слов, полезен, если вам лень разбираться в формулах xl.</p>\\n\\n\\n\\n<p><a href=\\"https://keysa.ru/?r=1679\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">Кейса&nbsp;</a>— отличный инструмент для создания иерархии ключевых слов, для организации и добавления собственных данных.</p>\\n\\n\\n\\n<h2>Первичный сбор ключевых слов</h2>\\n\\n\\n\\n<p>Теперь, когда вы выбрали для себя инструмент для сбора ключевых фраз, мы можем перейти непосредственно к работе и начать сбор семантического ядра.</p>\\n\\n\\n\\n<p>Для начала работы нам с вами нужна цель, давайте ее поставим и соберем, проанализируем и составим релевантное семантическое ядро. Пожалуй, я соберу семантику фраз для этой статьи, много не получится, но у вас появится отличный практический пример алгоритма работы.</p>\\n\\n\\n\\n<p>Пойдем простым путем и используем бесплатный инструмент от Яндекса.</p>\\n\\n\\n\\n<p>Мы можем уже составить релевантные фразы и увидеть частотности для того, чтобы двигаться дальше. Но мы забыли о геопривязке ключевых слов. В этом же инструменте есть набор функций:</p>\\n\\n\\n\\n<p>Если вы выставили фильтр и отсортировали ключевые слова по центральному региону России.</p>\\n\\n\\n\\n<p>Соответственно вы получаете совершенно другие цифры, которые соответствуют региональной привязке. То есть ключевой запрос «семантическое ядро» запрашивается пользователями в Яндексе 5253 раза в месяц.</p>\\n\\n\\n\\n<p>К слову, следует заметить, что эта цифра не стабильна, и если вы покопаетесь в инструментах, то сможете увидеть динамику запросов в течение месяцев.</p>\\n\\n\\n\\n<p><strong>Итак, у нас получился список ключей:</strong></p>\\n\\n\\n\\n<ol><li>семантическое ядро</li><li>семантическое ядро сайта</li><li>составление семантического ядра</li><li>сбор семантического ядра</li><li>как составить семантическое ядро</li></ol>\\n\\n\\n\\n<p>Дальше, если бы мы хотели собрать большое семантическое ядро, например про продающую страницу и сайт услуг по сбору семантики, мы могли бы воспользоваться программой готовых баз.</p>\\n\\n\\n\\n<p>Получаем несколько тысяч вариантов ключевых запросов</p>\\n\\n\\n\\n<p>Дальше можно поиграться с настройками и получить данные частотностей ключевых слов, отфильтровать и вытащить из этой базы самое полное семантическое ядро.</p>\\n\\n\\n\\n<p>Но у нас нет цели писать мануал по Базам Пастухова, поэтому двигаемся дальше.</p>\\n\\n\\n\\n<h2>Структура ключевых слов</h2>\\n\\n\\n\\n<p>Теперь, когда мы собрали больше чем 5 слов, нам нужно создать структуру данных. В задачи, которую я описал выше — сбор ключей для этой статьи, есть маленькое упущение — всего одна продвигаемая страница.</p>\\n\\n\\n\\n<p>Нам этого мало, поэтому мы рассмотрим другой пример для моего блога и структурируем семантическое ядро, используя программы для этого и обычную логику.</p>\\n\\n\\n\\n<p><strong>Структура данных</strong></p>\\n\\n\\n\\n<p>Для эффективного продвижения сайта нам нужно настроить структуру и разделить ключевые слова на группы. Я собрал 80 релевантных ключевых слов для продвижения некоторых статей, но прежде чем мы продолжим, давайте представим, что у нас есть сайт, на котором есть несколько страниц, под&nbsp;продвижение&nbsp;которых мы и собрали первичное семантическое ядро из 80 ключей.</p>\\n\\n\\n\\n<p>Я использовал сервис «<a href=\\"https://keysa.ru/?r=1679\\">Кейса</a>» для получения структуры данных. Немного времени и данные обрели структуру.</p>\\n\\n\\n\\n<p>Как вы понимаете, списки я создал в виде названий продвигаемых страниц. Внутри списков ключевые слова, которые буду использованы в продвижении этой страницы и для&nbsp;внутренней перелинковки.</p>\\n\\n\\n\\n<p>Далее мы формируем стратегию продвижения страниц. С помощью структурирования данных в группы ключевых слов под конкретные страницы, вы можете создавать саму стратегию или тактику продвижения.</p>\\n\\n\\n\\n<p>Это поможет как при настройке рекламных кампаний, так и для постановки тех. заданий для&nbsp;seo. Надеюсь, вам понятна логика структурирования данных. Если нет, задавайте вопросы в комментариях, я с удовольствием дополню.</p>\\n\\n\\n\\n<h2>Расширение семантического ядра</h2>\\n\\n\\n\\n<p>Что ж, возможно вам понадобится расширить семантическое ядро. Я обычно использую два метода:</p>\\n\\n\\n\\n<ul><li>Сбор похожих фраз</li><li>Сбор фраз из анализа конкурентов</li></ul>\\n\\n\\n\\n<p>Рассмотрим оба варианта.</p>\\n\\n\\n\\n<p><strong>#1 Расширение семантического ядра&nbsp;</strong></p>\\n\\n\\n\\n<p>Что такое «похожие фразы» в контексте рассмотрения темы семантического ядра?</p>\\n\\n\\n\\n<p>Как вариант, вы можете посмотреть ключевые слова, которые чаще всего употребляли с искомым вами запросом. И собрать более расширенное ядро для своего продвижения.</p>\\n\\n\\n\\n<p>Но наиболее эффективным будет использовать одну из упомянутых выше программ. Например, сервис «мутаген».</p>\\n\\n\\n\\n<p>То есть, сбор подсказок — это те слова, которые наиболее часты и популярны после того, как пользователь вводил искомый вами вопрос.</p>\\n\\n\\n\\n<p>Например, если человек вводит запрос «семантическое ядро», то возможно (скорее всего) он введет после этого более уточняющий запрос, например: «семантическое ядро как составить».</p>\\n\\n\\n\\n<blockquote class=\\"wp-block-quote\\"><p>Да, к слову, запятые и другие элементы знаков препинания не ранжируются поисковиками, так что не имеет значение, как вы вводите запрос, используете запятые или нет.</p></blockquote>\\n\\n\\n\\n<p>Второй вариант поиска подсказок, который я использую:&nbsp;Serpstat.com</p>\\n\\n\\n\\n<p>Вы вводите поисковой запрос и в разделе «поисковые запросы», получаете данные. Плюс этого сервиса в том, что вы видите популярность слова в поисковых системах.</p>\\n\\n\\n\\n<p>Но если вы перейдете на вкладку «похожие фразы», получите более подробный и целевой список.</p>\\n\\n\\n\\n<p>Все довольно просто и интуитивно понятно.</p>\\n\\n\\n\\n<p><strong>#2 Расширение семантического ядра — анализ конкурентов</strong></p>\\n\\n\\n\\n<p>Давайте рассмотрим еще один вариант сбора ключевых фраз из списка, по которому продвигаются ваши конкуренты. Самым лучшим сервисом для сбора этих данных, является&nbsp;<a href=\\"https://prodvigator.ru/?ref=557\\">Serpstat.com</a>.</p>\\n\\n\\n\\n<p>Для этого вводим запрос в поисковую форму и выбираем вкладку «страницы».</p>\\n\\n\\n\\n<p>Вы получаете список url страниц, которые наиболее популярны в поиске по этому запросу. Так же в графе «потенциальный трафик» вы найдете ни что иное, как тот самый потенциальный трафик.</p>\\n\\n\\n\\n<p>Далее: выбираем понравившийся нам url и кликаем по нему, попадая на страницу результатов, которые анализируем по пунктам:</p>\\n\\n\\n\\n<ul><li>позиции конкурентов</li><li>видимость в поисковой выдаче</li><li>ключевые слова и частотности</li></ul>\\n\\n\\n\\n<p>Подобные данные можно использовать для создания контента на своем сайте, наборе ссылочной массы и прочего. Надеюсь, опыт вам подскажет, а если нет, я обязательно еще напишу об этом.</p>\\n\\n\\n\\n<p><strong>Вывод</strong></p>\\n\\n\\n\\n<p><strong>Семантическое ядро</strong>, является одним из важнейших элементов плана по&nbsp;<a href=\\"https://teox.eu/lifehack/s-chego-nachat-seo/\\">продвижению сайта</a>. Создавая стратегию и тактику на любом этапе, вы прибегаете к полученным данным в семантическом ядре. Поэтому рекомендую уделять большое внимание этому этапу, чтобы не упустить на самом старте продвижения сайта важный элемент — эффективное семантическое ядро.</p>\\n\\n\\n\\n<p>На этом на сегодня все. Если у вас остались вопросы, задавайте их в комментариях.</p>\\n","slug":"instrumenty-dlya-sozdaniya-effektivnogo-semanticheskogo-yadra","title":"Инструменты для создания эффективного семантического ядра","author":{"node":{"name":"Andrew Roldugin","description":"Напишите немного о себе. Эта информация может отображаться на сайте."}},"categories":{"nodes":[{"name":"Инструменты","slug":"tools","icat":{"caticon":{"localFile":{"childImageSharp":{"fluid":{"base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAOxAAADsQH1g+1JAAAFZUlEQVQ4yy2TWWxUZRTHzxCivmmiTz75qA8ugUB8QI2KL8aFoKJoVHgQUYyCS4yKJkYTI0Sg0CKWsolAoaWdTqfQdgamdJm209JtZtpM29nvzNxl7jZ32pm7fOeYW304yZd8+X75zvn9D8hVAmWt0KOt4No5LSKUDQLJwFfFCilCBS1eJ7OoYb6g4ROSgZCUETIKwpKEnqTMwK3lMgJkJQsKsr2uWieo2WvgnXKVHpAMAqGCnwgVJF4np6gjFjQkTmXP5VQGWQUfySi4PS0jEBHEi5ZnOlcHKCqOh5NtqFu0XjawUzaIJAP9UoXeESoU5XWiooasoCHjVEY5hYWyCnsro+BUWmaUkllDYFaF8dQqRAsWwK+XFwEebgTZQK9SXYOZkkHE60g5BWlRYhgXGC2IjvsYOQ3pfxClZLSXy4xmOfOIZBJUkDzQO1l264PpZJVE/T9YXkVnlmd225LFDk+Z9MOoid8PmXh41KSehO2kFbRTMmPLZcSpbJ11T8p0+Q7/9MVQCdb6vz7MP+gbE/vSokVFnZxRzsHDs3XcN1KnfQM1tj9QtT+/uWLv8tbwvWs1OjJo4nKZYUYjNpyo0rlA4exgonbvKpEH6g5BSrCAk513iyrSHM9sF/bpSJ0OBlV2rIejlv4CXRrg6cKwQt/6V9i2s3U61F/DvMrYgshoKm9tjGTqkDIIQDLoVUHHT8UKRfMqUtuixfb9DzvZlaZz/ZzYOsgf6Rwr/xWcUVYG4jp93VFjrzWt0umgzJKyQ/MS3por2XtjAnsWxAoqgo5rEhISQ3dmbpvuz871c/LViPJoS28e/JEyBGLVrdHciuOdrtG2Jgv3Nov0z20OYzyjmMBotuTEQTTIFCrkuNFwbboC3Jm5bV4Z5BvP9OWhpY+7JzCjrl8WVmGRtwKxgk07mkxn90kND11dpNZh0YkKzJkTWB0SRdNa4q21nLnRcG26AtyZdY5JZ/0TZbgd1dbrK+hxBRY0NrRQYrT9qOnsbtSw5WaWTvdxzDsh40iqtgq+ManUHZEoKdqUUREPh03a5a2jKyA4q9T65ipbk5K1loaForNbryP5phx8/mcTvzmn0NXBAl68w1PzzTz9HSpNwYUgt+G4N/3SIm8PFHQkX9xytrdU6cA1gw3EKxTjataSYPmLOrulm0SJEtL7Dav44kGD/rohON6ISNfC0pWGztQLf/bkHoPXD45AOGFAXsM33Q3IqGj/3KHiloM52nNKYNfCFZrL2xTnHGofWcG3f+Nx4z6OvjvD441JifnuqtQfNZ5qG5Vg50/D/wU7wdvuok+565RWkLmh/f58BjfsGaNNe8fxuS8mnGc+iziPfziKmz6aoG9OJfHGhIT+KZUF4gaNpOo3RzPm/S4L5osmzBetN6KcSVHOtGbyJsZLNssozGn0ptiOH4fo5QMBfOWrIH58KEJN3pTTMyE53ojM/NMau7VQpaFkjcay5pPjWRNgIKZ5xhYNGJyvnAjFdArFdcc/KVMwqtN4ctVdK/yjfZmab+To0kARrwzydCFUcgVQZ0TGnhmN+qKV/cH5KvTHjHUQmNMgvLQCQwsGdE/IDRdDJWrqzp5vD0ub20elUFtYpJP+LDvelWYne3JuRFrP9hc2NXjToTOBAl0fL3/ZM6PD+VsluD5WBgjFdeidVjzNvXkIzGrQ6MtsaezK3Hc+WIDm3vxnzb15Ot2bt4/7MuxEV8aFuzah0Zd96HhXenPriASTJYSO8TL0zGgAfTMqdI1L4J+UIZyoehq8aWgdFj2/XEpAY3f2xQZvOnfkegqPdqTYsc5U9IQv85h793vrMhztSEH7uLzOf1eFtrAE3XdV+Bcv29xFEX6khwAAAABJRU5ErkJggg==","aspectRatio":1,"src":"/static/335240251b6dc03a51a4cb7afc76fb4a/62915/settings-1.png","srcSet":"/static/335240251b6dc03a51a4cb7afc76fb4a/62915/settings-1.png 128w","sizes":"(max-width: 128px) 100vw, 128px"}}}}}},{"name":"Работа","slug":"works","icat":{"caticon":{"localFile":{"childImageSharp":{"fluid":{"base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAOxAAADsQH1g+1JAAAFgklEQVQ4yy2T7VOTZxbGb+xsZz/sh/4B/S90d6dCMSgIIoEibxIhyYoSQUoChFLxpVWWAYGxYoOVgbGVBIRWbFUUK7NYQpEXB5lduzuopRB5qYAQEshz7vAk5+o8mf1w5nz7zXXOdV2i8imJyqdSVD6lqOZNFvZxEhVj9H7FKFWXj8ghm5uWbW4ZKh2U6skBWih+KH+09FFJ4V16r6CXxD96KMp8k4S5WwpTF4n/w+SOqmdSWN0BDVhlH5e+irEgbMMEmzuI4odbKH4YwMlHEiceEE7cD+L4D3KxoJdM5m4SR7/TYDLK6JIioqxqkkT1v+lP9gm6VzkhYRtWYOnb2LYOyVDJgMIptdOc1jjDRf3BcOFdUo2uDfXYbULBLQlzNzmMTik0mKlTCtH4dluUjZDQYPYJCetPSjDn2nLY3LmG8pFtNrq8nFI7HxlTp59P3A9yxpUVpF9aDZlvkmq+KZHvpMv5ThL5TtqhgbT51D4uYR2iYH6Hn3NafTjeT1z0SHJu+yayW/zIdvhhaNtE4R3J+U6F9XUbSL/k53ynDOXdkDBcpwzDdRLCPiHfrxgjf/mIROEdCpu7CZYfiBvHJE4PEgq+I+R1EbJvEA53EMzfEsw3CVkOhfX1fg0aOvK1RG6bnM5soXdFxM0nEqWDtH2yn2B5JLlpPAjvJmPZx5heCWFwRoVrahv1jyUsvUGYuiSMLoncduJDX/iQ/VUgdLhVIvsqZYpINIYJmgFl7iBb+gN8amALy37GRgDwBQC/AngDwJI3hJreJWS2byHv6wAM1xU+8s0257SSmnWVkOmQ14VtmJatQxIlA8SmznVObZiDof0NXr5l+LYYb3yMBS9jfoPR9mAeCeVPoK/3IPnCa+yreoXUi6ucfVWGMx0SGc30H2EdotDH/5Iwdm5xzjUfH77mh8EVwOMZNaJMg82thbHoB3rcq9DZnyPp/CwSzywgrmIWsaXTHH9qljOaCemX5Lb4WGvAo0im2NQl2eSSyHERnM+2I2dqyjTYi5UwXvuBb8e3kNqwgoTTi9DZXiK29DknVM9x+hcSaY2kiJIBuVD8o0TRAwofu01s7iTkugh1j2XkZ239C+gZfhuBTS2qeLnO6HiiIOncIhKqPdDXrfGhy8FQWpNE6kWaEFo3ix4QLPdILbxLfPx7Yi0ampuaAfvtY4ir/AU945t4sc4YnZO4Mfg7MhpWkdkS5owrIU5rUFT9RYmUOnKIE/dliaWPUNCrVYpg6iLWcqZFQ3NTXzcX+Zl25o0RJQLLaVhC0oU1HPhsgffYpji5Zj2krwsiuUbZLyz36D2t6Me+lzjyjQxltRCyWhQ2OgnGDomPmjYi58WfXohsTZkGiyl+yjuP3EGsdUrV16tIrqHR7CthIczdijB3k8nYqSC/Q1GzHAFOa9pE9rUA57QqfOD8CvZVebDH9gIJpzw4dDnEiWfneWfeXcScHA8frCUcOK8g6XMlJulzEuJw21pUbrtXZDm8X2U0r+HQ5XU1td4b0tev46MmLydfWOa4ilcca33OieeW+OA/ffxhyaSmUE086+WE6nXEn1qvSDizIfaf3XhHpF9aiTp4wS+yvnwrkms8jsRzvyLxrDaz6v4zs2rC6dmwrux/2GP7heOrZsN7K39TdWXTIS2DurIZ6Mo99n1Vb0T8md+jdNYFITKaV0Va41JUjPWVSD7vEXH2qZzY0tFfY4qHEV3kRnSRtkc4umgEuy1ufFDoxu7Cn7HbMjoZXfxMp7PNiPhP56PiKhbFvk9WhEhrfCMO1nqEvn5epNR6dujKJ8Xfjt7589+P9hl2GW87d+Xf+m2noRs7DT28K+/Wf3fl3W79q6kvRfzlXRFdNCl0ZTPv7P1kRejKX4u9lcviD6mXQzEzhKhAAAAAAElFTkSuQmCC","aspectRatio":1,"src":"/static/1b54e7231a52b0e750aebf3cb04315fa/62915/browser.png","srcSet":"/static/1b54e7231a52b0e750aebf3cb04315fa/62915/browser.png 128w","sizes":"(max-width: 128px) 100vw, 128px"}}}}}}]}},{"date":"July 4, 2022","id":"cG9zdDo1OA==","excerpt":"<p>Сегодня я собрал для вас отличные варианты для анализа сайта, в основном это бесплатные программы и сервисы. Специальные сервисы для анализа сайтов онлайн SEO-сервисы, которые позволяют не только проводить&nbsp;анализ сайта&nbsp;онлайн, но и отслеживать динамику изменений и анализировать конкурентов. Использовать сервисы можно для SEO-анализа сайтов, сбора данных по позициям и сбора ключевых слов. Serpstat&nbsp;—&nbsp;(частично бесплатный)&nbsp;большой инструмент [&hellip;]</p>\\n","content":"\\n<p>Сегодня я собрал для вас отличные варианты для анализа сайта, в основном это бесплатные программы и сервисы.</p>\\n\\n\\n\\n<h2>Специальные сервисы для анализа сайтов онлайн</h2>\\n\\n\\n\\n<p>SEO-сервисы, которые позволяют не только проводить&nbsp;анализ сайта&nbsp;онлайн, но и отслеживать динамику изменений и анализировать конкурентов. Использовать сервисы можно для SEO-анализа сайтов, сбора данных по позициям и сбора ключевых слов.</p>\\n\\n\\n\\n<p><a href=\\"https://serpstat.com/?ref=557\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">Serpstat</a>&nbsp;—&nbsp;(частично бесплатный)&nbsp;большой инструмент для анализа сайта, сбора позиций и отслеживания конкурентов. Также позволяет собрать семантическое ядро. Инструмент уникален на рынке и многофункционален.&nbsp;<strong>Очень рекомендую.</strong></p>\\n\\n\\n\\n<p><a rel=\\"noreferrer noopener\\" href=\\"https://topvisor.ru/?inv=24705\\" target=\\"_blank\\">Topvisor</a>&nbsp;—&nbsp;(частично бесплатный)&nbsp;— менее подходит для детального&nbsp;seo&nbsp;анализа, но вполне удобен для работы с семантикой и анализом ядра. Хороший инструмент кластеризации и отслеживания позиций.</p>\\n\\n\\n\\n<h2>Узнать позиции сайтов</h2>\\n\\n\\n\\n<p><a href=\\"http://allpositions.ru/redirect/42148\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">AllPositions</a>&nbsp;(частично бесплатный)- сервис для сбора данных по позициям сайта. Сервис быстр и отлично работает в параллельной проверки нескольких проектов. После регистрации у вас будет&nbsp;<strong>1000 подарочных рублей</strong>, чтобы опробовать работу анализа проверки позиций.</p>\\n\\n\\n\\n<p><a href=\\"http://seolib.ru/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">Seolib</a>&nbsp;(частично бесплатный)&nbsp;— отличный сервис для анализа сайта, проверки позиций с отличной скоростью обработки данных. При регистрации пользователь получает&nbsp;<strong>500 рублей</strong>&nbsp;для тестирования сервиса, для проверки позиций. Этот сервис гораздо сложнее и функциональнее предыдущего.</p>\\n\\n\\n\\n<p><a href=\\"http://seobudget.ru/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">Seobudget</a>&nbsp;(частично бесплатный)&nbsp;— набор полезных инструментов для&nbsp;<a href=\\"https://teox.eu/educations/seo-chto-eto-takoe/\\">seo-оптимизации</a>&nbsp;сайтов.</p>\\n\\n\\n\\n<p><a href=\\"https://semonitor.ru/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">Semonitor</a>&nbsp;(платный)&nbsp;— набор программ для оптимизаторов, включающий в себя программу сбора позиций.&nbsp;<a href=\\"https://isoft.su/charge/seo-charge/semonitor/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">Купить программу со скидкой</a>&nbsp;→</p>\\n\\n\\n\\n<p><a href=\\"https://seorate.ru/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">Seorate</a>&nbsp;(платный)&nbsp;— интересный сервис для анализа сайта онлайн.</p>\\n\\n\\n\\n<p><a href=\\"http://serpparser.ru/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">Serpparser</a>&nbsp;(платный)— скачиваемая программа для проверки и анализа позиций сайта.&nbsp;<strong>Первые две недели доступен полный функционал</strong>. Программа дает достаточно емкие и информативные отчеты.</p>\\n\\n\\n\\n<h2>Анализ конкурентов</h2>\\n\\n\\n\\n<p><a rel=\\"noreferrer noopener\\" href=\\"https://serpstat.com/?ref=557\\" target=\\"_blank\\">Prodvigator</a>&nbsp;(в настоящее время называется&nbsp;<a href=\\"https://serpstat.com/?ref=557\\">Serpstat</a>)(частично бесплатный)&nbsp;— пожалуй, лучший на сегодняшний момент вариант для анализа конкурентов онлайн. Быстрый и надежный сервис, который даст не только подробную информацию о продвижении конкурентов, но и составит отчет по вашим позициям сайта. Поможет качественно провести анализ сайта онлайн. Я написал подробный&nbsp;обзор сервиса Serpstat.</p>\\n\\n\\n\\n<p><a href=\\"https://alexa.com/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">Аlexa</a>&nbsp;(бесплатный)&nbsp; — англоязычный сервис для анализа сайта. Позволяет анализировать трафик и другие показатели продвижения конкурентов.</p>\\n\\n\\n\\n<p><a href=\\"https://www.semrush.com/\\">Semrush</a>&nbsp;(платный)&nbsp;— еще один сервис для анализа конкурентов в англоязычном и русскоязычном сегменте. Может проанализировать контекстную рекламу и показать, по каким ключевым словам продвигается сайт.</p>\\n\\n\\n\\n<p><a href=\\"https://netpeaksoftware.com/ru/ucp?invite=1564567f\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">Netpeak Checker</a>&nbsp;— это мультифункциональный инструмент для массового анализа и сравнения сайтов по основным SEO-параметрам. (по промокоду&nbsp;<strong>1564567f</strong>&nbsp;— действует скидка 10% ).</p>\\n\\n\\n\\n<ul><li>Проверять 1200+ параметров URL</li><li>Анализировать ссылочный профиль любого сайта</li><li>Проводить комплексную оценку конкурентов</li><li>Сравнивать списки URL по показателям самых известных сервисов: Ahrefs, Moz,&nbsp;<a href=\\"https://xseo.top/tools/serpstat/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">Serpstat</a>, Majestic, SEMrush и др.</li><li>Определять on-page параметры для улучшения внутренней оптимизации сайта</li><li>Отслеживать возраст доменов, срок истечения и доступность для покупки</li><li>Оценивать социальную активность на сайте</li><li>Использовать списки прокси и антикапча-сервисы при работе с большими объёмами URL</li><li>Сохранять и экспортировать полученные данные для последующей работы</li></ul>\\n\\n\\n\\n<h2>Технические анализ сайта онлайн</h2>\\n\\n\\n\\n<p><a href=\\"http://pr-cy.ru/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">PR-CY</a>&nbsp;(бесплатный) — наилучший&nbsp;бесплатный инструмент&nbsp;для технического анализа сайта. PR-CY&nbsp;— имеет множество разных бесплатных инструментов для достаточно масштабной проверки сайтов онлайн.</p>\\n\\n\\n\\n<p><a href=\\"http://netpeak.ua/software/netpeak-checker/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">Определяйка</a>&nbsp;(бесплатный) — еще один инструмент от разработчиков prodvigator.ru. Проводит очень обширный анализ сайтов, сравнивает параметры, предлагает улучшения.</p>\\n\\n\\n\\n<p><a href=\\"https://site-auditor.ru/\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">Site-Auditor</a>&nbsp;(бесплатный)&nbsp;— приложение для быстрого анализа сайтов. Быстро развивается и добавляет новые полезные функции.</p>\\n\\n\\n\\n<p><a href=\\"https://netpeaksoftware.com/ru/ucp?invite=1564567f\\" target=\\"_blank\\" rel=\\"noreferrer noopener\\">Netpeak Spider</a>&nbsp;— десктопный инструмент для проведения комплексного аудита внутренней оптимизации всего сайта. (по промокоду&nbsp;<strong>1564567f</strong>&nbsp;— действует скидка 10% ).</p>\\n\\n\\n\\n<ul><li>Анализ входящих и исходящих внутренних ссылок.</li><li>Проверьте 50+ ключевых параметров SEO для поисковых URL.</li><li>Spot 60+ вопросов оптимизации вашего сайта.</li><li>Найти неработающие ссылки и перенаправления.</li><li>Избежать дублирования контента: страницы, заголовки, метаописания, заголовки H1 и т. д.</li><li>Рассмотреть инструкции по индексированию (Robots.txt, Meta Robots, X-Robots-Tag, Canonical).</li><li>Вычислить внутренний PageRank для улучшения структуры ссылок на сайт и т. д.</li></ul>\\n\\n\\n\\n<h2>Анализ внутренней оптимизации сайта</h2>\\n\\n\\n\\n<p><a href=\\"http://home.snafu.de/tilman/xenulink/\\">Xenu Link Sleuth</a>&nbsp;(бесплатный) — отличный инструмент для анализа внутренних страниц сайта с возможностью упорядочивания и структурирования полученных данных.</p>\\n\\n\\n\\n<p><a href=\\"https://page-weight.ru/soft/page-weight/\\">PageWeight</a>&nbsp;(частично&nbsp;бесплатный) — сервис для анализа внутренней перелинковки. Очень полезен при анализе сайта, так как внутренняя перелинковка очень влияет на ранжирование страниц в поиске.</p>\\n\\n\\n\\n<h2>Анализ внешних ссылок на сайт</h2>\\n\\n\\n\\n<p><a href=\\"https://ahrefs.com/\\">Ahrefs</a>&nbsp;(платный)&nbsp;— сервис для анализа внешних ссылок сайта. Достаточно подробный отчет с возможностью упорядочивания информации.</p>\\n\\n\\n\\n<p><a href=\\"https://opensiteexplorer.org/\\">Open Site Explorer</a>&nbsp;(платный)&nbsp;— с этим инструментом этап анализа внешних ссылок перестает иметь туманный занавес непознанности. Все просто и понятно, особенно вес и качество обратных ссылок.</p>\\n\\n\\n\\n<p><a href=\\"https://www.majesticseo.com/\\">MajesticSEO</a>&nbsp;(платный)&nbsp;— еще один вариант проверки ссылок на сайт. Тут добавляется возможность просмотра истории ссылок.</p>\\n","slug":"kak-sdelat-krutoj-analiz-sajta-sbor-proverennyh-instrumentov","title":"Как сделать крутой анализ сайта — сбор проверенных инструментов","author":{"node":{"name":"Andrew Roldugin","description":"Напишите немного о себе. Эта информация может отображаться на сайте."}},"categories":{"nodes":[{"name":"Инструменты","slug":"tools","icat":{"caticon":{"localFile":{"childImageSharp":{"fluid":{"base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAOxAAADsQH1g+1JAAAFZUlEQVQ4yy2TWWxUZRTHzxCivmmiTz75qA8ugUB8QI2KL8aFoKJoVHgQUYyCS4yKJkYTI0Sg0CKWsolAoaWdTqfQdgamdJm209JtZtpM29nvzNxl7jZ32pm7fOeYW304yZd8+X75zvn9D8hVAmWt0KOt4No5LSKUDQLJwFfFCilCBS1eJ7OoYb6g4ROSgZCUETIKwpKEnqTMwK3lMgJkJQsKsr2uWieo2WvgnXKVHpAMAqGCnwgVJF4np6gjFjQkTmXP5VQGWQUfySi4PS0jEBHEi5ZnOlcHKCqOh5NtqFu0XjawUzaIJAP9UoXeESoU5XWiooasoCHjVEY5hYWyCnsro+BUWmaUkllDYFaF8dQqRAsWwK+XFwEebgTZQK9SXYOZkkHE60g5BWlRYhgXGC2IjvsYOQ3pfxClZLSXy4xmOfOIZBJUkDzQO1l264PpZJVE/T9YXkVnlmd225LFDk+Z9MOoid8PmXh41KSehO2kFbRTMmPLZcSpbJ11T8p0+Q7/9MVQCdb6vz7MP+gbE/vSokVFnZxRzsHDs3XcN1KnfQM1tj9QtT+/uWLv8tbwvWs1OjJo4nKZYUYjNpyo0rlA4exgonbvKpEH6g5BSrCAk513iyrSHM9sF/bpSJ0OBlV2rIejlv4CXRrg6cKwQt/6V9i2s3U61F/DvMrYgshoKm9tjGTqkDIIQDLoVUHHT8UKRfMqUtuixfb9DzvZlaZz/ZzYOsgf6Rwr/xWcUVYG4jp93VFjrzWt0umgzJKyQ/MS3por2XtjAnsWxAoqgo5rEhISQ3dmbpvuz871c/LViPJoS28e/JEyBGLVrdHciuOdrtG2Jgv3Nov0z20OYzyjmMBotuTEQTTIFCrkuNFwbboC3Jm5bV4Z5BvP9OWhpY+7JzCjrl8WVmGRtwKxgk07mkxn90kND11dpNZh0YkKzJkTWB0SRdNa4q21nLnRcG26AtyZdY5JZ/0TZbgd1dbrK+hxBRY0NrRQYrT9qOnsbtSw5WaWTvdxzDsh40iqtgq+ManUHZEoKdqUUREPh03a5a2jKyA4q9T65ipbk5K1loaForNbryP5phx8/mcTvzmn0NXBAl68w1PzzTz9HSpNwYUgt+G4N/3SIm8PFHQkX9xytrdU6cA1gw3EKxTjataSYPmLOrulm0SJEtL7Dav44kGD/rohON6ISNfC0pWGztQLf/bkHoPXD45AOGFAXsM33Q3IqGj/3KHiloM52nNKYNfCFZrL2xTnHGofWcG3f+Nx4z6OvjvD441JifnuqtQfNZ5qG5Vg50/D/wU7wdvuok+565RWkLmh/f58BjfsGaNNe8fxuS8mnGc+iziPfziKmz6aoG9OJfHGhIT+KZUF4gaNpOo3RzPm/S4L5osmzBetN6KcSVHOtGbyJsZLNssozGn0ptiOH4fo5QMBfOWrIH58KEJN3pTTMyE53ojM/NMau7VQpaFkjcay5pPjWRNgIKZ5xhYNGJyvnAjFdArFdcc/KVMwqtN4ctVdK/yjfZmab+To0kARrwzydCFUcgVQZ0TGnhmN+qKV/cH5KvTHjHUQmNMgvLQCQwsGdE/IDRdDJWrqzp5vD0ub20elUFtYpJP+LDvelWYne3JuRFrP9hc2NXjToTOBAl0fL3/ZM6PD+VsluD5WBgjFdeidVjzNvXkIzGrQ6MtsaezK3Hc+WIDm3vxnzb15Ot2bt4/7MuxEV8aFuzah0Zd96HhXenPriASTJYSO8TL0zGgAfTMqdI1L4J+UIZyoehq8aWgdFj2/XEpAY3f2xQZvOnfkegqPdqTYsc5U9IQv85h793vrMhztSEH7uLzOf1eFtrAE3XdV+Bcv29xFEX6khwAAAABJRU5ErkJggg==","aspectRatio":1,"src":"/static/335240251b6dc03a51a4cb7afc76fb4a/62915/settings-1.png","srcSet":"/static/335240251b6dc03a51a4cb7afc76fb4a/62915/settings-1.png 128w","sizes":"(max-width: 128px) 100vw, 128px"}}}}}}]}},{"date":"June 24, 2022","id":"cG9zdDoxNQ==","excerpt":"<p>Вы точно думали, куда бы пойти поучиться, чтобы получить востребованную профессию в Израиле. </p>\\n","content":"\\n<p>Вы точно думали, куда бы пойти поучиться, чтобы получить востребованную профессию в Израиле.&nbsp;Обучение в Израиле&nbsp;доступно каждому, не зависимо от возраста, пола и самоидентификации. То есть не важно, кто вы – важно кем вы можете стать. Уровень безработицы в Израиле низок, но при этом большой спрос имеют только некоторые вакансии. Я опишу 5 самых востребованных профессий в Израиле.&nbsp;<a href=\\"https://teox.eu/travel/10-mest-v-israel/\\">Израиль</a>&nbsp;— это страна, где ежегодно запускается масса стартапов, идет приток новых репатриантов, а интернет-рынок все больше и сильнее. Однако мы все же несколько отстаем от большинства, более продвинутых в электронной коммерции, стран. Но это настолько стремительно меняется, нужно не упустить свой шанс стать специалистом и получить идеальное место работы в Израиле.</p>\\n\\n\\n\\n<h2>Самые популярные и оплачиваемые профессии в Израиле</h2>\\n\\n\\n\\n<p>Давайте рассмотрим самые популярные направления, связанные с работой в Интернете. Речь пойдет о курсах, за которые нужно заплатить (будет указана стоимость), так же и о курсах от Министерства Абсорбций. Обзор подготовлен и составлен из информации, размещенной в интернете разными колледжами, университетами и частными лицами.</p>\\n\\n\\n\\n<p>В некоторых местах вы найдете ссылку на обучающие программы, связанные с профессией. Но также вы можете задать любой вопрос в комментариях к этому посту. Мое сотрудничество с колледжем в Тель Авиве позволит дать достаточный ответ, связанный с обучением и трудоустройством на стажировку в Израиле.</p>\\n\\n\\n\\n<h2>#1 Программист в Израиле</h2>\\n\\n\\n\\n<p>Мы знаем, что программист это сложная профессия, но и высокооплачиваемая. Учиться на&nbsp;курсах программиста&nbsp;нужно долго, проходя уровни, которые оцениваются опытом работы.</p>\\n\\n\\n\\n<p>Но начать работать можно уже через 6-10 месяцев обучения, что достаточно для получения минимальной оплаты, в идеале это 1 год полноценного&nbsp;обучения программированию&nbsp;и практики на программах стажировки.</p>\\n\\n\\n\\n<p>Поэтому эта профессия забирает первое место в рейтинге «востребованные профессии в Израиле».</p>\\n\\n\\n\\n<blockquote class=\\"wp-block-quote\\"><p><strong>Специализация</strong></p><p>Разработка под Java, PHP — WEB, приложения, сервисы. То есть специалист, который способен разрабатывать сайты, сервисы и мобильные приложения.</p><p><strong>Продолжительность обучения</strong></p><p>Начальный уровень требует от 80 часов обучения, что примерно составляет пол года.</p><p><strong>Минимальная зарплата</strong></p><p>4000 — 35 000 зарплата. Все зависит от конкуренции на место (конкуренция велика) и сложности проекта, который нужно разрабатывать.</p><p><strong>Стоимость обучения</strong></p><p>от 8000 — 15 000 за пол года/год. Есть и бесплатные курс, которые можно пройти, но как показывает опыт — бесплатные курсы дают основу и не дают практику. Так что приготовьтесь оплатить полгода обучения непосредственно практическим навыкам.</p></blockquote>\\n\\n\\n\\n<h2>#2 Интернет — Маркетолог</h2>\\n\\n\\n\\n<p>Человек, занимающийся планированием и развитием проекта. Профессия, набирающая популярность в стране, где каждый год запускается бесконечное количество StartUp-ов. Например,&nbsp;курсы SEO&nbsp;или&nbsp;курсы Интернет-Маркетинга, вполне становятся популярными.</p>\\n\\n\\n\\n<p>Одна из наиболее сложных профессий в целом. В отличие от программирования, тут мало знаний алгоритмов работы, нужно постоянно быть в курсе событий на рынке, отслеживать изменения и делать правильные выводы. Строить свои собственные стратегии и учиться жонглировать инструментами интернет-маркетинга, подобно цирковому жонглеру.</p>\\n\\n\\n\\n<p>Эта работа точно понравится тем, кто разбирается в политике или любит интриги и игры с большим количеством ходов, которые приносят не только популярность, но и власть над тем, что происходит в нише.</p>\\n\\n\\n\\n<blockquote class=\\"wp-block-quote\\"><p><strong>Специализация</strong></p><p>Интернет-Маркетинг, Поисковое&nbsp;<a href=\\"https://teox.eu/lifehack/s-chego-nachat-seo/\\">продвижение</a>, Продвижение в социальных сетях. (понятно, что в эту профессию входит и email-рассылка и контент-маркетинг и прочие инструменты одного механизма).</p><p><strong>Продолжительность обучения</strong></p><p>От 40 часов обучения, что примерно равно 3 месяца.</p><p><strong>Минимальная зарплата</strong>&nbsp;4000 — 25000 зарплата. Новичкам платят меньше, но в отличии от программирования, где опытом изучается язык, в маркетинге развитие происходит значительно быстрее. Достигнуть зарплаты в 25 000 шекелей реально, но очень сложно!</p><p><strong>Стоимость обучения</strong>&nbsp;от 2000 за 3 месяца. Бесплатных курсов нет, есть масса платных с разным профилем и программами. В основном на иврите или английском. На русском языке стоимость варьируется от 1000 — 8000 за курс (4-12 месяцев). Важно понимать, что дешевле выучиться в зарубежных онлайн-школах, но что более важно — вы не получаете навыки маркетинга в Израиле, если учитесь, например, в РФ.</p></blockquote>\\n\\n\\n\\n<h2>#3 Тестирование компьютерных программ (QA)</h2>\\n\\n\\n\\n<p>Профессия, набирающая популярность в Израиле. Тестирование программ — это рутинная работа и очень ответственная, поэтому и оплачивается на ряду с программированием. Последние годы эта профессия становится все более востребованной и высокооплачиваемой.</p>\\n\\n\\n\\n<p>Если вы обладаете усидчивостью и способны работать в процессах тестирования, вполне можете попробовать себя в этой специальности. По сложности весьма схоже с программированием, а в некоторых местах даже более оплачиваема.</p>\\n\\n\\n\\n<blockquote class=\\"wp-block-quote\\"><p><strong>Специализация</strong></p><p>Функциональное тестирование (functional testing), тестирование производительности (performance testing), нагрузочное тестирование (load testing), стресс-тестирование (stress testing), тестирование стабильности (stability / endurance / soak testing), юзабилити-тестирование (usability testing), тестирование интерфейса пользователя (UI testing), тестирование безопасности (security testing), тестирование локализации (localization testing), тестирование совместимости (compatibility testing).</p><p><strong>Продолжительность обучения</strong></p><p>От 180 часов — первый уровень (его не всегда достаточно) суммарно, чтобы начать работать нужно 320 часов обучения, что равняется примерно 1,5 года жизни.</p><p><strong>Минимальная зарплата</strong>&nbsp;От 6000 — 15 000, если у вас есть опыт работы, вы можете претендовать на зарплату в 10 000- 12 000 шекелей.</p><p><strong>Стоимость обучения</strong>&nbsp;Варьируется в зависимости от желаемого уровня. Начинается все с 8000 за 120 часов и заканчивается 15 000 за 320 часов занятий.</p></blockquote>\\n\\n\\n\\n<h2>#4 Веб-Дизайнер</h2>\\n\\n\\n\\n<p>В настоящее время веб-дизайнер должен обладать базовыми знаниями верстки, разбираться в юзабилити. Веб-дизайнер не на столько популярная профессия, как предыдущие. Подходит людям, любящим творить, то есть, если вы личность творческая, любите и умеете рисовать (даже карандашом), вам точно сюда.</p>\\n\\n\\n\\n<p>Есть небольшой недостаток — найти постоянную работу на начальных этапах весьма не просто, нужно получить опыт и набрать портфолио, тогда все дороги будут вам открыты.</p>\\n\\n\\n\\n<blockquote class=\\"wp-block-quote\\"><p><strong>Специализация</strong></p><p>Разработка дизайнов сайтов, мобильных приложений. Знания и навыки: Web-дизайн — основы, Adobe Photoshop &amp; Adobe Illustrator, HTML, DreamWeaver</p><p><strong>Продолжительность обучения</strong></p><p>Начальный уровень требует от 80-200 часов обучения. Мы считаем, что минимум это 200 часов обучения.</p><p><strong>Минимальная зарплата</strong>&nbsp;4000 — 12 000 зарплата. Где 12 000 это потолок, такую оплату найти крайне сложно. В основном средняя зарплата веб-дизайнера составляется 5000-8000 шекелей в месяц.</p><p><strong>Стоимость обучения</strong>&nbsp;от 6000 — 25 000 за год. Есть и бесплатные курсы для новых репатриантов (обратитесь в Министерство Абсорбций). Продолжительность, как и стоимость курса, зависят от качества и количества материала.</p></blockquote>\\n\\n\\n\\n<h2>#5 Журналист, контент – маркетолог</h2>\\n\\n\\n\\n<p>Еще одна творческая профессия, которая требует умения усидеть на одном месте, исполнительности и грамматики. Журналистика весьма распространена среди новых заявок на будущий учебный год, однако есть масса минусов в обучении этой профессии.</p>\\n\\n\\n\\n<blockquote class=\\"wp-block-quote\\"><p><strong>Специализация</strong></p><p>Создание плана появления контента, написание эксклюзива и репортажей. Поиск новых тем.</p><p><strong>Продолжительность обучения</strong></p><p>Продолжительно обучения — до нескольких лет, если вы собираетесь стать профессионалом. Необходимы дополнительные курсы, связанные с контент-маркетинг и&nbsp;seo&nbsp;продвижением, если хотите писать оптимизированные качественные тексты.</p><p><strong>Минимальная зарплата</strong></p><p>4000 — 8 000 зарплата.</p><p><strong>Стоимость обучения</strong></p><p>от 2000 — 20 000. Как было написано выше, смотря что вы выбираете — посещение курсов или обучение в университете.</p></blockquote>\\n\\n\\n\\n<p>На этом все. Сбор информации занял у меня около 20 часов. Были просмотрены и проанализированы около десятка &nbsp;обучающих программ на основании ТОП поисковой выдачи. Суммы зарплаты взяты на основании личного опыта и информации в интернете.&nbsp;<strong>Исследование не является официальным.&nbsp;</strong></p>\\n\\n\\n\\n<p>Если вы располагаете другой информацией, сообщите об этом в комментариях, аргументируя или оставляя ссылки на источник информации.</p>\\n","slug":"post-2","title":"Самые востребованные профессии в Израиле, связанные с интернетом","author":{"node":{"name":"Andrew Roldugin","description":"Напишите немного о себе. Эта информация может отображаться на сайте."}},"categories":{"nodes":[{"name":"Жизнь","slug":"life","icat":{"caticon":{"localFile":{"childImageSharp":{"fluid":{"base64":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAOxAAADsQH1g+1JAAAF1ElEQVQ4y2XTWVATVhQG4AMZp3XaN6cqJOBA2GxkM6xKXFhCIi4suSQkIZANUERRLC7Ramud0VqV4oYouIK1oFShxQULTFgCxBBRQUwUwR1U0I4r4Z422IfO9Mz8r9/8d865AP8Zi4CAVTgex3sLRGAViiZahKSkh0/ed0aSV608so04ymABxEJjsMyhIUgBNyJU0BWcCf+b3uhE2DolEe4KCTxaTKAvLtHBIiBXevgEzZGEts0h2Bgmxj8CU0r7YxQA4AHtwVrH6+EaMIdlgImb/Ql69BMLHu9xgr71vg7WnHDo5ROGvalFQLbbsc5I8t4wh9DGMPFYbWDKaB1Xhm1hivV/BqbD7fBlYOIuY3QGLwVjwApo980FQAS4KRPCwFYP6IB9DtZYsR3z7eETW2ckQTvWECbGizNTsGqGlF6bpRi7xVPh9TCt3hyc5X1tZjYYA3IY7TNWg2H6GoAT0Aq9SyOg/3tPl0c7nCfcikuA7hhy3GzHeORjQ4jEjtHffKX0jI8MjWFKeiNca+sMyUQTN/svY0DO7A7/ldDhl8to9ckH6N/ibU+ydVUQdqfGFlwPUE8yR5I3hjkEG0Il9FJEAr0wNw7PBMXj6elSagrR4vWQLDv2wRiQgx1+uSNtnDw3w9droI2T5wiWFaFwd1WQslsmQHOcpNA0jyjtC2gIkYxe4sXT6hg+rZi1CI/5JuLZkCTsmquk1wKXU2NgDrb75X5o4+Rhq09+jR1s98t1gMeLF8JdsQBa+KlMvfIzMPBIbWOoGC+FElt1lAArwhfhKf9ELPIgWD+f4A2hHI2BObTdN5e2cfJoq0/+WLPnemxi62Y3sXWfbs8iECXcFYq2mSKTvOpDxY8vc6V4ftaSsV9CF9KT/ol40INgmV8ymvlSNEYosYObjf9i2Oy5frSJrUO9+8Y9eveNAFYB+cIiED2wCgl2R4vvXeJK31b6JGNl+GJ6lpeAR6YTLPWSYGuEFM1CJXbGZaDBPxdb2Gux2WsdbWLrbHr3jahn6xrHG1qFIpZFQIbv8JPpHb4UTSEybElX0YFyDQ4UEOzMFmBbXDze26DGwfNqHLqgwAf7U7GDtxr1rpuo3kNna2KPgzf0bN1Ee0PmHb54uDdGit0RctudJDV917MB3/bk0RdVafhwZxwO7I3HkWYNDl9NxefVKThcm4h9hUlY57mGtrh/a9OzddjE3tild9d9DpZY8Ze3o6W9PVFy7OIqxvq3LKdvH6zD16ZVdESfhc9OSfDlxTR8eVmBz89LcLBShM9OxeOzMgH+OjeZ1jjl21o9N6HeXVentz+5e54CuuenVnbPT0NzgHL0/uZsfGNdja9al+NIc+Y49uJ3+XizITtWvgSfHF2Ag6XR9My8JCycpBq9yl6LLexN2wzszQA3een2JN20f6eZ2tGe5KX42pRDR1qycLhe/alZTQoOnRPh4Okl+PR4HD4tiaH3d0fRUi85LXJS0XLXLKxzWxt4xS0fANUi+GHCajCGaAwdwRlo4Cz72Lc9A181pNKhc1I6WEHwWVkCPj26EJ8Ux+LDwig6VBRB60TxuP8r9Yfjrlo85ZJVXjVtJZydluMIjQEax8YADdT5avwvcjQfa70z8SIn82PPmgR8vDOS9n8XRe9vmkv7NkTQe9+E0QfruKgnMXSfU/qHYqYKS1mah6ddlk0+ytLCUZbWAa6FaqCWo2Zc8FZDhYeaf5qtenfSVYPlbmpb/YLY0S75zDGzJBDNyX7YSfzGqnnRowVTU8f2OimwiJn+6AhTwyllaaGUpXEsc8kCaA/KgKu+GqjyVjHK3FRQ4pLOOeSqaNjHVGDB1DQ87L0QK4NCaQU3nB5kL8Edk+W420mGhUx55QHn9CmHmCo4zFQxSlkaOMHKAKjxUUOVlxaOTUuHcnclo9glDUrYcihgSQW7nFOKf5ySenunkwR3OKXQ7VNkXbucJT/vYUpnFbBSYJ9zGhQxlYwDzDQ4xFTCsX/AvwFUmCiSGGy5ZAAAAABJRU5ErkJggg==","aspectRatio":1,"src":"/static/84659c605333a173d78b560d48ff1aaf/62915/tinder.png","srcSet":"/static/84659c605333a173d78b560d48ff1aaf/62915/tinder.png 128w","sizes":"(max-width: 128px) 100vw, 128px"}}}}}}]}}]}}}');

/***/ })

};
;
//# sourceMappingURL=component---src-templates-page-js.js.map