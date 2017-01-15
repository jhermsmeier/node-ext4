var Ext4 = module.exports

Ext4.SuperBlock = require( './superblock' )

Ext4.Journal = require( './journal' )
Ext4.Volume = require( './volume' )
Ext4.FileSystemAPI = require( './filesystem' )

/**
 * Ext4 file system state
 * @enum {Number}
 */
Ext4.STATE = {
  /** @type {Number} Cleanly umounted */
  CLEAN: 0x0001,
  /** @type {Number} Errors detected */
  ERROR: 0x0002,
  /** @type {Number} Orphans being recovered */
  ORPHAN: 0x0004,
}
