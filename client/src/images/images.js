// import * as pictures from './assets'
import elephants from './assets/elephants.jpg'
import grevy from './assets/grevy.jpg'
import giraffe from './assets/giraffe.jpg'

function buildImageObjects(images) {
    //Images are timed and rotated
    const name = elephants.split('/')[3].split('.')[0]
    return images.map((image, index) => {
        return {
            id: index,
            src: image,
            alt: name
        }
    })
}

const imgObj = buildImageObjects([elephants, grevy, giraffe])
console.log(imgObj)
export default imgObj
