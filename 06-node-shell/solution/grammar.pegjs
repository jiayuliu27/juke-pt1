Pipe = _ first:Command _ rest:(_ '|' _ cmd:Command { return cmd })* {
	return [first, ...rest]
}

Command = cmd:Word args:Word* {
	return {cmd, args}
}

Word =
	_ word:$([^'"$| \t\n]+) _ { return word } /
        _ value:EnvironmentVariable _ { return value } /
        _ quote:SingleQuotedString _ { return quote } /
	_ quote:DoubleQuotedString _ { return quote }


EnvironmentVariable = _ '$'env:$([a-zA-Z0-9_\-]+) {
	return process.env[env]
}

SingleQuotedString =
	"'" string:$([^']+) "'" { return string }

DoubleQuotedString =
	'"' string:$([^"]+) '"' { return string }


_ = [ \t\n]*
