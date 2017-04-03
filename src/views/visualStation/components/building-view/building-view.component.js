(function (angular) {

    'use strict';

    /**
     * @ngInject
     */
    function BuildingViewController($scope, BuildingViewService) {
        var self = this;
        self.$onInit = $onInit;
        self.$postLink = $postLink;
        var _svg = null;

        function $onInit() {
            //

        }

        function $postLink() {
            createBuilding();
        }

        function createBuilding() {
            _svg = d3.select("#building-view-map");
            // var width = +svg.attr("width");
            // var height = +svg.attr("height");
            // console.log(width + "   " + height);
            // var angles = d3.range(0, 2 * Math.PI, Math.PI / 200);
            // console.log(width + "   " + height + "  " + angles);
            //
            var svgDom = $("#building-view-map")[0];
            var svgWidth = svgDom.clientWidth;
            var svgHeight = svgDom.clientHeight;
            console.log(svgWidth + '   ' + svgHeight);

            var top = 30;
            var left = 30;
            var angule = -30;
            var floorHeight = 45;
            var height = 70;
            var width = svgWidth - left * 2 + height * Math.tan(Math.PI * angule / 180);

            var fill = '#717e8e'; // 'none'; // 
            var opacity = 0.75;
            var stroke = '#06f5f8';
            var strokeWidth = 1;
            var strokeLinejoin = "round";
            //
            var count = 10;
            var id = '';
            for (var i = count; i > -1; i--) {
                var currentTop = top + i * floorHeight;
                if (i == count / 2) {
                    //fill = '#FF0000';
                    fill = '#717e8e';
                } else {
                    fill = '#717e8e';
                }
                id = 'id-' + i;
                createBuildingFloor(i == count, id, svgWidth, svgHeight, left, currentTop, width, height, angule, floorHeight, fill, opacity, stroke, strokeWidth, strokeLinejoin);
                //
            }
        }

        function createBuildingFloor(first, id, svgWidth, svgHeight, left, top, width, height, angule, floorHeight, fill, opacity, stroke, strokeWidth, strokeLinejoin) {

            //
            var viewBox = (-left) + ' ' + (-top) + ' ' + svgWidth + ' ' + svgHeight;
            var floorGroup = _svg.append("g");
            //.attr("viewBox", viewBox);
            //console.log(viewBox);
            var angularPi = Math.PI * angule / 180;
            if (!first) {
                var fill2 = '#959eaa'; // 'none'; // 
                var opacity2 = 0.7;
                var left2 = left;
                var width2 = -height * Math.tan(angularPi);
                var top2 = top - left2 / Math.tan(angularPi) - width2 / Math.tan(angularPi);

                var height2 = floorHeight;
                console.log(left2 + '  ' + top2 + '  ' + width2 + '  ' + height2);
                createBuildingSide(floorGroup, id, svgWidth, svgHeight, left2, top2, width2, height2, angule, fill2, opacity2, stroke, strokeWidth, strokeLinejoin);
                //
            }
            //     
            var fill1 = fill; // 'none'; // 
            var opacity1 = opacity;
            var top1 = top;
            var left1 = left - top1 * Math.tan(angularPi) - height * Math.tan(angularPi);
            console.log(height * Math.tan(angularPi));
            var width1 = width;
            var height1 = height;
            console.log(left1 + '  ' + top1 + '  ' + width1 + '  ' + height1);
            createBuildingBoard(floorGroup, id, svgWidth, svgHeight, left1, top1, width1, height1, angule, fill1, opacity1, stroke, strokeWidth, strokeLinejoin);
            //
            var deviceCountRow = 3;
            var deviceCountColumn = 4;
            var rowSpan = (height - 24) / (deviceCountRow - 1);
            var columnSpan = (width - 24) / (deviceCountColumn - 1);
            //
            for (var i = 0; i < deviceCountRow; i++) {
                for (var j = 0; j < deviceCountColumn; j++) {
                    var fill4 = fill; // 'none'; // 
                    var opacity4 = opacity;
                    var top4 = top + rowSpan * i;
                    var left4 = left - top4 * Math.tan(angularPi) - (height - rowSpan * i) * Math.tan(angularPi) + columnSpan * j;
                    console.log(height * Math.tan(angularPi));
                    var width4 = width;
                    var height4 = height;
                    console.log(left4 + '  ' + top4 + '  ' + width4 + '  ' + height4);
                    createBuildingDevices(floorGroup, id + "-" + i + "-" + j, svgWidth, svgHeight, left4, top4, width4, height4, angule, fill4, opacity4, stroke, strokeWidth, strokeLinejoin);
                }
            }
            //
            if (!first) {
                //
                var fill3 = '#959eaa'; // 'none'; // 
                var opacity3 = 0.7;
                var left3 = left + width;
                var width3 = -height * Math.tan(angularPi);
                var top3 = top - left3 / Math.tan(angularPi) - width3 / Math.tan(angularPi);

                var height3 = floorHeight;
                console.log(left3 + '  ' + top3 + '  ' + width3 + '  ' + height3);
                createBuildingSide(floorGroup, id, svgWidth, svgHeight, left3, top3, width3, height3, angule, fill3, opacity3, stroke, strokeWidth, strokeLinejoin);
            }
        }

        function createBuildingDevices(floorGroup, id, svgWidth, svgHeight, left, top, width, height, angule, fill, opacity, stroke, strokeWidth, strokeLinejoin) {
            var deviceGroup = _svg.append("g")
                .attr("transform", 'skewX(' + angule + ')');

            var device = deviceGroup.append("image")
                .attr("id", id)
                .attr("x", left)
                .attr("y", top)
                .attr("width", 24)
                .attr("height", 24)
                .attr("xlink:href", 'http://localhost:8000/dist/static/images/music.png');
            //
            device.on('click', function () {
                var event = d3.event,
                    target = event.srcElement, //  获取事件发生源
                    data = d3.select(target).datum(); //  获取事件发生源的数据
                alert(target.id);
                // if (data !== undefined) {
                //     alert('from parent:' + data.name);
                // }
                //    阻止事件向后传递
                event.stopPropagation();
            }, false);
        }


        function createBuildingBoard(floorGroup, id, svgWidth, svgHeight, left, top, width, height, angule, fill, opacity, stroke, strokeWidth, strokeLinejoin) {
            var board = _svg.append("rect")
                .attr("id", id)
                .attr("transform", 'skewX(' + angule + ')')
                .attr("x", left)
                .attr("y", top)
                .attr("width", width)
                .attr("height", height)
                .attr("fill", fill)
                .attr("fill-opacity", opacity)
                .attr("stroke", stroke)
                .attr("stroke-width", strokeWidth)
                .attr("stroke-linejoin", strokeLinejoin);
            board.on('click', function () {
                var event = d3.event,
                    target = event.srcElement, //  获取事件发生源
                    data = d3.select(target).datum(); //  获取事件发生源的数据
                alert(target.id);
                // if (data !== undefined) {
                //     alert('from parent:' + data.name);
                // }
                //    阻止事件向后传递
                event.stopPropagation();
            }, false);
        }



        function createBuildingSide(floorGroup, id, svgWidth, svgHeight, left, top, width, height, angule, fill, opacity, stroke, strokeWidth, strokeLinejoin) {

            _svg.append("rect")
                .attr("id", id)
                .attr("transform", 'skewY(' + (90 - angule) + ')')
                .attr("x", left)
                .attr("y", top)
                .attr("width", width)
                .attr("height", height)
                .attr("fill", fill)
                .attr("fill-opacity", opacity)
                .attr("stroke", stroke)
                .attr("stroke-width", strokeWidth)
                .attr("stroke-linejoin", strokeLinejoin);
        }

        //
        function createBuildingFloor1(svgWidth, id, svgHeight, left, top, width, height, angule, fill, opacity, stroke, strokeWidth, strokeLinejoin) {
            _svg.append("rect")
                .attr("id", id)
                .attr("transform", 'skewX(30)')
                .attr("x", left)
                .attr("y", top)
                .attr("width", width)
                .attr("height", height)
                .attr("fill", fill)
                .attr("stroke", stroke)
                .attr("stroke-width", strokeWidth)
                .attr("stroke-linejoin", strokeLinejoin);
        }


        function test() {
            var svg = d3.select("svg"),
                width = +svg.attr("width"),
                height = +svg.attr("height"),
                angles = d3.range(0, 2 * Math.PI, Math.PI / 200);

            var path = svg.append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
                .attr("fill", "none")
                .attr("stroke-width", 10)
                .attr("stroke-linejoin", "round")
                .selectAll("path")
                .data(["cyan", "magenta", "yellow"])
                .enter().append("path")
                .attr("stroke", function (d) {
                    return d;
                })
                .style("mix-blend-mode", "darken")
                .datum(function (d, i) {
                    return d3.radialLine()
                        .curve(d3.curveLinearClosed)
                        .angle(function (a) {
                            return a;
                        })
                        .radius(function (a) {
                            var t = d3.now() / 1000;
                            return 200 + Math.cos(a * 8 - i * 2 * Math.PI / 3 + t) * Math.pow((1 + Math.cos(a - t)) / 2, 3) * 32;
                        });
                });

            d3.timer(function () {
                path.attr("d", function (d) {
                    return d(angles);
                });
            });
        }
    }



    var buildingView = {
        bindings: {},
        controller: BuildingViewController,
        templateUrl: 'views/visualStation/components/building-view/building-view.html'
    };

    angular.module('common.building-view').component('buildingView', buildingView, []);

})(angular);