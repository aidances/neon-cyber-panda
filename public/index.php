<?php


// Include the file that defines the functions
require './api/openai.php';
require './templates/model-options.php';



/**
 * Load main html template
 * Replace tokens from data config
 */
function initializeHtmlWithTokens()
{

    // Map response into JavaScript HTML5 
    $html = file_get_contents('./templates/main.html');
    $commonConfig = getConfig('../config/config.json');

    // Ensure sensitive info not leak
    unset($commonConfig->YOUR_OPENAI_API_KEY);

    // Define the tokens to search for and replace 
    $appNameToken = '[[appNameToken]]';
    $modelOptionsHtmlToken = '[[modelOptionsHtmlToken]]';
    $footerToken = '[[footerToken]]';
    $configToken = '[[configToken]]';
    $titleMessageToken = '[[titleMessageToken]]';
    $inputMessageToken = '[[inputMessageToken]]';
    $submitMessageToken = '[[submitMessageToken]]';


    // Get the values of the tokens from some variables 
    $modelOptionsHtml = getHtmlModeOptionList();
    $appNameHtml = $commonConfig->APP_NAME;
    $footerHtml = $commonConfig->OPENAI_FOOTER_MESSAGE;
    $configHtml = json_encode($commonConfig);
    $titleMessageHtml = $commonConfig->OPENAI_TITLE_MESSAGE;
    $inputMessageHtml = $commonConfig->INPUT_PLACEHOLDER;
    $submitMessageHtml = $commonConfig->INPUT_SUBMIT_BUTTON;



    // Replace the tokens with their values 
    $html = str_replace($appNameToken, $appNameHtml, $html);
    $html = str_replace($modelOptionsHtmlToken, $modelOptionsHtml, $html);
    $html = str_replace($footerToken, $footerHtml, $html);
    $html = str_replace($configToken, $configHtml, $html);
    $html = str_replace($titleMessageToken, $titleMessageHtml, $html);
    $html = str_replace($inputMessageToken, $inputMessageHtml, $html);
    $html = str_replace($submitMessageToken, $submitMessageHtml, $html);


    // Output the modified HTML
    echo $html;
}

initializeHtmlWithTokens();
?>