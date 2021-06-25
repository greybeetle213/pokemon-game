function overWorldHandler(){
    if (textshowing == false){
        if(battleAnimationProgress == 0){
            if (down == true && player.yMovement == 0 && player.xMovement == 0) { // down movement
                if (map.colision[player.y + 1][player.x] != 1 && player.Direction == 0 && typeof map.colision[player.y + 1][player.x] != "string"){
                    player.yMovement = 16
                    player.y += 1
                }
                player.Direction = 0
            } else if (player.yMovement > 0) {
                if (player.yMovement == 8) {
                    player.AnimationProgress = 1
                } else if (player.yMovement == 16) {
                    player.AnimationProgress = 0
                }
                if (player.yCameraMovement == "free") {
                player.cameray -= 0.5
                } else {
                    player.playery += 0.5
                }
                player.yMovement -= 0.5
                if (player.yMovement == 0 && down == false) {
                    player.AnimationProgress = 2
                }
            }
            if (up == true && player.yMovement == 0 && player.xMovement == 0) { // up movement
                if ( map.colision[player.y - 1][player.x] != 1 && typeof map.colision[player.y - 1][player.x] != "string"){
                player.yMovement = -16
                player.y -= 1}
                player.Direction = 1
            } else if (player.yMovement < 0) {
                if (player.yMovement == -8) {
                    player.AnimationProgress = 1
                } else if (player.yMovement == -16) {
                    player.AnimationProgress = 0
                }
                if (player.yCameraMovement == "free") {
                    player.cameray += 0.5
                } else {
                    player.playery -= 0.5
                }
                player.yMovement += 0.5
                if (player.yMovement == 0 && up == false) {
                    player.AnimationProgress = 2
                }
            }
            if (left == true && player.xMovement == 0 && player.yMovement == 0) { // left movement
                if (map.colision[player.y][player.x - 1] != 1 && typeof map.colision[player.y][player.x - 1] != "string"){
                    player.xMovement = -16
                    player.x -= 1
                }
                player.Direction = 2
            } else if (player.xMovement < 0) {
                if (player.xMovement == -8) {
                    player.AnimationProgress = 1
                } else if (player.xMovement == -16) {
                    player.AnimationProgress = 0
                }
                if (player.xCameraMovement == "free") {
                    player.camerax +=  0.5
                } else {
                    player.playerx -= 0.5
                }
                player.xMovement += 0.5
                if (player.xMovement == 0 && left == false) {
                    player.AnimationProgress = 2
                }
            }
            if (right == true && player.xMovement == 0 && player.yMovement == 0) { // right movement
                if (map.colision[player.y][player.x + 1] != 1 && typeof map.colision[player.y][player.x + 1] != "string"){
                    player.xMovement = 16
                    player.x += 1
                }
                player.Direction = 3
            } else if (player.xMovement > 0) {
                if (player.xMovement == 8) {
                    player.AnimationProgress = 1
                } else if (player.xMovement == 16) {
                    player.AnimationProgress = 0
                }
                if (player.xCameraMovement == "free") {
                    player.camerax -= 0.5 
                } else {
                    player.playerx += 0.5 
                }
                player.xMovement -= 0.5
                if (player.xMovement == 0 && right == false) {
                    player.AnimationProgress = 2
                }
            }
        }
    }
    if (player.xMovement == 0 && player.yMovement == 0){
        player.AnimationProgress = 2
    }
    if ((player.xMovement != 0 || player.yMovement != 0) && (map.colision[player.y][player.x] == 2)) {
        var randomnumber = Math.ceil(Math.random() * 150)
        if (randomnumber == 2) {
            encounterPrimed = true
        }
    }
    if(battleAnimationProgress <= 280 && player.xMovement == 0 && player.yMovement == 0 && encounterPrimed == true){
        battleAnimationProgress += 2
    }
    if (player.xMovement == 0 && player.yMovement == 0 && encounterPrimed == true && battleAnimationProgress == 140) {
        lvl = Math.floor(Math.random() * (currentMapPokemon.levelRange[1] - currentMapPokemon.levelRange[0])) + currentMapPokemon.levelRange[0]
        var randomnumber = Math.ceil(Math.random() * 126)
        if (randomnumber <= 100) {
            pokemon = currentMapPokemon.commonSpawns[Math.floor(Math.random() * currentMapPokemon.commonSpawns.length)]
        } else if (randomnumber <= 120) {
            pokemon = currentMapPokemon.uncommonSpawns[Math.floor(Math.random() * currentMapPokemon.uncommonSpawns.length)]
        } else if (randomnumber <= 125) {
            pokemon = currentMapPokemon.rareSpawns[Math.floor(Math.random() * currentMapPokemon.rareSpawns.length)]
        } else {
            pokemon = currentMapPokemon.ultraRareSpawns[Math.floor(Math.random() * currentMapPokemon.ultraRareSpawns.length)]
        }
        currentBattleInfo = [[pokemon,lvl,3,0,0,0,Math.round((2*pokedex[pokemon][1][0]*lvl)/100+lvl+10)],1]
        for (counter = 0; counter < party.length; counter ++){
            if(party[counter][8] > 0){
                currentBattleInfo.push(party[counter])
                currentBattleInfo[2].push(counter)
                break
            }
        } 
        currentBattleInfo.push(1) //stage in turn: 0 = showing text, 1 = choseing act, 1.1 = fighting, 1.2 = item, 1.3 = switching pokemon, 2.1 = playing fastest pokemons move animatoin, 2.2 = playing last pokemons move animation, 2.3 = player changed pokemon, 2.4 = player used item, 2.5 = oponent uses move 
        currentBattleInfo.push(["a wild "+pokedex[pokemon][0],"appeared"]) // the message displayed at the bottom of the screen while in battle [line1,line2]
        currentBattleInfo.push([[0, 0.2],0,"own", 0]) // [positoin of physacal attack, how much to add/subtract], pos of special attack, whether damage frames are active or not, pokemon using move, pokeball pos2
        playersBattlePokemonSprite.src = "pokemon/back_"+pokedex[currentBattleInfo[2][0]][0]+".png"
        opponentsBattlePokemonSprite.src = "pokemon/front_" + pokedex[currentBattleInfo[0][0]][0]+".png"
        battlePlatform = new Image()
        battlePlatform.src = "other_images/battle-platform.png"
        menu = "fight"
   }
    if(map.colision[player.y][player.x] != 0){
        if (map.colision[player.y][player.x] == 3 && player.inOverworld == true && player.xMovement == 0 && player.yMovement == 0){
            loadHouse0()
        }else if(player.inOverworld == false && map.colision[player.y][player.x] == 3 && player.xMovement == 0 && player.yMovement == 0){
            loadRoom0()
        }else if(map.colision[player.y][player.x] == 4 && player.yMovement == 0 && map.image == "terrain/Home.png"){
            console.log(player.y)
            loadRute1()
        }else if(map.colision[player.y][player.x] == 4 && player.yMovement == 0 && map.image == "terrain/rute1.png"){
            returnFromRute1()
        }else if(map.colision[player.y][player.x] == 5 && player.yMovement == 0 && map.image == "terrain/rute1.png"){
            loadTown1()
        }else if(map.colision[player.y][player.x] == 5 && player.yMovement == 0 && map.image == "terrain/Town1.png"){
            returnFromTown1()
        }else if(map.colision[player.y][player.x] == 6 && player.yMovement == 0 && map.image == "terrain/Town1.png"){
            loadPokeCenter()
        }else if(map.colision[player.y][player.x] == 6 && player.yMovement == 0 && map.image == "terrain/pokemon_center.png"){
            returnFromPokeCenter()
        }

    }
    if (keyX == true && textshowing == false && player.xMovement == 0 && player.yMovement == 0){
        if(player.Direction == 1 && typeof map.colision[player.y - 1][player.x] == "string"){
            if(map.colision[player.y - 1][player.x].substring(0,3) == "npc"){
                npcstocheck = map.npcs.length - 1
                while(npcstocheck >= 0){
                    if(map.npcs[npcstocheck][5] == player.y - 1 && map.npcs[npcstocheck][4] == player.x){
                        map.npcs[npcstocheck][3][0].src = map.npcs[npcstocheck][3][1].src
                        textshowing = true
                        onScreenText = '' 
                        onScreenText += map.npcs[npcstocheck][6]
                        onScreenText = onScreenText.split(",")
                        keyX = false
                        if(map.colision[player.y - 1][player.x].substring(4) == "0"){
                            changeCheckPoint = true
                        }
                        break
                    }
                    npcstocheck -= 1
                }
            }
        }else if(player.Direction == 0 && typeof map.colision[player.y + 1][player.x] == "string"){
            if(map.colision[player.y + 1][player.x].substring(0,3) == "npc"){
                npcstocheck = map.npcs.length - 1
                while(npcstocheck >= 0){
                    if(map.npcs[npcstocheck][5] == player.y + 1 && map.npcs[npcstocheck][4] == player.x){
                        map.npcs[npcstocheck][3][0].src = map.npcs[npcstocheck][3][3].src
                        textshowing = true
                        onScreenText = '' 
                        onScreenText += map.npcs[npcstocheck][6]
                        onScreenText = onScreenText.split(",")
                        keyX = false
                        if(map.colision[player.y + 1][player.x].substring(4) == "0"){
                            changeCheckPoint = true
                        }
                        break
                    }
                    npcstocheck -= 1
                }
            }
        }else if(player.Direction == 2 && typeof map.colision[player.y][player.x - 1] == "string"){
            if(map.colision[player.y][player.x - 1].substring(0,3) == "npc"){
                npcstocheck = map.npcs.length - 1
                while(npcstocheck >= 0){
                    if(map.npcs[npcstocheck][5] == player.y && map.npcs[npcstocheck][4] == player.x - 1){
                        map.npcs[npcstocheck][3][0].src = map.npcs[npcstocheck][3][4].src
                        textshowing = true
                        onScreenText = '' 
                        onScreenText += map.npcs[npcstocheck][6]
                        onScreenText = onScreenText.split(",")
                        keyX = false
                        if(map.colision[player.y][player.x - 1].substring(4) == "0"){
                            changeCheckPoint = true
                        }
                        break
                    }
                    npcstocheck -= 1
                }
            }
        }else if(player.Direction == 3 && typeof map.colision[player.y][player.x + 1] == "string"){
            if(map.colision[player.y][player.x + 1].substring(0,3) == "npc"){
                npcstocheck = map.npcs.length - 1
                while(npcstocheck >= 0){
                    if(map.npcs[npcstocheck][5] == player.y && map.npcs[npcstocheck][4] == player.x + 1){
                        map.npcs[npcstocheck][3][0].src = map.npcs[npcstocheck][3][2].src
                        textshowing = true
                        onScreenText = '' 
                        onScreenText += map.npcs[npcstocheck][6]
                        onScreenText = onScreenText.split(",")
                        keyX = false
                        if(map.colision[player.y][player.x + 1].substring(4) == "0"){
                            changeCheckPoint = true
                        }
                        break
                    }
                    npcstocheck -= 1
                }
            }
        }
    }
    if (keyX == true && textshowing == true){
        onScreenText.shift()
        onScreenText.shift()
        if(onScreenText.length == 0)
            textshowing = false
            keyX = false
    }
    if(changeCheckPoint == true){
        changeCheckPoint = false
        Object.assign(lastCheckPoint[2], player)
        console.log("Object.assign(lastCheckPoint[1], map) - map: " + JSON.stringify(map) + " lastCheckPoint[1]: " + JSON.stringify(lastCheckPoint[1]));
        Object.assign(lastCheckPoint[1], map)
        console.log("Object.assign(lastCheckPoint[1], map) - map: " + JSON.stringify(map) + " lastCheckPoint[1]: " + JSON.stringify(lastCheckPoint[1]));
        lastCheckPoint[3] = room1.src
        console.log("checkpoint set")
    }
}