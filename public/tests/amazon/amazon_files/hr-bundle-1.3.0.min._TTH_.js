var ACSUX = ACSUX || {};
ACSUX.horzroto || (ACSUX.horzroto = function(a) {
    var b, c = jQuery,
        d = c(a),
        e = d.find(".acs-hr-rotoblock.acs-hr-imagetext");
    e.hover(function() {
        var a = c(this);
        clearTimeout(b), b = setTimeout(function() {
            ACSUX.emitter.emitEvent("s9_acsd_al_bw_hr_0_0_0_h"), a.find(".acs-hr-hoverpop")
                .animate({
                    height: "37px"
                }, 150)
        }, 200)
    }, function() {
        var a = c(this);
        clearTimeout(b), a.find(".acs-hr-hoverpop")
            .animate({
                height: "0px"
            }, 150)
    })
});