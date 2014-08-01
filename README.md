zombies
=======
This is for the Epicodus assesment for JavaScript OO.

This is a simple simulator showing the outbreak of a zombie infection.
Humans are added to the playfield and randomly wonder around. The player infects one of the humans, turning them into a Zombie.

Any human that comes directly into contact with a zombie, proably becomes infected and turns into a zombie.
Any human that sees a zombie two spaces to the north, south, east or west of them becomes scared and starts to run around at quicker pace.
Any human/zombie can occupy the same space.

Bug
===
You will see the a human or zombie appear to teleport to another location from time to time. This appears to be due a method being run at the same time as the setInterval. The human/zombie hasn't teleported, but appears to be in a new location.
=======

Author
======
Ruben Rhodes

License
=======
MIT
