var Ext4 = require( './ext4' )
var uint64 = require( './uint64' )

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
 * @constant
 */
SuperBlock.MAGIC = 0xEF53

/**
 * SuperBlock size in bytes
 * @type {Number}
 * @constant
 */
SuperBlock.SIZE = 1024

/**
 * SuperBlock prototype
 * @type {Object}
 * @ignore
 */
SuperBlock.prototype = {

  constructor: SuperBlock,

  parse( buffer, offset ) {

    offset = offset || 0

    this.inodeCount = buffer.readUInt32LE( offset + 0x000 )
    this.blockCount = buffer.readUInt32LE( offset + 0x004 )
    this.superUserBlocks = buffer.readUInt32LE( offset + 0x008 )
    this.freeBlockCount = buffer.readUInt32LE( offset + 0x00C )
    this.freeInodeCount = buffer.readUInt32LE( offset + 0x010 )
    this.firstDataBlock = buffer.readUInt32LE( offset + 0x014 )
    this.blockSize = Ext4.MIN_BLOCK_SIZE << buffer.readUInt32LE( offset + 0x018 )
    this.clusterSize = Ext4.MIN_BLOCK_SIZE << buffer.readUInt32LE( offset + 0x01C )
    this.blocksPerGroup = buffer.readUInt32LE( offset + 0x020 )
    this.clustersPerGroup = buffer.readUInt32LE( offset + 0x024 )
    this.inodesPerGroup = buffer.readUInt32LE( offset + 0x028 )
    this.mountTime = buffer.readUInt32LE( offset + 0x02C )
    this.writeTime = buffer.readUInt32LE( offset + 0x030 )

    this.mountCount = buffer.readUInt16LE( offset + 0x034 )
    this.maxMountCount = buffer.readUInt16LE( offset + 0x036 )
    this.magic = buffer.readUInt16LE( offset + 0x038 )
    this.state = buffer.readUInt16LE( offset + 0x03A )
    this.errors = buffer.readUInt16LE( offset + 0x03C )
    this.minorRevLevel = buffer.readUInt16LE( offset + 0x03E )

    this.lastCheck = buffer.readUInt32LE( offset + 0x040 )
    this.checkInterval = buffer.readUInt32LE( offset + 0x044 )
    this.creatorOS = buffer.readUInt32LE( offset + 0x048 )
    this.revLevel = buffer.readUInt32LE( offset + 0x04C )

    this.reservedUID = buffer.readUInt16LE( offset + 0x050 )
    this.reservedGID = buffer.readUInt16LE( offset + 0x052 )

    // The following fields are for EXT4_DYNAMIC_REV superblocks only

    this.firstIno = buffer.readUInt32LE( offset + 0x054 )
    this.inodeSize = buffer.readUInt16LE( offset + 0x058 )
    this.blockGroupNumber = buffer.readUInt16LE( offset + 0x05A )
    this.featureCompat = buffer.readUInt32LE( offset + 0x05C )
    this.featureIncompat = buffer.readUInt32LE( offset + 0x060 )
    this.featureReadonlyCompat = buffer.readUInt32LE( offset + 0x064 )
    this.uuid = Buffer.from( buffer.slice( offset + 0x068, offset + 0x078 ) )
    this.name = buffer.toString( 'utf8', offset + 0x078, offset + 0x088 ).replace( /\u0000/g, '' )
    this.lastMounted = buffer.toString( 'utf8', offset + 0x088, offset + 0x0C8 ).replace( /\u0000/g, '' )
    this.algorithmUsageBitmap = buffer.readUInt32LE( offset + 0x0C8 )

    // Performance hints.
    // Directory preallocation should only happen if
    // the EXT4_FEATURE_COMPAT_DIR_PREALLOC flag is on.

    this.preallocBlocks = buffer[ offset + 0x0CC ]
    this.preallocDirBlocks = buffer[ offset + 0x0CD ]
    this.reservedGDTBlocks = buffer.readUInt16LE( offset + 0x0CE )

    // Journaling support valid if EXT4_FEATURE_COMPAT_HAS_JOURNAL set.

    this.uuid = Buffer.from( buffer.slice( offset + 0x0D0, offset + 0x0E0 ) )
    this.journalInode = buffer.readUInt32LE( offset + 0x0E0 )
    this.journalDev = buffer.readUInt32LE( offset + 0x0E4 )
    this.lastOrphan = buffer.readUInt32LE( offset + 0x0E8 )
    this.hashSeed = [
      buffer.readUInt32LE( offset + 0x0EC ),
      buffer.readUInt32LE( offset + 0x0F0 ),
      buffer.readUInt32LE( offset + 0x0F4 ),
      buffer.readUInt32LE( offset + 0x0F8 ),
    ]

    this.hashVersion = buffer[ offset + 0x0FC ]
    this.journalBackupType = buffer[ offset + 0x0FD ]
    this.descriptorSize = buffer.readUInt16LE( offset + 0x0FE )
    this.defaultMountOptions = buffer.readUInt32LE( offset + 0x100 )
    this.firstMetaBlockGroup = buffer.readUInt32LE( offset + 0x104 )
    this.mkfsTime = buffer.readUInt32LE( offset + 0x108 )
    this.journalBlocks = [] // buffer.slice( offset + 0x10C, offset + 0x150 )

    for( var i = (offset + 0x10C); i < (offset + 0x150); i += (offset + 0x04) ) {
      this.journalBlocks.push( buffer.readUInt32LE(i) )
    }

    // 64bit support valid if EXT4_FEATURE_COMPAT_64BIT

    this.blocksCountHi = buffer.readUInt32LE( offset + 0x150 )
    this.rBlocksCountHi = buffer.readUInt32LE( offset + 0x154 )
    this.freeBlocksCountHi = buffer.readUInt32LE( offset + 0x158 )
    this.minExtraIsize = buffer.readUInt16LE( offset + 0x15C )
    this.wantExtraIsize = buffer.readUInt16LE( offset + 0x15E )
    this.flags = buffer.readUInt32LE( offset + 0x160 )
    this.raidStride = buffer.readUInt16LE( offset + 0x164 )
    this.mmpInterval = buffer.readUInt16LE( offset + 0x166 )
    this.mmpBlock = uint64.readLE( buffer, offset + 0x168 )
    this.raidStripeWidth = buffer.readUInt32LE( offset + 0x170 )
    this.logGroupsPerFlex = buffer.readUInt8( offset + 0x174 )
    this.checksumType = buffer.readUInt8( offset + 0x175 )
    this.reservedPad = buffer.readUInt16LE( offset + 0x176 )
    this.kbytesWritten = uint64.readLE( buffer, offset + 0x178 )
    this.snapshotInum = buffer.readUInt32LE( offset + 0x180 )
    this.snapshotID = buffer.readUInt32LE( offset + 0x184 )
    this.snapshotRBlocksCount = uint64.readLE( buffer, offset + 0x188 )
    this.snapshotList = buffer.readUInt32LE( offset + 0x190 )
    this.errorCount = buffer.readUInt32LE( offset + 0x194 )
    this.firstErrorTime = buffer.readUInt32LE( offset + 0x198 )
    this.firstErrorIno = buffer.readUInt32LE( offset + 0x19C )
    this.firstErrorBlock = uint64.readLE( buffer, offset + 0x1A0 )
    this.firstErrorFunc = buffer.toString( 'utf8', offset + 0x1A8, offset + 0x1C8 ).replace( /\u0000/g, '' )
    this.firstErrorLine = buffer.readUInt32LE( offset + 0x1C8 )
    this.lastErrorTime = buffer.readUInt32LE( offset + 0x1CC )
    this.lastErrorIno = buffer.readUInt32LE( offset + 0x1D0 )
    this.lastErrorLine = buffer.readUInt32LE( offset + 0x1D4 )
    this.lastErrorBlock = uint64.readLE( buffer, offset + 0x1D8 )
    this.lastErrorFunc = buffer.toString( 'utf8', offset + 0x1E0, offset + 0x200 ).replace( /\u0000/g, '' )
    this.mountOpts = buffer.toString( 'ascii', offset + 0x200, offset + 0x240 ).replace( /\u0000/g, '' )
    this.usrQuotaInum = buffer.readUInt32LE( offset + 0x240 )
    this.grpQuotaInum = buffer.readUInt32LE( offset + 0x244 )
    this.overheadBlocks = buffer.readUInt32LE( offset + 0x248 )
    this.backupBgs = [ buffer.readUInt32LE( offset + 0x24C ), buffer.readUInt32LE( offset + 0x250 ) ]
    this.encryptAlgos = [ buffer[ offset + 0x254 ], buffer[ offset + 0x255 ], buffer[ offset + 0x256 ], buffer[ offset + 0x257 ] ]
    this.encryptSalt = Buffer.from( buffer.slice( offset + 0x258, offset + 0x268 ) )
    this.lpfIno = buffer.readUInt32LE( offset + 0x268 )
    this.prjQuotaInum = buffer.readUInt32LE( offset + 0x26C )
    this.checksumSeed = buffer.readUInt32LE( offset + 0x270 )
    // offset + 0x274 reserved[98]: Padding to the end of the block
    this.checksum = buffer.readUInt32LE( offset + 0x3FC )

    return this

  },

}

// Exports
module.exports = SuperBlock
