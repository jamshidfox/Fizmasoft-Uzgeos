import "../fizmasoft/fizmasoft.videoeffect"
import img1 from "../images/1.jpg"
import img2 from "../images/2.jpg"
import img3 from "../images/3.jpg"
import img4 from "../images/4.jpg"
import img5 from "../images/5.jpg"
import img6 from "../images/6.jpg"

const latlngs = [
  [
    [41.35033251106981, 69.21871662139891],
    [41.34999424361311, 69.21830892562866]
  ],
  [
    [41.26080759382041, 69.2274284362793],
    [41.26050112190295, 69.22571182250977]
  ],
  [
    [41.31318508175921, 69.30838823318481],
    [41.31278215251399, 69.30752992630005]
  ],
  [
    [41.30282900969834, 69.1977310180664],
    [41.30253885480978, 69.19721603393555]
  ],
  [
    [41.31208104969048, 69.2418372631073],
    [41.3115008209619, 69.24013137817383]
  ],
  [
    [41.29328546081616, 69.29171562194823],
    [41.29238262038407, 69.28999900817871]
  ]
]

const latlngToBounds = (latlng) => {
  const height = 0.01
  const width = 0.015
  const [lat, long] = latlng
  const rightTop = [lat + height, long - width]
  const leftBottom = [lat - height, long + width]
  return [rightTop, leftBottom]
}

const urls = [img1, img2, img3, img4, img5, img6]
let eff
let removed = true

const initVideEffect = (title, map) => {
  eff = F.videoEffect({ title }).addTo(map)
  removed = false
}

const videoEffectPhotos = (url, latlng) => {
  if (!removed) eff.imageToCard(url, latlngToBounds(latlng), latlng)
}

const videoEffectRand = () => {
  eff.imageToCard(urls[Math.floor(Math.random() * urls.length)], latlngs[Math.floor(Math.random() * latlngs.length)])
}
const rmVideoEffect = () => {
  eff?.remove()
  removed = true
}

const videoEffectConnections = { initVideEffect, rmVideoEffect, videoEffectPhotos, videoEffectRand }

export default videoEffectConnections
