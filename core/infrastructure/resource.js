/**
 * This just acts as skeleton/interface for resource
 * if all these functions are used then they should
 * be overriden
 */

var Resource = function (router) {
    /**
     * mapping prototype default functions to default
     * router
     */
    // map GET /
    router.get('/', function () {
        // this wrapping is required because if provide
        // function referene directly here then
        // the overrided function would not be
        // present at the time of execution
        this.findAll.apply(this, arguments);
    }.bind(this));

    // map GET /:id
    router.get('/:id', function () {
        // this wrapping is required because if provide
        // function referene directly here then
        // the overrided function would not be
        // present at the time of execution
        this.findById.apply(this, arguments);
    }.bind(this));

    // map POST /
    router.post('/', function () {
        // this wrapping is required because if provide
        // function referene directly here then
        // the overrided function would not be
        // present at the time of execution
        this.create.apply(this, arguments);
    }.bind(this));

    // map PUT /:id
    router.put('/:id', function () {
        // this wrapping is required because if provide
        // function referene directly here then
        // the overrided function would not be
        // present at the time of execution
        this.update.apply(this, arguments);
    }.bind(this));

    // map DELETE /:id
    router.delete('/:id', function () {
        // this wrapping is required because if provide
        // function referene directly here then
        // the overrided function would not be
        // present at the time of execution
        this.deleteById.apply(this, arguments);
    }.bind(this));
};

/**
 * Error to be throw in case not implemented
 */
var err = new Error('Not implemented');

// handle GET /
Resource.prototype.findAll = function(req, res) {
    throw(err);
};

// handle GET /:id
Resource.prototype.findById = function(req, res) {
    throw(err);
};

// handle POST /
Resource.prototype.create = function(req, res) {
    throw(err);
}

// handle PUT /:id
Resource.prototype.update= function(req, res) {
    throw(err);
}

// handle DELETE /:id
Resource.prototype.deleteById = function(req, res) {
    throw(err);
}

module.exports = Resource;
