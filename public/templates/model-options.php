<?php
function getHtmlModeOptionList()
{
    $jsonConfigRaw = file_get_contents('../config/config.json');
    $jsonConfig = json_decode($jsonConfigRaw);

    $obj = $jsonConfig->SUPPORTED_MODELS;
    $optionsHtml = "";
    $optionsToken = "[[optionsHtml]]";
    $count = 0;

    $mainHtml = "<ul id='model-select'>" . $optionsToken . "</ul>";

    foreach ($obj as $key => $itemValue) {
        $internalId = uniqid();
        $elementClass = $count === 0 ? "model-menu active" : "model-menu";

        $optionsHtml .= "<li  ><a id='$internalId' data-value='{$itemValue->value}' class='{$elementClass}' onClick='handleModelChange(\"$internalId\")'  href='#'>{$itemValue->label}</a></li>";
        $count++;
    }
    $internalId = uniqid();

    return str_replace($optionsToken, $optionsHtml, $mainHtml);
}
?>