/*
 Highcharts JS v7.0.3 (2019-02-06)
 Accessibility module

 (c) 2010-2019 Highsoft AS
 Author: Oystein Moseng

 License: www.highcharts.com/license
*/
(function(n){"object"===typeof module&&module.exports?(n["default"]=n,module.exports=n):"function"===typeof define&&define.amd?define(function(){return n}):n("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(n){(function(a){function n(a,g){var k=a.indexOf("#each("),h=a.indexOf("#plural("),f=a.indexOf("["),m=a.indexOf("]");if(-1<k){var f=a.slice(k).indexOf(")")+k,c=a.substring(0,k),h=a.substring(f+1),f=a.substring(k+6,f).split(","),k=Number(f[1]);a="";if(g=g[f[0]])for(k=isNaN(k)?g.length:
k,k=0>k?g.length+k:Math.min(k,g.length),f=0;f<k;++f)a+=c+g[f]+h;return a.length?a:""}if(-1<h){c=a.slice(h).indexOf(")")+h;a=a.substring(h+8,c).split(",");switch(Number(g[a[0]])){case 0:a=q(a[4],a[1]);break;case 1:a=q(a[2],a[1]);break;case 2:a=q(a[3],a[1]);break;default:a=a[1]}a?(g=a,g=g.trim&&g.trim()||g.replace(/^\s+|\s+$/g,"")):g="";return g}return-1<f?(h=a.substring(0,f),a=Number(a.substring(f+1,m)),g=g[h],!isNaN(a)&&g&&(0>a?(c=g[g.length+a],void 0===c&&(c=g[0])):(c=g[a],void 0===c&&(c=g[g.length-
1]))),void 0!==c?c:""):"{"+a+"}"}var q=a.pick;a.i18nFormat=function(p,g,k){var h=function(c,a){c=c.slice(a||0);var d=c.indexOf("{"),b=c.indexOf("}");if(-1<d&&b>d)return{statement:c.substring(d+1,b),begin:a+d+1,end:a+b}},f=[],m,c;c=0;do m=h(p,c),c=p.substring(c,m&&m.begin-1),c.length&&f.push({value:c,type:"constant"}),m&&f.push({value:m.statement,type:"statement"}),c=m&&m.end+1;while(m);f.forEach(function(c){"statement"===c.type&&(c.value=n(c.value,g))});return a.format(f.reduce(function(c,a){return c+
a.value},""),g,k)};a.Chart.prototype.langFormat=function(p,g,k){p=p.split(".");for(var h=this.options.lang,f=0;f<p.length;++f)h=h&&h[p[f]];return"string"===typeof h&&a.i18nFormat(h,g,k)};a.setOptions({lang:{accessibility:{screenReaderRegionLabel:"Chart screen reader information.",navigationHint:"Use regions/landmarks to skip ahead to chart {#plural(numSeries, and navigate between data series,)}",defaultChartTitle:"Chart",longDescriptionHeading:"Long description.",noDescription:"No description available.",
structureHeading:"Structure.",viewAsDataTable:"View as data table.",chartHeading:"Chart graphic.",chartContainerLabel:"Interactive chart. {title}. Use up and down arrows to navigate with most screen readers.",rangeSelectorMinInput:"Select start date.",rangeSelectorMaxInput:"Select end date.",tableSummary:"Table representation of chart.",mapZoomIn:"Zoom chart",mapZoomOut:"Zoom out chart",rangeSelectorButton:"Select range {buttonText}",legendLabel:"Toggle series visibility",svgContainerTitle:"{chartTitle}",
seriesTypeDescriptions:{boxplot:"Box plot charts are typically used to display groups of statistical data. Each data point in the chart can have up to 5 values: minimum, lower quartile, median, upper quartile, and maximum.",arearange:"Arearange charts are line charts displaying a range between a lower and higher value for each point.",areasplinerange:"These charts are line charts displaying a range between a lower and higher value for each point.",bubble:"Bubble charts are scatter charts where each data point also has a size value.",
columnrange:"Columnrange charts are column charts displaying a range between a lower and higher value for each point.",errorbar:"Errorbar series are used to display the variability of the data.",funnel:"Funnel charts are used to display reduction of data in stages.",pyramid:"Pyramid charts consist of a single pyramid with item heights corresponding to each point value.",waterfall:"A waterfall chart is a column chart where each column contributes towards a total end value."},chartTypes:{emptyChart:"Empty chart",
mapTypeDescription:"Map of {mapTitle} with {numSeries} data series.",unknownMap:"Map of unspecified region with {numSeries} data series.",combinationChart:"Combination chart with {numSeries} data series.",defaultSingle:"Chart with {numPoints} data {#plural(numPoints, points, point)}.",defaultMultiple:"Chart with {numSeries} data series.",splineSingle:"Line chart with {numPoints} data {#plural(numPoints, points, point)}.",splineMultiple:"Line chart with {numSeries} lines.",lineSingle:"Line chart with {numPoints} data {#plural(numPoints, points, point)}.",
lineMultiple:"Line chart with {numSeries} lines.",columnSingle:"Bar chart with {numPoints} {#plural(numPoints, bars, bar)}.",columnMultiple:"Bar chart with {numSeries} data series.",barSingle:"Bar chart with {numPoints} {#plural(numPoints, bars, bar)}.",barMultiple:"Bar chart with {numSeries} data series.",pieSingle:"Pie chart with {numPoints} {#plural(numPoints, slices, slice)}.",pieMultiple:"Pie chart with {numSeries} pies.",scatterSingle:"Scatter chart with {numPoints} {#plural(numPoints, points, point)}.",
scatterMultiple:"Scatter chart with {numSeries} data series.",boxplotSingle:"Boxplot with {numPoints} {#plural(numPoints, boxes, box)}.",boxplotMultiple:"Boxplot with {numSeries} data series.",bubbleSingle:"Bubble chart with {numPoints} {#plural(numPoints, bubbles, bubble)}.",bubbleMultiple:"Bubble chart with {numSeries} data series."},axis:{xAxisDescriptionSingular:"The chart has 1 X axis displaying {names[0]}.",xAxisDescriptionPlural:"The chart has {numAxes} X axes displaying {#names.forEach(-1) }and {names[-1]}",
yAxisDescriptionSingular:"The chart has 1 Y axis displaying {names[0]}.",yAxisDescriptionPlural:"The chart has {numAxes} Y axes displaying {#names.forEach(-1) }and {names[-1]}"},exporting:{chartMenuLabel:"Chart export",menuButtonLabel:"View export menu",exportRegionLabel:"Chart export menu"},series:{summary:{"default":"{name}, series {ix} of {numSeries} with {numPoints} data {#plural(numPoints, points, point)}.",defaultCombination:"{name}, series {ix} of {numSeries} with {numPoints} data {#plural(numPoints, points, point)}.",
line:"{name}, line {ix} of {numSeries} with {numPoints} data {#plural(numPoints, points, point)}.",lineCombination:"{name}, series {ix} of {numSeries}. Line with {numPoints} data {#plural(numPoints, points, point)}.",spline:"{name}, line {ix} of {numSeries} with {numPoints} data {#plural(numPoints, points, point)}.",splineCombination:"{name}, series {ix} of {numSeries}. Line with {numPoints} data {#plural(numPoints, points, point)}.",column:"{name}, bar series {ix} of {numSeries} with {numPoints} {#plural(numPoints, bars, bar)}.",
columnCombination:"{name}, series {ix} of {numSeries}. Bar series with {numPoints} {#plural(numPoints, bars, bar)}.",bar:"{name}, bar series {ix} of {numSeries} with {numPoints} {#plural(numPoints, bars, bar)}.",barCombination:"{name}, series {ix} of {numSeries}. Bar series with {numPoints} {#plural(numPoints, bars, bar)}.",pie:"{name}, pie {ix} of {numSeries} with {numPoints} {#plural(numPoints, slices, slice)}.",pieCombination:"{name}, series {ix} of {numSeries}. Pie with {numPoints} {#plural(numPoints, slices, slice)}.",
scatter:"{name}, scatter plot {ix} of {numSeries} with {numPoints} {#plural(numPoints, points, point)}.",scatterCombination:"{name}, series {ix} of {numSeries}, scatter plot with {numPoints} {#plural(numPoints, points, point)}.",boxplot:"{name}, boxplot {ix} of {numSeries} with {numPoints} {#plural(numPoints, boxes, box)}.",boxplotCombination:"{name}, series {ix} of {numSeries}. Boxplot with {numPoints} {#plural(numPoints, boxes, box)}.",bubble:"{name}, bubble series {ix} of {numSeries} with {numPoints} {#plural(numPoints, bubbles, bubble)}.",
bubbleCombination:"{name}, series {ix} of {numSeries}. Bubble series with {numPoints} {#plural(numPoints, bubbles, bubble)}.",map:"{name}, map {ix} of {numSeries} with {numPoints} {#plural(numPoints, areas, area)}.",mapCombination:"{name}, series {ix} of {numSeries}. Map with {numPoints} {#plural(numPoints, areas, area)}.",mapline:"{name}, line {ix} of {numSeries} with {numPoints} data {#plural(numPoints, points, point)}.",maplineCombination:"{name}, series {ix} of {numSeries}. Line with {numPoints} data {#plural(numPoints, points, point)}.",
mapbubble:"{name}, bubble series {ix} of {numSeries} with {numPoints} {#plural(numPoints, bubbles, bubble)}.",mapbubbleCombination:"{name}, series {ix} of {numSeries}. Bubble series with {numPoints} {#plural(numPoints, bubbles, bubble)}."},description:"{description}",xAxisDescription:"X axis, {name}",yAxisDescription:"Y axis, {name}"}}}})})(n);(function(a){function n(c){return c.replace(/&/g,"\x26amp;").replace(/</g,"\x26lt;").replace(/>/g,"\x26gt;").replace(/"/g,"\x26quot;").replace(/'/g,"\x26#x27;").replace(/\//g,
"\x26#x2F;")}function q(c){return"string"===typeof c?c.replace(/<\/?[^>]+(>|$)/g,""):c}function p(c){for(var a=c.childNodes.length;a--;)c.appendChild(c.childNodes[a])}var g=a.win.document,k=a.erase,h=a.addEvent,f=a.merge,m={position:"absolute",top:"-999em",width:"1px",height:"1px",overflow:"hidden"};a.Series.prototype.commonKeys="name id category x value y".split(" ");a.Series.prototype.specialKeys="z open high q3 median q1 low close".split(" ");a.seriesTypes.pie&&(a.seriesTypes.pie.prototype.specialKeys=
[]);a.setOptions({accessibility:{enabled:!0,pointDescriptionThreshold:!1,screenReaderSectionFormatter:function(c){var a=c.options,e=c.types||[],d={chart:c,numSeries:c.series&&c.series.length},e=(1===e.length&&"pie"===e[0]||"map"===e[0])&&{}||c.getAxesDescription();return"\x3cdiv\x3e"+c.langFormat("accessibility.navigationHint",d)+"\x3c/div\x3e\x3ch3\x3e"+(a.title.text?n(a.title.text):c.langFormat("accessibility.defaultChartTitle",d))+(a.subtitle&&a.subtitle.text?". "+n(a.subtitle.text):"")+"\x3c/h3\x3e"+
(a.chart.description?"\x3ch4\x3e"+c.langFormat("accessibility.longDescriptionHeading",d)+"\x3c/h4\x3e\x3cdiv\x3e"+a.chart.description+"\x3c/div\x3e":"")+"\x3ch4\x3e"+c.langFormat("accessibility.structureHeading",d)+"\x3c/h4\x3e\x3cdiv\x3e"+(a.chart.typeDescription||c.getTypeDescription())+"\x3c/div\x3e"+(e.xAxis?"\x3cdiv\x3e"+e.xAxis+"\x3c/div\x3e":"")+(e.yAxis?"\x3cdiv\x3e"+e.yAxis+"\x3c/div\x3e":"")}}});a.addEvent(a.Series,"afterRender",function(){this.chart.options.accessibility.enabled&&this.setA11yDescription()});
a.Series.prototype.setA11yDescription=function(){var c=this.chart.options.accessibility,a=this.points&&this.points.length&&this.points[0].graphic&&this.points[0].graphic.element,e=a&&a.parentNode||this.graph&&this.graph.element||this.group&&this.group.element;e&&(e.lastChild===a&&p(e),this.points&&(this.points.length<c.pointDescriptionThreshold||!1===c.pointDescriptionThreshold)&&this.points.forEach(function(d){d.graphic&&(d.graphic.element.setAttribute("role","img"),d.graphic.element.setAttribute("tabindex",
"-1"),d.graphic.element.setAttribute("aria-label",q(d.series.options.pointDescriptionFormatter&&d.series.options.pointDescriptionFormatter(d)||c.pointDescriptionFormatter&&c.pointDescriptionFormatter(d)||d.buildPointInfoString())))}),1<this.chart.series.length||c.describeSingleSeries)&&(e.setAttribute("role",this.options.exposeElementToA11y?"img":"region"),e.setAttribute("tabindex","-1"),e.setAttribute("aria-label",q(c.seriesDescriptionFormatter&&c.seriesDescriptionFormatter(this)||this.buildSeriesInfoString())))};
a.Series.prototype.buildSeriesInfoString=function(){var c=this.chart,a=this.description||this.options.description,a=a&&c.langFormat("accessibility.series.description",{description:a,series:this}),e=c.langFormat("accessibility.series.xAxisDescription",{name:this.xAxis&&this.xAxis.getDescription(),series:this}),d=c.langFormat("accessibility.series.yAxisDescription",{name:this.yAxis&&this.yAxis.getDescription(),series:this}),b={name:this.name||"",ix:this.index+1,numSeries:c.series.length,numPoints:this.points.length,
series:this},l=1===c.types.length?"":"Combination";return(c.langFormat("accessibility.series.summary."+this.type+l,b)||c.langFormat("accessibility.series.summary.default"+l,b))+(a?" "+a:"")+(1<c.yAxis.length&&this.yAxis?" "+d:"")+(1<c.xAxis.length&&this.xAxis?" "+e:"")};a.Point.prototype.buildPointInfoString=function(){var c=this,r=c.series,e=r.chart,d=e.options.accessibility,b="",l=r.xAxis&&r.xAxis.isDatetimeAxis,d=l&&e.time.dateFormat(d.pointDateFormatter&&d.pointDateFormatter(c)||d.pointDateFormat||
a.Tooltip.prototype.getXDateFormat.call({getDateFormat:a.Tooltip.prototype.getDateFormat,chart:e},c,e.options.tooltip,r.xAxis),c.x);a.find(r.specialKeys,function(b){return void 0!==c[b]})?(l&&(b=d),r.commonKeys.concat(r.specialKeys).forEach(function(d){void 0===c[d]||l&&"x"===d||(b+=(b?". ":"")+d+", "+c[d])})):b=(this.name||d||this.category||this.id||"x, "+this.x)+", "+(void 0!==this.value?this.value:this.y);return this.index+1+". "+b+"."+(this.description?" "+this.description:"")+(1<e.series.length&&
r.name?" "+r.name:"")};a.Axis.prototype.getDescription=function(){return this.userOptions&&this.userOptions.description||this.axisTitle&&this.axisTitle.textStr||this.options.id||this.categories&&"categories"||this.isDatetimeAxis&&"Time"||"values"};h(a.Series,"afterInit",function(){var c=this.chart;c.options.accessibility.enabled&&(c.types=c.types||[],0>c.types.indexOf(this.type)&&c.types.push(this.type))});h(a.Series,"remove",function(){var c=this.chart,a=this,e=!1;c.series.forEach(function(d){d!==
a&&0>c.types.indexOf(a.type)&&(e=!0)});e||k(c.types,a.type)});a.Chart.prototype.getTypeDescription=function(){var c=this.types&&this.types[0],a=this.series&&this.series[0]||{},e=a.mapTitle,d=this.langFormat("accessibility.seriesTypeDescriptions."+c,{chart:this}),a={numSeries:this.series.length,numPoints:a.points&&a.points.length,chart:this,mapTitle:e},b=this.series&&1===this.series.length?"Single":"Multiple";return c?"map"===c?e?this.langFormat("accessibility.chartTypes.mapTypeDescription",a):this.langFormat("accessibility.chartTypes.unknownMap",
a):1<this.types.length?this.langFormat("accessibility.chartTypes.combinationChart",a):(this.langFormat("accessibility.chartTypes."+c+b,a)||this.langFormat("accessibility.chartTypes.default"+b,a))+(d?" "+d:""):this.langFormat("accessibility.chartTypes.emptyChart",a)};a.Chart.prototype.getAxesDescription=function(){var c=this.xAxis.length,a=this.yAxis.length,e={};c&&(e.xAxis=this.langFormat("accessibility.axis.xAxisDescription"+(1<c?"Plural":"Singular"),{chart:this,names:this.xAxis.map(function(d){return d.getDescription()}),
numAxes:c}));a&&(e.yAxis=this.langFormat("accessibility.axis.yAxisDescription"+(1<a?"Plural":"Singular"),{chart:this,names:this.yAxis.map(function(d){return d.getDescription()}),numAxes:a}));return e};a.Chart.prototype.addAccessibleContextMenuAttribs=function(){var c=this.exportDivElements;c&&(c.forEach(function(c){"DIV"!==c.tagName||c.children&&c.children.length||(c.setAttribute("role","menuitem"),c.setAttribute("tabindex",-1))}),c[0].parentNode.setAttribute("role","menu"),c[0].parentNode.setAttribute("aria-label",
this.langFormat("accessibility.exporting.chartMenuLabel",{chart:this})))};a.Chart.prototype.addScreenReaderRegion=function(c,a){var e=this,d=e.screenReaderRegion=g.createElement("div"),b=g.createElement("h4"),l=g.createElement("a"),t=e.screenReaderHeading=g.createElement("h4");d.setAttribute("id",c);d.setAttribute("role","region");d.setAttribute("aria-label",e.langFormat("accessibility.screenReaderRegionLabel",{chart:this}));d.innerHTML=e.options.accessibility.screenReaderSectionFormatter(e);e.getCSV&&
(l.innerHTML=e.langFormat("accessibility.viewAsDataTable",{chart:e}),l.href="#"+a,l.setAttribute("tabindex","-1"),l.onclick=e.options.accessibility.onTableAnchorClick||function(){e.viewData();g.getElementById(a).focus()},b.appendChild(l),d.appendChild(b));t.innerHTML=e.langFormat("accessibility.chartHeading",{chart:e});e.renderTo.insertBefore(t,e.renderTo.firstChild);e.renderTo.insertBefore(d,e.renderTo.firstChild);f(!0,t.style,m);f(!0,d.style,m)};h(a.Legend,"afterRender",function(){var c=this.group,
a=this.allItems,e=this.chart;c&&a&&a.length&&(c.attr({role:"region","aria-label":e.langFormat("accessibility.legendLabel")}),this.box&&this.box.attr("aria-hidden","true"),a.forEach(function(d){var b=d.legendGroup,l=d.legendItem,c=d.visible;d=e.langFormat("accessibility.legendItem",{chart:e,itemName:q(d.name)});b&&l&&(b.attr({role:"button","aria-pressed":c?"false":"true"}),d&&b.attr("aria-label",d),l.attr("aria-hidden","false"))}))});h(a.Legend,"afterColorizeItem",function(c){var a=c.item&&c.item.legendGroup;
c=c.visible?"false":"true";a&&(a.attr("aria-pressed",c),a.div&&a.div.setAttribute("aria-pressed",c))});a.Chart.prototype.callbacks.push(function(c){var a=c.options;if(a.accessibility.enabled){var e=c.container.getElementsByTagName("desc")[0],d=c.container.getElementsByTagName("text"),b="highcharts-title-"+c.index,l="highcharts-data-table-"+c.index,t="highcharts-information-region-"+c.index,u=a.title.text||c.langFormat("accessibility.defaultChartTitle",{chart:c}),v=q(c.langFormat("accessibility.svgContainerTitle",
{chartTitle:u}));v.length&&(a=g.createElementNS("http://www.w3.org/2000/svg","title"),a.textContent=v,a.id=b,e.parentNode.insertBefore(a,e));c.renderTo.setAttribute("role","region");c.renderTo.setAttribute("aria-label",c.langFormat("accessibility.chartContainerLabel",{title:q(u),chart:c}));if(c.exportSVGElements&&c.exportSVGElements[0]&&c.exportSVGElements[0].element){var e=c.exportSVGElements[0].element,f=e.onclick;e.onclick=function(){f.apply(this,Array.prototype.slice.call(arguments));c.addAccessibleContextMenuAttribs();
c.highlightExportItem(0)};e.setAttribute("role","button");e.setAttribute("aria-label",c.langFormat("accessibility.exporting.menuButtonLabel",{chart:c}));c.exportingGroup.element.setAttribute("role","region");c.exportingGroup.element.setAttribute("aria-label",c.langFormat("accessibility.exporting.exportRegionLabel",{chart:c}))}c.rangeSelector&&["minInput","maxInput"].forEach(function(b,d){c.rangeSelector[b]&&(c.rangeSelector[b].setAttribute("tabindex","-1"),c.rangeSelector[b].setAttribute("role","textbox"),
c.rangeSelector[b].setAttribute("aria-label",c.langFormat("accessibility.rangeSelector"+(d?"MaxInput":"MinInput"),{chart:c})))});[].forEach.call(d,function(b){"false"!==b.getAttribute("aria-hidden")&&b.setAttribute("aria-hidden","true")});c.addScreenReaderRegion(t,l);h(c,"afterGetTable",function(b){b.html=b.html.replace("\x3ctable ",'\x3ctable summary\x3d"'+c.langFormat("accessibility.tableSummary",{chart:c})+'"')})}})})(n);(function(a){function n(d){var b=d.index,a=d.series.points,c=a.length;if(a[b]!==
d)for(;c--;){if(a[c]===d)return c}else return b}function q(d,b){this.chart=d;this.id=b.id;this.keyCodeMap=b.keyCodeMap;this.validate=b.validate;this.init=b.init;this.terminate=b.terminate}function p(d){var b;d&&d.onclick&&f.createEvent&&(b=f.createEvent("Events"),b.initEvent("click",!0,!1),d.onclick(b))}function g(d){var b=d.chart.options.accessibility;return d.options.skipKeyboardNavigation||!1===d.options.enableMouseTracking||!d.visible||b.pointDescriptionThreshold&&b.pointDescriptionThreshold<=
d.points.length}function k(d){var b=d.series.chart.options.accessibility;return d.isNull&&b.keyboardNavigation.skipNullPoints||!1===d.visible||g(d.series)}var h=a.win,f=h.document,m=a.addEvent,c=a.fireEvent,r=a.merge,e=a.pick;a.extend(a.SVGElement.prototype,{addFocusBorder:function(d,b){this.focusBorder&&this.removeFocusBorder();var a=this.getBBox();d=e(d,3);a.x+=this.translateX?this.translateX:0;a.y+=this.translateY?this.translateY:0;this.focusBorder=this.renderer.rect(a.x-d,a.y-d,a.width+2*d,a.height+
2*d,b&&b.borderRadius).addClass("highcharts-focus-border").attr({zIndex:99}).add(this.parentGroup);this.renderer.styledMode||this.focusBorder.attr({stroke:b&&b.stroke,"stroke-width":b&&b.strokeWidth})},removeFocusBorder:function(){this.focusBorder&&(this.focusBorder.destroy(),delete this.focusBorder)}});a.Series.prototype.keyboardMoveVertical=!0;["column","pie"].forEach(function(d){a.seriesTypes[d]&&(a.seriesTypes[d].prototype.keyboardMoveVertical=!1)});a.setOptions({accessibility:{keyboardNavigation:{enabled:!0,
focusBorder:{enabled:!0,hideBrowserFocusOutline:!0,style:{color:"#335cad",lineWidth:2,borderRadius:3},margin:2},skipNullPoints:!0}}});q.prototype={run:function(d){var b=this,a=d.which||d.keyCode,c=!1,e=!1;this.keyCodeMap.forEach(function(l){-1<l[0].indexOf(a)&&(c=!0,e=!1!==l[1].call(b,a,d))});c||9!==a||(e=this.move(d.shiftKey?-1:1));return e},move:function(d){var b=this.chart;this.terminate&&this.terminate(d);b.keyboardNavigationModuleIndex+=d;var a=b.keyboardNavigationModules[b.keyboardNavigationModuleIndex];
b.focusElement&&b.focusElement.removeFocusBorder();if(a){if(a.validate&&!a.validate())return this.move(d);if(a.init)return a.init(d),!0}b.keyboardNavigationModuleIndex=0;0<d?(this.chart.exiting=!0,this.chart.tabExitAnchor.focus()):this.chart.renderTo.focus();return!1}};a.Axis.prototype.panStep=function(d,b){var a=b||3;b=this.getExtremes();var c=(b.max-b.min)/a*d,a=b.max+c,c=b.min+c,e=a-c;0>d&&c<b.dataMin?(c=b.dataMin,a=c+e):0<d&&a>b.dataMax&&(a=b.dataMax,c=a-e);this.setExtremes(c,a)};a.Chart.prototype.setFocusToElement=
function(d,b){var a=this.options.accessibility.keyboardNavigation.focusBorder;b=b||d;b.element&&b.element.focus&&(b.element.focus(),a.hideBrowserFocusOutline&&b.css({outline:"none"}));a.enabled&&(this.focusElement&&this.focusElement.removeFocusBorder(),d.addFocusBorder(a.margin,{stroke:a.style.color,strokeWidth:a.style.lineWidth,borderRadius:a.style.borderRadius}),this.focusElement=d)};a.Point.prototype.highlight=function(){var d=this.series.chart;if(this.isNull)d.tooltip&&d.tooltip.hide(0);else this.onMouseOver();
this.graphic&&d.setFocusToElement(this.graphic);d.highlightedPoint=this;return this};a.Chart.prototype.highlightAdjacentPoint=function(d){var b=this.series,a=this.highlightedPoint,c=a&&n(a)||0,e=a&&a.series.points,f=this.series&&this.series[this.series.length-1],f=f&&f.points&&f.points[f.points.length-1];if(!b[0]||!b[0].points)return!1;if(a){if(b=b[a.series.index+(d?1:-1)],c=e[c+(d?1:-1)],!c&&b&&(c=b.points[d?0:b.points.length-1]),!c)return!1}else c=d?b[0].points[0]:f;return k(c)?(b=c.series,g(b)?
this.highlightedPoint=d?b.points[b.points.length-1]:b.points[0]:this.highlightedPoint=c,this.highlightAdjacentPoint(d)):c.highlight()};a.Series.prototype.highlightFirstValidPoint=function(){var d=this.chart.highlightedPoint,b=(d&&d.series)===this?n(d):0;if(d=this.points){for(var a=b,c=d.length;a<c;++a)if(!k(d[a]))return d[a].highlight();for(;0<=b;--b)if(!k(d[b]))return d[b].highlight()}return!1};a.Chart.prototype.highlightAdjacentSeries=function(d){var b,a,c=this.highlightedPoint,e=(b=this.series&&
this.series[this.series.length-1])&&b.points&&b.points[b.points.length-1];if(!this.highlightedPoint)return b=d?this.series&&this.series[0]:b,(a=d?b&&b.points&&b.points[0]:e)?a.highlight():!1;b=this.series[c.series.index+(d?-1:1)];if(!b)return!1;var e=Infinity,f,h=b.points.length;if(void 0===c.plotX||void 0===c.plotY)a=void 0;else{for(;h--;)f=b.points[h],void 0!==f.plotX&&void 0!==f.plotY&&(f=(c.plotX-f.plotX)*(c.plotX-f.plotX)*4+(c.plotY-f.plotY)*(c.plotY-f.plotY)*1,f<e&&(e=f,a=h));a=void 0!==a&&
b.points[a]}if(!a)return!1;if(g(b))return a.highlight(),d=this.highlightAdjacentSeries(d),d?d:(c.highlight(),!1);a.highlight();return a.series.highlightFirstValidPoint()};a.Chart.prototype.highlightAdjacentPointVertical=function(d){var b=this.highlightedPoint,a=Infinity,c;if(void 0===b.plotX||void 0===b.plotY)return!1;this.series.forEach(function(l){g(l)||l.points.forEach(function(e){if(void 0!==e.plotY&&void 0!==e.plotX&&e!==b){var t=e.plotY-b.plotY,f=Math.abs(e.plotX-b.plotX),f=Math.abs(t)*Math.abs(t)+
f*f*4;l.yAxis.reversed&&(t*=-1);!(0>t&&d||0<t&&!d||5>f||k(e))&&f<a&&(a=f,c=e)}})});return c?c.highlight():!1};a.Chart.prototype.showExportMenu=function(){this.exportSVGElements&&this.exportSVGElements[0]&&(this.exportSVGElements[0].element.onclick(),this.highlightExportItem(0))};a.Chart.prototype.hideExportMenu=function(){var a=this.exportDivElements;a&&this.exportContextMenu&&(a.forEach(function(b){if("highcharts-menu-item"===b.className&&b.onmouseout)b.onmouseout()}),this.highlightedExportItem=
0,this.exportContextMenu.hideMenu(),this.container.focus())};a.Chart.prototype.highlightExportItem=function(a){var b=this.exportDivElements&&this.exportDivElements[a],d=this.exportDivElements&&this.exportDivElements[this.highlightedExportItem],c;if(b&&"DIV"===b.tagName&&(!b.children||!b.children.length)){c=!!(this.renderTo.getElementsByTagName("g")[0]||{}).focus;b.focus&&c&&b.focus();if(d&&d.onmouseout)d.onmouseout();if(b.onmouseover)b.onmouseover();this.highlightedExportItem=a;return!0}};a.Chart.prototype.highlightLastExportItem=
function(){var a;if(this.exportDivElements)for(a=this.exportDivElements.length;a--&&!this.highlightExportItem(a););};a.Chart.prototype.highlightRangeSelectorButton=function(a){var b=this.rangeSelector.buttons;b[this.highlightedRangeSelectorItemIx]&&b[this.highlightedRangeSelectorItemIx].setState(this.oldRangeSelectorItemState||0);this.highlightedRangeSelectorItemIx=a;return b[a]?(this.setFocusToElement(b[a].box,b[a]),this.oldRangeSelectorItemState=b[a].state,b[a].setState(2),!0):!1};a.Chart.prototype.highlightLegendItem=
function(a){var b=this.legend.allItems,d=this.highlightedLegendItemIx;return b[a]?(b[d]&&c(b[d].legendGroup.element,"mouseout"),void 0!==b[a].pageIx&&b[a].pageIx+1!==this.legend.currentPage&&this.legend.scroll(1+b[a].pageIx-this.legend.currentPage),this.highlightedLegendItemIx=a,this.setFocusToElement(b[a].legendItem,b[a].legendGroup),c(b[a].legendGroup.element,"mouseover"),!0):!1};a.Chart.prototype.addKeyboardNavigationModules=function(){function a(a,c,d){return new q(b,r({keyCodeMap:c},{id:a},d))}
var b=this;b.keyboardNavigationModules=[a("entry",[]),a("points",[[[37,39],function(a){a=39===a;return b.highlightAdjacentPoint(a)?!0:this.init(a?1:-1)}],[[38,40],function(a){a=38!==a;var c=b.options.accessibility.keyboardNavigation;if(c.mode&&"serialize"===c.mode)return b.highlightAdjacentPoint(a)?!0:this.init(a?1:-1);b[b.highlightedPoint&&b.highlightedPoint.series.keyboardMoveVertical?"highlightAdjacentPointVertical":"highlightAdjacentSeries"](a);return!0}],[[13,32],function(){b.highlightedPoint&&
b.highlightedPoint.firePointEvent("click")}]],{init:function(a){var c=b.series.length,d=0<a?0:c;if(0<a)for(delete b.highlightedPoint;d<c;){if(a=b.series[d].highlightFirstValidPoint())return a;++d}else for(;d--;)if(b.highlightedPoint=b.series[d].points[b.series[d].points.length-1],a=b.series[d].highlightFirstValidPoint())return a},terminate:function(){b.tooltip&&b.tooltip.hide(0);delete b.highlightedPoint}}),a("resetZoom",[[[9,37,38,39,40],function(a,b){return this.move(9===a&&b.shiftKey||38===a||
37===a?-1:1)}],[[13,32],function(){b.zoomOut()}]],{validate:function(){return b.resetZoomButton&&b.resetZoomButton.box},init:function(){b.setFocusToElement(b.resetZoomButton.box,b.resetZoomButton)}}),a("exporting",[[[37,38],function(){for(var a=b.highlightedExportItem||0,c=!0;a--;)if(b.highlightExportItem(a)){c=!1;break}if(c)return b.highlightLastExportItem(),!0}],[[39,40],function(){for(var a=!0,c=(b.highlightedExportItem||0)+1;c<b.exportDivElements.length;++c)if(b.highlightExportItem(c)){a=!1;break}if(a)return b.highlightExportItem(0),
!0}],[[13,32],function(){p(b.exportDivElements[b.highlightedExportItem])}]],{validate:function(){return b.exportChart&&!(b.options.exporting&&!1===b.options.exporting.enabled)},init:function(a){b.highlightedPoint=null;b.showExportMenu();0>a&&b.highlightLastExportItem()},terminate:function(){b.hideExportMenu()}}),a("mapZoom",[[[38,40,37,39],function(a){b[38===a||40===a?"yAxis":"xAxis"][0].panStep(39>a?-1:1)}],[[9],function(a,c){b.mapNavButtons[b.focusedMapNavButtonIx].setState(0);if(c.shiftKey&&!b.focusedMapNavButtonIx||
!c.shiftKey&&b.focusedMapNavButtonIx)return b.mapZoom(),this.move(c.shiftKey?-1:1);b.focusedMapNavButtonIx+=c.shiftKey?-1:1;a=b.mapNavButtons[b.focusedMapNavButtonIx];b.setFocusToElement(a.box,a);a.setState(2)}],[[13,32],function(){p(b.mapNavButtons[b.focusedMapNavButtonIx].element)}]],{validate:function(){return b.mapZoom&&b.mapNavButtons&&2===b.mapNavButtons.length},init:function(a){var c=b.mapNavButtons[0],d=b.mapNavButtons[1],c=0<a?c:d;b.mapNavButtons.forEach(function(a,c){a.element.setAttribute("tabindex",
-1);a.element.setAttribute("role","button");a.element.setAttribute("aria-label",b.langFormat("accessibility.mapZoom"+(c?"Out":"In"),{chart:b}))});b.setFocusToElement(c.box,c);c.setState(2);b.focusedMapNavButtonIx=0<a?0:1}}),a("rangeSelector",[[[37,39,38,40],function(a){a=37===a||38===a?-1:1;if(!b.highlightRangeSelectorButton(b.highlightedRangeSelectorItemIx+a))return this.move(a)}],[[13,32],function(){3!==b.oldRangeSelectorItemState&&p(b.rangeSelector.buttons[b.highlightedRangeSelectorItemIx].element)}]],
{validate:function(){return b.rangeSelector&&b.rangeSelector.buttons&&b.rangeSelector.buttons.length},init:function(a){b.rangeSelector.buttons.forEach(function(a){a.element.setAttribute("tabindex","-1");a.element.setAttribute("role","button");a.element.setAttribute("aria-label",b.langFormat("accessibility.rangeSelectorButton",{chart:b,buttonText:a.text&&a.text.textStr}))});b.highlightRangeSelectorButton(0<a?0:b.rangeSelector.buttons.length-1)}}),a("rangeSelectorInput",[[[9,38,40],function(a,c){a=
9===a&&c.shiftKey||38===a?-1:1;c=b.highlightedInputRangeIx+=a;if(1<c||0>c)return this.move(a);b.rangeSelector[c?"maxInput":"minInput"].focus()}]],{validate:function(){return b.rangeSelector&&b.rangeSelector.inputGroup&&"hidden"!==b.rangeSelector.inputGroup.element.getAttribute("visibility")&&!1!==b.options.rangeSelector.inputEnabled&&b.rangeSelector.minInput&&b.rangeSelector.maxInput},init:function(a){b.highlightedInputRangeIx=0<a?0:1;b.rangeSelector[b.highlightedInputRangeIx?"maxInput":"minInput"].focus()}}),
a("legend",[[[37,39,38,40],function(a){a=37===a||38===a?-1:1;!b.highlightLegendItem(b.highlightedLegendItemIx+a)&&1<b.legend.allItems.length&&this.init(a)}],[[13,32],function(){var a=b.legend.allItems[b.highlightedLegendItemIx].legendItem.element;p(b.legend.options.useHTML?a:a.parentNode)}]],{validate:function(){return b.legend&&b.legend.allItems&&b.legend.display&&!(b.colorAxis&&b.colorAxis.length)&&!1!==(b.options.legend&&b.options.legend.keyboardNavigation&&b.options.legend.keyboardNavigation.enabled)},
init:function(a){b.legend.allItems.forEach(function(a){a.legendGroup.element.setAttribute("tabindex","-1")});b.highlightLegendItem(0<a?0:b.legend.allItems.length-1)}})]};a.Chart.prototype.addExitAnchor=function(){var a=this;a.tabExitAnchor=f.createElement("div");a.tabExitAnchor.setAttribute("tabindex","0");r(!0,a.tabExitAnchor.style,{position:"absolute",top:"-999em",width:"1px",height:"1px",overflow:"hidden"});a.renderTo.appendChild(a.tabExitAnchor);return m(a.tabExitAnchor,"focus",function(b){b=
b||h.event;a.exiting?a.exiting=!1:(a.renderTo.focus(),b.preventDefault(),a.keyboardNavigationModuleIndex=a.keyboardNavigationModules.length-1,b=a.keyboardNavigationModules[a.keyboardNavigationModuleIndex],b.validate&&!b.validate()?b.move(-1):b.init(-1))})};a.Chart.prototype.resetKeyboardNavigation=function(){var a=this.keyboardNavigationModules&&this.keyboardNavigationModules[this.keyboardNavigationModuleIndex||0];a&&a.terminate&&a.terminate();this.focusElement&&this.focusElement.removeFocusBorder();
this.keyboardNavigationModuleIndex=0;this.keyboardReset=!0};a.addEvent(a.Series,"destroy",function(){var a=this.chart;a.highlightedPoint&&a.highlightedPoint.series===this&&(delete a.highlightedPoint,a.focusElement&&a.focusElement.removeFocusBorder())});a.Chart.prototype.callbacks.push(function(a){var b=a.options.accessibility;b.enabled&&b.keyboardNavigation.enabled&&(a.addKeyboardNavigationModules(),a.keyboardNavigationModuleIndex=0,a.container.hasAttribute&&!a.container.hasAttribute("tabIndex")&&
a.container.setAttribute("tabindex","0"),a.tabExitAnchor||(a.unbindExitAnchorFocus=a.addExitAnchor()),a.unbindKeydownHandler=m(a.renderTo,"keydown",function(b){b=b||h.event;var c=a.keyboardNavigationModules[a.keyboardNavigationModuleIndex];a.keyboardReset=!1;c&&c.run(b)&&b.preventDefault()}),a.unbindBlurHandler=m(f,"mouseup",function(){a.keyboardReset||a.pointer&&a.pointer.chartPosition||a.resetKeyboardNavigation()}),m(a,"destroy",function(){a.resetKeyboardNavigation();a.unbindExitAnchorFocus&&a.tabExitAnchor&&
a.unbindExitAnchorFocus();a.unbindKeydownHandler&&a.renderTo&&a.unbindKeydownHandler();a.unbindBlurHandler&&a.unbindBlurHandler()}))})})(n)});
//# sourceMappingURL=accessibility.js.map
