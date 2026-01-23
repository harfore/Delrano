
const ImagesPaths = {
    collection: '../assets/images',

    imagesPaths: [
        '/auth/chromakopia.jpg',
        '/auth/donna_summer.jpg',
        '/auth/sabrina_carpenter.jpg',
        '/auth/mochakk.jpg',
        '/auth/kaytranada.jpg',
        '/auth/raye.jpg',
        '/auth/beyonce.jpg',
        '/auth/halsey.jpg',
        '/auth/post_malone.jpg',
        '/auth/halle_bailey.jpg',
        '/auth/loyle_carner.jpg',
        '/auth/weeknd_moon.jpg',
        '/auth/taylor.jpg',
        '/auth/hhmas.jpg',
        '/auth/dua_lipa.jpg',
        '/auth/rwt.jpg',
    ],

    getRandomImages(count) {
        return [...this.imagesPaths]
            .sort(() => Math.random() - 0.5)
            .slice(0, count)
            .map(img => `${this.collection}${img}`);
    },
}

export default ImagesPaths;