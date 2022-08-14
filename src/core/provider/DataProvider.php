<?php

namespace core\provider;

use Doctrine\DBAL\DriverManager;
use core\model\Users;

class DataProvider {


    public function get_example_data (): array {
        $conn = DriverManager::getConnection(__SQL_DOC_CONN);
        $users = new Users;


        return $users -> get($conn, []);
    }


}