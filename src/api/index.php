<?php
const ROOT_PATH = '../';
require ROOT_PATH . 'core/index.php';

//use GraphQL\Type\Definition\ObjectType;
//use GraphQL\Type\Definition\Type;
//use GraphQL\GraphQL;
//use GraphQL\Type\Schema;
//
//$queryType = new ObjectType([
//    'name' => 'Query',
//    'fields' => [
//        'echo' => [
//            'type' => Type::string(),
//            'args' => [
//                'id' => Type::int(),
//                'message' => Type::nonNull(Type::string()),
//            ],
//            'resolve' => function ($root, $args) {
//                return $root['prefix'] . $args['message'];
//            }
//        ],
//    ],
//]);
//
//try {
//    $schema_obj = new Schema([
//        'query' => $queryType
//    ]);
//    $Input = file_get_contents('php://input');
//    $input_data = json_decode($Input, true);
//    $query_data = $input_data['query'];
//    $variable_values = isset($input_data['variables']) ? $input_data['variables'] : null;
//    $value = ['prefix' => 'Output: '];
//    $resultant = GraphQL::executeQuery($schema_obj, $query_data, $value, null, $variable_values);
//    $output_value = $resultant->toArray();
//} catch (\Exception $e) {
//    $output_value = [
//        'errors' => [
//            [
//                'message' => $e->getMessage()
//            ]
//        ]
//    ];
//}
//header('Content-Type: application/json');
//echo json_encode($output_value);

print_r(
    json_encode(
        [
            'meta' => __ENV_META,
        ], // TODO: create response by request
        JSON_NUMERIC_CHECK | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    )
);
