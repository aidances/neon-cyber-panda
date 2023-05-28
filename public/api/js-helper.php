<?php
require './openai.php';

/**
 * This helper helps execute functions from php via js
 * The goal is to ensure the php invocation to rest api is not transparent to js
 * to prevent leak of sensitive api key
 */
function invokePhpServicesFromJs()
{
    if (isset($_POST['function'])) {
        if (isset($_POST['payload'])) {
            $payload_data = $_POST['payload'];
        }

        // Call the specified PHP function
        $function_name = $_POST['function'];
        if (function_exists($function_name)) {
            $result = call_user_func($function_name, $payload_data);
            echo $result;
        } else {
            echo 'Invalid function name: ' . $function_name;
        }
    }
}


invokePhpServicesFromJs();
?>