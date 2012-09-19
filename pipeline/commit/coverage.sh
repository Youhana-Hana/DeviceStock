cd ../..
rm -r lib-cov
jscoverage lib lib-cov

export EXPRESS_COV=1
./node_modules/mocha/bin/mocha --reporter html-cov test/commit/*.js > coverage.html
