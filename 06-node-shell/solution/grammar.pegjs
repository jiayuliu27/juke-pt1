// Simple shell grammar supporting pipelines and environment variables.
//
// Build with:
//
//   pegjs grammar.pegjs

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
	// It's probably not such a great idea to do this in the parser.
	// On the other hand, it's far from the worst thing a shell
	// parser has ever done.
	return process.env[env]
}

SingleQuotedString =
	"'" string:$([^']+) "'" { return string }

DoubleQuotedString =
	'"' string:$([^"]+) '"' { return string }


_ = [ \t\n]*
