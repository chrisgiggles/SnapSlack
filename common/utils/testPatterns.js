export default function testPatterns(text) {

    const matchUrl = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
    const matchImg = /([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/ig;
    const matchYoutube = /^(https?\:\/\/)?(www.)?(youtube\.com|youtu\.?be)\/.+$/gm;

    let matching = {
        link: false,
        image: false,
        youtube: false
    };

    if ( matchUrl.test(text) ) {
        matching.link = true;
    }

    if ( matchImg.test(text) ) {
        matching.image = true;
    }

    if ( matchYoutube.test(text) ) {
        matching.youtube = true;
    }

    return matching;
}