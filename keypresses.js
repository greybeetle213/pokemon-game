var left = false
var right = false
var down = false
var up = false
var enter = false
var keyX = false
var keyZ = false

function touchMode(){
    var counter = 0
    if (document.getElementById("touch0").style.visibility == "hidden"){
        for (counter = 0; counter < 7; counter ++){
            document.getElementById("touch"+counter).style.visibility = "visible"
        }
    }else{
        for (counter = 0; counter < 7; counter ++){
            document.getElementById("touch"+counter).style.visibility = "hidden"
        }
    }
}
function touchEnter(event){
    if (event == 'down'){
        enter = true
    }else{
        enter = false
    }
}
function touchA(event){
    if (event == 'down'){
        keyX = true
    }else{
        keyX = false
    }
}
function touchB(event){
    if (event == 'down'){
        keyZ = true
    }else{
        keyZ = false
    }
}
function touchUp(event){
    if (event == 'down'){
        up = true
    }else{
        up = false
    }
}
function touchDown(event){
    if (event == 'down'){
        down = true
    }else{
        down = false
    }
}
function touchLeft(event){
    if (event == 'down'){
        left = true
    }else{
        left = false
    }
}
function touchRight(event){
    if (event == 'down'){
        right = true
    }else{
        right = false
    }
}
document.addEventListener('keydown', (event) => {
    if (event.key == 'ArrowLeft') {
        left = true
    }
})
document.addEventListener('keyup', (event) => {
    if (event.key == 'ArrowLeft') {
        left = false
    }
})
document.addEventListener('keydown', (event) => {
    if (event.key == 'ArrowRight') {
        right = true
    }
})
document.addEventListener('keyup', (event) => {
    if (event.key == 'ArrowRight') {
        right = false
    }
})

document.addEventListener('keydown', (event) => {
    if (event.key == 'ArrowUp') {
        up = true
    }
})
document.addEventListener('keyup', (event) => {
    if (event.key == 'ArrowUp') {
        up = false
    }
})
document.addEventListener('keydown', (event) => {
    if (event.key == 'ArrowDown') {
        down = true
    }
})
document.addEventListener('keyup', (event) => {
    if (event.key == 'ArrowDown') {
        down = false
    }
})
document.addEventListener('keydown', (event) => {
    if (event.key == 'x') {
        keyX = true
    }
})
document.addEventListener('keyup', (event) => {
    if (event.key == 'x') {
        keyX = false
    }
})
document.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        enter = true
    }
})
document.addEventListener('keyup', (event) => {
    if (event.key == 'Enter') {
        enter = false
    }
})
document.addEventListener('keydown', (event) => {
    if (event.key == 'z') {
        keyZ = true
    }
})
document.addEventListener('keyup', (event) => {
    if (event.key == 'z') {
        keyZ = false
    }
})

