/**
 * Ext4 Journal Common Block structure
 * @constructor
 * @memberOf Ext4.Journal
 * @return {Block}
 */
function Block() {

  if( !(this instanceof Block) )
    return new Block()

}

/**
 * Block prototype
 * @type {Object}
 * @ignore
 */
Block.prototype = {

  constructor: Block,

}

// Exports
module.exports = Block
