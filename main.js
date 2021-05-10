function init() {
    document.getElementById("body").innerHTML += '<div id="popUpDiv" style="width: 50%;background-color: white; position: absolute; top: 30%; left: 25%; border: 1vh inset black; padding: 1%;"><span id="popUpTitle" style="font-family: \'Press Start 2P\'; font-size: 4vh;">CHOOSE NAME FOR YOUR POKEMON?</span><br><input type="text" id="popUpInput", style="min-width: 95%; max-width: 95%; min-height: 10%; font-family: \'Press Start 2P\'; font-size: 4vh; border: 1vh inset black;"><br><br><span id="popUpBottom" style="font-family: \'Press Start 2P\'; font-size: 4vh;">Press start to confirm</span></div>'
    ctx = document.getElementById("canvas").getContext("2d")
    document.getElementById("canvas").height = window.innerHeight - 4 // size the canvas to be a 4-3 ratio
    document.getElementById("canvas").width = (window.innerHeight - 4) + window.innerHeight / 4 // size the canvas to be a 4-3 ratio
    ctx.webkitImageSmoothingEnabled = false // remove blurry pixels
    ctx.mozImageSsprite_moothingEnabled = false // remove blurry pixels
    ctx.imageSmoothingEnabled = false // remove blurry pixels
    ctx = document.getElementById("canvas").getContext("2d") // redefine ctx
    pixelsize = document.getElementById("canvas").width / 176 // define the size of  pixel all sizes are based around this
    canvas = document.getElementById("canvas")
    $("#popUpDiv").hide()
    $("#popUpInput").keypress(function(event){
        if(event.keyCode == 13){
            var nickname = document.getElementById("popUpInput").value
            party.push([currentBattleInfo[0][0], currentBattleInfo[0][1], currentBattleInfo[0][2], currentBattleInfo[0][3], currentBattleInfo[0][4], currentBattleInfo[0][5], "", nickname, currentBattleInfo[0][6]])
            menu = "none"
            $("#popUpDiv").hide()
            enter = false
        }
    })
    popUpAnswer = "none"
    room1 = new Image()
    room1.src = "terrain/Home.png"
    textbox = new Image()
    textbox.src = "text/text-template.png"
    alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",".", "@", "!", "'" , "?", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","/"] // @ is comma
    text = [new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image()]
    for(counter = text.length - 1; counter >= 0; counter -= 1){ // define which letter has which image
        if(counter > 9){
            text[counter].src = "text/letter_" + counter + ".png"
        } else {
            text[counter].src = "text/letter_0" + counter + ".png"
        }
    }
    $(window).resize(function(){
        resizeCanvas()
    })
    saveData = saveData.split("\n")
    for(i = saveData.length-1; i >= 0; i--){
        saveData[i] = saveData[i].split("|")
        for(subi = saveData[i].length-1; subi >= 0; subi--){
            saveData[i][subi] = saveData[i][subi].split(",")
        }
    }
    textshowing = false
    onScreenText = []
    playerImage = [[new Image(), new Image(), new Image()], [new Image(), new Image(), new Image()], [new Image(), new Image(), new Image()], [new Image(), new Image(), new Image()]] // a new duo of images for the animations of each directon of the player
    playerImage[0][0].src = "pokemon_guy/sprite_00.png" // define all the players animation frames
    playerImage[0][1].src = "pokemon_guy/sprite_01.png"
    playerImage[0][2].src = "pokemon_guy/sprite_02.png"
    playerImage[1][0].src = "pokemon_guy/sprite_03.png"
    playerImage[1][1].src = "pokemon_guy/sprite_04.png"
    playerImage[1][2].src = "pokemon_guy/sprite_05.png"
    playerImage[2][0].src = "pokemon_guy/sprite_06.png"
    playerImage[2][1].src = "pokemon_guy/sprite_07.png"
    playerImage[2][2].src = "pokemon_guy/sprite_08.png"
    playerImage[3][0].src = "pokemon_guy/sprite_09.png"
    playerImage[3][1].src = "pokemon_guy/sprite_10.png"
    playerImage[3][2].src = "pokemon_guy/sprite_11.png"
    selectedMenuSlot = 0
	menuSelecter = new Image
    menuSelecter.src = "text/menu selector.png"
    overworldMap = {}
    overworldPos = {}
    xMovement = 0
    yMovement = 0
    xCameraMovement = "fixed"
    yCameraMovement = "free"
    menu = "none"
    npcs = [["npcs/npc_mum_1.png","npcs/npc_mum_0.png","npcs/npc_mum_1.png","npcs/npc_mum_2.png","npcs/npc_mum_3.png"],["npcs/npc_youngster_3.png","npcs/npc_youngster_0.png","npcs/npc_youngster_1.png","npcs/npc_youngster_2.png","npcs/npc_youngster_3.png"]]
    MapColision = {room0:[[1,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,1,1,1,0,0,0,0,1],[1,0,0,1,1,1,1,1,1,1,0,0,1],[1,0,0,1,2,1,3,1,2,1,0,0,1],[1,0,0,1,2,2,0,2,2,1,0,0,1],[1,0,0,1,1,1,0,1,1,1,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,"npc 1",1,1,1,0,1,1,1,0,0,1],[1,0,0,1,1,1,0,1,1,1,0,0,1],[1,0,"npc 1",1,1,1,0,1,1,1,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,4,4,1,1,1,1,1,1],], house0:[[1,1,1,1,1,1,1,1,],[0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,],[0,0,0,1,1,"npc 0",0,0,],[0,0,0,1,1,0,0,0,],[0,0,0,0,0,0,0,0,],[0,0,0,0,0,0,0,0,],[0,0,0,3,3,0,0,0,]], rute1:[[1,4,4,4,1,1,1,1,1,1,1,1,5,5,5,1],[1,0,0,0,1,1,1,1,1,1,1,1,0,0,0,1],[1,0,0,0,1,1,1,1,3,1,1,1,0,0,0,1],[1,0,0,0,0,2,2,0,0,0,2,2,0,0,0,1],[1,0,0,0,0,2,2,2,2,2,2,2,0,0,0,1],[1,0,0,0,0,2,2,2,2,2,2,2,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]], town1: [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,0,0,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,1,0,1,1,1,1,0,0,0,1],[1,0,0,0,1,1,1,1,1,0,0,0,0,1,1,1,1,1,0,0,1,1,1,1,1,1,1,0,1,1,1,1,0,0,0,1],[1,0,0,0,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,0,0,0,1],[1,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,0,1,1,1,1,0,0,1],[1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,1,1]]}
    currentMapColision = [[1,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,1,1,1,0,0,0,0,1],[1,0,0,1,1,1,1,1,1,1,0,0,1],[1,0,0,1,2,1,3,1,2,1,0,0,1],[1,0,0,1,2,2,0,2,2,1,0,0,1],[1,0,0,1,1,1,0,1,1,1,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,"npc 1",1,1,1,0,1,1,1,0,0,1],[1,0,0,1,1,1,0,1,1,1,0,0,1],[1,0,"npc 1",1,1,1,0,1,1,1,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,4,4,1,1,1,1,1,1],]
    //the colision for the current room
    currentMapPokemon = { levelRange: [4, 6], commonSpawns: [0, 3], uncommonSpawns: [0, 3], rareSpawns: [7], ultraRareSpawns: [0, 3] }
    // common spawns have a 100/126 chance to spawn uncommon are 20/126 rare are 5/126 and ultraRare are 1/126 levelRange is the level the pokemon will spawn at the will spawn at a level between the first level and the second one minus one
    cameray = 0
    camerax = 0
    playerx = 80
    playery = 64
    x = 6// the players curren position in the grid. not in pixels. used for colision.
    y = 5
    types = [['', 'lightgrey', 'red', 'blue', 'yellow', 'green', 'white', 'orange', 'purple', 'brown', 'lightblue', 'lightpurple', 'lightgreen', 'grey', 'purple', 'purple', 'grey', 'lightgrey', 'pink'], ['normal', '', '', '', '', '', '', '', '', '', '', '', '', '0.5', '0', '', '', '0.5', ''], ['fire', '', '0.5', '0.5', '', '2', '2', '', '', '', '', '', '2', '0.5', '', '0.5', '', '2', ''], ['water', '', '2', '0.5', '', '0.5', '', '', '', '2', '', '', '', '2', '', '0.5', '', '', ''], ['electric', '', '', '2', '0.5', '0.5', '', '', '', '0', '2', '', '', '', '', '0.5', '', '', ''], ['grass', '', '0.5', '2', '', '0.5', '', '', '0.5', '2', '0.5', '', '0.5', '2', '', '0.5', '', '0.5', ''], ['ice', '', '0.5', '0.5', '', '2', '0.5', '', '', '2', '2', '', '', '', '', '2', '', '0.5', ''], ['fighting', '2', '', '', '', '', '2', '', '0.5', '', '0.5', '0.5', '0.5', '2', '0', '', '2', '2', '0.5'], ['poison', '', '', '', '', '2', '', '', '0.5', '0.5', '', '', '', '0.5', '0.5', '', '', '0', '2'], ['ground', '', '2', '', '2', '0.5', '', '', '2', '', '0', '', '0.5', '2', '', '', '', '2', ''], ['flying', '', '', '', '0.5', '2', '', '2', '', '', '', '', '2', '0.5', '', '', '', '0.5', ''], ['psychic', '', '', '', '', '', '', '2', '2', '', '', '0.5', '', '', '', '', '0', '0.5', ''], ['bug', '', '0.5', '', '', '2', '', '0.5', '0.5', '', '0.5', '2', '', '', '0.5', '', '2', '0.5', '0.5'], ['rock', '', '2', '', '', '', '2', '0.5', '', '0.5', '2', '', '2', '', '', '', '', '0.5', ''], ['ghost', '0', '', '', '', '', '', '', '', '', '', '2', '', '', '2', '', '0.5', '', ''], ['dragon', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '2', '', '0.5', '0'], ['dark', '', '', '', '', '', '', '0.5', '', '', '', '2', '', '', '2', '', '0.5', '', '0.5'], ['steel', '', '0.5', '0.5', '0.5', '', '2', '', '', '', '', '', '', '2', '', '', '', '0.5', '2']]
    Directon = 0//
    AnimaionProgress = 2
    miscImage = new Image
    bag = new Image
    currentBattleInfo = [] // opponents team, whether its a trainer battle, [name of first healthy pokemon in party,ect,index in party], stage in turn 1 = choseing act 1.1 = fighting 1.2 = item 1.3 = switching pokemon 2 = playing move animatoins, the message displayed at the bottom of the screen while in battle [line1,line2], animations in progress [physical, special, damage, capture].
    moveType = "phy" // whether the move thats animation is playing is a special or physical attack
    battleAnimationProgress = 0
    itemDex = [["pokeball", "item", ["a device for capturing pokemon", ""]], ["greatball", "item", ["a better device for capturing", "pokemon"]], ["pokedex", "KeyItem", ["lets you keep track of captured", "pokemon"]], ["hm 01", "Tm Hm", ["cuts down small trees", "if taught to a pokemon"]], ["potion", "item", ["heals a pokemon for 20 hp",""]] ]
    pokedex = [['bulbasaur',[45,49,49,65,45,0,65,[5, 8]], [10, 3]],['Ivysaur', ['10', '3']],['Venusaur', [10, 3]],['charmander',[39,52,43,60,65, 1,50,[2]],[]],['Charmelion'],['Charizard'],['caterpie',[10, 5,5,5,5,1],[]], ["konchifly",[35, 40, 35, 50, 50, 3, 40, [12, 10]], []]] //Pokedex. [pokemon name, [base hp atk def sp.atk spd shape sp.def], [move, level.learned]]
    moveDex = [["....."],["scratch", 40, 35, 100, "phy", "none", 1], ["growl", 0, 40, 100, "phy","foe atk -1", 1], ["ember", 40, 40, 100, "spe","bur", 2], ["sand attack", 0, 15, 100, "spe", "foe acu -1", 9], ["hydro pump", 110, 5, 80, "spe", "none", 3]] // name, power, power points, acuracy (percent), specail/physical, effects (eg. poison, attack drop ect.), type
    pokemonShapes = [new Image, new Image, new Image, new Image,new Image, new Image, new Image, new Image,new Image, new Image]
    for (counter = 0; counter != 10; counter ++){
        if (counter != 10){ 
            pokemonShapes[counter].src = "pokemon/shape_0" + counter + ".png"
        }else{
            pokemonShapes[10].src = "pokemon/shape_10.png"
        }
    }
    playersBattlePokemonSprite = new Image()
    opponentsBattlePokemonSprite = new Image()
    opponetsStatModifyers = [1,1,1,1,1,1,1] //atk,def,sp.atk,sp.def,spd
    playersStatModyfyers = [1,1,1,1,1,1,1] //atk,def,sp.atk,sp.def,spd
    bag.src = "other_images/bag.png"
    bagPockets = [["items", [[1,3],[0, 2],[4,5]]],["key items", [[2, 1]] ],["tms and hms", [] ], 0]// the names of the bag pockets and the items the item data is stored [index in itemDex, amount owned by player] the last item in the list refrances the selected bag pocket eg. 0 = items 1 = keyitems ect. the items in pockets display backward in the bag
    scrolledInBag = 0 //how far down you are scrolled in the item viewer
    selectedItem = 0
    party = saveData[0]//[[0,70.58,1,2,3,4,'','', 143],[7,7,1,2,3,4,'','', 22],[0,2,1,3,2,0,'','fredrick', 14],[3,5,1,3,2,5,'','mandy', 188]] //Pokemon stats: id, lvl, move 1, move 2, move 3, move 4 , held item, nickname, hp
    selectedPartySlot = 0
    partySubMenu = false
    subMenu = "none"
    movingPokemon = -1
    //map = {colision:currentMapColision, width:document.getElementById("canvas").width, height:(document.getElementById("canvas").width * (2 + 8 / 11)),startingPos:startingPos, npcs:[[1,32*pixelsize,112*pixelsize,[new Image(),new Image(),new Image(),new Image(),new Image()],2,7,["hi!","i like shorts!","they're comfy","and easy to", "wear!",""] ],[1,32*pixelsize,160*pixelsize,[new Image(),new Image(),new Image(),new Image(),new Image()],2,10,["have you seen", "billy anywhere?", "he was playing","with a strange","balloon last i", "saw him."] ]]}
    map = {colision:currentMapColision, width:208, height:256,startingPos:[-16, -16], npcs:[[1,16,112,[new Image(),new Image(),new Image(),new Image(),new Image()],2,8,["hi!","i like shorts!","they're comfy","and easy to", "wear!",""] ],[1,16*pixelsize,144*pixelsize,[new Image(),new Image(),new Image(),new Image(),new Image()],2,10,["have you seen", "billy anywhere?", "he was playing","with a strange","balloon last i", "saw him."] ]], image:"terrain/Home.png"}
    loadNPCS()
    player = {player_name:"/name/", x: x, y: y, playerx: playerx, playery: playery, camerax: camerax, cameray: cameray, image: playerImage, AnimationProgress: AnimaionProgress, Direction: Directon, xCameraMovement: xCameraMovement, yCameraMovement: yCameraMovement, xMovement: xMovement, yMovement: yMovement, inOverworld:true}
    lastCheckPoint = [function(){returnToCheckPoint()}, {}, {}, "terrain/Home.png"]// last place the player healed, what map they were in, where in that map they were, the image of the map they were in
    Object.assign(lastCheckPoint[1], map)
    Object.assign(lastCheckPoint[2], player) 
    returningToCheckPoint = false // whether the player just lost and is being teleported to a checkpoint
    changeCheckPoint = false // if set to true the checkpoint will be set to the players current location
    encounterPrimed = false //whether there will be an encounter when the player reaches the tile they are walking to
    ctx.font = String(Math.floor(document.getElementById("canvas").height/8)) + "px Source Code Pro"
    function loop() {
        draw()
        menuHandler()
        if (menu == 'none'){
            overWorldHandler()
        }
    }
    setInterval(loop, 10)
}
function loadSave(){
    fs = require("fs") // file writeing module
    try{
        fs.readFile('SaveData.txt', 'utf8' , (err, data) => {
            if (err) {
            console.log(err)
            saveData = "3,5,1,3,2,5,,mandy,19\ntest"
            fs.writeFile('SaveData.txt', saveData, function (err) {if (err) return console.log(err);})
            }else{
                saveData = data
                console.log(data)
            }
            init()
        })
    }catch{
        console.log("error for some reason")
        init()
    }
}