/*
function main() {
    document.body.style.border = "5px solid red";

    var srcList = $('img').map(function () {
        return this.src;
    }).get();

    for (var i = 0; i < $(srcList).images; i++) {
        console.log($(srcList).images[i].src);
        //c.innerHTML += "<img src=\"" + document.images[i].src + "\">" + document.images[i].name + "</img>";
    }
}
main();
*/

(function () {
    /**
     * Check and set a global guard variable.
     * If this content script is injected into the same page again,
     * it will do nothing next time.
     */
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;
    /*
    browser.runtime.onMessage.addListener(
        function (message, sender, sendResponse) {
            switch (message.type) {
                case "getCount":
                    console.log("1");
                    console.log("message: ", message);
                    //sendResponse(document.images[0].src);
                    message2 = sendResponse("undefined");
                    console.log(message2);
                    break;
                default:
                    console.error("Unrecognised message: ", message);
            }
        }
    );
    */

    browser.runtime.onMessage.addListener(request => {
        console.log("Request type: " + request.type);
        return Promise.resolve({ response: document.images[0].src });
    });
})();
