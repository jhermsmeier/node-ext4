var Ext4 = require( '../ext4' )

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

  parse: function( buffer ) {

    this.inodeCount = buffer.readUInt32LE( 0x000 )
    this.blockCount = buffer.readUInt32LE( 0x004 )
    this.superUserBlocks = buffer.readUInt32LE( 0x008 )
    this.freeBlockCount = buffer.readUInt32LE( 0x00C )
    this.freeInodeCount = buffer.readUInt32LE( 0x010 )
    this.firstDataBlock = buffer.readUInt32LE( 0x014 )
    this.blockSize = Math.pow( 2, buffer.readUInt32LE( 0x018 ) )
    this.clusterSize = Math.pow( 2, buffer.readUInt32LE( 0x01C ) )
    this.blocksPerGroup = buffer.readUInt32LE( 0x020 )
    this.clustersPerGroup = buffer.readUInt32LE( 0x024 )
    this.inodesPerGroup = buffer.readUInt32LE( 0x028 )
    this.mountTime = buffer.readUInt32LE( 0x02C )
    this.writeTime = buffer.readUInt32LE( 0x030 )

    this.mountCount = buffer.readUInt16LE( 0x034 )
    this.maxMountCount = buffer.readUInt16LE( 0x036 )
    this.magic = buffer.readUInt16LE( 0x038 )
    this.state = buffer.readUInt16LE( 0x03A )
    this.errors = buffer.readUInt16LE( 0x03C )
    this.minorRevLevel = buffer.readUInt16LE( 0x03E )

    this.lastCheck = buffer.readUInt32LE( 0x040 )
    this.checkInterval = buffer.readUInt32LE( 0x044 )
    this.creatorOS = buffer.readUInt32LE( 0x048 )
    this.revLevel = buffer.readUInt32LE( 0x04C )

    this.reservedUID = buffer.readUInt16LE( 0x050 )
    this.reservedGID = buffer.readUInt16LE( 0x052 )

    // The following fields are for EXT4_DYNAMIC_REV superblocks only

    this.firstIno = buffer.readUInt32LE( 0x054 )
    this.inodeSize = buffer.readUInt16LE( 0x058 )
    this.blockGroupNumber = buffer.readUInt16LE( 0x05A )
    this.featureCompat = buffer.readUInt32LE( 0x05C )
    this.featureIncompat = buffer.readUInt32LE( 0x060 )
    this.featureReadonlyCompat = buffer.readUInt32LE( 0x064 )
    this.uuid = new Buffer( buffer.slice( 0x068, 0x078 ) )
    this.name = buffer.toString( 'utf8', 0x078, 0x088 ).replace( /\u0000/g, '' )
    this.lastMounted = buffer.toString( 'utf8', 0x088, 0x0C8 ).replace( /\u0000/g, '' )
    this.algorithmUsageBitmap = buffer.readUInt32LE( 0x0C8 )

    // Performance hints.
    // Directory preallocation should only happen if
    // the EXT4_FEATURE_COMPAT_DIR_PREALLOC flag is on.

    this.preallocBlocks = buffer[ 0x0CC ]
    this.preallocDirBlocks = buffer[ 0x0CD ]
    this.reservedGDTBlocks = buffer.readUInt16LE( 0x0CE )

    // Journaling support valid if EXT4_FEATURE_COMPAT_HAS_JOURNAL set.

    this.uuid = new Buffer( buffer.slice( 0x0D0, 0x0E0 ) )
    this.journalInode = buffer.readUInt32LE( 0x0E0 )
    this.journalDev = buffer.readUInt32LE( 0x0E4 )
    this.lastOrphan = buffer.readUInt32LE( 0x0E8 )
    this.hashSeed = [
      buffer.readUInt32LE( 0x0EC ),
      buffer.readUInt32LE( 0x0F0 ),
      buffer.readUInt32LE( 0x0F4 ),
      buffer.readUInt32LE( 0x0F8 ),
    ]

    this.hashVersion = buffer[ 0x0FC ]
    this.journalBackupType = buffer[ 0x0FD ]
    this.descriptorSize = buffer.readUInt16LE( 0x0FE )
    this.defaultMountOptions = buffer.readUInt32LE( 0x100 )
    this.firstMetaBlockGroup = buffer.readUInt32LE( 0x104 )
    this.mkfsTime = buffer.readUInt32LE( 0x108 )
    this.journalBlocks = [] // buffer.slice( 0x10C, 0x150 )

    for( var i = 0x10C; i < 0x150; i += 0x04 ) {
      this.journalBlocks.push( buffer.readUInt32LE(i) )
    }

    // 64bit support valid if EXT4_FEATURE_COMPAT_64BIT

    this.blocksCountHi = buffer.readUInt32LE( 0x150 )
    this.rBlocksCountHi = buffer.readUInt32LE( 0x154 )
    this.freeBlocksCountHi = buffer.readUInt32LE( 0x158 )
    this.minExtraIsize = buffer.readUInt16LE( 0x15C )
    this.wantExtraIsize = buffer.readUInt16LE( 0x15E )
    this.flags = buffer.readUInt32LE( 0x160 )
    this.raidStride = buffer.readUInt16LE( 0x164 )
    this.mmpInterval = buffer.readUInt16LE( 0x166 )
    this.mmpBlock = buffer.readUIntLE( 0x168, 8 )
    this.raidStripeWidth = buffer.readUInt32LE( 0x170 )
    this.logGroupsPerFlex = buffer.readUInt8( 0x174 )
    this.checksumType = buffer.readUInt8( 0x175 )
    this.reservedPad = buffer.readUInt16LE( 0x176 )
    this.kbytesWritten = buffer.readUIntLE( 0x178, 8 )
    this.snapshotInum = buffer.readUInt32LE( 0x180 )
    this.snapshotID = buffer.readUInt32LE( 0x184 )
    this.snapshotRBlocksCount = buffer.readUIntLE( 0x188, 8 )
    this.snapshotList = buffer.readUInt32LE( 0x190 )
    this.errorCount = buffer.readUInt32LE( 0x194 )
    this.firstErrorTime = buffer.readUInt32LE( 0x198 )
    this.firstErrorIno = buffer.readUInt32LE( 0x19C )
    this.firstErrorBlock = buffer.readUIntLE( 0x1A0, 8 )
    this.firstErrorFunc = buffer.toString( 'utf8', 0x1A8, 0x1C8 ).replace( /\u0000/g, '' )
    this.firstErrorLine = buffer.readUInt32LE( 0x1C8 )
    this.lastErrorTime = buffer.readUInt32LE( 0x1CC )
    this.lastErrorIno = buffer.readUInt32LE( 0x1D0 )
    this.lastErrorLine = buffer.readUInt32LE( 0x1D4 )
    this.lastErrorBlock = buffer.readUIntLE( 0x1D8, 8 )
    this.lastErrorFunc = buffer.toString( 'utf8', 0x1E0, 0x200 ).replace( /\u0000/g, '' )
    this.mountOpts = buffer.toString( 'ascii', 0x200, 0x240 ).replace( /\u0000/g, '' )
    this.usrQuotaInum = buffer.readUInt32LE( 0x240 )
    this.grpQuotaInum = buffer.readUInt32LE( 0x244 )
    this.overheadBlocks = buffer.readUInt32LE( 0x248 )
    this.backupBgs = [ buffer.readUInt32LE( 0x24C ), buffer.readUInt32LE( 0x250 ) ]
    this.encryptAlgos = [ buffer[ 0x254 ], buffer[ 0x255 ], buffer[ 0x256 ], buffer[ 0x257 ] ]
    this.encryptSalt = new Buffer( buffer.slice( 0x258, 0x268 ) )
    this.lpfIno = buffer.readUInt32LE( 0x268 )
    this.prjQuotaInum = buffer.readUInt32LE( 0x26C )
    this.checksumSeed = buffer.readUInt32LE( 0x270 )
    // 0x274 reserved[98]: Padding to the end of the block
    this.checksum = buffer.readUInt32LE( 0x3FC )

    return this

  },

}

// Exports
module.exports = SuperBlock
