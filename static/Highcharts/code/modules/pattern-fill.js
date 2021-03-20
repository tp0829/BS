/*
 Highcharts JS v7.0.3 (2019-02-06)
 Module for adding patterns and images as point fills.

 (c) 2010-2019 Highsoft AS
 Author: Torstein Hnsi, ystein Moseng

 License: www.highcharts.com/license
*/
(function(f){"object"===typeof module&&module.exports?(f["default"]=f,module.exports=f):"function"===typeof define&&define.amd?define(function(){return f}):f("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(f){(function(e){function f(a,b){a=JSON.stringify(a);var d=a.length||0,c=0,e=0;if(b){b=Math.max(Math.floor(d/500),1);for(var h=0;h<d;h+=b)c+=a.charCodeAt(h);c&=c}for(;e<d;++e)b=a.charCodeAt(e),c=(c<<5)-c+b,c&=c;return c.toString(16).replace("-","1")}var l=e.addEvent,p=e.wrap,n=e.merge,
q=e.pick;e.Point.prototype.calculatePatternDimensions=function(a){if(!a.width||!a.height){var b=this.graphic&&(this.graphic.getBBox&&this.graphic.getBBox(!0)||this.graphic.element&&this.graphic.element.getBBox())||{},d=this.shapeArgs;d&&(b.width=d.width||b.width,b.height=d.height||b.height,b.x=d.x||b.x,b.y=d.y||b.y);if(a.image){if(!b.width||!b.height){a._width="defer";a._height="defer";return}a.aspectRatio&&(b.aspectRatio=b.width/b.height,a.aspectRatio>b.aspectRatio?b.aspectWidth=b.height*a.aspectRatio:
b.aspectHeight=b.width/a.aspectRatio);a._width=a.width||Math.ceil(b.aspectWidth||b.width);a._height=a.height||Math.ceil(b.aspectHeight||b.height)}a.width||(a._x=a.x||0,a._x+=b.x-Math.round(b.aspectWidth?Math.abs(b.aspectWidth-b.width)/2:0));a.height||(a._y=a.y||0,a._y+=b.y-Math.round(b.aspectHeight?Math.abs(b.aspectHeight-b.height)/2:0))}};e.SVGRenderer.prototype.addPattern=function(a,b){var d;b=e.pick(b,!0);var c=e.animObject(b),g,h=a.width||a._width||32,f=a.height||a._height||32,l=a.color||"#343434",
k=a.id,n=this,m=function(a){n.rect(0,0,h,f).attr({fill:a}).add(d)};k||(this.idCounter=this.idCounter||0,k="highcharts-pattern-"+this.idCounter,++this.idCounter);this.defIds=this.defIds||[];if(!(-1<this.defIds.indexOf(k)))return this.defIds.push(k),d=this.createElement("pattern").attr({id:k,patternUnits:"userSpaceOnUse",width:h,height:f,x:a._x||a.x||0,y:a._y||a.y||0}).add(this.defs),d.id=k,a.path?(g=a.path,g.fill&&m(g.fill),m={d:g.d||g},this.styledMode||(m.stroke=g.stroke||l,m["stroke-width"]=g.strokeWidth||
2),this.createElement("path").attr(m).add(d),d.color=l):a.image&&(b?this.image(a.image,0,0,h,f,function(){this.animate({opacity:q(a.opacity,1)},c);e.removeEvent(this.element,"load")}).attr({opacity:0}).add(d):this.image(a.image,0,0,h,f).add(d)),a.image&&b||void 0===a.opacity||[].forEach.call(d.element.childNodes,function(b){b.setAttribute("opacity",a.opacity)}),this.patternElements=this.patternElements||{},this.patternElements[k]=d};p(e.Series.prototype,"getColor",function(a){var b=this.options.color;
b&&b.pattern&&!b.pattern.color?(delete this.options.color,a.apply(this,Array.prototype.slice.call(arguments,1)),b.pattern.color=this.color,this.color=this.options.color=b):a.apply(this,Array.prototype.slice.call(arguments,1))});l(e.Series,"render",function(){var a=this.chart.isResizing;(this.isDirtyData||a||!this.chart.hasRendered)&&(this.points||[]).forEach(function(b){var d=b.options&&b.options.color;d&&d.pattern&&(!a||b.shapeArgs&&b.shapeArgs.width&&b.shapeArgs.height?b.calculatePatternDimensions(d.pattern):
(d.pattern._width="defer",d.pattern._height="defer"))})});l(e.Point,"afterInit",function(){var a=this.options.color;a&&a.pattern&&("string"===typeof a.pattern.path&&(a.pattern.path={d:a.pattern.path}),this.color=this.options.color=n(this.series.options.color,a))});e.addEvent(e.SVGRenderer,"complexColor",function(a){var b=a.args[0],d=a.args[1];a=a.args[2];var c=b.pattern,g="#343434",h;if(!c)return!0;if(c.image||"string"===typeof c.path||c.path&&c.path.d){h=(h=a.parentNode&&a.parentNode.getAttribute("class"))&&
-1<h.indexOf("highcharts-legend");"defer"!==c._width&&"defer"!==c._height||e.Point.prototype.calculatePatternDimensions.call({graphic:{element:a}},c);if(h||!c.id)c=n({},c),c.id="highcharts-pattern-"+f(c)+f(c,!0);this.addPattern(c,!this.forExport&&e.pick(c.animation,this.globalAnimation,{duration:100}));g="url("+this.url+"#"+c.id+")"}else g=c.color||g;a.setAttribute(d,g);b.toString=function(){return g};return!1});e.addEvent(e.Chart,"endResize",function(){(this.renderer.defIds||[]).filter(function(a){return a&&
a.indexOf&&0===a.indexOf("highcharts-pattern-")}).length&&(this.series.forEach(function(a){a.points.forEach(function(a){(a=a.options&&a.options.color)&&a.pattern&&(a.pattern._width="defer",a.pattern._height="defer")})}),this.redraw(!1))});e.addEvent(e.Chart,"redraw",function(){var a=[],b=this.renderer,d=(b.defIds||[]).filter(function(a){return a.indexOf&&0===a.indexOf("highcharts-pattern-")});d.length&&([].forEach.call(this.renderTo.querySelectorAll('[color^\x3d"url(#"], [fill^\x3d"url(#"], [stroke^\x3d"url(#"]'),
function(b){(b=b.getAttribute("fill")||b.getAttribute("color")||b.getAttribute("stroke"))&&a.push(b.substring(b.indexOf("url(#")+5).replace(")",""))}),d.forEach(function(c){-1===a.indexOf(c)&&(e.erase(b.defIds,c),b.patternElements[c]&&(b.patternElements[c].destroy(),delete b.patternElements[c]))}))});e.Chart.prototype.callbacks.push(function(a){var b=e.getOptions().colors;"M 0 0 L 10 10 M 9 -1 L 11 1 M -1 9 L 1 11;M 0 10 L 10 0 M -1 1 L 1 -1 M 9 11 L 11 9;M 3 0 L 3 10 M 8 0 L 8 10;M 0 3 L 10 3 M 0 8 L 10 8;M 0 3 L 5 3 L 5 0 M 5 10 L 5 7 L 10 7;M 3 3 L 8 3 L 8 8 L 3 8 Z;M 5 5 m -4 0 a 4 4 0 1 1 8 0 a 4 4 0 1 1 -8 0;M 10 3 L 5 3 L 5 0 M 5 10 L 5 7 L 0 7;M 2 5 L 5 2 L 8 5 L 5 8 Z;M 0 0 L 5 10 L 10 0".split(";").forEach(function(d,
c){a.renderer.addPattern({id:"highcharts-default-pattern-"+c,path:d,color:b[c],width:10,height:10})})})})(f)});
//# sourceMappingURL=pattern-fill.js.map
