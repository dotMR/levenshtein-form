function WordStat(word) {
    this.word_ = word;
    this.occurrences_ = 1;
    this.similar_ = [];
}

WordStat.prototype.addSimilar = function(word) {
    this.similar_.push(word);
}

WordStat.prototype.addExactMatch = function() {
    this.occurrences_ = this.occurrences_ + 1;
}

WordStat.prototype.getCount = function() {
    return this.occurrences_;
}

WordStat.prototype.getSimilar = function() {
    return this.similar_;
}

WordStat.prototype.getSimilarPretty = function() {
    if (this.similar_.length > 0) {
        return this.getSimilar().join(', ');
    } else {
        return '-';
    }
}

WordStat.prototype.getWord = function() {
    return this.word_;
}

WordStat.prototype.hasSimilar = function() {
    return (this.similar_.length > 0);
}

WordStat.prototype.prettyPrint = function() {
    var print = this.getWord() + ' (' + this.getCount() + ')';
    if (this.hasSimilar()) {
        print = print + ' (' + this.getSimilar().join(', ') + ')';
    }

    return print;
}

module.exports = WordStat;