<?php
header('Content-Type: text/html; charset=utf-8');
ob_start();

include("config.php"); 

//Seleccionamos el ultimo
$match = "SELECT * FROM tbAdherentes order by adhID desc LIMIT 1;";
$qry = mysql_query($match)
or die ("No se pudieron encontrar datos porque ".mysql_error()); 
$info = mysql_fetch_array( $qry );

$id = 0;
if($info != null)
    $id = $info['adhID'] + 1;

//Agregamos el nuevo
$match = "insert into tbAdherentes values (".
    ($id).", ".
    $_GET['tipo'].", '".
    utf8_decode(str_replace("'","&#39;",$_GET['name']))."', '".
    utf8_decode(str_replace("'","&#39;",$_GET['email']))."', '".
    $_GET['pais']."');";

$qry = mysql_query($match)
or die ("No se pudo insertar porque ".mysql_error());

echo 'ok';

ob_end_flush();
?>