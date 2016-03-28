var utils = require('../utils');
var ini_sidebar = require('./ini_sidebar');
var set_up_filters = require('../filters/set_up_filters');
var set_up_colorbar = require('./set_up_colorbar');
var set_up_search = require('./set_up_search');
var set_up_reorder = require('./set_up_reorder');
var make_cat_keys = require('./make_cat_keys');

/* Represents sidebar with controls.
 */
module.exports = function sidebar(config, params) {

  var sidebar = d3.select(params.root+' .sidebar_wrapper');

  set_up_reorder(params, sidebar);

  set_up_search(sidebar, params);

  // only checking rows for dendrogram, should always be present and rows and cols 
  var inst_rows = params.network_data.row_nodes;
  var found_colorbar = _.filter(inst_rows, function(d) { return utils.has(d,'group'); }).length;
  if (found_colorbar>0){
    set_up_colorbar(sidebar, params);
  }

  var views = params.network_data.views;

  _.each(params.viz.possible_filters, function(inst_filter){
    var num_views = _.filter(views, function(d) { 
        return utils.has(d,inst_filter); 
      }).length;

    if (num_views > 0){
      set_up_filters(config, params, inst_filter);
    }
  });
  
  ini_sidebar(params);

  make_cat_keys(params);

};
