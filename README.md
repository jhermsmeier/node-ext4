# Ext4
[![npm](https://img.shields.io/npm/v/ext4.svg?style=flat-square)](https://npmjs.com/package/ext4)
[![npm license](https://img.shields.io/npm/l/ext4.svg?style=flat-square)](https://npmjs.com/package/ext4)
[![npm downloads](https://img.shields.io/npm/dm/ext4.svg?style=flat-square)](https://npmjs.com/package/ext4)
[![build status](https://img.shields.io/travis/jhermsmeier/node-ext4.svg?style=flat-square)](https://travis-ci.org/jhermsmeier/node-ext4)

Ext4 filesystem driver

## Install via [npm](https://npmjs.com)

```sh
$ npm install --save ext4
```

## Usage

```js
var Ext4 = require( 'ext4' )
```

---

**WARNING:** Operation of this file system implementation is unsafe for storage devices
with a capacity larger than 2^53 - 1 bytes (8192 Terabytes), due to that being the
largest integer which can be safely represented in JavaScript.

---

## References

- [ext4.wiki.kernel.org](https://ext4.wiki.kernel.org/index.php/Ext4_Disk_Layout)
