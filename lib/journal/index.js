/**
 * Journal (jbd2)
 * @constructor
 * @memberOf Ext4
 * @return {Journal}
 */
function Journal() {

  if( !(this instanceof Journal) )
    return new Journal()

}

/**
 * Journal (jbd2) magic number
 * @constant
 * @type {Number}
 */
Journal.MAGIC = 0xC03B3998

/**
 * Block types
 * @enum {BlockType} // TODO: See jsdoc for syntax
 * @type {Object<String,Number>}
 */
Journal.BLOCK = {
  /** @type {Number} Descriptor */
  DESCRIPTOR: 1,
  /** @type {Number} Commit record */
  COMMIT: 2,
  /** @type {Number} Superblock v1 */
  SUPER_1: 3,
  /** @type {Number} Superblock v2 */
  SUPER_2: 4,
  /** @type {Number} Revocation record */
  REVOCATION: 5,
}

Journal.Block = require( './block' )
Journal.SuperBlock = require( './superblock' )
Journal.Commit = require( './commit' )
Journal.Descriptor = require( './descriptor' )
Journal.Revocation = require( './revocation' )

/**
 * Journal prototype
 * @type {Object}
 * @ignore
 */
Journal.prototype = {

  constructor: Journal,

}

// Exports
module.exports = Journal
