(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.ts":
/*!************************!*\
  !*** ./src/app/app.ts ***!
  \************************/
/*! exports provided: App */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _tabular_feature_attr_attr_bar_chart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tabular_feature_attr/attr_bar_chart */ "./src/tabular_feature_attr/attr_bar_chart.ts");



/**
 * The root component.
 */
var App = /** @class */ (function () {
    function App() {
        this.title = 'webapp';
    }
    App.ɵfac = function App_Factory(t) { return new (t || App)(); };
    App.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: App, selectors: [["app-root"]], decls: 2, vars: 0, consts: [[1, "inline", "attr-component"]], template: function App_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-attr-bar-chart");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        } }, directives: [_tabular_feature_attr_attr_bar_chart__WEBPACK_IMPORTED_MODULE_1__["AttrBarChart"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5zY3NzIn0= */"] });
    return App;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](App, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.ng.html',
                styleUrls: ['./app.scss']
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/app_module.ts":
/*!*******************************!*\
  !*** ./src/app/app_module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm5/animations.js");
/* harmony import */ var _tabular_feature_attr_tabular_feature_attr_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tabular_feature_attr/tabular_feature_attr_module */ "./src/tabular_feature_attr/tabular_feature_attr_module.ts");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app */ "./src/app/app.ts");






/**
 * The main application module.
 */
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app__WEBPACK_IMPORTED_MODULE_4__["App"]] });
    AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClientModule"],
                _tabular_feature_attr_tabular_feature_attr_module__WEBPACK_IMPORTED_MODULE_3__["TabularFeatureAttrModule"],
            ]] });
    return AppModule;
}());

(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app__WEBPACK_IMPORTED_MODULE_4__["App"]], imports: [_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClientModule"],
        _tabular_feature_attr_tabular_feature_attr_module__WEBPACK_IMPORTED_MODULE_3__["TabularFeatureAttrModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app__WEBPACK_IMPORTED_MODULE_4__["App"],
                ],
                imports: [
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClientModule"],
                    _tabular_feature_attr_tabular_feature_attr_module__WEBPACK_IMPORTED_MODULE_3__["TabularFeatureAttrModule"],
                ],
                providers: [],
                bootstrap: [_app__WEBPACK_IMPORTED_MODULE_4__["App"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
/**
 * @fileoverview Configure the environment to be non-production.
 *
 * This is used in non-Google3 environment only.
 */
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`,
 * `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a
 * negative impact on performance if an error is thrown.
 */ 


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app_module */ "./src/app/app_module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm5/platform-browser.js");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production)
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });
;


/***/ }),

/***/ "./src/tabular_feature_attr/attr_bar_chart.ts":
/*!****************************************************!*\
  !*** ./src/tabular_feature_attr/attr_bar_chart.ts ***!
  \****************************************************/
/*! exports provided: AttrBarChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AttrBarChart", function() { return AttrBarChart; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3 */ "./node_modules/d3/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _feature_attr_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./feature_attr_service */ "./src/tabular_feature_attr/feature_attr_service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/common.js");
/* harmony import */ var _tooltip_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tooltip.directive */ "./src/tabular_feature_attr/tooltip.directive.ts");









var _c0 = ["attr_bar_chart"];
function AttrBarChart__svg_rect_22_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "rect", 22);
} if (rf & 2) {
    var color_r4 = ctx.$implicit;
    var idx_r5 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMapInterpolate2"]("fill:", color_r4, "; x:", idx_r5 * 20, ";");
} }
function AttrBarChart_div_29_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "warning");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "a", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, " Learn more ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, " open_in_new ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, " Attributions may not be accurate, try increasing # of steps. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" High Approximation Error (", ctx_r1.approxError.toFixed(2), ") ");
} }
function AttrBarChart__svg_g_34_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "g", 27);
} if (rf & 2) {
    var feature_r6 = ctx.$implicit;
    var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate3"]("tooltip", "Feature: ", feature_r6, "\nAttribution: ", ctx_r3.data.get(feature_r6), "\nValue: ", ctx_r3.values.get(feature_r6), "");
} }
/**
 * AttrBarChart: a component for showing the bar chart of attribution
 * values. Each bar represents the attribution score of a given feature.
 */
