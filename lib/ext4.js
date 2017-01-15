var Ext4 = module.exports

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

/**
 * Behaviour when detecting errors
 * @enum {Number}
 */
Ext4.ERROR_ACTION = {
  /** @type {Number} No action; Continue */
  CONTINUE: 0x0001,
  /** @type {Number} Remount in readonly mode */
  READONLY: 0x0002,
  /** @type {Number} Panic (???) */
  PANIC: 0x0003,
}

/**
 * Creator operating system
 * @enum {Number}
 */
Ext4.CREATOR_OS = {
  LINUX: 0x00000000,
  HURD: 0x00000001,
  MASIX: 0x00000002,
  FREEBSD: 0x00000003,
  LITES: 0x00000004,
}

/**
 * Revision level
 * @enum {Number}
 */
Ext4.REV_LEVEL = {
  /** @type {Number} Original format */
  ORIGINAL: 0x00000000,
  /** @type {Number} Format v2 with dynamic inode sizes */
  DYNAMIC: 0x00000001,
}

Ext4.SuperBlock = require( './superblock' )

Ext4.Journal = require( './journal' )
Ext4.Volume = require( './volume' )
Ext4.FileSystemAPI = require( './filesystem' )
