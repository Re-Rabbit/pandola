/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(2);

	var _clipboard = __webpack_require__(3);

	var _clipboard2 = _interopRequireDefault(_clipboard);

	var _index = __webpack_require__(12);

	var _index2 = _interopRequireDefault(_index);

	var _index3 = __webpack_require__(14);

	var _index4 = _interopRequireDefault(_index3);

	var _icon = __webpack_require__(19);

	var _icon2 = _interopRequireDefault(_icon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function replaceTpl(icon) {
					return _icon2.default.render(icon);
	}

	function appendToContainer(con) {
					return function (ctx) {
									return function () {
													con.innerHTML = ctx;
									};
					};
	}

	function toJson(data) {
					return data.json();
	}

	function filterErrorIcons(data) {
					return data.filter(function (res) {
									return res.code;
					});
	}

	function reMatch(re) {
					return function (ctx) {
									return re.test(ctx);
					};
	}

	function replaceAndConcatTpl(tplCall) {
					return function (data) {
									return data.map(tplCall).join('');
					};
	}

	function findMatchedIcon(call) {
					return function (data) {
									return data.filter(function (res) {
													return call(res.name);
									});
					};
	}

	function main() {

					var container = document.querySelector('#icons');
					var search = document.querySelector('#search');

					fetch((0, _index2.default)('icon')).then(toJson).then(filterErrorIcons).then(function (res) {
									function eventBinding(evt) {
													var value = evt.target.value.trim();
													var reMatchValue = new RegExp('' + value);
													var tpls = replaceAndConcatTpl(replaceTpl);
													var finder = findMatchedIcon(reMatch(reMatchValue));

													var iconTpls = value === '' ? tpls(res) : tpls(finder(res));

													requestAnimationFrame(appendToContainer(container)(iconTpls));

													document.querySelector('#count').innerHTML = res.length;
									}

									search.addEventListener('keyup', eventBinding);
									search.dispatchEvent(new KeyboardEvent('keyup'));

									var clipboard = new _clipboard2.default('.icon');

									clipboard.on('success', function (e) {

													_index4.default.of({ position: 'tr', state: 'success', content: '已复制 ' + e.text + ' 到剪贴板' });

													e.clearSelection();
									});

									clipboard.on('error', function (e) {
													_index4.default.of({ state: 'error', content: '复制失败' });
									});
					});
	}

	main();

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	(function (self) {
	  'use strict';

	  if (self.fetch) {
	    return;
	  }

	  var support = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob: 'FileReader' in self && 'Blob' in self && function () {
	      try {
	        new Blob();
	        return true;
	      } catch (e) {
	        return false;
	      }
	    }(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  };

	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name);
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name');
	    }
	    return name.toLowerCase();
	  }

	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value);
	    }
	    return value;
	  }

	  // Build a destructive iterator for the value list
	  function iteratorFor(items) {
	    var iterator = {
	      next: function next() {
	        var value = items.shift();
	        return { done: value === undefined, value: value };
	      }
	    };

	    if (support.iterable) {
	      iterator[Symbol.iterator] = function () {
	        return iterator;
	      };
	    }

	    return iterator;
	  }

	  function Headers(headers) {
	    this.map = {};

	    if (headers instanceof Headers) {
	      headers.forEach(function (value, name) {
	        this.append(name, value);
	      }, this);
	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function (name) {
	        this.append(name, headers[name]);
	      }, this);
	    }
	  }

	  Headers.prototype.append = function (name, value) {
	    name = normalizeName(name);
	    value = normalizeValue(value);
	    var list = this.map[name];
	    if (!list) {
	      list = [];
	      this.map[name] = list;
	    }
	    list.push(value);
	  };

	  Headers.prototype['delete'] = function (name) {
	    delete this.map[normalizeName(name)];
	  };

	  Headers.prototype.get = function (name) {
	    var values = this.map[normalizeName(name)];
	    return values ? values[0] : null;
	  };

	  Headers.prototype.getAll = function (name) {
	    return this.map[normalizeName(name)] || [];
	  };

	  Headers.prototype.has = function (name) {
	    return this.map.hasOwnProperty(normalizeName(name));
	  };

	  Headers.prototype.set = function (name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)];
	  };

	  Headers.prototype.forEach = function (callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function (name) {
	      this.map[name].forEach(function (value) {
	        callback.call(thisArg, value, name, this);
	      }, this);
	    }, this);
	  };

	  Headers.prototype.keys = function () {
	    var items = [];
	    this.forEach(function (value, name) {
	      items.push(name);
	    });
	    return iteratorFor(items);
	  };

	  Headers.prototype.values = function () {
	    var items = [];
	    this.forEach(function (value) {
	      items.push(value);
	    });
	    return iteratorFor(items);
	  };

	  Headers.prototype.entries = function () {
	    var items = [];
	    this.forEach(function (value, name) {
	      items.push([name, value]);
	    });
	    return iteratorFor(items);
	  };

	  if (support.iterable) {
	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
	  }

	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'));
	    }
	    body.bodyUsed = true;
	  }

	  function fileReaderReady(reader) {
	    return new Promise(function (resolve, reject) {
	      reader.onload = function () {
	        resolve(reader.result);
	      };
	      reader.onerror = function () {
	        reject(reader.error);
	      };
	    });
	  }

	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader();
	    reader.readAsArrayBuffer(blob);
	    return fileReaderReady(reader);
	  }

	  function readBlobAsText(blob) {
	    var reader = new FileReader();
	    reader.readAsText(blob);
	    return fileReaderReady(reader);
	  }

	  function Body() {
	    this.bodyUsed = false;

	    this._initBody = function (body) {
	      this._bodyInit = body;
	      if (typeof body === 'string') {
	        this._bodyText = body;
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body;
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body;
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString();
	      } else if (!body) {
	        this._bodyText = '';
	      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
	      } else {
	          throw new Error('unsupported BodyInit type');
	        }

	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8');
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type);
	        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
	        }
	      }
	    };

	    if (support.blob) {
	      this.blob = function () {
	        var rejected = consumed(this);
	        if (rejected) {
	          return rejected;
	        }

	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob);
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob');
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]));
	        }
	      };

	      this.arrayBuffer = function () {
	        return this.blob().then(readBlobAsArrayBuffer);
	      };

	      this.text = function () {
	        var rejected = consumed(this);
	        if (rejected) {
	          return rejected;
	        }

	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob);
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text');
	        } else {
	          return Promise.resolve(this._bodyText);
	        }
	      };
	    } else {
	      this.text = function () {
	        var rejected = consumed(this);
	        return rejected ? rejected : Promise.resolve(this._bodyText);
	      };
	    }

	    if (support.formData) {
	      this.formData = function () {
	        return this.text().then(decode);
	      };
	    }

	    this.json = function () {
	      return this.text().then(JSON.parse);
	    };

	    return this;
	  }

	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase();
	    return methods.indexOf(upcased) > -1 ? upcased : method;
	  }

	  function Request(input, options) {
	    options = options || {};
	    var body = options.body;
	    if (Request.prototype.isPrototypeOf(input)) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read');
	      }
	      this.url = input.url;
	      this.credentials = input.credentials;
	      if (!options.headers) {
	        this.headers = new Headers(input.headers);
	      }
	      this.method = input.method;
	      this.mode = input.mode;
	      if (!body) {
	        body = input._bodyInit;
	        input.bodyUsed = true;
	      }
	    } else {
	      this.url = input;
	    }

	    this.credentials = options.credentials || this.credentials || 'omit';
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers);
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET');
	    this.mode = options.mode || this.mode || null;
	    this.referrer = null;

	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests');
	    }
	    this._initBody(body);
	  }

	  Request.prototype.clone = function () {
	    return new Request(this);
	  };

	  function decode(body) {
	    var form = new FormData();
	    body.trim().split('&').forEach(function (bytes) {
	      if (bytes) {
	        var split = bytes.split('=');
	        var name = split.shift().replace(/\+/g, ' ');
	        var value = split.join('=').replace(/\+/g, ' ');
	        form.append(decodeURIComponent(name), decodeURIComponent(value));
	      }
	    });
	    return form;
	  }

	  function headers(xhr) {
	    var head = new Headers();
	    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n');
	    pairs.forEach(function (header) {
	      var split = header.trim().split(':');
	      var key = split.shift().trim();
	      var value = split.join(':').trim();
	      head.append(key, value);
	    });
	    return head;
	  }

	  Body.call(Request.prototype);

	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {};
	    }

	    this.type = 'default';
	    this.status = options.status;
	    this.ok = this.status >= 200 && this.status < 300;
	    this.statusText = options.statusText;
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
	    this.url = options.url || '';
	    this._initBody(bodyInit);
	  }

	  Body.call(Response.prototype);

	  Response.prototype.clone = function () {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    });
	  };

	  Response.error = function () {
	    var response = new Response(null, { status: 0, statusText: '' });
	    response.type = 'error';
	    return response;
	  };

	  var redirectStatuses = [301, 302, 303, 307, 308];

	  Response.redirect = function (url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code');
	    }

	    return new Response(null, { status: status, headers: { location: url } });
	  };

	  self.Headers = Headers;
	  self.Request = Request;
	  self.Response = Response;

	  self.fetch = function (input, init) {
	    return new Promise(function (resolve, reject) {
	      var request;
	      if (Request.prototype.isPrototypeOf(input) && !init) {
	        request = input;
	      } else {
	        request = new Request(input, init);
	      }

	      var xhr = new XMLHttpRequest();

	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL;
	        }

	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL');
	        }

	        return;
	      }

	      xhr.onload = function () {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        };
	        var body = 'response' in xhr ? xhr.response : xhr.responseText;
	        resolve(new Response(body, options));
	      };

	      xhr.onerror = function () {
	        reject(new TypeError('Network request failed'));
	      };

	      xhr.ontimeout = function () {
	        reject(new TypeError('Network request failed'));
	      };

	      xhr.open(request.method, request.url, true);

	      if (request.credentials === 'include') {
	        xhr.withCredentials = true;
	      }

	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob';
	      }

	      request.headers.forEach(function (value, name) {
	        xhr.setRequestHeader(name, value);
	      });

	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
	    });
	  };
	  self.fetch.polyfill = true;
	})(typeof self !== 'undefined' ? self : undefined);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, __webpack_require__(4), __webpack_require__(6), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(module, require('./clipboard-action'), require('tiny-emitter'), require('good-listener'));
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod, global.clipboardAction, global.tinyEmitter, global.goodListener);
	        global.clipboard = mod.exports;
	    }
	})(undefined, function (module, _clipboardAction, _tinyEmitter, _goodListener) {
	    'use strict';

	    var _clipboardAction2 = _interopRequireDefault(_clipboardAction);

	    var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

	    var _goodListener2 = _interopRequireDefault(_goodListener);

	    function _interopRequireDefault(obj) {
	        return obj && obj.__esModule ? obj : {
	            default: obj
	        };
	    }

	    function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	            throw new TypeError("Cannot call a class as a function");
	        }
	    }

	    function _possibleConstructorReturn(self, call) {
	        if (!self) {
	            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	        }

	        return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	    }

	    function _inherits(subClass, superClass) {
	        if (typeof superClass !== "function" && superClass !== null) {
	            throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	        }

	        subClass.prototype = Object.create(superClass && superClass.prototype, {
	            constructor: {
	                value: subClass,
	                enumerable: false,
	                writable: true,
	                configurable: true
	            }
	        });
	        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	    }

	    var Clipboard = function (_Emitter) {
	        _inherits(Clipboard, _Emitter);

	        /**
	         * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
	         * @param {Object} options
	         */

	        function Clipboard(trigger, options) {
	            _classCallCheck(this, Clipboard);

	            var _this = _possibleConstructorReturn(this, _Emitter.call(this));

	            _this.resolveOptions(options);
	            _this.listenClick(trigger);
	            return _this;
	        }

	        /**
	         * Defines if attributes would be resolved using internal setter functions
	         * or custom functions that were passed in the constructor.
	         * @param {Object} options
	         */

	        Clipboard.prototype.resolveOptions = function resolveOptions() {
	            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	            this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
	            this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
	            this.text = typeof options.text === 'function' ? options.text : this.defaultText;
	        };

	        Clipboard.prototype.listenClick = function listenClick(trigger) {
	            var _this2 = this;

	            this.listener = (0, _goodListener2.default)(trigger, 'click', function (e) {
	                return _this2.onClick(e);
	            });
	        };

	        Clipboard.prototype.onClick = function onClick(e) {
	            var trigger = e.delegateTarget || e.currentTarget;

	            if (this.clipboardAction) {
	                this.clipboardAction = null;
	            }

	            this.clipboardAction = new _clipboardAction2.default({
	                action: this.action(trigger),
	                target: this.target(trigger),
	                text: this.text(trigger),
	                trigger: trigger,
	                emitter: this
	            });
	        };

	        Clipboard.prototype.defaultAction = function defaultAction(trigger) {
	            return getAttributeValue('action', trigger);
	        };

	        Clipboard.prototype.defaultTarget = function defaultTarget(trigger) {
	            var selector = getAttributeValue('target', trigger);

	            if (selector) {
	                return document.querySelector(selector);
	            }
	        };

	        Clipboard.prototype.defaultText = function defaultText(trigger) {
	            return getAttributeValue('text', trigger);
	        };

	        Clipboard.prototype.destroy = function destroy() {
	            this.listener.destroy();

	            if (this.clipboardAction) {
	                this.clipboardAction.destroy();
	                this.clipboardAction = null;
	            }
	        };

	        return Clipboard;
	    }(_tinyEmitter2.default);

	    /**
	     * Helper function to retrieve attribute value.
	     * @param {String} suffix
	     * @param {Element} element
	     */
	    function getAttributeValue(suffix, element) {
	        var attribute = 'data-clipboard-' + suffix;

	        if (!element.hasAttribute(attribute)) {
	            return;
	        }

	        return element.getAttribute(attribute);
	    }

	    module.exports = Clipboard;
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, __webpack_require__(5)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(module, require('select'));
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod, global.select);
	        global.clipboardAction = mod.exports;
	    }
	})(undefined, function (module, _select) {
	    'use strict';

	    var _select2 = _interopRequireDefault(_select);

	    function _interopRequireDefault(obj) {
	        return obj && obj.__esModule ? obj : {
	            default: obj
	        };
	    }

	    var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
	        return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
	    } : function (obj) {
	        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
	    };

	    function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	            throw new TypeError("Cannot call a class as a function");
	        }
	    }

	    var _createClass = function () {
	        function defineProperties(target, props) {
	            for (var i = 0; i < props.length; i++) {
	                var descriptor = props[i];
	                descriptor.enumerable = descriptor.enumerable || false;
	                descriptor.configurable = true;
	                if ("value" in descriptor) descriptor.writable = true;
	                Object.defineProperty(target, descriptor.key, descriptor);
	            }
	        }

	        return function (Constructor, protoProps, staticProps) {
	            if (protoProps) defineProperties(Constructor.prototype, protoProps);
	            if (staticProps) defineProperties(Constructor, staticProps);
	            return Constructor;
	        };
	    }();

	    var ClipboardAction = function () {
	        /**
	         * @param {Object} options
	         */

	        function ClipboardAction(options) {
	            _classCallCheck(this, ClipboardAction);

	            this.resolveOptions(options);
	            this.initSelection();
	        }

	        /**
	         * Defines base properties passed from constructor.
	         * @param {Object} options
	         */

	        ClipboardAction.prototype.resolveOptions = function resolveOptions() {
	            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	            this.action = options.action;
	            this.emitter = options.emitter;
	            this.target = options.target;
	            this.text = options.text;
	            this.trigger = options.trigger;

	            this.selectedText = '';
	        };

	        ClipboardAction.prototype.initSelection = function initSelection() {
	            if (this.text) {
	                this.selectFake();
	            } else if (this.target) {
	                this.selectTarget();
	            }
	        };

	        ClipboardAction.prototype.selectFake = function selectFake() {
	            var _this = this;

	            var isRTL = document.documentElement.getAttribute('dir') == 'rtl';

	            this.removeFake();

	            this.fakeHandler = document.body.addEventListener('click', function () {
	                return _this.removeFake();
	            });

	            this.fakeElem = document.createElement('textarea');
	            // Prevent zooming on iOS
	            this.fakeElem.style.fontSize = '12pt';
	            // Reset box model
	            this.fakeElem.style.border = '0';
	            this.fakeElem.style.padding = '0';
	            this.fakeElem.style.margin = '0';
	            // Move element out of screen horizontally
	            this.fakeElem.style.position = 'fixed';
	            this.fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px';
	            // Move element to the same position vertically
	            this.fakeElem.style.top = (window.pageYOffset || document.documentElement.scrollTop) + 'px';
	            this.fakeElem.setAttribute('readonly', '');
	            this.fakeElem.value = this.text;

	            document.body.appendChild(this.fakeElem);

	            this.selectedText = (0, _select2.default)(this.fakeElem);
	            this.copyText();
	        };

	        ClipboardAction.prototype.removeFake = function removeFake() {
	            if (this.fakeHandler) {
	                document.body.removeEventListener('click');
	                this.fakeHandler = null;
	            }

	            if (this.fakeElem) {
	                document.body.removeChild(this.fakeElem);
	                this.fakeElem = null;
	            }
	        };

	        ClipboardAction.prototype.selectTarget = function selectTarget() {
	            this.selectedText = (0, _select2.default)(this.target);
	            this.copyText();
	        };

	        ClipboardAction.prototype.copyText = function copyText() {
	            var succeeded = undefined;

	            try {
	                succeeded = document.execCommand(this.action);
	            } catch (err) {
	                succeeded = false;
	            }

	            this.handleResult(succeeded);
	        };

	        ClipboardAction.prototype.handleResult = function handleResult(succeeded) {
	            if (succeeded) {
	                this.emitter.emit('success', {
	                    action: this.action,
	                    text: this.selectedText,
	                    trigger: this.trigger,
	                    clearSelection: this.clearSelection.bind(this)
	                });
	            } else {
	                this.emitter.emit('error', {
	                    action: this.action,
	                    trigger: this.trigger,
	                    clearSelection: this.clearSelection.bind(this)
	                });
	            }
	        };

	        ClipboardAction.prototype.clearSelection = function clearSelection() {
	            if (this.target) {
	                this.target.blur();
	            }

	            window.getSelection().removeAllRanges();
	        };

	        ClipboardAction.prototype.destroy = function destroy() {
	            this.removeFake();
	        };

	        _createClass(ClipboardAction, [{
	            key: 'action',
	            set: function set() {
	                var action = arguments.length <= 0 || arguments[0] === undefined ? 'copy' : arguments[0];

	                this._action = action;

	                if (this._action !== 'copy' && this._action !== 'cut') {
	                    throw new Error('Invalid "action" value, use either "copy" or "cut"');
	                }
	            },
	            get: function get() {
	                return this._action;
	            }
	        }, {
	            key: 'target',
	            set: function set(target) {
	                if (target !== undefined) {
	                    if (target && (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && target.nodeType === 1) {
	                        if (this.action === 'copy' && target.hasAttribute('disabled')) {
	                            throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
	                        }

	                        if (this.action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
	                            throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
	                        }

	                        this._target = target;
	                    } else {
	                        throw new Error('Invalid "target" value, use a valid Element');
	                    }
	                }
	            },
	            get: function get() {
	                return this._target;
	            }
	        }]);

	        return ClipboardAction;
	    }();

	    module.exports = ClipboardAction;
	});

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	function select(element) {
	    var selectedText;

	    if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
	        element.focus();
	        element.setSelectionRange(0, element.value.length);

	        selectedText = element.value;
	    } else {
	        if (element.hasAttribute('contenteditable')) {
	            element.focus();
	        }

	        var selection = window.getSelection();
	        var range = document.createRange();

	        range.selectNodeContents(element);
	        selection.removeAllRanges();
	        selection.addRange(range);

	        selectedText = selection.toString();
	    }

	    return selectedText;
	}

	module.exports = select;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	function E() {
	  // Keep this empty so it's easier to inherit from
	  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
	}

	E.prototype = {
	  on: function on(name, callback, ctx) {
	    var e = this.e || (this.e = {});

	    (e[name] || (e[name] = [])).push({
	      fn: callback,
	      ctx: ctx
	    });

	    return this;
	  },

	  once: function once(name, callback, ctx) {
	    var self = this;
	    function listener() {
	      self.off(name, listener);
	      callback.apply(ctx, arguments);
	    };

	    listener._ = callback;
	    return this.on(name, listener, ctx);
	  },

	  emit: function emit(name) {
	    var data = [].slice.call(arguments, 1);
	    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
	    var i = 0;
	    var len = evtArr.length;

	    for (i; i < len; i++) {
	      evtArr[i].fn.apply(evtArr[i].ctx, data);
	    }

	    return this;
	  },

	  off: function off(name, callback) {
	    var e = this.e || (this.e = {});
	    var evts = e[name];
	    var liveEvents = [];

	    if (evts && callback) {
	      for (var i = 0, len = evts.length; i < len; i++) {
	        if (evts[i].fn !== callback && evts[i].fn._ !== callback) liveEvents.push(evts[i]);
	      }
	    }

	    // Remove event from queue to prevent memory leak
	    // Suggested by https://github.com/lazd
	    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

	    liveEvents.length ? e[name] = liveEvents : delete e[name];

	    return this;
	  }
	};

	module.exports = E;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var is = __webpack_require__(8);
	var delegate = __webpack_require__(9);

	/**
	 * Validates all params and calls the right
	 * listener function based on its target type.
	 *
	 * @param {String|HTMLElement|HTMLCollection|NodeList} target
	 * @param {String} type
	 * @param {Function} callback
	 * @return {Object}
	 */
	function listen(target, type, callback) {
	    if (!target && !type && !callback) {
	        throw new Error('Missing required arguments');
	    }

	    if (!is.string(type)) {
	        throw new TypeError('Second argument must be a String');
	    }

	    if (!is.fn(callback)) {
	        throw new TypeError('Third argument must be a Function');
	    }

	    if (is.node(target)) {
	        return listenNode(target, type, callback);
	    } else if (is.nodeList(target)) {
	        return listenNodeList(target, type, callback);
	    } else if (is.string(target)) {
	        return listenSelector(target, type, callback);
	    } else {
	        throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
	    }
	}

	/**
	 * Adds an event listener to a HTML element
	 * and returns a remove listener function.
	 *
	 * @param {HTMLElement} node
	 * @param {String} type
	 * @param {Function} callback
	 * @return {Object}
	 */
	function listenNode(node, type, callback) {
	    node.addEventListener(type, callback);

	    return {
	        destroy: function destroy() {
	            node.removeEventListener(type, callback);
	        }
	    };
	}

	/**
	 * Add an event listener to a list of HTML elements
	 * and returns a remove listener function.
	 *
	 * @param {NodeList|HTMLCollection} nodeList
	 * @param {String} type
	 * @param {Function} callback
	 * @return {Object}
	 */
	function listenNodeList(nodeList, type, callback) {
	    Array.prototype.forEach.call(nodeList, function (node) {
	        node.addEventListener(type, callback);
	    });

	    return {
	        destroy: function destroy() {
	            Array.prototype.forEach.call(nodeList, function (node) {
	                node.removeEventListener(type, callback);
	            });
	        }
	    };
	}

	/**
	 * Add an event listener to a selector
	 * and returns a remove listener function.
	 *
	 * @param {String} selector
	 * @param {String} type
	 * @param {Function} callback
	 * @return {Object}
	 */
	function listenSelector(selector, type, callback) {
	    return delegate(document.body, selector, type, callback);
	}

	module.exports = listen;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Check if argument is a HTML element.
	 *
	 * @param {Object} value
	 * @return {Boolean}
	 */
	exports.node = function (value) {
	  return value !== undefined && value instanceof HTMLElement && value.nodeType === 1;
	};

	/**
	 * Check if argument is a list of HTML elements.
	 *
	 * @param {Object} value
	 * @return {Boolean}
	 */
	exports.nodeList = function (value) {
	  var type = Object.prototype.toString.call(value);

	  return value !== undefined && (type === '[object NodeList]' || type === '[object HTMLCollection]') && 'length' in value && (value.length === 0 || exports.node(value[0]));
	};

	/**
	 * Check if argument is a string.
	 *
	 * @param {Object} value
	 * @return {Boolean}
	 */
	exports.string = function (value) {
	  return typeof value === 'string' || value instanceof String;
	};

	/**
	 * Check if argument is a function.
	 *
	 * @param {Object} value
	 * @return {Boolean}
	 */
	exports.fn = function (value) {
	  var type = Object.prototype.toString.call(value);

	  return type === '[object Function]';
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var closest = __webpack_require__(10);

	/**
	 * Delegates event to a selector.
	 *
	 * @param {Element} element
	 * @param {String} selector
	 * @param {String} type
	 * @param {Function} callback
	 * @param {Boolean} useCapture
	 * @return {Object}
	 */
	function delegate(element, selector, type, callback, useCapture) {
	    var listenerFn = listener.apply(this, arguments);

	    element.addEventListener(type, listenerFn, useCapture);

	    return {
	        destroy: function destroy() {
	            element.removeEventListener(type, listenerFn, useCapture);
	        }
	    };
	}

	/**
	 * Finds closest match and invokes callback.
	 *
	 * @param {Element} element
	 * @param {String} selector
	 * @param {String} type
	 * @param {Function} callback
	 * @return {Function}
	 */
	function listener(element, selector, type, callback) {
	    return function (e) {
	        e.delegateTarget = closest(e.target, selector, true);

	        if (e.delegateTarget) {
	            callback.call(element, e);
	        }
	    };
	}

	module.exports = delegate;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var matches = __webpack_require__(11);

	module.exports = function (element, selector, checkYoSelf) {
	  var parent = checkYoSelf ? element : element.parentNode;

	  while (parent && parent !== document) {
	    if (matches(parent, selector)) return parent;
	    parent = parent.parentNode;
	  }
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Element prototype.
	 */

	var proto = Element.prototype;

	/**
	 * Vendor function.
	 */

	var vendor = proto.matchesSelector || proto.webkitMatchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector;

	/**
	 * Expose `match()`.
	 */

	module.exports = match;

	/**
	 * Match `el` to `selector`.
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @return {Boolean}
	 * @api public
	 */

	function match(el, selector) {
	  if (vendor) return vendor.call(el, selector);
	  var nodes = el.parentNode.querySelectorAll(selector);
	  for (var i = 0; i < nodes.length; ++i) {
	    if (nodes[i] == el) return true;
	  }
	  return false;
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	   value: true
	});
	exports.default = api;

	var _toml = __webpack_require__(13);

	var _toml2 = _interopRequireDefault(_toml);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function searchParamsParse(params) {
	   var queryString = new URLSearchParams();

	   for (var k in params) {
	      queryString.set(k, params[k]);
	   }

	   return queryString.toString();
	}

	function api(path) {
	   var params = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

	   if (params) {
	      return _toml2.default.api + '/' + path + '?' + searchParamsParse(params);
	   } else {
	      return _toml2.default.api + '/' + path;
	   }
	}

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports    = {
		"api": "http://localhost:7777/api",
		"oauth": {
			"id": "f3fb951adab9b34d4786",
			"key": "ab401569631d030dd6a807c28bc82f248e014a3d"
		},
		"contributors": [
			{
				"name": "Rabbit",
				"github": "yuffiy"
			},
			{
				"name": "PL",
				"github": "0x00-pl"
			},
			{
				"name": "wuwu",
				"github": "zooxyt"
			}
		]
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
				value: true
	});
	exports.NotifyPosition = exports.NotifyState = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Notify.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _immutable = __webpack_require__(15);

	var _notify = __webpack_require__(16);

	var _notify2 = _interopRequireDefault(_notify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// @todo add hover pause animation
	// @todo add callback

	// ion-ios-alert-outline
	// ion-ios-checkmark-circle-outline
	// ion-ios-warning-outline
	// ion-ios-notifications-outline

	var NotifyState = exports.NotifyState = {
				Info: 'info',
				Success: 'success',
				Warning: 'warning',
				Error: 'Error'
	};

	var NotifyPosition = exports.NotifyPosition = {
				TopLeft: 'tl',
				TopMiddle: 'tm',
				TopRight: 'tr',
				BottomLeft: 'bl',
				BottomMiddle: 'bm',
				BottomRight: 'br'
	};

	var defaultOptions = {
				position: NotifyPosition.TopRight,
				state: NotifyState.Info,
				content: ''
	};

	function constElem(opts) {
				var el = document.createElement('section');
				el.innerHTML = _notify2.default.render(opts);
				return el;
	}

	var Notify = function () {
				function Notify(opts, callback) {
							_classCallCheck(this, Notify);

							this.opts = Object.assign(defaultOptions, opts);
							this.callback = callback;

							requestAnimationFrame(this.init.bind(this));
				}

				_createClass(Notify, [{
							key: 'init',
							value: function init() {
										this.con = constElem(this.opts);
										document.body.appendChild(this.con);

										this.el = this.con.querySelector('.notify');
										this.show();
							}
				}, {
							key: 'show',
							value: function show() {
										var _this = this;

										this.el.classList.remove('js-notify-state--hide');
										this.el.classList.add('js-notify-state--show');
										setTimeout(function () {
													_this.el.classList.add('js-notify-anim--in');

													setTimeout(function () {
																_this.el.classList.add('js-notify-anim--out');

																setTimeout(function () {

																			_this.el.classList.add('js-notify-state--hide');
																			_this.el.classList.remove('js-notify-anim--in');
																			_this.el.classList.remove('js-notify-anim--out');
																			_this.el.classList.remove('js-notify-state--show');
																			document.body.removeChild(_this.con);
																			_this.callback(_this);
																}, 210);
													}, 2000);
										}, 100);
							}
				}, {
							key: 'close',
							value: function close() {}
				}, {
							key: 'setCallback',
							value: function setCallback(fn) {
										this.callback = typeof fn === 'function' ? fn : void 0;
										return this;
							}
				}]);

				return Notify;
	}();

	var Notifys = function () {
				function Notifys(opts) {
							_classCallCheck(this, Notifys);

							this.container = (0, _immutable.Map)();
				}

				_createClass(Notifys, [{
							key: 'addToContainer',
							value: function addToContainer(notify) {
										/*
	         let entity = {}
	         	entity[+new Date] = notify.setCallback(this.removeFromContainer.bind(this))
	         
	         this.container.push(entity)
	         */

										this.container = this.container.set(notify.setCallback(this.removeFromContainer.bind(this)));

										/*
	         return new Notifys(this.container.set({
	             key: +new Date,
	             value: notify.setCallback(this.removeFromContainer.bind(this))
	         }))
	         */
										return this;
							}
				}, {
							key: 'removeFromContainer',
							value: function removeFromContainer(notify) {
										//this.container
										//console.log(this.container.get({ key: notify }))
										// @todo remove from list
										console.log(this.container.get(notify));

										return this;
							}
				}, {
							key: 'of',
							value: function of(opts) {
										this.addToContainer(new Notify(opts));
										return this;
							}
				}]);

				return Notifys;
	}();

	/*
	export default function main(opts) {
	    return new Notify(opts)
	}
	*/

	exports.default = new Notifys();

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 *  Copyright (c) 2014-2015, Facebook, Inc.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the BSD-style license found in the
	 *  LICENSE file in the root directory of this source tree. An additional grant
	 *  of patent rights can be found in the PATENTS file in the same directory.
	 */

	(function (global, factory) {
	  ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.Immutable = factory();
	})(undefined, function () {
	  'use strict';
	  var SLICE$0 = Array.prototype.slice;

	  function createClass(ctor, superClass) {
	    if (superClass) {
	      ctor.prototype = Object.create(superClass.prototype);
	    }
	    ctor.prototype.constructor = ctor;
	  }

	  function Iterable(value) {
	    return isIterable(value) ? value : Seq(value);
	  }

	  createClass(KeyedIterable, Iterable);
	  function KeyedIterable(value) {
	    return isKeyed(value) ? value : KeyedSeq(value);
	  }

	  createClass(IndexedIterable, Iterable);
	  function IndexedIterable(value) {
	    return isIndexed(value) ? value : IndexedSeq(value);
	  }

	  createClass(SetIterable, Iterable);
	  function SetIterable(value) {
	    return isIterable(value) && !isAssociative(value) ? value : SetSeq(value);
	  }

	  function isIterable(maybeIterable) {
	    return !!(maybeIterable && maybeIterable[IS_ITERABLE_SENTINEL]);
	  }

	  function isKeyed(maybeKeyed) {
	    return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL]);
	  }

	  function isIndexed(maybeIndexed) {
	    return !!(maybeIndexed && maybeIndexed[IS_INDEXED_SENTINEL]);
	  }

	  function isAssociative(maybeAssociative) {
	    return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
	  }

	  function isOrdered(maybeOrdered) {
	    return !!(maybeOrdered && maybeOrdered[IS_ORDERED_SENTINEL]);
	  }

	  Iterable.isIterable = isIterable;
	  Iterable.isKeyed = isKeyed;
	  Iterable.isIndexed = isIndexed;
	  Iterable.isAssociative = isAssociative;
	  Iterable.isOrdered = isOrdered;

	  Iterable.Keyed = KeyedIterable;
	  Iterable.Indexed = IndexedIterable;
	  Iterable.Set = SetIterable;

	  var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
	  var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
	  var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
	  var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

	  // Used for setting prototype methods that IE8 chokes on.
	  var DELETE = 'delete';

	  // Constants describing the size of trie nodes.
	  var SHIFT = 5; // Resulted in best performance after ______?
	  var SIZE = 1 << SHIFT;
	  var MASK = SIZE - 1;

	  // A consistent shared value representing "not set" which equals nothing other
	  // than itself, and nothing that could be provided externally.
	  var NOT_SET = {};

	  // Boolean references, Rough equivalent of `bool &`.
	  var CHANGE_LENGTH = { value: false };
	  var DID_ALTER = { value: false };

	  function MakeRef(ref) {
	    ref.value = false;
	    return ref;
	  }

	  function SetRef(ref) {
	    ref && (ref.value = true);
	  }

	  // A function which returns a value representing an "owner" for transient writes
	  // to tries. The return value will only ever equal itself, and will not equal
	  // the return of any subsequent call of this function.
	  function OwnerID() {}

	  // http://jsperf.com/copy-array-inline
	  function arrCopy(arr, offset) {
	    offset = offset || 0;
	    var len = Math.max(0, arr.length - offset);
	    var newArr = new Array(len);
	    for (var ii = 0; ii < len; ii++) {
	      newArr[ii] = arr[ii + offset];
	    }
	    return newArr;
	  }

	  function ensureSize(iter) {
	    if (iter.size === undefined) {
	      iter.size = iter.__iterate(returnTrue);
	    }
	    return iter.size;
	  }

	  function wrapIndex(iter, index) {
	    // This implements "is array index" which the ECMAString spec defines as:
	    //
	    //     A String property name P is an array index if and only if
	    //     ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal
	    //     to 2^32−1.
	    //
	    // http://www.ecma-international.org/ecma-262/6.0/#sec-array-exotic-objects
	    if (typeof index !== 'number') {
	      var uint32Index = index >>> 0; // N >>> 0 is shorthand for ToUint32
	      if ('' + uint32Index !== index || uint32Index === 4294967295) {
	        return NaN;
	      }
	      index = uint32Index;
	    }
	    return index < 0 ? ensureSize(iter) + index : index;
	  }

	  function returnTrue() {
	    return true;
	  }

	  function wholeSlice(begin, end, size) {
	    return (begin === 0 || size !== undefined && begin <= -size) && (end === undefined || size !== undefined && end >= size);
	  }

	  function resolveBegin(begin, size) {
	    return resolveIndex(begin, size, 0);
	  }

	  function resolveEnd(end, size) {
	    return resolveIndex(end, size, size);
	  }

	  function resolveIndex(index, size, defaultIndex) {
	    return index === undefined ? defaultIndex : index < 0 ? Math.max(0, size + index) : size === undefined ? index : Math.min(size, index);
	  }

	  /* global Symbol */

	  var ITERATE_KEYS = 0;
	  var ITERATE_VALUES = 1;
	  var ITERATE_ENTRIES = 2;

	  var REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator';

	  var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;

	  function Iterator(next) {
	    this.next = next;
	  }

	  Iterator.prototype.toString = function () {
	    return '[Iterator]';
	  };

	  Iterator.KEYS = ITERATE_KEYS;
	  Iterator.VALUES = ITERATE_VALUES;
	  Iterator.ENTRIES = ITERATE_ENTRIES;

	  Iterator.prototype.inspect = Iterator.prototype.toSource = function () {
	    return this.toString();
	  };
	  Iterator.prototype[ITERATOR_SYMBOL] = function () {
	    return this;
	  };

	  function iteratorValue(type, k, v, iteratorResult) {
	    var value = type === 0 ? k : type === 1 ? v : [k, v];
	    iteratorResult ? iteratorResult.value = value : iteratorResult = {
	      value: value, done: false
	    };
	    return iteratorResult;
	  }

	  function iteratorDone() {
	    return { value: undefined, done: true };
	  }

	  function hasIterator(maybeIterable) {
	    return !!getIteratorFn(maybeIterable);
	  }

	  function isIterator(maybeIterator) {
	    return maybeIterator && typeof maybeIterator.next === 'function';
	  }

	  function getIterator(iterable) {
	    var iteratorFn = getIteratorFn(iterable);
	    return iteratorFn && iteratorFn.call(iterable);
	  }

	  function getIteratorFn(iterable) {
	    var iteratorFn = iterable && (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL] || iterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  function isArrayLike(value) {
	    return value && typeof value.length === 'number';
	  }

	  createClass(Seq, Iterable);
	  function Seq(value) {
	    return value === null || value === undefined ? emptySequence() : isIterable(value) ? value.toSeq() : seqFromValue(value);
	  }

	  Seq.of = function () /*...values*/{
	    return Seq(arguments);
	  };

	  Seq.prototype.toSeq = function () {
	    return this;
	  };

	  Seq.prototype.toString = function () {
	    return this.__toString('Seq {', '}');
	  };

	  Seq.prototype.cacheResult = function () {
	    if (!this._cache && this.__iterateUncached) {
	      this._cache = this.entrySeq().toArray();
	      this.size = this._cache.length;
	    }
	    return this;
	  };

	  // abstract __iterateUncached(fn, reverse)

	  Seq.prototype.__iterate = function (fn, reverse) {
	    return seqIterate(this, fn, reverse, true);
	  };

	  // abstract __iteratorUncached(type, reverse)

	  Seq.prototype.__iterator = function (type, reverse) {
	    return seqIterator(this, type, reverse, true);
	  };

	  createClass(KeyedSeq, Seq);
	  function KeyedSeq(value) {
	    return value === null || value === undefined ? emptySequence().toKeyedSeq() : isIterable(value) ? isKeyed(value) ? value.toSeq() : value.fromEntrySeq() : keyedSeqFromValue(value);
	  }

	  KeyedSeq.prototype.toKeyedSeq = function () {
	    return this;
	  };

	  createClass(IndexedSeq, Seq);
	  function IndexedSeq(value) {
	    return value === null || value === undefined ? emptySequence() : !isIterable(value) ? indexedSeqFromValue(value) : isKeyed(value) ? value.entrySeq() : value.toIndexedSeq();
	  }

	  IndexedSeq.of = function () /*...values*/{
	    return IndexedSeq(arguments);
	  };

	  IndexedSeq.prototype.toIndexedSeq = function () {
	    return this;
	  };

	  IndexedSeq.prototype.toString = function () {
	    return this.__toString('Seq [', ']');
	  };

	  IndexedSeq.prototype.__iterate = function (fn, reverse) {
	    return seqIterate(this, fn, reverse, false);
	  };

	  IndexedSeq.prototype.__iterator = function (type, reverse) {
	    return seqIterator(this, type, reverse, false);
	  };

	  createClass(SetSeq, Seq);
	  function SetSeq(value) {
	    return (value === null || value === undefined ? emptySequence() : !isIterable(value) ? indexedSeqFromValue(value) : isKeyed(value) ? value.entrySeq() : value).toSetSeq();
	  }

	  SetSeq.of = function () /*...values*/{
	    return SetSeq(arguments);
	  };

	  SetSeq.prototype.toSetSeq = function () {
	    return this;
	  };

	  Seq.isSeq = isSeq;
	  Seq.Keyed = KeyedSeq;
	  Seq.Set = SetSeq;
	  Seq.Indexed = IndexedSeq;

	  var IS_SEQ_SENTINEL = '@@__IMMUTABLE_SEQ__@@';

	  Seq.prototype[IS_SEQ_SENTINEL] = true;

	  createClass(ArraySeq, IndexedSeq);
	  function ArraySeq(array) {
	    this._array = array;
	    this.size = array.length;
	  }

	  ArraySeq.prototype.get = function (index, notSetValue) {
	    return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
	  };

	  ArraySeq.prototype.__iterate = function (fn, reverse) {
	    var array = this._array;
	    var maxIndex = array.length - 1;
	    for (var ii = 0; ii <= maxIndex; ii++) {
	      if (fn(array[reverse ? maxIndex - ii : ii], ii, this) === false) {
	        return ii + 1;
	      }
	    }
	    return ii;
	  };

	  ArraySeq.prototype.__iterator = function (type, reverse) {
	    var array = this._array;
	    var maxIndex = array.length - 1;
	    var ii = 0;
	    return new Iterator(function () {
	      return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii, array[reverse ? maxIndex - ii++ : ii++]);
	    });
	  };

	  createClass(ObjectSeq, KeyedSeq);
	  function ObjectSeq(object) {
	    var keys = Object.keys(object);
	    this._object = object;
	    this._keys = keys;
	    this.size = keys.length;
	  }

	  ObjectSeq.prototype.get = function (key, notSetValue) {
	    if (notSetValue !== undefined && !this.has(key)) {
	      return notSetValue;
	    }
	    return this._object[key];
	  };

	  ObjectSeq.prototype.has = function (key) {
	    return this._object.hasOwnProperty(key);
	  };

	  ObjectSeq.prototype.__iterate = function (fn, reverse) {
	    var object = this._object;
	    var keys = this._keys;
	    var maxIndex = keys.length - 1;
	    for (var ii = 0; ii <= maxIndex; ii++) {
	      var key = keys[reverse ? maxIndex - ii : ii];
	      if (fn(object[key], key, this) === false) {
	        return ii + 1;
	      }
	    }
	    return ii;
	  };

	  ObjectSeq.prototype.__iterator = function (type, reverse) {
	    var object = this._object;
	    var keys = this._keys;
	    var maxIndex = keys.length - 1;
	    var ii = 0;
	    return new Iterator(function () {
	      var key = keys[reverse ? maxIndex - ii : ii];
	      return ii++ > maxIndex ? iteratorDone() : iteratorValue(type, key, object[key]);
	    });
	  };

	  ObjectSeq.prototype[IS_ORDERED_SENTINEL] = true;

	  createClass(IterableSeq, IndexedSeq);
	  function IterableSeq(iterable) {
	    this._iterable = iterable;
	    this.size = iterable.length || iterable.size;
	  }

	  IterableSeq.prototype.__iterateUncached = function (fn, reverse) {
	    if (reverse) {
	      return this.cacheResult().__iterate(fn, reverse);
	    }
	    var iterable = this._iterable;
	    var iterator = getIterator(iterable);
	    var iterations = 0;
	    if (isIterator(iterator)) {
	      var step;
	      while (!(step = iterator.next()).done) {
	        if (fn(step.value, iterations++, this) === false) {
	          break;
	        }
	      }
	    }
	    return iterations;
	  };

	  IterableSeq.prototype.__iteratorUncached = function (type, reverse) {
	    if (reverse) {
	      return this.cacheResult().__iterator(type, reverse);
	    }
	    var iterable = this._iterable;
	    var iterator = getIterator(iterable);
	    if (!isIterator(iterator)) {
	      return new Iterator(iteratorDone);
	    }
	    var iterations = 0;
	    return new Iterator(function () {
	      var step = iterator.next();
	      return step.done ? step : iteratorValue(type, iterations++, step.value);
	    });
	  };

	  createClass(IteratorSeq, IndexedSeq);
	  function IteratorSeq(iterator) {
	    this._iterator = iterator;
	    this._iteratorCache = [];
	  }

	  IteratorSeq.prototype.__iterateUncached = function (fn, reverse) {
	    if (reverse) {
	      return this.cacheResult().__iterate(fn, reverse);
	    }
	    var iterator = this._iterator;
	    var cache = this._iteratorCache;
	    var iterations = 0;
	    while (iterations < cache.length) {
	      if (fn(cache[iterations], iterations++, this) === false) {
	        return iterations;
	      }
	    }
	    var step;
	    while (!(step = iterator.next()).done) {
	      var val = step.value;
	      cache[iterations] = val;
	      if (fn(val, iterations++, this) === false) {
	        break;
	      }
	    }
	    return iterations;
	  };

	  IteratorSeq.prototype.__iteratorUncached = function (type, reverse) {
	    if (reverse) {
	      return this.cacheResult().__iterator(type, reverse);
	    }
	    var iterator = this._iterator;
	    var cache = this._iteratorCache;
	    var iterations = 0;
	    return new Iterator(function () {
	      if (iterations >= cache.length) {
	        var step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	        cache[iterations] = step.value;
	      }
	      return iteratorValue(type, iterations, cache[iterations++]);
	    });
	  };

	  // # pragma Helper functions

	  function isSeq(maybeSeq) {
	    return !!(maybeSeq && maybeSeq[IS_SEQ_SENTINEL]);
	  }

	  var EMPTY_SEQ;

	  function emptySequence() {
	    return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
	  }

	  function keyedSeqFromValue(value) {
	    var seq = Array.isArray(value) ? new ArraySeq(value).fromEntrySeq() : isIterator(value) ? new IteratorSeq(value).fromEntrySeq() : hasIterator(value) ? new IterableSeq(value).fromEntrySeq() : (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? new ObjectSeq(value) : undefined;
	    if (!seq) {
	      throw new TypeError('Expected Array or iterable object of [k, v] entries, ' + 'or keyed object: ' + value);
	    }
	    return seq;
	  }

	  function indexedSeqFromValue(value) {
	    var seq = maybeIndexedSeqFromValue(value);
	    if (!seq) {
	      throw new TypeError('Expected Array or iterable object of values: ' + value);
	    }
	    return seq;
	  }

	  function seqFromValue(value) {
	    var seq = maybeIndexedSeqFromValue(value) || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && new ObjectSeq(value);
	    if (!seq) {
	      throw new TypeError('Expected Array or iterable object of values, or keyed object: ' + value);
	    }
	    return seq;
	  }

	  function maybeIndexedSeqFromValue(value) {
	    return isArrayLike(value) ? new ArraySeq(value) : isIterator(value) ? new IteratorSeq(value) : hasIterator(value) ? new IterableSeq(value) : undefined;
	  }

	  function seqIterate(seq, fn, reverse, useKeys) {
	    var cache = seq._cache;
	    if (cache) {
	      var maxIndex = cache.length - 1;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        var entry = cache[reverse ? maxIndex - ii : ii];
	        if (fn(entry[1], useKeys ? entry[0] : ii, seq) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    }
	    return seq.__iterateUncached(fn, reverse);
	  }

	  function seqIterator(seq, type, reverse, useKeys) {
	    var cache = seq._cache;
	    if (cache) {
	      var maxIndex = cache.length - 1;
	      var ii = 0;
	      return new Iterator(function () {
	        var entry = cache[reverse ? maxIndex - ii : ii];
	        return ii++ > maxIndex ? iteratorDone() : iteratorValue(type, useKeys ? entry[0] : ii - 1, entry[1]);
	      });
	    }
	    return seq.__iteratorUncached(type, reverse);
	  }

	  function fromJS(json, converter) {
	    return converter ? fromJSWith(converter, json, '', { '': json }) : fromJSDefault(json);
	  }

	  function fromJSWith(converter, json, key, parentJSON) {
	    if (Array.isArray(json)) {
	      return converter.call(parentJSON, key, IndexedSeq(json).map(function (v, k) {
	        return fromJSWith(converter, v, k, json);
	      }));
	    }
	    if (isPlainObj(json)) {
	      return converter.call(parentJSON, key, KeyedSeq(json).map(function (v, k) {
	        return fromJSWith(converter, v, k, json);
	      }));
	    }
	    return json;
	  }

	  function fromJSDefault(json) {
	    if (Array.isArray(json)) {
	      return IndexedSeq(json).map(fromJSDefault).toList();
	    }
	    if (isPlainObj(json)) {
	      return KeyedSeq(json).map(fromJSDefault).toMap();
	    }
	    return json;
	  }

	  function isPlainObj(value) {
	    return value && (value.constructor === Object || value.constructor === undefined);
	  }

	  /**
	   * An extension of the "same-value" algorithm as [described for use by ES6 Map
	   * and Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Key_equality)
	   *
	   * NaN is considered the same as NaN, however -0 and 0 are considered the same
	   * value, which is different from the algorithm described by
	   * [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
	   *
	   * This is extended further to allow Objects to describe the values they
	   * represent, by way of `valueOf` or `equals` (and `hashCode`).
	   *
	   * Note: because of this extension, the key equality of Immutable.Map and the
	   * value equality of Immutable.Set will differ from ES6 Map and Set.
	   *
	   * ### Defining custom values
	   *
	   * The easiest way to describe the value an object represents is by implementing
	   * `valueOf`. For example, `Date` represents a value by returning a unix
	   * timestamp for `valueOf`:
	   *
	   *     var date1 = new Date(1234567890000); // Fri Feb 13 2009 ...
	   *     var date2 = new Date(1234567890000);
	   *     date1.valueOf(); // 1234567890000
	   *     assert( date1 !== date2 );
	   *     assert( Immutable.is( date1, date2 ) );
	   *
	   * Note: overriding `valueOf` may have other implications if you use this object
	   * where JavaScript expects a primitive, such as implicit string coercion.
	   *
	   * For more complex types, especially collections, implementing `valueOf` may
	   * not be performant. An alternative is to implement `equals` and `hashCode`.
	   *
	   * `equals` takes another object, presumably of similar type, and returns true
	   * if the it is equal. Equality is symmetrical, so the same result should be
	   * returned if this and the argument are flipped.
	   *
	   *     assert( a.equals(b) === b.equals(a) );
	   *
	   * `hashCode` returns a 32bit integer number representing the object which will
	   * be used to determine how to store the value object in a Map or Set. You must
	   * provide both or neither methods, one must not exist without the other.
	   *
	   * Also, an important relationship between these methods must be upheld: if two
	   * values are equal, they *must* return the same hashCode. If the values are not
	   * equal, they might have the same hashCode; this is called a hash collision,
	   * and while undesirable for performance reasons, it is acceptable.
	   *
	   *     if (a.equals(b)) {
	   *       assert( a.hashCode() === b.hashCode() );
	   *     }
	   *
	   * All Immutable collections implement `equals` and `hashCode`.
	   *
	   */
	  function is(valueA, valueB) {
	    if (valueA === valueB || valueA !== valueA && valueB !== valueB) {
	      return true;
	    }
	    if (!valueA || !valueB) {
	      return false;
	    }
	    if (typeof valueA.valueOf === 'function' && typeof valueB.valueOf === 'function') {
	      valueA = valueA.valueOf();
	      valueB = valueB.valueOf();
	      if (valueA === valueB || valueA !== valueA && valueB !== valueB) {
	        return true;
	      }
	      if (!valueA || !valueB) {
	        return false;
	      }
	    }
	    if (typeof valueA.equals === 'function' && typeof valueB.equals === 'function' && valueA.equals(valueB)) {
	      return true;
	    }
	    return false;
	  }

	  function deepEqual(a, b) {
	    if (a === b) {
	      return true;
	    }

	    if (!isIterable(b) || a.size !== undefined && b.size !== undefined && a.size !== b.size || a.__hash !== undefined && b.__hash !== undefined && a.__hash !== b.__hash || isKeyed(a) !== isKeyed(b) || isIndexed(a) !== isIndexed(b) || isOrdered(a) !== isOrdered(b)) {
	      return false;
	    }

	    if (a.size === 0 && b.size === 0) {
	      return true;
	    }

	    var notAssociative = !isAssociative(a);

	    if (isOrdered(a)) {
	      var entries = a.entries();
	      return b.every(function (v, k) {
	        var entry = entries.next().value;
	        return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
	      }) && entries.next().done;
	    }

	    var flipped = false;

	    if (a.size === undefined) {
	      if (b.size === undefined) {
	        if (typeof a.cacheResult === 'function') {
	          a.cacheResult();
	        }
	      } else {
	        flipped = true;
	        var _ = a;
	        a = b;
	        b = _;
	      }
	    }

	    var allEqual = true;
	    var bSize = b.__iterate(function (v, k) {
	      if (notAssociative ? !a.has(v) : flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {
	        allEqual = false;
	        return false;
	      }
	    });

	    return allEqual && a.size === bSize;
	  }

	  createClass(Repeat, IndexedSeq);

	  function Repeat(value, times) {
	    if (!(this instanceof Repeat)) {
	      return new Repeat(value, times);
	    }
	    this._value = value;
	    this.size = times === undefined ? Infinity : Math.max(0, times);
	    if (this.size === 0) {
	      if (EMPTY_REPEAT) {
	        return EMPTY_REPEAT;
	      }
	      EMPTY_REPEAT = this;
	    }
	  }

	  Repeat.prototype.toString = function () {
	    if (this.size === 0) {
	      return 'Repeat []';
	    }
	    return 'Repeat [ ' + this._value + ' ' + this.size + ' times ]';
	  };

	  Repeat.prototype.get = function (index, notSetValue) {
	    return this.has(index) ? this._value : notSetValue;
	  };

	  Repeat.prototype.includes = function (searchValue) {
	    return is(this._value, searchValue);
	  };

	  Repeat.prototype.slice = function (begin, end) {
	    var size = this.size;
	    return wholeSlice(begin, end, size) ? this : new Repeat(this._value, resolveEnd(end, size) - resolveBegin(begin, size));
	  };

	  Repeat.prototype.reverse = function () {
	    return this;
	  };

	  Repeat.prototype.indexOf = function (searchValue) {
	    if (is(this._value, searchValue)) {
	      return 0;
	    }
	    return -1;
	  };

	  Repeat.prototype.lastIndexOf = function (searchValue) {
	    if (is(this._value, searchValue)) {
	      return this.size;
	    }
	    return -1;
	  };

	  Repeat.prototype.__iterate = function (fn, reverse) {
	    for (var ii = 0; ii < this.size; ii++) {
	      if (fn(this._value, ii, this) === false) {
	        return ii + 1;
	      }
	    }
	    return ii;
	  };

	  Repeat.prototype.__iterator = function (type, reverse) {
	    var this$0 = this;
	    var ii = 0;
	    return new Iterator(function () {
	      return ii < this$0.size ? iteratorValue(type, ii++, this$0._value) : iteratorDone();
	    });
	  };

	  Repeat.prototype.equals = function (other) {
	    return other instanceof Repeat ? is(this._value, other._value) : deepEqual(other);
	  };

	  var EMPTY_REPEAT;

	  function invariant(condition, error) {
	    if (!condition) throw new Error(error);
	  }

	  createClass(Range, IndexedSeq);

	  function Range(start, end, step) {
	    if (!(this instanceof Range)) {
	      return new Range(start, end, step);
	    }
	    invariant(step !== 0, 'Cannot step a Range by 0');
	    start = start || 0;
	    if (end === undefined) {
	      end = Infinity;
	    }
	    step = step === undefined ? 1 : Math.abs(step);
	    if (end < start) {
	      step = -step;
	    }
	    this._start = start;
	    this._end = end;
	    this._step = step;
	    this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
	    if (this.size === 0) {
	      if (EMPTY_RANGE) {
	        return EMPTY_RANGE;
	      }
	      EMPTY_RANGE = this;
	    }
	  }

	  Range.prototype.toString = function () {
	    if (this.size === 0) {
	      return 'Range []';
	    }
	    return 'Range [ ' + this._start + '...' + this._end + (this._step !== 1 ? ' by ' + this._step : '') + ' ]';
	  };

	  Range.prototype.get = function (index, notSetValue) {
	    return this.has(index) ? this._start + wrapIndex(this, index) * this._step : notSetValue;
	  };

	  Range.prototype.includes = function (searchValue) {
	    var possibleIndex = (searchValue - this._start) / this._step;
	    return possibleIndex >= 0 && possibleIndex < this.size && possibleIndex === Math.floor(possibleIndex);
	  };

	  Range.prototype.slice = function (begin, end) {
	    if (wholeSlice(begin, end, this.size)) {
	      return this;
	    }
	    begin = resolveBegin(begin, this.size);
	    end = resolveEnd(end, this.size);
	    if (end <= begin) {
	      return new Range(0, 0);
	    }
	    return new Range(this.get(begin, this._end), this.get(end, this._end), this._step);
	  };

	  Range.prototype.indexOf = function (searchValue) {
	    var offsetValue = searchValue - this._start;
	    if (offsetValue % this._step === 0) {
	      var index = offsetValue / this._step;
	      if (index >= 0 && index < this.size) {
	        return index;
	      }
	    }
	    return -1;
	  };

	  Range.prototype.lastIndexOf = function (searchValue) {
	    return this.indexOf(searchValue);
	  };

	  Range.prototype.__iterate = function (fn, reverse) {
	    var maxIndex = this.size - 1;
	    var step = this._step;
	    var value = reverse ? this._start + maxIndex * step : this._start;
	    for (var ii = 0; ii <= maxIndex; ii++) {
	      if (fn(value, ii, this) === false) {
	        return ii + 1;
	      }
	      value += reverse ? -step : step;
	    }
	    return ii;
	  };

	  Range.prototype.__iterator = function (type, reverse) {
	    var maxIndex = this.size - 1;
	    var step = this._step;
	    var value = reverse ? this._start + maxIndex * step : this._start;
	    var ii = 0;
	    return new Iterator(function () {
	      var v = value;
	      value += reverse ? -step : step;
	      return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii++, v);
	    });
	  };

	  Range.prototype.equals = function (other) {
	    return other instanceof Range ? this._start === other._start && this._end === other._end && this._step === other._step : deepEqual(this, other);
	  };

	  var EMPTY_RANGE;

	  createClass(Collection, Iterable);
	  function Collection() {
	    throw TypeError('Abstract');
	  }

	  createClass(KeyedCollection, Collection);function KeyedCollection() {}

	  createClass(IndexedCollection, Collection);function IndexedCollection() {}

	  createClass(SetCollection, Collection);function SetCollection() {}

	  Collection.Keyed = KeyedCollection;
	  Collection.Indexed = IndexedCollection;
	  Collection.Set = SetCollection;

	  var imul = typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2 ? Math.imul : function imul(a, b) {
	    a = a | 0; // int
	    b = b | 0; // int
	    var c = a & 0xffff;
	    var d = b & 0xffff;
	    // Shift by 0 fixes the sign on the high part.
	    return c * d + ((a >>> 16) * d + c * (b >>> 16) << 16 >>> 0) | 0; // int
	  };

	  // v8 has an optimization for storing 31-bit signed numbers.
	  // Values which have either 00 or 11 as the high order bits qualify.
	  // This function drops the highest order bit in a signed number, maintaining
	  // the sign bit.
	  function smi(i32) {
	    return i32 >>> 1 & 0x40000000 | i32 & 0xBFFFFFFF;
	  }

	  function hash(o) {
	    if (o === false || o === null || o === undefined) {
	      return 0;
	    }
	    if (typeof o.valueOf === 'function') {
	      o = o.valueOf();
	      if (o === false || o === null || o === undefined) {
	        return 0;
	      }
	    }
	    if (o === true) {
	      return 1;
	    }
	    var type = typeof o === 'undefined' ? 'undefined' : _typeof(o);
	    if (type === 'number') {
	      if (o !== o || o === Infinity) {
	        return 0;
	      }
	      var h = o | 0;
	      if (h !== o) {
	        h ^= o * 0xFFFFFFFF;
	      }
	      while (o > 0xFFFFFFFF) {
	        o /= 0xFFFFFFFF;
	        h ^= o;
	      }
	      return smi(h);
	    }
	    if (type === 'string') {
	      return o.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(o) : hashString(o);
	    }
	    if (typeof o.hashCode === 'function') {
	      return o.hashCode();
	    }
	    if (type === 'object') {
	      return hashJSObj(o);
	    }
	    if (typeof o.toString === 'function') {
	      return hashString(o.toString());
	    }
	    throw new Error('Value type ' + type + ' cannot be hashed.');
	  }

	  function cachedHashString(string) {
	    var hash = stringHashCache[string];
	    if (hash === undefined) {
	      hash = hashString(string);
	      if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
	        STRING_HASH_CACHE_SIZE = 0;
	        stringHashCache = {};
	      }
	      STRING_HASH_CACHE_SIZE++;
	      stringHashCache[string] = hash;
	    }
	    return hash;
	  }

	  // http://jsperf.com/hashing-strings
	  function hashString(string) {
	    // This is the hash from JVM
	    // The hash code for a string is computed as
	    // s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
	    // where s[i] is the ith character of the string and n is the length of
	    // the string. We "mod" the result to make it between 0 (inclusive) and 2^31
	    // (exclusive) by dropping high bits.
	    var hash = 0;
	    for (var ii = 0; ii < string.length; ii++) {
	      hash = 31 * hash + string.charCodeAt(ii) | 0;
	    }
	    return smi(hash);
	  }

	  function hashJSObj(obj) {
	    var hash;
	    if (usingWeakMap) {
	      hash = weakMap.get(obj);
	      if (hash !== undefined) {
	        return hash;
	      }
	    }

	    hash = obj[UID_HASH_KEY];
	    if (hash !== undefined) {
	      return hash;
	    }

	    if (!canDefineProperty) {
	      hash = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
	      if (hash !== undefined) {
	        return hash;
	      }

	      hash = getIENodeHash(obj);
	      if (hash !== undefined) {
	        return hash;
	      }
	    }

	    hash = ++objHashUID;
	    if (objHashUID & 0x40000000) {
	      objHashUID = 0;
	    }

	    if (usingWeakMap) {
	      weakMap.set(obj, hash);
	    } else if (isExtensible !== undefined && isExtensible(obj) === false) {
	      throw new Error('Non-extensible objects are not allowed as keys.');
	    } else if (canDefineProperty) {
	      Object.defineProperty(obj, UID_HASH_KEY, {
	        'enumerable': false,
	        'configurable': false,
	        'writable': false,
	        'value': hash
	      });
	    } else if (obj.propertyIsEnumerable !== undefined && obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
	      // Since we can't define a non-enumerable property on the object
	      // we'll hijack one of the less-used non-enumerable properties to
	      // save our hash on it. Since this is a function it will not show up in
	      // `JSON.stringify` which is what we want.
	      obj.propertyIsEnumerable = function () {
	        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
	      };
	      obj.propertyIsEnumerable[UID_HASH_KEY] = hash;
	    } else if (obj.nodeType !== undefined) {
	      // At this point we couldn't get the IE `uniqueID` to use as a hash
	      // and we couldn't use a non-enumerable property to exploit the
	      // dontEnum bug so we simply add the `UID_HASH_KEY` on the node
	      // itself.
	      obj[UID_HASH_KEY] = hash;
	    } else {
	      throw new Error('Unable to set a non-enumerable property on object.');
	    }

	    return hash;
	  }

	  // Get references to ES5 object methods.
	  var isExtensible = Object.isExtensible;

	  // True if Object.defineProperty works as expected. IE8 fails this test.
	  var canDefineProperty = function () {
	    try {
	      Object.defineProperty({}, '@', {});
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }();

	  // IE has a `uniqueID` property on DOM nodes. We can construct the hash from it
	  // and avoid memory leaks from the IE cloneNode bug.
	  function getIENodeHash(node) {
	    if (node && node.nodeType > 0) {
	      switch (node.nodeType) {
	        case 1:
	          // Element
	          return node.uniqueID;
	        case 9:
	          // Document
	          return node.documentElement && node.documentElement.uniqueID;
	      }
	    }
	  }

	  // If possible, use a WeakMap.
	  var usingWeakMap = typeof WeakMap === 'function';
	  var weakMap;
	  if (usingWeakMap) {
	    weakMap = new WeakMap();
	  }

	  var objHashUID = 0;

	  var UID_HASH_KEY = '__immutablehash__';
	  if (typeof Symbol === 'function') {
	    UID_HASH_KEY = Symbol(UID_HASH_KEY);
	  }

	  var STRING_HASH_CACHE_MIN_STRLEN = 16;
	  var STRING_HASH_CACHE_MAX_SIZE = 255;
	  var STRING_HASH_CACHE_SIZE = 0;
	  var stringHashCache = {};

	  function assertNotInfinite(size) {
	    invariant(size !== Infinity, 'Cannot perform this action with an infinite size.');
	  }

	  createClass(Map, KeyedCollection);

	  // @pragma Construction

	  function Map(value) {
	    return value === null || value === undefined ? emptyMap() : isMap(value) && !isOrdered(value) ? value : emptyMap().withMutations(function (map) {
	      var iter = KeyedIterable(value);
	      assertNotInfinite(iter.size);
	      iter.forEach(function (v, k) {
	        return map.set(k, v);
	      });
	    });
	  }

	  Map.of = function () {
	    var keyValues = SLICE$0.call(arguments, 0);
	    return emptyMap().withMutations(function (map) {
	      for (var i = 0; i < keyValues.length; i += 2) {
	        if (i + 1 >= keyValues.length) {
	          throw new Error('Missing value for key: ' + keyValues[i]);
	        }
	        map.set(keyValues[i], keyValues[i + 1]);
	      }
	    });
	  };

	  Map.prototype.toString = function () {
	    return this.__toString('Map {', '}');
	  };

	  // @pragma Access

	  Map.prototype.get = function (k, notSetValue) {
	    return this._root ? this._root.get(0, undefined, k, notSetValue) : notSetValue;
	  };

	  // @pragma Modification

	  Map.prototype.set = function (k, v) {
	    return updateMap(this, k, v);
	  };

	  Map.prototype.setIn = function (keyPath, v) {
	    return this.updateIn(keyPath, NOT_SET, function () {
	      return v;
	    });
	  };

	  Map.prototype.remove = function (k) {
	    return updateMap(this, k, NOT_SET);
	  };

	  Map.prototype.deleteIn = function (keyPath) {
	    return this.updateIn(keyPath, function () {
	      return NOT_SET;
	    });
	  };

	  Map.prototype.update = function (k, notSetValue, updater) {
	    return arguments.length === 1 ? k(this) : this.updateIn([k], notSetValue, updater);
	  };

	  Map.prototype.updateIn = function (keyPath, notSetValue, updater) {
	    if (!updater) {
	      updater = notSetValue;
	      notSetValue = undefined;
	    }
	    var updatedValue = updateInDeepMap(this, forceIterator(keyPath), notSetValue, updater);
	    return updatedValue === NOT_SET ? undefined : updatedValue;
	  };

	  Map.prototype.clear = function () {
	    if (this.size === 0) {
	      return this;
	    }
	    if (this.__ownerID) {
	      this.size = 0;
	      this._root = null;
	      this.__hash = undefined;
	      this.__altered = true;
	      return this;
	    }
	    return emptyMap();
	  };

	  // @pragma Composition

	  Map.prototype.merge = function () /*...iters*/{
	    return mergeIntoMapWith(this, undefined, arguments);
	  };

	  Map.prototype.mergeWith = function (merger) {
	    var iters = SLICE$0.call(arguments, 1);
	    return mergeIntoMapWith(this, merger, iters);
	  };

	  Map.prototype.mergeIn = function (keyPath) {
	    var iters = SLICE$0.call(arguments, 1);
	    return this.updateIn(keyPath, emptyMap(), function (m) {
	      return typeof m.merge === 'function' ? m.merge.apply(m, iters) : iters[iters.length - 1];
	    });
	  };

	  Map.prototype.mergeDeep = function () /*...iters*/{
	    return mergeIntoMapWith(this, deepMerger, arguments);
	  };

	  Map.prototype.mergeDeepWith = function (merger) {
	    var iters = SLICE$0.call(arguments, 1);
	    return mergeIntoMapWith(this, deepMergerWith(merger), iters);
	  };

	  Map.prototype.mergeDeepIn = function (keyPath) {
	    var iters = SLICE$0.call(arguments, 1);
	    return this.updateIn(keyPath, emptyMap(), function (m) {
	      return typeof m.mergeDeep === 'function' ? m.mergeDeep.apply(m, iters) : iters[iters.length - 1];
	    });
	  };

	  Map.prototype.sort = function (comparator) {
	    // Late binding
	    return OrderedMap(sortFactory(this, comparator));
	  };

	  Map.prototype.sortBy = function (mapper, comparator) {
	    // Late binding
	    return OrderedMap(sortFactory(this, comparator, mapper));
	  };

	  // @pragma Mutability

	  Map.prototype.withMutations = function (fn) {
	    var mutable = this.asMutable();
	    fn(mutable);
	    return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
	  };

	  Map.prototype.asMutable = function () {
	    return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
	  };

	  Map.prototype.asImmutable = function () {
	    return this.__ensureOwner();
	  };

	  Map.prototype.wasAltered = function () {
	    return this.__altered;
	  };

	  Map.prototype.__iterator = function (type, reverse) {
	    return new MapIterator(this, type, reverse);
	  };

	  Map.prototype.__iterate = function (fn, reverse) {
	    var this$0 = this;
	    var iterations = 0;
	    this._root && this._root.iterate(function (entry) {
	      iterations++;
	      return fn(entry[1], entry[0], this$0);
	    }, reverse);
	    return iterations;
	  };

	  Map.prototype.__ensureOwner = function (ownerID) {
	    if (ownerID === this.__ownerID) {
	      return this;
	    }
	    if (!ownerID) {
	      this.__ownerID = ownerID;
	      this.__altered = false;
	      return this;
	    }
	    return makeMap(this.size, this._root, ownerID, this.__hash);
	  };

	  function isMap(maybeMap) {
	    return !!(maybeMap && maybeMap[IS_MAP_SENTINEL]);
	  }

	  Map.isMap = isMap;

	  var IS_MAP_SENTINEL = '@@__IMMUTABLE_MAP__@@';

	  var MapPrototype = Map.prototype;
	  MapPrototype[IS_MAP_SENTINEL] = true;
	  MapPrototype[DELETE] = MapPrototype.remove;
	  MapPrototype.removeIn = MapPrototype.deleteIn;

	  // #pragma Trie Nodes

	  function ArrayMapNode(ownerID, entries) {
	    this.ownerID = ownerID;
	    this.entries = entries;
	  }

	  ArrayMapNode.prototype.get = function (shift, keyHash, key, notSetValue) {
	    var entries = this.entries;
	    for (var ii = 0, len = entries.length; ii < len; ii++) {
	      if (is(key, entries[ii][0])) {
	        return entries[ii][1];
	      }
	    }
	    return notSetValue;
	  };

	  ArrayMapNode.prototype.update = function (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	    var removed = value === NOT_SET;

	    var entries = this.entries;
	    var idx = 0;
	    for (var len = entries.length; idx < len; idx++) {
	      if (is(key, entries[idx][0])) {
	        break;
	      }
	    }
	    var exists = idx < len;

	    if (exists ? entries[idx][1] === value : removed) {
	      return this;
	    }

	    SetRef(didAlter);
	    (removed || !exists) && SetRef(didChangeSize);

	    if (removed && entries.length === 1) {
	      return; // undefined
	    }

	    if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
	      return createNodes(ownerID, entries, key, value);
	    }

	    var isEditable = ownerID && ownerID === this.ownerID;
	    var newEntries = isEditable ? entries : arrCopy(entries);

	    if (exists) {
	      if (removed) {
	        idx === len - 1 ? newEntries.pop() : newEntries[idx] = newEntries.pop();
	      } else {
	        newEntries[idx] = [key, value];
	      }
	    } else {
	      newEntries.push([key, value]);
	    }

	    if (isEditable) {
	      this.entries = newEntries;
	      return this;
	    }

	    return new ArrayMapNode(ownerID, newEntries);
	  };

	  function BitmapIndexedNode(ownerID, bitmap, nodes) {
	    this.ownerID = ownerID;
	    this.bitmap = bitmap;
	    this.nodes = nodes;
	  }

	  BitmapIndexedNode.prototype.get = function (shift, keyHash, key, notSetValue) {
	    if (keyHash === undefined) {
	      keyHash = hash(key);
	    }
	    var bit = 1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK);
	    var bitmap = this.bitmap;
	    return (bitmap & bit) === 0 ? notSetValue : this.nodes[popCount(bitmap & bit - 1)].get(shift + SHIFT, keyHash, key, notSetValue);
	  };

	  BitmapIndexedNode.prototype.update = function (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	    if (keyHash === undefined) {
	      keyHash = hash(key);
	    }
	    var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	    var bit = 1 << keyHashFrag;
	    var bitmap = this.bitmap;
	    var exists = (bitmap & bit) !== 0;

	    if (!exists && value === NOT_SET) {
	      return this;
	    }

	    var idx = popCount(bitmap & bit - 1);
	    var nodes = this.nodes;
	    var node = exists ? nodes[idx] : undefined;
	    var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);

	    if (newNode === node) {
	      return this;
	    }

	    if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
	      return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
	    }

	    if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
	      return nodes[idx ^ 1];
	    }

	    if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
	      return newNode;
	    }

	    var isEditable = ownerID && ownerID === this.ownerID;
	    var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
	    var newNodes = exists ? newNode ? setIn(nodes, idx, newNode, isEditable) : spliceOut(nodes, idx, isEditable) : spliceIn(nodes, idx, newNode, isEditable);

	    if (isEditable) {
	      this.bitmap = newBitmap;
	      this.nodes = newNodes;
	      return this;
	    }

	    return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
	  };

	  function HashArrayMapNode(ownerID, count, nodes) {
	    this.ownerID = ownerID;
	    this.count = count;
	    this.nodes = nodes;
	  }

	  HashArrayMapNode.prototype.get = function (shift, keyHash, key, notSetValue) {
	    if (keyHash === undefined) {
	      keyHash = hash(key);
	    }
	    var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	    var node = this.nodes[idx];
	    return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
	  };

	  HashArrayMapNode.prototype.update = function (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	    if (keyHash === undefined) {
	      keyHash = hash(key);
	    }
	    var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	    var removed = value === NOT_SET;
	    var nodes = this.nodes;
	    var node = nodes[idx];

	    if (removed && !node) {
	      return this;
	    }

	    var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
	    if (newNode === node) {
	      return this;
	    }

	    var newCount = this.count;
	    if (!node) {
	      newCount++;
	    } else if (!newNode) {
	      newCount--;
	      if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
	        return packNodes(ownerID, nodes, newCount, idx);
	      }
	    }

	    var isEditable = ownerID && ownerID === this.ownerID;
	    var newNodes = setIn(nodes, idx, newNode, isEditable);

	    if (isEditable) {
	      this.count = newCount;
	      this.nodes = newNodes;
	      return this;
	    }

	    return new HashArrayMapNode(ownerID, newCount, newNodes);
	  };

	  function HashCollisionNode(ownerID, keyHash, entries) {
	    this.ownerID = ownerID;
	    this.keyHash = keyHash;
	    this.entries = entries;
	  }

	  HashCollisionNode.prototype.get = function (shift, keyHash, key, notSetValue) {
	    var entries = this.entries;
	    for (var ii = 0, len = entries.length; ii < len; ii++) {
	      if (is(key, entries[ii][0])) {
	        return entries[ii][1];
	      }
	    }
	    return notSetValue;
	  };

	  HashCollisionNode.prototype.update = function (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	    if (keyHash === undefined) {
	      keyHash = hash(key);
	    }

	    var removed = value === NOT_SET;

	    if (keyHash !== this.keyHash) {
	      if (removed) {
	        return this;
	      }
	      SetRef(didAlter);
	      SetRef(didChangeSize);
	      return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
	    }

	    var entries = this.entries;
	    var idx = 0;
	    for (var len = entries.length; idx < len; idx++) {
	      if (is(key, entries[idx][0])) {
	        break;
	      }
	    }
	    var exists = idx < len;

	    if (exists ? entries[idx][1] === value : removed) {
	      return this;
	    }

	    SetRef(didAlter);
	    (removed || !exists) && SetRef(didChangeSize);

	    if (removed && len === 2) {
	      return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
	    }

	    var isEditable = ownerID && ownerID === this.ownerID;
	    var newEntries = isEditable ? entries : arrCopy(entries);

	    if (exists) {
	      if (removed) {
	        idx === len - 1 ? newEntries.pop() : newEntries[idx] = newEntries.pop();
	      } else {
	        newEntries[idx] = [key, value];
	      }
	    } else {
	      newEntries.push([key, value]);
	    }

	    if (isEditable) {
	      this.entries = newEntries;
	      return this;
	    }

	    return new HashCollisionNode(ownerID, this.keyHash, newEntries);
	  };

	  function ValueNode(ownerID, keyHash, entry) {
	    this.ownerID = ownerID;
	    this.keyHash = keyHash;
	    this.entry = entry;
	  }

	  ValueNode.prototype.get = function (shift, keyHash, key, notSetValue) {
	    return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
	  };

	  ValueNode.prototype.update = function (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	    var removed = value === NOT_SET;
	    var keyMatch = is(key, this.entry[0]);
	    if (keyMatch ? value === this.entry[1] : removed) {
	      return this;
	    }

	    SetRef(didAlter);

	    if (removed) {
	      SetRef(didChangeSize);
	      return; // undefined
	    }

	    if (keyMatch) {
	      if (ownerID && ownerID === this.ownerID) {
	        this.entry[1] = value;
	        return this;
	      }
	      return new ValueNode(ownerID, this.keyHash, [key, value]);
	    }

	    SetRef(didChangeSize);
	    return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
	  };

	  // #pragma Iterators

	  ArrayMapNode.prototype.iterate = HashCollisionNode.prototype.iterate = function (fn, reverse) {
	    var entries = this.entries;
	    for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
	      if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
	        return false;
	      }
	    }
	  };

	  BitmapIndexedNode.prototype.iterate = HashArrayMapNode.prototype.iterate = function (fn, reverse) {
	    var nodes = this.nodes;
	    for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
	      var node = nodes[reverse ? maxIndex - ii : ii];
	      if (node && node.iterate(fn, reverse) === false) {
	        return false;
	      }
	    }
	  };

	  ValueNode.prototype.iterate = function (fn, reverse) {
	    return fn(this.entry);
	  };

	  createClass(MapIterator, Iterator);

	  function MapIterator(map, type, reverse) {
	    this._type = type;
	    this._reverse = reverse;
	    this._stack = map._root && mapIteratorFrame(map._root);
	  }

	  MapIterator.prototype.next = function () {
	    var type = this._type;
	    var stack = this._stack;
	    while (stack) {
	      var node = stack.node;
	      var index = stack.index++;
	      var maxIndex;
	      if (node.entry) {
	        if (index === 0) {
	          return mapIteratorValue(type, node.entry);
	        }
	      } else if (node.entries) {
	        maxIndex = node.entries.length - 1;
	        if (index <= maxIndex) {
	          return mapIteratorValue(type, node.entries[this._reverse ? maxIndex - index : index]);
	        }
	      } else {
	        maxIndex = node.nodes.length - 1;
	        if (index <= maxIndex) {
	          var subNode = node.nodes[this._reverse ? maxIndex - index : index];
	          if (subNode) {
	            if (subNode.entry) {
	              return mapIteratorValue(type, subNode.entry);
	            }
	            stack = this._stack = mapIteratorFrame(subNode, stack);
	          }
	          continue;
	        }
	      }
	      stack = this._stack = this._stack.__prev;
	    }
	    return iteratorDone();
	  };

	  function mapIteratorValue(type, entry) {
	    return iteratorValue(type, entry[0], entry[1]);
	  }

	  function mapIteratorFrame(node, prev) {
	    return {
	      node: node,
	      index: 0,
	      __prev: prev
	    };
	  }

	  function makeMap(size, root, ownerID, hash) {
	    var map = Object.create(MapPrototype);
	    map.size = size;
	    map._root = root;
	    map.__ownerID = ownerID;
	    map.__hash = hash;
	    map.__altered = false;
	    return map;
	  }

	  var EMPTY_MAP;
	  function emptyMap() {
	    return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
	  }

	  function updateMap(map, k, v) {
	    var newRoot;
	    var newSize;
	    if (!map._root) {
	      if (v === NOT_SET) {
	        return map;
	      }
	      newSize = 1;
	      newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);
	    } else {
	      var didChangeSize = MakeRef(CHANGE_LENGTH);
	      var didAlter = MakeRef(DID_ALTER);
	      newRoot = updateNode(map._root, map.__ownerID, 0, undefined, k, v, didChangeSize, didAlter);
	      if (!didAlter.value) {
	        return map;
	      }
	      newSize = map.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);
	    }
	    if (map.__ownerID) {
	      map.size = newSize;
	      map._root = newRoot;
	      map.__hash = undefined;
	      map.__altered = true;
	      return map;
	    }
	    return newRoot ? makeMap(newSize, newRoot) : emptyMap();
	  }

	  function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	    if (!node) {
	      if (value === NOT_SET) {
	        return node;
	      }
	      SetRef(didAlter);
	      SetRef(didChangeSize);
	      return new ValueNode(ownerID, keyHash, [key, value]);
	    }
	    return node.update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter);
	  }

	  function isLeafNode(node) {
	    return node.constructor === ValueNode || node.constructor === HashCollisionNode;
	  }

	  function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
	    if (node.keyHash === keyHash) {
	      return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
	    }

	    var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
	    var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;

	    var newNode;
	    var nodes = idx1 === idx2 ? [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] : (newNode = new ValueNode(ownerID, keyHash, entry), idx1 < idx2 ? [node, newNode] : [newNode, node]);

	    return new BitmapIndexedNode(ownerID, 1 << idx1 | 1 << idx2, nodes);
	  }

	  function createNodes(ownerID, entries, key, value) {
	    if (!ownerID) {
	      ownerID = new OwnerID();
	    }
	    var node = new ValueNode(ownerID, hash(key), [key, value]);
	    for (var ii = 0; ii < entries.length; ii++) {
	      var entry = entries[ii];
	      node = node.update(ownerID, 0, undefined, entry[0], entry[1]);
	    }
	    return node;
	  }

	  function packNodes(ownerID, nodes, count, excluding) {
	    var bitmap = 0;
	    var packedII = 0;
	    var packedNodes = new Array(count);
	    for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
	      var node = nodes[ii];
	      if (node !== undefined && ii !== excluding) {
	        bitmap |= bit;
	        packedNodes[packedII++] = node;
	      }
	    }
	    return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
	  }

	  function expandNodes(ownerID, nodes, bitmap, including, node) {
	    var count = 0;
	    var expandedNodes = new Array(SIZE);
	    for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
	      expandedNodes[ii] = bitmap & 1 ? nodes[count++] : undefined;
	    }
	    expandedNodes[including] = node;
	    return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
	  }

	  function mergeIntoMapWith(map, merger, iterables) {
	    var iters = [];
	    for (var ii = 0; ii < iterables.length; ii++) {
	      var value = iterables[ii];
	      var iter = KeyedIterable(value);
	      if (!isIterable(value)) {
	        iter = iter.map(function (v) {
	          return fromJS(v);
	        });
	      }
	      iters.push(iter);
	    }
	    return mergeIntoCollectionWith(map, merger, iters);
	  }

	  function deepMerger(existing, value, key) {
	    return existing && existing.mergeDeep && isIterable(value) ? existing.mergeDeep(value) : is(existing, value) ? existing : value;
	  }

	  function deepMergerWith(merger) {
	    return function (existing, value, key) {
	      if (existing && existing.mergeDeepWith && isIterable(value)) {
	        return existing.mergeDeepWith(merger, value);
	      }
	      var nextValue = merger(existing, value, key);
	      return is(existing, nextValue) ? existing : nextValue;
	    };
	  }

	  function mergeIntoCollectionWith(collection, merger, iters) {
	    iters = iters.filter(function (x) {
	      return x.size !== 0;
	    });
	    if (iters.length === 0) {
	      return collection;
	    }
	    if (collection.size === 0 && !collection.__ownerID && iters.length === 1) {
	      return collection.constructor(iters[0]);
	    }
	    return collection.withMutations(function (collection) {
	      var mergeIntoMap = merger ? function (value, key) {
	        collection.update(key, NOT_SET, function (existing) {
	          return existing === NOT_SET ? value : merger(existing, value, key);
	        });
	      } : function (value, key) {
	        collection.set(key, value);
	      };
	      for (var ii = 0; ii < iters.length; ii++) {
	        iters[ii].forEach(mergeIntoMap);
	      }
	    });
	  }

	  function updateInDeepMap(existing, keyPathIter, notSetValue, updater) {
	    var isNotSet = existing === NOT_SET;
	    var step = keyPathIter.next();
	    if (step.done) {
	      var existingValue = isNotSet ? notSetValue : existing;
	      var newValue = updater(existingValue);
	      return newValue === existingValue ? existing : newValue;
	    }
	    invariant(isNotSet || existing && existing.set, 'invalid keyPath');
	    var key = step.value;
	    var nextExisting = isNotSet ? NOT_SET : existing.get(key, NOT_SET);
	    var nextUpdated = updateInDeepMap(nextExisting, keyPathIter, notSetValue, updater);
	    return nextUpdated === nextExisting ? existing : nextUpdated === NOT_SET ? existing.remove(key) : (isNotSet ? emptyMap() : existing).set(key, nextUpdated);
	  }

	  function popCount(x) {
	    x = x - (x >> 1 & 0x55555555);
	    x = (x & 0x33333333) + (x >> 2 & 0x33333333);
	    x = x + (x >> 4) & 0x0f0f0f0f;
	    x = x + (x >> 8);
	    x = x + (x >> 16);
	    return x & 0x7f;
	  }

	  function setIn(array, idx, val, canEdit) {
	    var newArray = canEdit ? array : arrCopy(array);
	    newArray[idx] = val;
	    return newArray;
	  }

	  function spliceIn(array, idx, val, canEdit) {
	    var newLen = array.length + 1;
	    if (canEdit && idx + 1 === newLen) {
	      array[idx] = val;
	      return array;
	    }
	    var newArray = new Array(newLen);
	    var after = 0;
	    for (var ii = 0; ii < newLen; ii++) {
	      if (ii === idx) {
	        newArray[ii] = val;
	        after = -1;
	      } else {
	        newArray[ii] = array[ii + after];
	      }
	    }
	    return newArray;
	  }

	  function spliceOut(array, idx, canEdit) {
	    var newLen = array.length - 1;
	    if (canEdit && idx === newLen) {
	      array.pop();
	      return array;
	    }
	    var newArray = new Array(newLen);
	    var after = 0;
	    for (var ii = 0; ii < newLen; ii++) {
	      if (ii === idx) {
	        after = 1;
	      }
	      newArray[ii] = array[ii + after];
	    }
	    return newArray;
	  }

	  var MAX_ARRAY_MAP_SIZE = SIZE / 4;
	  var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
	  var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;

	  createClass(List, IndexedCollection);

	  // @pragma Construction

	  function List(value) {
	    var empty = emptyList();
	    if (value === null || value === undefined) {
	      return empty;
	    }
	    if (isList(value)) {
	      return value;
	    }
	    var iter = IndexedIterable(value);
	    var size = iter.size;
	    if (size === 0) {
	      return empty;
	    }
	    assertNotInfinite(size);
	    if (size > 0 && size < SIZE) {
	      return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
	    }
	    return empty.withMutations(function (list) {
	      list.setSize(size);
	      iter.forEach(function (v, i) {
	        return list.set(i, v);
	      });
	    });
	  }

	  List.of = function () /*...values*/{
	    return this(arguments);
	  };

	  List.prototype.toString = function () {
	    return this.__toString('List [', ']');
	  };

	  // @pragma Access

	  List.prototype.get = function (index, notSetValue) {
	    index = wrapIndex(this, index);
	    if (index >= 0 && index < this.size) {
	      index += this._origin;
	      var node = listNodeFor(this, index);
	      return node && node.array[index & MASK];
	    }
	    return notSetValue;
	  };

	  // @pragma Modification

	  List.prototype.set = function (index, value) {
	    return updateList(this, index, value);
	  };

	  List.prototype.remove = function (index) {
	    return !this.has(index) ? this : index === 0 ? this.shift() : index === this.size - 1 ? this.pop() : this.splice(index, 1);
	  };

	  List.prototype.insert = function (index, value) {
	    return this.splice(index, 0, value);
	  };

	  List.prototype.clear = function () {
	    if (this.size === 0) {
	      return this;
	    }
	    if (this.__ownerID) {
	      this.size = this._origin = this._capacity = 0;
	      this._level = SHIFT;
	      this._root = this._tail = null;
	      this.__hash = undefined;
	      this.__altered = true;
	      return this;
	    }
	    return emptyList();
	  };

	  List.prototype.push = function () /*...values*/{
	    var values = arguments;
	    var oldSize = this.size;
	    return this.withMutations(function (list) {
	      setListBounds(list, 0, oldSize + values.length);
	      for (var ii = 0; ii < values.length; ii++) {
	        list.set(oldSize + ii, values[ii]);
	      }
	    });
	  };

	  List.prototype.pop = function () {
	    return setListBounds(this, 0, -1);
	  };

	  List.prototype.unshift = function () /*...values*/{
	    var values = arguments;
	    return this.withMutations(function (list) {
	      setListBounds(list, -values.length);
	      for (var ii = 0; ii < values.length; ii++) {
	        list.set(ii, values[ii]);
	      }
	    });
	  };

	  List.prototype.shift = function () {
	    return setListBounds(this, 1);
	  };

	  // @pragma Composition

	  List.prototype.merge = function () /*...iters*/{
	    return mergeIntoListWith(this, undefined, arguments);
	  };

	  List.prototype.mergeWith = function (merger) {
	    var iters = SLICE$0.call(arguments, 1);
	    return mergeIntoListWith(this, merger, iters);
	  };

	  List.prototype.mergeDeep = function () /*...iters*/{
	    return mergeIntoListWith(this, deepMerger, arguments);
	  };

	  List.prototype.mergeDeepWith = function (merger) {
	    var iters = SLICE$0.call(arguments, 1);
	    return mergeIntoListWith(this, deepMergerWith(merger), iters);
	  };

	  List.prototype.setSize = function (size) {
	    return setListBounds(this, 0, size);
	  };

	  // @pragma Iteration

	  List.prototype.slice = function (begin, end) {
	    var size = this.size;
	    if (wholeSlice(begin, end, size)) {
	      return this;
	    }
	    return setListBounds(this, resolveBegin(begin, size), resolveEnd(end, size));
	  };

	  List.prototype.__iterator = function (type, reverse) {
	    var index = 0;
	    var values = iterateList(this, reverse);
	    return new Iterator(function () {
	      var value = values();
	      return value === DONE ? iteratorDone() : iteratorValue(type, index++, value);
	    });
	  };

	  List.prototype.__iterate = function (fn, reverse) {
	    var index = 0;
	    var values = iterateList(this, reverse);
	    var value;
	    while ((value = values()) !== DONE) {
	      if (fn(value, index++, this) === false) {
	        break;
	      }
	    }
	    return index;
	  };

	  List.prototype.__ensureOwner = function (ownerID) {
	    if (ownerID === this.__ownerID) {
	      return this;
	    }
	    if (!ownerID) {
	      this.__ownerID = ownerID;
	      return this;
	    }
	    return makeList(this._origin, this._capacity, this._level, this._root, this._tail, ownerID, this.__hash);
	  };

	  function isList(maybeList) {
	    return !!(maybeList && maybeList[IS_LIST_SENTINEL]);
	  }

	  List.isList = isList;

	  var IS_LIST_SENTINEL = '@@__IMMUTABLE_LIST__@@';

	  var ListPrototype = List.prototype;
	  ListPrototype[IS_LIST_SENTINEL] = true;
	  ListPrototype[DELETE] = ListPrototype.remove;
	  ListPrototype.setIn = MapPrototype.setIn;
	  ListPrototype.deleteIn = ListPrototype.removeIn = MapPrototype.removeIn;
	  ListPrototype.update = MapPrototype.update;
	  ListPrototype.updateIn = MapPrototype.updateIn;
	  ListPrototype.mergeIn = MapPrototype.mergeIn;
	  ListPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
	  ListPrototype.withMutations = MapPrototype.withMutations;
	  ListPrototype.asMutable = MapPrototype.asMutable;
	  ListPrototype.asImmutable = MapPrototype.asImmutable;
	  ListPrototype.wasAltered = MapPrototype.wasAltered;

	  function VNode(array, ownerID) {
	    this.array = array;
	    this.ownerID = ownerID;
	  }

	  // TODO: seems like these methods are very similar

	  VNode.prototype.removeBefore = function (ownerID, level, index) {
	    if (index === level ? 1 << level : 0 || this.array.length === 0) {
	      return this;
	    }
	    var originIndex = index >>> level & MASK;
	    if (originIndex >= this.array.length) {
	      return new VNode([], ownerID);
	    }
	    var removingFirst = originIndex === 0;
	    var newChild;
	    if (level > 0) {
	      var oldChild = this.array[originIndex];
	      newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
	      if (newChild === oldChild && removingFirst) {
	        return this;
	      }
	    }
	    if (removingFirst && !newChild) {
	      return this;
	    }
	    var editable = editableVNode(this, ownerID);
	    if (!removingFirst) {
	      for (var ii = 0; ii < originIndex; ii++) {
	        editable.array[ii] = undefined;
	      }
	    }
	    if (newChild) {
	      editable.array[originIndex] = newChild;
	    }
	    return editable;
	  };

	  VNode.prototype.removeAfter = function (ownerID, level, index) {
	    if (index === (level ? 1 << level : 0) || this.array.length === 0) {
	      return this;
	    }
	    var sizeIndex = index - 1 >>> level & MASK;
	    if (sizeIndex >= this.array.length) {
	      return this;
	    }

	    var newChild;
	    if (level > 0) {
	      var oldChild = this.array[sizeIndex];
	      newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
	      if (newChild === oldChild && sizeIndex === this.array.length - 1) {
	        return this;
	      }
	    }

	    var editable = editableVNode(this, ownerID);
	    editable.array.splice(sizeIndex + 1);
	    if (newChild) {
	      editable.array[sizeIndex] = newChild;
	    }
	    return editable;
	  };

	  var DONE = {};

	  function iterateList(list, reverse) {
	    var left = list._origin;
	    var right = list._capacity;
	    var tailPos = getTailOffset(right);
	    var tail = list._tail;

	    return iterateNodeOrLeaf(list._root, list._level, 0);

	    function iterateNodeOrLeaf(node, level, offset) {
	      return level === 0 ? iterateLeaf(node, offset) : iterateNode(node, level, offset);
	    }

	    function iterateLeaf(node, offset) {
	      var array = offset === tailPos ? tail && tail.array : node && node.array;
	      var from = offset > left ? 0 : left - offset;
	      var to = right - offset;
	      if (to > SIZE) {
	        to = SIZE;
	      }
	      return function () {
	        if (from === to) {
	          return DONE;
	        }
	        var idx = reverse ? --to : from++;
	        return array && array[idx];
	      };
	    }

	    function iterateNode(node, level, offset) {
	      var values;
	      var array = node && node.array;
	      var from = offset > left ? 0 : left - offset >> level;
	      var to = (right - offset >> level) + 1;
	      if (to > SIZE) {
	        to = SIZE;
	      }
	      return function () {
	        do {
	          if (values) {
	            var value = values();
	            if (value !== DONE) {
	              return value;
	            }
	            values = null;
	          }
	          if (from === to) {
	            return DONE;
	          }
	          var idx = reverse ? --to : from++;
	          values = iterateNodeOrLeaf(array && array[idx], level - SHIFT, offset + (idx << level));
	        } while (true);
	      };
	    }
	  }

	  function makeList(origin, capacity, level, root, tail, ownerID, hash) {
	    var list = Object.create(ListPrototype);
	    list.size = capacity - origin;
	    list._origin = origin;
	    list._capacity = capacity;
	    list._level = level;
	    list._root = root;
	    list._tail = tail;
	    list.__ownerID = ownerID;
	    list.__hash = hash;
	    list.__altered = false;
	    return list;
	  }

	  var EMPTY_LIST;
	  function emptyList() {
	    return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
	  }

	  function updateList(list, index, value) {
	    index = wrapIndex(list, index);

	    if (index !== index) {
	      return list;
	    }

	    if (index >= list.size || index < 0) {
	      return list.withMutations(function (list) {
	        index < 0 ? setListBounds(list, index).set(0, value) : setListBounds(list, 0, index + 1).set(index, value);
	      });
	    }

	    index += list._origin;

	    var newTail = list._tail;
	    var newRoot = list._root;
	    var didAlter = MakeRef(DID_ALTER);
	    if (index >= getTailOffset(list._capacity)) {
	      newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
	    } else {
	      newRoot = updateVNode(newRoot, list.__ownerID, list._level, index, value, didAlter);
	    }

	    if (!didAlter.value) {
	      return list;
	    }

	    if (list.__ownerID) {
	      list._root = newRoot;
	      list._tail = newTail;
	      list.__hash = undefined;
	      list.__altered = true;
	      return list;
	    }
	    return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
	  }

	  function updateVNode(node, ownerID, level, index, value, didAlter) {
	    var idx = index >>> level & MASK;
	    var nodeHas = node && idx < node.array.length;
	    if (!nodeHas && value === undefined) {
	      return node;
	    }

	    var newNode;

	    if (level > 0) {
	      var lowerNode = node && node.array[idx];
	      var newLowerNode = updateVNode(lowerNode, ownerID, level - SHIFT, index, value, didAlter);
	      if (newLowerNode === lowerNode) {
	        return node;
	      }
	      newNode = editableVNode(node, ownerID);
	      newNode.array[idx] = newLowerNode;
	      return newNode;
	    }

	    if (nodeHas && node.array[idx] === value) {
	      return node;
	    }

	    SetRef(didAlter);

	    newNode = editableVNode(node, ownerID);
	    if (value === undefined && idx === newNode.array.length - 1) {
	      newNode.array.pop();
	    } else {
	      newNode.array[idx] = value;
	    }
	    return newNode;
	  }

	  function editableVNode(node, ownerID) {
	    if (ownerID && node && ownerID === node.ownerID) {
	      return node;
	    }
	    return new VNode(node ? node.array.slice() : [], ownerID);
	  }

	  function listNodeFor(list, rawIndex) {
	    if (rawIndex >= getTailOffset(list._capacity)) {
	      return list._tail;
	    }
	    if (rawIndex < 1 << list._level + SHIFT) {
	      var node = list._root;
	      var level = list._level;
	      while (node && level > 0) {
	        node = node.array[rawIndex >>> level & MASK];
	        level -= SHIFT;
	      }
	      return node;
	    }
	  }

	  function setListBounds(list, begin, end) {
	    // Sanitize begin & end using this shorthand for ToInt32(argument)
	    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
	    if (begin !== undefined) {
	      begin = begin | 0;
	    }
	    if (end !== undefined) {
	      end = end | 0;
	    }
	    var owner = list.__ownerID || new OwnerID();
	    var oldOrigin = list._origin;
	    var oldCapacity = list._capacity;
	    var newOrigin = oldOrigin + begin;
	    var newCapacity = end === undefined ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
	    if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
	      return list;
	    }

	    // If it's going to end after it starts, it's empty.
	    if (newOrigin >= newCapacity) {
	      return list.clear();
	    }

	    var newLevel = list._level;
	    var newRoot = list._root;

	    // New origin might need creating a higher root.
	    var offsetShift = 0;
	    while (newOrigin + offsetShift < 0) {
	      newRoot = new VNode(newRoot && newRoot.array.length ? [undefined, newRoot] : [], owner);
	      newLevel += SHIFT;
	      offsetShift += 1 << newLevel;
	    }
	    if (offsetShift) {
	      newOrigin += offsetShift;
	      oldOrigin += offsetShift;
	      newCapacity += offsetShift;
	      oldCapacity += offsetShift;
	    }

	    var oldTailOffset = getTailOffset(oldCapacity);
	    var newTailOffset = getTailOffset(newCapacity);

	    // New size might need creating a higher root.
	    while (newTailOffset >= 1 << newLevel + SHIFT) {
	      newRoot = new VNode(newRoot && newRoot.array.length ? [newRoot] : [], owner);
	      newLevel += SHIFT;
	    }

	    // Locate or create the new tail.
	    var oldTail = list._tail;
	    var newTail = newTailOffset < oldTailOffset ? listNodeFor(list, newCapacity - 1) : newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;

	    // Merge Tail into tree.
	    if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
	      newRoot = editableVNode(newRoot, owner);
	      var node = newRoot;
	      for (var level = newLevel; level > SHIFT; level -= SHIFT) {
	        var idx = oldTailOffset >>> level & MASK;
	        node = node.array[idx] = editableVNode(node.array[idx], owner);
	      }
	      node.array[oldTailOffset >>> SHIFT & MASK] = oldTail;
	    }

	    // If the size has been reduced, there's a chance the tail needs to be trimmed.
	    if (newCapacity < oldCapacity) {
	      newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
	    }

	    // If the new origin is within the tail, then we do not need a root.
	    if (newOrigin >= newTailOffset) {
	      newOrigin -= newTailOffset;
	      newCapacity -= newTailOffset;
	      newLevel = SHIFT;
	      newRoot = null;
	      newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);

	      // Otherwise, if the root has been trimmed, garbage collect.
	    } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
	        offsetShift = 0;

	        // Identify the new top root node of the subtree of the old root.
	        while (newRoot) {
	          var beginIndex = newOrigin >>> newLevel & MASK;
	          if (beginIndex !== newTailOffset >>> newLevel & MASK) {
	            break;
	          }
	          if (beginIndex) {
	            offsetShift += (1 << newLevel) * beginIndex;
	          }
	          newLevel -= SHIFT;
	          newRoot = newRoot.array[beginIndex];
	        }

	        // Trim the new sides of the new root.
	        if (newRoot && newOrigin > oldOrigin) {
	          newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
	        }
	        if (newRoot && newTailOffset < oldTailOffset) {
	          newRoot = newRoot.removeAfter(owner, newLevel, newTailOffset - offsetShift);
	        }
	        if (offsetShift) {
	          newOrigin -= offsetShift;
	          newCapacity -= offsetShift;
	        }
	      }

	    if (list.__ownerID) {
	      list.size = newCapacity - newOrigin;
	      list._origin = newOrigin;
	      list._capacity = newCapacity;
	      list._level = newLevel;
	      list._root = newRoot;
	      list._tail = newTail;
	      list.__hash = undefined;
	      list.__altered = true;
	      return list;
	    }
	    return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
	  }

	  function mergeIntoListWith(list, merger, iterables) {
	    var iters = [];
	    var maxSize = 0;
	    for (var ii = 0; ii < iterables.length; ii++) {
	      var value = iterables[ii];
	      var iter = IndexedIterable(value);
	      if (iter.size > maxSize) {
	        maxSize = iter.size;
	      }
	      if (!isIterable(value)) {
	        iter = iter.map(function (v) {
	          return fromJS(v);
	        });
	      }
	      iters.push(iter);
	    }
	    if (maxSize > list.size) {
	      list = list.setSize(maxSize);
	    }
	    return mergeIntoCollectionWith(list, merger, iters);
	  }

	  function getTailOffset(size) {
	    return size < SIZE ? 0 : size - 1 >>> SHIFT << SHIFT;
	  }

	  createClass(OrderedMap, Map);

	  // @pragma Construction

	  function OrderedMap(value) {
	    return value === null || value === undefined ? emptyOrderedMap() : isOrderedMap(value) ? value : emptyOrderedMap().withMutations(function (map) {
	      var iter = KeyedIterable(value);
	      assertNotInfinite(iter.size);
	      iter.forEach(function (v, k) {
	        return map.set(k, v);
	      });
	    });
	  }

	  OrderedMap.of = function () /*...values*/{
	    return this(arguments);
	  };

	  OrderedMap.prototype.toString = function () {
	    return this.__toString('OrderedMap {', '}');
	  };

	  // @pragma Access

	  OrderedMap.prototype.get = function (k, notSetValue) {
	    var index = this._map.get(k);
	    return index !== undefined ? this._list.get(index)[1] : notSetValue;
	  };

	  // @pragma Modification

	  OrderedMap.prototype.clear = function () {
	    if (this.size === 0) {
	      return this;
	    }
	    if (this.__ownerID) {
	      this.size = 0;
	      this._map.clear();
	      this._list.clear();
	      return this;
	    }
	    return emptyOrderedMap();
	  };

	  OrderedMap.prototype.set = function (k, v) {
	    return updateOrderedMap(this, k, v);
	  };

	  OrderedMap.prototype.remove = function (k) {
	    return updateOrderedMap(this, k, NOT_SET);
	  };

	  OrderedMap.prototype.wasAltered = function () {
	    return this._map.wasAltered() || this._list.wasAltered();
	  };

	  OrderedMap.prototype.__iterate = function (fn, reverse) {
	    var this$0 = this;
	    return this._list.__iterate(function (entry) {
	      return entry && fn(entry[1], entry[0], this$0);
	    }, reverse);
	  };

	  OrderedMap.prototype.__iterator = function (type, reverse) {
	    return this._list.fromEntrySeq().__iterator(type, reverse);
	  };

	  OrderedMap.prototype.__ensureOwner = function (ownerID) {
	    if (ownerID === this.__ownerID) {
	      return this;
	    }
	    var newMap = this._map.__ensureOwner(ownerID);
	    var newList = this._list.__ensureOwner(ownerID);
	    if (!ownerID) {
	      this.__ownerID = ownerID;
	      this._map = newMap;
	      this._list = newList;
	      return this;
	    }
	    return makeOrderedMap(newMap, newList, ownerID, this.__hash);
	  };

	  function isOrderedMap(maybeOrderedMap) {
	    return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
	  }

	  OrderedMap.isOrderedMap = isOrderedMap;

	  OrderedMap.prototype[IS_ORDERED_SENTINEL] = true;
	  OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;

	  function makeOrderedMap(map, list, ownerID, hash) {
	    var omap = Object.create(OrderedMap.prototype);
	    omap.size = map ? map.size : 0;
	    omap._map = map;
	    omap._list = list;
	    omap.__ownerID = ownerID;
	    omap.__hash = hash;
	    return omap;
	  }

	  var EMPTY_ORDERED_MAP;
	  function emptyOrderedMap() {
	    return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
	  }

	  function updateOrderedMap(omap, k, v) {
	    var map = omap._map;
	    var list = omap._list;
	    var i = map.get(k);
	    var has = i !== undefined;
	    var newMap;
	    var newList;
	    if (v === NOT_SET) {
	      // removed
	      if (!has) {
	        return omap;
	      }
	      if (list.size >= SIZE && list.size >= map.size * 2) {
	        newList = list.filter(function (entry, idx) {
	          return entry !== undefined && i !== idx;
	        });
	        newMap = newList.toKeyedSeq().map(function (entry) {
	          return entry[0];
	        }).flip().toMap();
	        if (omap.__ownerID) {
	          newMap.__ownerID = newList.__ownerID = omap.__ownerID;
	        }
	      } else {
	        newMap = map.remove(k);
	        newList = i === list.size - 1 ? list.pop() : list.set(i, undefined);
	      }
	    } else {
	      if (has) {
	        if (v === list.get(i)[1]) {
	          return omap;
	        }
	        newMap = map;
	        newList = list.set(i, [k, v]);
	      } else {
	        newMap = map.set(k, list.size);
	        newList = list.set(list.size, [k, v]);
	      }
	    }
	    if (omap.__ownerID) {
	      omap.size = newMap.size;
	      omap._map = newMap;
	      omap._list = newList;
	      omap.__hash = undefined;
	      return omap;
	    }
	    return makeOrderedMap(newMap, newList);
	  }

	  createClass(ToKeyedSequence, KeyedSeq);
	  function ToKeyedSequence(indexed, useKeys) {
	    this._iter = indexed;
	    this._useKeys = useKeys;
	    this.size = indexed.size;
	  }

	  ToKeyedSequence.prototype.get = function (key, notSetValue) {
	    return this._iter.get(key, notSetValue);
	  };

	  ToKeyedSequence.prototype.has = function (key) {
	    return this._iter.has(key);
	  };

	  ToKeyedSequence.prototype.valueSeq = function () {
	    return this._iter.valueSeq();
	  };

	  ToKeyedSequence.prototype.reverse = function () {
	    var this$0 = this;
	    var reversedSequence = reverseFactory(this, true);
	    if (!this._useKeys) {
	      reversedSequence.valueSeq = function () {
	        return this$0._iter.toSeq().reverse();
	      };
	    }
	    return reversedSequence;
	  };

	  ToKeyedSequence.prototype.map = function (mapper, context) {
	    var this$0 = this;
	    var mappedSequence = mapFactory(this, mapper, context);
	    if (!this._useKeys) {
	      mappedSequence.valueSeq = function () {
	        return this$0._iter.toSeq().map(mapper, context);
	      };
	    }
	    return mappedSequence;
	  };

	  ToKeyedSequence.prototype.__iterate = function (fn, reverse) {
	    var this$0 = this;
	    var ii;
	    return this._iter.__iterate(this._useKeys ? function (v, k) {
	      return fn(v, k, this$0);
	    } : (ii = reverse ? resolveSize(this) : 0, function (v) {
	      return fn(v, reverse ? --ii : ii++, this$0);
	    }), reverse);
	  };

	  ToKeyedSequence.prototype.__iterator = function (type, reverse) {
	    if (this._useKeys) {
	      return this._iter.__iterator(type, reverse);
	    }
	    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	    var ii = reverse ? resolveSize(this) : 0;
	    return new Iterator(function () {
	      var step = iterator.next();
	      return step.done ? step : iteratorValue(type, reverse ? --ii : ii++, step.value, step);
	    });
	  };

	  ToKeyedSequence.prototype[IS_ORDERED_SENTINEL] = true;

	  createClass(ToIndexedSequence, IndexedSeq);
	  function ToIndexedSequence(iter) {
	    this._iter = iter;
	    this.size = iter.size;
	  }

	  ToIndexedSequence.prototype.includes = function (value) {
	    return this._iter.includes(value);
	  };

	  ToIndexedSequence.prototype.__iterate = function (fn, reverse) {
	    var this$0 = this;
	    var iterations = 0;
	    return this._iter.__iterate(function (v) {
	      return fn(v, iterations++, this$0);
	    }, reverse);
	  };

	  ToIndexedSequence.prototype.__iterator = function (type, reverse) {
	    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	    var iterations = 0;
	    return new Iterator(function () {
	      var step = iterator.next();
	      return step.done ? step : iteratorValue(type, iterations++, step.value, step);
	    });
	  };

	  createClass(ToSetSequence, SetSeq);
	  function ToSetSequence(iter) {
	    this._iter = iter;
	    this.size = iter.size;
	  }

	  ToSetSequence.prototype.has = function (key) {
	    return this._iter.includes(key);
	  };

	  ToSetSequence.prototype.__iterate = function (fn, reverse) {
	    var this$0 = this;
	    return this._iter.__iterate(function (v) {
	      return fn(v, v, this$0);
	    }, reverse);
	  };

	  ToSetSequence.prototype.__iterator = function (type, reverse) {
	    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	    return new Iterator(function () {
	      var step = iterator.next();
	      return step.done ? step : iteratorValue(type, step.value, step.value, step);
	    });
	  };

	  createClass(FromEntriesSequence, KeyedSeq);
	  function FromEntriesSequence(entries) {
	    this._iter = entries;
	    this.size = entries.size;
	  }

	  FromEntriesSequence.prototype.entrySeq = function () {
	    return this._iter.toSeq();
	  };

	  FromEntriesSequence.prototype.__iterate = function (fn, reverse) {
	    var this$0 = this;
	    return this._iter.__iterate(function (entry) {
	      // Check if entry exists first so array access doesn't throw for holes
	      // in the parent iteration.
	      if (entry) {
	        validateEntry(entry);
	        var indexedIterable = isIterable(entry);
	        return fn(indexedIterable ? entry.get(1) : entry[1], indexedIterable ? entry.get(0) : entry[0], this$0);
	      }
	    }, reverse);
	  };

	  FromEntriesSequence.prototype.__iterator = function (type, reverse) {
	    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	    return new Iterator(function () {
	      while (true) {
	        var step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	        var entry = step.value;
	        // Check if entry exists first so array access doesn't throw for holes
	        // in the parent iteration.
	        if (entry) {
	          validateEntry(entry);
	          var indexedIterable = isIterable(entry);
	          return iteratorValue(type, indexedIterable ? entry.get(0) : entry[0], indexedIterable ? entry.get(1) : entry[1], step);
	        }
	      }
	    });
	  };

	  ToIndexedSequence.prototype.cacheResult = ToKeyedSequence.prototype.cacheResult = ToSetSequence.prototype.cacheResult = FromEntriesSequence.prototype.cacheResult = cacheResultThrough;

	  function flipFactory(iterable) {
	    var flipSequence = makeSequence(iterable);
	    flipSequence._iter = iterable;
	    flipSequence.size = iterable.size;
	    flipSequence.flip = function () {
	      return iterable;
	    };
	    flipSequence.reverse = function () {
	      var reversedSequence = iterable.reverse.apply(this); // super.reverse()
	      reversedSequence.flip = function () {
	        return iterable.reverse();
	      };
	      return reversedSequence;
	    };
	    flipSequence.has = function (key) {
	      return iterable.includes(key);
	    };
	    flipSequence.includes = function (key) {
	      return iterable.has(key);
	    };
	    flipSequence.cacheResult = cacheResultThrough;
	    flipSequence.__iterateUncached = function (fn, reverse) {
	      var this$0 = this;
	      return iterable.__iterate(function (v, k) {
	        return fn(k, v, this$0) !== false;
	      }, reverse);
	    };
	    flipSequence.__iteratorUncached = function (type, reverse) {
	      if (type === ITERATE_ENTRIES) {
	        var iterator = iterable.__iterator(type, reverse);
	        return new Iterator(function () {
	          var step = iterator.next();
	          if (!step.done) {
	            var k = step.value[0];
	            step.value[0] = step.value[1];
	            step.value[1] = k;
	          }
	          return step;
	        });
	      }
	      return iterable.__iterator(type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES, reverse);
	    };
	    return flipSequence;
	  }

	  function mapFactory(iterable, mapper, context) {
	    var mappedSequence = makeSequence(iterable);
	    mappedSequence.size = iterable.size;
	    mappedSequence.has = function (key) {
	      return iterable.has(key);
	    };
	    mappedSequence.get = function (key, notSetValue) {
	      var v = iterable.get(key, NOT_SET);
	      return v === NOT_SET ? notSetValue : mapper.call(context, v, key, iterable);
	    };
	    mappedSequence.__iterateUncached = function (fn, reverse) {
	      var this$0 = this;
	      return iterable.__iterate(function (v, k, c) {
	        return fn(mapper.call(context, v, k, c), k, this$0) !== false;
	      }, reverse);
	    };
	    mappedSequence.__iteratorUncached = function (type, reverse) {
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      return new Iterator(function () {
	        var step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	        var entry = step.value;
	        var key = entry[0];
	        return iteratorValue(type, key, mapper.call(context, entry[1], key, iterable), step);
	      });
	    };
	    return mappedSequence;
	  }

	  function reverseFactory(iterable, useKeys) {
	    var reversedSequence = makeSequence(iterable);
	    reversedSequence._iter = iterable;
	    reversedSequence.size = iterable.size;
	    reversedSequence.reverse = function () {
	      return iterable;
	    };
	    if (iterable.flip) {
	      reversedSequence.flip = function () {
	        var flipSequence = flipFactory(iterable);
	        flipSequence.reverse = function () {
	          return iterable.flip();
	        };
	        return flipSequence;
	      };
	    }
	    reversedSequence.get = function (key, notSetValue) {
	      return iterable.get(useKeys ? key : -1 - key, notSetValue);
	    };
	    reversedSequence.has = function (key) {
	      return iterable.has(useKeys ? key : -1 - key);
	    };
	    reversedSequence.includes = function (value) {
	      return iterable.includes(value);
	    };
	    reversedSequence.cacheResult = cacheResultThrough;
	    reversedSequence.__iterate = function (fn, reverse) {
	      var this$0 = this;
	      return iterable.__iterate(function (v, k) {
	        return fn(v, k, this$0);
	      }, !reverse);
	    };
	    reversedSequence.__iterator = function (type, reverse) {
	      return iterable.__iterator(type, !reverse);
	    };
	    return reversedSequence;
	  }

	  function filterFactory(iterable, predicate, context, useKeys) {
	    var filterSequence = makeSequence(iterable);
	    if (useKeys) {
	      filterSequence.has = function (key) {
	        var v = iterable.get(key, NOT_SET);
	        return v !== NOT_SET && !!predicate.call(context, v, key, iterable);
	      };
	      filterSequence.get = function (key, notSetValue) {
	        var v = iterable.get(key, NOT_SET);
	        return v !== NOT_SET && predicate.call(context, v, key, iterable) ? v : notSetValue;
	      };
	    }
	    filterSequence.__iterateUncached = function (fn, reverse) {
	      var this$0 = this;
	      var iterations = 0;
	      iterable.__iterate(function (v, k, c) {
	        if (predicate.call(context, v, k, c)) {
	          iterations++;
	          return fn(v, useKeys ? k : iterations - 1, this$0);
	        }
	      }, reverse);
	      return iterations;
	    };
	    filterSequence.__iteratorUncached = function (type, reverse) {
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      var iterations = 0;
	      return new Iterator(function () {
	        while (true) {
	          var step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	          var entry = step.value;
	          var key = entry[0];
	          var value = entry[1];
	          if (predicate.call(context, value, key, iterable)) {
	            return iteratorValue(type, useKeys ? key : iterations++, value, step);
	          }
	        }
	      });
	    };
	    return filterSequence;
	  }

	  function countByFactory(iterable, grouper, context) {
	    var groups = Map().asMutable();
	    iterable.__iterate(function (v, k) {
	      groups.update(grouper.call(context, v, k, iterable), 0, function (a) {
	        return a + 1;
	      });
	    });
	    return groups.asImmutable();
	  }

	  function groupByFactory(iterable, grouper, context) {
	    var isKeyedIter = isKeyed(iterable);
	    var groups = (isOrdered(iterable) ? OrderedMap() : Map()).asMutable();
	    iterable.__iterate(function (v, k) {
	      groups.update(grouper.call(context, v, k, iterable), function (a) {
	        return a = a || [], a.push(isKeyedIter ? [k, v] : v), a;
	      });
	    });
	    var coerce = iterableClass(iterable);
	    return groups.map(function (arr) {
	      return reify(iterable, coerce(arr));
	    });
	  }

	  function sliceFactory(iterable, begin, end, useKeys) {
	    var originalSize = iterable.size;

	    // Sanitize begin & end using this shorthand for ToInt32(argument)
	    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
	    if (begin !== undefined) {
	      begin = begin | 0;
	    }
	    if (end !== undefined) {
	      if (end === Infinity) {
	        end = originalSize;
	      } else {
	        end = end | 0;
	      }
	    }

	    if (wholeSlice(begin, end, originalSize)) {
	      return iterable;
	    }

	    var resolvedBegin = resolveBegin(begin, originalSize);
	    var resolvedEnd = resolveEnd(end, originalSize);

	    // begin or end will be NaN if they were provided as negative numbers and
	    // this iterable's size is unknown. In that case, cache first so there is
	    // a known size and these do not resolve to NaN.
	    if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
	      return sliceFactory(iterable.toSeq().cacheResult(), begin, end, useKeys);
	    }

	    // Note: resolvedEnd is undefined when the original sequence's length is
	    // unknown and this slice did not supply an end and should contain all
	    // elements after resolvedBegin.
	    // In that case, resolvedSize will be NaN and sliceSize will remain undefined.
	    var resolvedSize = resolvedEnd - resolvedBegin;
	    var sliceSize;
	    if (resolvedSize === resolvedSize) {
	      sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
	    }

	    var sliceSeq = makeSequence(iterable);

	    // If iterable.size is undefined, the size of the realized sliceSeq is
	    // unknown at this point unless the number of items to slice is 0
	    sliceSeq.size = sliceSize === 0 ? sliceSize : iterable.size && sliceSize || undefined;

	    if (!useKeys && isSeq(iterable) && sliceSize >= 0) {
	      sliceSeq.get = function (index, notSetValue) {
	        index = wrapIndex(this, index);
	        return index >= 0 && index < sliceSize ? iterable.get(index + resolvedBegin, notSetValue) : notSetValue;
	      };
	    }

	    sliceSeq.__iterateUncached = function (fn, reverse) {
	      var this$0 = this;
	      if (sliceSize === 0) {
	        return 0;
	      }
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var skipped = 0;
	      var isSkipping = true;
	      var iterations = 0;
	      iterable.__iterate(function (v, k) {
	        if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
	          iterations++;
	          return fn(v, useKeys ? k : iterations - 1, this$0) !== false && iterations !== sliceSize;
	        }
	      });
	      return iterations;
	    };

	    sliceSeq.__iteratorUncached = function (type, reverse) {
	      if (sliceSize !== 0 && reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      // Don't bother instantiating parent iterator if taking 0.
	      var iterator = sliceSize !== 0 && iterable.__iterator(type, reverse);
	      var skipped = 0;
	      var iterations = 0;
	      return new Iterator(function () {
	        while (skipped++ < resolvedBegin) {
	          iterator.next();
	        }
	        if (++iterations > sliceSize) {
	          return iteratorDone();
	        }
	        var step = iterator.next();
	        if (useKeys || type === ITERATE_VALUES) {
	          return step;
	        } else if (type === ITERATE_KEYS) {
	          return iteratorValue(type, iterations - 1, undefined, step);
	        } else {
	          return iteratorValue(type, iterations - 1, step.value[1], step);
	        }
	      });
	    };

	    return sliceSeq;
	  }

	  function takeWhileFactory(iterable, predicate, context) {
	    var takeSequence = makeSequence(iterable);
	    takeSequence.__iterateUncached = function (fn, reverse) {
	      var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var iterations = 0;
	      iterable.__iterate(function (v, k, c) {
	        return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$0);
	      });
	      return iterations;
	    };
	    takeSequence.__iteratorUncached = function (type, reverse) {
	      var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      var iterating = true;
	      return new Iterator(function () {
	        if (!iterating) {
	          return iteratorDone();
	        }
	        var step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	        var entry = step.value;
	        var k = entry[0];
	        var v = entry[1];
	        if (!predicate.call(context, v, k, this$0)) {
	          iterating = false;
	          return iteratorDone();
	        }
	        return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
	      });
	    };
	    return takeSequence;
	  }

	  function skipWhileFactory(iterable, predicate, context, useKeys) {
	    var skipSequence = makeSequence(iterable);
	    skipSequence.__iterateUncached = function (fn, reverse) {
	      var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var isSkipping = true;
	      var iterations = 0;
	      iterable.__iterate(function (v, k, c) {
	        if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
	          iterations++;
	          return fn(v, useKeys ? k : iterations - 1, this$0);
	        }
	      });
	      return iterations;
	    };
	    skipSequence.__iteratorUncached = function (type, reverse) {
	      var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      var skipping = true;
	      var iterations = 0;
	      return new Iterator(function () {
	        var step, k, v;
	        do {
	          step = iterator.next();
	          if (step.done) {
	            if (useKeys || type === ITERATE_VALUES) {
	              return step;
	            } else if (type === ITERATE_KEYS) {
	              return iteratorValue(type, iterations++, undefined, step);
	            } else {
	              return iteratorValue(type, iterations++, step.value[1], step);
	            }
	          }
	          var entry = step.value;
	          k = entry[0];
	          v = entry[1];
	          skipping && (skipping = predicate.call(context, v, k, this$0));
	        } while (skipping);
	        return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
	      });
	    };
	    return skipSequence;
	  }

	  function concatFactory(iterable, values) {
	    var isKeyedIterable = isKeyed(iterable);
	    var iters = [iterable].concat(values).map(function (v) {
	      if (!isIterable(v)) {
	        v = isKeyedIterable ? keyedSeqFromValue(v) : indexedSeqFromValue(Array.isArray(v) ? v : [v]);
	      } else if (isKeyedIterable) {
	        v = KeyedIterable(v);
	      }
	      return v;
	    }).filter(function (v) {
	      return v.size !== 0;
	    });

	    if (iters.length === 0) {
	      return iterable;
	    }

	    if (iters.length === 1) {
	      var singleton = iters[0];
	      if (singleton === iterable || isKeyedIterable && isKeyed(singleton) || isIndexed(iterable) && isIndexed(singleton)) {
	        return singleton;
	      }
	    }

	    var concatSeq = new ArraySeq(iters);
	    if (isKeyedIterable) {
	      concatSeq = concatSeq.toKeyedSeq();
	    } else if (!isIndexed(iterable)) {
	      concatSeq = concatSeq.toSetSeq();
	    }
	    concatSeq = concatSeq.flatten(true);
	    concatSeq.size = iters.reduce(function (sum, seq) {
	      if (sum !== undefined) {
	        var size = seq.size;
	        if (size !== undefined) {
	          return sum + size;
	        }
	      }
	    }, 0);
	    return concatSeq;
	  }

	  function flattenFactory(iterable, depth, useKeys) {
	    var flatSequence = makeSequence(iterable);
	    flatSequence.__iterateUncached = function (fn, reverse) {
	      var iterations = 0;
	      var stopped = false;
	      function flatDeep(iter, currentDepth) {
	        var this$0 = this;
	        iter.__iterate(function (v, k) {
	          if ((!depth || currentDepth < depth) && isIterable(v)) {
	            flatDeep(v, currentDepth + 1);
	          } else if (fn(v, useKeys ? k : iterations++, this$0) === false) {
	            stopped = true;
	          }
	          return !stopped;
	        }, reverse);
	      }
	      flatDeep(iterable, 0);
	      return iterations;
	    };
	    flatSequence.__iteratorUncached = function (type, reverse) {
	      var iterator = iterable.__iterator(type, reverse);
	      var stack = [];
	      var iterations = 0;
	      return new Iterator(function () {
	        while (iterator) {
	          var step = iterator.next();
	          if (step.done !== false) {
	            iterator = stack.pop();
	            continue;
	          }
	          var v = step.value;
	          if (type === ITERATE_ENTRIES) {
	            v = v[1];
	          }
	          if ((!depth || stack.length < depth) && isIterable(v)) {
	            stack.push(iterator);
	            iterator = v.__iterator(type, reverse);
	          } else {
	            return useKeys ? step : iteratorValue(type, iterations++, v, step);
	          }
	        }
	        return iteratorDone();
	      });
	    };
	    return flatSequence;
	  }

	  function flatMapFactory(iterable, mapper, context) {
	    var coerce = iterableClass(iterable);
	    return iterable.toSeq().map(function (v, k) {
	      return coerce(mapper.call(context, v, k, iterable));
	    }).flatten(true);
	  }

	  function interposeFactory(iterable, separator) {
	    var interposedSequence = makeSequence(iterable);
	    interposedSequence.size = iterable.size && iterable.size * 2 - 1;
	    interposedSequence.__iterateUncached = function (fn, reverse) {
	      var this$0 = this;
	      var iterations = 0;
	      iterable.__iterate(function (v, k) {
	        return (!iterations || fn(separator, iterations++, this$0) !== false) && fn(v, iterations++, this$0) !== false;
	      }, reverse);
	      return iterations;
	    };
	    interposedSequence.__iteratorUncached = function (type, reverse) {
	      var iterator = iterable.__iterator(ITERATE_VALUES, reverse);
	      var iterations = 0;
	      var step;
	      return new Iterator(function () {
	        if (!step || iterations % 2) {
	          step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	        }
	        return iterations % 2 ? iteratorValue(type, iterations++, separator) : iteratorValue(type, iterations++, step.value, step);
	      });
	    };
	    return interposedSequence;
	  }

	  function sortFactory(iterable, comparator, mapper) {
	    if (!comparator) {
	      comparator = defaultComparator;
	    }
	    var isKeyedIterable = isKeyed(iterable);
	    var index = 0;
	    var entries = iterable.toSeq().map(function (v, k) {
	      return [k, v, index++, mapper ? mapper(v, k, iterable) : v];
	    }).toArray();
	    entries.sort(function (a, b) {
	      return comparator(a[3], b[3]) || a[2] - b[2];
	    }).forEach(isKeyedIterable ? function (v, i) {
	      entries[i].length = 2;
	    } : function (v, i) {
	      entries[i] = v[1];
	    });
	    return isKeyedIterable ? KeyedSeq(entries) : isIndexed(iterable) ? IndexedSeq(entries) : SetSeq(entries);
	  }

	  function maxFactory(iterable, comparator, mapper) {
	    if (!comparator) {
	      comparator = defaultComparator;
	    }
	    if (mapper) {
	      var entry = iterable.toSeq().map(function (v, k) {
	        return [v, mapper(v, k, iterable)];
	      }).reduce(function (a, b) {
	        return maxCompare(comparator, a[1], b[1]) ? b : a;
	      });
	      return entry && entry[0];
	    } else {
	      return iterable.reduce(function (a, b) {
	        return maxCompare(comparator, a, b) ? b : a;
	      });
	    }
	  }

	  function maxCompare(comparator, a, b) {
	    var comp = comparator(b, a);
	    // b is considered the new max if the comparator declares them equal, but
	    // they are not equal and b is in fact a nullish value.
	    return comp === 0 && b !== a && (b === undefined || b === null || b !== b) || comp > 0;
	  }

	  function zipWithFactory(keyIter, zipper, iters) {
	    var zipSequence = makeSequence(keyIter);
	    zipSequence.size = new ArraySeq(iters).map(function (i) {
	      return i.size;
	    }).min();
	    // Note: this a generic base implementation of __iterate in terms of
	    // __iterator which may be more generically useful in the future.
	    zipSequence.__iterate = function (fn, reverse) {
	      /* generic:
	      var iterator = this.__iterator(ITERATE_ENTRIES, reverse);
	      var step;
	      var iterations = 0;
	      while (!(step = iterator.next()).done) {
	        iterations++;
	        if (fn(step.value[1], step.value[0], this) === false) {
	          break;
	        }
	      }
	      return iterations;
	      */
	      // indexed:
	      var iterator = this.__iterator(ITERATE_VALUES, reverse);
	      var step;
	      var iterations = 0;
	      while (!(step = iterator.next()).done) {
	        if (fn(step.value, iterations++, this) === false) {
	          break;
	        }
	      }
	      return iterations;
	    };
	    zipSequence.__iteratorUncached = function (type, reverse) {
	      var iterators = iters.map(function (i) {
	        return i = Iterable(i), getIterator(reverse ? i.reverse() : i);
	      });
	      var iterations = 0;
	      var isDone = false;
	      return new Iterator(function () {
	        var steps;
	        if (!isDone) {
	          steps = iterators.map(function (i) {
	            return i.next();
	          });
	          isDone = steps.some(function (s) {
	            return s.done;
	          });
	        }
	        if (isDone) {
	          return iteratorDone();
	        }
	        return iteratorValue(type, iterations++, zipper.apply(null, steps.map(function (s) {
	          return s.value;
	        })));
	      });
	    };
	    return zipSequence;
	  }

	  // #pragma Helper Functions

	  function reify(iter, seq) {
	    return isSeq(iter) ? seq : iter.constructor(seq);
	  }

	  function validateEntry(entry) {
	    if (entry !== Object(entry)) {
	      throw new TypeError('Expected [K, V] tuple: ' + entry);
	    }
	  }

	  function resolveSize(iter) {
	    assertNotInfinite(iter.size);
	    return ensureSize(iter);
	  }

	  function iterableClass(iterable) {
	    return isKeyed(iterable) ? KeyedIterable : isIndexed(iterable) ? IndexedIterable : SetIterable;
	  }

	  function makeSequence(iterable) {
	    return Object.create((isKeyed(iterable) ? KeyedSeq : isIndexed(iterable) ? IndexedSeq : SetSeq).prototype);
	  }

	  function cacheResultThrough() {
	    if (this._iter.cacheResult) {
	      this._iter.cacheResult();
	      this.size = this._iter.size;
	      return this;
	    } else {
	      return Seq.prototype.cacheResult.call(this);
	    }
	  }

	  function defaultComparator(a, b) {
	    return a > b ? 1 : a < b ? -1 : 0;
	  }

	  function forceIterator(keyPath) {
	    var iter = getIterator(keyPath);
	    if (!iter) {
	      // Array might not be iterable in this environment, so we need a fallback
	      // to our wrapped type.
	      if (!isArrayLike(keyPath)) {
	        throw new TypeError('Expected iterable or array-like: ' + keyPath);
	      }
	      iter = getIterator(Iterable(keyPath));
	    }
	    return iter;
	  }

	  createClass(Record, KeyedCollection);

	  function Record(defaultValues, name) {
	    var hasInitialized;

	    var RecordType = function Record(values) {
	      if (values instanceof RecordType) {
	        return values;
	      }
	      if (!(this instanceof RecordType)) {
	        return new RecordType(values);
	      }
	      if (!hasInitialized) {
	        hasInitialized = true;
	        var keys = Object.keys(defaultValues);
	        setProps(RecordTypePrototype, keys);
	        RecordTypePrototype.size = keys.length;
	        RecordTypePrototype._name = name;
	        RecordTypePrototype._keys = keys;
	        RecordTypePrototype._defaultValues = defaultValues;
	      }
	      this._map = Map(values);
	    };

	    var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
	    RecordTypePrototype.constructor = RecordType;

	    return RecordType;
	  }

	  Record.prototype.toString = function () {
	    return this.__toString(recordName(this) + ' {', '}');
	  };

	  // @pragma Access

	  Record.prototype.has = function (k) {
	    return this._defaultValues.hasOwnProperty(k);
	  };

	  Record.prototype.get = function (k, notSetValue) {
	    if (!this.has(k)) {
	      return notSetValue;
	    }
	    var defaultVal = this._defaultValues[k];
	    return this._map ? this._map.get(k, defaultVal) : defaultVal;
	  };

	  // @pragma Modification

	  Record.prototype.clear = function () {
	    if (this.__ownerID) {
	      this._map && this._map.clear();
	      return this;
	    }
	    var RecordType = this.constructor;
	    return RecordType._empty || (RecordType._empty = makeRecord(this, emptyMap()));
	  };

	  Record.prototype.set = function (k, v) {
	    if (!this.has(k)) {
	      throw new Error('Cannot set unknown key "' + k + '" on ' + recordName(this));
	    }
	    if (this._map && !this._map.has(k)) {
	      var defaultVal = this._defaultValues[k];
	      if (v === defaultVal) {
	        return this;
	      }
	    }
	    var newMap = this._map && this._map.set(k, v);
	    if (this.__ownerID || newMap === this._map) {
	      return this;
	    }
	    return makeRecord(this, newMap);
	  };

	  Record.prototype.remove = function (k) {
	    if (!this.has(k)) {
	      return this;
	    }
	    var newMap = this._map && this._map.remove(k);
	    if (this.__ownerID || newMap === this._map) {
	      return this;
	    }
	    return makeRecord(this, newMap);
	  };

	  Record.prototype.wasAltered = function () {
	    return this._map.wasAltered();
	  };

	  Record.prototype.__iterator = function (type, reverse) {
	    var this$0 = this;
	    return KeyedIterable(this._defaultValues).map(function (_, k) {
	      return this$0.get(k);
	    }).__iterator(type, reverse);
	  };

	  Record.prototype.__iterate = function (fn, reverse) {
	    var this$0 = this;
	    return KeyedIterable(this._defaultValues).map(function (_, k) {
	      return this$0.get(k);
	    }).__iterate(fn, reverse);
	  };

	  Record.prototype.__ensureOwner = function (ownerID) {
	    if (ownerID === this.__ownerID) {
	      return this;
	    }
	    var newMap = this._map && this._map.__ensureOwner(ownerID);
	    if (!ownerID) {
	      this.__ownerID = ownerID;
	      this._map = newMap;
	      return this;
	    }
	    return makeRecord(this, newMap, ownerID);
	  };

	  var RecordPrototype = Record.prototype;
	  RecordPrototype[DELETE] = RecordPrototype.remove;
	  RecordPrototype.deleteIn = RecordPrototype.removeIn = MapPrototype.removeIn;
	  RecordPrototype.merge = MapPrototype.merge;
	  RecordPrototype.mergeWith = MapPrototype.mergeWith;
	  RecordPrototype.mergeIn = MapPrototype.mergeIn;
	  RecordPrototype.mergeDeep = MapPrototype.mergeDeep;
	  RecordPrototype.mergeDeepWith = MapPrototype.mergeDeepWith;
	  RecordPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
	  RecordPrototype.setIn = MapPrototype.setIn;
	  RecordPrototype.update = MapPrototype.update;
	  RecordPrototype.updateIn = MapPrototype.updateIn;
	  RecordPrototype.withMutations = MapPrototype.withMutations;
	  RecordPrototype.asMutable = MapPrototype.asMutable;
	  RecordPrototype.asImmutable = MapPrototype.asImmutable;

	  function makeRecord(likeRecord, map, ownerID) {
	    var record = Object.create(Object.getPrototypeOf(likeRecord));
	    record._map = map;
	    record.__ownerID = ownerID;
	    return record;
	  }

	  function recordName(record) {
	    return record._name || record.constructor.name || 'Record';
	  }

	  function setProps(prototype, names) {
	    try {
	      names.forEach(setProp.bind(undefined, prototype));
	    } catch (error) {
	      // Object.defineProperty failed. Probably IE8.
	    }
	  }

	  function setProp(prototype, name) {
	    Object.defineProperty(prototype, name, {
	      get: function get() {
	        return this.get(name);
	      },
	      set: function set(value) {
	        invariant(this.__ownerID, 'Cannot set on an immutable record.');
	        this.set(name, value);
	      }
	    });
	  }

	  createClass(Set, SetCollection);

	  // @pragma Construction

	  function Set(value) {
	    return value === null || value === undefined ? emptySet() : isSet(value) && !isOrdered(value) ? value : emptySet().withMutations(function (set) {
	      var iter = SetIterable(value);
	      assertNotInfinite(iter.size);
	      iter.forEach(function (v) {
	        return set.add(v);
	      });
	    });
	  }

	  Set.of = function () /*...values*/{
	    return this(arguments);
	  };

	  Set.fromKeys = function (value) {
	    return this(KeyedIterable(value).keySeq());
	  };

	  Set.prototype.toString = function () {
	    return this.__toString('Set {', '}');
	  };

	  // @pragma Access

	  Set.prototype.has = function (value) {
	    return this._map.has(value);
	  };

	  // @pragma Modification

	  Set.prototype.add = function (value) {
	    return updateSet(this, this._map.set(value, true));
	  };

	  Set.prototype.remove = function (value) {
	    return updateSet(this, this._map.remove(value));
	  };

	  Set.prototype.clear = function () {
	    return updateSet(this, this._map.clear());
	  };

	  // @pragma Composition

	  Set.prototype.union = function () {
	    var iters = SLICE$0.call(arguments, 0);
	    iters = iters.filter(function (x) {
	      return x.size !== 0;
	    });
	    if (iters.length === 0) {
	      return this;
	    }
	    if (this.size === 0 && !this.__ownerID && iters.length === 1) {
	      return this.constructor(iters[0]);
	    }
	    return this.withMutations(function (set) {
	      for (var ii = 0; ii < iters.length; ii++) {
	        SetIterable(iters[ii]).forEach(function (value) {
	          return set.add(value);
	        });
	      }
	    });
	  };

	  Set.prototype.intersect = function () {
	    var iters = SLICE$0.call(arguments, 0);
	    if (iters.length === 0) {
	      return this;
	    }
	    iters = iters.map(function (iter) {
	      return SetIterable(iter);
	    });
	    var originalSet = this;
	    return this.withMutations(function (set) {
	      originalSet.forEach(function (value) {
	        if (!iters.every(function (iter) {
	          return iter.includes(value);
	        })) {
	          set.remove(value);
	        }
	      });
	    });
	  };

	  Set.prototype.subtract = function () {
	    var iters = SLICE$0.call(arguments, 0);
	    if (iters.length === 0) {
	      return this;
	    }
	    iters = iters.map(function (iter) {
	      return SetIterable(iter);
	    });
	    var originalSet = this;
	    return this.withMutations(function (set) {
	      originalSet.forEach(function (value) {
	        if (iters.some(function (iter) {
	          return iter.includes(value);
	        })) {
	          set.remove(value);
	        }
	      });
	    });
	  };

	  Set.prototype.merge = function () {
	    return this.union.apply(this, arguments);
	  };

	  Set.prototype.mergeWith = function (merger) {
	    var iters = SLICE$0.call(arguments, 1);
	    return this.union.apply(this, iters);
	  };

	  Set.prototype.sort = function (comparator) {
	    // Late binding
	    return OrderedSet(sortFactory(this, comparator));
	  };

	  Set.prototype.sortBy = function (mapper, comparator) {
	    // Late binding
	    return OrderedSet(sortFactory(this, comparator, mapper));
	  };

	  Set.prototype.wasAltered = function () {
	    return this._map.wasAltered();
	  };

	  Set.prototype.__iterate = function (fn, reverse) {
	    var this$0 = this;
	    return this._map.__iterate(function (_, k) {
	      return fn(k, k, this$0);
	    }, reverse);
	  };

	  Set.prototype.__iterator = function (type, reverse) {
	    return this._map.map(function (_, k) {
	      return k;
	    }).__iterator(type, reverse);
	  };

	  Set.prototype.__ensureOwner = function (ownerID) {
	    if (ownerID === this.__ownerID) {
	      return this;
	    }
	    var newMap = this._map.__ensureOwner(ownerID);
	    if (!ownerID) {
	      this.__ownerID = ownerID;
	      this._map = newMap;
	      return this;
	    }
	    return this.__make(newMap, ownerID);
	  };

	  function isSet(maybeSet) {
	    return !!(maybeSet && maybeSet[IS_SET_SENTINEL]);
	  }

	  Set.isSet = isSet;

	  var IS_SET_SENTINEL = '@@__IMMUTABLE_SET__@@';

	  var SetPrototype = Set.prototype;
	  SetPrototype[IS_SET_SENTINEL] = true;
	  SetPrototype[DELETE] = SetPrototype.remove;
	  SetPrototype.mergeDeep = SetPrototype.merge;
	  SetPrototype.mergeDeepWith = SetPrototype.mergeWith;
	  SetPrototype.withMutations = MapPrototype.withMutations;
	  SetPrototype.asMutable = MapPrototype.asMutable;
	  SetPrototype.asImmutable = MapPrototype.asImmutable;

	  SetPrototype.__empty = emptySet;
	  SetPrototype.__make = makeSet;

	  function updateSet(set, newMap) {
	    if (set.__ownerID) {
	      set.size = newMap.size;
	      set._map = newMap;
	      return set;
	    }
	    return newMap === set._map ? set : newMap.size === 0 ? set.__empty() : set.__make(newMap);
	  }

	  function makeSet(map, ownerID) {
	    var set = Object.create(SetPrototype);
	    set.size = map ? map.size : 0;
	    set._map = map;
	    set.__ownerID = ownerID;
	    return set;
	  }

	  var EMPTY_SET;
	  function emptySet() {
	    return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
	  }

	  createClass(OrderedSet, Set);

	  // @pragma Construction

	  function OrderedSet(value) {
	    return value === null || value === undefined ? emptyOrderedSet() : isOrderedSet(value) ? value : emptyOrderedSet().withMutations(function (set) {
	      var iter = SetIterable(value);
	      assertNotInfinite(iter.size);
	      iter.forEach(function (v) {
	        return set.add(v);
	      });
	    });
	  }

	  OrderedSet.of = function () /*...values*/{
	    return this(arguments);
	  };

	  OrderedSet.fromKeys = function (value) {
	    return this(KeyedIterable(value).keySeq());
	  };

	  OrderedSet.prototype.toString = function () {
	    return this.__toString('OrderedSet {', '}');
	  };

	  function isOrderedSet(maybeOrderedSet) {
	    return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
	  }

	  OrderedSet.isOrderedSet = isOrderedSet;

	  var OrderedSetPrototype = OrderedSet.prototype;
	  OrderedSetPrototype[IS_ORDERED_SENTINEL] = true;

	  OrderedSetPrototype.__empty = emptyOrderedSet;
	  OrderedSetPrototype.__make = makeOrderedSet;

	  function makeOrderedSet(map, ownerID) {
	    var set = Object.create(OrderedSetPrototype);
	    set.size = map ? map.size : 0;
	    set._map = map;
	    set.__ownerID = ownerID;
	    return set;
	  }

	  var EMPTY_ORDERED_SET;
	  function emptyOrderedSet() {
	    return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
	  }

	  createClass(Stack, IndexedCollection);

	  // @pragma Construction

	  function Stack(value) {
	    return value === null || value === undefined ? emptyStack() : isStack(value) ? value : emptyStack().unshiftAll(value);
	  }

	  Stack.of = function () /*...values*/{
	    return this(arguments);
	  };

	  Stack.prototype.toString = function () {
	    return this.__toString('Stack [', ']');
	  };

	  // @pragma Access

	  Stack.prototype.get = function (index, notSetValue) {
	    var head = this._head;
	    index = wrapIndex(this, index);
	    while (head && index--) {
	      head = head.next;
	    }
	    return head ? head.value : notSetValue;
	  };

	  Stack.prototype.peek = function () {
	    return this._head && this._head.value;
	  };

	  // @pragma Modification

	  Stack.prototype.push = function () /*...values*/{
	    if (arguments.length === 0) {
	      return this;
	    }
	    var newSize = this.size + arguments.length;
	    var head = this._head;
	    for (var ii = arguments.length - 1; ii >= 0; ii--) {
	      head = {
	        value: arguments[ii],
	        next: head
	      };
	    }
	    if (this.__ownerID) {
	      this.size = newSize;
	      this._head = head;
	      this.__hash = undefined;
	      this.__altered = true;
	      return this;
	    }
	    return makeStack(newSize, head);
	  };

	  Stack.prototype.pushAll = function (iter) {
	    iter = IndexedIterable(iter);
	    if (iter.size === 0) {
	      return this;
	    }
	    assertNotInfinite(iter.size);
	    var newSize = this.size;
	    var head = this._head;
	    iter.reverse().forEach(function (value) {
	      newSize++;
	      head = {
	        value: value,
	        next: head
	      };
	    });
	    if (this.__ownerID) {
	      this.size = newSize;
	      this._head = head;
	      this.__hash = undefined;
	      this.__altered = true;
	      return this;
	    }
	    return makeStack(newSize, head);
	  };

	  Stack.prototype.pop = function () {
	    return this.slice(1);
	  };

	  Stack.prototype.unshift = function () /*...values*/{
	    return this.push.apply(this, arguments);
	  };

	  Stack.prototype.unshiftAll = function (iter) {
	    return this.pushAll(iter);
	  };

	  Stack.prototype.shift = function () {
	    return this.pop.apply(this, arguments);
	  };

	  Stack.prototype.clear = function () {
	    if (this.size === 0) {
	      return this;
	    }
	    if (this.__ownerID) {
	      this.size = 0;
	      this._head = undefined;
	      this.__hash = undefined;
	      this.__altered = true;
	      return this;
	    }
	    return emptyStack();
	  };

	  Stack.prototype.slice = function (begin, end) {
	    if (wholeSlice(begin, end, this.size)) {
	      return this;
	    }
	    var resolvedBegin = resolveBegin(begin, this.size);
	    var resolvedEnd = resolveEnd(end, this.size);
	    if (resolvedEnd !== this.size) {
	      // super.slice(begin, end);
	      return IndexedCollection.prototype.slice.call(this, begin, end);
	    }
	    var newSize = this.size - resolvedBegin;
	    var head = this._head;
	    while (resolvedBegin--) {
	      head = head.next;
	    }
	    if (this.__ownerID) {
	      this.size = newSize;
	      this._head = head;
	      this.__hash = undefined;
	      this.__altered = true;
	      return this;
	    }
	    return makeStack(newSize, head);
	  };

	  // @pragma Mutability

	  Stack.prototype.__ensureOwner = function (ownerID) {
	    if (ownerID === this.__ownerID) {
	      return this;
	    }
	    if (!ownerID) {
	      this.__ownerID = ownerID;
	      this.__altered = false;
	      return this;
	    }
	    return makeStack(this.size, this._head, ownerID, this.__hash);
	  };

	  // @pragma Iteration

	  Stack.prototype.__iterate = function (fn, reverse) {
	    if (reverse) {
	      return this.reverse().__iterate(fn);
	    }
	    var iterations = 0;
	    var node = this._head;
	    while (node) {
	      if (fn(node.value, iterations++, this) === false) {
	        break;
	      }
	      node = node.next;
	    }
	    return iterations;
	  };

	  Stack.prototype.__iterator = function (type, reverse) {
	    if (reverse) {
	      return this.reverse().__iterator(type);
	    }
	    var iterations = 0;
	    var node = this._head;
	    return new Iterator(function () {
	      if (node) {
	        var value = node.value;
	        node = node.next;
	        return iteratorValue(type, iterations++, value);
	      }
	      return iteratorDone();
	    });
	  };

	  function isStack(maybeStack) {
	    return !!(maybeStack && maybeStack[IS_STACK_SENTINEL]);
	  }

	  Stack.isStack = isStack;

	  var IS_STACK_SENTINEL = '@@__IMMUTABLE_STACK__@@';

	  var StackPrototype = Stack.prototype;
	  StackPrototype[IS_STACK_SENTINEL] = true;
	  StackPrototype.withMutations = MapPrototype.withMutations;
	  StackPrototype.asMutable = MapPrototype.asMutable;
	  StackPrototype.asImmutable = MapPrototype.asImmutable;
	  StackPrototype.wasAltered = MapPrototype.wasAltered;

	  function makeStack(size, head, ownerID, hash) {
	    var map = Object.create(StackPrototype);
	    map.size = size;
	    map._head = head;
	    map.__ownerID = ownerID;
	    map.__hash = hash;
	    map.__altered = false;
	    return map;
	  }

	  var EMPTY_STACK;
	  function emptyStack() {
	    return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
	  }

	  /**
	   * Contributes additional methods to a constructor
	   */
	  function mixin(ctor, methods) {
	    var keyCopier = function keyCopier(key) {
	      ctor.prototype[key] = methods[key];
	    };
	    Object.keys(methods).forEach(keyCopier);
	    Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(methods).forEach(keyCopier);
	    return ctor;
	  }

	  Iterable.Iterator = Iterator;

	  mixin(Iterable, {

	    // ### Conversion to other types

	    toArray: function toArray() {
	      assertNotInfinite(this.size);
	      var array = new Array(this.size || 0);
	      this.valueSeq().__iterate(function (v, i) {
	        array[i] = v;
	      });
	      return array;
	    },

	    toIndexedSeq: function toIndexedSeq() {
	      return new ToIndexedSequence(this);
	    },

	    toJS: function toJS() {
	      return this.toSeq().map(function (value) {
	        return value && typeof value.toJS === 'function' ? value.toJS() : value;
	      }).__toJS();
	    },

	    toJSON: function toJSON() {
	      return this.toSeq().map(function (value) {
	        return value && typeof value.toJSON === 'function' ? value.toJSON() : value;
	      }).__toJS();
	    },

	    toKeyedSeq: function toKeyedSeq() {
	      return new ToKeyedSequence(this, true);
	    },

	    toMap: function toMap() {
	      // Use Late Binding here to solve the circular dependency.
	      return Map(this.toKeyedSeq());
	    },

	    toObject: function toObject() {
	      assertNotInfinite(this.size);
	      var object = {};
	      this.__iterate(function (v, k) {
	        object[k] = v;
	      });
	      return object;
	    },

	    toOrderedMap: function toOrderedMap() {
	      // Use Late Binding here to solve the circular dependency.
	      return OrderedMap(this.toKeyedSeq());
	    },

	    toOrderedSet: function toOrderedSet() {
	      // Use Late Binding here to solve the circular dependency.
	      return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
	    },

	    toSet: function toSet() {
	      // Use Late Binding here to solve the circular dependency.
	      return Set(isKeyed(this) ? this.valueSeq() : this);
	    },

	    toSetSeq: function toSetSeq() {
	      return new ToSetSequence(this);
	    },

	    toSeq: function toSeq() {
	      return isIndexed(this) ? this.toIndexedSeq() : isKeyed(this) ? this.toKeyedSeq() : this.toSetSeq();
	    },

	    toStack: function toStack() {
	      // Use Late Binding here to solve the circular dependency.
	      return Stack(isKeyed(this) ? this.valueSeq() : this);
	    },

	    toList: function toList() {
	      // Use Late Binding here to solve the circular dependency.
	      return List(isKeyed(this) ? this.valueSeq() : this);
	    },

	    // ### Common JavaScript methods and properties

	    toString: function toString() {
	      return '[Iterable]';
	    },

	    __toString: function __toString(head, tail) {
	      if (this.size === 0) {
	        return head + tail;
	      }
	      return head + ' ' + this.toSeq().map(this.__toStringMapper).join(', ') + ' ' + tail;
	    },

	    // ### ES6 Collection methods (ES6 Array and Map)

	    concat: function concat() {
	      var values = SLICE$0.call(arguments, 0);
	      return reify(this, concatFactory(this, values));
	    },

	    includes: function includes(searchValue) {
	      return this.some(function (value) {
	        return is(value, searchValue);
	      });
	    },

	    entries: function entries() {
	      return this.__iterator(ITERATE_ENTRIES);
	    },

	    every: function every(predicate, context) {
	      assertNotInfinite(this.size);
	      var returnValue = true;
	      this.__iterate(function (v, k, c) {
	        if (!predicate.call(context, v, k, c)) {
	          returnValue = false;
	          return false;
	        }
	      });
	      return returnValue;
	    },

	    filter: function filter(predicate, context) {
	      return reify(this, filterFactory(this, predicate, context, true));
	    },

	    find: function find(predicate, context, notSetValue) {
	      var entry = this.findEntry(predicate, context);
	      return entry ? entry[1] : notSetValue;
	    },

	    forEach: function forEach(sideEffect, context) {
	      assertNotInfinite(this.size);
	      return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
	    },

	    join: function join(separator) {
	      assertNotInfinite(this.size);
	      separator = separator !== undefined ? '' + separator : ',';
	      var joined = '';
	      var isFirst = true;
	      this.__iterate(function (v) {
	        isFirst ? isFirst = false : joined += separator;
	        joined += v !== null && v !== undefined ? v.toString() : '';
	      });
	      return joined;
	    },

	    keys: function keys() {
	      return this.__iterator(ITERATE_KEYS);
	    },

	    map: function map(mapper, context) {
	      return reify(this, mapFactory(this, mapper, context));
	    },

	    reduce: function reduce(reducer, initialReduction, context) {
	      assertNotInfinite(this.size);
	      var reduction;
	      var useFirst;
	      if (arguments.length < 2) {
	        useFirst = true;
	      } else {
	        reduction = initialReduction;
	      }
	      this.__iterate(function (v, k, c) {
	        if (useFirst) {
	          useFirst = false;
	          reduction = v;
	        } else {
	          reduction = reducer.call(context, reduction, v, k, c);
	        }
	      });
	      return reduction;
	    },

	    reduceRight: function reduceRight(reducer, initialReduction, context) {
	      var reversed = this.toKeyedSeq().reverse();
	      return reversed.reduce.apply(reversed, arguments);
	    },

	    reverse: function reverse() {
	      return reify(this, reverseFactory(this, true));
	    },

	    slice: function slice(begin, end) {
	      return reify(this, sliceFactory(this, begin, end, true));
	    },

	    some: function some(predicate, context) {
	      return !this.every(not(predicate), context);
	    },

	    sort: function sort(comparator) {
	      return reify(this, sortFactory(this, comparator));
	    },

	    values: function values() {
	      return this.__iterator(ITERATE_VALUES);
	    },

	    // ### More sequential methods

	    butLast: function butLast() {
	      return this.slice(0, -1);
	    },

	    isEmpty: function isEmpty() {
	      return this.size !== undefined ? this.size === 0 : !this.some(function () {
	        return true;
	      });
	    },

	    count: function count(predicate, context) {
	      return ensureSize(predicate ? this.toSeq().filter(predicate, context) : this);
	    },

	    countBy: function countBy(grouper, context) {
	      return countByFactory(this, grouper, context);
	    },

	    equals: function equals(other) {
	      return deepEqual(this, other);
	    },

	    entrySeq: function entrySeq() {
	      var iterable = this;
	      if (iterable._cache) {
	        // We cache as an entries array, so we can just return the cache!
	        return new ArraySeq(iterable._cache);
	      }
	      var entriesSequence = iterable.toSeq().map(entryMapper).toIndexedSeq();
	      entriesSequence.fromEntrySeq = function () {
	        return iterable.toSeq();
	      };
	      return entriesSequence;
	    },

	    filterNot: function filterNot(predicate, context) {
	      return this.filter(not(predicate), context);
	    },

	    findEntry: function findEntry(predicate, context, notSetValue) {
	      var found = notSetValue;
	      this.__iterate(function (v, k, c) {
	        if (predicate.call(context, v, k, c)) {
	          found = [k, v];
	          return false;
	        }
	      });
	      return found;
	    },

	    findKey: function findKey(predicate, context) {
	      var entry = this.findEntry(predicate, context);
	      return entry && entry[0];
	    },

	    findLast: function findLast(predicate, context, notSetValue) {
	      return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
	    },

	    findLastEntry: function findLastEntry(predicate, context, notSetValue) {
	      return this.toKeyedSeq().reverse().findEntry(predicate, context, notSetValue);
	    },

	    findLastKey: function findLastKey(predicate, context) {
	      return this.toKeyedSeq().reverse().findKey(predicate, context);
	    },

	    first: function first() {
	      return this.find(returnTrue);
	    },

	    flatMap: function flatMap(mapper, context) {
	      return reify(this, flatMapFactory(this, mapper, context));
	    },

	    flatten: function flatten(depth) {
	      return reify(this, flattenFactory(this, depth, true));
	    },

	    fromEntrySeq: function fromEntrySeq() {
	      return new FromEntriesSequence(this);
	    },

	    get: function get(searchKey, notSetValue) {
	      return this.find(function (_, key) {
	        return is(key, searchKey);
	      }, undefined, notSetValue);
	    },

	    getIn: function getIn(searchKeyPath, notSetValue) {
	      var nested = this;
	      // Note: in an ES6 environment, we would prefer:
	      // for (var key of searchKeyPath) {
	      var iter = forceIterator(searchKeyPath);
	      var step;
	      while (!(step = iter.next()).done) {
	        var key = step.value;
	        nested = nested && nested.get ? nested.get(key, NOT_SET) : NOT_SET;
	        if (nested === NOT_SET) {
	          return notSetValue;
	        }
	      }
	      return nested;
	    },

	    groupBy: function groupBy(grouper, context) {
	      return groupByFactory(this, grouper, context);
	    },

	    has: function has(searchKey) {
	      return this.get(searchKey, NOT_SET) !== NOT_SET;
	    },

	    hasIn: function hasIn(searchKeyPath) {
	      return this.getIn(searchKeyPath, NOT_SET) !== NOT_SET;
	    },

	    isSubset: function isSubset(iter) {
	      iter = typeof iter.includes === 'function' ? iter : Iterable(iter);
	      return this.every(function (value) {
	        return iter.includes(value);
	      });
	    },

	    isSuperset: function isSuperset(iter) {
	      iter = typeof iter.isSubset === 'function' ? iter : Iterable(iter);
	      return iter.isSubset(this);
	    },

	    keyOf: function keyOf(searchValue) {
	      return this.findKey(function (value) {
	        return is(value, searchValue);
	      });
	    },

	    keySeq: function keySeq() {
	      return this.toSeq().map(keyMapper).toIndexedSeq();
	    },

	    last: function last() {
	      return this.toSeq().reverse().first();
	    },

	    lastKeyOf: function lastKeyOf(searchValue) {
	      return this.toKeyedSeq().reverse().keyOf(searchValue);
	    },

	    max: function max(comparator) {
	      return maxFactory(this, comparator);
	    },

	    maxBy: function maxBy(mapper, comparator) {
	      return maxFactory(this, comparator, mapper);
	    },

	    min: function min(comparator) {
	      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator);
	    },

	    minBy: function minBy(mapper, comparator) {
	      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator, mapper);
	    },

	    rest: function rest() {
	      return this.slice(1);
	    },

	    skip: function skip(amount) {
	      return this.slice(Math.max(0, amount));
	    },

	    skipLast: function skipLast(amount) {
	      return reify(this, this.toSeq().reverse().skip(amount).reverse());
	    },

	    skipWhile: function skipWhile(predicate, context) {
	      return reify(this, skipWhileFactory(this, predicate, context, true));
	    },

	    skipUntil: function skipUntil(predicate, context) {
	      return this.skipWhile(not(predicate), context);
	    },

	    sortBy: function sortBy(mapper, comparator) {
	      return reify(this, sortFactory(this, comparator, mapper));
	    },

	    take: function take(amount) {
	      return this.slice(0, Math.max(0, amount));
	    },

	    takeLast: function takeLast(amount) {
	      return reify(this, this.toSeq().reverse().take(amount).reverse());
	    },

	    takeWhile: function takeWhile(predicate, context) {
	      return reify(this, takeWhileFactory(this, predicate, context));
	    },

	    takeUntil: function takeUntil(predicate, context) {
	      return this.takeWhile(not(predicate), context);
	    },

	    valueSeq: function valueSeq() {
	      return this.toIndexedSeq();
	    },

	    // ### Hashable Object

	    hashCode: function hashCode() {
	      return this.__hash || (this.__hash = hashIterable(this));
	    }

	    // ### Internal

	    // abstract __iterate(fn, reverse)

	    // abstract __iterator(type, reverse)
	  });

	  // var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
	  // var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
	  // var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
	  // var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

	  var IterablePrototype = Iterable.prototype;
	  IterablePrototype[IS_ITERABLE_SENTINEL] = true;
	  IterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.values;
	  IterablePrototype.__toJS = IterablePrototype.toArray;
	  IterablePrototype.__toStringMapper = quoteString;
	  IterablePrototype.inspect = IterablePrototype.toSource = function () {
	    return this.toString();
	  };
	  IterablePrototype.chain = IterablePrototype.flatMap;
	  IterablePrototype.contains = IterablePrototype.includes;

	  mixin(KeyedIterable, {

	    // ### More sequential methods

	    flip: function flip() {
	      return reify(this, flipFactory(this));
	    },

	    mapEntries: function mapEntries(mapper, context) {
	      var this$0 = this;
	      var iterations = 0;
	      return reify(this, this.toSeq().map(function (v, k) {
	        return mapper.call(context, [k, v], iterations++, this$0);
	      }).fromEntrySeq());
	    },

	    mapKeys: function mapKeys(mapper, context) {
	      var this$0 = this;
	      return reify(this, this.toSeq().flip().map(function (k, v) {
	        return mapper.call(context, k, v, this$0);
	      }).flip());
	    }

	  });

	  var KeyedIterablePrototype = KeyedIterable.prototype;
	  KeyedIterablePrototype[IS_KEYED_SENTINEL] = true;
	  KeyedIterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.entries;
	  KeyedIterablePrototype.__toJS = IterablePrototype.toObject;
	  KeyedIterablePrototype.__toStringMapper = function (v, k) {
	    return JSON.stringify(k) + ': ' + quoteString(v);
	  };

	  mixin(IndexedIterable, {

	    // ### Conversion to other types

	    toKeyedSeq: function toKeyedSeq() {
	      return new ToKeyedSequence(this, false);
	    },

	    // ### ES6 Collection methods (ES6 Array and Map)

	    filter: function filter(predicate, context) {
	      return reify(this, filterFactory(this, predicate, context, false));
	    },

	    findIndex: function findIndex(predicate, context) {
	      var entry = this.findEntry(predicate, context);
	      return entry ? entry[0] : -1;
	    },

	    indexOf: function indexOf(searchValue) {
	      var key = this.keyOf(searchValue);
	      return key === undefined ? -1 : key;
	    },

	    lastIndexOf: function lastIndexOf(searchValue) {
	      var key = this.lastKeyOf(searchValue);
	      return key === undefined ? -1 : key;
	    },

	    reverse: function reverse() {
	      return reify(this, reverseFactory(this, false));
	    },

	    slice: function slice(begin, end) {
	      return reify(this, sliceFactory(this, begin, end, false));
	    },

	    splice: function splice(index, removeNum /*, ...values*/) {
	      var numArgs = arguments.length;
	      removeNum = Math.max(removeNum | 0, 0);
	      if (numArgs === 0 || numArgs === 2 && !removeNum) {
	        return this;
	      }
	      // If index is negative, it should resolve relative to the size of the
	      // collection. However size may be expensive to compute if not cached, so
	      // only call count() if the number is in fact negative.
	      index = resolveBegin(index, index < 0 ? this.count() : this.size);
	      var spliced = this.slice(0, index);
	      return reify(this, numArgs === 1 ? spliced : spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum)));
	    },

	    // ### More collection methods

	    findLastIndex: function findLastIndex(predicate, context) {
	      var entry = this.findLastEntry(predicate, context);
	      return entry ? entry[0] : -1;
	    },

	    first: function first() {
	      return this.get(0);
	    },

	    flatten: function flatten(depth) {
	      return reify(this, flattenFactory(this, depth, false));
	    },

	    get: function get(index, notSetValue) {
	      index = wrapIndex(this, index);
	      return index < 0 || this.size === Infinity || this.size !== undefined && index > this.size ? notSetValue : this.find(function (_, key) {
	        return key === index;
	      }, undefined, notSetValue);
	    },

	    has: function has(index) {
	      index = wrapIndex(this, index);
	      return index >= 0 && (this.size !== undefined ? this.size === Infinity || index < this.size : this.indexOf(index) !== -1);
	    },

	    interpose: function interpose(separator) {
	      return reify(this, interposeFactory(this, separator));
	    },

	    interleave: function interleave() /*...iterables*/{
	      var iterables = [this].concat(arrCopy(arguments));
	      var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, iterables);
	      var interleaved = zipped.flatten(true);
	      if (zipped.size) {
	        interleaved.size = zipped.size * iterables.length;
	      }
	      return reify(this, interleaved);
	    },

	    keySeq: function keySeq() {
	      return Range(0, this.size);
	    },

	    last: function last() {
	      return this.get(-1);
	    },

	    skipWhile: function skipWhile(predicate, context) {
	      return reify(this, skipWhileFactory(this, predicate, context, false));
	    },

	    zip: function zip() /*, ...iterables */{
	      var iterables = [this].concat(arrCopy(arguments));
	      return reify(this, zipWithFactory(this, defaultZipper, iterables));
	    },

	    zipWith: function zipWith(zipper /*, ...iterables */) {
	      var iterables = arrCopy(arguments);
	      iterables[0] = this;
	      return reify(this, zipWithFactory(this, zipper, iterables));
	    }

	  });

	  IndexedIterable.prototype[IS_INDEXED_SENTINEL] = true;
	  IndexedIterable.prototype[IS_ORDERED_SENTINEL] = true;

	  mixin(SetIterable, {

	    // ### ES6 Collection methods (ES6 Array and Map)

	    get: function get(value, notSetValue) {
	      return this.has(value) ? value : notSetValue;
	    },

	    includes: function includes(value) {
	      return this.has(value);
	    },

	    // ### More sequential methods

	    keySeq: function keySeq() {
	      return this.valueSeq();
	    }

	  });

	  SetIterable.prototype.has = IterablePrototype.includes;
	  SetIterable.prototype.contains = SetIterable.prototype.includes;

	  // Mixin subclasses

	  mixin(KeyedSeq, KeyedIterable.prototype);
	  mixin(IndexedSeq, IndexedIterable.prototype);
	  mixin(SetSeq, SetIterable.prototype);

	  mixin(KeyedCollection, KeyedIterable.prototype);
	  mixin(IndexedCollection, IndexedIterable.prototype);
	  mixin(SetCollection, SetIterable.prototype);

	  // #pragma Helper functions

	  function keyMapper(v, k) {
	    return k;
	  }

	  function entryMapper(v, k) {
	    return [k, v];
	  }

	  function not(predicate) {
	    return function () {
	      return !predicate.apply(this, arguments);
	    };
	  }

	  function neg(predicate) {
	    return function () {
	      return -predicate.apply(this, arguments);
	    };
	  }

	  function quoteString(value) {
	    return typeof value === 'string' ? JSON.stringify(value) : String(value);
	  }

	  function defaultZipper() {
	    return arrCopy(arguments);
	  }

	  function defaultNegComparator(a, b) {
	    return a < b ? 1 : a > b ? -1 : 0;
	  }

	  function hashIterable(iterable) {
	    if (iterable.size === Infinity) {
	      return 0;
	    }
	    var ordered = isOrdered(iterable);
	    var keyed = isKeyed(iterable);
	    var h = ordered ? 1 : 0;
	    var size = iterable.__iterate(keyed ? ordered ? function (v, k) {
	      h = 31 * h + hashMerge(hash(v), hash(k)) | 0;
	    } : function (v, k) {
	      h = h + hashMerge(hash(v), hash(k)) | 0;
	    } : ordered ? function (v) {
	      h = 31 * h + hash(v) | 0;
	    } : function (v) {
	      h = h + hash(v) | 0;
	    });
	    return murmurHashOfSize(size, h);
	  }

	  function murmurHashOfSize(size, h) {
	    h = imul(h, 0xCC9E2D51);
	    h = imul(h << 15 | h >>> -15, 0x1B873593);
	    h = imul(h << 13 | h >>> -13, 5);
	    h = (h + 0xE6546B64 | 0) ^ size;
	    h = imul(h ^ h >>> 16, 0x85EBCA6B);
	    h = imul(h ^ h >>> 13, 0xC2B2AE35);
	    h = smi(h ^ h >>> 16);
	    return h;
	  }

	  function hashMerge(a, b) {
	    return a ^ b + 0x9E3779B9 + (a << 6) + (a >> 2) | 0; // int
	  }

	  var Immutable = {

	    Iterable: Iterable,

	    Seq: Seq,
	    Collection: Collection,
	    Map: Map,
	    OrderedMap: OrderedMap,
	    List: List,
	    Stack: Stack,
	    Set: Set,
	    OrderedSet: OrderedSet,

	    Record: Record,
	    Range: Range,
	    Repeat: Repeat,

	    is: is,
	    fromJS: fromJS

	  };

	  return Immutable;
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var nunjucks = __webpack_require__(17);
	var env;
	if (!nunjucks.currentEnv){
		env = nunjucks.currentEnv = new nunjucks.Environment([], { autoescape: true });
	} else {
		env = nunjucks.currentEnv;
	}
	var dependencies = nunjucks.webpackDependencies || (nunjucks.webpackDependencies = {});




	var shim = __webpack_require__(18);


	(function() {(nunjucks.nunjucksPrecompiled = nunjucks.nunjucksPrecompiled || {})["components/notify/notify.njk"] = (function() {
	function root(env, context, frame, runtime, cb) {
	var lineno = null;
	var colno = null;
	var output = "";
	try {
	var parentTemplate = null;
	output += "\n\n\n<section class=\"notify notify--";
	output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "position"), env.opts.autoescape);
	output += " notify--";
	output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "state"), env.opts.autoescape);
	output += " js-notify-state--hide\">\n  \n  <section class=\"notify__icon\">\n    <span class=\"ion ion-ios-notifications-outline\"></span>\n  </section>\n  \n  ";
	output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "content"), env.opts.autoescape);
	output += "\n  \n  <section class=\"notify__close\">\n    <span class=\"ion ion-ios-close\"></span>\n  </section>\n  \n</section><!-- /.notify -->\n";
	if(parentTemplate) {
	parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
	} else {
	cb(null, output);
	}
	;
	} catch (e) {
	  cb(runtime.handleError(e, lineno, colno));
	}
	}
	return {
	root: root
	};

	})();
	})();



	module.exports = shim(nunjucks, env, nunjucks.nunjucksPrecompiled["components/notify/notify.njk"] , dependencies)

