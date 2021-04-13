<?php

$ip = $_SERVER['REMOTE_ADDR'];
$name = $_POST['name'];
$phone = $_POST['phone'];
$campaign_id = '978814'; //Код потока
$sid1 = $_POST['sid1'];
$sid2 = $_POST['sid2'];


$order = array (

'campaign_id' => $campaign_id,
'ip' => $ip,
'name' => $name,
'phone' => $phone,
'sid1' => $sid1,
'sid2' => $sid2

);

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "http://tracker.everad.com/conversion/new" );
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
curl_setopt($ch, CURLOPT_POST,           1 );
curl_setopt($ch, CURLOPT_POSTFIELDS,     http_build_query($order) );
curl_setopt($ch, CURLOPT_HTTPHEADER,     array('Content-Type: application/x-www-form-urlencoded'));

$result=curl_exec ($ch);

if ($result === 0) {
	echo "Timeout! Everad CPA API didn't respond within default period!";
} else {
	$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	if ($httpCode === 400) {
		  echo "Order data is invalid! Order is not accepted!";
	} else if ($httpCode === 401) {
		  echo "Order is not accepted! No campaign_id.";
	} else if ($httpCode === 403) {
		  echo "Order is not accepted! Restricted GEO. Please submit your order from another GEO.";
	} else if ($httpCode !== 200) {
		  echo "Order is not accepted! Invalid or incomplete data. Please contact support.";
	}
}
?>