export function showLoader(showHideLoadingDiv: boolean) {
    if (showHideLoadingDiv)
        document.getElementById("loadingDiv") && document.getElementById("loadingDiv")?.setAttribute("style", "visibility: visible");
    else
        document.getElementById("loadingDiv") && document.getElementById("loadingDiv")?.setAttribute("style", "visibility: collapse");
}