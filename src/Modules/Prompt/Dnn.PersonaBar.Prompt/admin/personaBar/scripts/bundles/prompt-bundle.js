/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/scripts/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * JavaScript Cookie v2.1.3
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader = false;
	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		registeredInModuleLoader = true;
	}
	if (( false ? 'undefined' : _typeof(exports)) === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
})(function () {
	function extend() {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[i];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init(converter) {
		function api(key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';

				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}
					stringifiedAttributes += '=' + attributes[attributeName];
				}
				return document.cookie = key + '=' + value + stringifiedAttributes;
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ? converter.read(cookie, name) : converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var css = __webpack_require__(1);

var Cookies = __webpack_require__(0);

var DnnPrompt = function () {
    function DnnPrompt(vsn, wrapper, util, params) {
        _classCallCheck(this, DnnPrompt);

        var self = this;

        self.version = vsn;
        self.util = util;
        self.wrapper = wrapper;
        console.log(self.util);
        self.params = params;
        self.tabId = null;
        self.history = []; // Command history
        // restore history if it exists
        if (sessionStorage) {
            if (sessionStorage.getItem('dnn-prompt-console-history')) {
                self.history = JSON.parse(sessionStorage.getItem('dnn-prompt-console-history'));
            }
        }
        self.cmdOffset = 0; // reverse offset into history

        self.createElements();
        self.wireEvents();
        self.showGreeting();
        self.busy(false);
        self.focus();
        self.getCommands();
    }

    _createClass(DnnPrompt, [{
        key: 'wireEvents',
        value: function wireEvents() {
            var self = this;

            self.isDragging = false;

            // intermediary functions so that 'this' points to class and not event source
            self.keyDownHandler = function (e) {
                self.onKeyDown(e);
            };
            self.clickHandler = function (e) {
                self.onClickHandler(e);
            };
            self.mouseDownHandler = function (e) {
                self.onMouseDownHandler(e);
            };
            self.mouseUpHandler = function (e) {
                self.onMouseUpHandler(e);
            };

            // register on parent doc so panel can be loaded with keypress combo
            window.parent.document.addEventListener('keydown', self.keyDownHandler);
            document.addEventListener('keydown', self.keyDownHandler);
            self.ctrlEl.addEventListener('mousedown', self.mouseDownHandler);
            self.ctrlEl.addEventListener('mouseup', self.mouseUpHandler);
            self.ctrlEl.addEventListener('click', self.clickHandler);
        }
    }, {
        key: 'onMouseDownHandler',
        value: function onMouseDownHandler(e) {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        }
    }, {
        key: 'onMouseUpHandler',
        value: function onMouseUpHandler(e) {
            if (Math.abs(this.mouseX - e.clientX) > 10 || Math.abs(this.mouseY - e.clientY) > 5) {
                this.isDragging = true;
            } else {
                this.isDragging = false;
            }
        }
    }, {
        key: 'onClickHandler',
        value: function onClickHandler(e) {
            if (this.isDragging) return;
            if (e.target.classList.contains("dnn-prompt-cmd-insert")) {
                // insert command and set focus
                this.inputEl.value = e.target.dataset.cmd.replace(/'/g, '"');
                this.inputEl.focus();
            } else {
                this.focus();
            }
        }
    }, {
        key: 'onKeyDown',
        value: function onKeyDown(e) {
            var self = this;
            // CTRL + `
            if (e.ctrlKey && e.keyCode === 192) {
                if (self.wrapper[0].offsetLeft <= 0) {
                    self.util.loadPanel("Dnn.Prompt", {
                        moduleName: "Dnn.Prompt",
                        folderName: "",
                        identifier: "Dnn.Prompt",
                        path: "Prompt"
                    });
                } else {
                    self.util.closePersonaBar();
                }
                return;
            }

            if (self.isBusy) return;

            // All other keys, only trap if focus is in console.
            if (self.inputEl === document.activeElement) {
                switch (e.keyCode) {
                    case 13:
                        // enter key
                        return self.runCmd();
                    case 38:
                        // Up arrow
                        if (self.history.length + self.cmdOffset > 0) {
                            self.cmdOffset--;
                            self.inputEl.value = self.history[self.history.length + self.cmdOffset];
                            e.preventDefault();
                        }
                        break;
                    case 40:
                        // Down arrow
                        if (self.cmdOffset < -1) {
                            self.cmdOffset++;
                            self.inputEl.value = self.history[self.history.length + self.cmdOffset];
                            e.preventDefault();
                        }
                        break;
                }
            }
        }
    }, {
        key: 'runCmd',
        value: function runCmd() {
            var _this = this;

            var self = this;
            var txt = self.inputEl.value.trim();

            if (!self.tabId) {
                self.tabId = dnn.getVar("sf_tabId");
            }

            self.cmdOffset = 0; // reset history index
            self.inputEl.value = ""; // clearn input for future commands.
            self.writeLine(txt, "cmd"); // Write cmd to output
            if (txt === "") {
                return;
            } // don't process if cmd is emtpy
            self.history.push(txt); // Add cmd to history
            if (sessionStorage) {
                sessionStorage.setItem('dnn-prompt-console-history', JSON.stringify(self.history));
            }

            // Client Command
            var tokens = txt.split(" "),
                cmd = tokens[0].toUpperCase();

            if (cmd === "CLS" || cmd === "CLEAR-SCREEN") {
                self.outputEl.innerHTML = "";
                return;
            }
            if (cmd === "EXIT") {
                this.util.closePersonaBar();
                return;
            }
            if (cmd === "HELP") {
                self.renderHelp(tokens);
                return;
            }
            if (cmd === "CONFIG") {
                self.configConsole(tokens);
                return;
            }
            if (cmd === "CLH" || cmd === "CLEAR-HISTORY") {
                self.history = [];
                sessionStorage.removeItem('dnn-prompt-console-history');
                self.writeLine("Session command history cleared");
                return;
            }
            if (cmd === "SET-MODE") {
                self.changeUserMode(tokens);
                return;
            }
            // using if/else to allow reload if hash in URL and also prevent 'syntax invalid' message;
            if (cmd === "RELOAD") {
                window.top.location.reload(true);
            } else {
                (function () {
                    // Server Command
                    self.busy(true);
                    // special handling for 'goto' command
                    var bRedirect = false;
                    if (cmd === "GOTO") {
                        bRedirect = true;
                    }

                    var afVal = _this.util.sf.antiForgeryToken;

                    var path = 'API/PersonaBar/Command/Cmd';
                    if (_this.util.sf) {
                        path = _this.util.sf.getSiteRoot() + path;
                    } else {
                        path = '/' + path;
                    }

                    fetch(path, {
                        method: 'post',
                        headers: new Headers({
                            'Content-Type': 'application/json',
                            'RequestVerificationToken': afVal
                        }),
                        credentials: 'include',
                        body: JSON.stringify({ cmdLine: txt, currentPage: self.tabId })
                    }).then(function (response) {
                        return response.json();
                    }).then(function (result) {
                        if (result.Message) {
                            // dnn web api error
                            result.output = result.Message;
                            result.isError = true;
                        }
                        var output = result.output;
                        var style = result.isError ? "error" : "ok";
                        var data = result.data;
                        var fieldOrder = result.fieldOrder;
                        if (typeof fieldOrder === 'undefined' || !fieldOrder || fieldOrder.length === 0) {
                            fieldOrder = null;
                        }

                        if (bRedirect) {
                            window.top.location.href = output;
                        } else {
                            if (data) {
                                var html = self.renderData(data, fieldOrder);
                                self.writeHtml(html);
                                if (output) {
                                    self.writeLine(output);
                                }
                            } else if (result.isHtml) {
                                self.writeHtml(output);
                            } else {
                                self.writeLine(output, style);
                            }
                        }

                        if (result.mustReload) {
                            self.writeHtml('<div class="dnn-prompt-ok"><strong>Reloading in 3 seconds</strong></div>');
                            setTimeout(function () {
                                return location.reload(true);
                            }, 3000);
                        }
                    }).catch(function (err) {
                        console.log('err', err);
                        self.writeLine("Error sending request to server", "error");
                    }).then(function () {
                        // finally
                        self.busy(false);
                        self.focus();
                    });

                    self.inputEl.blur(); // remove focus from input elment
                })();
            }
        }
    }, {
        key: 'getCommands',
        value: function getCommands() {
            var self = this;
            var path = 'API/PersonaBar/Command/List';
            if (this.util.sf) {
                path = this.util.sf.getSiteRoot() + path;
            } else {
                path = '/' + path;
            }

            fetch(path, {
                method: 'get',
                credentials: 'include'
            }).then(function (response) {
                return response.json();
            }).then(function (result) {
                self.commands = result;
            });
        }
    }, {
        key: 'focus',
        value: function focus() {
            this.inputEl.focus();
        }
    }, {
        key: 'scrollToBottom',
        value: function scrollToBottom() {
            this.ctrlEl.scrollTop = this.ctrlEl.scrollHeight;
        }
    }, {
        key: 'newLine',
        value: function newLine() {
            this.outputEl.appendChild(document.createElement('br'));
            this.scrollToBottom();
        }
    }, {
        key: 'writeLine',
        value: function writeLine(txt, cssSuffix) {
            var span = document.createElement('span');
            cssSuffix = cssSuffix || 'ok';
            span.className = 'dnn-prompt-' + cssSuffix;
            span.innerText = txt;
            this.outputEl.appendChild(span);
            this.newLine();
        }
    }, {
        key: 'writeHtml',
        value: function writeHtml(markup) {
            var div = document.createElement('div');
            div.innerHTML = markup;
            this.outputEl.appendChild(div);
            this.newLine();
        }
    }, {
        key: 'renderData',
        value: function renderData(data, fieldOrder) {
            console.log('renderData::fieldOrder', fieldOrder);
            if (data.length > 1) {
                return this.renderTable(data, fieldOrder);
            } else if (data.length == 1) {
                return this.renderObject(data[0], fieldOrder);
            }
            return "";
        }
    }, {
        key: 'renderTable',
        value: function renderTable(rows, fieldOrder) {
            if (!rows || !rows.length) {
                return;
            }
            var linkFields = this.extractLinkFields(rows[0]);

            var columns = fieldOrder;
            if (!columns || !columns.length) {
                // get columns from first row
                columns = [];
                var row = rows[0];
                for (var key in row) {
                    if (!key.startsWith("__")) {
                        columns.push(key);
                    }
                }
            }

            // build header
            var out = '<table class="dnn-prompt-tbl"><thead><tr>';
            for (var col in columns) {
                var lbl = this.formatLabel(columns[col]);
                out += '<th>' + lbl + '</th>';
            }
            out += '</tr></thead><tbody>';

            // build rows
            for (var i = 0; i < rows.length; i++) {
                var _row = rows[i];
                out += '<tr>';
                // only use specified columns
                for (var fld in columns) {
                    var fldName = columns[fld];
                    var fldVal = _row[fldName] ? _row[fldName] : '';
                    var cmd = _row["__" + fldName] ? _row["__" + fldName] : null;
                    if (cmd) {
                        out += '<td><a href="#" class="dnn-prompt-cmd-insert" data-cmd="' + cmd + '" title="' + cmd.replace(/'/g, '&quot;') + '">' + fldVal + '</a></td>';
                    } else {
                        out += '<td> ' + fldVal + '</td>';
                    }
                }
                out += '</tr>';
            }
            out += '</tbody></table>';
            return out;
        }
    }, {
        key: 'renderObject',
        value: function renderObject(data, fieldOrder) {
            var linkFields = this.extractLinkFields(data);
            var columns = fieldOrder;
            if (!columns || !columns.length) {
                // no field order. Generate it
                columns = [];
                for (var key in data) {
                    if (!key.startsWith("__")) {
                        columns.push(key);
                    }
                }
            }
            var out = '<table class="dnn-prompt-tbl">';
            for (var fld in columns) {
                var fldName = columns[fld];
                var lbl = this.formatLabel(fldName);
                var fldVal = data[fldName] ? data[fldName] : '';
                var cmd = data["__" + fldName] ? data["__" + fldName] : null;

                if (cmd) {
                    out += '<tr><td class="dnn-prompt-lbl">' + lbl + '</td><td>:</td><td><a href="#" class="dnn-prompt-cmd-insert" data-cmd="' + cmd + '" title="' + cmd.replace(/'/g, '&quot;') + '">' + fldVal + '</a></td></tr>';
                } else {
                    out += '<tr><td class="dnn-prompt-lbl">' + lbl + '</td><td>:</td><td>' + fldVal + '</td></tr>';
                }
            }
            out += '</table>';
            return out;
        }
    }, {
        key: 'formatLabel',
        value: function formatLabel(input) {
            // format camelcase and remove Is from labels
            var output = input.replace(/^(Is)(.+)/i, "$2");
            output = output.match(/[A-Z][a-z]+/g).join(" "); // rudimentary but should handle normal Camelcase
            return output;
        }
    }, {
        key: 'renderHelp',
        value: function renderHelp(tokens) {
            var self = this;
            var path = 'DesktopModules/Admin/Dnn.PersonaBar/Modules/Dnn.Prompt/help/';
            if (!tokens || tokens.length == 1) {
                // render list of help commands
                path += 'index.html';
            } else {
                path += tokens[1] + '.html';
            }

            if (this.util.sf) {
                path = this.util.sf.getSiteRoot() + path;
            } else {
                path = '/' + path;
            }
            self.busy(true);
            fetch(path, {
                method: 'get',
                headers: new Headers({
                    'Content-Type': 'text/html'
                }),
                credentials: 'include'
            }).then(function (response) {
                if (response.status == 200) {
                    return response.text();
                }
                return '<div class="dnn-prompt-error">Unable to find help for that command</div>';
            }).then(function (html) {
                self.writeHtml(html);
            }).catch(function () {
                self.writeLine("Error sending request to server", "error");
            }).then(function () {
                // finally
                self.busy(false);
                self.focus();
            });
        }
    }, {
        key: 'showGreeting',
        value: function showGreeting() {
            this.writeLine('Prompt [' + this.version + '] Type \'help\' to get a list of commands', 'cmd');
            this.newLine();
        }
    }, {
        key: 'extractLinkFields',
        value: function extractLinkFields(row) {
            var linkFields = [];
            if (!row || !row.length) {
                return linkFields;
            }

            // find any command link fields
            for (var fld in row) {
                if (fld.startsWith("__")) {
                    linkFields.push(fld.slice(2));
                }
            }
            return linkFields;
        }
    }, {
        key: 'createElements',
        value: function createElements() {
            var self = this;
            var doc = document;

            // Create and store CLI elements
            self.ctrlEl = doc.getElementById("prompt"); //CLI control outer frame
            self.outputEl = doc.createElement("div"); //div holding cosole output
            self.inputElWrapper = doc.createElement("div"); // div holding the input control
            self.inputEl = doc.createElement("input"); //Input control
            self.busyEl = doc.createElement("div"); // Indicate busy/loading


            // Add CSS
            self.ctrlEl.className = "dnn-prompt";
            self.outputEl.className = "dnn-prompt-output";
            self.inputElWrapper.className = "dnn-prompt-input-wrapper";
            self.inputEl.className = "dnn-prompt-input";
            self.busyEl.className = "dnn-prompt-busy";

            self.inputEl.setAttribute("spellcheck", "false");

            // Assemble HTML
            self.ctrlEl.appendChild(self.outputEl);
            self.inputElWrapper.appendChild(self.inputEl);
            self.ctrlEl.appendChild(self.inputElWrapper);
            self.ctrlEl.appendChild(self.busyEl);

            self.ctrlEl.style.display = "block";

            var consoleHeight = Cookies.get("dnn-prompt-console-height");
            if (consoleHeight) {
                self.configConsole(['config', consoleHeight]);
            }
        }
    }, {
        key: 'busy',
        value: function busy(b) {
            this.isBusy = b;
            this.busyEl.style.display = b ? "block" : "none";
            this.inputEl.style.display = b ? "none" : "inline-block";
        }
    }, {
        key: 'isFlag',
        value: function isFlag(token) {
            return token && token.startsWith('--');
        }
    }, {
        key: 'getFlag',
        value: function getFlag(flag, tokens) {
            var token = null;
            if (!tokens || tokens.length) {
                return null;
            }
            for (var i = 1; i < tokens.length; i++) {
                token = tokens[i];
                // did we find the flag name?
                if (this.isFlag(token) && token.toUpperCase() === flag.toUpperCase()) {
                    // is there a value to be had?
                    if (i + 1 < tokens.length) {
                        if (!this.isFlag(tokens[i + 1])) {
                            return tokens[i + 1];
                        } else {
                            // next token is a flag and not a value. return nothing.
                            return null;
                        }
                    } else {
                        // found but no value
                        return null;
                    }
                }
            }
            // not found
            return null;
        }
    }, {
        key: 'hasFlag',
        value: function hasFlag(flag, tokens) {
            if (!tokens || tokens.length) return false;
            for (var i = 0; i < tokens.length; i++) {
                if (tokens[i].toUpperCase === flag.toUpperCase()) {
                    return true;
                }
            }
            return false;
        }

        // client commands

    }, {
        key: 'configConsole',
        value: function configConsole(tokens) {
            var height = null;
            if (this.hasFlag("--height")) {
                height = this.getFlag("--height", tokens);
            } else if (!this.isFlag(tokens[1])) {
                height = tokens[1];
            }

            if (height) {
                this.ctrlEl.style.height = height;
                Cookies.set("dnn-prompt-console-height", height);
            }
        }
    }, {
        key: 'changeUserMode',
        value: function changeUserMode(tokens) {
            if (!tokens && tokens.length >= 2) {
                return;
            }
            var mode = null;
            if (this.hasFlag("--mode")) {
                mode = this.getFlag("--mode", tokens);
            } else if (!this.isFlag(tokens[1])) {
                mode = tokens[1];
            }
            if (mode) {
                var service = dnn.controlBar.getService();
                var serviceUrl = dnn.controlBar.getServiceUrl(service);
                $.ajax({
                    url: serviceUrl + 'ToggleUserMode',
                    type: 'POST',
                    data: { UserMode: mode },
                    beforeSend: service.setModuleHeaders,
                    success: function success() {
                        window.location.href = window.location.href;
                    },
                    error: function error(xhr) {
                        dnn.controlBar.responseError(xhr);
                    }
                });
            }
        }
    }]);

    return DnnPrompt;
}();

window.DnnPrompt = DnnPrompt;
//# sourceURL=prompt-app.js
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ })
/******/ ]);
//# sourceMappingURL=prompt-bundle.js.map