const div_game = document.getElementById('game')
const answer = document.getElementById('answer')
const restart = document.getElementById('restart')
const run = document.getElementById('run')
const map = {}

function arg_max(array) {
    let max = array[0]
    let max_i = 0
    array.forEach((point, i) => {
        if (point > max) {
            max = point
            max_i = i
        }
    });
    return max_i
}

async function init(){
    model = await tf.loadLayersModel('./model/model.json');
    model.summary()

    for (let i = 0; i < 28; i++) {
        let row = document.createElement('div')
        row.className = 'my_row'
        for (let j = 0; j < 28; j++){
            let col = document.createElement('div')
            col.className = 'my_col'
            col.setAttribute('value', 0)
            col.setAttribute('y', i)
            col.setAttribute('x', j)
            if (data.x[i][j] > 0) {
                col.classList.add('active')
                col.setAttribute('value', 1)
            }
            map[`${j}_${i}`] = col
            row.appendChild(col)
        }
        div_game.appendChild(row)        
    }
    answer.innerHTML = arg_max(data.y)
    
}

function mouse_move(e){
    e.preventDefault()
    const point = e.target;
    const x = point.getAttribute('x')
    const y = point.getAttribute('y')

    const points = [
        map[`${x}_${y}`],
        map[`${x-1}_${y-1}`],
        map[`${x}_${y-1}`],
        map[`${x+1}_${y-1}`],
        map[`${x-1}_${y}`],
        map[`${x+1}_${y}`],
        map[`${x-1}_${y+1}`],
        map[`${x}_${y+1}`],
        map[`${x+1}_${y+1}`]
    ]
    points.forEach(el =>{
        try {
            el.classList.add('active')
            el.setAttribute('value', 1)
        }catch{}
    })
    
}

div_game.addEventListener('mousedown', () => {
    div_game.addEventListener('mousemove', mouse_move)
})
div_game.addEventListener('mouseup', () => {
    div_game.removeEventListener('mousemove', mouse_move)
})
div_game.addEventListener('dblclick', () => {})

restart.addEventListener('click', () => {
    const my_cols = div_game.querySelectorAll('.my_col')
    my_cols.forEach(point => {
        point.classList.remove('active')
        point.setAttribute('value', 0)
    })
    answer.innerHTML = ''
})


// function touchdown(e){
//     mouse_move(e)
// }

// function touchup(e){

// }

// div_game.addEventListener('touchstart', touchdown)
// div_game.addEventListener('touchend', touchup)

div_game.addEventListener('touchstart', (e) => {
    window.scroll(0, 0)
    div_game.addEventListener('touchmove', mouse_move)

}, false)

div_game.addEventListener('touchend', () => {
    div_game.removeEventListener('touchmove', mouse_move)
}, false)



init()
