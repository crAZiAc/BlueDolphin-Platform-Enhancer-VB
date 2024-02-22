//Main Window Loaded - Check to see if this is a new version of the extension and is so advise of whats changed
document.arrive(".draftsnavbar__input", function(mainWindow) {

    updatenotificationCheck(mainWindow)

});


//Add custom templates to screen
document.arrive(".create-template-view", function(archtemplate) {
    var html = '';
    getTenant();
    chrome.storage.local.get(["key"]).then((result) => {
        if (result.key) {
            let data = JSON.parse(result.key);
            for (i = 0; i < data.length; ++i) {
                let entry = data[i];
                if (entry.tenant == tenant) {
                    let templates = entry.templates;
                    for (t = 0; t < templates.length; ++t) {
                        let li = '<div class="col-sm-6 col-md-4"><div id="cusTemp" masterViewId="' + templates[t].masterViewId + '" class="ember-view"><div class="thumbnail" title="' + templates[t].templateName + '"><img src="' + templates[t].base64Image + '" alt="' + templates[t].templateName + '"><div class="caption"><h3 class="text-center">' + templates[t].templateName + '</h3></div></div></div></div>'
                        html = html + li;
                    }
                    archtemplate.firstChild.children[1].children[2].insertAdjacentHTML(
                        "beforeend", html);
                }
            }
        }
    });
});

// Check existing templates
document.arrive(".thumbnail", function(archView) {
    getTenant();
    if (archView.title == "Blank") {
        let templateList = archView.parentElement.parentElement.parentElement.children
        for (i = 0; i < templateList.length; ++i) {
            let templateNode = templateList[i];
            if (templateNode.children.length > 0) {
                if (templateNode.children[0].children.length > 0) {
                    if (templateNode.children[0].children[0].children.length > 0) {
                        let templateImage = templateNode.children[0].children[0].children[0]
                        if (templateImage.src != null) {
                            if (templateImage.src.includes("https://cdn.bluedolphin.app/data:image/png;base64,")) {
                                let src = templateImage.src.replace("https://cdn.bluedolphin.app/", "");
                                templateImage.src = src;
                            }
                        }
                    }
                }
            }
        }
    }
});

// Add screen to add new template
document.arrive(".go-back-button", function(backButton) {
    const tempButton = document.createElement("button");
    tempButton.title = "Add new template";
    tempButton.type = "button";
    tempButton.id = "addnewtemplate";
    tempButton.className = "btn btn-default";
    const tempButtonText = document.createTextNode("Add new template");
    tempButton.appendChild(tempButtonText);
    backButton.insertAdjacentElement("afterend", tempButton);
});