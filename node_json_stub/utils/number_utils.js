module.exports = {
	getRandomInRange:function(from, to, fixed) {
	    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
	}
}