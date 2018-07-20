var Ext4 = module.exports

/**
 * Ext4 file system state
 * @enum {Number}
 */
Ext4.STATE = {
  /** Cleanly umounted */
  CLEAN: 0x0001,
  /** Errors detected */
  ERROR: 0x0002,
  /** Orphans being recovered */
  ORPHAN: 0x0004,
}

/**
 * Behaviour when detecting errors
 * @enum {Number}
 */
Ext4.ERROR_ACTION = {
  /** No action; Continue */
  CONTINUE: 0x0001,
  /** Remount in readonly mode */
  READONLY: 0x0002,
  /** Panic (???) */
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
  /** Original format */
  ORIGINAL: 0x00000000,
  /** Format v2 with dynamic inode sizes */
  DYNAMIC: 0x00000001,
}

/**
 * Compatible feature set flags.
 * Kernel can still read/write this fs even if it doesn't understand a flag;
 * fsck should not do that.
 * @enum {Number}
 */
Ext4.COMPAT = {
  /** Directory preallocation */
  DIR_PREALLOC: 0x001,
  /** "imagic inodes" (?) */
  IMAGIC_INODES: 0x002,
  /** Has a journal */
  HAS_JOURNAL: 0x004,
  /** Supports extended attributes */
  EXT_ATTR: 0x008,
  /** Has reserved GDT blocks for filesystem expansion */
  RESIZE_INODE: 0x010,
  /** Has directory indices */
  DIR_INDEX: 0x020,
  /** "Lazy BG". Not in Linux kernel, seems to have been for uninitialized block groups? */
  LAZY_BG: 0x040,
  /** Exclude inode (unused) */
  EXCLUDE_INODE: 0x080,
  /** Exclude bitmap */
  EXCLUDE_BITMAP: 0x100,
  /**
   * Sparse Super Block, v2.
   * If this flag is set, the SB field `s_backup_bgs` points to
   * the two block groups that contain backup superblocks.
   */
  SPARSE_SUPER2: 0x200,
}

/**
 * Incompatible feature set.
 * If the kernel or fsck doesn't understand one of these bits, it should stop.
 * @type {Object}
 */
Ext4.INCOMPAT = {
  /** Compression */
  COMPRESSION: 0x00000001,
  /** Directory entries record the file type. See Ext4 DIR_ENTRY_2. */
  FILETYPE: 0x00000002,
  /** Filesystem needs recovery */
  RECOVER: 0x00000004,
  /** Filesystem has a separate journal device */
  JOURNAL_DEV: 0x00000008,
  /** Meta block groups. See the earlier discussion of this feature */
  META_BG: 0x00000010,
  /** Files in this filesystem use extents */
  EXTENTS: 0x00000040,
  /** Enable a filesystem size of 2^64 blocks */
  FS64BIT: 0x00000080,
  /** Multiple mount protection. Not implemented */
  MMP: 0x00000100,
  /** Flexible block groups. See the earlier discussion of this feature */
  FLEX_BG: 0x00000200,
  /** Inodes can be used for large extended attributes */
  EA_INODE: 0x00000400,
  /** Data in directory entry */
  DIRDATA: 0x00001000,
  /**
   * Metadata checksum seed is stored in the superblock.
   * This feature enables the administrator to change the UUID
   * of a `metadata_csum` filesystem while the filesystem is mounted;
   * without it, the checksum definition requires all metadata blocks to be rewritten.
   */
  CSUM_SEED: 0x00002000,
  /** Large directory >2GB or 3-level htree */
  LARGEDIR: 0x00004000,
  /** Data in inode */
  INLINE_DATA: 0x00008000,
  /** Encrypted inodes are present on the filesystem */
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
  PROJECT_QUOTA: 0x00002000,
}

/**
 * Special inode numbers
 * @enum {Number}
 */
Ext4.INODE = {
  /** @type {Number} Doesn't exist; there is no inode zero */
  VOID: 0,
  /** @type {Number} List of defective blocks */
  DEFECTIVE_BLOCKS: 1,
  /** @type {Number} Root directory */
  ROOT_DIR: 2,
  /** @type {Number} User quota */
  USER_QUOTA: 3,
  /** @type {Number} Group quota */
  GROUP_QUOTA: 4,
  /** @type {Number} Boot loader */
  BOOTLOADER: 5,
  /** @type {Number} Undelete directory */
  UNDELETE_DIR: 6,
  /** @type {Number} Reserved group descriptors inode ("resize inode") */
  RESERVED_GD: 7,
  /** @type {Number} Journal inode */
  JOURNAL: 8,
  /** @type {Number} The "exclude" inode, for snapshots(?) */
  EXCLUDE: 9,
  /** @type {Number} Replica inode, used for some non-upstream feature(?) */
  REPLICA: 10,
  /** @type {Number} Traditional first non-reserved inode. Usually this is the lost+found directory. See s_first_ino in the superblock. */
  LOST_FOUND: 11,
}

/**
 * Error number table
 * @enum {Number}
 */
Ext4.ERRNO = require( './errno' )

/**
 * Multiple Mount Protection (MMP)
 * @type {Function}
 */
Ext4.MMP = require( './mmp' )

Ext4.Journal = require( 'jbd2' )
Ext4.SuperBlock = require( './superblock' )
Ext4.Volume = require( './volume' )
Ext4.FileSystemAPI = require( './filesystem' )
