    /*
     * Create mediator which provide module isolation.
     * Each module know only about mediator,
     * and can communicate with another objects only by subscribing and publishing some events
     * @constructor
     */
    var Mediator = function() {
        this.items = [];
    };

    Mediator.prototype = {

        /*
         * Subscribe <callback> to event called <name> with context <context>
         * @param {string} name
         * @param {object} context
         * @param {function} callback
         * @return {object} this
         */
        subscribe: function(name, context, callback) {
            if (typeof this.items[name] === 'undefined') {
                this.items[name] = [];
            }
            if (typeof callback === 'function') {
                this.items[name].push({callback: callback, context: context});
            }
            return this;
        },

        /*
         * Call all callbacks for event called <name>, and pass <object> as param
         * @param {string} name
         * @param {object} options
         * @return {object} this
         */
        publish: function(name, options) {
            var j, i;
            for (i in this.items[name]) {
                    this.items[name][i].callback.call(this.items[name][i].context, options);
            }
            return this;
        }

    };