var dataTransform = {}
dataTransform.EMC = function (T,h) {
    h = h/100;
    var W = 349 + 1.29*T + 0.0135*Math.pow(T, 2);
    var K = 0.805 + 0.000736*T - 0.00000273*Math.pow(T, 2);
    var K1 = 6.27 - 0.00938*T - 0.000303*Math.pow(T, 2);
    var K2 = 1.91 + 0.0407*T - 0.000293*Math.pow(T, 2);
    
    var emc = 1800/W * ((K*h/(1-K*h))+((K1*K*h+2*K1*K2*Math.pow(K, 2)*Math.pow(h, 2)) / (1+K1*K*h+K1*K2*Math.pow(K, 2)*Math.pow(h, 2))));
    
    return emc;
}
dataTransform.filterCity = function (stringName) {
    var filter = data.cities.filter(function (e){
        return e.name == stringName
    })[0]
    if (!filter.hasOwnProperty("months")) {
        filter.tLimits = [d3.max(filter.th),d3.min(filter.tl)]
        filter.hLimits = [d3.max(filter.hh),d3.min(filter.hl)]
        filter.months = filter.th.map(function (e,i) {
            return {
                t:[filter.th[i],filter.tl[i]],
                h:[filter.hh[i],filter.hl[i]],
                emc:[dataTransform.EMC(filter.tl[i],filter.hh[i]), dataTransform.EMC(filter.th[i],filter.hl[i])]
            }
        })
        filter.emcLimits = [
            d3.max(filter.months, function(d){return d.emc[0]}), 
            d3.min(filter.months, function(d){return d.emc[1]})
        ]
    }
    return filter
}
dataTransform.calculateVar = function (city, woodString, variationString) {
    if (!variationString) {variationString = selectedVariation};
    var wood = data.wood.filter(function (d){
        return d.nomeCientifico == woodString
    })[0]
    var woodV = wood[variationString]

    city.months.forEach(function (d,i) {
        var aMean = ((woodV/30 * d.emc[1]) + (woodV/30 * d.emc[0]))/2
        d.aMean = aMean
        d.vm = [
            (woodV/30 * d.emc[0]) - aMean, 
            (woodV/30 * d.emc[1]) - aMean
        ]
        d.vy = [
            (woodV/30 * city.emcLimits[0]) - aMean, 
            (woodV/30 * city.emcLimits[1]) - aMean
        ]
        d.month = monthNames[i]
        
    })
    
}
dataTransform.calculateMonthArea = function (city) {
    city.area = d3.sum(city.months.map(function (d) {
        return d.vm[0]-d.vm[1]
    }))
}