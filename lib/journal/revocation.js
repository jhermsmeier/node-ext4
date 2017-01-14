var inherit = require( 'bloodline' )
var Block = require( './block' )

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

inherit( Revocation, Block )

// Exports
module.exports = Revocation
