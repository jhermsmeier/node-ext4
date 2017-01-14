var inherit = require( 'bloodline' )

/**
 * Ext4 Journal Revocation Block
 * @constructor
 * @memberOf Ext4.Journal
 * @return {Revocation}
 */
function Revocation() {

  if( !(this instanceof Revocation) )
    return new Revocation()

}

/**
 * Revocation prototype
 * @type {Object}
 * @ignore
 */
Revocation.prototype = {

  constructor: Revocation,

}

inherit( Revocation, Ext4.Journal.Block )

// Exports
module.exports = Revocation
