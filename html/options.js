"use strict";

const btn = document.getElementById('btn');
const links = document.getElementById('links');

// const saveOptions = _ => {
//     browser.storage.local.set({
//         whitelist: Util.split(document.querySelector("#whitelist").value),
//         extensions: Util.split(document.querySelector("#extensions").value),
//         ignore: document.querySelector("#ignore").checked,
//         closetab: document.querySelector("#closetab").checked,
//         disable: document.querySelector("#disable").checked
//     });
// }
// const restoreOptions = async _ => {

//     const settings = await browser.storage.local.get(defaultSettings);
//     document.querySelector('#whitelist').value = Util.join(settings.whitelist);
//     document.querySelector('#extensions').value = Util.join(settings.extensions);
//     document.querySelector("#ignore").checked = settings.ignore;
//     document.querySelector("#closetab").checked = settings.closetab;
//     document.querySelector("#disable").checked = settings.disable;
// }

const restoreOptions = async _ => {
    const settings = await browser.storage.local.get(defaultSettings).then(store => {
        links.textContent = store.links.join(", "); // TODO: check file type and sort
        for (let i = 0; i < store.links.length; i++) {
            const video = document.createElement("video");
            video.height = "240";
            video.width = "320";
            video.controls = true;

            const source = document.createElement("source");
            source.src = store.links[i];
            source.type = "video/mp4";
            video.appendChild(source);

            const element = document.getElementById("container");
            element.appendChild(video);
        }
    });
}

btn.addEventListener('click', async function handleClick() {
    await restoreOptions();
});

document.addEventListener('DOMContentLoaded', async _ => {
    await restoreOptions();
    // await restoreOptions();
    // Array.from(document.querySelectorAll("input,textarea")).forEach(i => i.onchange = saveOptions);
});
