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
