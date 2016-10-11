/**
 *
 * @source: http://github.com/samsmits/SonnenburgLab_Public/Visualizations/Heatmap/js/heatmap.js
 *
 * @licstart  The following is the entire license notice for the 
 *  JavaScript code in this page.
 *
 * Copyright (C) 2015 Sam Smits
 *
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */

Heatmap = function(data, optionalArgs={}){
  this.data = data;

  // Defaults
  this.width = 300;
  this.height = 300;
  this.margin = {top: 0, right: 0, bottom: 0, left: 0};

  this.boxWidth = 10;
  this.boxHeight = 10;
  this.boxPadding = 1;

  this.showHeader = false;
  this.headerBoxHeight = optionalArgs.hasOwnProperty('boxHeight') ? optionalArgs['boxHeight'] + 8 : this.boxHeight + 8
  this.headerBoxWidth = optionalArgs.hasOwnProperty('boxWidth') ? optionalArgs['boxWidth'] : this.boxWidth

  this.colorScale = d3.scale.linear()
    .domain([0, 0.2, 0.5, 0.7, 1])
    .range(['#FFF', '#eacac5', '#d093a3', '#a7658d', '#6b3e6f', '#2e1f3f']);

  this.headerColorScale = d3.scale.category10();

  /* Overwrite defaults with custom settings */
  for(var key in optionalArgs){
    if(optionalArgs.hasOwnProperty(key)){
      this[key] = optionalArgs[key];
    }
  }

  /* Post-Definition processing */
  this.width -= this.margin.left - this.margin.right,
  this.height -= this.margin.top - this.margin.bottom;  

  this.x = d3.scale.linear()
    .domain([0, this.cols])
    .range([0, this.width]);

  this.y = d3.scale.linear()
    .domain([this.rows, 0])
    .range([this.height, 0]);

}

Heatmap.prototype.renderTo = function(dom){
  var that = this;

  this.svg = d3.select(dom).append("svg")
    .attr("width", this.width + this.margin.left + this.margin.right)
    .attr("height", this.height + this.margin.top + this.margin.bottom)
  .append("g")
    .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

  for( var i = 0; i < data.length; i++ ){
    that._renderRow(i)
  }    

  if( that.showHeader ){
    that._renderHeader(that.showHeader)
  }
}

Heatmap.prototype._renderHeader = function(data){
  var that = this;

  this.heatmapRow = this.svg.selectAll('rect .header')
    .data(data)
    .enter()  
    .append('rect')
    .attr('width', that.headerBoxWidth)
    .attr('height', that.headerBoxHeight)
    .attr('fill', function(d,i){ 
      switch(d){
        case "Bacteroidetes":
          return "#339933";
        case "Firmicutes":
          return "#ff9900";
      }
      return "#CCCCCC";
    } )
    .attr('x', function(d,i){ return (that.boxPadding + that.boxWidth) * i })
    .attr('y', function(){  return 0; });

}

Heatmap.prototype._renderRow = function(n){
  var that = this;

  this.heatmapRow = this.svg.selectAll('rect .row' + n)
    .data(that.data[n])
    .enter()  
    .append('rect')
    .attr('width', that.boxWidth)
    .attr('height', that.boxHeight)
    .attr('fill', function(d){ return that.colorScale(d); })
    .attr('fill-opacity', function(d){ return d == 0 ? 0 : 1 })
    .attr('stroke', '#000000')
    .attr('stroke-width', function(d){ return d == 0 ? '0' : '0.1' })    
    .attr('x', function(d,i){ return (that.boxPadding + that.boxWidth) * i })
    .attr('y', function(){  return (n + 2) * (that.boxPadding + that.boxHeight) });
}
