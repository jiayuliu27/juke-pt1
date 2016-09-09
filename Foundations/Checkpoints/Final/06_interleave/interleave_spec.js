describe('interleave', function () {

	it('is a function', function () {
		expect(typeof interleave).toEqual('function');
	});

	it('interleaves two single-character strings, in the same order they are passed', function () {
		var result = interleave('a', 'B');
		expect(result).toEqual('aB');
	});

	it('interleaves two strings of equal length', function () {
		var result = interleave('hello', 'WORLD');
		expect(result).toEqual('hWeOlRlLoD');
	});

	it('does not care about case', function () {
		var result = interleave('HELLO', 'world');
		expect(result).toEqual('HwEoLrLlOd');
	});

	it('if the first string is longer, it will add the remaining characters to the end', function () {
		var result = interleave('thisstringislonger', '123');
		expect(result).toEqual('t1h2i3sstringislonger');
	});

	it('if the second string is longer, it will add the remaining characters to the end', function () {
		var result = interleave('AFEWLETTERS', 'astringwithmoreletters');
		expect(result).toEqual('AaFsEtWrLiEnTgTwEiRtShmoreletters');
	});

	it('interleaves three strings', function () {
		var result = interleave('abc', 'XYZ', '123');
		expect(result).toEqual('aX1bY2cZ3');
	});

	it('interleaves three longer strings of equal length', function () {
		var result = interleave('.......', 'helpful', '-------');
		expect(result).toEqual('.h-.e-.l-.p-.f-.u-.l-');
	});

	it('interleaves n strings', function () {
		var result = interleave('aB', 'cD', 'eF', 'gH', 'iJ', 'kL', 'mN', 'oP', 'qR', 'sT');
		expect(result).toEqual('acegikmoqsBDFHJLNPRT');
	});

});