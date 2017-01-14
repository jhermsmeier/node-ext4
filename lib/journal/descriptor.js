var inherit = require( 'bloodline' )

/**
 * Ext4 Journal Descriptor Block
 * @constructor
 * @memberOf Ext4.Journal
 * @return {Descriptor}
 */
function Descriptor() {

  if( !(this instanceof Descriptor) )
    return new Descriptor()

}

/**
 * Descriptor prototype
 * @type {Object}
 * @ignore
 */
Descriptor.prototype = {

  constructor: Descriptor,

}

inherit( Descriptor, Ext4.Journal.Block )

// Exports
module.exports = Descriptor
