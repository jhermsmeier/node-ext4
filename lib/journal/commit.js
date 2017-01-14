var inherit = require( 'bloodline' )
var Block = require( './block' )

/**
 * Ext4 Journal Commit Block
 * @constructor
 * @memberOf Ext4.Journal
 * @return {Commit}
 */
function Commit() {

  if( !(this instanceof Commit) )
    return new Commit()

}

/**
 * Commit prototype
 * @type {Object}
 * @ignore
 */
Commit.prototype = {

  constructor: Commit,

}

inherit( Commit, Block )

// Exports
module.exports = Commit
