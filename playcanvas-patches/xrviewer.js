console.info("Apply patch for XRViewer");

if (navigator.xr)
{
    const xr = navigator.xr;
    xr.__addEventListener = navigator.xr.addEventListener;
    xr.__attachListeners = function() {};
    
    xr.addEventListener = function (str, fn, opt)
    {
        const tmp = xr.__attachListeners;
        navigator.xr.__attachListeners = function()
        {
            tmp();
            xr.__addEventListener(str, fn, opt);
        };
    };
    
    xr.__applyPatch = function()
    {
        xr.__attachListeners();
        xr.addEventListener = xr.__addEventListener;

        delete xr._addEventListener;
        delete xr.__attachListeners;
        delete xr.__applyPatch;
    }
}