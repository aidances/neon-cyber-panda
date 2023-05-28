<?php



/**
 * Checks if token  exists
 */
function hasMatch($message, $tokenPrompt)
{
    return $message && strpos($message, $tokenPrompt) !== false;
}
/**
 * Gets config json file
 */
function getConfig($defaultPath = '../../config/config.json')
{
    $jsonConfigRaw = file_get_contents($defaultPath);
    return json_decode($jsonConfigRaw);

}
/**
 * Openai api - completion api
 * https://platform.openai.com/docs/api-reference/completions
 */
function chatStatusApi($payloadData)
{
    $response_json = json_decode($payloadData);
    $message = $response_json->message;
    $model = $response_json->model;
    $jsonConfig = getConfig();
    $parameter = $jsonConfig->OPENAI_COMPLETION_PARAMETER;
    if (empty($message) || empty($model)) {
        return $jsonConfig->OPENAI_FAILURE_EMPTY_REQUEST;
    }

    if (hasMatch($parameter->prompt, $jsonConfig->OPENAI_REPLACEABLE_PROMPT)) {
        $parameter->prompt = str_replace($jsonConfig->OPENAI_REPLACEABLE_PROMPT, $message, $parameter->prompt);
    } else {
        $parameter->prompt = $message;
    }

    $url = str_replace($jsonConfig->OPENAI_REPLACEABLE_MODEL, $model, $jsonConfig->OPENAI_COMPLETION_URL );

    $data = json_encode($parameter);

    $options = array(
        'http' => array(
            'header' => "Content-type: application/json\r\n" . "authorization: " . $jsonConfig->YOUR_OPENAI_API_KEY,
            'method' => 'POST',
            'content' => $data
        )
    );
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    $result = json_decode($result);

    $responseMessage = '';
    if ($result === FALSE) {
        $responseData = $jsonConfig->OPENAI_FAILURE_ERROR_RESPONSE1;
        $responseMessage = $responseMessage . " " . ($responseData);
        if ($jsonConfig->OPENAI_FAILURE_ERROR_RESPONSE2) {
            $responseMessage = $responseMessage . "\n" . ($jsonConfig->OPENAI_FAILURE_ERROR_RESPONSE2 . error_get_last());
        }
    } else {
        $responseData = !empty($result->choices[0]) ? $result->choices[0]->text : $jsonConfig->OPENAI_FAILURE_EMPTY_RESPONSE;
        $responseMessage = $responseMessage . ($responseData);

        if (!empty($result->error)) {
            $responseMessage = $responseMessage . "\n" . ($jsonConfig->OPENAI_FAILURE_ERROR_RESPONSE2 . $result->error->message);
        }

    }
    var_dump($responseMessage);
    return $responseMessage;
}
/**
 * Openai api - chat completion api
 * https://platform.openai.com/docs/api-reference/chat
 */
function chatCompletionStatusApi($payloadData)
{
    $response_json = json_decode($payloadData);
    $message = $response_json->message;
    $model = $response_json->model;
    $jsonConfig = getConfig();

    $parameter = $jsonConfig->OPENAI_CHAT_COMPLETION_PARAMETER;
    if (empty($message) || empty($model)) {
        return $jsonConfig->OPENAI_FAILURE_EMPTY_REQUEST;
    }


    if (hasMatch($parameter->messages[0]->content, $jsonConfig->OPENAI_REPLACEABLE_PROMPT)) {
        $parameter->messages[0]->content = str_replace($jsonConfig->OPENAI_REPLACEABLE_PROMPT, $message, $parameter->messages[0]->content);
    } else {
        $parameter->messages[0]->content = $message;
    }
    $parameter->model = $model;


    $url = $jsonConfig->OPENAI_CHAT_COMPLETION_URL;
    $data = json_encode($parameter);

    $options = array(
        'http' => array(
            'header' => "Content-type: application/json\r\n" . "authorization: " . $jsonConfig->YOUR_OPENAI_API_KEY,
            'method' => 'POST',
            'content' => $data
        )
    );
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    $result = json_decode($result);

    $responseMessage = '';
    if ($result === FALSE) {
        $responseData = $jsonConfig->OPENAI_FAILURE_ERROR_RESPONSE1;
        $responseMessage = $responseMessage . " " . ($responseData);
        if ($jsonConfig->OPENAI_FAILURE_ERROR_RESPONSE2) {
            $responseMessage = $responseMessage . "\n" . ($jsonConfig->OPENAI_FAILURE_ERROR_RESPONSE2 . error_get_last());
        }
    } else {

        $responseData = !empty($result->choices[0]->message) ? $result->choices[0]->message : $jsonConfig->OPENAI_FAILURE_EMPTY_RESPONSE;
        $responseMessage = $responseMessage . ($responseData->content);
        if (!empty($result->error->message)) {
            $responseMessage = $responseMessage . "\n" . ($jsonConfig->OPENAI_FAILURE_ERROR_RESPONSE2 . $result->error->message);
        }
    }

    return $responseMessage;
}
/**
 * Openai api - image api
 * https://platform.openai.com/docs/api-reference/images
 */

function chatImageStatusApi($payloadData)
{
    $response_json = json_decode($payloadData);
    $message = $response_json->message;
    $jsonConfig = getConfig();

    $parameter = $jsonConfig->OPENAI_IMAGE_PARAMETER;
    if (empty($message)) {
        return $jsonConfig->OPENAI_FAILURE_EMPTY_REQUEST;
    }


    if (hasMatch($parameter->prompt, $jsonConfig->OPENAI_REPLACEABLE_PROMPT)) {
        $parameter->prompt = str_replace($jsonConfig->OPENAI_REPLACEABLE_PROMPT, $message, $parameter->prompt);
    } else {
        $parameter->prompt = $message;
    }


    $url = $jsonConfig->OPENAI_CHAT_IMAGE_URL;
    $data = json_encode($parameter);

    $options = array(
        'http' => array(
            'header' => "Content-type: application/json\r\n" . "authorization: " . $jsonConfig->YOUR_OPENAI_API_KEY,
            'method' => 'POST',
            'content' => $data
        )
    );
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    $result = json_decode($result);

    $responseMessage = '';
    if ($result === FALSE) {
        $responseData = $jsonConfig->OPENAI_FAILURE_ERROR_RESPONSE1;
        if ($jsonConfig->OPENAI_FAILURE_ERROR_RESPONSE2) {
            $responseMessage = $responseMessage . "\n" . ($jsonConfig->OPENAI_FAILURE_ERROR_RESPONSE2 . error_get_last());
        }
        return $responseMessage;
    }
    return json_encode($result);

}



?>