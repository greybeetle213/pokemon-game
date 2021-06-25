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