var AttrBarChart = /** @class */ (function () {
    function AttrBarChart(cd, featureAttrService) {
        this.cd = cd;
        this.featureAttrService = featureAttrService;
        this.tabularExplain = this.featureAttrService.tabularExplainSource;
        this.barWidth = 20;
        this.width = 410;
        this.baseHeight = 110;
        this.height = 120;
        this.minBarLength = 5;
        this.margin = {
            left: 120,
            top: 30,
            bottom: 15,
            right: 10,
        };
        // Public fields for the Angular template
        this.features = [];
        this.data = new Map();
        this.values = new Map();
        this.highApproxError = false;
        this.prediction = 0;
        this.baseline = 0;
        this.range = 0;
        this.barColors = [
            '#d73027', '#ef7043', '#fca964', '#fee090', '#e0f3f8', '#a1cae2', '#6fa0cb',
            '#4575b4'
        ];
        this.date = new Date().toLocaleString();
        // Handle on-destroy Subject, used to unsubscribe.
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_2__["ReplaySubject"](1);
    }
    AttrBarChart.prototype.ngAfterViewInit = function () {
        var _this = this;
        var readyEvent = new CustomEvent('readyEvent', { detail: { ready: true } });
        window.parent.document.dispatchEvent(readyEvent);
        this.tabularExplain.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this.destroyed))
            .subscribe(function (explanation) {
            if (_this.attrBarChartSvg) {
                var data = new Map(Object.entries(explanation.attrs));
                var values = new Map(Object.entries(explanation.inputValues));
                _this.approxError = explanation.approximationError;
                if (_this.approxError && _this.approxError > 0.05) {
                    _this.highApproxError = true;
                }
                _this.prediction = Number(explanation.prediction.toFixed(5));
                _this.baseline = Number(explanation.baseline.toFixed(5));
                _this.drawBarChart(_this.attrBarChartSvg, data, values);
                var iframeResizeEvent = new CustomEvent('iframeResizeEvent', { detail: document.documentElement.scrollHeight });
                window.parent.document.dispatchEvent(iframeResizeEvent);
            }
        });
    };
    AttrBarChart.prototype.ngOnDestroy = function () {
        // Unsubscribes all pending subscriptions.
        this.destroyed.next();
        this.destroyed.complete();
    };
    /**
     * The main function for drawing the bar chart onto the SVG
     * element.
     */
    AttrBarChart.prototype.drawBarChart = function (targetEle, data, values) {
        if (!targetEle) {
            throw new Error('undefined target for visualization');
        }
        else {
            var g = this.getAdjustedSVGGElement(targetEle, data.size);
            // sort data for easy viewing
            var dataArr = Array.from(data.entries());
            dataArr.sort(function (a, b) { return d3__WEBPACK_IMPORTED_MODULE_1__["ascending"](a[1], b[1]); });
            var dataMax = dataArr[dataArr.length - 1][1];
            var dataMin = dataArr[0][1];
            var sortedData = new Map(dataArr);
            // populate public fields, which propagate to the Angular template
            this.features = Array.from(sortedData.keys());
            this.data = sortedData;
            this.values = values;
            // get xScale and xDomains
            var yScale = this.getYScale(sortedData);
            var xScale = this.getXScale(dataMax, dataMin);
            var colorScale = this.getColorScale(dataMax, dataMin);
            this.addXAxis(g, xScale);
            this.addYAxis(g, yScale, values);
            this.cd.detectChanges();
            this.addBars(g, sortedData, xScale, yScale, colorScale);
        }
    };
    /**
     * Adjust the size of the SVG and adjust margins via
     * g element transform. Then return the selection of SVGGElement.
     */
    AttrBarChart.prototype.getAdjustedSVGGElement = function (targetEle, featureCount) {
        var ele = targetEle.nativeElement;
        this.height = this.baseHeight + (2 * this.barWidth * featureCount);
        var selectedEle = d3__WEBPACK_IMPORTED_MODULE_1__["select"](ele)
            .style('width', this.width + this.margin.left + this.margin.right)
            .style('height', this.height + this.margin.top + this.margin.bottom);
        var g = selectedEle
            .select('g')
            // set margin
            .attr('transform', "translate(" + this.margin.left + ", " + this.margin.top + ")");
        return g;
    };
    /**
     * Given the dataset, return the scale of x axis.
     */
    AttrBarChart.prototype.getYScale = function (data) {
        var yScale = d3__WEBPACK_IMPORTED_MODULE_1__["scaleBand"]()
            .range([this.height, 0])
            .domain(Array.from(data.keys()));
        return yScale;
    };
    /**
     * Given the dataset, return the y axis scale.
     */
    AttrBarChart.prototype.getXScale = function (dataMax, dataMin) {
        var xScale = d3__WEBPACK_IMPORTED_MODULE_1__["scaleLinear"]()
            .domain([Math.min(0, dataMin), Math.max(0, dataMax)])
            .range([0, this.width])
            .nice();
        return xScale;
    };
    AttrBarChart.prototype.getColorScale = function (dataMax, dataMin) {
        this.range = Math.max(Math.abs(dataMax), Math.abs(dataMin));
        // Colors are separated for positive and negative scales, with 4 blue shades
        // being split on equal intervals between 0 and the max attribution, and 4
        // red-yellow shades on equal intervals between the min attribution and 0.
        var colorScale = d3__WEBPACK_IMPORTED_MODULE_1__["scaleThreshold"]()
            .domain([
            3.0 * -this.range / 4.0, -this.range / 2.0,
            -this.range / 4.0, 0, this.range / 4.0,
            this.range / 2.0, 3.0 * this.range / 4.0
        ])
            .range(this.barColors);
        return colorScale;
    };
    /**
     * Given selected g element, xScale, yScale and data, add bar chart
     * bars to the g element.
     */
    AttrBarChart.prototype.addBars = function (g, data, xScale, yScale, colorScale) {
        var _this = this;
        // appending the bar chart bars
        var bars = g.selectAll('.bar');
        bars.each(function (datum, index, nodes) {
            var feature = String(_this.features[index]);
            var attribution = Number(data.get(feature));
            var length = Math.abs(xScale(0) - xScale(attribution));
            var x = xScale(Math.min(0, attribution));
            var y = yScale(feature) + (yScale.bandwidth() - _this.barWidth) / 2;
            var currElement = nodes[index];
            d3__WEBPACK_IMPORTED_MODULE_1__["select"](currElement)
                .append('rect')
                .attr('height', _this.barWidth)
                .attr('width', length)
                .attr('x', x)
                .attr('y', y)
                .style('fill', colorScale(attribution));
            // Add invisible rect to enable tooltip mousover at small sizes
            d3__WEBPACK_IMPORTED_MODULE_1__["select"](currElement)
                .append('rect')
                .attr('height', _this.barWidth)
                .attr('width', length + (2 * _this.minBarLength))
                .attr('x', x - _this.minBarLength)
                .attr('y', y)
                .style('fill-opacity', 0);
        });
    };
    /**
     * Given selected g element and yScale, add the yAxis (including
     * the ticks and label) to the g element.
     */
    AttrBarChart.prototype.addYAxis = function (g, yScale, values) {
        // initialize a new y axis with truncation of feature labels so that
        // everything fits properly
        var yAxisScale = d3__WEBPACK_IMPORTED_MODULE_1__["axisLeft"](yScale).tickFormat(function (key) { return key.length > 10 ? key.substring(0, 10) + '...' : key; });
        // append that y axis to the <g>
        g.select('.axes')
            .append('g')
            .attr('class', 'axis y-axis')
            .call(yAxisScale)
            .call(function (g) {
            g.select('.domain').remove();
        })
            .call(function (g) {
            g.selectAll('.tick line').remove();
        })
            .call(function (g) {
            g.selectAll('.tick text')
                .attr('font-weight', 'bold')
                .attr('text-anchor', 'end')
                .attr('class', 'axis-tick');
        })
            .call(function (g) {
            g.selectAll('.tick')
                .append('text')
                .text(function (t) {
                var str = String(values.get(String(t)));
                return str.length > 10 ? str.substring(0, 10) + '...' : str;
            })
                .attr('class', 'tick-value')
                .attr('transform', 'translate(-10, 20)');
        });
    };
    /**
     * Given selected g element and xScale, add the xAxis (including
     * the ticks and label) to the g element.
     */
    AttrBarChart.prototype.addXAxis = function (g, xScale) {
        var _this = this;
        // initialize a new x axis with truncation of feature labels so that
        // everything fits properly
        var xAxis = d3__WEBPACK_IMPORTED_MODULE_1__["axisBottom"](xScale).tickFormat(d3__WEBPACK_IMPORTED_MODULE_1__["format"]('.1f'));
        // append that x axis to the <g>
        g.select('.axes').append('g')
            .attr('class', 'axis x-axis')
            .call(xAxis.tickSize(this.height))
            .call(function (g) {
            g.select('.domain').remove();
        })
            .call(function (g) {
            g.selectAll('.tick line').style('stroke', '#AAAAAA');
        })
            .call(function (g) {
            g.selectAll('.tick text')
                .attr('transform', "translate(0, " + (-20 - _this.height) + ")")
                .attr('class', 'axis-tick');
        });
    };
    AttrBarChart.ɵfac = function AttrBarChart_Factory(t) { return new (t || AttrBarChart)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_feature_attr_service__WEBPACK_IMPORTED_MODULE_4__["FeatureAttrService"])); };
    AttrBarChart.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AttrBarChart, selectors: [["app-attr-bar-chart"]], viewQuery: function AttrBarChart_Query(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
        } if (rf & 2) {
            var _t;
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.attrBarChartSvg = _t.first);
        } }, decls: 37, vars: 14, consts: [[1, "bar-chart-container"], ["href", "https://fonts.googleapis.com/icon?family=Material+Icons", "rel", "stylesheet"], [1, "block-title"], ["href", "https://cloud.google.com/ai-platform-unified/docs/explainable-ai/limitations", "target", "_blank", "rel", "noreferrer noopener", 1, "learn-more-link"], ["src", "https://fonts.gstatic.com/s/i/googlematerialicons/info_outline/v11/gm_grey-24dp/1x/gm_info_outline_gm_grey_24dp.png", "aria-label", "info"], [1, "learn-more-text"], ["href", "https://cloud.google.com/ai-platform-unified/docs/explainable-ai/overview", "target", "_blank", "rel", "noreferrer noopener", 1, "learn-more-link"], [1, "material-icons", "learn-more-link-icon"], [1, "prediction-label"], [1, "prediction-text"], [1, "baseline-text"], [1, "color-scale"], [1, "color-scale-key"], ["class", "color-scale-segments", 3, "style", 4, "ngFor", "ngForOf"], [1, "color-scale-labels"], [1, "color-scale-neg-label"], [1, "color-scale-pos-label"], ["class", "approx-error-warning", 4, "ngIf"], ["attr_bar_chart", ""], [1, "axes"], ["class", "bar", 3, "tooltip", 4, "ngFor", "ngForOf"], [1, "chart-date-label"], [1, "color-scale-segments"], [1, "approx-error-warning"], ["aria-label", "warning", 1, "material-icons", "approx-error-img"], ["href", "https://cloud.google.com/ai-platform-unified/docs/explainable-ai/improving-explanations", "target", "_blank", "rel", "noreferrer noopener", 1, "learn-more-link"], [1, "approx-error-message"], [1, "bar", 3, "tooltip"]], template: function AttrBarChart_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "link", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h2", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, " Feature Attributions ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "a", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "img", 4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, " Learn more about ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "a", 6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, " Explainable AI ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "span", 7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, " open_in_new ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, " Prediction Score: ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "span", 9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 11);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "svg", 12);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](22, AttrBarChart__svg_rect_22_Template, 1, 4, "rect", 13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 15);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, " negative ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 16);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, " positive ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](29, AttrBarChart_div_29_Template, 11, 1, "div", 17);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "svg", null, 18);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "g");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](33, "g", 19);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](34, AttrBarChart__svg_g_34_Template, 1, 3, "g", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "div", 21);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](16);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.prediction);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Baseline Score: ", ctx.baseline, " ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", (0 - ctx.range).toFixed(1), " ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMapInterpolate1"]("height: 20px; width: ", ctx.barColors.length * 20, "px;");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.barColors);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.range.toFixed(1), " ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMapInterpolate1"]("width: ", ctx.barColors.length * 20, "px;");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.highApproxError);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.features);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Charted at ", ctx.date, " ");
        } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _tooltip_directive__WEBPACK_IMPORTED_MODULE_6__["TooltipDirective"]], styles: ["[_nghost-%COMP%]     .x-axis .axis-tick {\n  font-weight: 300;\n  font-size: 13px;\n}\n[_nghost-%COMP%]     .y-axis .axis-tick {\n  font-weight: 700;\n  font-size: 12px;\n}\n[_nghost-%COMP%]     .y-axis .tick-value {\n  font-weight: 300;\n  font-size: 12px;\n  fill: #000;\n}\n[_nghost-%COMP%]     .current-range {\n  color: #4285F4;\n}\n  .mat-tooltip {\n  white-space: pre-line;\n}\n.block-title[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 500;\n  margin-left: 22px;\n  margin-top: 21px;\n  margin-bottom: 14px;\n  position: relative;\n}\n.description[_ngcontent-%COMP%] {\n  font-size: 0.8em;\n  color: #ccc;\n}\n.learn-more-text[_ngcontent-%COMP%] {\n  font-size: 13px;\n  text-align: right;\n  bottom: 4px;\n  right: 0px;\n  position: absolute;\n}\n.learn-more-link[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n.learn-more-link-icon[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n.approx-error-warning[_ngcontent-%COMP%] {\n  clear: both;\n  font-size: 18px;\n}\n.approx-error-message[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: #555;\n  margin-top: 4px;\n}\n.approx-error-img[_ngcontent-%COMP%] {\n  clear: both;\n  float: left;\n  margin-left: 33px;\n  margin-right: 5px;\n  color: #e37400;\n  height: 30px;\n  width: 25px;\n}\n.prediction-text[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 400;\n}\n.prediction-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 500;\n  margin-left: 33px;\n  margin-bottom: 20px;\n  float: left;\n}\n.baseline-text[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-family: \"Roboto\";\n  font-style: italic;\n  float: right;\n  color: #555;\n}\n.color-scale[_ngcontent-%COMP%] {\n  right: 0px;\n  font-size: 13px;\n  clear: both;\n  float: right;\n}\n.color-scale-key[_ngcontent-%COMP%] {\n  height: 20px;\n}\n.color-scale-segments[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n}\n.color-scale-labels[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #555;\n  text-align: center;\n  margin: auto;\n  margin-bottom: 6px;\n}\n.color-scale-neg-label[_ngcontent-%COMP%] {\n  float: left;\n  width: 50%;\n  text-align: center;\n}\n.chart-date-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  text-align: center;\n}\n.bar-chart-container[_ngcontent-%COMP%] {\n  width: 540px;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: antialiased;\n  font-family: \"Roboto\";\n  font-weight: 400;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi90bXAveGFpLXRhYnVsYXItd2lkZ2V0L3hhaV90YWJ1bGFyX3dpZGdldC93ZWJhcHAvc3JjL3RhYnVsYXJfZmVhdHVyZV9hdHRyL2F0dHJfYmFyX2NoYXJ0LnNjc3MiLCJzcmMvdGFidWxhcl9mZWF0dXJlX2F0dHIvYXR0cl9iYXJfY2hhcnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFSTtFQUNFLGdCQUFBO0VBQ0EsZUFBQTtBQ0ROO0FES0k7RUFDRSxnQkFBQTtFQUNBLGVBQUE7QUNITjtBREtJO0VBQ0UsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsVUFBQTtBQ0hOO0FETUU7RUFDRSxjQUFBO0FDSko7QURRQTtFQUNFLHFCQUFBO0FDTEY7QURRQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0FDTEY7QURRQTtFQUNFLGdCQUFBO0VBQ0EsV0FBQTtBQ0xGO0FEUUE7RUFDRSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxXQUFBO0VBQ0EsVUFBQTtFQUNBLGtCQUFBO0FDTEY7QURRQTtFQUNFLGVBQUE7QUNMRjtBRFFBO0VBQ0UsZUFBQTtBQ0xGO0FEUUE7RUFDRSxXQUFBO0VBQ0EsZUFBQTtBQ0xGO0FEUUE7RUFDRSxlQUFBO0VBQ0EsV0FBQTtFQUNBLGVBQUE7QUNMRjtBRFFBO0VBQ0UsV0FBQTtFQUNBLFdBQUE7RUFDQSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0FDTEY7QURRQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtBQ0xGO0FEUUE7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtBQ0xGO0FEUUE7RUFDRSxlQUFBO0VBQ0EscUJBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0FDTEY7QURRQTtFQUNFLFVBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUNMRjtBRFFBO0VBQ0UsWUFBQTtBQ0xGO0FEUUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtBQ0xGO0FEUUE7RUFDRSxlQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0FDTEY7QURRQTtFQUNFLFdBQUE7RUFDQSxVQUFBO0VBQ0Esa0JBQUE7QUNMRjtBRFFBO0VBQ0UsZUFBQTtFQUNBLGtCQUFBO0FDTEY7QURRQTtFQUNFLFlBQUE7RUFDQSxtQ0FBQTtFQUNBLG9DQUFBO0VBQ0EscUJBQUE7RUFDQSxnQkFBQTtBQ0xGIiwiZmlsZSI6InNyYy90YWJ1bGFyX2ZlYXR1cmVfYXR0ci9hdHRyX2Jhcl9jaGFydC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3QgOjpuZy1kZWVwIHtcbiAgLngtYXhpcyB7XG4gICAgLmF4aXMtdGljayB7XG4gICAgICBmb250LXdlaWdodDogMzAwO1xuICAgICAgZm9udC1zaXplOiAxM3B4O1xuICAgIH1cbiAgfVxuICAueS1heGlzIHtcbiAgICAuYXhpcy10aWNrIHtcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgfVxuICAgIC50aWNrLXZhbHVlIHtcbiAgICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICBmaWxsOiAjMDAwO1xuICAgIH1cbiAgfVxuICAuY3VycmVudC1yYW5nZSB7XG4gICAgY29sb3I6ICM0Mjg1RjQ7XG4gIH1cbn1cblxuOjpuZy1kZWVwIC5tYXQtdG9vbHRpcCB7XG4gIHdoaXRlLXNwYWNlOiBwcmUtbGluZTtcbn1cblxuLmJsb2NrLXRpdGxlIHtcbiAgZm9udC1zaXplOiAyNHB4O1xuICBmb250LXdlaWdodDogNTAwO1xuICBtYXJnaW4tbGVmdDogMjJweDtcbiAgbWFyZ2luLXRvcDogMjFweDtcbiAgbWFyZ2luLWJvdHRvbTogMTRweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4uZGVzY3JpcHRpb24ge1xuICBmb250LXNpemU6IDAuOGVtO1xuICBjb2xvcjogI2NjYztcbn1cblxuLmxlYXJuLW1vcmUtdGV4dCB7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gIGJvdHRvbTogNHB4O1xuICByaWdodDogMHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG59XG5cbi5sZWFybi1tb3JlLWxpbmsge1xuICBmb250LXNpemU6IDEzcHg7XG59XG5cbi5sZWFybi1tb3JlLWxpbmstaWNvbiB7XG4gIGZvbnQtc2l6ZTogMTNweDtcbn1cblxuLmFwcHJveC1lcnJvci13YXJuaW5nIHtcbiAgY2xlYXI6IGJvdGg7XG4gIGZvbnQtc2l6ZTogMThweDtcbn1cblxuLmFwcHJveC1lcnJvci1tZXNzYWdlIHtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBjb2xvcjogIzU1NTtcbiAgbWFyZ2luLXRvcDogNHB4O1xufVxuXG4uYXBwcm94LWVycm9yLWltZyB7XG4gIGNsZWFyOiBib3RoO1xuICBmbG9hdDogbGVmdDtcbiAgbWFyZ2luLWxlZnQ6IDMzcHg7XG4gIG1hcmdpbi1yaWdodDogNXB4O1xuICBjb2xvcjogI2UzNzQwMDtcbiAgaGVpZ2h0OiAzMHB4O1xuICB3aWR0aDogMjVweDtcbn1cblxuLnByZWRpY3Rpb24tdGV4dCB7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbn1cblxuLnByZWRpY3Rpb24tbGFiZWwge1xuICBmb250LXNpemU6IDEzcHg7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIG1hcmdpbi1sZWZ0OiAzM3B4O1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICBmbG9hdDogbGVmdDtcbn1cblxuLmJhc2VsaW5lLXRleHQge1xuICBmb250LXNpemU6IDEzcHg7XG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcbiAgZm9udC1zdHlsZTogaXRhbGljO1xuICBmbG9hdDogcmlnaHQ7XG4gIGNvbG9yOiAjNTU1O1xufVxuXG4uY29sb3Itc2NhbGUge1xuICByaWdodDogMHB4OztcbiAgZm9udC1zaXplOiAxM3B4O1xuICBjbGVhcjogYm90aDtcbiAgZmxvYXQ6IHJpZ2h0O1xufVxuXG4uY29sb3Itc2NhbGUta2V5IHtcbiAgaGVpZ2h0OiAyMHB4O1xufVxuXG4uY29sb3Itc2NhbGUtc2VnbWVudHMge1xuICB3aWR0aDogMjBweDtcbiAgaGVpZ2h0OiAyMHB4O1xufVxuXG4uY29sb3Itc2NhbGUtbGFiZWxzIHtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBjb2xvcjogIzU1NTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtYXJnaW46IGF1dG87XG4gIG1hcmdpbi1ib3R0b206IDZweDtcbn1cblxuLmNvbG9yLXNjYWxlLW5lZy1sYWJlbCB7XG4gIGZsb2F0OiBsZWZ0O1xuICB3aWR0aDogNTAlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5jaGFydC1kYXRlLWxhYmVsIHtcbiAgZm9udC1zaXplOiAxMnB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5iYXItY2hhcnQtY29udGFpbmVye1xuICB3aWR0aDogNTQwcHg7XG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xuICAtbW96LW9zeC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XG4gIGZvbnQtZmFtaWx5OiAnUm9ib3RvJztcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbn1cbiIsIjpob3N0IDo6bmctZGVlcCAueC1heGlzIC5heGlzLXRpY2sge1xuICBmb250LXdlaWdodDogMzAwO1xuICBmb250LXNpemU6IDEzcHg7XG59XG46aG9zdCA6Om5nLWRlZXAgLnktYXhpcyAuYXhpcy10aWNrIHtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgZm9udC1zaXplOiAxMnB4O1xufVxuOmhvc3QgOjpuZy1kZWVwIC55LWF4aXMgLnRpY2stdmFsdWUge1xuICBmb250LXdlaWdodDogMzAwO1xuICBmb250LXNpemU6IDEycHg7XG4gIGZpbGw6ICMwMDA7XG59XG46aG9zdCA6Om5nLWRlZXAgLmN1cnJlbnQtcmFuZ2Uge1xuICBjb2xvcjogIzQyODVGNDtcbn1cblxuOjpuZy1kZWVwIC5tYXQtdG9vbHRpcCB7XG4gIHdoaXRlLXNwYWNlOiBwcmUtbGluZTtcbn1cblxuLmJsb2NrLXRpdGxlIHtcbiAgZm9udC1zaXplOiAyNHB4O1xuICBmb250LXdlaWdodDogNTAwO1xuICBtYXJnaW4tbGVmdDogMjJweDtcbiAgbWFyZ2luLXRvcDogMjFweDtcbiAgbWFyZ2luLWJvdHRvbTogMTRweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4uZGVzY3JpcHRpb24ge1xuICBmb250LXNpemU6IDAuOGVtO1xuICBjb2xvcjogI2NjYztcbn1cblxuLmxlYXJuLW1vcmUtdGV4dCB7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gIGJvdHRvbTogNHB4O1xuICByaWdodDogMHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG59XG5cbi5sZWFybi1tb3JlLWxpbmsge1xuICBmb250LXNpemU6IDEzcHg7XG59XG5cbi5sZWFybi1tb3JlLWxpbmstaWNvbiB7XG4gIGZvbnQtc2l6ZTogMTNweDtcbn1cblxuLmFwcHJveC1lcnJvci13YXJuaW5nIHtcbiAgY2xlYXI6IGJvdGg7XG4gIGZvbnQtc2l6ZTogMThweDtcbn1cblxuLmFwcHJveC1lcnJvci1tZXNzYWdlIHtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBjb2xvcjogIzU1NTtcbiAgbWFyZ2luLXRvcDogNHB4O1xufVxuXG4uYXBwcm94LWVycm9yLWltZyB7XG4gIGNsZWFyOiBib3RoO1xuICBmbG9hdDogbGVmdDtcbiAgbWFyZ2luLWxlZnQ6IDMzcHg7XG4gIG1hcmdpbi1yaWdodDogNXB4O1xuICBjb2xvcjogI2UzNzQwMDtcbiAgaGVpZ2h0OiAzMHB4O1xuICB3aWR0aDogMjVweDtcbn1cblxuLnByZWRpY3Rpb24tdGV4dCB7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbn1cblxuLnByZWRpY3Rpb24tbGFiZWwge1xuICBmb250LXNpemU6IDEzcHg7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIG1hcmdpbi1sZWZ0OiAzM3B4O1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICBmbG9hdDogbGVmdDtcbn1cblxuLmJhc2VsaW5lLXRleHQge1xuICBmb250LXNpemU6IDEzcHg7XG4gIGZvbnQtZmFtaWx5OiBcIlJvYm90b1wiO1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG4gIGZsb2F0OiByaWdodDtcbiAgY29sb3I6ICM1NTU7XG59XG5cbi5jb2xvci1zY2FsZSB7XG4gIHJpZ2h0OiAwcHg7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgY2xlYXI6IGJvdGg7XG4gIGZsb2F0OiByaWdodDtcbn1cblxuLmNvbG9yLXNjYWxlLWtleSB7XG4gIGhlaWdodDogMjBweDtcbn1cblxuLmNvbG9yLXNjYWxlLXNlZ21lbnRzIHtcbiAgd2lkdGg6IDIwcHg7XG4gIGhlaWdodDogMjBweDtcbn1cblxuLmNvbG9yLXNjYWxlLWxhYmVscyB7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgY29sb3I6ICM1NTU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luOiBhdXRvO1xuICBtYXJnaW4tYm90dG9tOiA2cHg7XG59XG5cbi5jb2xvci1zY2FsZS1uZWctbGFiZWwge1xuICBmbG9hdDogbGVmdDtcbiAgd2lkdGg6IDUwJTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uY2hhcnQtZGF0ZS1sYWJlbCB7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uYmFyLWNoYXJ0LWNvbnRhaW5lciB7XG4gIHdpZHRoOiA1NDBweDtcbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XG4gIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcbiAgZm9udC1mYW1pbHk6IFwiUm9ib3RvXCI7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG59Il19 */"] });
    return AttrBarChart;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AttrBarChart, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-attr-bar-chart',
                templateUrl: './attr_bar_chart.ng.html',
                styleUrls: ['./attr_bar_chart.scss']
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] }, { type: _feature_attr_service__WEBPACK_IMPORTED_MODULE_4__["FeatureAttrService"] }]; }, { attrBarChartSvg: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['attr_bar_chart']
        }] }); })();


