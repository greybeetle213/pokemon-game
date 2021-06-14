function menuHandler(){
    if (enter == true && player.xMovement == 0 && player.yMovement == 0 && textshowing == false && menu != "fight"){
        if (menu == "none"){ 
            selectedMenuSlot = 0
            menu = "main" 
        } else if(partySubMenu == false && movingPokemon == -1){
            menu = "none"
            subMenu = "none"
            selectedMenuSlot = 0
        }
        enter = false
    }
    if (down == true && menu == "main" && selectedMenuSlot < 4){
        selectedMenuSlot += 1
        down = false
    }
    if (up == true && menu == "main" && selectedMenuSlot > 0){
        selectedMenuSlot -= 1
        up = false
    }
    if (keyX == true && menu == "main"){
        if (selectedMenuSlot == 4){
            menu = "none"
        }
        if (selectedMenuSlot == 2){
            menu = "item"
            keyX = false
        }
        if (selectedMenuSlot == 0 && party.length != 0){
            menu = "pkmn"
            keyX = false
            selectedPartySlot = 0
        }
        if(selectedMenuSlot == 3){
            menu = "none"
            textshowing = true
            writeSave()
            onScreenText = ["save was", "succsessfull!"]
            keyX = false
        }
    }
    if ((menu == "item" || menu == "fight" && currentBattleInfo[3] == 1.3) && subMenu != "pkmn"){
        if (left == true && bagPockets[3] != 0){
            bagPockets[3] -= 1
            selectedItem = 0
            left = false
        }
        if (right == true && 2 > bagPockets[3]){
            bagPockets[3] += 1
            selectedItem = 0
            right = false
        }
        if (up == true && selectedItem != 0){
            selectedItem -= 1
            up = false
        }else if (selectedItem == 0 && up == true && scrolledInBag > 0){
            scrolledInBag -= 1
            up = false
        }
        if (down == true && selectedItem < bagPockets[bagPockets[3]][1].length-1 && selectedItem < 9){
            selectedItem += 1
            down = false
        }else if (selectedItem == 9 && down == true && bagPockets[bagPockets[3]][1].length-1-scrolledInBag > 9){
            scrolledInBag += 1
            down = false
        }
        if(keyX && menu == "fight"){
            if(itemDex[bagPockets[bagPockets[3]][1][bagPockets[bagPockets[3]][1].length-1-(selectedItem+scrolledInBag)][0]][0] == "pokeball" && party.length != 6){
                currentBattleInfo[3] = 0
                currentBattleInfo[5][3] = 1
                miscImage.src = "other_images/pokeball-closed.png"
                bagPockets[bagPockets[3]][1][bagPockets[bagPockets[3]][1].length-1-(selectedItem+scrolledInBag)][1] -= 1
                if(bagPockets[bagPockets[3]][1][bagPockets[bagPockets[3]][1].length-1-(selectedItem+scrolledInBag)][1] == 0){ // if the count of pokeballs is 0
                    bagPockets[bagPockets[3]][1].splice(bagPockets[bagPockets[3]][1].length-1-(selectedItem+scrolledInBag)) // remove pokeballs from the bag
                }
            }
        }
        if(itemDex[bagPockets[bagPockets[3]][1][bagPockets[bagPockets[3]][1].length-1-(selectedItem+scrolledInBag)][0]][0] == "potion" && keyX){
            subMenu = "pkmn"
            keyX = false
        }   
    }else if(menu == "pkmn" || (menu == "fight" && currentBattleInfo[3] == 1.2) || subMenu == "pkmn" ){
        if (partySubMenu == false){
            if (down == true && selectedPartySlot < party.length-1){
                selectedPartySlot += 1
                down = false
            }
            if (up == true && selectedPartySlot != 0){
                selectedPartySlot -= 1
                up = false
            }
            if (left == true){
                selectedPartySlot = 0
            }
            if (right == true && party.length > 1){
                selectedPartySlot = 1
            }
        }
        if (keyX == true && partySubMenu == false && movingPokemon == -1 && menu != "fight" && subMenu == "none"){
            partySubMenu = true
            keyX = false
        }
        if(keyX == true && menu == "fight" && party[selectedPartySlot][8] != 0){  
            console.log("yes")
            if (currentBattleInfo[2][8] > 0){
                currentBattleInfo[2] = party[selectedPartySlot]
                currentBattleInfo[3] = 2.3
                playersBattlePokemonSprite.src = "pokemon/back_"+pokedex[currentBattleInfo[2][0]][0]+".png"
                if(currentBattleInfo[2][7] == ""){
                    currentBattleInfo[4] = [pokedex[currentBattleInfo[2][0]][0] + "@ kill", ""]
                }else{
                    currentBattleInfo[4] = [currentBattleInfo[2][7]+ "@ kill", ""]
                }
            }else{
                currentBattleInfo[2] = party[selectedPartySlot]
                currentBattleInfo[3] = 1
                playersBattlePokemonSprite.src = "pokemon/back_"+pokedex[currentBattleInfo[2][0]][0]+".png"
            }
            keyX = false
        }
        if(keyX && menu == "item"){
            Heal(selectedPartySlot)
            var itemNotFound = true
            var i = 0
            console.log("why")
            while (itemNotFound){
                if(bagPockets[0][1][i][0] == 4){
                    bagPockets[0][1][i][1] -= 1
                    if (bagPockets[0][1][i][1] == 0){
                        bagPockets[0][1].splice(i,1)
                    }
                    itemNotFound = false
                }
                i ++
            }
            subMenu = "none"
            keyX = false
        }
        if (keyX == true && movingPokemon != -1){
            party.splice(selectedPartySlot, 0, party.splice(movingPokemon,1)[0])
            movingPokemon = -1
            keyX = false
        }
        if (partySubMenu == true){
            if(up == true && selectedMenuSlot != 0){
                selectedMenuSlot -=1
                up = false
            }else if(down == true && selectedMenuSlot < 2){
                selectedMenuSlot += 1
                down = false
            }else if(keyX == true){
                if (selectedMenuSlot == 2){
                    partySubMenu = false
                    keyX = false
                }else if (selectedMenuSlot == 0){
                    movingPokemon = selectedPartySlot
                    partySubMenu = false
                    keyX = false
                }else if (selectedMenuSlot == 1){
                    menu = "pkmninfo"
                    partySubMenu = false
                } 
            }
        } 
    }
	if(menu == "fight"){
		BattleEngine()
	}
}
