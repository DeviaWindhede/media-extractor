/*
function Fill() {
    var c = document.getElementById("content");



    
    var srcList = $('img').map(function () {
        return this.src;
    }).get();
    

    var srcList = $('img').map(function () {
        return this.src;
    }).get();

    for (var i = 0; i < $(srcList).images; i++) {
        c.innerHTML += "<img src=\"" + document.images[i].src + "\">" + document.images[i].name + "</img>";
    }

    
    for (var i = 0; i < document.images; i++) {
        c.innerHTML += "<img src=\"" + document.images[i].src + "\">" + document.images[i].name + "</img>";
        console.log(document.images[i].src);
        //console.log(document[i]);
    }
    

    c.innerHTML += "<p>aa</p>";
}

document.getElementById("updateBtn").addEventListener("click", function () {
    Fill();
}); 
*/

/**
 * CSS to hide everything on the page,
 * except for elements that have the "beastify-image" class.
 */
const hidePage = `body > :not(.beastify-image) {
                    display: none;
                  }`;

/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
    /*
    browser.extension.onMessage.addListener((message) => {
        if (message.command === "imgs") {
            console.log(message.msg);
        }
    });
    */




    document.addEventListener("click", (e) => {
        browser.tabs.query({
            currentWindow: true,
            active: true
        }).then(sendMessageToTabs).catch(onError);
        /*
        browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            browser.tabs.sendMessage(
                tabs[0].id,
                { type: "getCount" }
            ).then(response => {
                console.log("2");
            }).catch(onError);
        });
        */
        /*
          , function (count) {
                if (typeof count == "undefined") {
                    console.log("aaaa");
                    // That's kind of bad
                    if (browser.runtime.lastError) {
                        // We couldn't talk to the content script, probably it's not there
                    }
                }
                else {
                    console.log(count);
                }
                console.log("2");
            }
         */
    });
}


function sendMessageToTabs(tabs) {
    //document.getElementById("content").innerHTML += "<p>aa</p>";
    
    browser.tabs.sendMessage(
        tabs[0].id,
        { type: "getCount" }
    ).then(response => {
        console.log("Response: " + response.response);
    }).catch(onError);
    
}


function onError(error) {
    console.error(`Error: ${error}`);
}

listenForClicks();

/*
function reportExecuteScriptError(error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to execute beastify content script: ${error.message}`);
}

browser.tabs.executeScript({ file: "../content_scripts/beastify.js" })
    .then(listenForClicks)
    .catch(reportExecuteScriptError);
    */