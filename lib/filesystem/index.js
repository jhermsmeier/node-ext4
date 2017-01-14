var Ext4 = require( '../ext4' )

/**
 * Ext4 File System API
 * @constructor
 * @memberOf Ext4
 * @param {Ext4.Volume} volume
 * @return {FileSystemAPI}
 */
function FileSystemAPI( volume ) {

  if( !(this instanceof FileSystemAPI) )
    return new FileSystemAPI( volume )

  if( !(volume instanceof Ext4.Volume) )
    throw new Error( 'Missing argument: Ext4.Volume' )

  this.volume = volume

}

FileSystemAPI.syncNotAvailable = function() {
  throw new Error( 'Synchronous methods not available' )
}

/**
 * FileSystemAPI prototype
 * @type {Object}
 * @ignore
 */
FileSystemAPI.prototype = {

  constructor: FileSystemAPI,

}

// Exports
module.exports = FileSystemAPI
