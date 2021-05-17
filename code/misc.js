function print(writing,x,y,scale=pixelsize){
    letterx = 0
    for(printcounter = 0; printcounter < writing.length; printcounter += 1){
            if (writing[printcounter] != " "){
            ctx.drawImage(text[alphabet.findIndex(function(letter){return letter == writing[printcounter]})], x+letterx,y,5*scale,7*scale)
            }
        letterx += 5*scale + 0.5*scale
    }
}
function Heal(pokemon){ 
    party[pokemon][8] = Math.round((2*pokedex[party[pokemon][0]][1][0]*Math.floor(party[pokemon][1]))/100+Math.floor(party[pokemon][1])+10)
}
function loadNPCS(){
    var npcsToLoad = map.npcs.length - 1
    var imagesToLoad = 4
    while(npcsToLoad >= 0){
        imagesToLoad = 4
        while(imagesToLoad >= 0){
            map.npcs[npcsToLoad][3][imagesToLoad] = new Image() // when savedata is loaded the images dont load properly so make them images
            map.npcs[npcsToLoad][3][imagesToLoad].onload = function() {console.log("loaded")}
            map.npcs[npcsToLoad][3][imagesToLoad].src =  npcs[map.npcs[npcsToLoad][0]][imagesToLoad]
            imagesToLoad -= 1
        }
        npcsToLoad -= 1
    }
}
function loadHouse0(){
    Object.assign(overworldPos, player) // where in the overworld the player was when they entered the room
    Object.assign(overworldMap, map)
    player.inOverworld = false
    map.colision = MapColision.house0 
    map.width = 128 
    map.height = 128 
    map.startingPos = [16 ,16 ]
    map.image = "terrain/house_0.png"
    player.yMovement = -16
    room1.src = "terrain/house_0.png"
    player.x = 3
    player.y = 6
    player.playerx = 64 
    player.playery = 128 
    player.xCameraMovement = "fixed"
    player.yCameraMovement = "fixed"
    player.camerax = 0
    player.cameray = 0
    room1.onload = function() {console.log("loaded")}
    room1.src = "terrain/house_0.png"
    map.npcs = [[0,96,64,[new Image(),new Image(),new Image(),new Image(),new Image()],5,3,["all boys leave","home someday","it said so on","tv"] ]]//0=id in npcs 1=x, 2=y, 3=image,4=collision x, collision y, text
    loadNPCS()
}
function loadRoom0(){
    Object.assign(map, overworldMap)
    Object.assign(player, overworldPos) // where in the overworld the player was when they entered the room
    player.inOverworld = true
    player.y += 1
    player.yMovement = 16
    player.Direction = 0
    loadNPCS()
    room1.src = map.image
}
function loadRute1(){
    map.colision = MapColision.rute1 
    map.width = 255 
    map.height = 96 
    map.startingPos = [64,16 ]
    player.x = 1
    player.y = 1
    currentMapPokemon = { levelRange: [10, 15], commonSpawns: [7], uncommonSpawns: [7], rareSpawns: [7], ultraRareSpawns: [0, 3] }
    player.playerx = 80 
    player.playery = 16 
    player.xCameraMovement = "free"
    player.yCameraMovement = "fixed"
    player.camerax = 0
    player.cameray = 0
    room1.onload = function() {console.log("loaded")}
    console.log("loadRute1")
    room1.src = "terrain/rute1.png"
    map.image = "terrain/rute1.png"
    map.npcs = []
    loadNPCS()
    player.yMovement = 16
}
function loadTown1(){
    map.colision = MapColision.town1 
    map.width = 576 
    map.height = 256 
    map.startingPos = [-448, -176] //[, -160]
    player.x = 33
    player.y = 14
    currentMapPokemon = { levelRange: [10, 15], commonSpawns: [7], uncommonSpawns: [7], rareSpawns: [7], ultraRareSpawns: [0, 3] }
    player.playerx = 80 
    player.playery = 64 
    player.xCameraMovement = "free"
    player.yCameraMovement = "free"
    player.camerax = 0
    player.cameray = 0
    room1.onload = function() {console.log("loaded")}
    console.log("loadTown1")
    room1.src = "terrain/Town1.png"
    map.image = "terrain/Town1.png"
    map.npcs = []
    loadNPCS()
    player.yMovement = -16
}
function returnFromTown1(){
    map.colision = MapColision.rute1 
    map.width = 255 
    map.height = 96 
    map.startingPos = [-128,16 ]
    player.x = 13
    player.y = 1
    currentMapPokemon = { levelRange: [10, 15], commonSpawns: [7], uncommonSpawns: [7], rareSpawns: [7], ultraRareSpawns: [0, 3] }
    player.playerx = 80 
    player.playery = 16 
    player.xCameraMovement = "free"
    player.yCameraMovement = "fixed"
    player.camerax = 0
    player.cameray = 0
    room1.onload = function() {console.log("loaded")}
    room1.src = "terrain/rute1.png"
    map.image = "terrain/rute1.png"
    map.npcs = []
    loadNPCS()
    player.yMovement = 16
}
function returnFromRute1(){
    map.colision = MapColision.room0 
    map.width = 208 
    map.height = 256 
    map.startingPos = [-16,-176 ]
    player.x = 6
    player.y = 14
    player.playerx = 80 
    player.playery = 64 
    player.xCameraMovement = "fixed"
    player.yCameraMovement = "free"
    player.camerax = 0
    player.cameray = 0
    currentMapPokemon = { levelRange: [4, 6], commonSpawns: [0, 3], uncommonSpawns: [0, 3], rareSpawns: [7], ultraRareSpawns: [0, 3] }
    room1.onload = function() {console.log("loaded")}
    console.log("returnFromRute1")
    room1.src = "terrain/Home.png"
    map.image = "terrain/Home.png"
    map.npcs = [[1,16,(112-160),[new Image(),new Image(),new Image(),new Image(),new Image()],2,8,["hi!","i like shorts!","they're comfy","and easy to", "wear!",""] ],[1,16,(144-160),[new Image(),new Image(),new Image(),new Image(),new Image()],2,10,["have you seen", "billy anywhere?", "he was playing","with a strange","balloon last i", "saw him."] ]]
    loadNPCS()
    player.yMovement = -16
}
function returnToCheckPoint(){
    Object.assign(map, lastCheckPoint[1])
    Object.assign(player, lastCheckPoint[2])
    returningToCheckPoint = false
    room1.src = lastCheckPoint[3]
    loadNPCS()
}
function getDamageMultiplier(attackingType, defendingTypes){ // run in battleEngine.js. calculates super effective and resistant moves
    var damageMultipier = 1
    for(i = 0; i != defendingTypes.length; i++){
        if(types[attackingType][defendingTypes[i]] == "2"){
            damageMultipier ++
        }
        if(types[attackingType][defendingTypes[i]] == "0.5"){
            damageMultipier /= 2
        }
        if(types[attackingType][defendingTypes[i]] == "0"){
            damageMultipier = 0
        }
    }
    return(damageMultipier)
}
function resizeCanvas(){ //called when $(window).resize() is triggered
    ctx = document.getElementById("canvas").getContext("2d")
    document.getElementById("canvas").height = window.innerHeight - 4 // size the canvas to be a 4-3 ratio
    document.getElementById("canvas").width = (window.innerHeight - 4) + window.innerHeight / 4 // size the canvas to be a 4-3 ratio
    ctx.webkitImageSmoothingEnabled = false // remove blurry pixels
    ctx.mozImageSsprite_moothingEnabled = false // remove blurry pixels
    ctx.imageSmoothingEnabled = false // remove blurry pixels
    ctx = document.getElementById("canvas").getContext("2d") // redefine ctx
    pixelsize = document.getElementById("canvas").width / 176 // define the size of  pixel all sizes are based around this
    canvas = document.getElementById("canvas")
}