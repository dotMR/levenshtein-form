var LevenshteinTools = {

    areWordsSimilar: function(a, b, editDistance) {
        var lengthDiff = Math.abs(a.length - b.length);
        if (lengthDiff <= editDistance) {

            // assume a is longer than b
            var main = a;
            var sub = b;

            // validate and switch if necessary
            if (b.length > a.length) {
               main = b;
               sub = a;
            }

            if (main.indexOf(sub) != -1) {
                return true;
            }

            var replacements = 0;
            for (var i=0;i<main.length;i++) {
                if (main.charAt(i) != sub.charAt(i)) {
                    replacements = replacements + 1;

                    if (replacements > editDistance) {
                        return false;
                    }
                }
            }

            return true;
        }

        return false;
    }
};