/***/ },
/* 17 */
/***/ function(module, exports) {

	/*! Browser bundle of nunjucks 2.4.2 (slim, only works with precompiled templates) */
	var nunjucks =
	/******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};

	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {

	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;

	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};

	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;

	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}


	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;

	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;

	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";

	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var lib = __webpack_require__(1);
		var env = __webpack_require__(2);
		var Loader = __webpack_require__(11);
		var loaders = __webpack_require__(3);
		var precompile = __webpack_require__(3);

		module.exports = {};
		module.exports.Environment = env.Environment;
		module.exports.Template = env.Template;

		module.exports.Loader = Loader;
		module.exports.FileSystemLoader = loaders.FileSystemLoader;
		module.exports.PrecompiledLoader = loaders.PrecompiledLoader;
		module.exports.WebLoader = loaders.WebLoader;

		module.exports.compiler = __webpack_require__(3);
		module.exports.parser = __webpack_require__(3);
		module.exports.lexer = __webpack_require__(3);
		module.exports.runtime = __webpack_require__(8);
		module.exports.lib = lib;
		module.exports.nodes = __webpack_require__(3);

		module.exports.installJinjaCompat = __webpack_require__(12);

		// A single instance of an environment, since this is so commonly used

		var e;
		module.exports.configure = function(templatesPath, opts) {
		    opts = opts || {};
		    if(lib.isObject(templatesPath)) {
		        opts = templatesPath;
		        templatesPath = null;
		    }

		    var TemplateLoader;
		    if(loaders.FileSystemLoader) {
		        TemplateLoader = new loaders.FileSystemLoader(templatesPath, {
		            watch: opts.watch,
		            noCache: opts.noCache
		        });
		    }
		    else if(loaders.WebLoader) {
		        TemplateLoader = new loaders.WebLoader(templatesPath, {
		            useCache: opts.web && opts.web.useCache,
		            async: opts.web && opts.web.async
		        });
		    }

		    e = new env.Environment(TemplateLoader, opts);

		    if(opts && opts.express) {
		        e.express(opts.express);
		    }

		    return e;
		};

		module.exports.compile = function(src, env, path, eagerCompile) {
		    if(!e) {
		        module.exports.configure();
		    }
		    return new module.exports.Template(src, env, path, eagerCompile);
		};

		module.exports.render = function(name, ctx, cb) {
		    if(!e) {
		        module.exports.configure();
		    }

		    return e.render(name, ctx, cb);
		};

		module.exports.renderString = function(src, ctx, cb) {
		    if(!e) {
		        module.exports.configure();
		    }

		    return e.renderString(src, ctx, cb);
		};

		if(precompile) {
		    module.exports.precompile = precompile.precompile;
		    module.exports.precompileString = precompile.precompileString;
		}


	/***/ },
	/* 1 */
	/***/ function(module, exports) {

		'use strict';

		var ArrayProto = Array.prototype;
		var ObjProto = Object.prototype;

		var escapeMap = {
		    '&': '&amp;',
		    '"': '&quot;',
		    '\'': '&#39;',
		    '<': '&lt;',
		    '>': '&gt;'
		};

		var escapeRegex = /[&"'<>]/g;

		var lookupEscape = function(ch) {
		    return escapeMap[ch];
		};

		var exports = module.exports = {};

		exports.prettifyError = function(path, withInternals, err) {
		    // jshint -W022
		    // http://jslinterrors.com/do-not-assign-to-the-exception-parameter
		    if (!err.Update) {
		        // not one of ours, cast it
		        err = new exports.TemplateError(err);
		    }
		    err.Update(path);

		    // Unless they marked the dev flag, show them a trace from here
		    if (!withInternals) {
		        var old = err;
		        err = new Error(old.message);
		        err.name = old.name;
		    }

		    return err;
		};

		exports.TemplateError = function(message, lineno, colno) {
		    var err = this;

		    if (message instanceof Error) { // for casting regular js errors
		        err = message;
		        message = message.name + ': ' + message.message;

		        try {
		            if(err.name = '') {}
		        }
		        catch(e) {
		            // If we can't set the name of the error object in this
		            // environment, don't use it
		            err = this;
		        }
		    } else {
		        if(Error.captureStackTrace) {
		            Error.captureStackTrace(err);
		        }
		    }

		    err.name = 'Template render error';
		    err.message = message;
		    err.lineno = lineno;
		    err.colno = colno;
		    err.firstUpdate = true;

		    err.Update = function(path) {
		        var message = '(' + (path || 'unknown path') + ')';

		        // only show lineno + colno next to path of template
		        // where error occurred
		        if (this.firstUpdate) {
		            if(this.lineno && this.colno) {
		                message += ' [Line ' + this.lineno + ', Column ' + this.colno + ']';
		            }
		            else if(this.lineno) {
		                message += ' [Line ' + this.lineno + ']';
		            }
		        }

		        message += '\n ';
		        if (this.firstUpdate) {
		            message += ' ';
		        }

		        this.message = message + (this.message || '');
		        this.firstUpdate = false;
		        return this;
		    };

		    return err;
		};

		exports.TemplateError.prototype = Error.prototype;

		exports.escape = function(val) {
		  return val.replace(escapeRegex, lookupEscape);
		};

		exports.isFunction = function(obj) {
		    return ObjProto.toString.call(obj) === '[object Function]';
		};

		exports.isArray = Array.isArray || function(obj) {
		    return ObjProto.toString.call(obj) === '[object Array]';
		};

		exports.isString = function(obj) {
		    return ObjProto.toString.call(obj) === '[object String]';
		};

		exports.isObject = function(obj) {
		    return ObjProto.toString.call(obj) === '[object Object]';
		};

		exports.groupBy = function(obj, val) {
		    var result = {};
		    var iterator = exports.isFunction(val) ? val : function(obj) { return obj[val]; };
		    for(var i=0; i<obj.length; i++) {
		        var value = obj[i];
		        var key = iterator(value, i);
		        (result[key] || (result[key] = [])).push(value);
		    }
		    return result;
		};

		exports.toArray = function(obj) {
		    return Array.prototype.slice.call(obj);
		};

		exports.without = function(array) {
		    var result = [];
		    if (!array) {
		        return result;
		    }
		    var index = -1,
		    length = array.length,
		    contains = exports.toArray(arguments).slice(1);

		    while(++index < length) {
		        if(exports.indexOf(contains, array[index]) === -1) {
		            result.push(array[index]);
		        }
		    }
		    return result;
		};

		exports.extend = function(obj, obj2) {
		    for(var k in obj2) {
		        obj[k] = obj2[k];
		    }
		    return obj;
		};

		exports.repeat = function(char_, n) {
		    var str = '';
		    for(var i=0; i<n; i++) {
		        str += char_;
		    }
		    return str;
		};

		exports.each = function(obj, func, context) {
		    if(obj == null) {
		        return;
		    }

		    if(ArrayProto.each && obj.each === ArrayProto.each) {
		        obj.forEach(func, context);
		    }
		    else if(obj.length === +obj.length) {
		        for(var i=0, l=obj.length; i<l; i++) {
		            func.call(context, obj[i], i, obj);
		        }
		    }
		};

		exports.map = function(obj, func) {
		    var results = [];
		    if(obj == null) {
		        return results;
		    }

		    if(ArrayProto.map && obj.map === ArrayProto.map) {
		        return obj.map(func);
		    }

		    for(var i=0; i<obj.length; i++) {
		        results[results.length] = func(obj[i], i);
		    }

		    if(obj.length === +obj.length) {
		        results.length = obj.length;
		    }

		    return results;
		};

		exports.asyncIter = function(arr, iter, cb) {
		    var i = -1;

		    function next() {
		        i++;

		        if(i < arr.length) {
		            iter(arr[i], i, next, cb);
		        }
		        else {
		            cb();
		        }
		    }

		    next();
		};

		exports.asyncFor = function(obj, iter, cb) {
		    var keys = exports.keys(obj);
		    var len = keys.length;
		    var i = -1;

		    function next() {
		        i++;
		        var k = keys[i];

		        if(i < len) {
		            iter(k, obj[k], i, len, next);
		        }
		        else {
		            cb();
		        }
		    }

		    next();
		};

		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Polyfill
		exports.indexOf = Array.prototype.indexOf ?
		    function (arr, searchElement, fromIndex) {
		        return Array.prototype.indexOf.call(arr, searchElement, fromIndex);
		    } :
		    function (arr, searchElement, fromIndex) {
		        var length = this.length >>> 0; // Hack to convert object.length to a UInt32

		        fromIndex = +fromIndex || 0;

		        if(Math.abs(fromIndex) === Infinity) {
		            fromIndex = 0;
		        }

		        if(fromIndex < 0) {
		            fromIndex += length;
		            if (fromIndex < 0) {
		                fromIndex = 0;
		            }
		        }

		        for(;fromIndex < length; fromIndex++) {
		            if (arr[fromIndex] === searchElement) {
		                return fromIndex;
		            }
		        }

		        return -1;
		    };

		if(!Array.prototype.map) {
		    Array.prototype.map = function() {
		        throw new Error('map is unimplemented for this js engine');
		    };
		}

		exports.keys = function(obj) {
		    if(Object.prototype.keys) {
		        return obj.keys();
		    }
		    else {
		        var keys = [];
		        for(var k in obj) {
		            if(obj.hasOwnProperty(k)) {
		                keys.push(k);
		            }
		        }
		        return keys;
		    }
		};

		exports.inOperator = function (key, val) {
		    if (exports.isArray(val)) {
		        return exports.indexOf(val, key) !== -1;
		    } else if (exports.isObject(val)) {
		        return key in val;
		    } else if (exports.isString(val)) {
		        return val.indexOf(key) !== -1;
		    } else {
		        throw new Error('Cannot use "in" operator to search for "'
		            + key + '" in unexpected types.');
		    }
		};


	/***/ },
	/* 2 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var path = __webpack_require__(3);
		var asap = __webpack_require__(4);
		var lib = __webpack_require__(1);
		var Obj = __webpack_require__(6);
		var compiler = __webpack_require__(3);
		var builtin_filters = __webpack_require__(7);
		var builtin_loaders = __webpack_require__(3);
		var runtime = __webpack_require__(8);
		var globals = __webpack_require__(9);
		var Frame = runtime.Frame;
		var Template;

		// Unconditionally load in this loader, even if no other ones are
		// included (possible in the slim browser build)
		builtin_loaders.PrecompiledLoader = __webpack_require__(10);

		// If the user is using the async API, *always* call it
		// asynchronously even if the template was synchronous.
		function callbackAsap(cb, err, res) {
		    asap(function() { cb(err, res); });
		}

		var Environment = Obj.extend({
		    init: function(loaders, opts) {
		        // The dev flag determines the trace that'll be shown on errors.
		        // If set to true, returns the full trace from the error point,
		        // otherwise will return trace starting from Template.render
		        // (the full trace from within nunjucks may confuse developers using
		        //  the library)
		        // defaults to false
		        opts = this.opts = opts || {};
		        this.opts.dev = !!opts.dev;

		        // The autoescape flag sets global autoescaping. If true,
		        // every string variable will be escaped by default.
		        // If false, strings can be manually escaped using the `escape` filter.
		        // defaults to true
		        this.opts.autoescape = opts.autoescape != null ? opts.autoescape : true;

		        // If true, this will make the system throw errors if trying
		        // to output a null or undefined value
		        this.opts.throwOnUndefined = !!opts.throwOnUndefined;
		        this.opts.trimBlocks = !!opts.trimBlocks;
		        this.opts.lstripBlocks = !!opts.lstripBlocks;

		        this.loaders = [];

		        if(!loaders) {
		            // The filesystem loader is only available server-side
		            if(builtin_loaders.FileSystemLoader) {
		                this.loaders = [new builtin_loaders.FileSystemLoader('views')];
		            }
		            else if(builtin_loaders.WebLoader) {
		                this.loaders = [new builtin_loaders.WebLoader('/views')];
		            }
		        }
		        else {
		            this.loaders = lib.isArray(loaders) ? loaders : [loaders];
		        }

		        // It's easy to use precompiled templates: just include them
		        // before you configure nunjucks and this will automatically
		        // pick it up and use it
		        if((true) && window.nunjucksPrecompiled) {
		            this.loaders.unshift(
		                new builtin_loaders.PrecompiledLoader(window.nunjucksPrecompiled)
		            );
		        }

		        this.initCache();

		        this.globals = globals();
		        this.filters = {};
		        this.asyncFilters = [];
		        this.extensions = {};
		        this.extensionsList = [];

		        for(var name in builtin_filters) {
		            this.addFilter(name, builtin_filters[name]);
		        }
		    },

		    initCache: function() {
		        // Caching and cache busting
		        lib.each(this.loaders, function(loader) {
		            loader.cache = {};

		            if(typeof loader.on === 'function') {
		                loader.on('update', function(template) {
		                    loader.cache[template] = null;
		                });
		            }
		        });
		    },

		    addExtension: function(name, extension) {
		        extension._name = name;
		        this.extensions[name] = extension;
		        this.extensionsList.push(extension);
		        return this;
		    },

		    removeExtension: function(name) {
		        var extension = this.getExtension(name);
		        if (!extension) return;

		        this.extensionsList = lib.without(this.extensionsList, extension);
		        delete this.extensions[name];
		    },

		    getExtension: function(name) {
		        return this.extensions[name];
		    },

		    hasExtension: function(name) {
		        return !!this.extensions[name];
		    },

		    addGlobal: function(name, value) {
		        this.globals[name] = value;
		        return this;
		    },

		    getGlobal: function(name) {
		        if(typeof this.globals[name] === 'undefined') {
		            throw new Error('global not found: ' + name);
		        }
		        return this.globals[name];
		    },

		    addFilter: function(name, func, async) {
		        var wrapped = func;

		        if(async) {
		            this.asyncFilters.push(name);
		        }
		        this.filters[name] = wrapped;
		        return this;
		    },

		    getFilter: function(name) {
		        if(!this.filters[name]) {
		            throw new Error('filter not found: ' + name);
		        }
		        return this.filters[name];
		    },

		    resolveTemplate: function(loader, parentName, filename) {
		        var isRelative = (loader.isRelative && parentName)? loader.isRelative(filename) : false;
		        return (isRelative && loader.resolve)? loader.resolve(parentName, filename) : filename;
		    },

		    getTemplate: function(name, eagerCompile, parentName, ignoreMissing, cb) {
		        var that = this;
		        var tmpl = null;
		        if(name && name.raw) {
		            // this fixes autoescape for templates referenced in symbols
		            name = name.raw;
		        }

		        if(lib.isFunction(parentName)) {
		            cb = parentName;
		            parentName = null;
		            eagerCompile = eagerCompile || false;
		        }

		        if(lib.isFunction(eagerCompile)) {
		            cb = eagerCompile;
		            eagerCompile = false;
		        }

		        if (name instanceof Template) {
		             tmpl = name;
		        }
		        else if(typeof name !== 'string') {
		            throw new Error('template names must be a string: ' + name);
		        }
		        else {
		            for (var i = 0; i < this.loaders.length; i++) {
		                var _name = this.resolveTemplate(this.loaders[i], parentName, name);
		                tmpl = this.loaders[i].cache[_name];
		                if (tmpl) break;
		            }
		        }

		        if(tmpl) {
		            if(eagerCompile) {
		                tmpl.compile();
		            }

		            if(cb) {
		                cb(null, tmpl);
		            }
		            else {
		                return tmpl;
		            }
		        } else {
		            var syncResult;
		            var _this = this;

		            var createTemplate = function(err, info) {
		                if(!info && !err) {
		                    if(!ignoreMissing) {
		                        err = new Error('template not found: ' + name);
		                    }
		                }

		                if (err) {
		                    if(cb) {
		                        cb(err);
		                    }
		                    else {
		                        throw err;
		                    }
		                }
		                else {
		                    var tmpl;
		                    if(info) {
		                        tmpl = new Template(info.src, _this,
		                                            info.path, eagerCompile);

		                        if(!info.noCache) {
		                            info.loader.cache[name] = tmpl;
		                        }
		                    }
		                    else {
		                        tmpl = new Template('', _this,
		                                            '', eagerCompile);
		                    }

		                    if(cb) {
		                        cb(null, tmpl);
		                    }
		                    else {
		                        syncResult = tmpl;
		                    }
		                }
		            };

		            lib.asyncIter(this.loaders, function(loader, i, next, done) {
		                function handle(err, src) {
		                    if(err) {
		                        done(err);
		                    }
		                    else if(src) {
		                        src.loader = loader;
		                        done(null, src);
		                    }
		                    else {
		                        next();
		                    }
		                }

		                // Resolve name relative to parentName
		                name = that.resolveTemplate(loader, parentName, name);

		                if(loader.async) {
		                    loader.getSource(name, handle);
		                }
		                else {
		                    handle(null, loader.getSource(name));
		                }
		            }, createTemplate);

		            return syncResult;
		        }
		    },

		    express: function(app) {
		        var env = this;

		        function NunjucksView(name, opts) {
		            this.name          = name;
		            this.path          = name;
		            this.defaultEngine = opts.defaultEngine;
		            this.ext           = path.extname(name);
		            if (!this.ext && !this.defaultEngine) throw new Error('No default engine was specified and no extension was provided.');
		            if (!this.ext) this.name += (this.ext = ('.' !== this.defaultEngine[0] ? '.' : '') + this.defaultEngine);
		        }

		        NunjucksView.prototype.render = function(opts, cb) {
		          env.render(this.name, opts, cb);
		        };

		        app.set('view', NunjucksView);
		        return this;
		    },

		    render: function(name, ctx, cb) {
		        if(lib.isFunction(ctx)) {
		            cb = ctx;
		            ctx = null;
		        }

		        // We support a synchronous API to make it easier to migrate
		        // existing code to async. This works because if you don't do
		        // anything async work, the whole thing is actually run
		        // synchronously.
		        var syncResult = null;

		        this.getTemplate(name, function(err, tmpl) {
		            if(err && cb) {
		                callbackAsap(cb, err);
		            }
		            else if(err) {
		                throw err;
		            }
		            else {
		                syncResult = tmpl.render(ctx, cb);
		            }
		        });

		        return syncResult;
		    },

		    renderString: function(src, ctx, opts, cb) {
		        if(lib.isFunction(opts)) {
		            cb = opts;
		            opts = {};
		        }
		        opts = opts || {};

		        var tmpl = new Template(src, this, opts.path);
		        return tmpl.render(ctx, cb);
		    }
		});

		var Context = Obj.extend({
		    init: function(ctx, blocks, env) {
		        // Has to be tied to an environment so we can tap into its globals.
		        this.env = env || new Environment();

		        // Make a duplicate of ctx
		        this.ctx = {};
		        for(var k in ctx) {
		            if(ctx.hasOwnProperty(k)) {
		                this.ctx[k] = ctx[k];
		            }
		        }

		        this.blocks = {};
		        this.exported = [];

		        for(var name in blocks) {
		            this.addBlock(name, blocks[name]);
		        }
		    },

		    lookup: function(name) {
		        // This is one of the most called functions, so optimize for
		        // the typical case where the name isn't in the globals
		        if(name in this.env.globals && !(name in this.ctx)) {
		            return this.env.globals[name];
		        }
		        else {
		            return this.ctx[name];
		        }
		    },

		    setVariable: function(name, val) {
		        this.ctx[name] = val;
		    },

		    getVariables: function() {
		        return this.ctx;
		    },

		    addBlock: function(name, block) {
		        this.blocks[name] = this.blocks[name] || [];
		        this.blocks[name].push(block);
		        return this;
		    },

		    getBlock: function(name) {
		        if(!this.blocks[name]) {
		            throw new Error('unknown block "' + name + '"');
		        }

		        return this.blocks[name][0];
		    },

		    getSuper: function(env, name, block, frame, runtime, cb) {
		        var idx = lib.indexOf(this.blocks[name] || [], block);
		        var blk = this.blocks[name][idx + 1];
		        var context = this;

		        if(idx === -1 || !blk) {
		            throw new Error('no super block available for "' + name + '"');
		        }

		        blk(env, context, frame, runtime, cb);
		    },

		    addExport: function(name) {
		        this.exported.push(name);
		    },

		    getExported: function() {
		        var exported = {};
		        for(var i=0; i<this.exported.length; i++) {
		            var name = this.exported[i];
		            exported[name] = this.ctx[name];
		        }
		        return exported;
		    }
		});

		Template = Obj.extend({
		    init: function (src, env, path, eagerCompile) {
		        this.env = env || new Environment();

		        if(lib.isObject(src)) {
		            switch(src.type) {
		            case 'code': this.tmplProps = src.obj; break;
		            case 'string': this.tmplStr = src.obj; break;
		            }
		        }
		        else if(lib.isString(src)) {
		            this.tmplStr = src;
		        }
		        else {
		            throw new Error('src must be a string or an object describing ' +
		                            'the source');
		        }

		        this.path = path;

		        if(eagerCompile) {
		            var _this = this;
		            try {
		                _this._compile();
		            }
		            catch(err) {
		                throw lib.prettifyError(this.path, this.env.opts.dev, err);
		            }
		        }
		        else {
		            this.compiled = false;
		        }
		    },

		    render: function(ctx, parentFrame, cb) {
		        if (typeof ctx === 'function') {
		            cb = ctx;
		            ctx = {};
		        }
		        else if (typeof parentFrame === 'function') {
		            cb = parentFrame;
		            parentFrame = null;
		        }

		        var forceAsync = true;
		        if(parentFrame) {
		            // If there is a frame, we are being called from internal
		            // code of another template, and the internal system
		            // depends on the sync/async nature of the parent template
		            // to be inherited, so force an async callback
		            forceAsync = false;
		        }

		        var _this = this;
		        // Catch compile errors for async rendering
		        try {
		            _this.compile();
		        } catch (_err) {
		            var err = lib.prettifyError(this.path, this.env.opts.dev, _err);
		            if (cb) return callbackAsap(cb, err);
		            else throw err;
		        }

		        var context = new Context(ctx || {}, _this.blocks, _this.env);
		        var frame = parentFrame ? parentFrame.push(true) : new Frame();
		        frame.topLevel = true;
		        var syncResult = null;

		        _this.rootRenderFunc(
		            _this.env,
		            context,
		            frame || new Frame(),
		            runtime,
		            function(err, res) {
		                if(err) {
		                    err = lib.prettifyError(_this.path, _this.env.opts.dev, err);
		                }

		                if(cb) {
		                    if(forceAsync) {
		                        callbackAsap(cb, err, res);
		                    }
		                    else {
		                        cb(err, res);
		                    }
		                }
		                else {
		                    if(err) { throw err; }
		                    syncResult = res;
		                }
		            }
		        );

		        return syncResult;
		    },


		    getExported: function(ctx, parentFrame, cb) {
		        if (typeof ctx === 'function') {
		            cb = ctx;
		            ctx = {};
		        }

		        if (typeof parentFrame === 'function') {
		            cb = parentFrame;
		            parentFrame = null;
		        }

		        // Catch compile errors for async rendering
		        try {
		            this.compile();
		        } catch (e) {
		            if (cb) return cb(e);
		            else throw e;
		        }

		        var frame = parentFrame ? parentFrame.push() : new Frame();
		        frame.topLevel = true;

		        // Run the rootRenderFunc to populate the context with exported vars
		        var context = new Context(ctx || {}, this.blocks, this.env);
		        this.rootRenderFunc(this.env,
		                            context,
		                            frame,
		                            runtime,
		                            function(err) {
		        		        if ( err ) {
		        			    cb(err, null);
		        		        } else {
		        			    cb(null, context.getExported());
		        		        }
		                            });
		    },

		    compile: function() {
		        if(!this.compiled) {
		            this._compile();
		        }
		    },

		    _compile: function() {
		        var props;

		        if(this.tmplProps) {
		            props = this.tmplProps;
		        }
		        else {
		            var source = compiler.compile(this.tmplStr,
		                                          this.env.asyncFilters,
		                                          this.env.extensionsList,
		                                          this.path,
		                                          this.env.opts);

		            /* jslint evil: true */
		            var func = new Function(source);
		            props = func();
		        }

		        this.blocks = this._getBlocks(props);
		        this.rootRenderFunc = props.root;
		        this.compiled = true;
		    },

		    _getBlocks: function(props) {
		        var blocks = {};

		        for(var k in props) {
		            if(k.slice(0, 2) === 'b_') {
		                blocks[k.slice(2)] = props[k];
		            }
		        }

		        return blocks;
		    }
		});

		module.exports = {
		    Environment: Environment,
		    Template: Template
		};


	/***/ },
	/* 3 */
	/***/ function(module, exports) {

		

	/***/ },
	/* 4 */
	/***/ function(module, exports, __webpack_require__) {

		"use strict";

		// rawAsap provides everything we need except exception management.
		var rawAsap = __webpack_require__(5);
		// RawTasks are recycled to reduce GC churn.
		var freeTasks = [];
		// We queue errors to ensure they are thrown in right order (FIFO).
		// Array-as-queue is good enough here, since we are just dealing with exceptions.
		var pendingErrors = [];
		var requestErrorThrow = rawAsap.makeRequestCallFromTimer(throwFirstError);

		function throwFirstError() {
		    if (pendingErrors.length) {
		        throw pendingErrors.shift();
		    }
		}

		/**
		 * Calls a task as soon as possible after returning, in its own event, with priority
		 * over other events like animation, reflow, and repaint. An error thrown from an
		 * event will not interrupt, nor even substantially slow down the processing of
		 * other events, but will be rather postponed to a lower priority event.
		 * @param {{call}} task A callable object, typically a function that takes no
		 * arguments.
		 */
		module.exports = asap;
		function asap(task) {
		    var rawTask;
		    if (freeTasks.length) {
		        rawTask = freeTasks.pop();
		    } else {
		        rawTask = new RawTask();
		    }
		    rawTask.task = task;
		    rawAsap(rawTask);
		}

		// We wrap tasks with recyclable task objects.  A task object implements
		// `call`, just like a function.
		function RawTask() {
		    this.task = null;
		}

		// The sole purpose of wrapping the task is to catch the exception and recycle
		// the task object after its single use.
		RawTask.prototype.call = function () {
		    try {
		        this.task.call();
		    } catch (error) {
		        if (asap.onerror) {
		            // This hook exists purely for testing purposes.
		            // Its name will be periodically randomized to break any code that
		            // depends on its existence.
		            asap.onerror(error);
		        } else {
		            // In a web browser, exceptions are not fatal. However, to avoid
		            // slowing down the queue of pending tasks, we rethrow the error in a
		            // lower priority turn.
		            pendingErrors.push(error);
		            requestErrorThrow();
		        }
		    } finally {
		        this.task = null;
		        freeTasks[freeTasks.length] = this;
		    }
		};


	/***/ },
	/* 5 */
	/***/ function(module, exports) {

		/* WEBPACK VAR INJECTION */(function(global) {"use strict";

		// Use the fastest means possible to execute a task in its own turn, with
		// priority over other events including IO, animation, reflow, and redraw
		// events in browsers.
		//
		// An exception thrown by a task will permanently interrupt the processing of
		// subsequent tasks. The higher level `asap` function ensures that if an
		// exception is thrown by a task, that the task queue will continue flushing as
		// soon as possible, but if you use `rawAsap` directly, you are responsible to
		// either ensure that no exceptions are thrown from your task, or to manually
		// call `rawAsap.requestFlush` if an exception is thrown.
		module.exports = rawAsap;
		function rawAsap(task) {
		    if (!queue.length) {
		        requestFlush();
		        flushing = true;
		    }
		    // Equivalent to push, but avoids a function call.
		    queue[queue.length] = task;
		}

		var queue = [];
		// Once a flush has been requested, no further calls to `requestFlush` are
		// necessary until the next `flush` completes.
		var flushing = false;
		// `requestFlush` is an implementation-specific method that attempts to kick
		// off a `flush` event as quickly as possible. `flush` will attempt to exhaust
		// the event queue before yielding to the browser's own event loop.
		var requestFlush;
		// The position of the next task to execute in the task queue. This is
		// preserved between calls to `flush` so that it can be resumed if
		// a task throws an exception.
		var index = 0;
		// If a task schedules additional tasks recursively, the task queue can grow
		// unbounded. To prevent memory exhaustion, the task queue will periodically
		// truncate already-completed tasks.
		var capacity = 1024;

		// The flush function processes all tasks that have been scheduled with
		// `rawAsap` unless and until one of those tasks throws an exception.
		// If a task throws an exception, `flush` ensures that its state will remain
		// consistent and will resume where it left off when called again.
		// However, `flush` does not make any arrangements to be called again if an
		// exception is thrown.
		function flush() {
		    while (index < queue.length) {
		        var currentIndex = index;
		        // Advance the index before calling the task. This ensures that we will
		        // begin flushing on the next task the task throws an error.
		        index = index + 1;
		        queue[currentIndex].call();
		        // Prevent leaking memory for long chains of recursive calls to `asap`.
		        // If we call `asap` within tasks scheduled by `asap`, the queue will
		        // grow, but to avoid an O(n) walk for every task we execute, we don't
		        // shift tasks off the queue after they have been executed.
		        // Instead, we periodically shift 1024 tasks off the queue.
		        if (index > capacity) {
		            // Manually shift all values starting at the index back to the
		            // beginning of the queue.
		            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
		                queue[scan] = queue[scan + index];
		            }
		            queue.length -= index;
		            index = 0;
		        }
		    }
		    queue.length = 0;
		    index = 0;
		    flushing = false;
		}

		// `requestFlush` is implemented using a strategy based on data collected from
		// every available SauceLabs Selenium web driver worker at time of writing.
		// https://docs.google.com/spreadsheets/d/1mG-5UYGup5qxGdEMWkhP6BWCz053NUb2E1QoUTU16uA/edit#gid=783724593

		// Safari 6 and 6.1 for desktop, iPad, and iPhone are the only browsers that
		// have WebKitMutationObserver but not un-prefixed MutationObserver.
		// Must use `global` instead of `window` to work in both frames and web
		// workers. `global` is a provision of Browserify, Mr, Mrs, or Mop.
		var BrowserMutationObserver = global.MutationObserver || global.WebKitMutationObserver;

		// MutationObservers are desirable because they have high priority and work
		// reliably everywhere they are implemented.
		// They are implemented in all modern browsers.
		//
		// - Android 4-4.3
		// - Chrome 26-34
		// - Firefox 14-29
		// - Internet Explorer 11
		// - iPad Safari 6-7.1
		// - iPhone Safari 7-7.1
		// - Safari 6-7
		if (typeof BrowserMutationObserver === "function") {
		    requestFlush = makeRequestCallFromMutationObserver(flush);

		// MessageChannels are desirable because they give direct access to the HTML
		// task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera
		// 11-12, and in web workers in many engines.
		// Although message channels yield to any queued rendering and IO tasks, they
		// would be better than imposing the 4ms delay of timers.
		// However, they do not work reliably in Internet Explorer or Safari.

		// Internet Explorer 10 is the only browser that has setImmediate but does
		// not have MutationObservers.
		// Although setImmediate yields to the browser's renderer, it would be
		// preferrable to falling back to setTimeout since it does not have
		// the minimum 4ms penalty.
		// Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and
		// Desktop to a lesser extent) that renders both setImmediate and
		// MessageChannel useless for the purposes of ASAP.
		// https://github.com/kriskowal/q/issues/396

		// Timers are implemented universally.
		// We fall back to timers in workers in most engines, and in foreground
		// contexts in the following browsers.
		// However, note that even this simple case requires nuances to operate in a
		// broad spectrum of browsers.
		//
		// - Firefox 3-13
		// - Internet Explorer 6-9
		// - iPad Safari 4.3
		// - Lynx 2.8.7
		} else {
		    requestFlush = makeRequestCallFromTimer(flush);
		}

		// `requestFlush` requests that the high priority event queue be flushed as
		// soon as possible.
		// This is useful to prevent an error thrown in a task from stalling the event
		// queue if the exception handled by Node.js’s
		// `process.on("uncaughtException")` or by a domain.
		rawAsap.requestFlush = requestFlush;

		// To request a high priority event, we induce a mutation observer by toggling
		// the text of a text node between "1" and "-1".
		function makeRequestCallFromMutationObserver(callback) {
		    var toggle = 1;
		    var observer = new BrowserMutationObserver(callback);
		    var node = document.createTextNode("");
		    observer.observe(node, {characterData: true});
		    return function requestCall() {
		        toggle = -toggle;
		        node.data = toggle;
		    };
		}

		// The message channel technique was discovered by Malte Ubl and was the
		// original foundation for this library.
		// http://www.nonblocking.io/2011/06/windownexttick.html

		// Safari 6.0.5 (at least) intermittently fails to create message ports on a
		// page's first load. Thankfully, this version of Safari supports
		// MutationObservers, so we don't need to fall back in that case.

		// function makeRequestCallFromMessageChannel(callback) {
		//     var channel = new MessageChannel();
		//     channel.port1.onmessage = callback;
		//     return function requestCall() {
		//         channel.port2.postMessage(0);
		//     };
		// }

		// For reasons explained above, we are also unable to use `setImmediate`
		// under any circumstances.
		// Even if we were, there is another bug in Internet Explorer 10.
		// It is not sufficient to assign `setImmediate` to `requestFlush` because
		// `setImmediate` must be called *by name* and therefore must be wrapped in a
		// closure.
		// Never forget.

		// function makeRequestCallFromSetImmediate(callback) {
		//     return function requestCall() {
		//         setImmediate(callback);
		//     };
		// }

		// Safari 6.0 has a problem where timers will get lost while the user is
		// scrolling. This problem does not impact ASAP because Safari 6.0 supports
		// mutation observers, so that implementation is used instead.
		// However, if we ever elect to use timers in Safari, the prevalent work-around
		// is to add a scroll event listener that calls for a flush.

		// `setTimeout` does not call the passed callback if the delay is less than
		// approximately 7 in web workers in Firefox 8 through 18, and sometimes not
		// even then.

		function makeRequestCallFromTimer(callback) {
		    return function requestCall() {
		        // We dispatch a timeout with a specified delay of 0 for engines that
		        // can reliably accommodate that request. This will usually be snapped
		        // to a 4 milisecond delay, but once we're flushing, there's no delay
		        // between events.
		        var timeoutHandle = setTimeout(handleTimer, 0);
		        // However, since this timer gets frequently dropped in Firefox
		        // workers, we enlist an interval handle that will try to fire
		        // an event 20 times per second until it succeeds.
		        var intervalHandle = setInterval(handleTimer, 50);

		        function handleTimer() {
		            // Whichever timer succeeds will cancel both timers and
		            // execute the callback.
		            clearTimeout(timeoutHandle);
		            clearInterval(intervalHandle);
		            callback();
		        }
		    };
		}

		// This is for `asap.js` only.
		// Its name will be periodically randomized to break any code that depends on
		// its existence.
		rawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer;

		// ASAP was originally a nextTick shim included in Q. This was factored out
		// into this ASAP package. It was later adapted to RSVP which made further
		// amendments. These decisions, particularly to marginalize MessageChannel and
		// to capture the MutationObserver implementation in a closure, were integrated
		// back into ASAP proper.
		// https://github.com/tildeio/rsvp.js/blob/cddf7232546a9cf858524b75cde6f9edf72620a7/lib/rsvp/asap.js

		/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

	/***/ },
	/* 6 */
	/***/ function(module, exports) {

		'use strict';

		// A simple class system, more documentation to come

		function extend(cls, name, props) {
		    // This does that same thing as Object.create, but with support for IE8
		    var F = function() {};
		    F.prototype = cls.prototype;
		    var prototype = new F();

		    // jshint undef: false
		    var fnTest = /xyz/.test(function(){ xyz; }) ? /\bparent\b/ : /.*/;
		    props = props || {};

		    for(var k in props) {
		        var src = props[k];
		        var parent = prototype[k];

		        if(typeof parent === 'function' &&
		           typeof src === 'function' &&
		           fnTest.test(src)) {
		            /*jshint -W083 */
		            prototype[k] = (function (src, parent) {
		                return function() {
		                    // Save the current parent method
		                    var tmp = this.parent;

		                    // Set parent to the previous method, call, and restore
		                    this.parent = parent;
		                    var res = src.apply(this, arguments);
		                    this.parent = tmp;

		                    return res;
		                };
		            })(src, parent);
		        }
		        else {
		            prototype[k] = src;
		        }
		    }

		    prototype.typename = name;

		    var new_cls = function() {
		        if(prototype.init) {
		            prototype.init.apply(this, arguments);
		        }
		    };

		    new_cls.prototype = prototype;
		    new_cls.prototype.constructor = new_cls;

		    new_cls.extend = function(name, props) {
		        if(typeof name === 'object') {
		            props = name;
		            name = 'anonymous';
		        }
		        return extend(new_cls, name, props);
		    };

		    return new_cls;
		}

		module.exports = extend(Object, 'Object', {});


	/***/ },
	/* 7 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var lib = __webpack_require__(1);
		var r = __webpack_require__(8);

		function normalize(value, defaultValue) {
		    if(value === null || value === undefined || value === false) {
		        return defaultValue;
		    }
		    return value;
		}

		var filters = {
		    abs: function(n) {
		        return Math.abs(n);
		    },

		    batch: function(arr, linecount, fill_with) {
		        var i;
		        var res = [];
		        var tmp = [];

		        for(i = 0; i < arr.length; i++) {
		            if(i % linecount === 0 && tmp.length) {
		                res.push(tmp);
		                tmp = [];
		            }

		            tmp.push(arr[i]);
		        }

		        if(tmp.length) {
		            if(fill_with) {
		                for(i = tmp.length; i < linecount; i++) {
		                    tmp.push(fill_with);
		                }
		            }

		            res.push(tmp);
		        }

		        return res;
		    },

		    capitalize: function(str) {
		        str = normalize(str, '');
		        var ret = str.toLowerCase();
		        return r.copySafeness(str, ret.charAt(0).toUpperCase() + ret.slice(1));
		    },

		    center: function(str, width) {
		        str = normalize(str, '');
		        width = width || 80;

		        if(str.length >= width) {
		            return str;
		        }

		        var spaces = width - str.length;
		        var pre = lib.repeat(' ', spaces/2 - spaces % 2);
		        var post = lib.repeat(' ', spaces/2);
		        return r.copySafeness(str, pre + str + post);
		    },

		    'default': function(val, def, bool) {
		        if(bool) {
		            return val ? val : def;
		        }
		        else {
		            return (val !== undefined) ? val : def;
		        }
		    },

		    dictsort: function(val, case_sensitive, by) {
		        if (!lib.isObject(val)) {
		            throw new lib.TemplateError('dictsort filter: val must be an object');
		        }

		        var array = [];
		        for (var k in val) {
		            // deliberately include properties from the object's prototype
		            array.push([k,val[k]]);
		        }

		        var si;
		        if (by === undefined || by === 'key') {
		            si = 0;
		        } else if (by === 'value') {
		            si = 1;
		        } else {
		            throw new lib.TemplateError(
		                'dictsort filter: You can only sort by either key or value');
		        }

		        array.sort(function(t1, t2) {
		            var a = t1[si];
		            var b = t2[si];

		            if (!case_sensitive) {
		                if (lib.isString(a)) {
		                    a = a.toUpperCase();
		                }
		                if (lib.isString(b)) {
		                    b = b.toUpperCase();
		                }
		            }

		            return a > b ? 1 : (a === b ? 0 : -1);
		        });

		        return array;
		    },

		    dump: function(obj) {
		        return JSON.stringify(obj);
		    },

		    escape: function(str) {
		        if(typeof str === 'string') {
		            return r.markSafe(lib.escape(str));
		        }
		        return str;
		    },

		    safe: function(str) {
		        return r.markSafe(str);
		    },

		    first: function(arr) {
		        return arr[0];
		    },

		    groupby: function(arr, attr) {
		        return lib.groupBy(arr, attr);
		    },

		    indent: function(str, width, indentfirst) {
		        str = normalize(str, '');

		        if (str === '') return '';

		        width = width || 4;
		        var res = '';
		        var lines = str.split('\n');
		        var sp = lib.repeat(' ', width);

		        for(var i=0; i<lines.length; i++) {
		            if(i === 0 && !indentfirst) {
		                res += lines[i] + '\n';
		            }
		            else {
		                res += sp + lines[i] + '\n';
		            }
		        }

		        return r.copySafeness(str, res);
		    },

		    join: function(arr, del, attr) {
		        del = del || '';

		        if(attr) {
		            arr = lib.map(arr, function(v) {
		                return v[attr];
		            });
		        }

		        return arr.join(del);
		    },

		    last: function(arr) {
		        return arr[arr.length-1];
		    },

		    length: function(val) {
		        var value = normalize(val, '');

		        if(value !== undefined) {
		            if(
		                (typeof Map === 'function' && value instanceof Map) ||
		                (typeof Set === 'function' && value instanceof Set)
		            ) {
		                // ECMAScript 2015 Maps and Sets
		                return value.size;
		            }
		            return value.length;
		        }
		        return 0;
		    },

		    list: function(val) {
		        if(lib.isString(val)) {
		            return val.split('');
		        }
		        else if(lib.isObject(val)) {
		            var keys = [];

		            if(Object.keys) {
		                keys = Object.keys(val);
		            }
		            else {
		                for(var k in val) {
		                    keys.push(k);
		                }
		            }

		            return lib.map(keys, function(k) {
		                return { key: k,
		                         value: val[k] };
		            });
		        }
		        else if(lib.isArray(val)) {
		          return val;
		        }
		        else {
		            throw new lib.TemplateError('list filter: type not iterable');
		        }
		    },

		    lower: function(str) {
		        str = normalize(str, '');
		        return str.toLowerCase();
		    },

		    random: function(arr) {
		        return arr[Math.floor(Math.random() * arr.length)];
		    },

		    rejectattr: function(arr, attr) {
		      return arr.filter(function (item) {
		        return !item[attr];
		      });
		    },

		    selectattr: function(arr, attr) {
		      return arr.filter(function (item) {
		        return !!item[attr];
		      });
		    },

		    replace: function(str, old, new_, maxCount) {
		        var originalStr = str;

		        if (old instanceof RegExp) {
		            return str.replace(old, new_);
		        }

		        if(typeof maxCount === 'undefined'){
		            maxCount = -1;
		        }

		        var res = '';  // Output

		        // Cast Numbers in the search term to string
		        if(typeof old === 'number'){
		            old = old + '';
		        }
		        else if(typeof old !== 'string') {
		            // If it is something other than number or string,
		            // return the original string
		            return str;
		        }

		        // Cast numbers in the replacement to string
		        if(typeof str === 'number'){
		            str = str + '';
		        }

		        // If by now, we don't have a string, throw it back
		        if(typeof str !== 'string' && !(str instanceof r.SafeString)){
		            return str;
		        }

		        // ShortCircuits
		        if(old === ''){
		            // Mimic the python behaviour: empty string is replaced
		            // by replacement e.g. "abc"|replace("", ".") -> .a.b.c.
		            res = new_ + str.split('').join(new_) + new_;
		            return r.copySafeness(str, res);
		        }

		        var nextIndex = str.indexOf(old);
		        // if # of replacements to perform is 0, or the string to does
		        // not contain the old value, return the string
		        if(maxCount === 0 || nextIndex === -1){
		            return str;
		        }

		        var pos = 0;
		        var count = 0; // # of replacements made

		        while(nextIndex  > -1 && (maxCount === -1 || count < maxCount)){
		            // Grab the next chunk of src string and add it with the
		            // replacement, to the result
		            res += str.substring(pos, nextIndex) + new_;
		            // Increment our pointer in the src string
		            pos = nextIndex + old.length;
		            count++;
		            // See if there are any more replacements to be made
		            nextIndex = str.indexOf(old, pos);
		        }

		        // We've either reached the end, or done the max # of
		        // replacements, tack on any remaining string
		        if(pos < str.length) {
		            res += str.substring(pos);
		        }

		        return r.copySafeness(originalStr, res);
		    },

		    reverse: function(val) {
		        var arr;
		        if(lib.isString(val)) {
		            arr = filters.list(val);
		        }
		        else {
		            // Copy it
		            arr = lib.map(val, function(v) { return v; });
		        }

		        arr.reverse();

		        if(lib.isString(val)) {
		            return r.copySafeness(val, arr.join(''));
		        }
		        return arr;
		    },

		    round: function(val, precision, method) {
		        precision = precision || 0;
		        var factor = Math.pow(10, precision);
		        var rounder;

		        if(method === 'ceil') {
		            rounder = Math.ceil;
		        }
		        else if(method === 'floor') {
		            rounder = Math.floor;
		        }
		        else {
		            rounder = Math.round;
		        }

		        return rounder(val * factor) / factor;
		    },

		    slice: function(arr, slices, fillWith) {
		        var sliceLength = Math.floor(arr.length / slices);
		        var extra = arr.length % slices;
		        var offset = 0;
		        var res = [];

		        for(var i=0; i<slices; i++) {
		            var start = offset + i * sliceLength;
		            if(i < extra) {
		                offset++;
		            }
		            var end = offset + (i + 1) * sliceLength;

		            var slice = arr.slice(start, end);
		            if(fillWith && i >= extra) {
		                slice.push(fillWith);
		            }
		            res.push(slice);
		        }

		        return res;
		    },

		    sum: function(arr, attr, start) {
		        var sum = 0;

		        if(typeof start === 'number'){
		            sum += start;
		        }

		        if(attr) {
		            arr = lib.map(arr, function(v) {
		                return v[attr];
		            });
		        }

		        for(var i = 0; i < arr.length; i++) {
		            sum += arr[i];
		        }

		        return sum;
		    },

		    sort: r.makeMacro(['value', 'reverse', 'case_sensitive', 'attribute'], [], function(arr, reverse, caseSens, attr) {
		         // Copy it
		        arr = lib.map(arr, function(v) { return v; });

		        arr.sort(function(a, b) {
		            var x, y;

		            if(attr) {
		                x = a[attr];
		                y = b[attr];
		            }
		            else {
		                x = a;
		                y = b;
		            }

		            if(!caseSens && lib.isString(x) && lib.isString(y)) {
		                x = x.toLowerCase();
		                y = y.toLowerCase();
		            }

		            if(x < y) {
		                return reverse ? 1 : -1;
		            }
		            else if(x > y) {
		                return reverse ? -1: 1;
		            }
		            else {
		                return 0;
		            }
		        });

		        return arr;
		    }),

		    string: function(obj) {
		        return r.copySafeness(obj, obj);
		    },

		    striptags: function(input, preserve_linebreaks) {
		        input = normalize(input, '');
		        preserve_linebreaks = preserve_linebreaks || false;
		        var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>|<!--[\s\S]*?-->/gi;
		        var trimmedInput = filters.trim(input.replace(tags, ''));
		        var res = '';
		        if (preserve_linebreaks) {
		            res = trimmedInput
		                .replace(/^ +| +$/gm, '')     // remove leading and trailing spaces
		                .replace(/ +/g, ' ')          // squash adjacent spaces
		                .replace(/(\r\n)/g, '\n')     // normalize linebreaks (CRLF -> LF)
		                .replace(/\n\n\n+/g, '\n\n'); // squash abnormal adjacent linebreaks
		        } else {
		            res = trimmedInput.replace(/\s+/gi, ' ');
		        }
		        return r.copySafeness(input, res);
		    },

		    title: function(str) {
		        str = normalize(str, '');
		        var words = str.split(' ');
		        for(var i = 0; i < words.length; i++) {
		            words[i] = filters.capitalize(words[i]);
		        }
		        return r.copySafeness(str, words.join(' '));
		    },

		    trim: function(str) {
		        return r.copySafeness(str, str.replace(/^\s*|\s*$/g, ''));
		    },

		    truncate: function(input, length, killwords, end) {
		        var orig = input;
		        input = normalize(input, '');
		        length = length || 255;

		        if (input.length <= length)
		            return input;

		        if (killwords) {
		            input = input.substring(0, length);
		        } else {
		            var idx = input.lastIndexOf(' ', length);
		            if(idx === -1) {
		                idx = length;
		            }

		            input = input.substring(0, idx);
		        }

		        input += (end !== undefined && end !== null) ? end : '...';
		        return r.copySafeness(orig, input);
		    },

		    upper: function(str) {
		        str = normalize(str, '');
		        return str.toUpperCase();
		    },

		    urlencode: function(obj) {
		        var enc = encodeURIComponent;
		        if (lib.isString(obj)) {
		            return enc(obj);
		        } else {
		            var parts;
		            if (lib.isArray(obj)) {
		                parts = obj.map(function(item) {
		                    return enc(item[0]) + '=' + enc(item[1]);
		                });
		            } else {
		                parts = [];
		                for (var k in obj) {
		                    if (obj.hasOwnProperty(k)) {
		                        parts.push(enc(k) + '=' + enc(obj[k]));
		                    }
		                }
		            }
		            return parts.join('&');
		        }
		    },

		    urlize: function(str, length, nofollow) {
		        if (isNaN(length)) length = Infinity;

		        var noFollowAttr = (nofollow === true ? ' rel="nofollow"' : '');

		        // For the jinja regexp, see
		        // https://github.com/mitsuhiko/jinja2/blob/f15b814dcba6aa12bc74d1f7d0c881d55f7126be/jinja2/utils.py#L20-L23
		        var puncRE = /^(?:\(|<|&lt;)?(.*?)(?:\.|,|\)|\n|&gt;)?$/;
		        // from http://blog.gerv.net/2011/05/html5_email_address_regexp/
		        var emailRE = /^[\w.!#$%&'*+\-\/=?\^`{|}~]+@[a-z\d\-]+(\.[a-z\d\-]+)+$/i;
		        var httpHttpsRE = /^https?:\/\/.*$/;
		        var wwwRE = /^www\./;
		        var tldRE = /\.(?:org|net|com)(?:\:|\/|$)/;

		        var words = str.split(/(\s+)/).filter(function(word) {
		          // If the word has no length, bail. This can happen for str with
		          // trailing whitespace.
		          return word && word.length;
		        }).map(function(word) {
		          var matches = word.match(puncRE);
		          var possibleUrl = matches && matches[1] || word;

		          // url that starts with http or https
		          if (httpHttpsRE.test(possibleUrl))
		            return '<a href="' + possibleUrl + '"' + noFollowAttr + '>' + possibleUrl.substr(0, length) + '</a>';

		          // url that starts with www.
		          if (wwwRE.test(possibleUrl))
		            return '<a href="http://' + possibleUrl + '"' + noFollowAttr + '>' + possibleUrl.substr(0, length) + '</a>';

		          // an email address of the form username@domain.tld
		          if (emailRE.test(possibleUrl))
		            return '<a href="mailto:' + possibleUrl + '">' + possibleUrl + '</a>';

		          // url that ends in .com, .org or .net that is not an email address
		          if (tldRE.test(possibleUrl))
		            return '<a href="http://' + possibleUrl + '"' + noFollowAttr + '>' + possibleUrl.substr(0, length) + '</a>';

		          return word;

		        });

		        return words.join('');
		    },

		    wordcount: function(str) {
		        str = normalize(str, '');
		        var words = (str) ? str.match(/\w+/g) : null;
		        return (words) ? words.length : null;
		    },

		    'float': function(val, def) {
		        var res = parseFloat(val);
		        return isNaN(res) ? def : res;
		    },

		    'int': function(val, def) {
		        var res = parseInt(val, 10);
		        return isNaN(res) ? def : res;
		    }
		};

		// Aliases
		filters.d = filters['default'];
		filters.e = filters.escape;

		module.exports = filters;


	/***/ },
	/* 8 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var lib = __webpack_require__(1);
		var Obj = __webpack_require__(6);

		// Frames keep track of scoping both at compile-time and run-time so
		// we know how to access variables. Block tags can introduce special
		// variables, for example.
		var Frame = Obj.extend({
		    init: function(parent, isolateWrites) {
		        this.variables = {};
		        this.parent = parent;
		        this.topLevel = false;
		        // if this is true, writes (set) should never propagate upwards past
		        // this frame to its parent (though reads may).
		        this.isolateWrites = isolateWrites;
		    },

		    set: function(name, val, resolveUp) {
		        // Allow variables with dots by automatically creating the
		        // nested structure
		        var parts = name.split('.');
		        var obj = this.variables;
		        var frame = this;

		        if(resolveUp) {
		            if((frame = this.resolve(parts[0], true))) {
		                frame.set(name, val);
		                return;
		            }
		        }

		        for(var i=0; i<parts.length - 1; i++) {
		            var id = parts[i];

		            if(!obj[id]) {
		                obj[id] = {};
		            }
		            obj = obj[id];
		        }

		        obj[parts[parts.length - 1]] = val;
		    },

		    get: function(name) {
		        var val = this.variables[name];
		        if(val !== undefined && val !== null) {
		            return val;
		        }
		        return null;
		    },

		    lookup: function(name) {
		        var p = this.parent;
		        var val = this.variables[name];
		        if(val !== undefined && val !== null) {
		            return val;
		        }
		        return p && p.lookup(name);
		    },

		    resolve: function(name, forWrite) {
		        var p = (forWrite && this.isolateWrites) ? undefined : this.parent;
		        var val = this.variables[name];
		        if(val !== undefined && val !== null) {
		            return this;
		        }
		        return p && p.resolve(name);
		    },

		    push: function(isolateWrites) {
		        return new Frame(this, isolateWrites);
		    },

		    pop: function() {
		        return this.parent;
		    }
		});

		function makeMacro(argNames, kwargNames, func) {
		    return function() {
		        var argCount = numArgs(arguments);
		        var args;
		        var kwargs = getKeywordArgs(arguments);
		        var i;

		        if(argCount > argNames.length) {
		            args = Array.prototype.slice.call(arguments, 0, argNames.length);

		            // Positional arguments that should be passed in as
		            // keyword arguments (essentially default values)
		            var vals = Array.prototype.slice.call(arguments, args.length, argCount);
		            for(i = 0; i < vals.length; i++) {
		                if(i < kwargNames.length) {
		                    kwargs[kwargNames[i]] = vals[i];
		                }
		            }

		            args.push(kwargs);
		        }
		        else if(argCount < argNames.length) {
		            args = Array.prototype.slice.call(arguments, 0, argCount);

		            for(i = argCount; i < argNames.length; i++) {
		                var arg = argNames[i];

		                // Keyword arguments that should be passed as
		                // positional arguments, i.e. the caller explicitly
		                // used the name of a positional arg
		                args.push(kwargs[arg]);
		                delete kwargs[arg];
		            }

		            args.push(kwargs);
		        }
		        else {
		            args = arguments;
		        }

		        return func.apply(this, args);
		    };
		}

		function makeKeywordArgs(obj) {
		    obj.__keywords = true;
		    return obj;
		}

		function getKeywordArgs(args) {
		    var len = args.length;
		    if(len) {
		        var lastArg = args[len - 1];
		        if(lastArg && lastArg.hasOwnProperty('__keywords')) {
		            return lastArg;
		        }
		    }
		    return {};
		}

		function numArgs(args) {
		    var len = args.length;
		    if(len === 0) {
		        return 0;
		    }

		    var lastArg = args[len - 1];
		    if(lastArg && lastArg.hasOwnProperty('__keywords')) {
		        return len - 1;
		    }
		    else {
		        return len;
		    }
		}

		// A SafeString object indicates that the string should not be
		// autoescaped. This happens magically because autoescaping only
		// occurs on primitive string objects.
		function SafeString(val) {
		    if(typeof val !== 'string') {
		        return val;
		    }

		    this.val = val;
		    this.length = val.length;
		}

		SafeString.prototype = Object.create(String.prototype, {
		    length: { writable: true, configurable: true, value: 0 }
		});
		SafeString.prototype.valueOf = function() {
		    return this.val;
		};
		SafeString.prototype.toString = function() {
		    return this.val;
		};

		function copySafeness(dest, target) {
		    if(dest instanceof SafeString) {
		        return new SafeString(target);
		    }
		    return target.toString();
		}

		function markSafe(val) {
		    var type = typeof val;

		    if(type === 'string') {
		        return new SafeString(val);
		    }
		    else if(type !== 'function') {
		        return val;
		    }
		    else {
		        return function() {
		            var ret = val.apply(this, arguments);

		            if(typeof ret === 'string') {
		                return new SafeString(ret);
		            }

		            return ret;
		        };
		    }
		}

		function suppressValue(val, autoescape) {
		    val = (val !== undefined && val !== null) ? val : '';

		    if(autoescape && typeof val === 'string') {
		        val = lib.escape(val);
		    }

		    return val;
		}

		function ensureDefined(val, lineno, colno) {
		    if(val === null || val === undefined) {
		        throw new lib.TemplateError(
		            'attempted to output null or undefined value',
		            lineno + 1,
		            colno + 1
		        );
		    }
		    return val;
		}

		function memberLookup(obj, val) {
		    obj = obj || {};

		    if(typeof obj[val] === 'function') {
		        return function() {
		            return obj[val].apply(obj, arguments);
		        };
		    }

		    return obj[val];
		}

		function callWrap(obj, name, context, args) {
		    if(!obj) {
		        throw new Error('Unable to call `' + name + '`, which is undefined or falsey');
		    }
		    else if(typeof obj !== 'function') {
		        throw new Error('Unable to call `' + name + '`, which is not a function');
		    }

		    // jshint validthis: true
		    return obj.apply(context, args);
		}

		function contextOrFrameLookup(context, frame, name) {
		    var val = frame.lookup(name);
		    return (val !== undefined && val !== null) ?
		        val :
		        context.lookup(name);
		}

		function handleError(error, lineno, colno) {
		    if(error.lineno) {
		        return error;
		    }
		    else {
		        return new lib.TemplateError(error, lineno, colno);
		    }
		}

		function asyncEach(arr, dimen, iter, cb) {
		    if(lib.isArray(arr)) {
		        var len = arr.length;

		        lib.asyncIter(arr, function(item, i, next) {
		            switch(dimen) {
		            case 1: iter(item, i, len, next); break;
		            case 2: iter(item[0], item[1], i, len, next); break;
		            case 3: iter(item[0], item[1], item[2], i, len, next); break;
		            default:
		                item.push(i, next);
		                iter.apply(this, item);
		            }
		        }, cb);
		    }
		    else {
		        lib.asyncFor(arr, function(key, val, i, len, next) {
		            iter(key, val, i, len, next);
		        }, cb);
		    }
		}

		function asyncAll(arr, dimen, func, cb) {
		    var finished = 0;
		    var len, i;
		    var outputArr;

		    function done(i, output) {
		        finished++;
		        outputArr[i] = output;

		        if(finished === len) {
		            cb(null, outputArr.join(''));
		        }
		    }

		    if(lib.isArray(arr)) {
		        len = arr.length;
		        outputArr = new Array(len);

		        if(len === 0) {
		            cb(null, '');
		        }
		        else {
		            for(i = 0; i < arr.length; i++) {
		                var item = arr[i];

		                switch(dimen) {
		                case 1: func(item, i, len, done); break;
		                case 2: func(item[0], item[1], i, len, done); break;
		                case 3: func(item[0], item[1], item[2], i, len, done); break;
		                default:
		                    item.push(i, done);
		                    // jshint validthis: true
		                    func.apply(this, item);
		                }
		            }
		        }
		    }
		    else {
		        var keys = lib.keys(arr);
		        len = keys.length;
		        outputArr = new Array(len);

		        if(len === 0) {
		            cb(null, '');
		        }
		        else {
		            for(i = 0; i < keys.length; i++) {
		                var k = keys[i];
		                func(k, arr[k], i, len, done);
		            }
		        }
		    }
		}

		module.exports = {
		    Frame: Frame,
		    makeMacro: makeMacro,
		    makeKeywordArgs: makeKeywordArgs,
		    numArgs: numArgs,
		    suppressValue: suppressValue,
		    ensureDefined: ensureDefined,
		    memberLookup: memberLookup,
		    contextOrFrameLookup: contextOrFrameLookup,
		    callWrap: callWrap,
		    handleError: handleError,
		    isArray: lib.isArray,
		    keys: lib.keys,
		    SafeString: SafeString,
		    copySafeness: copySafeness,
		    markSafe: markSafe,
		    asyncEach: asyncEach,
		    asyncAll: asyncAll,
		    inOperator: lib.inOperator
		};


	/***/ },
	/* 9 */
	/***/ function(module, exports) {

		'use strict';

		function cycler(items) {
		    var index = -1;

		    return {
		        current: null,
		        reset: function() {
		            index = -1;
		            this.current = null;
		        },

		        next: function() {
		            index++;
		            if(index >= items.length) {
		                index = 0;
		            }

		            this.current = items[index];
		            return this.current;
		        },
		    };

		}

		function joiner(sep) {
		    sep = sep || ',';
		    var first = true;

		    return function() {
		        var val = first ? '' : sep;
		        first = false;
		        return val;
		    };
		}

		// Making this a function instead so it returns a new object
		// each time it's called. That way, if something like an environment
		// uses it, they will each have their own copy.
		function globals() {
		    return {
		        range: function(start, stop, step) {
		            if(typeof stop === 'undefined') {
		                stop = start;
		                start = 0;
		                step = 1;
		            }
		            else if(!step) {
		                step = 1;
		            }

		            var arr = [];
		            var i;
		            if (step > 0) {
		                for (i=start; i<stop; i+=step) {
		                    arr.push(i);
		                }
		            } else {
		                for (i=start; i>stop; i+=step) {
		                    arr.push(i);
		                }
		            }
		            return arr;
		        },

		        // lipsum: function(n, html, min, max) {
		        // },

		        cycler: function() {
		            return cycler(Array.prototype.slice.call(arguments));
		        },

		        joiner: function(sep) {
		            return joiner(sep);
		        }
		    };
		}

		module.exports = globals;


	/***/ },
	/* 10 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var Loader = __webpack_require__(11);

		var PrecompiledLoader = Loader.extend({
		    init: function(compiledTemplates) {
		        this.precompiled = compiledTemplates || {};
		    },

		    getSource: function(name) {
		        if (this.precompiled[name]) {
		            return {
		                src: { type: 'code',
		                       obj: this.precompiled[name] },
		                path: name
		            };
		        }
		        return null;
		    }
		});

		module.exports = PrecompiledLoader;


	/***/ },
	/* 11 */
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		var path = __webpack_require__(3);
		var Obj = __webpack_require__(6);
		var lib = __webpack_require__(1);

		var Loader = Obj.extend({
		    on: function(name, func) {
		        this.listeners = this.listeners || {};
		        this.listeners[name] = this.listeners[name] || [];
		        this.listeners[name].push(func);
		    },

		    emit: function(name /*, arg1, arg2, ...*/) {
		        var args = Array.prototype.slice.call(arguments, 1);

		        if(this.listeners && this.listeners[name]) {
		            lib.each(this.listeners[name], function(listener) {
		                listener.apply(null, args);
		            });
		        }
		    },

		    resolve: function(from, to) {
		        return path.resolve(path.dirname(from), to);
		    },

		    isRelative: function(filename) {
		        return (filename.indexOf('./') === 0 || filename.indexOf('../') === 0);
		    }
		});

		module.exports = Loader;


	/***/ },
	/* 12 */
	/***/ function(module, exports) {

		function installCompat() {
		  'use strict';

		  // This must be called like `nunjucks.installCompat` so that `this`
		  // references the nunjucks instance
		  var runtime = this.runtime; // jshint ignore:line
		  var lib = this.lib; // jshint ignore:line

		  var orig_contextOrFrameLookup = runtime.contextOrFrameLookup;
		  runtime.contextOrFrameLookup = function(context, frame, key) {
		    var val = orig_contextOrFrameLookup.apply(this, arguments);
		    if (val === undefined) {
		      switch (key) {
		      case 'True':
		        return true;
		      case 'False':
		        return false;
		      case 'None':
		        return null;
		      }
		    }

		    return val;
		  };

		  var orig_memberLookup = runtime.memberLookup;
		  var ARRAY_MEMBERS = {
		    pop: function(index) {
		      if (index === undefined) {
		        return this.pop();
		      }
		      if (index >= this.length || index < 0) {
		        throw new Error('KeyError');
		      }
		      return this.splice(index, 1);
		    },
		    remove: function(element) {
		      for (var i = 0; i < this.length; i++) {
		        if (this[i] === element) {
		          return this.splice(i, 1);
		        }
		      }
		      throw new Error('ValueError');
		    },
		    count: function(element) {
		      var count = 0;
		      for (var i = 0; i < this.length; i++) {
		        if (this[i] === element) {
		          count++;
		        }
		      }
		      return count;
		    },
		    index: function(element) {
		      var i;
		      if ((i = this.indexOf(element)) === -1) {
		        throw new Error('ValueError');
		      }
		      return i;
		    },
		    find: function(element) {
		      return this.indexOf(element);
		    },
		    insert: function(index, elem) {
		      return this.splice(index, 0, elem);
		    }
		  };
		  var OBJECT_MEMBERS = {
		    items: function() {
		      var ret = [];
		      for(var k in this) {
		        ret.push([k, this[k]]);
		      }
		      return ret;
		    },
		    values: function() {
		      var ret = [];
		      for(var k in this) {
		        ret.push(this[k]);
		      }
		      return ret;
		    },
		    keys: function() {
		      var ret = [];
		      for(var k in this) {
		        ret.push(k);
		      }
		      return ret;
		    },
		    get: function(key, def) {
		      var output = this[key];
		      if (output === undefined) {
		        output = def;
		      }
		      return output;
		    },
		    has_key: function(key) {
		      return this.hasOwnProperty(key);
		    },
		    pop: function(key, def) {
		      var output = this[key];
		      if (output === undefined && def !== undefined) {
		        output = def;
		      } else if (output === undefined) {
		        throw new Error('KeyError');
		      } else {
		        delete this[key];
		      }
		      return output;
		    },
		    popitem: function() {
		      for (var k in this) {
		        // Return the first object pair.
		        var val = this[k];
		        delete this[k];
		        return [k, val];
		      }
		      throw new Error('KeyError');
		    },
		    setdefault: function(key, def) {
		      if (key in this) {
		        return this[key];
		      }
		      if (def === undefined) {
		        def = null;
		      }
		      return this[key] = def;
		    },
		    update: function(kwargs) {
		      for (var k in kwargs) {
		        this[k] = kwargs[k];
		      }
		      return null;  // Always returns None
		    }
		  };
		  OBJECT_MEMBERS.iteritems = OBJECT_MEMBERS.items;
		  OBJECT_MEMBERS.itervalues = OBJECT_MEMBERS.values;
		  OBJECT_MEMBERS.iterkeys = OBJECT_MEMBERS.keys;
		  runtime.memberLookup = function(obj, val, autoescape) { // jshint ignore:line
		    obj = obj || {};

		    // If the object is an object, return any of the methods that Python would
		    // otherwise provide.
		    if (lib.isArray(obj) && ARRAY_MEMBERS.hasOwnProperty(val)) {
		      return function() {return ARRAY_MEMBERS[val].apply(obj, arguments);};
		    }

		    if (lib.isObject(obj) && OBJECT_MEMBERS.hasOwnProperty(val)) {
		      return function() {return OBJECT_MEMBERS[val].apply(obj, arguments);};
		    }

		    return orig_memberLookup.apply(this, arguments);
		  };
		}

		module.exports = installCompat;


	/***/ }
	/******/ ]);

	/*** EXPORTS FROM exports-loader ***/
	module.exports = nunjucks;

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (nunjucks, env, obj, dependencies) {

	    var oldRoot = obj.root;

	    obj.root = function (env, context, frame, runtime, ignoreMissing, cb) {
	        var oldGetTemplate = env.getTemplate;
	        env.getTemplate = function (name, ec, parentName, ignoreMissing, cb) {
	            if (typeof ec === "function") {
	                cb = ec = false;
	            }
	            var _require = function _require(name) {
	                try {
	                    // add a reference to the already resolved dependency here
	                    return dependencies[name];
	                } catch (e) {
	                    if (frame.get("_require")) {
	                        return frame.get("_require")(name);
	                    } else {
	                        console.warn('Could not load template "%s"', name);
	                    }
	                }
	            };

	            var tmpl = _require(name);
	            frame.set("_require", _require);

	            if (ec) tmpl.compile();
	            cb(null, tmpl);
	        };

	        oldRoot(env, context, frame, runtime, ignoreMissing, function (err, res) {
	            env.getTemplate = oldGetTemplate;
	            cb(err, res);
	        });
	    };

	    var src = {
	        obj: obj,
	        type: 'code'
	    };

	    return new nunjucks.Template(src, env);
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var nunjucks = __webpack_require__(17);
	var env;
	if (!nunjucks.currentEnv){
		env = nunjucks.currentEnv = new nunjucks.Environment([], { autoescape: true });
	} else {
		env = nunjucks.currentEnv;
	}
	var dependencies = nunjucks.webpackDependencies || (nunjucks.webpackDependencies = {});




	var shim = __webpack_require__(18);


	(function() {(nunjucks.nunjucksPrecompiled = nunjucks.nunjucksPrecompiled || {})["pages/icon/icon.njk"] = (function() {
	function root(env, context, frame, runtime, cb) {
	var lineno = null;
	var colno = null;
	var output = "";
	try {
	var parentTemplate = null;
	output += "\n\n\n<article class=\"icons__item\">\n  <section class=\"icon\" data-clipboard-text=\"";
	output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "name"), env.opts.autoescape);
	output += "\">\n    <section class=\"icon__icon\">\n      <span class=\"ic ";
	output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "name"), env.opts.autoescape);
	output += "\"></span>\n    </section>\n\n    <section class=\"icon__name\">\n      ";
	output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "name"), env.opts.autoescape);
	output += "\n    </section>\n\n    <section class=\"icon__content\">\n      ";
	output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "code"), env.opts.autoescape);
	output += "\n    </section>\n  </section>\n</article><!-- /.icons__item -->\n";
	if(parentTemplate) {
	parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
	} else {
	cb(null, output);
	}
	;
	} catch (e) {
	  cb(runtime.handleError(e, lineno, colno));
	}
	}
	return {
	root: root
	};

	})();
	})();



	module.exports = shim(nunjucks, env, nunjucks.nunjucksPrecompiled["pages/icon/icon.njk"] , dependencies)

/***/ }
/******/ ]);