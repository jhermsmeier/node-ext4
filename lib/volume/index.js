var Ext4 = require( '../ext4' )

/**
 * Ext4 Volume
 * @constructor
 * @memberOf Ext4
 * @param {Object} options
 * @return {Volume}
 */
function Volume( options ) {

  if( !(this instanceof Volume) )
    return new Volume( options )

  /** @type {BlockDevice} */
  this.device = null
  /** @type {Ext4.Journal} */
  this.journal = null
  /** @type {Ext4.FileSystemAPI} */
  this.fs = null

}

/**
 * Multiple Mount Protection (MMP) magic number
 * @constant
 * @type {Number}
 */
Volume.MMP = 0x004D4D50

/**
 * Volume prototype
 * @type {Object}
 * @ignore
 */
Volume.prototype = {

  constructor: Volume,

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
    this.journal = new Ext4.Journal()
    this.fs = new Ext4.FileSystemAPI( this )

    /** @todo Load Superblock */
    /** @todo Load special inodes */
    /** @todo Open Journal */

    callback.call( this, null, this )

  },

}

// Exports
module.exports = Volume
