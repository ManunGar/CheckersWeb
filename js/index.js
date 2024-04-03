let start = document.getElementById('startButton')


let switchButton = document.getElementById('circleSwitch')

switchButton.onclick = function(){
    let stateSwitch = switchButton.getAttribute('class')
    stateSwitch == 'dark' ? switchButton.setAttribute('class', 'light') : switchButton.setAttribute('class', 'dark')
}