/***/ }),

/***/ "./src/tabular_feature_attr/feature_attr_service.ts":
/*!**********************************************************!*\
  !*** ./src/tabular_feature_attr/feature_attr_service.ts ***!
  \**********************************************************/
/*! exports provided: FeatureAttrService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeatureAttrService", function() { return FeatureAttrService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _tabular_explanation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tabular_explanation */ "./src/tabular_feature_attr/tabular_explanation.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");






/**
 * A service for loading and holding explanation data.
 * LoadDataEvents will be triggered from the widget.
 */
var FeatureAttrService = /** @class */ (function () {
    function FeatureAttrService(http) {
        var _this = this;
        this.http = http;
        this.tabularExplanation = new _tabular_explanation__WEBPACK_IMPORTED_MODULE_3__["TabularExplanation"]();
        this.tabularExplainSource = new rxjs__WEBPACK_IMPORTED_MODULE_1__["ReplaySubject"](1);
        this.errorMessages = [];
        // Handle on-destroy Subject, used to unsubscribe.
        this.destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_1__["ReplaySubject"](1);
        // Set to react to the load data event (from json object)
        Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(document, 'loadDataFromDictEvent')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeUntil"])(this.destroyed))
            .subscribe(function (e) {
            var dataEvent = e;
            _this.loadDataFromDict(dataEvent.detail.data);
        });
        // Set to react to the load data event (from json object)
        Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(document, 'loadDataFromJsonEvent')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeUntil"])(this.destroyed))
            .subscribe(function (e) {
            var dataEvent = e;
            _this.loadDataFromJson(dataEvent.detail.data);
        });
        // Set to react to the load data event (from an Url)
        Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(document, 'loadDataFromUrlEvent')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["takeUntil"])(this.destroyed))
            .subscribe(function (e) {
            var dataEvent = e;
            _this.loadDataFromUrl(dataEvent.detail.url);
        });
    }
    /**
     * Given an attribution dict, initialize the tabularExplanation,
     * and notify the subscribers to update.
     */
    FeatureAttrService.prototype.loadDataFromDict = function (data) {
        this.tabularExplanation.initializeTabular(data);
        this.tabularExplainSource.next(this.tabularExplanation);
    };
    /**
     * Given a json string, instantiate the contents of that string as an
     * attribution dict and trigger loadDataFromDict.
     */
    FeatureAttrService.prototype.loadDataFromJson = function (data) {
        var jsonData = JSON.parse(data);
        this.loadDataFromDict(jsonData);
    };
    /**
     * Given a url, fetch the json file and trigger
     * loadDataFromJson. If it fails, show error messages.
     */
    FeatureAttrService.prototype.loadDataFromUrl = function (url) {
        var _this = this;
        this.errorMessages = [];
        var data = this.http.get(url);
        data.subscribe({
            next: function (response) {
                _this.loadDataFromJson(response);
            },
            error: function (response) {
                _this.errorMessages.push(response.error);
            }
        });
        if (this.errorMessages.length > 0) {
            alert('Errors:\n' + this.errorMessages.join('\n'));
        }
    };
    /**
     * Get the tabular explanation object.
     */
    FeatureAttrService.prototype.getTabularExplanation = function () {
        return this.tabularExplanation;
    };
    FeatureAttrService.prototype.ngOnDestroy = function () {
        this.destroyed.next();
        this.destroyed.complete();
    };
    FeatureAttrService.ɵfac = function FeatureAttrService_Factory(t) { return new (t || FeatureAttrService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"])); };
    FeatureAttrService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: FeatureAttrService, factory: FeatureAttrService.ɵfac, providedIn: 'root' });
    return FeatureAttrService;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FeatureAttrService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "./src/tabular_feature_attr/tabular_explanation.ts":
