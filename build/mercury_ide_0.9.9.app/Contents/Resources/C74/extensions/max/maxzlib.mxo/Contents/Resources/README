OSXZip
======

Functions to compress and decompress ZIP files that preserve Mac OS X resource forks / extended attributes like Apple's Archive Utility.


How to use with Xcode
----------------------

 * Add everything to your Xcode project.
 * Add "-lz" to Other Linker Flags.
 
Include (or import) "ziputil.h" and use the following functions:
 
    int compress_path(const char *source, const char *zipfile, int level);
    int decompress_path(const char *zipfile, const char *destination);


SECURITY NOTE
-------------

Using decompress\_path with untrusted archives is not recommended, as it doesn't sanitize paths (e.g. malicious archive can be crafted to fill user home folder with junk, or put something "nice" to ~/bin, by using relative paths ../../).

Somebody should fork this project and fix this (I don't use decompress\_path, and too lazy to add tests). Please. Thanks!


License
-------

Distributed under zlib license.

Copyright (C) 2008 Dmitry Chestnykh, Coding Robots

Based on work by:

Mark Adler (zlib), Copyright (C) 1998-2005 Gilles Vollant, Copyright (c) 1990-2000 Info-ZIP,
 
This software is provided 'as-is', without any express or implied
warranty.  In no event will the authors be held liable for any damages
arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

 1. The origin of this software must not be misrepresented; you must not
    claim that you wrote the original software. If you use this software
    in a product, an acknowledgment in the product documentation would be
    appreciated but is not required.
 2. Altered source versions must be plainly marked as such, and must not be
    misrepresented as being the original software.
 3. This notice may not be removed or altered from any source distribution.


