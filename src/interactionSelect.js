(function (angular) {

    'use strict';

    ol.interaction.PointSelect = function (opt_options) {

        ol.interaction.Interaction.call(this, {
            handleEvent: ol.interaction.PointSelect.handleEvent
        });

        var options = opt_options ? opt_options : {};

        /**
         * @private
         * @type {ol.EventsConditionType}
         */
        this.condition_ = options.condition ?
            options.condition : ol.events.condition.singleClick;


        /**
         * @private
         * @type {boolean}
         */
        this.multi_ = options.multi ? options.multi : false;


        /**
         * @private
         * @type {number}
         */
        this.hitTolerance_ = options.hitTolerance ? options.hitTolerance : 0;

        var featureOverlay = new ol.layer.Vector({
            source: new ol.source.Vector({
                useSpatialIndex: false,
                features: options.features,
                wrapX: options.wrapX
            }),
            style: options.style ? options.style : ol.interaction.PointSelect.getDefaultStyleFunction(),
            updateWhileAnimating: true,
            updateWhileInteracting: true
        });

        /**
         * @private
         * @type {ol.layer.Vector}
         */
        this.featureOverlay_ = featureOverlay;


        /**
         * An association between selected feature (key)
         * and layer (value)
         * @private
         * @type {Object.<number, ol.layer.Layer>}
         */
        this.featureLayerAssociation_ = {};

        var features = this.featureOverlay_.getSource().getFeaturesCollection();
        // ol.events.listen(features,  'add', // ol.Collection.Event.add,  // 'add', //ol.Collection.EventType.ADD,
        //     this.addFeature_, this);
        // ol.events.listen(features,  'remove', //  ol.Collection.Event.remove,   // 'remove', //ol.Collection.EventType.REMOVE,
        //     this.removeFeature_, this);

        features.on('add', this.addFeature_, this);
        features.on('remove', this.removeFeature_, this);

    };
    ol.inherits(ol.interaction.PointSelect, ol.interaction.Interaction);


    /**
     * @param {ol.Feature|ol.render.Feature} feature Feature.
     * @param {ol.layer.Layer} layer Layer.
     * @private
     */
    ol.interaction.PointSelect.prototype.addFeatureLayerAssociation_ = function (feature, layer) {
        var key = ol.getUid(feature);
        this.featureLayerAssociation_[key] = layer;
    };


    /**
     * Get the selected features.
     * @return {ol.Collection.<ol.Feature>} Features collection.
     * @api stable
     */
    ol.interaction.PointSelect.prototype.getFeatures = function () {
        return this.featureOverlay_.getSource().getFeaturesCollection();
    };


    /**
     * Returns the Hit-detection tolerance.
     * @returns {number} Hit tolerance in pixels.
     * @api
     */
    ol.interaction.PointSelect.prototype.getHitTolerance = function () {
        return this.hitTolerance_;
    };


    /**
     * Returns the associated {@link ol.layer.Vector vectorlayer} of
     * the (last) selected feature. Note that this will not work with any
     * programmatic method like pushing features to
     * {@link ol.interaction.Select#getFeatures collection}.
     * @param {ol.Feature|ol.render.Feature} feature Feature
     * @return {ol.layer.Vector} Layer.
     * @api
     */
    ol.interaction.PointSelect.prototype.getLayer = function (feature) {
        var key = ol.getUid(feature);
        return /** @type {ol.layer.Vector} */ (this.featureLayerAssociation_[key]);
    };


    /**
     * Handles the {@link ol.MapBrowserEvent map browser event} and may change the
     * selected state of features.
     * @param {ol.MapBrowserEvent} mapBrowserEvent Map browser event.
     * @return {boolean} `false` to stop event propagation.
     * @this {ol.interaction.Select}
     * @api
     */
    ol.interaction.PointSelect.handleEvent = function (mapBrowserEvent) {
        if (!this.condition_(mapBrowserEvent)) {
            return true;
        }
        var map = mapBrowserEvent.map;
        var features = this.featureOverlay_.getSource().getFeaturesCollection();
        var deselected = [];
        var selected = [];

        // Replace the currently selected feature(s) with the feature(s) at the
        // pixel, or clear the selected feature(s) if there is no feature at
        // the pixel.
        ol.obj.clear(this.featureLayerAssociation_);
        map.forEachFeatureAtPixel(mapBrowserEvent.pixel,
            (
                /**
                 * @param {ol.Feature|ol.render.Feature} feature Feature.
                 * @param {ol.layer.Layer} layer Layer.
                 * @return {boolean|undefined} Continue to iterate over the features.
                 */
                function (feature, layer) {
                    selected.push(feature);
                    this.addFeatureLayerAssociation_(feature, layer);
                    return !this.multi_;
                }).bind(this), {
                hitTolerance: this.hitTolerance_
            });
        var i;
        for (i = features.getLength() - 1; i >= 0; --i) {
            var feature = features.item(i);
            var index = selected.indexOf(feature);
            //if (index > -1) {
            // feature is already selected
            //selected.splice(index, 1);
            //} else {
            features.remove(feature);
            deselected.push(feature);
            //}
        }
        if (selected.length !== 0) {
            features.extend(selected);
        }

        if (selected.length > 0 || deselected.length > 0) {
            this.dispatchEvent(
                new ol.interaction.PointSelect.Event(ol.interaction.PointSelect.EventType.SELECT,
                    selected, deselected, mapBrowserEvent));
        }
        return ol.events.condition.pointerMove(mapBrowserEvent);
    };


    /**
     * Hit-detection tolerance. Pixels inside the radius around the given position
     * will be checked for features. This only works for the canvas renderer and
     * not for WebGL.
     * @param {number} hitTolerance Hit tolerance in pixels.
     * @api
     */
    ol.interaction.PointSelect.prototype.setHitTolerance = function (hitTolerance) {
        this.hitTolerance_ = hitTolerance;
    };

    /**
     * Remove the interaction from its current map, if any,  and attach it to a new
     * map, if any. Pass `null` to just remove the interaction from the current map.
     * @param {ol.Map} map Map.
     * @api stable
     */
    ol.interaction.PointSelect.prototype.setMap = function (map) {
        var currentMap = this.getMap();
        var selectedFeatures =
            this.featureOverlay_.getSource().getFeaturesCollection();
        if (currentMap) {
            selectedFeatures.forEach(currentMap.unskipFeature, currentMap);
        }
        ol.interaction.Interaction.prototype.setMap.call(this, map);
        this.featureOverlay_.setMap(map);
        if (map) {
            selectedFeatures.forEach(map.skipFeature, map);
        }
    };

    /**
     * @return {ol.StyleFunction} Styles.
     */
    ol.interaction.PointSelect.getDefaultStyleFunction = function () {
        var styles = ol.style.Style.createDefaultEditing();
        ol.array.extend(styles[ol.geom.GeometryType.POLYGON],
            styles[ol.geom.GeometryType.LINE_STRING]);
        ol.array.extend(styles[ol.geom.GeometryType.GEOMETRY_COLLECTION],
            styles[ol.geom.GeometryType.LINE_STRING]);

        return function (feature, resolution) {
            if (!feature.getGeometry()) {
                return null;
            }
            return styles[feature.getGeometry().getType()];
        };
    };

    /**
     * @param {ol.Collection.Event} evt Event.
     * @private
     */
    ol.interaction.PointSelect.prototype.addFeature_ = function (evt) {
        var map = this.getMap();
        if (map) {
            map.skipFeature( /** @type {ol.Feature} */ (evt.element));
        }
    };


    /**
     * @param {ol.Collection.Event} evt Event.
     * @private
     */
    ol.interaction.PointSelect.prototype.removeFeature_ = function (evt) {
        var map = this.getMap();
        if (map) {
            map.unskipFeature( /** @type {ol.Feature} */ (evt.element));  // 
        }
    };


    /**
     * @param {ol.Feature|ol.render.Feature} feature Feature.
     * @private
     */
    ol.interaction.PointSelect.prototype.removeFeatureLayerAssociation_ = function (feature) {
        var key = ol.getUid(feature);
        delete this.featureLayerAssociation_[key];
    };


    /**
     * @classdesc
     * Events emitted by {@link ol.interaction.Select} instances are instances of
     * this type.
     *
     * @param {ol.interaction.PointSelect.EventType} type The event type.
     * @param {Array.<ol.Feature>} selected Selected features.
     * @param {Array.<ol.Feature>} deselected Deselected features.
     * @param {ol.MapBrowserEvent} mapBrowserEvent Associated
     *     {@link ol.MapBrowserEvent}.
     * @implements {oli.SelectEvent}
     * @extends {ol.events.Event}
     * @constructor
     */
    ol.interaction.PointSelect.Event = function (type, selected, deselected, mapBrowserEvent) {
        ol.events.Event.call(this, type);

        /**
         * Selected features array.
         * @type {Array.<ol.Feature>}
         * @api
         */
        this.selected = selected;

        /**
         * Deselected features array.
         * @type {Array.<ol.Feature>}
         * @api
         */
        this.deselected = deselected;

        /**
         * Associated {@link ol.MapBrowserEvent}.
         * @type {ol.MapBrowserEvent}
         * @api
         */
        this.mapBrowserEvent = mapBrowserEvent;
    };
    ol.inherits(ol.interaction.PointSelect.Event, ol.events.Event);


    /**
     * @enum {string}
     */
    ol.interaction.PointSelect.EventType = {
        /**
         * Triggered when feature(s) has been (de)selected.
         * @event ol.interaction.PointSelect.Event#select
         * @api
         */
        SELECT: 'pointSelect'
    };


})(angular);