/*!*********************************************************!*\
  !*** ./src/tabular_feature_attr/tabular_explanation.ts ***!
  \*********************************************************/
/*! exports provided: TabularExplanation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabularExplanation", function() { return TabularExplanation; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/**
 * @fileoverview This file contains the definition of the Explanation class.
 * The explanation instance can be initialized with explanation data in json
 * format.
 */

/**
 * TabularExplanation class contains information about the tabular features,
 * including attributions for each featuree, and other explanation related
 * properties for visualization.
 */
var TabularExplanation = /** @class */ (function () {
    function TabularExplanation() {
        this.attrs = {}; // feature attribution
        this.inputValues = {};
        this.maxAttrVal = 0;
        this.hasInitialized = false;
        this.prediction = 0;
        this.baseline = 0;
    }
    /**
     * Initialize the explanation from attribution json for a feature.
     */
    TabularExplanation.prototype.initializeTabular = function (data) {
        var _this = this;
        Object.entries(data.attributions).forEach(function (entry) {
            _this.attrs[entry[0]] = entry[1].reduce(function (a, b) { return a + b; }, 0);
        });
        this.processValues(data);
        this.approximationError = data.approx_error;
        this.prediction = data.example_score;
        this.baseline = data.baseline_score;
        this.initialize();
    };
    /**
     * initialize(): Initialize image size, max attribution val, initialize image,
     * and reset visible range.
     */
    TabularExplanation.prototype.initialize = function () {
        this.findMaxAttrVal();
        this.hasInitialized = true;
    };
    /**
     * Find the maximum absolute value in the attributions.
     */
    TabularExplanation.prototype.findMaxAttrVal = function () {
        this.maxAttrVal = Math.max.apply(Math, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(Object.values(this.attrs)));
    };
    TabularExplanation.prototype.processValues = function (data) {
        var e_1, _a;
        try {
            for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(Object.entries(data.input_values_dict)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_c.value, 2), feature = _d[0], values = _d[1];
                if (Array.isArray(values)) {
                    if (values.length === 0) {
                        this.inputValues[feature] = '';
                    }
                    else if (isNumberArr(values)) {
                        this.inputValues[feature] = (values).reduce(function (a, b) { return a + b; }, 0);
                    }
                    else {
                        this.inputValues[feature] = (values).join(' ');
                    }
                }
                else {
                    this.inputValues[feature] = values;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    return TabularExplanation;
}());

/**
 * isNumberArr(): Type guard for arrays of only numbers to enable summation
 */
function isNumberArr(arg) {
    var e_2, _a;
    if (Array.isArray(arg)) {
        try {
            for (var arg_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(arg), arg_1_1 = arg_1.next(); !arg_1_1.done; arg_1_1 = arg_1.next()) {
                var i = arg_1_1.value;
                if (typeof i !== 'number') {
                    return false;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (arg_1_1 && !arg_1_1.done && (_a = arg_1.return)) _a.call(arg_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return true;
    }
    return false;
}


/***/ }),

/***/ "./src/tabular_feature_attr/tabular_feature_attr_module.ts":
/*!*****************************************************************!*\
  !*** ./src/tabular_feature_attr/tabular_feature_attr_module.ts ***!
  \*****************************************************************/
/*! exports provided: TabularFeatureAttrModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabularFeatureAttrModule", function() { return TabularFeatureAttrModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/common.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/__ivy_ngcc__/fesm5/tooltip.js");
/* harmony import */ var _attr_bar_chart__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./attr_bar_chart */ "./src/tabular_feature_attr/attr_bar_chart.ts");
/* harmony import */ var _tooltip_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tooltip.directive */ "./src/tabular_feature_attr/tooltip.directive.ts");



// BEGIN OSS

// END OSS
/* BEGIN PANTHEON
// [Pantheon tooltip]
// END PANTHEON */



var TabularFeatureAttrModule = /** @class */ (function () {
    function TabularFeatureAttrModule() {
    }
    TabularFeatureAttrModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: TabularFeatureAttrModule });
    TabularFeatureAttrModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ factory: function TabularFeatureAttrModule_Factory(t) { return new (t || TabularFeatureAttrModule)(); }, imports: [[
                _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"],
                // BEGIN OSS
                _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_3__["MatTooltipModule"],
            ]] });
    return TabularFeatureAttrModule;
}());

