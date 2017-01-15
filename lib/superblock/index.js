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
 * SuperBlock magic signature @ 0x038
 * @type {Number}
 */
SuperBlock.MAGIC = 0xEF53

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
