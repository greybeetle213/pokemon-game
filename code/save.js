function processSave(){
    saveData = saveData.split("\n")
    saveData[0] = saveData[0].split("|")
    for(i = saveData[0].length-1; i >= 0; i--){
        saveData[0][i] = saveData[0][i].split(",")
    }
    party = saveData[0]
    bagPockets = JSON.parse(saveData[3])
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
    player = JSON.parse(saveData[1])
    player.image = playerImage
    map = JSON.parse(saveData[2])
    dev = "" //whether to show some devolopment tools is -dev or left blank
    npcs = [
        ["npcs/npc_mum_1.png", "npcs/npc_mum_0.png", "npcs/npc_mum_1.png", "npcs/npc_mum_2.png", "npcs/npc_mum_3.png"],
        ["npcs/npc_youngster_3.png", "npcs/npc_youngster_0.png", "npcs/npc_youngster_1.png", "npcs/npc_youngster_2.png", "npcs/npc_youngster_3.png"],
        ["npcs/pokemon_pc.png","npcs/pokemon_pc.png","npcs/pokemon_pc.png","npcs/pokemon_pc.png"],
        ["npcs/interact"+dev+".png", "npcs/interact"+dev+".png", "npcs/interact"+dev+".png", "npcs/interact"+dev+".png"]
    ]

    loadNPCS()
    room1 = new Image()
    room1.src = map.image
    init()
}
function loadSave(){
    fs = require("fs") // file writeing module
    try{
        fs.readFile('SaveData.txt', 'utf8' , (err, data) => {
            if (err) {
            console.log(err)
            saveData = '3,5,1,3,2,5,,mandy,19\n{"player_name":"/name/","x":6,"y":5,"playerx":80,"playery":64,"camerax":0,"cameray":0,"image":[[{},{},{}],[{},{},{}],[{},{},{}],[{},{},{}]],"AnimationProgress":2,"Direction":0,"xCameraMovement":"fixed","yCameraMovement":"free","xMovement":0,"yMovement":0,"inOverworld":true}\n{"colision":[[1,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,1,1,1,0,0,0,0,1],[1,0,0,1,1,1,1,1,1,1,0,0,1],[1,0,0,1,2,1,3,1,2,1,0,0,1],[1,0,0,1,2,2,0,2,2,1,0,0,1],[1,0,0,1,1,1,0,1,1,1,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,"npc 1",1,1,1,0,1,1,1,0,0,1],[1,0,0,1,1,1,0,1,1,1,0,0,1],[1,0,"npc 1",1,1,1,0,1,1,1,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,4,4,1,1,1,1,1,1]],"width":208,"height":256,"startingPos":[-16,-16],"npcs":[[1,16,112,[{},{},{},{},{}],2,8,["hi!","i like shorts!","they\'re comfy","and easy to","wear!",""]],[1,16,144,[{},{},{},{},{}],2,10,["have you seen","billy anywhere?","he was playing","with a strange","balloon last i","saw him."]]],"image":"terrain/Home.png"}\n[["items",[[1,3],[0,2],[4,5]]],["key items",[[2,1]]],["tms and hms",[]],0]'
            // OLD saveData = '3,5,1,3,2,5,,mandy,19\n{"player_name":"/name/","x":6,"y":5,"playerx":80,"playery":64,"camerax":0,"cameray":0,"image":[[{},{},{}],[{},{},{}],[{},{},{}],[{},{},{}]],"AnimationProgress":2,"Direction":0,"xCameraMovement":"fixed","yCameraMovement":"free","xMovement":0,"yMovement":0,"inOverworld":true}\n{"colision":[[1,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,1,1,1,0,0,0,0,1],[1,0,0,1,1,1,1,1,1,1,0,0,1],[1,0,0,1,2,1,3,1,2,1,0,0,1],[1,0,0,1,2,2,0,2,2,1,0,0,1],[1,0,0,1,1,1,0,1,1,1,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,"npc 1",1,1,1,0,1,1,1,0,0,1],[1,0,0,1,1,1,0,1,1,1,0,0,1],[1,0,"npc 1",1,1,1,0,1,1,1,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,4,4,1,1,1,1,1,1]],"width":208,"height":256,"startingPos":[-16,-16],"npcs":[[1,16,112,[{},{},{},{},{}],2,8,["hi!","i like shorts!","they\'re comfy","and easy to","wear!",""]],[1,16,144,[{},{},{},{},{}],2,10,["have you seen","billy anywhere?","he was playing","with a strange","balloon last i","saw him."]]],"image":"terrain/Home.png"}'
            // BROKEN saveData = '[[["3","5","1","3","2","5","","mandy","19"]],"{\"player_name\":\"/name/\",\"x\":6,\"y\":5,\"playerx\":80,\"playery\":64,\"camerax\":0,\"cameray\":0,\"image\":[[{},{},{}],[{},{},{}],[{},{},{}],[{},{},{}]],\"AnimationProgress\":2,\"Direction\":0,\"xCameraMovement\":\"fixed\",\"yCameraMovement\":\"free\",\"xMovement\":0,\"yMovement\":0,\"inOverworld\":true}","{\"colision\":[[1,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,1,1,1,0,0,0,0,1],[1,0,0,1,1,1,1,1,1,1,0,0,1],[1,0,0,1,2,1,3,1,2,1,0,0,1],[1,0,0,1,2,2,0,2,2,1,0,0,1],[1,0,0,1,1,1,0,1,1,1,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,\"npc 1\",1,1,1,0,1,1,1,0,0,1],[1,0,0,1,1,1,0,1,1,1,0,0,1],[1,0,\"npc 1\",1,1,1,0,1,1,1,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,4,4,1,1,1,1,1,1]],\"width\":208,\"height\":256,\"startingPos\":[-16,-16],\"npcs\":[[1,16,112,[{},{},{},{},{}],2,8,[\"hi!\",\"i like shorts!\",\"they\'re comfy\",\"and easy to\",\"wear!\",\"\"]],[1,16,144,[{},{},{},{},{}],2,10,[\"have you seen\",\"billy anywhere?\",\"he was playing\",\"with a strange\",\"balloon last i\",\"saw him.\"]]],\"image\":\"terrain/Home.png\"}","[[\"items\",[[1,3],[0,2],[4,5]]],[\"key items\",[[2,1]]],[\"tms and hms\",[]],0]"]'
            fs.writeFile('SaveData.txt', saveData, function (err) {if (err) return console.log(err);})
            }else{
                saveData = data
                console.log(data)
            }
            processSave()
        })
    }catch{
        console.log("error for some reason")
        processSave()
    }

}
function writeSave(){
    var newSaveData = String(party.join("|"))
    newSaveData += "\n" + JSON.stringify(player)
    newSaveData += "\n" + JSON.stringify(map)
    newSaveData += "\n" + JSON.stringify(bagPockets)
    fs.writeFile('SaveData.txt',newSaveData, function (err) {if (err) return console.log(err);})
}