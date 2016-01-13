/**
 * Created by Victor Häggqvist on 1/12/16.
 */

export const FetchImage = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => {
                var img = new Image();
                img.src = url;
                //console.log(img);
                resolve(img);
        });
    });
};
