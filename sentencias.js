var table = [
    { col1: 'v1', col2: 'v2', col3: 'v3' },
    { col1: 'v4', col2: 'v5', col3: 'v6' },
    { col1: 'v7', col2: 'v8', col3: 'v9' }
];

var table2 = [
  { t2_col1: 'v1', t2_col2: 'v2', t2_col3: 'v3' },
  { t2_col1: 'v4', t2_col2: 'v5', t2_col3: 'v6' },
  { t2_col1: 'v7', t2_col2: 'v8', t2_col3: 'v9' }
];

// Initialize a new Query object
var query = new Query();

// Set the SELECT "clause" of the query. Note that this should accept any number of "columns".
query.select(
    // Each of these arrays represents a column. The first element is the expression and the
    // second one is the name of the column in the output table. The expression functions
    // expect their argument to be a row from the data source (set using the Query.from
    // function).
    [ function( row ){ return 1; }, 'constant' ],
    [ function( row ){ return row.col1 + row.col2 + row.col3; }, 'concat' ]
);


// Set the FROM "clause" of the query. Let's stick to accepting just an array of objects.
query.from( table );

// Set the WHERE "clause" of the query. This should be a function that receives a row from
// the data source (set using the Query.from function) and is expected to return a boolean
// value that determines whether this row should be processed by the query.
query.where(function( row ){
  return row.col1 !== 'v1';
});

console.log( query.get() );
// Expected result:
//  [
//      { constant: 1, concat: "v4v5v6" },
//      { constant: 1, concat: "v7v8v9" }
//  ]

// Set the WHERE "clause" again, overwriting the old function
query.where(function( row ){
    return row.col1 !== 'v4';
});
query.orderBy('concat', 'asc')
//
console.log( query.get() );

//console.log(query.orderBy('concat', 'desc'));
// Expected result:
//  [
//      { constant: 1, concat: "v1v2v3" },
//      { constant: 1, concat: "v7v8v9" }
//  ]
