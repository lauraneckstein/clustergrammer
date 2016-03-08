module.exports = function resize_row_tiles(params, svg_group){

  var row_nodes = params.network_data.row_nodes;
  var row_nodes_names = _.pluck(row_nodes, 'name');

  svg_group.selectAll('.row')
    .attr('transform', function(d){
      var tmp_index = _.indexOf(row_nodes_names, d.name);
      return 'translate(0,'+params.viz.y_scale(tmp_index)+')';
    });

  // reset tiles
  svg_group.selectAll('.row')
    .selectAll('.tile')
    .attr('transform', function(d){
      var x_pos = params.viz.x_scale(d.pos_x) + 0.5*params.viz.border_width;
      var y_pos = 0.5*params.viz.border_width/params.viz.zoom_switch;
      return 'translate('+x_pos+','+y_pos+')';
    })
    .attr('width', params.viz.rect_width)
    .attr('height', params.viz.rect_height);

  // reset tile_up
  svg_group.selectAll('.row')
    .selectAll('.tile_up')
    .attr('d', function() {
        // up triangle
        var start_x = 0;
        var final_x = params.viz.x_scale.rangeBand();
        var start_y = 0;
        var final_y = params.viz.y_scale.rangeBand() - params.viz.y_scale.rangeBand() /60;

        var output_string = 'M' + start_x + ',' + start_y + ', L' +
        start_x + ', ' + final_y + ', L' + final_x + ',0 Z';

        return output_string;
      })
      .attr('transform', function(d) {
        var x_pos = params.viz.x_scale(d.pos_x) + 0.5*params.viz.border_width;
        var y_pos = 0.5*params.viz.border_width/params.viz.zoom_switch;
        return 'translate(' + x_pos + ','+y_pos+')';
      });

  svg_group.selectAll('.row')
    .selectAll('.tile_dn')
    .attr('d', function() {
        // dn triangle
        var start_x = 0;
        var final_x = params.viz.x_scale.rangeBand();
        var start_y = params.viz.y_scale.rangeBand() - params.viz.y_scale.rangeBand() /60;
        var final_y = params.viz.y_scale.rangeBand() - params.viz.y_scale.rangeBand() /60;

        var output_string = 'M' + start_x + ', ' + start_y + ' ,   L' +
        final_x + ', ' + final_y + ',  L' + final_x + ',0 Z';

        return output_string;
      })
      .attr('transform', function(d) {
        var x_pos = params.viz.x_scale(d.pos_x) + 0.5*params.viz.border_width;
        var y_pos = 0.5*params.viz.border_width/params.viz.zoom_switch;
        return 'translate(' + x_pos + ','+y_pos+')';
      });

};