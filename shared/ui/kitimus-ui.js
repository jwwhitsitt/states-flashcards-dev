/* Kitimus Shared UI (v0.2)
   Auto-inject the fixed mascot on index + test pages.
   EXCEPT: main homepage (site root /index.html or /).
   Also skips study pages.
*/
(function(){
  try{
    var path = (location.pathname || "/").toLowerCase();

    // Skip root homepage (keep big Kitimus there)
    if (path === "/" || path === "/index.html") return;

    // Skip study pages
    if (path.includes("study")) return;

    // Only index + test pages
    var isIndex = path.endsWith("index.html");
    var isTest  = path.endsWith("test.html");
    if (!isIndex && !isTest) return;

    // Don't duplicate if already present
    if (document.querySelector(".kitimus-fixed")) return;

    // Hide any in-layout mascots so we don't get doubles
    var inLayout = document.querySelectorAll(".kitimus, #kitimusImg");
    for (var i=0;i<inLayout.length;i++){
      try{ inLayout[i].style.display = "none"; }catch(e){}
    }

    var wrap = document.createElement("div");
    wrap.className = "kitimus-fixed";

    var img = document.createElement("img");
    img.alt = "";
    img.src = "/mascots/kitimus/kitimus-squint.png";

    wrap.appendChild(img);

    function mount(){
      if (!document.body) return;
      document.body.appendChild(wrap);
    }

    if (document.readyState === "loading"){
      document.addEventListener("DOMContentLoaded", mount);
    } else {
      mount();
    }
  } catch(e){
    // fail silently
  }
})();
