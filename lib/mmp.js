var uint64 = require( './uint64' )

/**
 * Multiple Mount Protection (MMP)
 * @constructor
 * @returns {MMP}
 */
function MMP() {

  if( !(this instanceof MMP) ) {
    return new MMP()
  }

  /** @type {Number} Magic number for MMP */
  this.magic = MMP.MAGIC
  /** @type {Number} Sequence number; updated periodically */
  this.seq = 0
  /** @type {Number} Time last updated */
  this.time = 0
  /** @type {String} Node which last updated MMP block */
  this.nodeName = ''
  /** @type {String} Bdev which last updated MMP block */
  this.bdevName = ''
  /** @type {Number} Changed MMP interval */
  this.checkInterval = 0
  /** @type {Number} Padding 1 */
  this.pad1 = 0
  /** @type {Buffer} Padding 2 */
  this.pad2 = Buffer.alloc( 226 * 4 )
  /** @type {Number} crc32c( uuid + mmp_block ) */
  this.checksum = 0

}

/**
 * Size of the `mmp_struct`
 * @type {Number}
 * @constant
 */
MMP.SIZE = 1024

/**
 * Magic number for MMP (ASCII `\0MMP`)
 * @type {Number}
 */
MMP.MAGIC = 0x004D4D50

/**
 * Sequence value for clean unmount
 * @type {Number}
 */
MMP.SEQ_CLEAN = 0xFF4D4D50

/**
 * Sequence value when being fs checked
 * @type {Number}
 */
MMP.SEQ_FSCK = 0xE24D4D50

/**
 * Maximum valid sequence value
 * @type {Number}
 */
MMP.SEQ_MAX = 0xE24D4D4F

/**
 * Default interval for MMP update (in milliseconds)
 * @type {Number}
 */
MMP.UPDATE_INTERVAL = 5 * 1000

/**
 * Maximum interval for MMP update (in milliseconds)
 * @type {Number}
 */
MMP.MAX_UPDATE_INTERVAL = 300 * 1000

/**
 * Minimum interval for MMP update (in milliseconds)
 * @type {Number}
 */
MMP.MIN_CHECK_INTERVAL = 5 * 1000

/**
 * MMP prototype
 * @ignore
 */
MMP.prototype = {

  constructor: MMP,

  /**
   * Parse the `mmp_struct` from a buffer
   * @param {Buffer} buffer
   * @param {Number} [offset=0]
   * @returns {MMP}
   */
  parse( buffer, offset ) {

    offset = offset || 0

    this.magic = buffer.readUInt32LE( offset + 0 )
    this.seq = buffer.readUInt32LE( offset + 4 )
    this.time = uint64.readLE( buffer, offset + 8 )
    this.nodename = buffer.toString( 'ascii', offset + 16, offset + 80 )
    this.bdevname = buffer.toString( 'ascii', offset + 80, offset + 112 )
    this.check_interval = buffer.readUInt16LE( offset + 112 )
    this.pad1 = buffer.readUInt16LE( offset + 114 )
    buffer.copy( this.pad2, 0, offset + 116, offset + 1020 )
    this.checksum = buffer.readUInt32LE( offset + 1020 )

  },

  /**
   * Write the `mmp_struct` to a buffer
   * @param {Buffer} buffer
   * @param {Number} [offset=0]
   * @returns {Buffer}
   */
  write( buffer, offset ) {

    offset = offset || 0
    buffer = buffer || Buffer.alloc( MMP.SIZE + offset )

    buffer.writeUInt32LE( this.magic, offset + 0 )
    buffer.writeUInt32LE( this.seq, offset + 4 )
    uint64.writeLE( buffer, this.time, offset + 8 )
    buffer.write( this.nodename, offset + 16, 64, 'ascii' )
    buffer.write( this.bdevname, offset + 80, 32, 'ascii' )
    buffer.writeUInt16LE( this.check_interval, offset + 112 )
    buffer.writeUInt16LE( this.pad1, offset + 114 )
    this.pad2.copy( buffer, offset + 116, 116, 1020 )
    buffer.writeUInt32LE( this.checksum, offset + 1020 )

    return buffer

  },

}

// Exports
module.exports = MMP
