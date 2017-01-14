/**
 * SuperBlock
 * @constructor
 * @memberOf Ext4
 * @return {SuperBlock}
 */
function SuperBlock() {

  if( !(this instanceof SuperBlock) )
    return new SuperBlock()

}

/**
 * SuperBlock prototype
 * @type {Object}
 * @ignore
 */
SuperBlock.prototype = {

  constructor: SuperBlock,

}

// Exports
module.exports = SuperBlock
