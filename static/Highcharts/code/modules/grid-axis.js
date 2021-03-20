/*
 Highcharts JS v7.0.3 (2019-02-06)
 GridAxis

 (c) 2016-2019 Lars A. V. Cabrera

 License: www.highcharts.com/license
*/
(function(n){"object"===typeof module&&module.exports?(n["default"]=n,module.exports=n):"function"===typeof define&&define.amd?define(function(){return n}):n("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(n){(function(g){var l=g.addEvent,n=g.dateFormat,t=g.defined,x=g.isArray,y=g.isNumber,r=function(a){return g.isObject(a,!0)},z=g.merge,v=g.pick,A=g.wrap,f=g.Axis,C=g.Tick,w={top:0,right:1,bottom:2,left:3,0:"top",1:"right",2:"bottom",3:"left"};f.prototype.isNavigatorAxis=function(){return/highcharts-navigator-[xy]axis/.test(this.options.className)};
f.prototype.isOuterAxis=function(){var a=this,b=-1,c=!0;a.chart.axes.forEach(function(d,e){d.side!==a.side||d.isNavigatorAxis()||(d===a?b=e:0<=b&&e>b&&(c=!1))});return c};f.prototype.getMaxLabelDimensions=function(a,b){var c={width:0,height:0};b.forEach(function(b){b=a[b];var d;r(b)&&(d=r(b.label)?b.label:{},b=d.getBBox?d.getBBox().height:0,d=y(d.textPxLength)?d.textPxLength:0,c.height=Math.max(b,c.height),c.width=Math.max(d,c.width))});return c};g.dateFormats={W:function(a){a=new Date(a);var b;a.setHours(0,
0,0,0);a.setDate(a.getDate()-(a.getDay()||7));b=new Date(a.getFullYear(),0,1);return Math.ceil(((a-b)/864E5+1)/7)},E:function(a){return n("%a",a,!0).charAt(0)}};l(C,"afterGetLabelPosition",function(a){var b=this.label,c=this.axis,d=c.reversed,e=c.chart,h=c.options,q=h&&r(h.grid)?h.grid:{},h=c.options.labels,B=h.align,k=w[c.side],m=a.tickmarkOffset,p=c.tickPositions,u=this.pos-m,p=y(p[a.index+1])?p[a.index+1]-m:c.max+m,g=c.tickSize("tick",!0),m=x(g)?g[0]:0,g=g&&g[1]/2,f;!0===q.enabled&&("top"===k?
(q=c.top+c.offset,f=q-m):"bottom"===k?(f=e.chartHeight-c.bottom+c.offset,q=f+m):(q=c.top+c.len-c.translate(d?p:u),f=c.top+c.len-c.translate(d?u:p)),"right"===k?(k=e.chartWidth-c.right+c.offset,d=k+m):"left"===k?(d=c.left+c.offset,k=d-m):(k=Math.round(c.left+c.translate(d?p:u))-g,d=Math.round(c.left+c.translate(d?u:p))-g),this.slotWidth=d-k,a.pos.x="left"===B?k:"right"===B?d:k+(d-k)/2,a.pos.y=f+(q-f)/2,e=e.renderer.fontMetrics(h.style.fontSize,b.element),b=b.getBBox().height,h.useHTML?a.pos.y+=e.b+
-(b/2):(b=Math.round(b/e.h),a.pos.y+=(e.b-(e.h-e.f))/2+-((b-1)*e.h/2)),a.pos.x+=c.horiz&&h.x||0)});l(f,"afterTickSize",function(a){var b=this.maxLabelDimensions,c=this.options;!0===(c&&r(c.grid)?c.grid:{}).enabled&&(c=2*Math.abs(this.defaultLeftAxisOptions.labels.x),b=c+(this.horiz?b.height:b.width),x(a.tickSize)?a.tickSize[0]=b:a.tickSize=[b])});l(f,"afterGetTitlePosition",function(a){var b=this.options;if(!0===(b&&r(b.grid)?b.grid:{}).enabled){var c=this.axisTitle,d=c&&c.getBBox().width,e=this.horiz,
h=this.left,q=this.top,g=this.width,k=this.height,m=b.title,b=this.opposite,p=this.offset,u=this.tickSize()||[0],f=m.x||0,l=m.y||0,n=v(m.margin,e?5:10),c=this.chart.renderer.fontMetrics(m.style&&m.style.fontSize,c).f,u=(e?q+k:h)+u[0]/2*(b?-1:1)*(e?1:-1)+(this.side===w.bottom?c:0);a.titlePosition.x=e?h-d/2-n+f:u+(b?g:0)+p+f;a.titlePosition.y=e?u-(b?k:0)+(b?c:-c)/2+p+l:q-n+l}});A(f.prototype,"unsquish",function(a){var b=this.options;return!0===(b&&r(b.grid)?b.grid:{}).enabled&&this.categories?this.tickInterval:
a.apply(this,Array.prototype.slice.call(arguments,1))});l(f,"afterSetOptions",function(a){var b=this.options;a=a.userOptions;var c,d=b&&r(b.grid)?b.grid:{};!0===d.enabled&&(c=z(!0,{className:"highcharts-grid-axis "+(a.className||""),dateTimeLabelFormats:{hour:{list:["%H:%M","%H"]},day:{list:["%A, %e. %B","%a, %e. %b","%E"]},week:{list:["Week %W","W%W"]},month:{list:["%B","%b","%o"]}},grid:{borderWidth:1},labels:{padding:2,style:{fontSize:"13px"}},margin:0,title:{text:null,reserveSpace:!1,rotation:0},
units:[["millisecond",[1,10,100]],["second",[1,10]],["minute",[1,5,15]],["hour",[1,6]],["day",[1]],["week",[1]],["month",[1]],["year",null]]},a),"xAxis"===this.coll&&(t(a.linkedTo)&&!t(a.tickPixelInterval)&&(c.tickPixelInterval=350),t(a.tickPixelInterval)||!t(a.linkedTo)||t(a.tickPositioner)||t(a.tickInterval)||(c.tickPositioner=function(a,b){var d=this.linkedParent&&this.linkedParent.tickPositions&&this.linkedParent.tickPositions.info;if(d){var e,k,h,p,f=c.units;for(p=0;p<f.length;p++)if(f[p][0]===
d.unitName){e=p;break}if(f[e][1])return f[e+1]&&(h=f[e+1][0],k=(f[e+1][1]||[1])[0]),d=g.timeUnits[h],this.tickInterval=d*k,this.getTimeTicks({unitRange:d,count:k,unitName:h},a,b,this.options.startOfWeek)}})),z(!0,this.options,c),this.horiz&&(b.minPadding=v(a.minPadding,0),b.maxPadding=v(a.maxPadding,0)),y(b.grid.borderWidth)&&(b.tickWidth=b.lineWidth=d.borderWidth))});l(f,"afterSetAxisTranslation",function(){var a=this.options,b=a&&r(a.grid)?a.grid:{},c=this.tickPositions&&this.tickPositions.info,
d=this.userOptions.labels||{};this.horiz&&(!0===b.enabled&&this.series.forEach(function(a){a.options.pointRange=0}),c&&(!1===a.dateTimeLabelFormats[c.unitName].range||1<c.count)&&!t(d.align)&&(a.labels.align="left",t(d.x)||(a.labels.x=3)))});l(f,"trimTicks",function(){var a=this.options,b=a&&r(a.grid)?a.grid:{},c=this.categories,d=this.tickPositions,e=d[0],h=d[d.length-1],f=this.linkedParent&&this.linkedParent.min||this.min,g=this.linkedParent&&this.linkedParent.max||this.max,k=this.tickInterval;
!0!==b.enabled||c||!this.horiz&&!this.isLinked||((e>f||e<f&&e+k>f)&&!a.startOnTick&&(d[0]=f),(h<g||h>g&&h-k<g)&&!a.endOnTick&&(d[d.length-1]=g))});l(f,"afterRender",function(){var a=this.options,b=a&&r(a.grid)?a.grid:{},c,d,e,f,g,l,k=this.chart.renderer,m=this.horiz;if(!0===b.enabled&&(b=2*Math.abs(this.defaultLeftAxisOptions.labels.x),this.maxLabelDimensions=this.getMaxLabelDimensions(this.ticks,this.tickPositions),b=this.maxLabelDimensions.width+b,c=a.lineWidth,this.rightWall&&this.rightWall.destroy(),
d=this.axisGroup.getBBox(),this.isOuterAxis()&&this.axisLine&&(m&&(b=d.height-1),c))){d=this.getLinePath(c);g=d.indexOf("M")+1;l=d.indexOf("L")+1;e=d.indexOf("M")+2;f=d.indexOf("L")+2;if(this.side===w.top||this.side===w.left)b=-b;m?(d[e]+=b,d[f]+=b):(d[g]+=b,d[l]+=b);this.axisLineExtra?this.axisLineExtra.animate({d:d}):this.axisLineExtra=k.path(d).attr({stroke:a.lineColor,"stroke-width":c,zIndex:7}).addClass("highcharts-axis-line").add(this.axisGroup);this.axisLine[this.showAxis?"show":"hide"](!0)}});
l(f,"init",function(a){function b(){var a=c.options,b=25/11,d=c.chart.renderer.fontMetrics(a.labels.style.fontSize);a.labels||(a.labels={});a.labels.align=v(a.labels.align,"center");c.categories||(a.showLastLabel=!1);c.horiz&&(a.tickLength=e.cellHeight||d.h*b);c.labelRotation=0;a.labels.rotation=0}var c=this,d=c.chart,e=(a=a.userOptions)&&r(a.grid)?a.grid:{},h,q,n;if(e.enabled)if(t(e.borderColor)&&(a.tickColor=a.lineColor=e.borderColor),x(e.columns)){q=0;for(n=e.columns.length;n--;)h=z(a,e.columns[n],
{type:"category"}),delete h.grid.columns,h=new f(c.chart,h),h.isColumn=!0,h.columnIndex=q,A(h,"labelFormatter",function(a){var c=this.axis,b=c.tickPositions,d=this.value,e=d===b[0],b=d===b[b.length-1],f=g.find(c.series[0].options.data,function(a){return a[c.isXAxis?"x":"y"]===d});this.isFirst=e;this.isLast=b;this.point=f;return a.call(this)}),q++;l(this,"afterInit",function(){g.erase(d.axes,this);g.erase(d[c.coll],this)})}else l(this,"afterInit",b)})})(n)});
//# sourceMappingURL=grid-axis.js.map
