git log --all -M -C --name-only --format='format:' "$@" | sort | grep -v '^$' | uniq -c | sort | awk 'BEGIN {print "\{"} {print "\"" $2 "\"" "=>" "\"" $1 "\","} END {print "\}"}' | tr '\n' ' '
