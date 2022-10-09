"use strict";

const videoExtensions = [
	"3g2",
	"3gp",
	"aaf",
	"asf",
	"avchd",
	"avi",
	"drc",
	"flv",
	"m2v",
	"m3u8",
	"m4p",
	"m4v",
	"mkv",
	"mng",
	"mov",
	"mp2",
	"mp4",
	"mpe",
	"mpeg",
	"mpg",
	"mpv",
	"mxf",
	"nsv",
	"ogg",
	"ogv",
	"qt",
	"rm",
	"rmvb",
	"roq",
	"svi",
	"vob",
	"webm",
	"wmv",
	"yuv"
];

const imageExtensions = [
	"ase",
	"art",
	"bmp",
	"blp",
	"cd5",
	"cit",
	"cpt",
	"cr2",
	"cut",
	"dds",
	"dib",
	"djvu",
	"egt",
	"exif",
	"gif",
	"gpl",
	"grf",
	"icns",
	"ico",
	"iff",
	"jng",
	"jpeg",
	"jpg",
	"jfif",
	"jp2",
	"jps",
	"lbm",
	"max",
	"miff",
	"mng",
	"msp",
	"nef",
	"nitf",
	"ota",
	"pbm",
	"pc1",
	"pc2",
	"pc3",
	"pcf",
	"pcx",
	"pdn",
	"pgm",
	"PI1",
	"PI2",
	"PI3",
	"pict",
	"pct",
	"pnm",
	"pns",
	"ppm",
	"psb",
	"psd",
	"pdd",
	"psp",
	"px",
	"pxm",
	"pxr",
	"qfx",
	"raw",
	"rle",
	"sct",
	"sgi",
	"rgb",
	"int",
	"bw",
	"tga",
	"tiff",
	"tif",
	"vtf",
	"xbm",
	"xcf",
	"xpm",
	"3dv",
	"amf",
	"ai",
	"awg",
	"cgm",
	"cdr",
	"cmx",
	"dxf",
	"e2d",
	"egt",
	"eps",
	"fs",
	"gbr",
	"odg",
	"svg",
	"stl",
	"vrml",
	"x3d",
	"sxd",
	"v2d",
	"vnd",
	"wmf",
	"emf",
	"art",
	"xar",
	"png",
	"webp",
	"jxr",
	"hdp",
	"wdp",
	"cur",
	"ecw",
	"iff",
	"lbm",
	"liff",
	"nrrd",
	"pam",
	"pcx",
	"pgf",
	"sgi",
	"rgb",
	"rgba",
	"bw",
	"int",
	"inta",
	"sid",
	"ras",
	"sun",
	"tga",
	"heic",
	"heif"
];

const btn = document.getElementById('btn');
const clearBtn = document.getElementById('clear-btn');
const links = document.getElementById('links');

const ignoreBtn = document.getElementById('ignore');
const disableBtn = document.getElementById('disable');

const getExtensionFromUrl = url => {
    return url ? (new URL(url)).pathname.split('.').pop().toLowerCase() : null;
}

const restoreOptions = async _ => {
    const settings = await browser.storage.local.get(defaultSettings).then(store => {
        ignoreBtn.checked = store.ignore;
        disableBtn.checked = store.disable;
    });
}

const loadLinksFromMemory = async _ => {
    clearContent("video-container");
    clearContent("image-container");
    const settings = await browser.storage.local.get(defaultSettings).then(store => {
        links.textContent = store.links.join(", "); // TODO: check file type and sort
        for (let i = 0; i < store.links.length; i++) {
            const extension = getExtensionFromUrl(store.links[i]);
            if (videoExtensions.includes(extension)) { // is video
                const video = document.createElement("video");
                video.height = "240";
                video.width = "320";
                video.controls = true;
                video.className = "video-content"

                const source = document.createElement("source");
                source.addEventListener("load", function() {
                    navigator.clipboard.writeText("width:" + this.naturalWidth);
                });
                source.src = store.links[i];
                source.type = "video/" + extension;
                video.appendChild(source);

                const element = document.getElementById("video-container");
                element.appendChild(video);
            }
            else if (imageExtensions.includes(extension)) { // is image
                const image = document.createElement("img");
                image.addEventListener("load", function() {
                    navigator.clipboard.writeText("width:" + this.naturalWidth);
                });
                image.src = store.links[i];


                image.height = "240";
                image.width = "320";

                const element = document.getElementById("image-container");
                element.appendChild(image);
            }
        }
    });
}

const clearContent = (id) => {
    const element = document.getElementById(id);
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
};

btn.addEventListener('click', async function handleClick() {
    await loadLinksFromMemory();
});

clearBtn.addEventListener('click', async function handleClick() {
    await browser.storage.local.clear();
    clearContent("video-container");
    clearContent("image-container");
});

disableBtn.addEventListener('click', async () => {
    defaultSettings.disable = disableBtn.checked;
    await browser.storage.local.set(defaultSettings);
});

ignoreBtn.addEventListener('click', async () => {
    defaultSettings.ignore = ignoreBtn.checked;
    await browser.storage.local.set(defaultSettings);
});


document.addEventListener('DOMContentLoaded', async _ => {
    await restoreOptions();
    await loadLinksFromMemory();
    // Array.from(document.querySelectorAll("input,textarea")).forEach(i => i.onchange = saveOptions);
});
