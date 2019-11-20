---UPDATED 2/21/2007
Added light and camera, removed invisible sphere from scene
---

This model is an Seymour's airplane.  It has a single texture and a joint animation that makes the propeller spin.

There are now 4 versions of the airplane:
seymourplane.dae
seymourplane_triangulate.dae
seymourplane_bezier.dae
seymourplane_bezier_triangulate.dae

The first two versions use linear animations, the second two use bezier animations.  The animation curves are all identical straight lines, only the interpolation methods change.  There are triangulated and polylist versions of both.

All 4 models should look and animate exactly the same on all applications.

The propeller is animated to go from 0 degrees at time zero to 360 degrees at one second.  This is slower than the animation in previous versions to make it easier to see if the animation is running smoothly.  In a tool that uses frame count you need to set things up so it loops exactly at the one second point if you want to see smooth motion.  For example if your app goes at 24 fps, you will probably see the keys at the beginning of frame 0 and frame 24, to see a smooth animation you would play frames 0-23 in a loop.

Be sure to try both the linear and bezier versions, some apps are working fine on one but not on the other.

The model has been stripped of all <extra> tags and should be COLLADA 1.4.1 compliant.

For additional information post messages on www.collada.org or mail collada@collada.org

These models are Copyright 2006 Sony Computer Entertainment Inc. and are distributed under the terms of the SCEA Shared Source License, available at http://research.scea.com/scea_shared_source_license.html