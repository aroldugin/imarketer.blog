"use strict";
exports.id = "component---src-pages-tags-js";
exports.ids = ["component---src-pages-tags-js"];
exports.modules = {

/***/ "./src/pages/tags.js":
/*!***************************!*\
  !*** ./src/pages/tags.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _public_page_data_sq_d_2530712760_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../public/page-data/sq/d/2530712760.json */ "./public/page-data/sq/d/2530712760.json");
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);




const TagsIndex = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.StaticQuery, {
  query: "2530712760",
  render: data => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
    className: "tagsindex mt-4"
  }, data.allWpTag.nodes.map(tag => {
    const {
      name,
      id
    } = tag;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
      key: id,
      to: `/tag/${tag.slug}`,
      className: "btn btn-outline btn-sm mr-2 mb-2"
    }, name);
  })),
  data: _public_page_data_sq_d_2530712760_json__WEBPACK_IMPORTED_MODULE_0__
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TagsIndex);

/***/ }),

/***/ "./public/page-data/sq/d/2530712760.json":
/*!***********************************************!*\
  !*** ./public/page-data/sq/d/2530712760.json ***!
  \***********************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"data":{"allWpTag":{"nodes":[{"name":"Анализ сайта","slug":"analiz-sajta","id":"dGVybTo2"},{"name":"Аналитика","slug":"analitika","id":"dGVybTo3"},{"name":"Инструменты","slug":"instrumenty","id":"dGVybTo4"},{"name":"Ключевые слова","slug":"klyuchevye-slova","id":"dGVybTo5"}]}}}');

/***/ })

};
;
//# sourceMappingURL=component---src-pages-tags-js.js.map