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

/**
 * Compatible feature set flags.
 * Kernel can still read/write this fs even if it doesn't understand a flag;
 * fsck should not do that.
 * @enum {Number}
 */
Ext4.COMPAT = {
  /** @type {Number} Directory preallocation */
  DIR_PREALLOC: 0x001,
  /** @type {Number} "imagic inodes" (?) */
  IMAGIC_INODES: 0x002,
  /** @type {Number} Has a journal */
  HAS_JOURNAL: 0x004,
  /** @type {Number} Supports extended attributes */
  EXT_ATTR: 0x008,
  /** @type {Number} Has reserved GDT blocks for filesystem expansion */
  RESIZE_INODE: 0x010,
  /** @type {Number} Has directory indices */
  DIR_INDEX: 0x020,
  /** @type {Number} "Lazy BG". Not in Linux kernel, seems to have been for uninitialized block groups? */
  LAZY_BG: 0x040,
  /** @type {Number} Exclude inode (unused) */
  EXCLUDE_INODE: 0x080,
  /** @type {Number} Exclude bitmap */
  EXCLUDE_BITMAP: 0x100,
  /**
   * Sparse Super Block, v2.
   * If this flag is set, the SB field `s_backup_bgs` points to
   * the two block groups that contain backup superblocks.
   * @type {Number}
   */
  SPARSE_SUPER2: 0x200,
}

/**
 * Incompatible feature set.
 * If the kernel or fsck doesn't understand one of these bits, it should stop.
 * @type {Object}
 */
Ext4.INCOMPAT = {
  /** @type {Number} Compression */
  COMPRESSION: 0x00000001,
  /** @type {Number} Directory entries record the file type. See Ext4 DIR_ENTRY_2. */
  FILETYPE: 0x00000002,
  /** @type {Number} Filesystem needs recovery */
  RECOVER: 0x00000004,
  /** @type {Number} Filesystem has a separate journal device */
  JOURNAL_DEV: 0x00000008,
  /** @type {Number} Meta block groups. See the earlier discussion of this feature */
  META_BG: 0x00000010,
  /** @type {Number} Files in this filesystem use extents */
  EXTENTS: 0x00000040,
  /** @type {Number} Enable a filesystem size of 2^64 blocks */
  FS64BIT: 0x00000080,
  /** @type {Number} Multiple mount protection. Not implemented */
  MMP: 0x00000100,
  /** @type {Number} Flexible block groups. See the earlier discussion of this feature */
  FLEX_BG: 0x00000200,
  /** @type {Number} Inodes can be used for large extended attributes */
  EA_INODE: 0x00000400,
  /** @type {Number} Data in directory entry */
  DIRDATA: 0x00001000,
  /**
   * Metadata checksum seed is stored in the superblock.
   * This feature enables the administrator to change the UUID
   * of a `metadata_csum` filesystem while the filesystem is mounted;
   * without it, the checksum definition requires all metadata blocks to be rewritten.
   * @type {Number}
   */
  CSUM_SEED: 0x00002000,
  /** @type {Number} Large directory >2GB or 3-level htree */
  LARGEDIR: 0x00004000,
  /** @type {Number} Data in inode */
  INLINE_DATA: 0x00008000,
  /** @type {Number} Encrypted inodes are present on the filesystem */
  ENCRYPT: 0x00010000,
}

/**
 * Readonly-compatible feature set.
 * If the kernel doesn't understand one of these bits, it can still mount read-only.
 * @enum {Number}
 */
Ext4.RO_COMPAT = {
  /** Sparse superblocks */
  SPARSE_SUPER: 0x00000001,
  /** This filesystem has been used to store a file greater than 2GiB */
  LARGE_FILE: 0x00000002,
  /** Unused (?) */
  BTREE_DIR: 0x00000004,
  /** Contains files whose sizes are represented in units of logical blocks, not 512-byte sectors */
  HUGE_FILE: 0x00000008,
  /** Group descriptors have checksums */
  GDT_CSUM: 0x00000010,
  /** Old ext3 32,000 subdirectory limit no longer applies */
  DIR_NLINK: 0x00000020,
  /** Large inodes exist on this filesystem */
  EXTRA_ISIZE: 0x00000040,
  /** Filesystem has a snapshot */
  HAS_SNAPSHOT: 0x00000080,
  /** Quota */
  QUOTA: 0x00000100,
  /** Supports "bigalloc"; file extents are tracked in units of clusters (of blocks) instead of blocks */
  BIGALLOC: 0x00000200,
  /** Metadata checksumming. Implies RO_COMPAT.GDT_CSUM, though GDT_CSUM must not be set */
  METADATA_CSUM: 0x00000400,
  /** Filesystem supports replicas. This feature is neither in the kernel nor e2fsprogs. */
  REPLICA: 0x00000800,
  /** Read-only filesystem image */
  READONLY: 0x00001000,
  /** Project quotas tracking */
  PROJECT: 0x00002000,
}

Ext4.SuperBlock = require( './superblock' )

Ext4.Journal = require( './journal' )
Ext4.Volume = require( './volume' )
Ext4.FileSystemAPI = require( './filesystem' )
