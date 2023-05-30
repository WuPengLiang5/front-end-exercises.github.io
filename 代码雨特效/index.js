const cvs = document.getElementById('bg')

const width = window.innerWidth
const height = window.innerHeight
cvs.width = width
cvs.height = height

const ctx = cvs.getContext('2d')

const columnWidth = 20;
const columnCount = Math.floor(window.innerWidth / columnWidth);
const columnNextIndexes = new Array(columnCount)
columnNextIndexes.fill(1)

function draw(){
    ctx.fillStyle = 'rgba(240, 240, 240, 0.1)'
    ctx.fillRect(0,0,width,height)
    const fz = 20
    ctx.fillStyle = getRandomColor()
    ctx.font = `${fz}px 'Roboto Mono'`
    for(let i = 0;i < columnCount; i++){
        const x = i * columnWidth
        const y = fz * columnNextIndexes[i]
        ctx.fillText(getRandomChar(), x, y)
        if(y > height && Math.random() > 0.99){
            columnNextIndexes[i] = 0
        }else{
            columnNextIndexes[i]++
        }
    }
}

function getRandomColor(){
    const fontColors = [
        '#33B5E5',
        '0099CC',
        '#AA66CC',
        '#9933CC',
        '#99CC00',
        '#669900',
        '#FFBB33',
        '#FF8800',
        '#ff4444',
        '#CC0000'
    ]

    return fontColors[Math.floor(Math.random() * fontColors.length)] 
}

function getRandomChar(){
    const str = 'console.log("hello world")'
    return str[Math.floor(Math.random() * str.length)]
}

draw()
setInterval(draw, 40)