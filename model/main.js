async function predict(input) {
    const model = await tf.loadLayersModel('./model/model.json');
    const value = tf.expandDims(tf.expandDims(tf.tensor2d(input), 0), 3)
    const res = await model.predict(value).array()
    return arg_max(res[0])
}


run.addEventListener('click', () => {
    const data = []
    for (let i = 0; i < div_game.childNodes.length; i++) {
        const row = div_game.childNodes[i];
        const row_data = []
        for (let j = 0; j < row.childNodes.length; j++) {
            const col = row.childNodes[j];
            row_data.push(parseInt(col.getAttribute('value')))
        }
        data.push(row_data)
    }

    predict(data).then(res => {
        answer.innerHTML = res
    })
})
