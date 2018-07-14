var Ext4 = require( '../ext4' )

/**
 * Ext4 Volume
 * @constructor
 * @memberOf Ext4
 * @param {Object} options
 * @param {Boolean} [options.ignoreMMP=false] - Ignore multi-mount-protection state
 * @return {Volume}
 */
function Volume( options ) {

  if( !(this instanceof Volume) )
    return new Volume( options )

  this.options = Object.assign( {}, Volume.defaults, options )

  /** @type {BlockDevice} */
  this.device = this.options.device || null
  /** @type {Ext4.Journal} */
  this.journal = this.options.journal || null
  /** @type {Ext4.FileSystemAPI} */
  this.fs = new Ext4.FileSystemAPI( this )

}

/**
 * Multiple Mount Protection (MMP) magic number
 * @type {Number}
 * @constant
 */
Volume.MMP = 0x004D4D50

/**
 * Volume prototype
 * @type {Object}
 * @ignore
 */
Volume.prototype = {

  constructor: Volume,

  hasCompatFeature( mask ) {
    return this.superblock &&
      !!(this.superblock.featureCompat & mask)
  },

  hasIncompatFeature( mask ) {
    return this.superblock &&
      !!(this.superblock.featureIncompat & mask)
  },

  hasReadonlyCompatFeature( mask ) {
    return this.superblock &&
      !!(this.superblock.featureReadonlyCompat & mask)
  },

  /**
   * Mount a device as volume
   * @param {BlockDevice} device
   * @param {Object} options
   * @param {Boolean} options.readOnly
   * @param {Function} callback
   * @return {Volume}
   */
  mount: function( device, options, callback ) {

    if( typeof options === 'function') {
      callback = options
      options = {}
    }

    /** @todo Impl Multiple Mount Protection (MMP) */

    this.device = device
    this.superblock = new Ext4.SuperBlock()
    this.journal = new Ext4.Journal()
    this.fs = new Ext4.FileSystemAPI( this )

    /** @todo Load Superblock (properly) */
    device.readBlocks( 2, 4, ( error, buffer, bytesRead ) => {
      this.superblock.parse( buffer )
      callback.call( this, null, this )
    })

    /** @todo Load special inodes */
    /** @todo Open Journal */

    callback.call( this, null, this )

  },

}

/** @type {Object} Default options */
Volume.defaults = {
  ignoreMMP: false,
}

// Exports
module.exports = Volume