(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](TabularFeatureAttrModule, { declarations: [_attr_bar_chart__WEBPACK_IMPORTED_MODULE_4__["AttrBarChart"], _tooltip_directive__WEBPACK_IMPORTED_MODULE_5__["TooltipDirective"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"],
        // BEGIN OSS
        _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_3__["MatTooltipModule"]], exports: [_attr_bar_chart__WEBPACK_IMPORTED_MODULE_4__["AttrBarChart"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](TabularFeatureAttrModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"],
        args: [{
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"],
                    // BEGIN OSS
                    _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_3__["MatTooltipModule"],
                ],
                declarations: [_attr_bar_chart__WEBPACK_IMPORTED_MODULE_4__["AttrBarChart"], _tooltip_directive__WEBPACK_IMPORTED_MODULE_5__["TooltipDirective"]],
                exports: [_attr_bar_chart__WEBPACK_IMPORTED_MODULE_4__["AttrBarChart"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/tabular_feature_attr/tooltip.directive.ts":
/*!*******************************************************!*\
  !*** ./src/tabular_feature_attr/tooltip.directive.ts ***!
  \*******************************************************/
/*! exports provided: TooltipDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TooltipDirective", function() { return TooltipDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm5/core.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/__ivy_ngcc__/fesm5/tooltip.js");

// BEGIN OSS



// END OSS
/* BEGIN PANTHEON
// [Pantheon tooltip]
// END PANTHEON */
/**
 * TooltipDirective: a directive for populating the Angular template with the
 * correct tooltip type, depending on the environment
 */
// BEGIN OSS
var TooltipDirective = /** @class */ (function () {
    // BEGIN OSS
    function TooltipDirective(tooltip) {
        this.tooltip = tooltip;
    }
    // END OSS
    /* BEGIN PANTHEON
    // [Pantheon tooltip]
    // END PANTHEON */
    TooltipDirective.prototype.mouseover = function () {
        this.tooltip.message = this.tooltipMessage;
        this.tooltip.show();
    };
    TooltipDirective.prototype.mouseout = function () {
        this.tooltip.hide();
    };
    TooltipDirective.ɵfac = function TooltipDirective_Factory(t) { return new (t || TooltipDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_tooltip__WEBPACK_IMPORTED_MODULE_1__["MatTooltip"])); };
    TooltipDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: TooltipDirective, selectors: [["", "tooltip", ""]], hostBindings: function TooltipDirective_HostBindings(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("mouseover", function TooltipDirective_mouseover_HostBindingHandler() { return ctx.mouseover(); })("mouseout", function TooltipDirective_mouseout_HostBindingHandler() { return ctx.mouseout(); });
        } }, inputs: { tooltipMessage: ["tooltip", "tooltipMessage"] }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_angular_material_tooltip__WEBPACK_IMPORTED_MODULE_1__["MatTooltip"]])] });
    return TooltipDirective;
}());

/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TooltipDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
        args: [{ selector: '[tooltip]', providers: [_angular_material_tooltip__WEBPACK_IMPORTED_MODULE_1__["MatTooltip"]] }]
    }], function () { return [{ type: _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_1__["MatTooltip"] }]; }, { tooltipMessage: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
            args: ['tooltip']
        }], mouseover: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['mouseover']
        }], mouseout: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ['mouseout']
        }] }); })();


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /tmp/xai-tabular-widget/xai_tabular_widget/webapp/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map